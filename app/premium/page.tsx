'use client'
import { useState } from 'react'

export default function PremiumPage() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const urlParams = typeof window!== 'undefined'? new URLSearchParams(window.location.search) : null
  const paymentStatus = urlParams?.get('payment')

  const pay = async (plan: string, amount: number) => {
    if (!email) { setError('Enter email first'); return }
    setLoading(true); setError('')
    try {
      const res = await fetch('/api/pesapal/order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, amount, plan, currency: 'USD' })
      })
      const data = await res.json()
      if (data.redirect_url) {
        window.location.href = data.redirect_url
      } else {
        setError(data.error || JSON.stringify(data.details) || 'Order failed')
      }
    } catch (e: any) { setError(e.message) }
    setLoading(false)
  }

  return (
    <div className="max-w-md mx-auto bg-white min-h-screen">
      <div className="p-4">
        <h1 className="font-bold">kla-meet</h1>
        {paymentStatus === 'success' && <div className="bg-green-100 text-green-800 p-3 rounded mt-2">Payment success! Premium activating...</div>}
        {paymentStatus === 'pending' && <div className="bg-yellow-100 p-3 rounded mt-2">Payment pending - checking...</div>}
      </div>

      <div className="px-4 space-y-3">
        <button onClick={()=>pay('Basic', 5.41)} className="w-full border rounded-xl py-3">Basic $5.41 30 days premium</button>
        <button onClick={()=>pay('Pro', 13.51)} className="w-full bg-yellow-100 border-2 border-yellow-400 rounded-xl py-3 font-bold">POPULAR Pro $13.51 30 days premium</button>

        <div className="pt-4 space-y-2 text-sm">
          <div>⭐ Unlimited discovery</div>
          <div>🌍 Worldwide filters</div>
          <div>❤️ See who liked you</div>
          <div>✨ Profile priority</div>
          <div>🎯 Advanced matching</div>
          <div>🔒 Incognito mode</div>
          <div>💬 Translation-ready chats</div>
          <div>🛡️ Safety tools</div>
        </div>

        <div className="pt-4">
          <input value={email} onChange={e=>setEmail(e.target.value)} placeholder="huzayirukalungi4@gmail.com" className="w-full border rounded-xl p-3" />
          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
        </div>

        <button disabled={loading} onClick={()=>pay('Pro', 13.51)} className="w-full bg-yellow-400 rounded-full py-3 font-bold mt-2">
          {loading? 'Processing...' : 'Pay $13.51 USD'}
        </button>
        <p className="text-xs text-center">🔒 Secured by Pesapal - Cards • Bank Account • Worldwide</p>

        <div className="mt-6 bg-yellow-100 rounded-xl p-4">
          <span className="bg-black text-white text-xs px-2 py-1 rounded">PREMIUM</span>
          <p className="font-bold mt-2">See who likes you and connect faster.</p>
          <button className="bg-black text-white rounded-full px-4 py-2 mt-2 text-sm">Explore Premium</button>
        </div>

        <div className="mt-4">
          <h3 className="font-bold">What you get: Premium Boost</h3>
          <div className="text-sm mt-2 space-y-2">
            <div className="flex justify-between"><span>Unlimited likes</span><span>✓</span></div>
            <div className="flex justify-between"><span>See who liked you</span><span>✓</span></div>
            <div className="flex justify-between"><span>Advanced filters</span><span>✓</span></div>
            <div className="flex justify-between"><span>Incognito mode</span><span>✓</span></div>
            <div className="flex justify-between"><span>Travel mode</span><span>✓</span></div>
            <div className="flex justify-between"><span>5 SuperSwipes a week</span><span>✓</span></div>
            <div className="flex justify-between"><span>1 Spotlight a week</span><span>✓</span></div>
            <div className="flex justify-between"><span>Unlimited Extends</span><span>✓</span></div>
            <div className="flex justify-between"><span>Unlimited Rematch</span><span>✓</span></div>
            <div className="flex justify-between"><span>Unlimited Backtrack</span><span>✓</span></div>
          </div>
        </div>

        <div className="mt-6 bg-yellow-100 rounded-xl p-4">
          <span className="border border-black text-xs px-2 py-1 rounded">Boost</span>
          <p className="font-bold mt-2">More chances to be seen and match? Hi, Boost.</p>
          <button className="bg-black text-white rounded-full px-4 py-2 mt-2 text-sm">Explore Boost</button>
        </div>
      </div>
    </div>
  )
}
