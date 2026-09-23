'use client'
import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
export default function SettingsPage(){
  const supabase=createClient()
  const [email,setEmail]=useState('')
  useEffect(()=>{(async()=>{const {data:{user}}=await supabase.auth.getUser(); setEmail(user?.email||'')})()},[])
  return(<div className="max-w-md mx-auto p-4"><a href="/" className="w-9 h-9 border rounded-full flex items-center justify-center">←</a><h1 className="font-bold mt-4">Settings</h1><p className="text-sm mt-2">{email}</p><div className="mt-6 space-y-2 text-sm underline"><a href="/privacy">Privacy</a><br/><a href="/terms">Terms</a><br/><a href="/safety">Safety</a><br/><a href="/guidelines">Guidelines</a></div><a href="/" className="block bg-black text-white text-center rounded-full py-3 mt-6">← Back to Site</a></div>)
}
