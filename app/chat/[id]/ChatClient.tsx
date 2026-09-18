'use client'
import { useEffect, useState, useRef } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'

export default function ChatClient() {
  const { id } = useParams<{ id: string }>()
  const router = useRouter()
  const [msgs, setMsgs] = useState<any[]>([])
  const [txt, setTxt] = useState('')
  const [userId, setUserId] = useState('')
  const [conversationId, setConversationId] = useState('')
  const [status, setStatus] = useState('Loading conversation...')
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let channel: any
    let active = true
    ;(async () => {
      const { data: auth } = await supabase.auth.getUser()
      if (!auth.user) return router.push('/auth')
      setUserId(auth.user.id)
      let conversation: any = null
      const { data: byId } = await supabase.from('conversations').select('id,user1,user2').eq('id', id).maybeSingle()
      conversation = byId
      if (!conversation) {
        const { data: match } = await supabase.from('matches').select('id,user1,user2').eq('id', id).maybeSingle()
        if (match) {
          const { data: byMatch } = await supabase.from('conversations').select('id,user1,user2').eq('match_id', match.id).maybeSingle()
          if (byMatch) conversation = byMatch
          else {
            const { data: created } = await supabase.from('conversations').insert({ match_id: match.id, user1: match.user1, user2: match.user2 }).select('id,user1,user2').single()
            conversation = created
          }
        }
      }
      if (!active ||!conversation) return setStatus('This conversation is unavailable.')
      setConversationId(conversation.id)
      const { data, error } = await supabase.from('messages').select('*').eq('conversation_id', conversation.id).order('id', { ascending: true })
      if (!active) return
      if (error) setStatus(error.message)
      else { setMsgs(data || []); setStatus('') }
      channel = supabase.channel(`messages-${conversation.id}`).on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'messages', filter: `conversation_id=eq.${conversation.id}` }, payload => setMsgs(c => c.some(m => m.id === (payload.new as any).id)? c : [...c, payload.new])).subscribe()
    })()
    return () => { active = false; if (channel) supabase.removeChannel(channel) }
  }, [id, router])

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: 'smooth' }) }, [msgs])

  const send = async () => {
    if (!txt.trim() ||!userId ||!conversationId) return
    const content = txt.trim()
    setTxt('')
    const tmp = { id: Date.now().toString(), sender_id: userId, text: content, content, conversation_id: conversationId }
    setMsgs(m => [...m, tmp])
    const { error } = await supabase.from('messages').insert({ conversation_id: conversationId, sender_id: userId, content, text: content }).select().single()
    if (error) {
      const { error: e2 } = await supabase.from('messages').insert({ conversation_id: conversationId, sender_id: userId, content }).select().single()
      if (e2) setStatus(e2.message)
    }
  }

  return (
    <div className="app-shell min-h-screen bg-[#fbf9ff]">
      <header className="topbar sticky top-0 z-30 bg-white/80 backdrop-blur-xl border-b border-black/5 px-4 py-3 flex items-center gap-3">
        <button className="h-9 w-9 grid place-items-center rounded-full bg-black text-white" onClick={() => router.back()}>←</button>
        <div className="flex-1"><p className="font-black text-[14px]">Messages</p><p className="text-[11px] text-zinc-500">Private • end-to-end safe</p></div>
        <button className="h-9 w-9 rounded-full bg-zinc-100 grid place-items-center">⋯</button>
      </header>
      <main className="content px-4 pt-4 pb-24">
        <div className="mt-2 mb-4 rounded-[16px] bg-[#fff9e8] border border-[#ffe9a8] p-3 text-center"><p className="text-[12px] font-bold">Start with curiosity ✨</p><p className="mt-1 text-[11px] text-zinc-500">Never send money to someone you just met.</p></div>
        {status && <p className="py-8 text-center text-xs text-zinc-500">{status}</p>}
        <div className="space-y-2">
          {msgs.map((msg: any) => {
            const isMe = msg.sender_id === userId
            return <div key={msg.id} className={`flex ${isMe? 'justify-end' : 'justify-start'}`}><div className={`max-w-[78%] rounded-[18px] px-4 py-2.5 text-[13px] shadow-sm ${isMe? 'bg-[#FFC800] text-black rounded-br-[6px]' : 'bg-white border border-black/5 rounded-bl-[6px]'}`}><p>{msg.text || msg.content}</p><p className="mt-1 text-[10px] opacity-60">{msg.created_at? new Date(msg.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : ''}</p></div></div>
          })}
          <div ref={bottomRef} />
        </div>
      </main>
      <div className="fixed bottom-0 left-1/2 w-full max-w-[520px] -translate-x-1/2 flex gap-2 border-t border-black/5 bg-white/90 backdrop-blur-xl p-3">
        <input value={txt} onChange={e => setTxt(e.target.value)} onKeyDown={e => e.key === 'Enter' && send()} placeholder="Write a message..." className="flex-1 h-[44px] rounded-full bg-zinc-100 border border-black/5 px-5 text-[13px] outline-none" />
        <button onClick={send} className="h-12 w-12 grid place-items-center rounded-full bg-[#FFC800] font-black text-black shadow-md">↑</button>
      </div>
    </div>
  )
}