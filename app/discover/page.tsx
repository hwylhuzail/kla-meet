'use client'
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import BottomNav from '@/components/BottomNav'

export default function Discover(){
  const [profiles,setProfiles]=useState<any[]>([]); const [i,setI]=useState(0);
  useEffect(()=>{supabase.from('profiles').select('*').limit(20).then(({data})=>setProfiles(data||[]))},[]);
  const like=async(t:string)=>{
    const {data:{user}}=await supabase.auth.getUser(); const target=profiles[i];
    if(!user||!target) return;
    await supabase.from('likes').insert({from_user:user.id, to_user:target.id, type:t});
    const {data:mutual}=await supabase.from('likes').select('*').eq('from_user',target.id).eq('to_user',user.id).single();
    if(mutual){await supabase.from('matches').insert({user1:user.id, user2:target.id}); alert('It\'s a Match! 💜')}
    setI(i+1);
  }
  const cur=profiles[i];
  if(!cur) return <div className="app-shell"><main className="content text-center pt-20"><p className="eyebrow">That&apos;s everyone</p><h1 className="display text-3xl font-bold mt-2">No more profiles nearby</h1><p className="text-sm text-stone-500 mt-3 mb-7">Try widening your preferences to meet more people.</p><button onClick={()=>setI(0)} className="primary-button">Show them again</button></main><BottomNav/></div>
  return <div className="app-shell"><header className="topbar"><h1 className="brand">KLA<span className="brand-mark">•</span></h1><button className="icon-button" aria-label="Filters">⌁</button></header><main className="content"><div className="flex items-end justify-between mb-4"><div><p className="eyebrow">Discover</p><h2 className="display text-2xl font-bold mt-1">Fresh faces</h2></div><span className="text-xs text-stone-500">Kampala</span></div><div className="profile-card"><div className="w-full h-full bg-stone-200 flex items-center justify-center text-6xl">👤</div><div className="profile-info"><h2>{cur.full_name} {cur.is_verified?'✓':''}</h2><p>{cur.location} · {cur.bio || 'New around here'}</p><div className="chip-row"><span className="chip">Nearby</span><span className="chip">Looking to connect</span></div></div></div><div className="action-row"><button onClick={()=>like('pass')} className="round-action" aria-label="Pass">✕</button><button onClick={()=>like('superlike')} className="round-action" aria-label="Super like">★</button><button onClick={()=>like('like')} className="round-action primary" aria-label="Like">♥</button></div></main><BottomNav/></div>
}