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
  },[])

  const openCrypto = () => window.open(OXA, '_blank')
  const openPesapal = async (plan) => {
    const r = await fetch('/api/pesapal', {method:'POST',headers:{'Content-Type':'application/json'},body: JSON.stringify({plan})})
    const j = await r.json()
    if(j.redirect_url) window.open(j.redirect_url, '_blank')
  }

  const handleTab = (t) => {
    if((t==='nearby' || t==='chat') &&!isPremium){
      setTab('premium')
      return
    }
    setTab(t)
  }

  const PremiumWall = () => (
    <div className="max-w-md mx-auto p-6 text-center">
      <div className="bg-zinc-900 rounded-[24px] p-6 border border-[#FFC300]/30">
        <p className="text-4xl">🔒</p>
        <h2 className="font-black text-lg mt-3">Premium Required</h2>
        <p className="text-[11px] text-white/60 mt-2">Unlock Near Me & Chat after payment. Keep Love Alive.</p>
        <button onClick={()=>setTab('premium')} className="mt-4 w-full bg-[#FFC300] text-black rounded-full py-3 font-black text-xs">Unlock Premium</button>
      </div>
    </div>
  )

  if(view==='landing'){
    return (
      <div className="min-h-screen bg-white text-black">
        <header className="bg-black text-white px-4 py-3 flex justify-between">
          <h1 className="font-black text-xs">KLA-MEET • Keep Love Alive {isPremium && '• PREMIUM'}</h1>
          <button onClick={()=>setView('app')} className="bg-[#FFC300] text-black px-4 py-2 rounded-full font-bold text-xs">Enter App</button>
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
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white pb-20">
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

      {tab==='nearby' && (
        isPremium? (
          <div className="max-w-md mx-auto p-4">
            <h2 className="font-black">Near Me • Arua</h2>
            <div className="grid grid-cols-2 gap-3 mt-4">
              {WORLD.map(w=>(
                <div key={w.city} className="bg-zinc-900 rounded-[20px] overflow-hidden border border-green-500/20">
                  <img src={w.img} className="h-32 w-full object-cover" alt="" />
                  <div className="p-2"><p className="text-xs font-bold">{w.city} • 2km</p><p className="text-[9px] text-green-400">Online now</p></div>
                </div>
              ))}
            </div>
          </div>
        ) : <PremiumWall />
      )}

      {tab==='chat' && (
        isPremium? (
          <div className="max-w-md mx-auto p-4">
            <h2 className="font-black">Chat • Premium</h2>
            <div className="mt-4 space-y-3">
              {WORLD.map(w=>(
                <div key={w.city} className="bg-zinc-900 rounded-2xl p-3 flex gap-3 items-center">
                  <img src={w.img} className="w-10 h-10 rounded-full object-cover" alt="" />
                  <div><p className="text-xs font-bold">{w.city}</p><p className="text-[10px] text-white/50">Hey, Keep Love Alive! ❤️</p></div>
                </div>
              ))}
            </div>
          </div>
        ) : <PremiumWall />
      )}

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

      <nav className="fixed bottom-0 left-0 right-0 bg-black border-t border-white/10 flex justify-around py-3">
        <button onClick={()=>handleTab('discover')} className={`text-[11px] ${tab==='discover'?'text-[#FFC300] font-black':''}`}>♡ Discover</button>
        <button onClick={()=>handleTab('nearby')} className={`text-[11px] ${tab==='nearby'?'text-[#FFC300] font-black':''} ${!isPremium?'opacity-50':''}`}>◎ Near Me {!isPremium && '🔒'}</button>
        <button onClick={()=>handleTab('chat')} className={`text-[11px] ${tab==='chat'?'text-[#FFC300] font-black':''} ${!isPremium?'opacity-50':''}`}>💬 Chat {!isPremium && '🔒'}</button>
        <button onClick={()=>handleTab('premium')} className={`text-[11px] ${tab==='premium'?'text-[#FFC300] font-black':''}`}>★ Premium</button>
      </nav>
    </div>
  )
}
