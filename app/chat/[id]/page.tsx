'use client'
import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'

export default function ChatPage({ params }: any) {
  const supabase = createClient()
  const [allowed, setAllowed] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    (async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) { window.location.href='/login'; return }
      const { data: me } = await supabase.from('profiles').select('is_premium').eq('id', user.id).single()
      if (!me?.is_premium) {
        setAllowed(false)
      } else {
        setAllowed(true)
      }
      setLoading(false)
    })()
  }, [])

  if (loading) return <div className="p-6">Loading...</div>

  if (!allowed) {
    return (
      <div className="max-w-md mx-auto bg-white min-h-screen p-6 text-center pt-20">
        <div className="text-5xl mb-4">💬🔒</div>
        <h1 className="font-bold text-xl">Premium required to chat</h1>
        <p className="text-sm text-gray-500 mt-2">You liked this person, but you need Premium to start talking. Upgrade now to chat instantly.</p>
        <a href="/premium" className="block bg-yellow-400 rounded-full py-3 font-bold mt-6">Upgrade to Premium</a>
        <a href="/" className="block mt-3 text-sm text-gray-500">Back to Discover</a>
      </div>
    )
  }

  return (
    <div className="max-w-md mx-auto p-6">
      <h1 className="font-bold">Chat with {params.id}</h1>
      <p className="text-sm text-gray-500">Chat UI here - premium user allowed</p>
    </div>
  )
}
