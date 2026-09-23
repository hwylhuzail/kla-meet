'use client'
import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'

export default function DiscoverClient({ initialProfiles }: any) {
  const supabase = createClient()
  const [profiles, setProfiles] = useState(initialProfiles || [])
  const [me, setMe] = useState<any>(null)
  const [showPaywall, setShowPaywall] = useState(false)

  useEffect(() => {
    (async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return
      const { data } = await supabase.from('profiles').select('*').eq('id', user.id).single()
      setMe(data)
    })()
  }, [])

  const handleLike = async (target: any) => {
    if (!me?.is_premium) {
      setShowPaywall(true)
      return
    }
    // Premium user - allow like
    const { data: { user } } = await supabase.auth.getUser()
    await supabase.from('likes').insert({ user_id: user?.id, liked_user_id: target.id })
    alert(`You liked ${target.full_name}! Starting chat...`)
    window.location.href = `/chat/${target.id}`
  }

  return (
    <div className="max-w-md mx-auto bg-white min-h-screen pb-20">
      <div className="p-4 border-b flex justify-between">
        <h1 className="font-bold">Discover</h1>
        <a href="/settings" className="text-sm border px-3 py-1 rounded-full">Settings</a>
      </div>

      {profiles.length === 0? (
        <div className="text-center p-10">
          <div className="text-4xl mb-4">💫</div>
          <h2 className="font-bold">No more people nearby</h2>
          <a href="/premium" className="inline-block bg-yellow-400 rounded-full px-6 py-3 mt-4 text-sm font-bold">Get Premium for Worldwide</a>
        </div>
      ) : (
        <div className="space-y-4 p-3">
          {profiles.map((p:any) => (
            <div key={p.id} className="rounded-2xl overflow-hidden border bg-white shadow-sm">
              <div className="w-full h-[500px] bg-gray-100">
                <img src={p.avatar_url || 'https://via.placeholder.com/400x600?text=KLA'} className="w-full h-full object-cover" />
              </div>
              <div className="p-4 flex justify-between items-center">
                <div>
                  <p className="font-bold text-lg">{p.full_name || 'User'} {p.age? `, ${p.age}` : ''}</p>
                  <p className="text-xs text-gray-500">{p.current_location || 'Katabi, UG'}</p>
                </div>
                <button onClick={()=>handleLike(p)} className="bg-black text-white w-12 h-12 rounded-full text-xl">❤️</button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* PAYWALL MODAL */}
      {showPaywall && (
        <div className="fixed inset-0 bg-black/70 z-50 flex items-end">
          <div className="bg-white w-full rounded-t-3xl p-6 text-center">
            <div className="text-4xl mb-2">🔒</div>
            <h2 className="font-bold text-xl">Upgrade to Premium to talk</h2>
            <p className="text-sm text-gray-500 mt-2">You need Premium to like and chat with people. See who liked you and start talking instantly.</p>
            <div className="mt-4 space-y-2 text-left text-sm bg-gray-50 p-3 rounded-xl">
              <div>✓ Unlimited likes</div>
              <div>✓ See who liked you</div>
              <div>✓ Chat with matches</div>
              <div>✓ Advanced filters + Travel</div>
            </div>
            <a href="/premium" className="block w-full bg-yellow-400 rounded-full py-3 font-bold mt-4">Upgrade to Premium - $13.51</a>
            <button onClick={()=>setShowPaywall(false)} className="w-full py-3 text-sm text-gray-500 mt-2">Maybe later</button>
          </div>
        </div>
      )}
    </div>
  )
}
