'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'
import { normalizeProfile, Profile } from '@/lib/profile'

type Convo = { id: string; profile: Profile; lastMessage?: string; created_at: string }

export default function MessagesPage() {
  const [convos, setConvos] = useState<Convo[]>([])
  const [status, setStatus] = useState('Loading messages...')

  useEffect(() => {
    (async () => {
      const { data: auth } = await supabase.auth.getUser()
      if (!auth.user) return setStatus('Sign in to see messages')
      const { data: conversations, error } = await supabase
       .from('conversations')
       .select('id,user1,user2,created_at')
       .or(`user1.eq.${auth.user.id},user2.eq.${auth.user.id}`)
       .order('created_at', { ascending: false })
      if (error) return setStatus(error.message)
      if (!conversations?.length) return setStatus('')

      const otherIds = conversations.map(c => c.user1 === auth.user.id? c.user2 : c.user1)
      const { data: profiles } = await supabase.from('profiles').select('*').in('id', otherIds)

      const list = await Promise.all(conversations.map(async c => {
        const otherId = c.user1 === auth.user.id? c.user2 : c.user1
        const raw = profiles?.find(p => p.id === otherId)
        if (!raw) return null
        const { data: last } = await supabase.from('messages').select('content,text').eq('conversation_id', c.id).order('id', { ascending: false }).limit(1).maybeSingle()
        return { id: c.id, profile: normalizeProfile(raw), lastMessage: (last as any)?.content || (last as any)?.text, created_at: c.created_at }
      }))
      setConvos(list.filter(Boolean) as Convo[])
      setStatus('')
    })()
  }, [])

  return (
    <div className="min-h-screen bg-[#fbf9ff] dark:bg-black">
      <header className="sticky top-0 z-30 bg-[#fbf9ff]/80 dark:bg-black/80 backdrop-blur-xl border-b px-5 py-3 flex justify-between">
        <div><p className="text-[10px] font-black tracking-[2px] text-violet-600/70">PRIVATE</p><h1 className="text-[22px] font-black mt-1 dark:text-white">Messages</h1></div>
      </header>
      <main className="px-4">
        {status && <p className="py-10 text-center text-sm text-stone-500">{status}</p>}
        {!status &&!convos.length && <div className="mt-10 text-center"><div className="text-5xl">💬</div><p className="mt-3 font-bold">No conversations yet</p><p className="text-sm text-zinc-500">Like someone to start chatting</p><Link href="/discover" className="mt-4 inline-block rounded-full bg-black text-white px-6 py-3 text-xs font-black">Discover</Link></div>}
        {convos.map(c => (
          <Link key={c.id} href={`/chat/${c.id}`} className="flex items-center gap-3 p-3 mt-3 rounded-[18px] bg-white dark:bg-zinc-900 border shadow-sm">
            <div className="h-12 w-12 rounded-full bg-zinc-200 overflow-hidden grid place-items-center font-bold">
              {c.profile.photos?.[0]? <img src={c.profile.photos[0]} className="h-full w-full object-cover" /> : c.profile.name[0]}
            </div>
            <div className="flex-1 min-w-0"><p className="font-bold text-sm dark:text-white">{c.profile.name}</p><p className="truncate text-xs text-zinc-500">{c.lastMessage || 'Start conversation...'}</p></div>
            <span className="text-zinc-400">→</span>
          </Link>
        ))}
      </main>
    </div>
  )
}