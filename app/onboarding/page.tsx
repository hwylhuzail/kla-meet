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
  return <div className="min-h-screen p-6"><div className="max-w-sm mx-auto pt-8"><p className="eyebrow">Your profile</p><h2 className="display text-3xl font-bold mt-2 mb-2">Let people meet you.</h2><p className="text-sm text-stone-500 mb-7">A little personality goes a long way.</p>
  <input className="field mb-3" placeholder="Full name" onChange={e=>setName(e.target.value)}/>
  <select className="field mb-3" onChange={e=>setGender(e.target.value)}><option value="male">I am a man</option><option value="female">I am a woman</option></select>
  <textarea className="field mb-4 min-h-32" placeholder="Tell us something people should know..." onChange={e=>setBio(e.target.value)}/>
  <button onClick={save} className="primary-button w-full">Continue</button></div></div>
}