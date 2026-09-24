import { useState, useEffect } from 'react'
import { supabase } from './supabase'
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
  const [form,setForm]=useState({name:'',email:'',password:'',bio:'',interests:'',gender:'Female',age:'22'})
  const [user,setUser]=useState(null)

  useEffect(()=>{
    supabase.auth.getUser().then(({data})=>setUser(data.user))
    if(localStorage.getItem('kla_premium')==='yes') setIsPremium(true)
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

  const handleSignup = async () => {
    const { data, error } = await supabase.auth.signUp({email:form.email, password:form.password || '12345678'})
    if(error){ alert(error.message); return }
    await supabase.from('profiles').insert([{id:data.user?.id, name:form.name, email:form.email, bio:form.bio, interests:form.interests, gender:form.gender, age:form.age}])
    alert('Account created in Supabase! Check email then Sign In')
    setView('app'); setTab('profile')
  }
  const handleSignin = async () => {
    const { error } = await supabase.auth.signInWithPassword({email:form.email, password:form.password})
    if(error){ alert(error.message); return }
    setView('app'); setTab('profile')
  }

  const PremiumWall = () => (
    <div className="max-w-md mx-auto p-6 text-center"><div className="bg-zinc-900 rounded-[24px] p-6 border border-[#FFC300]/30"><p className="text-4xl">🔒</p><h2 className="font-black text-lg mt-3">Premium Required</h2><p className="text-[11px] text-white/60 mt-2">Unlock {tab} after payment.</p><button onClick={()=>setTab('premium')} className="mt-4 w-full bg-[#FFC300] text-black rounded-full py-3 font-black text-xs">Unlock Premium</button></div></div>
  )

  if(view==='landing'){
    return (
      <div className="min-h-screen bg-white text-black">
        <header className="bg-black text-white px-4 py-3 flex justify-between items-center"><h1 className="font-black text-xs">KLA-MEET • Keep Love Alive</h1><button onClick={()=>{setView('app'); setTab('discover')}} className="bg-[#FFC300] text-black px-4 py-2 rounded-full font-bold text-xs">Enter App</button></header>
        <div className="max-w-md mx-auto p-6">
          <h2 className="text-[32px] font-black leading-none">Date. Meet.<br/>Worldwide.</h2>
          <div className="mt-6 flex gap-3">
            <div className="bg-black text-white rounded-[20px] p-4 w-[160px]"><p className="text-[10px] text-[#FFC300]">Step 1-2</p><p className="font-bold text-xs mt-2">Basic $2.99</p><button onClick={openCrypto} className="mt-3 w-full bg-white text-black rounded-full py-2 font-bold text-[10px]">Crypto ALONE</button><button onClick={()=>openPesapal('basic')} className="mt-2 w-full bg-[#FF6A00] text-white rounded-full py-2 font-bold text-[10px]">Pesapal ALONE</button></div>
            <div className="bg-black text-white rounded-[20px] p-4 w-[160px]"><p className="text-[10px] text-[#FFC300]">Step 3-5</p><p className="font-bold text-xs mt-2">Standard $5.99</p><button onClick={openCrypto} className="mt-3 w-full bg-white text-black rounded-full py-2 font-bold text-[10px]">Crypto ALONE</button><button onClick={()=>openPesapal('standard')} className="mt-2 w-full bg-[#FF6A00] text-white rounded-full py-2 font-bold text-[10px]">Pesapal ALONE</button></div>
          </div>
          <div className="mt-10 space-y-6">
            <div className="bg-zinc-100 rounded-[24px] p-5"><h3 className="font-black">About</h3><p className="text-[11px] mt-2">KLA-MEET connects Arua to Paris, Tokyo, New York, London. Keep Love Alive.</p></div>
            <div className="bg-black text-white rounded-[24px] p-5"><h3 className="font-black text-[#FFC300]">How It Works</h3><p className="text-[11px] mt-2">1. Discover<br/>2. Pick $2.99/$5.99<br/>3. Pay Crypto ALONE or Pesapal ALONE<br/>4. Unlock Chat, Near Me, Liked, Profile</p></div>
            <div className="border rounded-[24px] p-5"><h3 className="font-black">FAQs</h3><p className="text-[11px] mt-2"><b>Q: How to unlock?</b><br/>A: Premium tab.</p></div>
            <div className="bg-zinc-900 text-white rounded-[24px] p-5"><h3 className="font-black">Sign In — Supabase</h3><input value={form.email} onChange={e=>setForm({...form,email:e.target.value})} placeholder="Email" className="mt-3 w-full bg-zinc-800 rounded-full px-4 py-3 text-xs" /><input value={form.password} onChange={e=>setForm({...form,password:e.target.value})} placeholder="Password" type="password" className="mt-2 w-full bg-zinc-800 rounded-full px-4 py-3 text-xs" /><button onClick={handleSignin} className="mt-3 w-full bg-[#FFC300] text-black rounded-full py-3 font-black text-xs">Sign In</button></div>
            <div className="bg-[#FFC300] rounded-[24px] p-5"><h3 className="font-black">Sign Up — Supabase (name,email,bio,interests,gender,age)</h3><input value={form.name} onChange={e=>setForm({...form,name:e.target.value})} placeholder="Name" className="mt-3 w-full bg-white rounded-full px-4 py-3 text-xs" /><input value={form.email} onChange={e=>setForm({...form,email:e.target.value})} placeholder="Email" className="mt-2 w-full bg-white rounded-full px-4 py-3 text-xs" /><input value={form.password} onChange={e=>setForm({...form,password:e.target.value})} placeholder="Password" type="password" className="mt-2 w-full bg-white rounded-full px-4 py-3 text-xs" /><div className="flex gap-2 mt-2"><select value={form.gender} onChange={e=>setForm({...form,gender:e.target.value})} className="w-1/2 bg-white rounded-full px-4 py-3 text-xs"><option>Female</option><option>Male</option><option>Other</option></select><input value={form.age} onChange={e=>setForm({...form,age:e.target.value})} placeholder="Age" className="w-1/2 bg-white rounded-full px-4 py-3 text-xs" /></div><input value={form.interests} onChange={e=>setForm({...form,interests:e.target.value})} placeholder="Interests" className="mt-2 w-full bg-white rounded-full px-4 py-3 text-xs" /><textarea value={form.bio} onChange={e=>setForm({...form,bio:e.target.value})} placeholder="Bio" className="mt-2 w-full bg-white rounded-2xl px-4 py-3 text-xs h-20" /><button onClick={handleSignup} className="mt-3 w-full bg-black text-white rounded-full py-3 font-black text-xs">Sign Up to Supabase</button></div>
          </div>
          <div className="mt-8 text-[10px] opacity-60 flex gap-4"><span>© KLA-MEET</span><a href="/privacy" className="underline">Privacy</a><a href="/safety" className="underline">Safety</a><a href="/terms" className="underline">Terms</a><a href="/guidelines" className="underline">Guidelines</a></div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white pb-24">
      <header className="p-3 bg-black border-b border-white/10 flex justify-between items-center"><h1 className="font-black text-xs">KLA-MEET {isPremium && '• PREMIUM'}</h1><div className="flex gap-2"><button onClick={()=>handleTab('liked')} className="text-[11px] bg-zinc-800 px-3 py-1.5 rounded-full font-bold border border-[#FFC300]/30">❤️ Liked</button><button onClick={()=>handleTab('profile')} className="text-[11px] bg-white text-black px-3 py-1.5 rounded-full font-black">Profile</button><button onClick={()=>setView('landing')} className="text-[10px] bg-zinc-800 px-2 py-1 rounded-full">Landing</button></div></header>
      {tab==='discover' && <div className="max-w-md mx-auto p-4"><h2 className="font-black">Discover • Worldwide</h2><div className="grid grid-cols-2 gap-3 mt-4">{WORLD.map(w=>(<div key={w.city} className="bg-zinc-900 rounded-[20px] overflow-hidden"><img src={w.img} className="h-32 w-full object-cover"/><div className="p-2"><p className="text-xs font-bold">{w.flag} {w.city}</p></div></div>))}</div></div>}
      {tab==='nearby' && (isPremium? <div className="max-w-md mx-auto p-4"><h2 className="font-black">Near Me • Arua</h2></div> : <PremiumWall />)}
      {tab==='chat' && (isPremium? <div className="max-w-md mx-auto p-4"><h2 className="font-black">Chat</h2></div> : <PremiumWall />)}
      {tab==='liked' && (isPremium? <div className="max-w-md mx-auto p-4"><h2 className="font-black">Liked — Standalone</h2></div> : <PremiumWall />)}
      {tab==='profile' && <div className="max-w-md mx-auto p-4"><h2 className="font-black">Profile — {user?.email || form.email}</h2><div className="mt-4 bg-zinc-900 rounded-[24px] p-5"><p className="text-xs">Name: {form.name} • Gender: {form.gender} • Age: {form.age}</p><p className="text-xs mt-2">Interests: {form.interests}</p><p className="text-xs mt-2">Bio: {form.bio}</p></div></div>}
      {tab==='premium' && <div className="max-w-md mx-auto p-4 space-y-4"><h2 className="font-black">Premium</h2><div className="bg-[#FFC300] text-black rounded-2xl p-4"><button onClick={openCrypto} className="w-full bg-black text-white rounded-full py-3 font-bold text-xs mt-2">Crypto ALONE $2.99 / $5.99</button></div><div className="bg-zinc-900 rounded-2xl p-4"><button onClick={()=>openPesapal('basic')} className="w-full bg-[#FF6A00] text-white rounded-full py-3 font-bold text-xs mt-2">Pesapal ALONE</button></div></div>}
      <div className="max-w-md mx-auto p-4 mt-6 border-t border-white/10 flex gap-4 text-[10px] text-white/50">{['privacy','safety','terms','guidelines'].map(p=>(<button key={p} onClick={()=>handleTab(p)} className="underline">{p}</button>))}<span className="ml-auto">© KLA-MEET</span></div>
      <nav className="fixed bottom-0 left-0 right-0 bg-black border-t border-white/10 flex justify-around py-3"><button onClick={()=>handleTab('discover')} className="text-[11px]">♡ Discover</button><button onClick={()=>handleTab('nearby')} className="text-[11px]">◎ Near Me</button><button onClick={()=>handleTab('chat')} className="text-[11px]">💬 Chat</button><button onClick={()=>handleTab('premium')} className="text-[11px]">★ Premium</button></nav>
    </div>
  )
}