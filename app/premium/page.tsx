'use client'
import { useState } from 'react'

export default function PremiumPage() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const params = typeof window!== 'undefined'? new URLSearchParams(window.location.search) : null
  const status = params?.get('payment')

  const pay = async (plan: string, amount: number) => {
    if (!email) { setError('Enter email first'); return }
    setLoading(true); setError('')
    try {
      const res = await fetch('/api/pesapal/order', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email, amount, plan }) })
      const data = await res.json()
      if (data.redirect_url) window.location.href = data.redirect_url
      else setError(data.error || JSON.stringify(data))
    } catch (e:any){ setError(e.message) }
    setLoading(false)
  }

  return (
    <div className="max-w-md mx-auto bg-white min-h-screen pb-20">
      <div className="p-4 border-b flex items-center gap-2"><a href="/">←</a><h1 className="font-bold">Premium</h1></div>

      {status === 'success' && <div className="mx-4 mt-3 bg-green-100 p-3 rounded text-sm">Payment success! Activating...</div>}
      {error && <div className="mx-4 mt-3 bg-red-100 p-3 rounded text-sm">{error}</div>}

      <div className="p-4 space-y-4">
        <input value={email} onChange={e=>setEmail(e.target.value)} placeholder="Email for receipt" className="w-full border rounded-xl p-3 text-sm" />

        <div className="border rounded-xl p-4 flex justify-between items-center">
          <div><h2 className="font-bold">Basic</h2><p className="text-xs text-gray-500">30 days • UGX 20,017 • $5.41</p></div>
          <button onClick={()=>pay('Basic', 5.41)} disabled={loading} className="border rounded-full px-4 py-2 text-sm font-bold">Get Basic</button>
        </div>

        <div className="border-2 border-yellow-400 bg-yellow-50 rounded-xl p-4 flex justify-between items-center">
          <div><h2 className="font-bold">Pro ⭐ POPULAR</h2><p className="text-xs text-gray-500">30 days • $13.51 - Best value</p></div>
          <button onClick={()=>pay('Pro', 13.51)} disabled={loading} className="bg-yellow-400 rounded-full px-4 py-2 text-sm font-bold">Get Pro</button>
        </div>

        <button onClick={()=>pay('Pro', 13.51)} disabled={loading} className="w-full bg-yellow-400 rounded-full py-3 font-bold">{loading? 'Processing...' : 'Pay $13.51 USD'}</button>
        <p className="text-xs text-center text-gray-400">🔒 Secured by Pesapal • MTN, Airtel, Cards</p>

        {/* WHAT YOU GET - ON PREMIUM PAGE TOO */}
        <div className="pt-6">
          <div className="bg-yellow-50 border rounded-2xl p-4">
            <span className="bg-black text-white text-[10px] px-2 py-1 rounded">PREMIUM</span>
            <p className="font-bold mt-2">See who likes you and connect faster.</p>
            <p className="text-xs text-gray-500 mt-1">Be seen by up to 10x more people</p>
          </div>

          <div className="mt-4 bg-white border rounded-2xl p-4">
            <h3 className="font-bold text-sm">What you get: Premium | Boost</h3>
            <div className="mt-3 text-sm space-y-0">
              <div className="flex justify-between py-2.5 border-b"><span>Unlimited likes</span><span>✓</span></div>
              <div className="flex justify-between py-2.5 border-b"><span>See who liked you</span><span>✓</span></div>
              <div className="flex justify-between py-2.5 border-b"><span>Advanced filters</span><span>✓</span></div>
              <div className="flex justify-between py-2.5 border-b"><span>Incognito mode</span><span>✓</span></div>
              <div className="flex justify-between py-2.5 border-b"><span>Travel mode</span><span>✓</span></div>
              <div className="flex justify-between py-2.5 border-b"><span>5 SuperSwipes a week</span><span>✓</span></div>
              <div className="flex justify-between py-2.5 border-b"><span>1 Spotlight a week</span><span>✓</span></div>
              <div className="flex justify-between py-2.5 border-b"><span>Unlimited Extends</span><span>✓</span></div>
              <div className="flex justify-between py-2.5 border-b"><span>Unlimited Rematch</span><span>✓</span></div>
              <div className="flex justify-between py-2.5"><span>Unlimited Backtrack</span><span>✓</span></div>
            </div>
          </div>

          <div className="mt-4 bg-yellow-50 border rounded-2xl p-4">
            <span className="border border-black text-[10px] px-2 py-1 rounded">BOOST</span>
            <p className="font-bold mt-2 text-sm">More chances to be seen and match? Hi, Boost.</p>
            <p className="text-xs text-gray-500 mt-1">Get up to 10x more matches</p>
          </div>
        </div>
      </div>
    </div>
  )
}
