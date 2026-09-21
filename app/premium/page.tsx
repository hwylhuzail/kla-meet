'use client'
import { useState } from 'react'
export default function PremiumPage() {
  const [email, setEmail] = useState('huzayirukalungi4@gmail.com')
  const [plan, setPlan] = useState<'basic'|'pro'>('pro')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const prices = { basic: 5.41, pro: 13.51 }
  const pay = async () => {
    setLoading(true); setError('')
    try {
      const res = await fetch('/api/pesapal', { method: 'POST', headers: {'Content-Type':'application/json'}, body: JSON.stringify({ email, plan, amount: prices[plan] }) })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error)
      window.location.href = data.redirect_url
    } catch(e:any){ setError(e.message) } finally{ setLoading(false) }
  }
  return (
    <div style={{maxWidth:400, margin:'0 auto', padding:16}}>
      <button onClick={()=>setPlan('basic')} style={{border: plan==='basic'?'2px solid gold':'1px solid #ccc', display:'block', width:'100%', padding:8, marginBottom:4}}>Basic $5.41 30 days premium</button>
      <button onClick={()=>setPlan('pro')} style={{border: plan==='pro'?'2px solid gold':'1px solid #ccc', display:'block', width:'100%', padding:8}}>POPULAR Pro $13.51 30 days premium</button>
      <div style={{marginTop:12, fontSize:14}}>
        <p>⭐ Unlimited discovery</p><p>🌍 Worldwide filters</p><p>❤️ See who liked you</p><p>✨ Profile priority</p><p>🎯 Advanced matching</p><p>🔒 Incognito mode</p><p>💬 Translation-ready chats</p><p>🛡️ Safety tools</p>
      </div>
      <input value={email} onChange={e=>setEmail(e.target.value)} placeholder="email" style={{width:'100%', padding:12, borderRadius:24, marginTop:16, background:'#eef6ff'}} />
      {error && <p style={{color:'red'}}>{error}</p>}
      <button onClick={pay} disabled={loading} style={{width:'100%', background:'#FFD700', padding:12, borderRadius:24, fontWeight:'bold', marginTop:12}}>{loading?'...':'Pay $'+prices[plan]+' USD'}</button>
      <p style={{marginTop:8}}>🔒 Secured by Pesapal - Cards • Bank Account • Worldwide</p>
    </div>
  )
}
