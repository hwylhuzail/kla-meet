'use client'
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import BottomNav from '@/components/BottomNav'
import Link from 'next/link'
export default function Matches(){
  const [matches,setMatches]=useState<any[]>([]);
  useEffect(()=>{supabase.auth.getUser().then(async({data})=>{const {data:m}=await supabase.from('matches').select('*, user1:profiles!matches_user1_fkey(full_name), user2:profiles!matches_user2_fkey(full_name)').or(`user1.eq.${data.user?.id},user2.eq.${data.user?.id}`); setMatches(m||[])})},[]);
  return <div className="app-shell"><header className="topbar"><div><p className="eyebrow">Your people</p><h1 className="display text-2xl font-bold mt-1">Matches</h1></div><button className="icon-button" aria-label="More options">⋯</button></header><main className="content">{matches.length===0 ? <div className="soft-panel text-center mt-5"><div className="text-4xl mb-3">♡</div><h2 className="display font-bold text-xl">Your matches will appear here</h2><p className="text-sm text-stone-500 mt-2">Like someone in Discover and start a conversation when the feeling is mutual.</p></div> : matches.map(m=><Link key={m.id} href={`/chat/${m.id}`} className="soft-panel block mb-3 no-underline"><div className="flex items-center gap-3"><div className="w-12 h-12 rounded-full bg-[#ffc629] grid place-items-center font-bold">{(m.id || 'M').slice(0,1).toUpperCase()}</div><div><p className="font-bold">New match</p><p className="text-xs text-stone-500">Tap to start chatting</p></div><span className="ml-auto">→</span></div></Link>)}</main><BottomNav/></div>
}