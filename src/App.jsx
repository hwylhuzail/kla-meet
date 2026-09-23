import { useState } from 'react'

const OXA = { basic:"https://pay.oxapay.com/18802533", standard:"https://pay.oxapay.com/18802533" }

export default function App(){
  const [step,setStep]=useState('landing') // landing, s1, s2, s3, s4, s5, app
  const [tab,setTab]=useState('discover')
  const [profile,setProfile]=useState({name:'', birthday:'', gender:'Woman', interests:[]})

  // Landing
  if(step==='landing') return (
    <div className="min-h-screen bg-white text-black flex flex-col">
      <header className="p-4 flex justify-between items-center">
        <h1 className="font-black">KLA-MEET <span className="bg-black text-white text-[8px] px-2 py-1 rounded-full">KEEP LOVE ALIVE</span></h1>
        <button onClick={()=>setStep('app')} className="bg-[#FFC300] px-5 py-2 rounded-full font-bold text-sm">Enter App</button>
      </header>
      <div className="p-6">
        <h2 className="text-[44px] font-black leading-[0.9]">Date. Meet.<br/>Connect.<br/>Worldwide.</h2>
        <p className="text-zinc-500 mt-3 text-sm">Keep Love Alive — International, alive interactions, real Supabase.</p>
        <button onClick={()=>setStep('s1')} className="mt-6 bg-[#FFC300] px-6 py-3 rounded-full font-bold">Get Started Free →</button>
        <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=700" className="mt-6 rounded-[24px] w-full h-[360px] object-cover"/>
      </div>
      <div className="p-6 bg-zinc-50 mt-4">
        <h3 className="font-black">How It Works</h3>
        <p className="text-xs text-zinc-500 mt-2">Create → Match → Meet. Sign in, policies, guidelines inside app.</p>
      </div>
    </div>
  )

  // Screen 1 - Welcome
  if(step==='s1') return (
    <div className="min-h-screen bg-white flex items-center justify-center p-6">
      <div className="w-full max-w-[340px] bg-white rounded-[32px] shadow-2xl border p-6 text-center">
        <h2 className="font-black text-lg mt-2">♡ KLA-MEET</h2>
        <div className="mt-8 flex justify-center">
          <div className="w-32 h-24 border border-dashed rounded-xl flex items-center justify-center text-3xl">♡ ♡</div>
        </div>
        <h3 className="font-black text-xl mt-10">Welcome to KLA-MEET</h3>
        <p className="text-xs text-zinc-500 mt-1">Date. Meet. Connect. Worldwide.</p>
        <button onClick={()=>setStep('s2')} className="w-full bg-[#FFC300] rounded-full py-3 font-bold mt-10">Get Started</button>
        <div className="flex justify-center gap-1 mt-4"><div className="w-2 h-2 bg-[#FFC300] rounded-full"/><div className="w-1 h-1 bg-zinc-300 rounded-full"/><div className="w-1 h-1 bg-zinc-300 rounded-full"/><div className="w-1 h-1 bg-zinc-300 rounded-full"/><div className="w-1 h-1 bg-zinc-300 rounded-full"/></div>
      </div>
    </div>
  )

  // Screen 2 - Create profile
  if(step==='s2') return (
    <div className="min-h-screen bg-white flex items-center justify-center p-6">
      <div className="w-full max-w-[340px] bg-white rounded-[32px] shadow-2xl border p-6">
        <button onClick={()=>setStep('s1')} className="text-lg">←</button>
        <h3 className="font-black text-lg text-center mt-2">Create your<br/>profile</h3>
        <div className="flex justify-center gap-1 mt-2"><div className="w-1 h-1 bg-zinc-300 rounded-full"/><div className="w-2 h-2 bg-[#FFC300] rounded-full"/><div className="w-1 h-1 bg-zinc-300 rounded-full"/><div className="w-1 h-1 bg-zinc-300 rounded-full"/><div className="w-1 h-1 bg-zinc-300 rounded-full"/></div>
        <p className="font-bold text-sm mt-6">Let's get to know you</p>
        <input value={profile.name} onChange={e=>setProfile({...profile,name:e.target.value})} placeholder="Name Enter your name" className="w-full border border-black rounded-xl px-4 py-3 mt-4 text-sm"/>
        <input value={profile.birthday} onChange={e=>setProfile({...profile,birthday:e.target.value})} placeholder="Birthday DD / MM / YYYY" className="w-full border border-black rounded-xl px-4 py-3 mt-3 text-sm"/>
        <button onClick={()=>setStep('s3')} className="w-full bg-[#FFC300] rounded-full py-3 font-bold mt-6">Continue</button>
      </div>
    </div>
  )

  // Screen 3 - Gender & Preferences
  if(step==='s3') return (
    <div className="min-h-screen bg-white flex items-center justify-center p-6">
      <div className="w-full max-w-[340px] bg-white rounded-[32px] shadow-2xl border p-6">
        <button onClick={()=>setStep('s2')} className="text-lg">←</button>
        <h3 className="font-black text-lg mt-2">Gender & Preferences</h3>
        <p className="text-[11px] text-zinc-500">You can update this anytime</p>
        {['Woman','Man','Nonbinary'].map(g=>(
          <button key={g} onClick={()=>setProfile({...profile,gender:g})} className={`w-full mt-3 border border-black rounded-xl px-4 py-3 flex justify-between items-center text-sm ${profile.gender===g?'bg-[#FFC300]/20':''}`}>
            <span>{g}</span><div className={`w-4 h-4 rounded-full border ${profile.gender===g?'bg-[#FFC300] border-black':''}`}/>
          </button>
        ))}
        <button onClick={()=>setStep('s4')} className="w-full bg-[#FFC300] rounded-full py-3 font-bold mt-6">Continue</button>
        <div className="flex justify-center gap-1 mt-4"><div className="w-1 h-1 bg-zinc-300 rounded-full"/><div className="w-1 h-1 bg-zinc-300 rounded-full"/><div className="w-2 h-2 bg-[#FFC300] rounded-full"/><div className="w-1 h-1 bg-zinc-300 rounded-full"/><div className="w-1 h-1 bg-zinc-300 rounded-full"/></div>
      </div>
    </div>
  )

  // Screen 4 - What are you into?
  if(step==='s4'){
    const opts=['Music','Travel','Foodie','Fitness','Arts & Culture','Photography','Reading','Outdoors']
    const toggle=i=> setProfile(p=>({...p, interests: p.interests.includes(i)? p.interests.filter(x=>x!==i) : [...p.interests, i]}))
    return (
      <div className="min-h-screen bg-white flex items-center justify-center p-6">
        <div className="w-full max-w-[340px] bg-white rounded-[32px] shadow-2xl border p-6">
          <button onClick={()=>setStep('s3')} className="text-lg">←</button>
          <h3 className="font-black text-lg mt-2">What are you into?</h3>
          <p className="text-[11px] text-zinc-500">Select 3 or more interests to match better</p>
          <div className="grid grid-cols-2 gap-2 mt-4">
            {opts.map(o=>(
              <button key={o} onClick={()=>toggle(o)} className={`border border-black rounded-xl px-3 py-2 text-xs font-bold text-left ${profile.interests.includes(o)?'bg-[#FFC300]':''}`}>♪ {o}</button>
            ))}
          </div>
          <button disabled={profile.interests.length<3} onClick={()=>setStep('s5')} className="w-full bg-[#FFC300] disabled:opacity-40 rounded-full py-3 font-bold mt-6">Continue</button>
          <div className="flex justify-center gap-1 mt-4"><div className="w-1 h-1 bg-zinc-300 rounded-full"/><div className="w-1 h-1 bg-zinc-300 rounded-full"/><div className="w-1 h-1 bg-zinc-300 rounded-full"/><div className="w-2 h-2 bg-[#FFC300] rounded-full"/><div className="w-1 h-1 bg-zinc-300 rounded-full"/></div>
        </div>
      </div>
    )
  }

  // Screen 5 - Enable location
  if(step==='s5') return (
    <div className="min-h-screen bg-white flex items-center justify-center p-6">
      <div className="w-full max-w-[340px] bg-white rounded-[32px] shadow-2xl border p-6 text-center">
        <button onClick={()=>setStep('s4')} className="text-lg absolute">←</button>
        <h3 className="font-black text-lg mt-2">Enable location &<br/>Find matches near you</h3>
        <div className="mt-6 text-6xl">📍🌍</div>
        <p className="text-[11px] text-zinc-500 mt-6">We use your location to show people near you. We'll never share your exact location.</p>
        <button onClick={()=>setStep('app')} className="w-full bg-[#FFC300] rounded-full py-3 font-bold mt-6">Allow Location</button>
        <button onClick={()=>setStep('app')} className="w-full text-xs font-bold mt-3">Maybe later</button>
        <div className="flex justify-center gap-1 mt-4"><div className="w-1 h-1 bg-zinc-300 rounded-full"/><div className="w-1 h-1 bg-zinc-300 rounded-full"/><div className="w-1 h-1 bg-zinc-300 rounded-full"/><div className="w-1 h-1 bg-zinc-300 rounded-full"/><div className="w-2 h-2 bg-[#FFC300] rounded-full"/></div>
      </div>
    </div>
  )

  // App after onboarding
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white pb-20">
      <header className="p-4 flex justify-between items-center border-b border-white/10">
        <h1 className="font-black">KLA-MEET • Hi {profile.name||'User'}</h1>
        <button onClick={()=>setStep('landing')} className="text-[11px] bg-zinc-800 px-3 py-1 rounded-full">Landing</button>
      </header>

      {tab==='discover' && (
        <div className="p-4 max-w-md mx-auto">
          <h2 className="text-xl font-black">Discover • {profile.gender} • {profile.interests.join(', ')}</h2>
          <div className="grid grid-cols-2 gap-3 mt-4">
            {[21,22,23,24].map(i=>(<div key={i} className="bg-zinc-900 rounded-2xl overflow-hidden"><img src={`https://randomuser.me/api/portraits/women/${i}.jpg`} className="h-36 w-full object-cover"/><div className="p-2 text-xs font-bold">User {i}</div></div>))}
          </div>
        </div>
      )}

      {tab==='premium' && (
        <div className="p-4 max-w-md mx-auto space-y-3">
          <h2 className="text-xl font-black">Premium</h2>
          <div className="bg-zinc-900 rounded-2xl p-4 border border-white/10"><p className="font-bold">Basic $2.99</p><button onClick={()=>window.open(OXA.basic,'_blank')} className="w-full bg-white text-black rounded-full py-2 mt-3 font-bold text-sm">⚡ Oxa 18802533</button><button onClick={async()=>{const r=await fetch('/api/pesapal',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({plan:'basic'})});const j=await r.json(); if(j.redirect_url) window.open(j.redirect_url,'_blank')}} className="w-full bg-[#FF6A00] text-white rounded-full py-2 mt-2 font-bold text-sm">Pesapal</button></div>
          <div className="bg-[#FFC300] text-black rounded-2xl p-4"><p className="font-black">Standard $5.99 ⭐</p><button onClick={()=>window.open(OXA.standard,'_blank')} className="w-full bg-black text-white rounded-full py-2 mt-3 font-bold text-sm">⚡ Oxa 18802533</button><button onClick={async()=>{const r=await fetch('/api/pesapal',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({plan:'standard'})});const j=await r.json(); if(j.redirect_url) window.open(j.redirect_url,'_blank')}} className="w-full bg-[#FF6A00] text-white rounded-full py-2 mt-2 font-bold text-sm">Pesapal</button></div>

          <div className="bg-zinc-900 rounded-2xl p-4 mt-6">
            <h3 className="font-bold text-sm">Sign In / Sign Up / Policies</h3>
            <p className="text-[11px] text-white/60 mt-2">Guidelines: 18+, real photos, no scams.<br/>Privacy: Supabase encrypted.<br/>Payments: Oxa wallet 0XAY27Fb...dbe alive + Pesapal MTN/Airtel/Card.</p>
          </div>
        </div>
      )}

      <nav className="fixed bottom-0 left-0 right-0 bg-black border-t border-white/10 flex justify-around p-3">
        <button onClick={()=>setTab('discover')} className={`text-xs ${tab==='discover'?'text-[#FFC300]':''}`}>Discover</button>
        <button onClick={()=>setTab('premium')} className={`text-xs ${tab==='premium'?'text-[#FFC300]':''}`}>Premium</button>
        <button onClick={()=>setStep('landing')} className="text-xs text-white/50">Landing</button>
      </nav>
    </div>
  )
}
