import { useState } from 'react'
const OXA = "https://pay.oxapay.com/18802533"

const WORLD_USERS = [
  {name:'Amina', age:24, city:'Paris', country:'🇫🇷 France', img:'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400'},
  {name:'Kenji', age:27, city:'Tokyo', country:'🇯🇵 Japan', img:'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400'},
  {name:'Sofia', age:22, city:'New York', country:'🇺🇸 USA', img:'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400'},
  {name:'Liam', age:26, city:'London', country:'🇬🇧 UK', img:'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400'},
  {name:'Chloe', age:23, city:'Sydney', country:'🇦🇺 Australia', img:'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400'},
  {name:'Diego', age:28, city:'Rio', country:'🇧🇷 Brazil', img:'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400'},
]

export default function App(){
  const [view,setView]=useState('landing')
  const [onStep,setOnStep]=useState(1)
  const [tab,setTab]=useState('discover')
  const [profile,setProfile]=useState({
    name:'', birthday:'', gender:'Woman',
    looking:'Date', // Date or Friendship - TWO OPTIONS
    intent:'', // long-term, casual, friendship
    interests:[], bio:''
  })

  const Pay = ({plan})=>{
    const price = plan==='basic'?'2.99':'5.99'
    return (
      <div className="space-y-2 mt-3">
        <button onClick={()=>window.open(OXA,'_blank')} className="w-full bg-white text-black rounded-full py-3 font-bold text-xs">⚡ Pay ${price} OXA LIGHT 18802533</button>
        <button onClick={async()=>{
          const r=await fetch('/api/pesapal',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({plan})})
          const j=await r.json(); if(j.redirect_url) window.open(j.redirect_url,'_blank')
        }} className="w-full bg-[#FF6A00] text-white rounded-full py-3 font-bold text-xs">Pay ${price} Pesapal</button>
      </div>
    )
  }

  if(view==='landing'){
    return (
      <div className="min-h-screen bg-white text-black">
        <header className="bg-black text-white px-4 py-3 flex justify-between items-center sticky top-0 z-50">
          <h1 className="font-black text-[18px]">KLA-MEET • Keep Love Alive</h1>
          <div className="flex gap-3 text-xs items-center">
            <button onClick={()=>{setView('onboarding'); setOnStep(1)}} className="bg-[#FFC300] text-black px-4 py-2 rounded-full font-bold">Get Started — It's Free →</button>
          </div>
        </header>
        <section className="px-6 py-10 max-w-[1200px] mx-auto grid md:grid-cols-2 gap-6 items-center">
          <div>
            <h2 className="text-[42px] font-black leading-[0.9]">Date. Meet.<br/>Connect.<br/>Worldwide.</h2>
            <p className="text-[13px] text-zinc-600 mt-3">Keep Love Alive — Real people from Paris to Tokyo to New York.</p>
            <button onClick={()=>{setView('onboarding'); setOnStep(1)}} className="bg-[#FFC300] px-6 py-3 rounded-full font-bold text-sm mt-6">Get Started — It's Free →</button>
            <p className="text-[11px] mt-3">✓ Verified • 🌍 World locations • 24/7 Safety</p>
          </div>
          <div className="grid grid-cols-3 gap-2">
            {WORLD_USERS.slice(0,3).map(u=><img key={u.city} src={u.img} className="rounded-xl h-32 w-full object-cover"/>)}
          </div>
        </section>
      </div>
    )
  }

  if(view==='onboarding'){
    if(onStep===1) return (
      <div className="min-h-screen bg-white flex items-center justify-center p-6">
        <div className="w-[360px] rounded-[28px] shadow-2xl border p-6 text-center">
          <h2 className="font-black">KLA-MEET • Keep Love Alive</h2>
          <h3 className="font-black text-xl mt-6">Welcome to KLA-MEET</h3>
          <button onClick={()=>setOnStep(2)} className="w-full bg-[#FFC300] rounded-full py-3 font-bold mt-8">Get Started →</button>
        </div>
      </div>
    )
    if(onStep===2) return (
      <div className="min-h-screen bg-white flex items-center justify-center p-6">
        <div className="w-[360px] rounded-[28px] shadow-2xl border p-6">
          <h3 className="font-black text-center">Create your profile</h3>
          <input value={profile.name} onChange={e=>setProfile({...profile,name:e.target.value})} placeholder="Name" className="w-full border border-black rounded-xl px-4 py-3 mt-4 text-sm"/>
          <input value={profile.birthday} onChange={e=>setProfile({...profile,birthday:e.target.value})} placeholder="Birthday DD/MM/YYYY" className="w-full border border-black rounded-xl px-4 py-3 mt-2 text-sm"/>
          {/* TWO OPTIONS UNDER PROFILE CREATION */}
          <p className="text-[11px] font-bold mt-4">I am looking for:</p>
          <div className="grid grid-cols-2 gap-2 mt-2">
            {['Date','Friendship'].map(t=>(
              <button key={t} onClick={()=>setProfile({...profile,looking:t})} className={`border rounded-xl py-3 font-bold text-sm ${profile.looking===t?'bg-black text-white border-black':'bg-white border-black'}`}>{t==='Date'?'💛 Date':'🤝 Friendship'}</button>
            ))}
          </div>
          {profile.looking==='Date' && (
            <div className="grid grid-cols-2 gap-2 mt-2">
              {['Long-term','Casual dating','Serious'].map(i=><button key={i} onClick={()=>setProfile({...profile,intent:i})} className={`border rounded-xl py-2 text-[11px] ${profile.intent===i?'bg-[#FFC300]':''}`}>{i}</button>)}
            </div>
          )}
          {profile.looking==='Friendship' && (
            <div className="grid grid-cols-2 gap-2 mt-2">
              {['Travel buddy','Chat friend','Networking'].map(i=><button key={i} onClick={()=>setProfile({...profile,intent:i})} className={`border rounded-xl py-2 text-[11px] ${profile.intent===i?'bg-[#FFC300]':''}`}>{i}</button>)}
            </div>
          )}
          <button onClick={()=>setOnStep(3)} className="w-full bg-[#FFC300] rounded-full py-3 font-bold mt-4">Continue</button>
        </div>
      </div>
    )
    if(onStep===3) return (
      <div className="min-h-screen bg-white flex items-center justify-center p-6">
        <div className="w-[360px] rounded-[28px] shadow-2xl border p-6">
          <h3 className="font-black">Gender & Bio</h3>
          <div className="grid grid-cols-3 gap-2 mt-3">
            {['Woman','Man','Nonbinary'].map(g=><button key={g} onClick={()=>setProfile({...profile,gender:g})} className={`border rounded-xl py-2 text-xs ${profile.gender===g?'bg-black text-white':''}`}>{g}</button>)}
          </div>
          <textarea value={profile.bio} onChange={e=>setProfile({...profile,bio:e.target.value})} placeholder="Write your bio... What makes you interesting? Keep Love Alive vibe..." className="w-full border border-black rounded-xl px-4 py-3 mt-3 text-sm h-24" maxLength={150}/>
          <p className="text-[10px] text-zinc-500 text-right">{profile.bio.length}/150</p>
          <button onClick={()=>setOnStep(4)} className="w-full bg-[#FFC300] rounded-full py-3 font-bold mt-3">Continue</button>
        </div>
      </div>
    )
    if(onStep===4) return (
      <div className="min-h-screen bg-white flex items-center justify-center p-6">
        <div className="w-[360px] rounded-[28px] shadow-2xl border p-6">
          <h3 className="font-black">What are you into?</h3>
          <div className="grid grid-cols-2 gap-2 mt-4">
            {['Music','Travel','Foodie','Fitness','Arts','Photography','Reading','Outdoors'].map(o=>(
              <button key={o} onClick={()=>setProfile(s=>({...s,interests:s.interests.includes(o)?s.interests.filter(x=>x!==o):[...s.interests,o]}))} className={`border rounded-xl py-2 text-xs font-bold ${profile.interests.includes(o)?'bg-[#FFC300]':''}`}>{o}</button>
            ))}
          </div>
          <button onClick={()=>setOnStep(5)} className="w-full bg-[#FFC300] rounded-full py-3 font-bold mt-4">Continue</button>
        </div>
      </div>
    )
    if(onStep===5) return (
      <div className="min-h-screen bg-white flex items-center justify-center p-6">
        <div className="w-[360px] rounded-[28px] shadow-2xl border p-6 text-center">
          <h3 className="font-black">Enable location & Find matches near you</h3>
          <p className="text-[11px] text-zinc-500 mt-2">Show worldwide or nearby</p>
          <button onClick={()=>setView('app')} className="w-full bg-[#FFC300] rounded-full py-3 font-bold mt-6">Allow Location</button>
          <button onClick={()=>setView('app')} className="text-xs mt-2">Maybe later — See worldwide</button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white pb-24">
      <header className="sticky top-0 bg-black border-b border-white/10 p-3 flex justify-between z-50">
        <h1 className="font-black text-sm">KLA-MEET • Keep Love Alive • {profile.name} • {profile.looking}</h1>
        <button onClick={()=>setView('landing')} className="text-[10px] bg-zinc-800 px-3 py-1 rounded-full">Landing</button>
      </header>

      {tab==='discover' && (
        <div className="max-w-md mx-auto p-4">
          <h2 className="font-black text-lg">Discover • Worldwide Locations</h2>
          <p className="text-[11px] text-white/50">{profile.looking} • {profile.intent} • {profile.bio}</p>
          <div className="grid grid-cols-2 gap-3 mt-4">
            {WORLD_USERS.map(u=>(
              <div key={u.city} className="bg-zinc-900 rounded-[20px] overflow-hidden border border-white/10">
                <img src={u.img} className="h-40 w-full object-cover" onError={e=>e.target.src='https://randomuser.me/api/portraits/women/44.jpg'}/>
                <div className="p-3">
                  <p className="font-bold text-xs">{u.name}, 24 • {u.city}</p>
                  <p className="text-[10px] text-white/60">{u.country} • {u.city!== 'Bushenyi'? 'Worldwide' : ''}</p>
                  <p className="text-[9px] bg-[#FFC300] text-black inline-block px-2 py-0.5 rounded-full mt-1">{u.city} • Keep Love Alive</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {tab==='near' && (
        <div className="max-w-md mx-auto p-4">
          <h2 className="font-black">📍 Near & Worldwide</h2>
          <div className="mt-4 grid gap-2">
            {WORLD_USERS.map(u=><div key={u.city} className="bg-zinc-900 p-3 rounded-xl flex gap-3"><img src={u.img} className="w-12 h-12 rounded-full object-cover"/><div><p className="text-sm font-bold">{u.name} • {u.city} • {u.country}</p><p className="text-[11px] text-white/50">Looking for {['Date','Friendship'][Math.floor(Math.random()*2)]} • 2.3km or worldwide</p></div></div>)}
          </div>
        </div>
      )}

      {tab==='chat' && (
        <div className="max-w-md mx-auto p-4"><h2 className="font-black">Chat • Keep Love Alive</h2><div className="mt-4 bg-zinc-900 p-3 rounded-xl"><p className="text-xs">Bio: {profile.bio||'No bio yet'}</p><p className="text-[11px] text-white/50 mt-1">Looking for: {profile.looking} — {profile.intent}</p></div></div>
      )}

      {tab==='settings' && (
        <div className="max-w-md mx-auto p-4 space-y-3">
          <h2 className="font-black">Settings • Profile</h2>
          <div className="bg-zinc-900 rounded-2xl p-4">
            <p className="font-bold text-sm">{profile.name} • {profile.gender} • {profile.looking}</p>
            <p className="text-[11px] text-white/60 mt-1">Intent: {profile.intent}</p>
            <p className="text-xs mt-2 bg-black p-2 rounded">"{profile.bio}"</p>
            <p className="text-[10px] mt-2 text-white/40">Two options: Date / Friendship — editable anytime</p>
          </div>
          <div className="bg-[#FFC300] text-black rounded-2xl p-4"><p className="font-black text-sm">Premium — Keep Love Alive</p><Pay plan="basic"/><Pay plan="standard"/></div>
        </div>
      )}

      <nav className="fixed bottom-0 left-0 right-0 bg-black border-t border-white/10 flex justify-around py-3">
        <button onClick={()=>setTab('discover')} className={`text-[11px] ${tab==='discover'?'text-[#FFC300] font-black':''}`}>♡ Discover</button>
        <button onClick={()=>setTab('near')} className={`text-[11px] ${tab==='near'?'text-[#FFC300] font-black':''}`}>📍 Near</button>
        <button onClick={()=>setTab('chat')} className={`text-[11px] ${tab==='chat'?'text-[#FFC300] font-black':''}`}>💬 Chat</button>
        <button onClick={()=>setTab('settings')} className={`text-[11px] ${tab==='settings'?'text-[#FFC300] font-black':''}`}>⚙️ Settings</button>
      </nav>
    </div>
  )
}
