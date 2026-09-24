import { useState, useEffect } from 'react'
const OXA = "https://pay.oxapay.com/18802533"
const WALLET = "0XAY27FbUKmf4xPg5ZRFP1l1dbe"
const WORLD = [
  {city:'Paris', flag:'🇫🇷', img:'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400'},
  {city:'Tokyo', flag:'🇯🇵', img:'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400'},
  {city:'New York', flag:'🇺🇸', img:'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400'},
  {city:'London', flag:'🇬🇧', img:'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400'},
]

export default function App(){
  const [view,setView]=useState('landing')
  const [tab,setTab]=useState('discover')
  const [isPremium,setIsPremium]=useState(false)
  const [form,setForm]=useState({name:'',email:'',bio:'',interests:'',gender:'Female',age:'22'})

  useEffect(()=>{
    if(localStorage.getItem('kla_premium')==='yes') setIsPremium(true)
    if(window.location.search.includes('premium=success')){
      localStorage.setItem('kla_premium','yes')
      setIsPremium(true)
      setView('app')
      setTab('chat')
    }
    const pg = new URLSearchParams(window.location.search).get('page')
    if(pg){ setView('app'); setTab(pg==='chats'?'chat':pg) }
  },[])

  const openCrypto = () => window.open(OXA, '_blank')
  const openPesapal = async (plan) => {
    const r = await fetch('/api/pesapal', {method:'POST',headers:{'Content-Type':'application/json'},body: JSON.stringify({plan})})
    const j = await r.json()
    if(j.redirect_url) window.open(j.redirect_url, '_blank')
  }
  const handleTab = (t) => {
    if((t==='nearby' || t==='chat' || t==='liked' || t==='profile') &&!isPremium){ setTab('premium'); return }
    setTab(t); window.history.pushState({},'',`/?page=${t}`)
  }

  const PremiumWall = () => (
    <div className="max-w-md mx-auto p-6 text-center">
      <div className="bg-zinc-900 rounded-[24px] p-6 border border-[#FFC300]/30">
        <p className="text-4xl">🔒</p>
        <h2 className="font-black text-lg mt-3">Premium Required</h2>
        <p className="text-[11px] text-white/60 mt-2">Unlock {tab} after payment. Keep Love Alive.</p>
        <button onClick={()=>setTab('premium')} className="mt-4 w-full bg-[#FFC300] text-black rounded-full py-3 font-black text-xs">Unlock Premium</button>
      </div>
    </div>
  )

  const Static = ({title, children}) => (
    <div className="max-w-md mx-auto p-6">
      <h2 className="font-black text-xl">{title}</h2>
      <div className="text-[12px] text-white/70 mt-4 leading-relaxed space-y-3">{children}</div>
      <button onClick={()=>handleTab('discover')} className="mt-6 bg-zinc-800 px-4 py-2 rounded-full text-xs">Back to Discover</button>
    </div>
  )

  if(view==='landing'){
    return (
      <div className="min-h-screen bg-white text-black">
        <header className="bg-black text-white px-4 py-3 flex justify-between items-center">
          <h1 className="font-black text-xs">KLA-MEET • Keep Love Alive</h1>
          <button onClick={()=>{setView('app'); setTab('discover')}} className="bg-[#FFC300] text-black px-4 py-2 rounded-full font-bold text-xs">Enter App</button>
        </header>

        <div className="max-w-md mx-auto p-6">
          <h2 className="text-[32px] font-black leading-none">Date. Meet.<br/>Worldwide.</h2>

          <div className="mt-6 flex gap-3">
            <div className="bg-black text-white rounded-[20px] p-4 w-[160px]">
              <p className="text-[10px] text-[#FFC300]">Step 1-2</p>
              <p className="font-bold text-xs mt-2">Basic $2.99</p>
              <button onClick={openCrypto} className="mt-3 w-full bg-white text-black rounded-full py-2 font-bold text-[10px]">Crypto ALONE</button>
              <button onClick={()=>openPesapal('basic')} className="mt-2 w-full bg-[#FF6A00] text-white rounded-full py-2 font-bold text-[10px]">Pesapal ALONE</button>
            </div>
            <div className="bg-black text-white rounded-[20px] p-4 w-[160px]">
              <p className="text-[10px] text-[#FFC300]">Step 3-5</p>
              <p className="font-bold text-xs mt-2">Standard $5.99</p>
              <button onClick={openCrypto} className="mt-3 w-full bg-white text-black rounded-full py-2 font-bold text-[10px]">Crypto ALONE</button>
              <button onClick={()=>openPesapal('standard')} className="mt-2 w-full bg-[#FF6A00] text-white rounded-full py-2 font-bold text-[10px]">Pesapal ALONE</button>
            </div>
          </div>

          {/* STANDALONE ON LANDING */}
          <div className="mt-10 space-y-6">
            <div className="bg-zinc-100 rounded-[24px] p-5">
              <h3 className="font-black">About</h3>
              <p className="text-[11px] mt-2">KLA-MEET connects Arua to Paris, Tokyo, New York, London. Keep Love Alive — date worldwide, meet nearby.</p>
            </div>

            <div className="bg-black text-white rounded-[24px] p-5">
              <h3 className="font-black text-[#FFC300]">How It Works</h3>
              <p className="text-[11px] mt-2 leading-relaxed">1. Discover worldwide<br/>2. Pick Basic $2.99 or Standard $5.99<br/>3. Pay Crypto ALONE or Pesapal ALONE<br/>4. Unlock Chat, Near Me, Liked, Profile</p>
            </div>

            <div className="border rounded-[24px] p-5">
              <h3 className="font-black">FAQs</h3>
              <p className="text-[11px] mt-2"><b>Q: How to unlock chat?</b><br/>A: Pay in Premium.<br/><br/><b>Q: What payment?</b><br/>A: Crypto ALONE (Oxapay) or Pesapal ALONE (MTN/Airtel/Card)</p>
            </div>

            <div id="signin" className="bg-zinc-900 text-white rounded-[24px] p-5">
              <h3 className="font-black">Sign In — Standalone</h3>
              <input placeholder="Email" className="mt-3 w-full bg-zinc-800 rounded-full px-4 py-3 text-xs" />
              <input placeholder="Password" type="password" className="mt-2 w-full bg-zinc-800 rounded-full px-4 py-3 text-xs" />
              <button onClick={()=>{setView('app'); setTab('discover')}} className="mt-3 w-full bg-[#FFC300] text-black rounded-full py-3 font-black text-xs">Sign In</button>
            </div>

            <div className="bg-[#FFC300] rounded-[24px] p-5">
              <h3 className="font-black">Sign Up — Standalone</h3>
              <input value={form.name} onChange={e=>setForm({...form,name:e.target.value})} placeholder="Name" className="mt-3 w-full bg-white rounded-full px-4 py-3 text-xs" />
              <input value={form.email} onChange={e=>setForm({...form,email:e.target.value})} placeholder="Email" className="mt-2 w-full bg-white rounded-full px-4 py-3 text-xs" />
              <div className="flex gap-2 mt-2">
                <select value={form.gender} onChange={e=>setForm({...form,gender:e.target.value})} className="w-1/2 bg-white rounded-full px-4 py-3 text-xs"><option>Female</option><option>Male</option><option>Other</option></select>
                <input value={form.age} onChange={e=>setForm({...form,age:e.target.value})} placeholder="Age" className="w-1/2 bg-white rounded-full px-4 py-3 text-xs" />
              </div>
              <input value={form.interests} onChange={e=>setForm({...form,interests:e.target.value})} placeholder="Interests (Music, Travel...)" className="mt-2 w-full bg-white rounded-full px-4 py-3 text-xs" />
              <textarea value={form.bio} onChange={e=>setForm({...form,bio:e.target.value})} placeholder="Bio" className="mt-2 w-full bg-white rounded-2xl px-4 py-3 text-xs h-20" />
              <button onClick={()=>{setView('app'); setTab('profile')}} className="mt-3 w-full bg-black text-white rounded-full py-3 font-black text-xs">Sign Up & Create Profile</button>
            </div>
          </div>

          <div className="mt-8 text-[10px] opacity-60 flex gap-4">
            <span>© KLA-MEET</span>
            <a href="/privacy" className="underline">Privacy</a>
            <a href="/safety" className="underline">Safety</a>
            <a href="/terms" className="underline">Terms</a>
            <a href="/guidelines" className="underline">Guidelines</a>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white pb-24">
      <header className="p-3 bg-black border-b border-white/10 flex justify-between items-center">
        <h1 className="font-black text-xs">KLA-MEET {isPremium && '• PREMIUM'}</h1>
        <div className="flex gap-2">
          <button onClick={()=>handleTab('liked')} className="text-[11px] bg-zinc-800 px-3 py-1.5 rounded-full font-bold border border-[#FFC300]/30">❤️ Liked</button>
          <button onClick={()=>handleTab('profile')} className="text-[11px] bg-white text-black px-3 py-1.5 rounded-full font-black">Profile</button>
          <button onClick={()=>setView('landing')} className="text-[10px] bg-zinc-800 px-2 py-1 rounded-full">Landing</button>
        </div>
      </header>

      {tab==='discover' && (
        <div className="max-w-md mx-auto p-4">
          <h2 className="font-black">Discover • Worldwide</h2>
          <div className="grid grid-cols-2 gap-3 mt-4">
            {WORLD.map(w=>(
              <div key={w.city} className="bg-zinc-900 rounded-[20px] overflow-hidden">
                <img src={w.img} className="h-32 w-full object-cover" alt="" />
                <div className="p-2"><p className="text-xs font-bold">{w.flag} {w.city}</p><p className="text-[9px] text-white/50">Keep Love Alive</p></div>
              </div>
            ))}
          </div>
        </div>
      )}
      {tab==='nearby' && (isPremium? <div className="max-w-md mx-auto p-4"><h2 className="font-black">Near Me • Arua</h2><div className="grid grid-cols-2 gap-3 mt-4">{WORLD.map(w=>(<div key={w.city} className="bg-zinc-900 rounded-[20px] overflow-hidden border border-green-500/20"><img src={w.img} className="h-32 w-full object-cover"/><div className="p-2"><p className="text-xs font-bold">{w.city} • 2km</p><p className="text-[9px] text-green-400">Online now</p></div></div>))}</div></div> : <PremiumWall />)}
      {tab==='chat' && (isPremium? <div className="max-w-md mx-auto p-4"><h2 className="font-black">Chat • Premium</h2><div className="mt-4 space-y-3">{WORLD.map(w=>(<div key={w.city} className="bg-zinc-900 rounded-2xl p-3 flex gap-3 items-center"><img src={w.img} className="w-10 h-10 rounded-full object-cover"/><div><p className="text-xs font-bold">{w.city}</p><p className="text-[10px] text-white/50">Hey, Keep Love Alive! ❤️</p></div></div>))}</div></div> : <PremiumWall />)}

      {tab==='liked' && (isPremium? <div className="max-w-md mx-auto p-4"><h2 className="font-black">Liked — Standalone Button</h2><div className="mt-4 grid grid-cols-2 gap-3">{WORLD.map(w=>(<div key={w.city} className="bg-zinc-900 rounded-[20px] p-4 text-center"><img src={w.img} className="w-16 h-16 rounded-full mx-auto object-cover"/><p className="text-xs font-bold mt-2">{w.flag} {w.city}</p><p className="text-[9px] text-[#FFC300] mt-1">You liked</p></div>))}</div></div> : <PremiumWall />)}

      {tab==='profile' && (isPremium? <div className="max-w-md mx-auto p-4">
        <h2 className="font-black">Profile — Standalone Button</h2>
        <div className="mt-4 bg-zinc-900 rounded-[24px] p-5">
          <div className="w-20 h-20 bg-[#FFC300] rounded-full mx-auto flex items-center justify-center font-black text-black text-xl">{form.name?form.name[0]:'K'}</div>
          <p className="text-center font-bold text-sm mt-2">{form.name || 'Your Name'} • {form.gender}</p>
          <div className="mt-4 space-y-3">
            <div><p className="text-[10px] text-white/50">Name</p><input value={form.name} onChange={e=>setForm({...form,name:e.target.value})} className="w-full bg-black rounded-full px-4 py-2.5 text-xs border border-white/10" /></div>
            <div><p className="text-[10px] text-white/50">Email</p><input value={form.email} onChange={e=>setForm({...form,email:e.target.value})} className="w-full bg-black rounded-full px-4 py-2.5 text-xs border border-white/10" /></div>
            <div className="flex gap-2"><div className="w-1/2"><p className="text-[10px] text-white/50">Gender</p><select value={form.gender} onChange={e=>setForm({...form,gender:e.target.value})} className="w-full bg-black rounded-full px-4 py-2.5 text-xs border border-white/10"><option>Female</option><option>Male</option><option>Other</option></select></div><div className="w-1/2"><p className="text-[10px] text-white/50">Age</p><input value={form.age} onChange={e=>setForm({...form,age:e.target.value})} className="w-full bg-black rounded-full px-4 py-2.5 text-xs border border-white/10" /></div></div>
            <div><p className="text-[10px] text-white/50">Interests</p><input value={form.interests} onChange={e=>setForm({...form,interests:e.target.value})} className="w-full bg-black rounded-full px-4 py-2.5 text-xs border border-white/10" placeholder="Music, Travel..." /></div>
            <div><p className="text-[10px] text-white/50">Bio</p><textarea value={form.bio} onChange={e=>setForm({...form,bio:e.target.value})} className="w-full bg-black rounded-2xl px-4 py-2.5 text-xs border border-white/10 h-24" placeholder="About you..." /></div>
          </div>
          <button className="mt-5 w-full bg-[#FFC300] text-black rounded-full py-3 font-black text-xs">Save Profile — Keep Love Alive</button>
        </div>
      </div> : <PremiumWall />)}

      {tab==='premium' && (
        <div className="max-w-md mx-auto p-4 space-y-4">
          <h2 className="font-black">Premium • Unlock Chat & Near Me</h2>
          <div className="bg-[#FFC300] text-black rounded-2xl p-4"><p className="font-black text-sm">Basic $2.99 — Crypto ALONE</p><button onClick={openCrypto} className="w-full bg-black text-white rounded-full py-3 font-bold text-xs mt-2">Crypto OXA 18802533 — $2.99</button><p className="text-[7px] mt-1 break-all">{WALLET}</p></div>
          <div className="bg-zinc-900 rounded-2xl p-4 border border-white/10"><p className="font-black text-sm">Basic $2.99 — Pesapal ALONE</p><button onClick={()=>openPesapal('basic')} className="w-full bg-[#FF6A00] text-white rounded-full py-3 font-bold text-xs mt-2">Pesapal — $2.99</button></div>
          <div className="bg-[#FFC300] text-black rounded-2xl p-4"><p className="font-black text-sm">Standard $5.99 — Crypto ALONE</p><button onClick={openCrypto} className="w-full bg-black text-white rounded-full py-3 font-bold text-xs mt-2">Crypto OXA 18802533 — $5.99</button></div>
          <div className="bg-zinc-900 rounded-2xl p-4 border border-white/10"><p className="font-black text-sm">Standard $5.99 — Pesapal ALONE</p><button onClick={()=>openPesapal('standard')} className="w-full bg-[#FF6A00] text-white rounded-full py-3 font-bold text-xs mt-2">Pesapal — $5.99</button></div>
        </div>
      )}

      {tab==='privacy' && <Static title="Privacy Policy"><p>We don't share your data. Payments via Pesapal & Oxapay. Premium status stored locally.</p></Static>}
      {tab==='safety' && <Static title="Safety"><p>Never send money to anyone. Report suspicious profiles. Premium required to chat.</p></Static>}
      {tab==='terms' && <Static title="Terms"><p>By using KLA-MEET you agree to be 18+, respect others, premium payments non-refundable.</p></Static>}
      {tab==='guidelines' && <Static title="Guidelines"><p>Be respectful, no nudity, no spam, Keep Love Alive.</p></Static>}
      {tab==='about' && <Static title="About"><p>KLA-MEET • Keep Love Alive. Date worldwide, meet near you in Arua & worldwide.</p></Static>}
      {tab==='how-it-works' && <Static title="How It Works"><p>1. Discover profiles<br/>2. Pay Basic $2.99 or Standard $5.99 via Crypto ALONE or Pesapal ALONE<br/>3. Unlock Chat, Near Me, Liked<br/>4. Keep Love Alive.</p></Static>}
      {tab==='faqs' && <Static title="FAQs"><p>Q: How to unlock chat?<br/>A: Pay via Premium tab (Crypto ALONE or Pesapal ALONE).<br/><br/>Q: Why Near Me locked?<br/>A: Premium needed.</p></Static>}

      {/* FOOTER ONLY 4 LINKS */}
      <div className="max-w-md mx-auto p-4 mt-6 border-t border-white/10 flex gap-4 text-[10px] text-white/50">
        {['privacy','safety','terms','guidelines'].map(p=>(
          <button key={p} onClick={()=>handleTab(p)} className="underline hover:text-white">{p}</button>
        ))}
        <span className="ml-auto">© KLA-MEET</span>
      </div>

      <nav className="fixed bottom-0 left-0 right-0 bg-black border-t border-white/10 flex justify-around py-3">
        <button onClick={()=>handleTab('discover')} className={`text-[11px] ${tab==='discover'?'text-[#FFC300] font-black':''}`}>♡ Discover</button>
        <button onClick={()=>handleTab('nearby')} className={`text-[11px] ${tab==='nearby'?'text-[#FFC300] font-black':''} ${!isPremium?'opacity-50':''}`}>◎ Near Me {!isPremium && '🔒'}</button>
        <button onClick={()=>handleTab('chat')} className={`text-[11px] ${tab==='chat'?'text-[#FFC300] font-black':''} ${!isPremium?'opacity-50':''}`}>💬 Chat {!isPremium && '🔒'}</button>
        <button onClick={()=>handleTab('premium')} className={`text-[11px] ${tab==='premium'?'text-[#FFC300] font-black':''}`}>★ Premium</button>
      </nav>
    </div>
  )
}