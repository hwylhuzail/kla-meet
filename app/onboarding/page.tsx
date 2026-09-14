'use client'
import { useState } from 'react'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'

export default function Onboarding(){
  const [name,setName]=useState(''); const [bio,setBio]=useState(''); const [gender,setGender]=useState('male'); const r=useRouter();
  const save=async()=>{
    const {data:{user}}=await supabase.auth.getUser();
    if(!user) return r.push('/auth');
    await supabase.from('profiles').upsert({id:user.id, email:user.email, full_name:name, gender, bio, location:'Kampala'});
    r.push('/discover');
  }
  return <div className="p-6 max-w-sm mx-auto"><h2 className="text-2xl font-bold mb-4">Setup Profile</h2>
  <input className="w-full p-3 border rounded-xl mb-3" placeholder="Full name" onChange={e=>setName(e.target.value)}/>
  <select className="w-full p-3 border rounded-xl mb-3" onChange={e=>setGender(e.target.value)}><option value="male">Male</option><option value="female">Female</option></select>
  <textarea className="w-full p-3 border rounded-xl mb-4" placeholder="Bio" onChange={e=>setBio(e.target.value)}/>
  <button onClick={save} className="w-full bg-black text-white p-3 rounded-xl">Continue</button></div>
}