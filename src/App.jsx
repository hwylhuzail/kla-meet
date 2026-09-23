import { useState } from 'react'
const OXA = "https://pay.oxapay.com/18802533"
const WALLET = "0XAY27FbUKmf4xPg5ZRFP1l1dbe"
const WORLD = [
  {city:'Paris', flag:'🇫🇷', img:'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400'},
  {city:'Tokyo', flag:'🇯🇵', img:'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400'},
  {city:'New York', flag:'🇺🇸', img:'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400'},
  {city:'London', flag:'🇬🇧', img:'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400'},
  {city:'Sydney', flag:'🇦🇺', img:'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400'},
  {city:'Rio', flag:'🇧🇷', img:'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400'},
]
function PremiumCard({step, title, price}){
  const handleCrypto = () => { window.open(OXA, '_blank') }
  const handlePesapal = async () => {
    try{
      const r = await fetch('/api/pesapal', {method:'POST',headers:{'Content-Type':'application/json'},body: JSON.stringify({plan: price==='2.99'?'basic':'standard'})})
      const text = await r.text()
      let j; try{ j=JSON.parse(text) }catch{ j={error:text} }
      if(j.redirect_url) window.open(j.redirect_url, '_blank')
      else { alert('Pesapal not configured yet - use Crypto for now'); window.open(OXA,'_blank') }
    }catch{ window.open(OXA,'_blank') }
  }
  return (
    <div className="bg-black text-white rounded-[20px] p-4 w-[160px] flex flex-col">
      <p className="text-[#FFC300] text-[10px]">Step {step} of 5</p>
      <p className="font-bold text-[12px] mt-2 h-8">{title}</p>
      <button onClick={handleCrypto} className="mt-3 w-full bg-white text-black rounded-full py-2.5 font-bold text-[10px]">⚡ Crypto OXA LIGHT<br/>18802533 - ${price}</button>
      <p className="text-[8px] text-white/40 text-center mt-1">Wallet {WALLET.slice(0,10)}...</p>
      <button onClick={handlePesapal} className="mt-3 w-full bg-[#FF6A00] text-white rounded-full py-2.5 font-bold text-[10px]">Pesapal<br/>MTN/Airtel/Card - ${price}</button>
    </div>
  )
}
export default function App(){
  const [view,setView]=useState('landing')
  const [onStep,setOnStep]=useState(1)
  const [tab,setTab]=useState('discover')
  const [profile,setProfile]=useState({name:'', looking:'Date', intent:'Long-term', bio:''})
  if(view==='landing'){
    return (
      <div className="min-h-screen bg-white text-black">
        <header className="bg-black text-white px-4 py-3 flex justify-between"><h1 className="font-black text-sm">KLA-MEET • Keep Love Alive</h1><button onClick={()=>{setView('onboarding'); setOnStep(1)}} className="bg-[#FFC300] text-black px-4 py-2 rounded-full font-bold text-xs">Get Started →</button></header>
        <section className="px-6 py-10 grid md:grid-cols-2 gap-6"><div><h2 className="text-[40px] font-black leading-[0.9]">Date. Meet.<br/>Connect.<br/>Worldwide.</h2></div><div className="grid grid-cols-3 gap-2">{WORLD.slice(0,3).map(w=><img key={w.city} src={w.img} className="h-28 rounded-xl object-cover" />)}</div></section>
        <section className="bg-[#f7f7f6] px-6 py-8"><h3 className="text-center font-black">How KLA-MEET Works — Premium • Keep Love Alive</h3><p className="text-center text-[11px] text-zinc-500">Worldwide priority. 5 steps. Each button stands alone.</p><div className="flex gap-3 overflow-x-auto mt-6 pb-4"><PremiumCard step={1} title="What should we call you?" price="2.99" /><PremiumCard step={2} title="Your gender" price="2.99" /><PremiumCard step={3} title="What are you looking for?" price="5.99" /><PremiumCard step={4} title="Pick your interests" price="5.99" /><PremiumCard step={5} title="Bio + Location" price="5.99" /></div></section>
      </div>
    )
  }
  if(view==='onboarding'){
    if(onStep===1) return <div className="min-h-screen flex items-center justify-center p-6"><div className="w-[340px] border rounded-[28px] p-6 text-center"><h3 className="font-black">Welcome to KLA-MEET • Keep Love Alive</h3><button onClick={()=>setOnStep(2)} className="w-full bg-[#FFC300] rounded-full py-3 font-bold mt-6">Get Started →</button></div></div>
    if(onStep===2) return <div className="min-h-screen flex items-center justify-center p-6"><div className="w-[360px] border rounded-[28px] p-6"><input value={profile.name} onChange={e=>setProfile({...profile,name:e.target.value})} placeholder="Name" className="w-full border rounded-xl px-4 py-3"/><p className="text-[11px] font-bold mt-3">I want:</p><div className="grid grid-cols-2 gap-2 mt-2">{['Date','Friendship'].map(t=><button key={t} onClick={()=>setProfile({...profile,looking:t})} className={`border rounded-xl py-2 text-sm ${profile.looking===t?'bg-black text-white':''}`}>{t}</button>)}</div><textarea value={profile.bio} onChange={e=>setProfile({...profile,bio:e.target.value})} placeholder="Bio..." className="w-full border rounded-xl px-4 py-2 mt-3 h-20 text-sm"/><button onClick={()=>setOnStep(3)} className="w-full bg-[#FFC300] rounded-full py-3 font-bold mt-3">Continue</button></div></div>
    if(onStep>=3) return <div className="min-h-screen flex items-center justify-center p-6"><div className="w-[340px] border rounded-[28px] p-6 text-center"><h3 className="font-black">Location worldwide</h3><button onClick={()=>setView('app')} className="w-full bg-[#FFC300] rounded-full py-3 font-bold mt-6">Enter App</button></div></div>
  }
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white pb-24">
      <header className="p-3 bg-black border-b border-white/10 flex justify-between"><h1 className="font-black text-xs">KLA-MEET • Keep Love Alive • {profile.name}</h1><button onClick={()=>setView('landing')} className="text-[10px] bg-zinc-800 px-3 py-1 rounded-full">Landing</button></header>
      {tab==='discover' && (<div className="max-w-md mx-auto p-4"><h2 className="font-black">Discover • Worldwide</h2><div className="grid grid-cols-2 gap-3 mt-4">{WORLD.map(w=><div key={w.city} className="bg-zinc-900 rounded-[20px] overflow-hidden"><img src={w.img} className="h-32 w-full object-cover"/><div className="p-2"><p className="text-xs font-bold">{w.flag} {w.city}</p><p className="text-[9px] text-white/50">Keep Love Alive</p></div></div>)}</div></div>)}
      {tab==='premium' && (<div className="max-w-md mx-auto p-4"><h2 className="font-black">Premium • Buttons Stand Alone</h2><div className="mt-4 space-y-4"><div className="bg-[#FFC300] text-black rounded-2xl p-4"><p className="font-black text-sm">Basic $2.99 — Crypto ALONE</p><button onClick={()=>window.open(OXA,'_blank')} className="w-full bg-black text-white rounded-full py-3 font-bold text-xs mt-2">⚡ Crypto OXA 18802533 • $2.99</button><p className="text-[9px] mt-1">Wallet {WALLET}</p></div><div className="bg-zinc-900 rounded-2xl p-4 border border-white/10"><p className="font-black text-sm">Basic $2.99 — Pesapal ALONE</p><button onClick={async()=>{try{const r=await fetch('/api/pesapal',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({plan:'basic'})});const j=await r.json(); if(j.redirect_url) window.open(j.redirect_url,'_blank'); else alert('Pesapal keys missing, use Crypto')}catch{ window.open(OXA,'_blank') }}} className="w-full bg-[#FF6A00] text-white rounded-full py-3 font-bold text-xs mt-2">Pesapal MTN/Airtel/Card • $2.99</button></div><div className="bg-[#FFC300] text-black rounded-2xl p-4"><p className="font-black text-sm">Standard $5.99 — Crypto ALONE</p><button onClick={()=>window.open(OXA,'_blank')} className="w-full bg-black text-white rounded-full py-3 font-bold text-xs mt-2">⚡ Crypto OXA 18802533 • $5.99</button></div><div className="bg-zinc-900 rounded-2xl p-4 border border-white/10"><p className="font-black text-sm">Standard $5.99 — Pesapal ALONE</p><button onClick={async()=>{try{const r=await fetch('/api/pesapal',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({plan:'standard'})});const j=await r.json(); if(j.redirect_url) window.open(j.redirect_url,'_blank'); else alert('Pesapal keys missing, use Crypto')}catch{ window.open(OXA,'_blank') }}} className="w-full bg-[#FF6A00] text-white rounded-full py-3 font-bold text-xs mt-2">Pesapal MTN/Airtel/Card • $5.99</button></div></div></div>)}
      <nav className="fixed bottom-0 left-0 right-0 bg-black border-t border-white/10 flex justify-around py-3"><button onClick={()=>setTab('discover')} className={`text-[11px] ${tab==='discover'?'text-[#FFC300] font-black':''}`}>♡ Discover</button><button onClick={()=>setTab('premium')} className={`text-[11px] ${tab==='premium'?'text-[#FFC300] font-black':''}`}>★ Premium</button></nav>
    </div>
  )
}
