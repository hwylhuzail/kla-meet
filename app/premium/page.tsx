'use client'
import { useState } from 'react'

export default function PremiumPage() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const params = typeof window !== 'undefined' ? new URLSearchParams(window.location.search) : null
  const paymentStatus = params?.get('payment')

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
      if (data.redirect_url) window.location.href = data.redirect_url
      else setError(data.error || JSON.stringify(data.details))
    } catch (e:any){ setError(e.message) }
    setLoading(false)
  }

  return (
    <div className="max-w-md mx-auto bg-white min-h-screen pb-20">
      <div className="p-4 flex items-center gap-2 border-b">
        <a href="/" className="text-xl">←</a>
        <h1 className="font-bold">Premium</h1>
      </div>

      {paymentStatus === 'success' && <div className="mx-4 mt-3 bg-green-100 text-green-800 p-3 rounded text-sm">Payment success! Premium will activate in 1 min.</div>}
      {error && <div className="mx-4 mt-3 bg-red-100 text-red-700 p-3 rounded text-sm">{error}</div>}

      <div className="p-4 space-y-4">
        {/* NO PHOTOS - ONLY PLANS */}
        <div className="border rounded-xl p-4">
          <div className="flex justify-between items-center">
            <h2 className="font-bold">Basic</h2>
            <span className="text-sm">$5.41</span>
          </div>
          <p className="text-xs text-gray-500 mt-1">30 days premium • 20,017 UGX</p>
          <button onClick={()=>pay('Basic', 5.41)} disabled={loading} className="w-full mt-3 border rounded-full py-2 font-semibold">Get Basic</button>
        </div>

        <div className="border-2 border-yellow-400 bg-yellow-50 rounded-xl p-4">
          <div className="flex justify-between items-center">
            <h2 className="font-bold">Pro ⭐ POPULAR</h2>
            <span className="text-sm font-bold">$13.51</span>
          </div>
          <p className="text-xs text-gray-500 mt-1">30 days premium • Capped 24k UGX until Pesapal limit increase</p>
          <button onClick={()=>pay('Pro', 13.51)} disabled={loading} className="w-full mt-3 bg-yellow-400 rounded-full py-2 font-bold">Get Pro</button>
        </div>

        <input value={email} onChange={e=>setEmail(e.target.value)} placeholder="Enter email for receipt" className="w-full border rounded-xl p-3 text-sm" />

        {/* FEATURES LIST - NO PHOTOS */}
        <div className="pt-4">
          <h3 className="font-bold text-sm">What you get:</h3>
          <div className="mt-3 space-y-2 text-sm">
            <div className="flex justify-between py-1 border-b"><span>Unlimited likes</span><span>✓</span></div>
            <div className="flex justify-between py-1 border-b"><span>See who liked you</span><span>✓</span></div>
            <div className="flex justify-between py-1 border-b"><span>Advanced filters</span><span>✓</span></div>
            <div className="flex justify-between py-1 border-b"><span>Incognito mode</span><span>✓</span></div>
            <div className="flex justify-between py-1 border-b"><span>Travel mode</span><span>✓</span></div>
            <div className="flex justify-between py-1 border-b"><span>5 SuperSwipes / week</span><span>✓</span></div>
            <div className="flex justify-between py-1 border-b"><span>1 Spotlight / week</span><span>✓</span></div>
            <div className="flex justify-between py-1 border-b"><span>Unlimited Extends</span><span>✓</span></div>
            <div className="flex justify-between py-1 border-b"><span>Unlimited Rematch</span><span>✓</span></div>
            <div className="flex justify-between py-1"><span>Unlimited Backtrack</span><span>✓</span></div>
          </div>
        </div>

        <p className="text-xs text-center text-gray-400 mt-6">🔒 Secured by Pesapal - MTN, Airtel, Cards, Bank</p>
      </div>
    </div>
  )
}
