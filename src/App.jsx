import { useState } from 'react'

const OXA_LINKS = {
  basic: "https://pay.oxapay.com/18802533",
  standard: "https://pay.oxapay.com/18802533",
  wallet: "0XAY27FbUKmf4xPg5ZRFP1l1dbe"
}

function PayButtons({plan}){
  const price = plan==='basic'? '2.99' : '5.99'
  return (
    <div className="space-y-2 mt-4">
      <button onClick={()=>window.open(OXA_LINKS[plan],'_blank')} className="w-full bg-black text-white rounded-full py-3 font-bold text-sm">⚡ Pay ${price} with OXA LIGHT</button>
      <button onClick={async()=>{
        const r=await fetch('/api/pesapal',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({plan})})
        const j=await r.json()
        if(j.redirect_url) window.open(j.redirect_url,'_blank')
        else alert(j.error||'Add Pesapal keys in Vercel')
      }} className="w-full bg-[#FF6A00] text-white rounded-full py-3 font-bold text-sm">Pay ${price} with Pesapal (MTN/Airtel)</button>
    </div>
  )
}

export default function App(){
  const [view,setView]=useState('landing') // landing, app, auth
  const [tab,setTab]=useState('discover')
  const [authMode,setAuthMode]=useState('signin')

  if(view==='landing'){
    return (
      <div className="min-h-screen bg-white text-black">
        <header className="sticky top-0 bg-white/90 backdrop-blur border-b border-black/10 p-4 flex justify-between items-center z-50">
          <h1 className="font-black text-lg">KLA-MEET <span className="bg-black text-white text-[9px] px-2 py-1 rounded-full ml-1">KEEP LOVE ALIVE</span></h1>
          <div className="flex gap-2">
            <button onClick={()=>{setAuthMode('signin'); setView('auth')}} className="text-sm font-bold">Sign In</button>
            <button onClick={()=>setView('app')} className="bg-[#FFC300] px-5 py-2 rounded-full font-bold text-sm">Enter App</button>
          </div>
        </header>

        {/* Hero - your screenshot */}
        <section className="p-6">
          <h2 className="text-[48px] font-black leading-[0.9] tracking-tight">Date. Meet.<br/>Connect.<br/>Worldwide.</h2>
          <p className="text-zinc-500 mt-4 max-w-xs">Keep Love Alive — International, alive interactions, real Supabase.</p>
          <button onClick={()=>{setAuthMode('signup'); setView('auth')}} className="mt-6 bg-[#FFC300] px-6 py-3 rounded-full font-bold">Get Started Free →</button>
          <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=800" className="mt-8 rounded-[28px] h-[420px] w-full object-cover"/>
        </section>

        {/* How It Works */}
        <section id="how" className="p-6 bg-zinc-50 mt-4">
          <h3 className="font-black text-2xl">How It Works</h3>
          <div className="grid grid-cols-3 gap-3 mt-6">
            <div className="bg-white p-4 rounded-2xl border"><p className="font-bold text-sm">1. Create</p><p className="text-[11px] text-zinc-500 mt-1">Sign up, add photos, KYC</p></div>
            <div className="bg-white p-4 rounded-2xl border"><p className="font-bold text-sm">2. Match</p><p className="text-[11px] text-zinc-500 mt-1">Swipe, like, super-like</p></div>
            <div className="bg-white p-4 rounded-2xl border"><p className="font-bold text-sm">3. Meet</p><p className="text-[11px] text-zinc-500 mt-1">Chat alive, meet safely</p></div>
          </div>
        </section>

        {/* Guidelines */}
        <section id="guidelines" className="p-6">
          <h3 className="font-black text-2xl">Community Guidelines</h3>
          <ul className="mt-4 space-y-2 text-sm list-disc pl-5 text-zinc-600">
            <li>18+ only, real photos only</li>
            <li>No harassment, no scams, no nudity in public feed</li>
            <li>Respect, consent, report abuse — we ban fast</li>
            <li>KYC badge = trusted</li>
          </ul>
        </section>

        {/* Policies */}
        <section id="policies" className="p-6 bg-black text-white rounded-t-[32px] mt-6">
          <h3 className="font-black text-2xl">Policies</h3>
          <div className="grid grid-cols-2 gap-3 mt-6">
            <div><p className="font-bold text-sm">Privacy</p><p className="text-[11px] text-white/60 mt-1">We never sell data. Supabase encrypted. Delete anytime.</p></div>
            <div><p className="font-bold text-sm">Safety</p><p className="text-[11px] text-white/60 mt-1">Block, report, KYC verify. Meet in public.</p></div>
            <div><p className="font-bold text-sm">Payments</p><p className="text-[11px] text-white/60 mt-1">Oxa Light {OXA_LINKS.wallet.slice(0,10)} + Pesapal MTN/Airtel/Card. Link {OXA_LINKS.basic.split('/').pop()}</p></div>
            <div><p className="font-bold text-sm">Terms</p><p className="text-[11px] text-white/60 mt-1">No refund abuse. Premium unlocks after blockchain confirm.</p></div>
          </div>
          <div className="flex gap-4 mt-8 text-[11px] underline text-white/50">
            <a href="#how">How it works</a><a href="#guidelines">Guidelines</a><a href="#policies">Policies</a>
          </div>
          <p className="text-[10px] text-white/30 mt-6">© 2026 KLA-MEET • Bushenyi, Uganda • OXA LIGHT alive</p>
        </section>
      </div>
    )
  }

  if(view==='auth'){
    return (
      <div className="min-h-screen bg-white p-6">
        <button onClick={()=>setView('landing')} className="text-sm">← Back</button>
        <h2 className="text-3xl font-black mt-8">{authMode==='signin'?'Sign In':'Sign Up'}</h2>
        <input placeholder="Email" className="w-full border rounded-full px-4 py-3 mt-6 text-sm"/>
        <input placeholder="Password" type="password" className="w-full border rounded-full px-4 py-3 mt-3 text-sm"/>
        <button onClick={()=>setView('app')} className="w-full bg-black text-white rounded-full py-3 font-bold mt-6">{authMode==='signin'?'Sign In →':'Create Account →'}</button>
        <button onClick={()=>setAuthMode(authMode==='signin'?'signup':'signin')} className="w-full text-xs mt-4 underline">{authMode==='signin'?'Need account? Sign Up':'Have account? Sign In'}</button>
      </div>
    )
  }

  // Inside App
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white p-4 pb-24">
      <header className="flex justify-between items-center">
        <button onClick={()=>setView('landing')} className="text-xs text-white/50">← Landing</button>
        <span className="text-[10px] bg-zinc-800 px-2 py-1 rounded-full">OXA {OXA_LINKS.basic.split('/').pop()}</span>
      </header>

      {tab==='discover' && (
        <div className="max-w-md mx-auto mt-6">
          <h2 className="text-2xl font-black">Discover</h2>
          <div className="mt-4 grid grid-cols-2 gap-3">
            {[1,2,3,4].map(i=>(
              <div key={i} className="bg-zinc-900 rounded-[20px] overflow-hidden"><img src={`https://randomuser.me/api/portraits/women/${20+i}.jpg`} className="h-36 w-full object-cover"/><div className="p-3"><p className="text-sm font-bold">User {i}</p></div></div>
            ))}
          </div>
        </div>
      )}

      {tab==='premium' && (
        <div className="max-w-md mx-auto mt-6 space-y-4">
          <h2 className="text-2xl font-black">Premium</h2>
          <div className="bg-zinc-900 rounded-[24px] p-5 border border-white/10">
            <h3 className="font-bold">Basic $2.99/mo</h3>
            <PayButtons plan="basic" />
          </div>
          <div className="bg-[#FFC300] text-black rounded-[24px] p-5">
            <h3 className="font-black">Standard $5.99/mo ⭐</h3>
            <PayButtons plan="standard" />
          </div>
        </div>
      )}

      <nav className="fixed bottom-0 left-0 right-0 bg-black border-t border-white/10 flex justify-around p-3">
        <button onClick={()=>setTab('discover')} className={`text-xs ${tab==='discover'?'text-[#FFC300] font-black':''}`}>Discover</button>
        <button onClick={()=>setTab('premium')} className={`text-xs ${tab==='premium'?'text-[#FFC300] font-black':''}`}>Premium</button>
      </nav>
    </div>
  )
}
