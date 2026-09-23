'use client'
import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import BottomNav from '@/app/components/BottomNav'

export default function DiscoverClient({ initialProfiles, isPremium: initialIsPremium }: any) {
  const supabase = createClient()
  const [profiles] = useState(initialProfiles || [])
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
  const handleLike = (p:any) => { if (!isPremium) setShowPaywall(true); else window.location.href=`/chat/${p.id}` }
  return (
    <div className="max-w-md mx-auto bg-white min-h-screen pb-20">
      <div className="p-4 border-b flex justify-between"><h1 className="font-bold">kla-meet</h1><a href="/premium" className="text-xs bg-yellow-400 px-3 py-1.5 rounded-full font-bold">Premium</a></div>
      {!isPremium && (
        <div className="p-3 space-y-3">
          <div className="bg-yellow-50 border rounded-2xl p-4"><span className="bg-black text-white text-[10px] px-2 py-1 rounded">PREMIUM</span><p className="font-bold mt-2 text-sm">See who likes you and connect faster.</p><a href="/premium" className="inline-block bg-black text-white rounded-full px-4 py-2 mt-3 text-xs font-bold">Explore Premium</a></div>
          <div className="bg-white border rounded-2xl p-4"><h3 className="font-bold text-sm">What you get: Premium | Boost</h3><div className="mt-3 text-xs space-y-1"><div className="flex justify-between py-2 border-b"><span>Unlimited likes</span><span>✓ Premium</span></div><div className="flex justify-between py-2 border-b"><span>See who liked you</span><span>✓ Premium</span></div><div className="flex justify-between py-2 border-b"><span>Advanced filters</span><span>✓ Premium</span></div><div className="flex justify-between py-2 border-b"><span>Incognito mode</span><span>✓ Premium</span></div><div className="flex justify-between py-2 border-b"><span>Travel mode</span><span>✓ Premium</span></div><div className="flex justify-between py-2"><span>5 SuperSwipes / 1 Spotlight / Extends / Rematch / Backtrack</span><span>✓</span></div></div></div>
        </div>
      )}
      <div className="p-3 space-y-4">
        {profiles.map((p:any)=>(
          <div key={p.id} className="rounded-2xl overflow-hidden border shadow-sm"><div className="w-full h-[500px] bg-gray-100"><img src={p.avatar_url || 'https://via.placeholder.com/400x600?text=KLA'} className="w-full h-full object-cover" alt="" /></div><div className="p-4 flex justify-between items-center"><div><p className="font-bold">{p.full_name || 'User'}</p><p className="text-xs text-gray-500">{p.current_location || 'Katabi, UG'}</p></div><button onClick={()=>handleLike(p)} className="bg-black text-white w-12 h-12 rounded-full">❤️</button></div></div>
        ))}
      </div>
      {showPaywall && <div className="fixed inset-0 bg-black/70 z-50 flex items-end"><div className="bg-white w-full rounded-t-3xl p-6 text-center max-w-md mx-auto"><h2 className="font-bold text-xl">Upgrade to Premium to talk</h2><a href="/premium" className="block w-full bg-yellow-400 rounded-full py-3 font-bold mt-4">Upgrade - $13.51</a><button onClick={()=>setShowPaywall(false)} className="w-full py-3 text-sm text-gray-500">Maybe later</button></div></div>}
      <BottomNav />
    </div>
  )
}
