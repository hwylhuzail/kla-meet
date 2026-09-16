'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'

export default function Chat() {
  const { id } = useParams<{ id: string }>()
  const router = useRouter()
  const [msgs, setMsgs] = useState<any[]>([])
  const [txt, setTxt] = useState('')
  const [userId, setUserId] = useState('')
  const [otherId, setOtherId] = useState('')
  const [conversationId, setConversationId] = useState('')
  const [status, setStatus] = useState('Loading conversation...')

  useEffect(() => {
    let channel: any
    let active = true
    ;(async () => {
      const { data: auth } = await supabase.auth.getUser()
      if (!auth.user) return router.push('/auth')
      setUserId(auth.user.id)

      let conversation: any = null
      const { data: existingConversation } = await supabase.from('conversations').select('id,user1,user2').eq('id', id).maybeSingle()
      conversation = existingConversation
      if (!conversation) {
        const { data: match } = await supabase.from('matches').select('id,user1,user2').eq('id', id).maybeSingle()
        if (match) {
          const { data: existingByMatch } = await supabase.from('conversations').select('id,user1,user2').eq('match_id', match.id).maybeSingle()
          if (existingByMatch) conversation = existingByMatch
          else {
            const { data: created } = await supabase.from('conversations').insert({ match_id: match.id, user1: match.user1, user2: match.user2 }).select('id,user1,user2').single()
            conversation = created
          }
        }
      }
      if (!active || !conversation) return setStatus('This conversation is unavailable.')
      const other = conversation.user1 === auth.user.id ? conversation.user2 : conversation.user1
      setConversationId(conversation.id)
      setOtherId(other)
      const { data, error } = await supabase.from('messages').select('*').eq('conversation_id', conversation.id).order('created_at')
      if (!active) return
      if (error) setStatus(error.message)
      else { setMsgs(data || []); setStatus('') }
      channel = supabase.channel(`messages-${conversation.id}`).on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'messages', filter: `conversation_id=eq.${conversation.id}` }, payload => setMsgs(current => current.some(message => message.id === (payload.new as any).id) ? current : [...current, payload.new])).subscribe()
    })()
    return () => { active = false; if (channel) supabase.removeChannel(channel) }
  }, [id, router])

  const send = async () => {
    if (!txt.trim() || !userId || !otherId || !conversationId) return
    const { data, error } = await supabase.from('messages').insert({ conversation_id: conversationId, sender_id: userId, receiver_id: otherId, text: txt.trim() }).select().single()
    if (error) setStatus(error.message)
    else { setMsgs(current => current.some(message => message.id === data.id) ? current : [...current, data]); setTxt('') }
  }

  return <div className="app-shell"><header className="topbar"><button className="icon-button" onClick={() => router.back()} aria-label="Go back">←</button><div><p className="font-bold">Messages</p><p className="text-xs text-stone-500">A private KLA Meet conversation</p></div><button className="icon-button" aria-label="Conversation safety">⋯</button></header><main className="content min-h-[calc(100vh-154px)]"><div className="soft-panel mt-4 mb-4 bg-[#fff9e8] text-center"><p className="text-sm font-semibold">Start with curiosity</p><p className="mt-1 text-xs text-stone-500">Never send money or financial information to someone you just met.</p></div>{status && <p className="py-8 text-center text-xs text-stone-500">{status}</p>}<div className="space-y-3">{msgs.map((msg: any) => <div key={msg.id} className={`max-w-[80%] rounded-2xl p-3 ${msg.sender_id === userId ? 'ml-auto bg-[#ffc800] text-black' : 'border border-[#e0e0e0] bg-white text-black'}`}><p>{msg.text || msg.content}</p><p className="mt-1 text-[10px] opacity-55">{msg.created_at ? new Date(msg.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : ''}</p></div>)}</div></main><div className="fixed bottom-0 left-1/2 flex w-full max-w-[520px] -translate-x-1/2 gap-2 border-t border-[#e0e0e0] bg-white p-3"><input value={txt} onChange={e => setTxt(e.target.value)} onKeyDown={e => { if (e.key === 'Enter') send() }} placeholder="Write a message..." className="field rounded-full" /><button onClick={send} className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-[#ffc800] font-bold text-black" aria-label="Send message">↑</button></div></div>
}
