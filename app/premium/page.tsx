'use client'

import { useState } from 'react'

const plans = [
  { id: 'week', label: 'Week', amount: 15000, detail: '15,000 UGX' },
  { id: 'month', label: 'Month', amount: 45000, detail: '45,000 UGX', popular: true },
  { id: 'three-months', label: '3 Months', amount: 99000, detail: '99,000 UGX' },
]

export default function Premium() {
  const [selected, setSelected] = useState(plans[1])
  const [phone, setPhone] = useState('256')
  const [email, setEmail] = useState('')
  const [busy, setBusy] = useState('')

  async function pay(method: 'pesapal' | 'mtn' | 'airtel') {
    setBusy(method)
    const endpoint = method === 'pesapal' ? '/api/pesapal/order' : `/api/momo/${method}`
    const response = await fetch(endpoint, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ amount: selected.amount, plan: selected.label, email, phone }) })
    const result = await response.json()
    setBusy('')
    if (!response.ok) return alert(result.error || 'Payment could not be started')
    if (result.redirect_url) window.location.href = result.redirect_url
    else alert(result.message || 'Payment request sent. Check your phone.')
  }

  return <main className="min-h-screen bg-[#111111] px-5 py-8 text-white md:flex md:justify-center"><div className="w-full max-w-[480px]"><div className="flex items-center justify-between"><div><p className="text-[26px] font-bold tracking-[-1.5px]">KLA<span className="text-[#FFC800]">•</span></p><p className="mt-1 text-xs text-white/50">Premium connections</p></div><span className="rounded-full bg-[#FFC800] px-3 py-1 text-xs font-bold text-[#111111]">18+</span></div><div className="mt-12"><p className="text-xs tracking-[2px] text-[#FFC800]">GO FURTHER</p><h1 className="mt-3 text-4xl font-bold leading-9 tracking-[-1.5px]">More chances.<br />More connections.</h1><p className="mt-4 max-w-[320px] text-sm leading-5 text-white/60">Stand out, meet more people, and make your next hello count.</p></div><div className="mt-8 grid grid-cols-3 gap-2">{plans.map(plan => <button key={plan.id} onClick={() => setSelected(plan)} className={`relative rounded-2xl border p-4 text-left transition-all ${selected.id === plan.id ? 'border-[#FFC800] bg-[#FFC800] text-[#111111]' : 'border-white/15 bg-[#1E1E1E] text-white'}`}>{plan.popular && <span className="absolute -top-3 left-3 rounded-full bg-white px-2 py-1 text-[9px] font-bold text-[#111111]">POPULAR</span>}<span className="block text-sm font-bold">{plan.label}</span><span className="mt-2 block text-xs opacity-70">{plan.detail}</span></button>)}</div><div className="mt-7 space-y-3"><label className="block text-xs font-bold text-white/60">Mobile money number</label><input value={phone} onChange={e => setPhone(e.target.value)} className="w-full rounded-full border border-white/20 bg-[#1E1E1E] px-5 py-3.5 text-sm outline-none focus:border-[#FFC800]" placeholder="256700000000" /><label className="block text-xs font-bold text-white/60">Email for payment receipt</label><input value={email} onChange={e => setEmail(e.target.value)} type="email" className="w-full rounded-full border border-white/20 bg-[#1E1E1E] px-5 py-3.5 text-sm outline-none focus:border-[#FFC800]" placeholder="you@example.com" /></div><div className="mt-7 space-y-3"><button disabled={!!busy} onClick={() => pay('pesapal')} className="w-full rounded-full bg-white py-3.5 text-sm font-bold text-[#111111] disabled:opacity-50">{busy === 'pesapal' ? 'Opening payment...' : 'PesaPal All · MTN / Airtel / Visa / MC / Bank'}</button><button disabled={!!busy} onClick={() => pay('mtn')} className="w-full rounded-full bg-[#FFC800] py-3.5 text-sm font-bold text-[#111111] disabled:opacity-50">{busy === 'mtn' ? 'Sending request...' : 'Direct MTN · *165*3#'}</button><button disabled={!!busy} onClick={() => pay('airtel')} className="w-full rounded-full border border-[#E53333] bg-[#E53333] py-3.5 text-sm font-bold text-white disabled:opacity-50">{busy === 'airtel' ? 'Sending request...' : 'Direct Airtel · *185*3#'}</button></div><p className="mt-6 text-center text-[11px] text-white/35">Secure payment processing · You can cancel anytime</p></div></main>
}
