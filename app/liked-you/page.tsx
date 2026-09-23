'use client'
import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'

export default function LikedYouPage() {
  const supabase = createClient()
  const [me, setMe] = useState<any>(null)
  const [likedYou, setLikedYou] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    (async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) { window.location.href='/login'; return }
      const { data: profile } = await supabase.from('profiles').select('*').eq('id', user.id).single()
      setMe(profile)

      if (profile?.is_premium) {
        const { data } = await supabase.from('likes').select('user_id, profiles!likes_user_id_fkey(*)').eq('liked_user_id', user.id)
        setLikedYou(data || [])
      }
      setLoading(false)
    })()
  }, [])

  if (loading) return <div className="p-6">Loading...</div>

  if (!me?.is_premium) {
    return (
      <div className="max-w-md mx-auto bg-white min-h-screen pb-20">
        <div className="p-4 border-b flex items-center gap-2">
          <a href="/" className="text-xl">←</a>
          <h1 className="font-bold">Liked You</h1>
        </div>

        <div className="p-6 text-center pt-12">
          <div className="w-20 h-20 bg-yellow-100 rounded-full flex items-center justify-center mx-auto text-3xl">❤️</div>
          <h2 className="font-bold text-xl mt-4">See who likes you and connect faster</h2>
          <p className="text-sm text-gray-500 mt-2">Be seen by up to 10x more people with Premium</p>

          <div className="grid grid-cols-3 gap-2 mt-6 blur-sm opacity-50">
            {[1,2,3,4,5,6].map(i=>(
              <div key={i} className="h-32 bg-gray-200 rounded-xl"></div>
            ))}
          </div>

          <div className="mt-6 bg-yellow-50 border-2 border-yellow-400 rounded-xl p-4 text-left">
            <span className="bg-black text-white text-xs px-2 py-1 rounded">PREMIUM</span>
            <p className="font-bold mt-2 text-sm">What you get:</p>
            <div className="text-sm mt-2 space-y-1">
              <div>✓ See who liked you</div>
              <div>✓ Unlimited likes</div>
              <div>✓ Advanced filters</div>
              <div>✓ Travel mode - change to any city</div>
              <div>✓ Incognito mode</div>
              <div>✓ 5 SuperSwipes / week</div>
              <div>✓ 1 Spotlight / week</div>
            </div>
          </div>

          <a href="/premium" className="block w-full bg-yellow-400 rounded-full py-3 font-bold mt-6">Explore Premium - $13.51</a>
          <p className="text-xs text-gray-400 mt-2">3 people liked you - upgrade to see</p>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-md mx-auto bg-white min-h-screen pb-20">
      <div className="p-4 border-b flex items-center gap-2">
        <a href="/" className="text-xl">←</a>
        <h1 className="font-bold">Liked You ({likedYou.length})</h1>
      </div>
      <div className="grid grid-cols-2 gap-2 p-3">
        {likedYou.map((l:any, idx:number)=>(
          <div key={idx} className="rounded-xl overflow-hidden border">
            <img src={l.profiles?.avatar_url || 'https://via.placeholder.com/300'} className="w-full h-48 object-cover" />
            <div className="p-2">
              <p className="font-bold text-sm">{l.profiles?.full_name || 'User'}</p>
              <p className="text-xs text-gray-500">{l.profiles?.current_location || 'UG'}</p>
              <a href={`/chat/${l.user_id}`} className="block bg-black text-white text-xs rounded-full py-1 text-center mt-2">Chat Now</a>
            </div>
          </div>
        ))}
      </div>
      {likedYou.length === 0 && <p className="text-center p-10 text-sm text-gray-500">No likes yet - boost your profile!</p>}
    </div>
  )
}
