'use client'
import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
export default function ChatPage({ params }: any) {
  const supabase = createClient()
  const [allowed, setAllowed] = useState(false)
  const [loading, setLoading] = useState(true)
  useEffect(() => {(async () => {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) { window.location.href='/login'; return }
    const { data } = await supabase.from('profiles').select('is_premium').eq('id', user.id).single()
    setAllowed(!!data?.is_premium); setLoading(false)
  })()}, [])
  if (loading) return <div className="p-6">Loading...</div>
  if (!allowed) return (<div className="max-w-md mx-auto bg-white min-h-screen p-6 text-center pt-20"><h1 className="font-bold text-xl">Premium required to chat</h1><a href="/premium" className="block bg-yellow-400 rounded-full py-3 font-bold mt-6">Upgrade</a><a href="/" className="block mt-3 text-sm">← Back to Site</a></div>)
  return <div className="max-w-md mx-auto p-6"><a href="/" className="border rounded-full w-9 h-9 flex items-center justify-center">←</a><h1 className="font-bold mt-4">Chat {params.id}</h1></div>
}
