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
  if(!cur) return <div className="p-10 text-center">No more profiles in Kampala<br/><br/><button onClick={()=>setI(0)} className="bg-pink-500 text-white px-6 py-2 rounded-full">Reload</button><BottomNav/></div>
  return <div className="min-h-screen pb-20"><div className="p-4 max-w-sm mx-auto">
    <h1 className="font-bold text-xl mb-4">KLA MEET</h1>
    <div className="bg-white rounded-[30px] shadow-xl overflow-hidden"><div className="h-[450px] bg-gray-200 flex items-center justify-center text-6xl">👤</div><div className="p-5"><h2 className="text-xl font-bold">{cur.full_name} {cur.is_verified?'✅':''}</h2><p className="text-gray-500 text-sm">{cur.location} • {cur.bio}</p></div></div>
    <div className="flex justify-center gap-6 mt-6"><button onClick={()=>like('pass')} className="w-16 h-16 bg-white rounded-full shadow text-2xl">✕</button><button onClick={()=>like('superlike')} className="w-16 h-16 bg-blue-500 text-white rounded-full shadow text-2xl">★</button><button onClick={()=>like('like')} className="w-16 h-16 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-full shadow text-2xl">♥</button></div>
  </div><BottomNav/></div>
}