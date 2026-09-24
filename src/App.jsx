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

  useEffect(()=>{
    if(localStorage.getItem('kla_premium')==='yes') setIsPremium(true)
    if(window.location.search.includes('premium=success')){
      localStorage.setItem('kla_premium','yes')
      setIsPremium(true)
      setView('app')
      setTab('chat')
    }
    const pg = new URLSearchParams(window.location.search).get('page')
    if(pg){
      setView('app')
      setTab(pg==='chats'?'chat':pg)
    }
  },[])

  const openCrypto = () => window.open(OXA, '_blank')
  const openPesapal = async (plan) => {
    const r = await fetch('/api/pesapal', {method:'POST',headers:{'Content-Type':'application/json'},body: JSON.stringify({plan})})
    const j = await r.json()
    if(j.redirect_url) window.open(j.redirect_url, '_blank')
  }

  const handleTab = (t) => {
    if((t==='nearby' || t==='chat' || t==='liked') &&!isPremium){
      setTab('premium')
      return
    }
    setTab(t)
    window.history.pushState({},'',`/?page=${t}`)
  }

  const PremiumWall = () => (
    <div className="max-w-md mx-auto p-6 text-center">
      <div className="bg-zinc-900 rounded-[24px] p-6 border border-[#FFC300]/30">
        <p className="text-4xl">🔒</p>
        <h2 className="font-black text-lg mt-3">Premium Required</h2>
        <p className="text-[11px] text-white/60 mt-2">Unlock Near Me, Chat & Liked after payment. Keep Love Alive.</p>
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
        <header className="bg-black text-white px-4 py-3 flex justify-between">
          <h1 className="font-black text-xs">KLA-MEET • Keep Love Alive {isPremium && '• PREMIUM'}</h1>
          <button onClick={()=>{setView('app'); setTab('discover')}} className="bg-[#FFC300] text-black px-4 py-2 rounded-full font-bold text-xs">Enter App</button>
        </header>
        <div className="p-6">
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
          {isPremium && <p className="mt-6 text-xs font-black text-green-600">✓ Premium Active - Chat & Near Me unlocked</p>}
          <div className="mt-8 flex flex-wrap gap-2 text-[10px]">
            {['about','how-it-works','safety','privacy','terms','faqs','guidelines'].map(p=>(
              <button key={p} onClick={()=>{setView('app'); handleTab(p)}} className="underline">{p}</button>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white pb-24">
      <header className="p-3 bg-black border-b border-white/10 flex justify-between">
        <h1 className="font-black text-xs">KLA-MEET {isPremium && '• PREMIUM'}</h1>
        <button onClick={()=>setView('landing')} className="text-[10px] bg-zinc-800 px-3 py-1 rounded-full">Landing</button>
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
      {tab==='liked' && (isPremium? <div className="max-w-md mx-auto p-4"><h2 className="font-black">Liked</h2><p className="text-xs text-white/60 mt-3">People you liked will appear here.</p></div> : <PremiumWall />)}

      {tab==='premium' && (
        <div className="max-w-md mx-auto p-4 space-y-4">
          <h2 className="font-black">Premium • Unlock Chat & Near Me</h2>
          {isPremium && <div className="bg-green-500 text-black rounded-2xl p-3 font-black text-xs">✓ Premium Active</div>}
          <div className="bg-[#FFC300] text-black rounded-2xl p-4">
            <p className="font-black text-sm">Basic $2.99 — Crypto ALONE</p>
            <p className="text-[10px] mt-1">Unlocks Chat + Near Me (Basic)</p>
            <button onClick={openCrypto} className="w-full bg-black text-white rounded-full py-3 font-bold text-xs mt-2">Crypto OXA 18802533 — $2.99</button>
            <p className="text-[7px] mt-1 break-all">{WALLET}</p>
          </div>
          <div className="bg-zinc-900 rounded-2xl p-4 border border-white/10">
            <p className="font-black text-sm">Basic $2.99 — Pesapal ALONE</p>
            <p className="text-[10px] mt-1 text-white/60">MTN / Airtel / Card</p>
            <button onClick={()=>openPesapal('basic')} className="w-full bg-[#FF6A00] text-white rounded-full py-3 font-bold text-xs mt-2">Pesapal — $2.99</button>
          </div>
          <div className="bg-[#FFC300] text-black rounded-2xl p-4">
            <p className="font-black text-sm">Standard $5.99 — Crypto ALONE</p>
            <p className="text-[10px] mt-1">Unlocks All Features</p>
            <button onClick={openCrypto} className="w-full bg-black text-white rounded-full py-3 font-bold text-xs mt-2">Crypto OXA 18802533 — $5.99</button>
          </div>
          <div className="bg-zinc-900 rounded-2xl p-4 border border-white/10">
            <p className="font-black text-sm">Standard $5.99 — Pesapal ALONE</p>
            <button onClick={()=>openPesapal('standard')} className="w-full bg-[#FF6A00] text-white rounded-full py-3 font-bold text-xs mt-2">Pesapal — $5.99</button>
          </div>
        </div>
      )}

      {tab==='about' && <Static title="About"><p>KLA-MEET • Keep Love Alive. Date worldwide, meet near you in Arua & worldwide.</p></Static>}
      {tab==='how-it-works' && <Static title="How It Works"><p>1. Discover profiles<br/>2. Pay Basic $2.99 or Standard $5.99 via Crypto ALONE or Pesapal ALONE<br/>3. Unlock Chat, Near Me, Liked<br/>4. Keep Love Alive.</p></Static>}
      {tab==='safety' && <Static title="Safety"><p>Never send money to anyone. Report suspicious profiles. Premium required to chat.</p></Static>}
      {tab==='privacy' && <Static title="Privacy Policy"><p>We don't share your data. Payments via Pesapal & Oxapay. Premium status stored locally.</p></Static>}
      {tab==='terms' && <Static title="Terms"><p>By using KLA-MEET you agree to be 18+, respect others, premium payments non-refundable.</p></Static>}
      {tab==='faqs' && <Static title="FAQs"><p>Q: How to unlock chat?<br/>A: Pay via Premium tab (Crypto ALONE or Pesapal ALONE).<br/><br/>Q: Why Near Me locked?<br/>A: Premium needed.</p></Static>}
      {tab==='guidelines' && <Static title="Guidelines"><p>Be respectful, no nudity, no spam, Keep Love Alive.</p></Static>}
      {tab==='login' && <Static title="Login"><p>Login is premium-gated. Unlock premium to access chat and messaging.</p><button onClick={()=>handleTab('premium')} className="bg-[#FFC300] text-black px-4 py-2 rounded-full font-bold text-xs">Go Premium</button></Static>}
      {tab==='signin' && <Static title="Sign In"><p>Sign In is same as Login - premium required.</p><button onClick={()=>handleTab('premium')} className="bg-[#FFC300] text-black px-4 py-2 rounded-full font-bold text-xs">Go Premium</button></Static>}
      {tab==='signup' && <Static title="Sign Up"><p>Create account to discover worldwide profiles. Premium unlocks chat.</p><button onClick={()=>handleTab('discover')} className="bg-[#FFC300] text-black px-4 py-2 rounded-full font-bold text-xs">Start Discover</button></Static>}
      {tab==='profile' && <Static title="Profile"><p>Your profile — Keep Love Alive. Premium shows verified badge.</p></Static>}

      {/* Footer with all links */}
      <div className="max-w-md mx-auto p-4 mt-6 border-t border-white/10">
        <div className="flex flex-wrap gap-3 text-[10px] text-white/50">
          {['about','how-it-works','safety','privacy','terms','faqs','guidelines','profile','login','signin','signup','liked'].map(p=>(
            <button key={p} onClick={()=>handleTab(p)} className="underline hover:text-white">{p}</button>
          ))}
        </div>
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