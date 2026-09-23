import { useState } from 'react'
const OXA = "https://pay.oxapay.com/18802533"

export default function App(){
  const [view,setView]=useState('landing') // landing, onboarding, app
  const [onStep,setOnStep]=useState(1)
  const [appTab,setAppTab]=useState('discover') // discover, near, chat, settings
  const [profile,setProfile]=useState({name:'', birthday:'', gender:'Woman', interests:[]})

  const Pay = ({plan})=>{
    const price = plan==='basic'?'2.99':'5.99'
    return (
      <div className="space-y-2 mt-3">
        <button onClick={()=>window.open(OXA,'_blank')} className="w-full bg-white text-black rounded-full py-3 font-bold text-xs">⚡ Pay ${price} OXA LIGHT 18802533</button>
        <button onClick={async()=>{
          const r=await fetch('/api/pesapal',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({plan})})
          const j=await r.json()
          if(j.redirect_url) window.open(j.redirect_url,'_blank'); else alert(j.error||'Add Pesapal keys')
        }} className="w-full bg-[#FF6A00] text-white rounded-full py-3 font-bold text-xs">Pay ${price} Pesapal MTN/Airtel/Card</button>
      </div>
    )
  }

  // LANDING - Keep Love Alive only, no Kampala
  if(view==='landing'){
    return (
      <div className="min-h-screen bg-white text-black">
        <header className="bg-black text-white px-4 py-3 flex justify-between items-center sticky top-0 z-50">
          <h1 className="font-black text-[20px]">KLA-MEET • <span className="text-[#FFC300]">Keep Love Alive</span></h1>
          <div className="flex gap-3 text-[12px] items-center">
            <span className="hidden md:flex gap-4">About Safety Community Success Stories</span>
            <button onClick={()=>{setView('onboarding'); setOnStep(1)}} className="font-bold">Log in</button>
            <button onClick={()=>{setView('onboarding'); setOnStep(1)}} className="bg-[#FFC300] text-black px-4 py-2 rounded-full font-bold">Sign up</button>
          </div>
        </header>

        <section className="px-6 py-10 max-w-[1200px] mx-auto grid md:grid-cols-2 gap-6 items-center">
          <div>
            <h2 className="text-[42px] font-black leading-[0.9]">Date. Meet.<br/>Connect.<br/>Worldwide.</h2>
            <p className="text-[13px] text-zinc-600 mt-3">Keep Love Alive — The modern way to meet real people, nearby or far. Safely, authentically.</p>
            <div className="flex gap-3 mt-6">
              <button onClick={()=>{setView('onboarding'); setOnStep(1)}} className="bg-[#FFC300] px-6 py-3 rounded-full font-bold text-sm">Get Started — It's Free →</button>
              <button onClick={()=>{setView('app'); setAppTab('discover')}} className="border border-black px-5 py-3 rounded-full font-bold text-sm">Enter App</button>
            </div>
            <p className="text-[11px] mt-4">✓ Verified profiles • Privacy-first • Keep Love Alive • 24/7 Safety</p>
          </div>
          <div className="relative">
            <div className="absolute top-8 left-8 w-[90%] h-[80%] bg-[#FFEAA0] rounded-[28px] -z-10"/>
            <div className="grid grid-cols-3 gap-2">
              <img src="https://randomuser.me/api/portraits/women/44.jpg" className="rounded-xl h-28 w-full object-cover"/>
              <img src="https://randomuser.me/api/portraits/men/32.jpg" className="rounded-xl h-28 w-full object-cover"/>
              <img src="https://randomuser.me/api/portraits/women/65.jpg" className="rounded-xl h-28 w-full object-cover"/>
            </div>
          </div>
        </section>

        <section className="bg-[#f7f7f6] px-6 py-8">
          <h3 className="text-center font-black text-xl">How KLA-MEET Works</h3>
          <p className="text-center text-[11px] text-zinc-500">Keep Love Alive in 5 steps</p>
          <div className="grid grid-cols-5 gap-2 mt-6 max-w-[900px] mx-auto">
            {[1,2,3,4,5].map(n=><div key={n} className="text-center"><div className="mx-auto w-full h-28 bg-white border-2 border-black rounded-xl flex items-center justify-center font-black">{n}</div><p className="text-[10px] font-bold mt-1">{n===1?'Profile':n===2?'Verify':n===3?'Discover':n===4?'Chat':'Meet'}</p></div>)}
          </div>
          <div className="text-center mt-6">
            <button onClick={()=>{setView('onboarding'); setOnStep(1)}} className="bg-black text-white px-6 py-3 rounded-full font-bold text-sm">Get Started Now → Works!</button>
          </div>
        </section>
      </div>
    )
  }

  // ONBOARDING - FIXED GET STARTED
  if(view==='onboarding'){
    if(onStep===1) return (
      <div className="min-h-screen bg-white flex items-center justify-center p-6">
        <div className="w-[340px] rounded-[28px] shadow-2xl border p-6 text-center">
          <h2 className="font-black">KLA-MEET • Keep Love Alive</h2>
          <div className="mt-6 text-4xl">💛</div>
          <h3 className="font-black text-xl mt-6">Welcome to KLA-MEET</h3>
          <button onClick={()=>setOnStep(2)} className="w-full bg-[#FFC300] rounded-full py-3 font-bold mt-8">Get Started →</button>
          <button onClick={()=>setView('landing')} className="text-[11px] mt-3 underline">Back to Landing</button>
        </div>
      </div>
    )
    if(onStep===2) return (
      <div className="min-h-screen bg-white flex items-center justify-center p-6">
        <div className="w-[340px] rounded-[28px] shadow-2xl border p-6">
          <button onClick={()=>setOnStep(1)}>←</button>
          <h3 className="font-black text-center mt-2">Create your profile</h3>
          <input value={profile.name} onChange={e=>setProfile({...profile,name:e.target.value})} placeholder="Name" className="w-full border border-black rounded-xl px-4 py-3 mt-4 text-sm"/>
          <input value={profile.birthday} onChange={e=>setProfile({...profile,birthday:e.target.value})} placeholder="Birthday DD/MM/YYYY" className="w-full border border-black rounded-xl px-4 py-3 mt-2 text-sm"/>
          <button onClick={()=>setOnStep(3)} className="w-full bg-[#FFC300] rounded-full py-3 font-bold mt-4">Continue</button>
        </div>
      </div>
    )
    if(onStep===3) return (
      <div className="min-h-screen bg-white flex items-center justify-center p-6">
        <div className="w-[340px] rounded-[28px] shadow-2xl border p-6">
          <h3 className="font-black">Gender & Preferences</h3>
          {['Woman','Man','Nonbinary'].map(g=><button key={g} onClick={()=>setProfile({...profile,gender:g})} className={`w-full mt-2 border rounded-xl px-4 py-3 text-sm flex justify-between ${profile.gender===g?'bg-[#FFC300] border-black':''}`}><span>{g}</span><span>{profile.gender===g?'●':'○'}</span></button>)}
          <button onClick={()=>setOnStep(4)} className="w-full bg-[#FFC300] rounded-full py-3 font-bold mt-4">Continue</button>
        </div>
      </div>
    )
    if(onStep===4) return (
      <div className="min-h-screen bg-white flex items-center justify-center p-6">
        <div className="w-[340px] rounded-[28px] shadow-2xl border p-6">
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
        <div className="w-[340px] rounded-[28px] shadow-2xl border p-6 text-center">
          <h3 className="font-black">Enable location & Find matches near you</h3>
          <p className="text-[11px] text-zinc-500 mt-2">Keep Love Alive uses location to show people near you.</p>
          <button onClick={()=>setView('app')} className="w-full bg-[#FFC300] rounded-full py-3 font-bold mt-6">Allow Location</button>
          <button onClick={()=>setView('app')} className="w-full text-xs mt-2">Maybe later</button>
        </div>
      </div>
    )
  }

  // APP - OLD LAYOUT RESTORED: Discover, Near, Chat, Settings, Location
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white pb-24">
      <header className="sticky top-0 bg-black border-b border-white/10 p-3 flex justify-between items-center z-50">
        <h1 className="font-black text-sm">KLA-MEET • Keep Love Alive • {profile.name||'Guest'}</h1>
        <button onClick={()=>setView('landing')} className="text-[10px] bg-zinc-800 px-3 py-1 rounded-full">Guest Landing</button>
      </header>

      {appTab==='discover' && (
        <div className="max-w-md mx-auto p-4">
          <h2 className="font-black text-lg">Discover</h2>
          <div className="grid grid-cols-2 gap-3 mt-4">
            {[21,22,23,24,25,26].map(i=>(
              <div key={i} className="bg-zinc-900 rounded-[20px] overflow-hidden border border-white/10">
                <img src={`https://randomuser.me/api/portraits/women/${i}.jpg`} className="h-40 w-full object-cover"/>
                <div className="p-3"><p className="font-bold text-xs">User {i}</p><p className="text-[10px] text-white/50">{profile.gender} • {profile.interests[0]||'Music'}</p></div>
              </div>
            ))}
          </div>
        </div>
      )}

      {appTab==='near' && (
        <div className="max-w-md mx-auto p-4">
          <h2 className="font-black text-lg">📍 Near You • Location</h2>
          <p className="text-[11px] text-white/50">Find Keep Love Alive members near you</p>
          <div className="mt-4 space-y-2">
            {[1,2,3].map(i=><div key={i} className="bg-zinc-900 p-3 rounded-xl flex gap-3"><img src={`https://randomuser.me/api/portraits/men/${20+i}.jpg`} className="w-12 h-12 rounded-full"/><div><p className="text-sm font-bold">Near User {i} • 1.{i}km away</p><p className="text-[11px] text-white/50">Location enabled • Keep Love Alive</p></div></div>)}
          </div>
        </div>
      )}

      {appTab==='chat' && (
        <div className="max-w-md mx-auto p-4">
          <h2 className="font-black text-lg">Chat</h2>
          <div className="mt-4 space-y-2">
            {[1,2].map(i=><div key={i} className="bg-zinc-900 p-3 rounded-xl"><p className="text-sm font-bold">Chat {i}</p><p className="text-[11px] text-white/50">Keep Love Alive message preview...</p></div>)}
          </div>
        </div>
      )}

      {appTab==='settings' && (
        <div className="max-w-md mx-auto p-4 space-y-3">
          <h2 className="font-black text-lg">Settings</h2>
          <div className="bg-zinc-900 rounded-2xl p-4 border border-white/10">
            <p className="font-bold text-sm">Profile: {profile.name} • {profile.gender}</p>
            <p className="text-[11px] text-white/50 mt-1">Birthday: {profile.birthday} • Interests: {profile.interests.join(', ')}</p>
          </div>
          <div className="bg-[#FFC300] text-black rounded-2xl p-4">
            <p className="font-black text-sm">Premium — Keep Love Alive</p>
            <Pay plan="basic"/>
            <div className="mt-4"><Pay plan="standard"/></div>
          </div>
          <div className="bg-zinc-900 rounded-2xl p-4">
            <p className="font-bold text-xs">Guidelines • Privacy • Safety • Policies</p>
            <p className="text-[11px] text-white/50 mt-1">18+ only, real photos, no scams. Supabase encrypted. Oxa 18802533 alive + Pesapal.</p>
          </div>
        </div>
      )}

      {/* OLD BOTTOM NAV RESTORED */}
      <nav className="fixed bottom-0 left-0 right-0 bg-black border-t border-white/10 flex justify-around py-3">
        <button onClick={()=>setAppTab('discover')} className={`flex flex-col items-center text-[11px] ${appTab==='discover'?'text-[#FFC300] font-black':''}`}><span>♡</span>Discover</button>
        <button onClick={()=>setAppTab('near')} className={`flex flex-col items-center text-[11px] ${appTab==='near'?'text-[#FFC300] font-black':''}`}><span>📍</span>Near</button>
        <button onClick={()=>setAppTab('chat')} className={`flex flex-col items-center text-[11px] ${appTab==='chat'?'text-[#FFC300] font-black':''}`}><span>💬</span>Chat</button>
        <button onClick={()=>setAppTab('settings')} className={`flex flex-col items-center text-[11px] ${appTab==='settings'?'text-[#FFC300] font-black':''}`}><span>⚙️</span>Settings</button>
      </nav>
    </div>
  )
}
