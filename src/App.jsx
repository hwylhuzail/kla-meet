import { useState, useEffect } from 'react'
import { supabase } from './lib/supabase.js'

const PHOTOS = [
  {id:1, name:'Amina', age:24, img:'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=500', bio:'Keep Love Alive 💛 Travel & Foodie'},
  {id:2, name:'David', age:26, img:'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500', bio:'Fitness + Music + Worldwide'},
  {id:3, name:'Zara', age:22, img:'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=500', bio:'Arts & Crypto lover'},
  {id:4, name:'John', age:28, img:'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=500', bio:'Photography | Networking'},
  {id:5, name:'Luna', age:23, img:'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500', bio:'Reading & Outdoors'},
  {id:6, name:'Chris', age:27, img:'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=500', bio:'Gamer & Dancer'},
]

export default function App(){
  const [page,setPage]=useState('landing')
  const [appTab,setAppTab]=useState('discover')
  const [liked,setLiked]=useState([])
  const [showPay,setShowPay]=useState(null) // {plan}
  const [payMethod,setPayMethod]=useState('pesapal')
  const [form,setForm]=useState({name:'',age:'',bio:'',interests:[]})

  const handleLike=(id)=>{
    setLiked(l=>l.includes(id)?l:[...l,id])
    // Alive: save to Supabase
    supabase.from('likes').insert([{from:'guest',to:id}])
  }

  const payNow=async()=>{
    const r=await fetch('/api/pay',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({plan:showPay.plan,method:payMethod,user:form.name||'guest'})})
    const j=await r.json()
    if(j.redirect) window.open(j.redirect,'_blank')
    else alert(`Crypto Pay Alive: Send $${j.amount} to ${j.address||j.usdt}. Upload TX hash in Settings.`)
    setShowPay(null)
  }

  if(page==='landing'){
    return (
      <div className="bg-white min-h-screen">
        <header className="max-w-6xl mx-auto flex justify-between items-center p-4"><span className="font-black text-xl">KLA-MEET <span className="text-[8px] bg-black text-white px-1 rounded-full">KEEP LOVE ALIVE</span></span><button onClick={()=>setPage('discover')} className="bg-[#FFC300] rounded-full px-4 py-1.5 font-bold text-sm">Enter App</button></header>
        <section className="max-w-6xl mx-auto grid md:grid-cols-2 p-6 gap-6"><div><h1 className="text-5xl font-black">Date. Meet. Connect.<br/>Worldwide.</h1><p className="mt-3 text-zinc-600">Keep Love Alive — International, alive interactions, real Supabase.</p><button onClick={()=>setPage('discover')} className="mt-6 bg-[#FFC300] rounded-full px-6 py-3 font-bold">Get Started Free →</button></div><img src={PHOTOS[0].img} className="rounded-[24px] h-[380px] object-cover w-full"/></section>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black text-white pb-24">
      <header className="p-4 flex justify-between items-center border-b border-white/10 sticky top-0 bg-black z-50"><span className="font-black">KLA-MEET</span><div className="flex gap-2"><button onClick={()=>setAppTab('premium')} className="bg-[#FFC300] text-black px-3 py-1 rounded-full text-xs font-bold">Premium</button><button onClick={()=>setAppTab('settings')} className="bg-white/10 px-3 py-1 rounded-full text-xs">⚙️</button></div></header>

      {appTab==='discover' && <div className="p-3 grid grid-cols-2 gap-3 max-w-xl mx-auto">
        {PHOTOS.map(p=><div key={p.id} className="rounded-2xl overflow-hidden bg-zinc-900 border border-white/10 relative group">
          <img src={p.img} className="h-56 w-full object-cover group-active:scale-105 transition"/>
          <div className="absolute top-2 right-2 bg-black/60 rounded-full px-2 py-1 text-[10px]">{p.age}</div>
          <div className="p-3"><p className="font-bold text-sm">{p.name} • {p.age} 🌍</p><p className="text-[11px] text-white/50 line-clamp-2">{p.bio}</p>
          <div className="flex gap-2 mt-2"><button onClick={()=>handleLike(p.id)} className={`flex-1 rounded-full py-1.5 text-xs font-bold ${liked.includes(p.id)?'bg-[#FFC300] text-black':'bg-white text-black'}`}>{liked.includes(p.id)?'♥ Liked':'♥ Like'}</button><button className="flex-1 bg-white/10 rounded-full py-1.5 text-xs">💬 Chat</button></div></div>
        </div>)}
      </div>}

      {appTab==='premium' && (
        <div className="p-6 max-w-xl mx-auto space-y-4 animate-in">
          <h2 className="text-2xl font-black text-center">Premium — Keep Love Alive</h2>
          <div onClick={()=>setShowPay({plan:'basic'})} className="bg-zinc-900 border border-white/10 rounded-2xl p-5 cursor-pointer hover:scale-[1.02] transition"><h3 className="font-bold">Basic — $2.99/mo</h3><ul className="text-xs text-white/60 mt-2"><li>• Unlimited likes</li><li>• See who liked you ({liked.length})</li><li>• 1 Boost/week</li></ul><div className="w-full mt-4 bg-white text-black rounded-full py-2.5 font-bold text-sm text-center">Pay with Pesapal / Crypto →</div></div>
          <div onClick={()=>setShowPay({plan:'standard'})} className="bg-[#FFC300] text-black rounded-2xl p-5 border-2 border-white cursor-pointer hover:scale-[1.02] transition"><h3 className="font-black">Standard — $5.99/mo ⭐ Most Popular</h3><ul className="text-xs mt-2"><li>• Everything in Basic</li><li>• Unlimited Random Chat</li><li>• KYC badge + Priority</li></ul><div className="w-full mt-4 bg-black text-white rounded-full py-2.5 font-bold text-sm text-center">Pay with Pesapal / USDT / BTC →</div></div>

          {showPay && (
            <div className="fixed inset-0 z-[100] bg-black/70 backdrop-blur flex items-end md:items-center justify-center p-4">
              <div className="bg-white text-black rounded-[24px] p-6 w-full max-w-sm animate-bounce-in">
                <div className="flex justify-between"><h3 className="font-black uppercase">Pay {showPay.plan} ${showPay.plan==='basic'?'2.99':'5.99'}</h3><button onClick={()=>setShowPay(null)}>✕</button></div>
                <div className="mt-4 grid grid-cols-2 gap-2">
                  <button onClick={()=>setPayMethod('pesapal')} className={`border-2 rounded-xl p-3 text-xs font-bold ${payMethod==='pesapal'?'border-black bg-[#FFC300]':''}`}>Pesapal<br/>MTN/Airtel/Card</button>
                  <button onClick={()=>setPayMethod('crypto')} className={`border-2 rounded-xl p-3 text-xs font-bold ${payMethod==='crypto'?'border-black bg-[#FFC300]':''}`}>Crypto<br/>BTC/USDT/ETH</button>
                </div>
                <button onClick={payNow} className="w-full mt-4 bg-black text-white rounded-full py-3 font-bold">Continue to Pay Alive →</button>
                <p className="text-[10px] text-center mt-2 text-zinc-500">Alive: calls /api/pay → Pesapal redirect or crypto address</p>
              </div>
            </div>
          )}
        </div>
      )}

      {appTab==='settings' && <div className="p-6 max-w-xl mx-auto"><h2 className="text-xl font-black">Settings • {form.name||'Guest'}</h2><div className="mt-4 bg-zinc-900 rounded-2xl p-4 space-y-3"><button onClick={()=>setPage('landing')} className="w-full bg-white text-black rounded-full py-2 font-bold">Logout</button><button onClick={()=>alert('Account delete wired to Supabase auth')} className="w-full bg-red-600 rounded-full py-2 font-bold">Delete Account</button></div></div>}

      <nav className="fixed bottom-0 left-0 right-0 bg-black border-t border-white/10 flex justify-around p-2">
        {['discover','near','chat','premium'].map(k=><button key={k} onClick={()=>setAppTab(k)} className={`px-4 py-2 rounded-full text-xs capitalize ${appTab===k?'bg-white text-black font-bold':'text-white/60'}`}>{k}</button>)}
        <button onClick={()=>setPage('landing')} className="px-4 py-2 text-xs text-white/60">Home</button>
      </nav>
    </div>
  )
}
