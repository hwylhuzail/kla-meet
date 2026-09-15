'use client'
import { useState } from 'react'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'
export default function Auth(){
  const [email,setEmail]=useState(''); const [pass,setPass]=useState(''); const r=useRouter();
  const login=async()=>{
    const {data,error}=await supabase.auth.signInWithPassword({email,password:pass});
    if(error){const {error:se}=await supabase.auth.signUp({email,password:pass}); if(se) alert(se.message); else alert('Check email, then login');}
    else r.push('/onboarding');
  }
  return <div className="min-h-screen flex items-center justify-center p-6" style={{background:'#ffc629'}}><div className="bg-white p-7 rounded-[24px] w-full max-w-sm shadow-xl"><h1 className="brand">KLA<span className="brand-mark">•</span></h1><p className="text-sm text-stone-500 mt-2 mb-7">Sign in and start meeting better people.</p><input className="field mb-3" placeholder="Email" onChange={e=>setEmail(e.target.value)}/><input className="field mb-4" type="password" placeholder="Password" onChange={e=>setPass(e.target.value)}/><button onClick={login} className="primary-button w-full">Continue</button><p className="text-xs text-center text-stone-400 mt-5">18+ only · Kampala and beyond</p></div></div>
}