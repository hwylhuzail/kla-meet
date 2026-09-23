'use client'
import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
export default function LikedYouPage(){
  const supabase=createClient()
  const [me,setMe]=useState<any>(null)
  const [loading,setLoading]=useState(true)
  useEffect(()=>{(async()=>{const {data:{user}}=await supabase.auth.getUser(); if(!user){window.location.href='/login'; return}; const {data}=await supabase.from('profiles').select('is_premium').eq('id',user.id).single(); setMe(data); setLoading(false)})()},[])
  if(loading) return <div className="p-6">Loading...</div>
  if(!me?.is_premium){return(<div className="max-w-md mx-auto bg-white min-h-screen"><div className="p-4 border-b flex items-center gap-3"><a href="/" className="w-9 h-9 border rounded-full flex items-center justify-center">←</a><h1 className="font-bold">Liked You</h1></div><div className="p-6 text-center"><p className="font-bold">See who likes you - Premium only</p><a href="/premium" className="block bg-yellow-400 rounded-full py-3 font-bold mt-4">Explore Premium</a><a href="/" className="block bg-black text-white rounded-full py-3 font-bold mt-3">← Back to Site</a></div></div>)}
  return(<div className="max-w-md mx-auto p-4"><a href="/" className="w-9 h-9 border rounded-full flex items-center justify-center">←</a><p className="font-bold mt-4">Liked You - Premium</p></div>)
}
