'use client'
import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import BottomNav from '../components/BottomNav'

export default function DiscoverClient({ initialProfiles, isPremium: initialIsPremium }: any) {
  const supabase = createClient()
  const [profiles, setProfiles] = useState(initialProfiles || [])
  const [isPremium, setIsPremium] = useState(initialIsPremium || false)
  const [showPaywall, setShowPaywall] = useState(false)

  useEffect(() => {
    (async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return
      const { data } = await supabase.from('profiles').select('is_premium').eq('id', user.id).single()
      if (data) setIsPremium(data.is_premium)
    })()
  }, [])

  const handleLike = async (target: any) => {
    if (!isPremium) { setShowPaywall(true); return }
    const { data: { user } } = await supabase.auth.getUser()
    await supabase.from('likes').insert({ user_id: user?.id, liked_user_id: target.id })
    window.location.href = `/chat/${target.id}`
  }

  const WhatYouGet = () => (
    <div className="space-y-3 my-4">
      <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-4">
        <span className="bg-black text-white text-[10px] px-2 py-1 rounded">PREMIUM</span>
        <p className="font-bold mt-2 text-sm">See who likes you and connect faster.</p>
        <p className="text-xs text-gray-500">Be seen by up to 10x more people</p>
        <a href="/premium" className="inline-block bg-black text-white rounded-full px-4 py-2 mt-3 text-xs font-bold">Explore Premium</a>
      </div>
      <div className="bg-white border rounded-2xl p-4">
        <h3 className="font-bold text-sm">What you get: Premium | Boost</h3>
        <div className="mt-3 text-xs space-y-0">
          <div className="flex justify-between py-2 border-b"><span>Unlimited likes</span><span>✓ Premium</span></div>
          <div className="flex justify-between py-2 border-b"><span>See who liked you</span><span>✓ Premium</span></div>
          <div className="flex justify-between py-2 border-b"><span>Advanced filters</span><span>✓ Premium</span></div>
          <div className="flex justify-between py-2 border-b"><span>Incognito mode</span><span>✓ Premium</span></div>
          <div className="flex justify-between py-2 border-b"><span>Travel mode</span><span>✓ Premium</span></div>
          <div className="flex justify-between py-2 border-b"><span>5 SuperSwipes / week</span><span>✓ Premium</span></div>
          <div className="flex justify-between py-2 border-b"><span>1 Spotlight / week</span><span>✓ Premium</span></div>
          <div className="flex justify-between py-2 border-b"><span>Unlimited Extends</span><span>✓ Premium</span></div>
          <div className="flex justify-between py-2 border-b"><span>Unlimited Rematch</span><span>✓ Premium</span></div>
          <div className="flex justify-between py-2"><span>Unlimited Backtrack</span><span>✓ Premium</span></div>
        </div>
      </div>
      <div className="bg-yellow-50 border rounded-2xl p-4">
        <span className="border border-black text-[10px] px-2 py-1 rounded">BOOST</span>
        <p className="font-bold mt-2 text-sm">More chances to be seen and match? Hi, Boost.</p>
        <a href="/premium" className="inline-block bg-black text-white rounded-full px-4 py-2 mt-3 text-xs font-bold">Explore Boost</a>
      </div>
    </div>
  )

  return (
    <div className="max-w-md mx-auto bg-white min-h-screen pb-20">
      <div className="p-4 border-b flex justify-between items-center">
        <h1 className="font-bold text-lg">kla-meet</h1>
        <div className="flex gap-2">
          <a href="/liked-you" className="text-xs border px-3 py-1.5 rounded-full">❤️</a>
          <a href="/premium" className="text-xs bg-yellow-400 px-3 py-1.5 rounded-full font-bold">Premium</a>
        </div>
      </div>

      <div className="p-3 space-y-4">
        {/* Show What You Get at top of page.tsx for free users */}
        {!isPremium && <WhatYouGet />}

        {profiles.map((p:any, idx:number) => (
          <div key={p.id}>
            <div className="rounded-2xl overflow-hidden border shadow-sm">
              <div className="w-full h-[500px] bg-gray-100">
                <img src={p.avatar_url || 'https://via.placeholder.com/400x600?text=KLA'} className="w-full h-full object-cover" />
              </div>
              <div className="p-4 flex justify-between items-center">
                <div><p className="font-bold">{p.full_name || 'User'}</p><p className="text-xs text-gray-500">{p.current_location || 'Katabi, UG'}</p></div>
                <button onClick={()=>handleLike(p)} className="bg-black text-white w-12 h-12 rounded-full text-xl">❤️</button>
              </div>
            </div>
            {/* Insert What You Get again after 2nd card */}
            {idx === 1 && !isPremium && <WhatYouGet />}
          </div>
        ))}
      </div>

      {showPaywall && (
        <div className="fixed inset-0 bg-black/70 z-50 flex items-end">
          <div className="bg-white w-full rounded-t-3xl p-6 text-center max-w-md mx-auto">
            <div className="text-4xl">🔒</div>
            <h2 className="font-bold text-xl mt-2">Upgrade to Premium to talk</h2>
            <a href="/premium" className="block w-full bg-yellow-400 rounded-full py-3 font-bold mt-4">Upgrade - $13.51</a>
            <button onClick={()=>setShowPaywall(false)} className="w-full py-3 text-sm text-gray-500">Maybe later</button>
          </div>
        </div>
      )}
      <BottomNav />
    </div>
  )
}
