'use client'
import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
export default function LikedYouPage() {
  const supabase = createClient()
  const [me, setMe] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  useEffect(() => {(async () => {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) { window.location.href='/login'; return }
    const { data } = await supabase.from('profiles').select('is_premium').eq('id', user.id).single()
    setMe(data); setLoading(false)
  })()}, [])
  if (loading) return <div className="p-6">Loading...</div>
  if (!me?.is_premium) {
    return (<div className="max-w-md mx-auto bg-white min-h-screen"><div className="p-4 border-b flex items-center gap-3"><a href="/" className="w-9 h-9 border rounded-full flex items-center justify-center">←</a><h1 className="font-bold">Liked You</h1></div><div className="p-6 text-center"><p className="font-bold text-xl">See who likes you</p><p className="text-sm text-gray-500 mt-2">Be seen by 10x more</p><div className="grid grid-cols-3 gap-2 mt-6 blur-sm opacity-50"><div className="h-32 bg-gray-200 rounded-xl"></div><div className="h-32 bg-gray-200 rounded-xl"></div><div className="h-32 bg-gray-200 rounded-xl"></div></div><a href="/premium" className="block w-full bg-yellow-400 rounded-full py-3 font-bold mt-6">Explore Premium - $13.51</a><a href="/" className="block w-full bg-black text-white text-center rounded-full py-3 font-bold mt-3">← Back to Site</a></div></div>)
  }
  return (<div className="max-w-md mx-auto bg-white min-h-screen p-4"><a href="/" className="w-9 h-9 border rounded-full flex items-center justify-center">←</a><h1 className="font-bold mt-4">People who liked you (Premium)</h1></div>)
}
