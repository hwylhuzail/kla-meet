import { useState } from 'react'
const OXA = "https://pay.oxapay.com/18802533"

export default function App(){
  const [step,setStep]=useState('landing')
  const [appTab,setAppTab]=useState('discover')
  const [p,setP]=useState({name:'', birthday:'', gender:'Woman', looking:'Dating', interests:[]})

  if(step==='landing'){
    return (
      <div className="min-h-screen bg-white text-black font-sans">
        {/* NAV like screenshot 1 */}
        <header className="bg-black text-white px-6 py-4 flex justify-between items-center sticky top-0 z-50">
          <h1 className="text-[28px] font-black tracking-tight">KLA<span className="text-[#FFC300]">•</span>MEET</h1>
          <div className="hidden md:flex items-center gap-6 text-[13px] font-medium">
            <a href="#about">About</a><a href="#safety">Safety</a><a href="#community">Community</a><a href="#stories">Success Stories</a>
            <button onClick={()=>setStep('s1')} className="font-bold">Log in</button>
            <button onClick={()=>setStep('s1')} className="bg-[#FFC300] text-black px-5 py-2 rounded-full font-bold">Sign up</button>
          </div>
          <button onClick={()=>setStep('s1')} className="md:hidden bg-[#FFC300] text-black px-4 py-2 rounded-full text-xs font-bold">Sign up</button>
        </header>

        {/* HERO like screenshot 1 */}
        <section className="px-6 py-8 md:py-14 max-w-[1200px] mx-auto grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h2 className="text-[42px] md:text-[56px] font-black leading-[0.95] tracking-tight">Date. Meet.<br/>Connect.<br/>Worldwide.</h2>
            <p className="text-[14px] text-zinc-600 mt-4 max-w-md">The modern way to meet real people, nearby or far. Join thousands building meaningful relationships — safely, authentically.</p>
            <div className="flex gap-3 mt-6">
              <button onClick={()=>setStep('s1')} className="bg-[#FFC300] px-5 py-3 rounded-full font-bold text-sm">Get Started — It's Free →</button>
              <button className="border border-black px-5 py-3 rounded-full font-bold text-sm">↓ Download the app</button>
            </div>
            <div className="flex gap-4 mt-6 text-[11px] font-medium">
              <span className="flex items-center gap-1"><span className="text-green-600">✓</span> 1M+ members worldwide</span>
              <span className="flex items-center gap-1"><span className="text-green-600">✓</span> Verified profiles</span>
              <span className="flex items-center gap-1"><span className="text-green-600">✓</span> 24/7 Safety & Support</span>
            </div>
          </div>
          {/* Image collage */}
          <div className="relative">
            <div className="absolute -z-10 top-10 left-10 w-[90%] h-[80%] bg-[#FFE99A] rounded-[32px]"/>
            <div className="grid grid-cols-3 gap-3">
              <img src="https://randomuser.me/api/portraits/women/44.jpg" className="rounded-2xl h-32 w-full object-cover"/>
              <img src="https://randomuser.me/api/portraits/men/32.jpg" className="rounded-2xl h-32 w-full object-cover"/>
              <img src="https://randomuser.me/api/portraits/women/65.jpg" className="rounded-2xl h-32 w-full object-cover"/>
              <div className="col-start-2"><img src="https://randomuser.me/api/portraits/women/68.jpg" className="rounded-2xl h-32 w-full object-cover"/></div>
              <img src="https://randomuser.me/api/portraits/men/75.jpg" className="rounded-2xl h-32 w-full object-cover"/>
            </div>
            {/* yellow doodles */}
            <div className="absolute -top-2 right-10 text-[#FFC300] text-2xl">◠</div>
            <div className="absolute bottom-10 left-0 text-[#FFC300] text-xl">◠</div>
          </div>
        </section>

        {/* How KLA-MEET Works */}
        <section className="bg-[#f8f8f7] px-6 py-10">
          <div className="max-w-[1200px] mx-auto">
            <h3 className="text-center font-black text-[26px]">How KLA-MEET Works</h3>
            <p className="text-center text-xs text-zinc-500 mt-1">Get started in 5 simple steps — simple, safe, and built for real connections.</p>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mt-8">
              {[
                {n:1,t:'Create Profile',d:'Add photos, interests, and what you\'re looking for'},
                {n:2,t:'Verify & Stay Safe',d:'Quick photo & ID verification for authentic members',v:true},
                {n:3,t:'Discover Matches',d:'Swipe, match, and connect with people nearby or globally',img:true},
                {n:4,t:'Chat & Connect',d:'Start conversations safely with built-in messaging'},
                {n:5,t:'Meet & Build Relationship',d:'Plan your first meetup and grow a meaningful connection'},
              ].map(s=>(
                <div key={s.n} className="text-center">
                  <div className="mx-auto w-[140px] h-[240px] bg-white border-2 border-black rounded-[20px] p-3 shadow flex flex-col items-center">
                    <div className="w-6 h-6 bg-[#FFC300] rounded-full text-xs font-black flex items-center justify-center">{s.n}</div>
                    <div className="mt-3 text-xl">{s.n===1?'👤':s.n===2?'🛡️':s.n===3?'💛':s.n===4?'💬':'📅'}</div>
                    <p className="text-[11px] font-black mt-2">{s.t}</p>
                    <p className="text-[9px] text-zinc-500 mt-1 leading-tight">{s.d}</p>
                    {s.v && <span className="mt-2 text-[8px] bg-green-100 text-green-700 px-2 py-0.5 rounded-full">✓ Verified</span>}
                    {s.img && <div className="flex gap-1 mt-2"><img src="https://randomuser.me/api/portraits/women/44.jpg" className="w-6 h-6 rounded-full"/><img src="https://randomuser.me/api/portraits/men/32.jpg" className="w-6 h-6 rounded-full"/></div>}
                  </div>
                  <p className="text-[11px] font-bold mt-3">{s.n}. {s.t}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Kampala version block */}
        <section className="px-6 py-10 max-w-[1200px] mx-auto grid md:grid-cols-2 gap-8 items-center border-t">
          <div>
            <h2 className="text-[36px] font-black leading-[0.9]">Date. Meet. Connect.<br/>In Kampala.</h2>
            <p className="text-[13px] text-zinc-600 mt-3">The modern way for Kampala to meet real people, nearby. Join thousands of singles building meaningful relationships — safely, locally, authentically.</p>
            <div className="flex gap-3 mt-5">
              <button onClick={()=>setStep('s1')} className="bg-[#FFC300] px-5 py-3 rounded-full font-bold text-sm">Get Started — It's Free →</button>
              <button className="border px-5 py-3 rounded-full font-bold text-sm">📞 Download the app</button>
            </div>
            <p className="text-[11px] mt-4">🟢 Verified profiles • Privacy-first • Made for Kampala, Uganda</p>
          </div>
          <div className="relative">
            <div className="absolute -z-10 bottom-0 right-0 w-[90%] h-[70%] bg-[#FFC300]/40 rounded-[24px]"/>
            <img src="https://images.unsplash.com/photo-1622245714860-45da8f68d76a?w=600" className="rounded-[20px] h-[300px] w-full object-cover"/>
          </div>
        </section>

        {/* Steps detail */}
        <section className="bg-[#f8f8f7] px-6 py-8">
          <div className="max-w-[1200px] mx-auto">
            <h3 className="text-center font-black text-xl">How KLA-MEET Works</h3>
            <p className="text-center text-xs text-zinc-500">Get started in 5 simple steps. Your profile, your way — set up in minutes.</p>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mt-6">
              {['Name & Birthday','Gender','Relationship','Interests','Location'].map((t,i)=>(
                <div key={t} className="text-center">
                  <div className="mx-auto w-[130px] h-[220px] bg-black text-white rounded-[20px] p-3 text-[10px]">
                    <p className="text-[#FFC300] text-[9px]">Step {i+1} of 5</p>
                    <p className="font-bold mt-2 text-xs">{i===0?'What should we call you?':i===1?'Your gender':i===2?'What are you looking for?':i===3?'Pick your interests':`Where are you located?`}</p>
                    <div className="mt-3 space-y-1">
                      {i===0 && <><div className="bg-white text-black rounded p-1">Name</div><div className="bg-white text-black rounded p-1">Birthday</div></>}
                      {i===1 && <><div className="bg-[#FFC300] text-black rounded p-1">Woman</div><div className="bg-white text-black rounded p-1">Man</div><div className="bg-white text-black rounded p-1">Non-binary</div></>}
                      {i===3 && <div className="flex flex-wrap gap-1"><span className="bg-[#FFC300] text-black px-1 rounded">Foodie</span><span className="bg-zinc-700 px-1 rounded">Music</span></div>}
                      {i===4 && <div className="bg-white text-black rounded p-1">Kampala, Uganda</div>}
                    </div>
                    <div className="mt-3 bg-[#FFC300] text-black rounded-full py-1 font-bold">{i===4?'Finish & Join KLA-MEET':'Continue'}</div>
                  </div>
                  <p className="text-[11px] font-bold mt-2">{i+1}. {t}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <footer className="bg-black text-white text-[11px] px-6 py-6 flex flex-col md:flex-row justify-between">
          <p>Built with Next.js 14 • Fast • Secure • Local to Kampala</p>
          <p>© 2024 KLA-MEET • Privacy Policy • Terms of Service • Support • Global Community • OXA {OXA.split('/').pop()}</p>
        </footer>
      </div>
    )
  }

  // Onboarding S1-S5 (your 5 screens)
  if(step==='s1') return (
    <div className="min-h-screen bg-white flex items-center justify-center p-6">
      <div className="w-[340px] bg-white rounded-[32px] shadow-2xl border p-6 text-center">
        <h2 className="font-black">♡ KLA-MEET</h2>
        <div className="mt-8 text-5xl">💬💛</div>
        <h3 className="font-black text-xl mt-8">Welcome to KLA-MEET</h3>
        <p className="text-xs text-zinc-500">Date. Meet. Connect. Worldwide.</p>
        <button onClick={()=>setStep('s2')} className="w-full bg-[#FFC300] rounded-full py-3 font-bold mt-8">Get Started</button>
      </div>
    </div>
  )
  if(step==='s2') return (
    <div className="min-h-screen bg-white flex items-center justify-center p-6">
      <div className="w-[340px] bg-white rounded-[32px] shadow-2xl border p-6">
        <button onClick={()=>setStep('landing')}>←</button>
        <h3 className="font-black text-center">Create your profile</h3>
        <input value={p.name} onChange={e=>setP({...p,name:e.target.value})} placeholder="Name Enter your name" className="w-full border border-black rounded-xl px-4 py-3 mt-4 text-sm"/>
        <input value={p.birthday} onChange={e=>setP({...p,birthday:e.target.value})} placeholder="Birthday DD / MM / YYYY" className="w-full border border-black rounded-xl px-4 py-3 mt-2 text-sm"/>
        <button onClick={()=>setStep('s3')} className="w-full bg-[#FFC300] rounded-full py-3 font-bold mt-4">Continue</button>
      </div>
    </div>
  )
  if(step==='s3') return (
    <div className="min-h-screen bg-white flex items-center justify-center p-6">
      <div className="w-[340px] bg-white rounded-[32px] shadow-2xl border p-6">
        <h3 className="font-black">Gender & Preferences</h3>
        {['Woman','Man','Nonbinary'].map(g=>(
          <button key={g} onClick={()=>setP({...p,gender:g})} className={`w-full mt-2 border rounded-xl px-4 py-3 flex justify-between text-sm ${p.gender===g?'bg-[#FFC300]/20 border-black':''}`}><span>{g}</span><span>{p.gender===g?'●':'○'}</span></button>
        ))}
        <button onClick={()=>setStep('s4')} className="w-full bg-[#FFC300] rounded-full py-3 font-bold mt-4">Continue</button>
      </div>
    </div>
  )
  if(step==='s4'){
    const opts=['Music','Travel','Foodie','Fitness','Arts & Culture','Photography','Reading','Outdoors']
    return (
      <div className="min-h-screen bg-white flex items-center justify-center p-6">
        <div className="w-[340px] bg-white rounded-[32px] shadow-2xl border p-6">
          <h3 className="font-black">What are you into?</h3>
          <div className="grid grid-cols-2 gap-2 mt-4">
            {opts.map(o=>(
              <button key={o} onClick={()=>setP(s=>({...s, interests: s.interests.includes(o)? s.interests.filter(x=>x!==o) : [...s.interests, o]}))} className={`border rounded-xl py-2 text-xs font-bold ${p.interests.includes(o)?'bg-[#FFC300]':''}`}>{o}</button>
            ))}
          </div>
          <button onClick={()=>setStep('s5')} className="w-full bg-[#FFC300] rounded-full py-3 font-bold mt-4">Continue</button>
        </div>
      </div>
    )
  }
  if(step==='s5') return (
    <div className="min-h-screen bg-white flex items-center justify-center p-6">
      <div className="w-[340px] bg-white rounded-[32px] shadow-2xl border p-6 text-center">
        <h3 className="font-black">Enable location & Find matches near you</h3>
        <div className="text-6xl mt-6">🌍📍</div>
        <button onClick={()=>setStep('app')} className="w-full bg-[#FFC300] rounded-full py-3 font-bold mt-6">Allow Location</button>
        <button onClick={()=>setStep('app')} className="w-full text-xs mt-2">Maybe later</button>
      </div>
    </div>
  )

  // App
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white pb-20">
      <header className="p-4 flex justify-between border-b border-white/10"><span className="font-black">KLA-MEET • {p.name}</span><button onClick={()=>setStep('landing')} className="text-xs bg-zinc-800 px-3 py-1 rounded-full">Landing</button></header>
      {appTab==='discover' && <div className="p-4 max-w-md mx-auto"><h2 className="font-black text-xl">Discover • {p.gender}</h2><div className="grid grid-cols-2 gap-3 mt-4">{[1,2,3,4].map(i=><div key={i} className="bg-zinc-900 rounded-2xl overflow-hidden"><img src={`https://randomuser.me/api/portraits/women/${20+i}.jpg`} className="h-32 w-full object-cover"/><div className="p-2 text-xs">{p.interests[0]||'Music'}</div></div>)}</div></div>}
      {appTab==='premium' && <div className="p-4 max-w-md mx-auto space-y-3"><h2 className="font-black text-xl">Premium</h2><div className="bg-zinc-900 rounded-2xl p-4"><p>Basic $2.99</p><button onClick={()=>window.open(OXA,'_blank')} className="w-full bg-white text-black rounded-full py-2 mt-2 font-bold">⚡ Pay with OXA LIGHT 18802533</button><button onClick={async()=>{const r=await fetch('/api/pesapal',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({plan:'basic'})});const j=await r.json(); if(j.redirect_url) window.open(j.redirect_url,'_blank')}} className="w-full bg-[#FF6A00] text-white rounded-full py-2 mt-2 font-bold">Pay with Pesapal</button></div><div className="bg-[#FFC300] text-black rounded-2xl p-4"><p className="font-black">Standard $5.99 ⭐</p><button onClick={()=>window.open(OXA,'_blank')} className="w-full bg-black text-white rounded-full py-2 mt-2 font-bold">⚡ Pay with OXA LIGHT</button></div></div>}
      <nav className="fixed bottom-0 left-0 right-0 bg-black border-t border-white/10 flex justify-around p-3"><button onClick={()=>setAppTab('discover')} className="text-xs">Discover</button><button onClick={()=>setAppTab('premium')} className="text-xs">Premium</button></nav>
    </div>
  )
}
