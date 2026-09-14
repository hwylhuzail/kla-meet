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
  return <div className="min-h-screen flex items-center justify-center p-6"><div className="bg-white p-8 rounded-2xl w-full max-w-sm shadow"><h1 className="text-3xl font-bold bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">KLA MEET</h1><p className="text-sm mb-6">Find Love Near You</p><input className="w-full p-3 border rounded-xl mb-3" placeholder="Email" onChange={e=>setEmail(e.target.value)}/><input className="w-full p-3 border rounded-xl mb-4" type="password" placeholder="Password" onChange={e=>setPass(e.target.value)}/><button onClick={login} className="w-full bg-gradient-to-r from-pink-500 to-purple-600 text-white p-3 rounded-xl">Continue</button></div></div>
}