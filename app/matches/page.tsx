'use client'
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import BottomNav from '@/components/BottomNav'
import Link from 'next/link'
export default function Matches(){
  const [matches,setMatches]=useState<any[]>([]);
  useEffect(()=>{supabase.auth.getUser().then(async({data})=>{const {data:m}=await supabase.from('matches').select('*, user1:profiles!matches_user1_fkey(full_name), user2:profiles!matches_user2_fkey(full_name)').or(`user1.eq.${data.user?.id},user2.eq.${data.user?.id}`); setMatches(m||[])})},[]);
  return <div className="p-4 pb-20"><h1 className="text-xl font-bold mb-4">Matches</h1>{matches.map(m=><Link key={m.id} href={`/chat/${m.id}`} className="block bg-white p-4 rounded-xl mb-2 shadow">Match: {m.id.slice(0,8)} → Chat</Link>)}<BottomNav/></div>
}