import { useState } from 'react'
const OXA = "https://pay.oxapay.com/18802533"

export default function App(){
  const [flow,setFlow]=useState('guest') // guest, onboarding, app
  const [onStep,setOnStep]=useState(1)
  const [appTab,setAppTab]=useState('discover')
  const [p,setP]=useState({name:'', birthday:'', gender:'Woman', interests:[]})

  const PayButtons = ({plan}) => {
    const price = plan==='basic'?'2.99':'5.99'
    return (
      <div className="space-y-2 mt-3">
        <button onClick={()=>window.open(OXA,'_blank')} className="w-full bg-black text-white rounded-full py-3 font-bold text-[12px]">⚡ Pay ${price} with OXA LIGHT • 18802533</button>
        <button onClick={async()=>{
          const r=await fetch('/api/pesapal',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({plan})})
          const j=await r.json()
          if(j.redirect_url) window.open(j.redirect_url,'_blank'); else alert(j.error||'Add Pesapal keys in Vercel env')
        }} className="w-full bg-[#FF6A00] text-white rounded-full py-3 font-bold text-[12px]">Pay ${price} with Pesapal (MTN/Airtel/Card)</button>
      </div>
    )
  }

  // 1. GUEST LANDING = FIRST IMAGE (Worldwide)
  if(flow==='guest'){
    return (
      <div className="min-h-screen bg-white text-black">
        <header className="bg-black text-white px-6 py-4 flex justify-between items-center sticky top-0 z-50">
          <h1 className="text-[26px] font-black">KLA<span className="text-[#FFC300]">•</span>MEET</h1>
          <div className="flex items-center gap-5 text-[13px]">
            <span className="hidden md:flex gap-5"><a>About</a><a>Safety</a><a>Community</a><a>Success Stories</a></span>
            <button onClick={()=>{setFlow('onboarding'); setOnStep(1)}}>Log in</button>
            <button onClick={()=>{setFlow('onboarding'); setOnStep(1)}} className="bg-[#FFC300] text-black px-5 py-2 rounded-full font-bold">Sign up</button>
          </div>
        </header>

        <section className="max-w-[1200px] mx-auto px-6 py-10 md:py-14 grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h2 className="text-[44px] md:text-[58px] font-black leading-[0.9]">Date. Meet.<br/>Connect.<br/>Worldwide.</h2>
            <p className="text-[13px] text-zinc-600 mt-4 max-w-[420px]">The modern way to meet real people, nearby or far. Join thousands building meaningful relationships — safely, authentically.</p>
            <div className="flex gap-3 mt-6">
              <button onClick={()=>{setFlow('onboarding'); setOnStep(1)}} className="bg-[#FFC300] px-6 py-3 rounded-full font-bold text-sm">Get Started — It's Free →</button>
              <button className="border border-black px-5 py-3 rounded-full font-bold text-sm">↓ Download the app</button>
            </div>
            <div className="flex flex-wrap gap-4 mt-6 text-[11px] font-medium">
              <span>✓ 1M+ members worldwide</span><span>✓ Verified profiles</span><span>✓ 24/7 Safety & Support</span>
            </div>
          </div>
          <div className="relative">
            <div className="absolute top-10 left-10 w-[90%] h-[80%] bg-[#FFEAA0] rounded-[32px] -z-10"/>
            <div className="grid grid-cols-3 gap-3">
              <img src="https://randomuser.me/api/portraits/women/44.jpg" className="rounded-2xl h-32 object-cover w-full"/>
              <img src="https://randomuser.me/api/portraits/men/32.jpg" className="rounded-2xl h-32 object-cover w-full"/>
              <img src="https://randomuser.me/api/portraits/women/65.jpg" className="rounded-2xl h-32 object-cover w-full"/>
              <div className="col-start-2"><img src="https://randomuser.me/api/portraits/women/68.jpg" className="rounded-2xl h-32 object-cover w-full"/></div>
              <img src="https://randomuser.me/api/portraits/men/75.jpg" className="rounded-2xl h-32 object-cover w-full"/>
            </div>
          </div>
        </section>

        <section className="bg-[#f7f7f6] px-6 py-10">
          <div className="max-w-[1200px] mx-auto">
            <h3 className="text-center font-black text-[24px]">How KLA-MEET Works</h3>
            <p className="text-center text-[12px] text-zinc-500">Get started in 5 simple steps — simple, safe, and built for real connections.</p>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mt-8">
              {[
                {n:1,t:'Create Profile'},{n:2,t:'Verify & Stay Safe'},{n:3,t:'Discover Matches'},{n:4,t:'Chat & Connect'},{n:5,t:'Meet & Build Relationship'}
              ].map(s=>(
                <div key={s.n} className="text-center">
                  <div className="mx-auto w-[132px] h-[230px] bg-white border-2 border-black rounded-[18px] flex flex-col items-center p-3">
                    <div className="w-5 h-5 bg-[#FFC300] rounded-full text-[10px] font-black flex items-center justify-center">{s.n}</div>
                    <p className="text-[11px] font-black mt-3">{s.t}</p>
                    <p className="text-[9px] text-zinc-500 mt-1">For usual guests • Free</p>
                  </div>
                  <p className="text-[11px] font-bold mt-2">{s.n}. {s.t}</p>
                </div>
              ))}
            </div>
            <div className="text-center mt-8"><button onClick={()=>{setFlow('onboarding'); setOnStep(1)}} className="bg-black text-white px-8 py-3 rounded-full font-bold text-sm">Enter as Guest →</button></div>
          </div>
        </section>

        <footer className="bg-black text-white text-[11px] px-6 py-5 flex justify-between">
          <span>© 2024 KLA-MEET • Guest Version • Worldwide</span>
          <span>Privacy • Terms • Support • Global Community</span>
        </footer>
      </div>
    )
  }

  // ONBOARDING 1-5 (kept old layout)
  if(flow==='onboarding'){
    if(onStep===1) return (
      <div className="min-h-screen bg-white flex items-center justify-center p-6">
        <div className="w-[340px] rounded-[32px] shadow-2xl border p-6 text-center">
          <p className="font-black">♡ KLA-MEET</p><div className="text-5xl mt-8">💬💛</div>
          <h3 className="font-black text-xl mt-8">Welcome to KLA-MEET</h3><p className="text-xs text-zinc-500">Date. Meet. Connect. Worldwide.</p>
          <button onClick={()=>setOnStep(2)} className="w-full bg-[#FFC300] rounded-full py-3 font-bold mt-8">Get Started</button>
        </div>
      </div>
    )
    if(onStep===2) return (
      <div className="min-h-screen bg-white flex items-center justify-center p-6">
        <div className="w-[340px] rounded-[32px] shadow-2xl border p-6">
          <h3 className="font-black text-center">Create your profile</h3>
          <input value={p.name} onChange={e=>setP({...p,name:e.target.value})} placeholder="Name Enter your name" className="w-full border border-black rounded-xl px-4 py-3 mt-4 text-sm"/>
          <input value={p.birthday} onChange={e=>setP({...p,birthday:e.target.value})} placeholder="Birthday DD / MM / YYYY" className="w-full border border-black rounded-xl px-4 py-3 mt-2 text-sm"/>
          <button onClick={()=>setOnStep(3)} className="w-full bg-[#FFC300] rounded-full py-3 font-bold mt-4">Continue</button>
        </div>
      </div>
    )
    if(onStep===3) return (
      <div className="min-h-screen bg-white flex items-center justify-center p-6">
        <div className="w-[340px] rounded-[32px] shadow-2xl border p-6">
          <h3 className="font-black">Gender & Preferences</h3>
          {['Woman','Man','Nonbinary'].map(g=><button key={g} onClick={()=>setP({...p,gender:g})} className={`w-full mt-2 border rounded-xl px-4 py-3 flex justify-between text-sm ${p.gender===g?'bg-[#FFC300]/30 border-black':''}`}><span>{g}</span><span>{p.gender===g?'●':'○'}</span></button>)}
          <button onClick={()=>setOnStep(4)} className="w-full bg-[#FFC300] rounded-full py-3 font-bold mt-4">Continue</button>
        </div>
      </div>
    )
    if(onStep===4) return (
      <div className="min-h-screen bg-white flex items-center justify-center p-6">
        <div className="w-[340px] rounded-[32px] shadow-2xl border p-6">
          <h3 className="font-black">What are you into?</h3>
          <div className="grid grid-cols-2 gap-2 mt-4">
            {['Music','Travel','Foodie','Fitness','Arts & Culture','Photography','Reading','Outdoors'].map(o=>(
              <button key={o} onClick={()=>setP(s=>({...s,interests:s.interests.includes(o)?s.interests.filter(x=>x!==o):[...s.interests,o]}))} className={`border rounded-xl py-2 text-xs font-bold ${p.interests.includes(o)?'bg-[#FFC300]':''}`}>{o}</button>
            ))}
          </div>
          <button onClick={()=>setOnStep(5)} className="w-full bg-[#FFC300] rounded-full py-3 font-bold mt-4">Continue</button>
        </div>
      </div>
    )
    if(onStep===5) return (
      <div className="min-h-screen bg-white flex items-center justify-center p-6">
        <div className="w-[340px] rounded-[32px] shadow-2xl border p-6 text-center">
          <h3 className="font-black">Enable location & Find matches near you</h3><div className="text-6xl mt-6">🌍</div>
          <button onClick={()=>setFlow('app')} className="w-full bg-[#FFC300] rounded-full py-3 font-bold mt-6">Allow Location</button>
          <button onClick={()=>setFlow('app')} className="text-xs mt-3">Maybe later</button>
        </div>
      </div>
    )
  }

  // APP - OLD LAYOUT KEPT + PREMIUM = KAMPALA VERSION (second image)
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white pb-20">
      <header className="p-4 flex justify-between items-center border-b border-white/10">
        <h1 className="font-black text-sm">KLA-MEET • {p.name||'Guest'}</h1>
        <button onClick={()=>setFlow('guest')} className="text-[11px] bg-zinc-800 px-3 py-1 rounded-full">Guest Landing</button>
      </header>

      {appTab==='discover' && (
        <div className="max-w-md mx-auto p-4">
          <h2 className="font-black text-xl">Discover • Old Layout</h2>
          <p className="text-[11px] text-white/50 mt-1">Your original discover grid kept</p>
          <div className="grid grid-cols-2 gap-3 mt-4">
            {[21,22,23,24,25,26].map(i=>(
              <div key={i} className="bg-zinc-900 rounded-[20px] overflow-hidden border border-white/10">
                <img src={`https://randomuser.me/api/portraits/women/${i}.jpg`} className="h-40 w-full object-cover"/>
                <div className="p-3"><p className="font-bold text-xs">User {i}, {20+i}</p><p className="text-[10px] text-white/50">Bushenyi • {p.interests[0]||'Music'}</p></div>
              </div>
            ))}
          </div>
        </div>
      )}

      {appTab==='premium' && (
        <div className="min-h-screen bg-white text-black -m-4">
          {/* Premium = Kampala version */}
          <div className="bg-white px-6 py-4 flex justify-between items-center border-b sticky top-0">
            <h1 className="font-black text-lg flex items-center gap-1"><span className="text-[#FFC300]">📍</span> KLA-MEET</h1>
            <div className="flex gap-2 text-[12px]"><span>About</span><span>Safety</span><span>Community</span><span>Success Stories</span></div>
          </div>

          <section className="px-6 py-8 grid md:grid-cols-2 gap-6 items-center max-w-[1100px] mx-auto">
            <div>
              <h2 className="text-[36px] font-black leading-[0.9]">Date. Meet. Connect.<br/>In Kampala.</h2>
              <p className="text-[12px] text-zinc-600 mt-3">The modern way for Kampala to meet real people, nearby. Join thousands of singles building meaningful relationships — safely, locally, authentically.</p>
              <div className="flex gap-2 mt-5">
                <button className="bg-[#FFC300] px-5 py-3 rounded-full font-bold text-xs">Get Started — It's Free →</button>
                <button className="border px-5 py-3 rounded-full font-bold text-xs">Download the app</button>
              </div>
              <p className="text-[10px] mt-4">🟢 Verified profiles • Privacy-first • Made for Kampala, Uganda</p>
            </div>
            <img src="https://images.unsplash.com/photo-1622245714860-45da8f68d76a?w=600" className="rounded-[20px] h-[280px] w-full object-cover"/>
          </section>

          <section className="bg-[#f8f8f7] px-6 py-8">
            <div className="max-w-[1100px] mx-auto">
              <h3 className="text-center font-black text-xl">How KLA-MEET Works — Premium</h3>
              <p className="text-center text-[11px] text-zinc-500">Premium unlocks Kampala priority + global. 5 steps.</p>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mt-6">
                <div className="text-center"><div className="mx-auto w-[130px] h-[200px] bg-black text-white rounded-[18px] p-3"><p className="text-[#FFC300] text-[9px]">Step 1 of 5</p><p className="font-bold text-[11px] mt-2">What should we call you?</p><PayButtons plan="basic"/></div><p className="text-[10px] font-bold mt-2">1. Name & Birthday — $2.99</p></div>
                <div className="text-center"><div className="mx-auto w-[130px] h-[200px] bg-black text-white rounded-[18px] p-3"><p className="text-[#FFC300] text-[9px]">Step 2 of 5</p><p className="font-bold text-[11px] mt-2">Your gender</p><PayButtons plan="basic"/></div><p className="text-[10px] font-bold mt-2">2. Gender</p></div>
                <div className="text-center"><div className="mx-auto w-[130px] h-[200px] bg-black text-white rounded-[18px] p-3"><p className="text-[#FFC300] text-[9px]">Step 3 of 5</p><p className="font-bold text-[11px] mt-2">What are you looking for?</p><PayButtons plan="standard"/></div><p className="text-[10px] font-bold mt-2">3. Relationship — $5.99</p></div>
                <div className="text-center"><div className="mx-auto w-[130px] h-[200px] bg-black text-white rounded-[18px] p-3"><p className="text-[#FFC300] text-[9px]">Step 4 of 5</p><p className="font-bold text-[11px] mt-2">Pick your interests</p><PayButtons plan="standard"/></div><p className="text-[10px] font-bold mt-2">4. Interests</p></div>
                <div className="text-center"><div className="mx-auto w-[130px] h-[200px] bg-black text-white rounded-[18px] p-3"><p className="text-[#FFC300] text-[9px]">Step 5 of 5</p><p className="font-bold text-[11px] mt-2">Where are you located?</p><div className="bg-white text-black rounded p-2 mt-2 text-[10px]">Kampala, Uganda</div><PayButtons plan="standard"/></div><p className="text-[10px] font-bold mt-2">5. Location</p></div>
              </div>
              <p className="text-center text-[10px] mt-8 text-zinc-500">Oxa Light link {OXA.split('/').pop()} wallet 0XAY27FbUKmf4xPg5ZRFP1l1dbe alive + Pesapal MTN/Airtel/Card</p>
            </div>
          </section>
        </div>
      )}

      <nav className="fixed bottom-0 left-0 right-0 bg-black border-t border-white/10 flex justify-around p-3">
        <button onClick={()=>setAppTab('discover')} className={`text-xs ${appTab==='discover'?'text-[#FFC300] font-black':''}`}>Discover (Old)</button>
        <button onClick={()=>setAppTab('premium')} className={`text-xs ${appTab==='premium'?'text-[#FFC300] font-black':''}`}>Premium (Kampala)</button>
      </nav>
    </div>
  )
}
