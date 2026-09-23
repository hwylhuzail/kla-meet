import { useState } from 'react'

export default function App(){
  const [page,setPage]=useState('landing') // landing, onboarding, app
  const [step,setStep]=useState(1)
  const [form,setForm]=useState({name:'',birthday:'',gender:'Woman',looking:'Dating',interests:[],location:''})
  const [appTab,setAppTab]=useState('discover')

  const toggleInterest=(i)=>{
    setForm(f=>({...f, interests: f.interests.includes(i)? f.interests.filter(x=>x!==i) : [...f.interests,i]}))
  }

  if(page==='landing'){
    return (
      <div className="bg-white min-h-screen">
        <header className="max-w-6xl mx-auto flex justify-between items-center p-4">
          <div className="flex items-center gap-2 font-black text-xl"><span className="bg-brand rounded-full p-1">📍</span>KLA-MEET</div>
          <div className="hidden md:flex gap-6 text-sm font-medium"><span>About</span><span>Safety</span><span>Community</span><span>Success Stories</span></div>
          <div className="flex gap-2"><button className="border border-black rounded-full px-4 py-1.5 text-sm font-bold">Log in</button><button onClick={()=>setPage('onboarding')} className="bg-brand rounded-full px-4 py-1.5 text-sm font-bold">Sign up</button></div>
        </header>

        <section className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8 p-6 items-center">
          <div>
            <h1 className="text-5xl font-black leading-[0.95]">Date. Meet. Connect.<br/>In Kampala.</h1>
            <p className="mt-4 text-zinc-600">The modern way for Kampala to meet real people, nearby. Join thousands of singles building meaningful relationships — safely, locally, authentically.</p>
            <div className="mt-6 flex gap-3">
              <button onClick={()=>setPage('onboarding')} className="bg-brand rounded-full px-6 py-3 font-bold text-sm">Get Started — It's Free →</button>
              <button className="border border-black rounded-full px-6 py-3 font-bold text-sm">◐ Download the app</button>
            </div>
            <p className="mt-4 text-[11px] text-zinc-500">✅ Verified profiles • Privacy-first • Made for Kampala, Uganda</p>
          </div>
          <div className="relative"><div className="absolute -z-10 top-10 right-10 w-32 h-32 bg-brand/50 rounded-full blur-2xl"/><img src="https://images.unsplash.com/photo-1522529599102-193c0d76b5b6?w=600" className="rounded-[24px] object-cover w-full h-[380px]"/><div className="absolute bottom-0 -left-4 w-24 h-24 bg-brand rounded-full blur-xl"/></div>
        </section>

        <section className="bg-[#fafafa] border-t py-12">
          <h2 className="text-center text-3xl font-black">How KLA-MEET Works</h2>
          <p className="text-center text-sm text-zinc-600 mt-1">Get started in 5 simple steps. Your profile, your way — set up in minutes.</p>
          <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-5 gap-6 p-6 mt-6">
            {[
              {s:'Step 1 of 5',t:'What should we call you?',n:'1. Name & Birthday'},
              {s:'Step 2 of 5',t:'Your gender',n:'2. Gender'},
              {s:'Step 3 of 5',t:'What are you looking for?',n:'3. Relationship'},
              {s:'Step 4 of 5',t:'Pick your interests',n:'4. Interests'},
              {s:'Step 5 of 5',t:'Where are you located?',n:'5. Location'},
            ].map((c,i)=>(
              <div key={i} className="text-center"><div className="bg-black rounded-[24px] text-white p-3 h-[300px] border-4 border-zinc-800"><p className="text-[10px] text-brand">{c.s}</p><p className="text-xs font-bold mt-3">{c.t}</p><div className="mt-4 space-y-2"><div className="bg-white text-black text-[10px] rounded p-1.5">Continue</div></div></div><p className="mt-2 text-xs font-bold">{c.n}</p></div>
            ))}
          </div>
        </section>

        <footer className="bg-black text-white text-[11px] p-3 flex justify-between"><span>Built with Next.js 14 • Fast • Secure • Local to Kampala</span><span>© 2024 KLA-MEET • Privacy • Terms • Help • Made in Kampala, Uganda</span></footer>
      </div>
    )
  }

  if(page==='onboarding'){
    return (
      <div className="min-h-screen bg-[#f6f6f6] flex items-center justify-center p-4">
        <div className="bg-white w-full max-w-[340px] rounded-[32px] shadow-xl p-6 border">
          {step===1 && (
            <><div className="text-center"><div className="font-black">♡ KLA-MEET</div><div className="mt-10 text-4xl">💬💛</div><h2 className="mt-6 font-black text-xl">Welcome to KLA-MEET</h2><p className="text-xs text-zinc-500">Date. Meet. Connect. Worldwide.</p><button onClick={()=>setStep(2)} className="w-full mt-8 bg-brand rounded-full py-3 font-bold text-sm">Get Started</button><div className="flex justify-center gap-1 mt-4"><span className="w-2 h-2 bg-brand rounded-full"/><span className="w-1.5 h-1.5 bg-zinc-200 rounded-full"/><span className="w-1.5 h-1.5 bg-zinc-200 rounded-full"/><span className="w-1.5 h-1.5 bg-zinc-200 rounded-full"/><span className="w-1.5 h-1.5 bg-zinc-200 rounded-full"/></div></div></>
          )}
          {step===2 && (
            <><p className="font-black text-center">Create your profile</p><p className="text-[11px] text-center text-zinc-500">Let's get to know you</p>
              <div className="mt-6 space-y-3"><div className="border border-black rounded-xl p-3"><p className="text-[11px] font-bold">Name</p><input value={form.name} onChange={e=>setForm({...form,name:e.target.value})} placeholder="Enter your name" className="w-full text-sm outline-none"/></div>
              <div className="border border-black rounded-xl p-3 flex justify-between"><div><p className="text-[11px] font-bold">Birthday</p><input value={form.birthday} onChange={e=>setForm({...form,birthday:e.target.value})} placeholder="DD / MM / YYYY" className="text-sm outline-none"/></div><span>📅</span></div></div>
              <button onClick={()=>setStep(3)} className="w-full mt-6 bg-brand rounded-full py-3 font-bold text-sm">Continue</button>
            </>
          )}
          {step===3 && (
            <><p className="font-black">Gender & Preferences</p><p className="text-[11px] text-zinc-500">You can update this anytime</p>
              <div className="mt-6 space-y-3">{['Woman','Man','Nonbinary'].map(g=><div key={g} onClick={()=>setForm({...form,gender:g})} className="border border-black rounded-full p-3 flex justify-between items-center cursor-pointer"><span className="flex gap-2 text-sm">👤 {g}</span><span className={`w-5 h-5 rounded-full border flex items-center justify-center ${form.gender===g?'bg-brand border-black':''}`}>{form.gender===g?'●':''}</span></div>)}</div>
              <button onClick={()=>setStep(4)} className="w-full mt-6 bg-brand rounded-full py-3 font-bold text-sm">Continue</button>
            </>
          )}
          {step===4 && (
            <><p className="font-black text-center">What are you into?</p><p className="text-[11px] text-center text-zinc-500">Select 3 or more interests to match better</p>
              <div className="mt-4 grid grid-cols-2 gap-2">{['Music','Travel','Foodie','Fitness','Arts & Culture','Photography','Reading','Outdoors'].map(i=><button key={i} onClick={()=>toggleInterest(i)} className={`border rounded-full px-3 py-2 text-xs font-bold text-left ${form.interests.includes(i)?'bg-black text-brand border-black':'border-black'}`}>{i}</button>)}</div>
              <button onClick={()=>setStep(5)} className="w-full mt-6 bg-brand rounded-full py-3 font-bold text-sm">Continue</button>
            </>
          )}
          {step===5 && (
            <><p className="font-black text-center leading-tight">Enable location &<br/>Find matches near you</p><div className="mt-4 flex justify-center text-5xl">🌍📍</div><p className="mt-4 text-[11px] text-center text-zinc-600">We use your location to show people near you. We'll never share your exact location.</p><button onClick={()=>{setPage('app'); setStep(1)}} className="w-full mt-6 bg-brand rounded-full py-3 font-bold text-sm">Allow Location</button><button onClick={()=>{setPage('app'); setStep(1)}} className="w-full mt-2 text-xs font-bold">Maybe later</button></>
          )}
          <div className="flex justify-center gap-1 mt-6">{[1,2,3,4,5].map(i=><span key={i} className={`w-1.5 h-1.5 rounded-full ${step===i?'bg-black':'bg-zinc-200'}`}/>)}</div>
        </div>
      </div>
    )
  }

  // MAIN APP - Discover / Near / Chat
  return (
    <div className="min-h-screen bg-black text-white pb-20">
      <header className="p-4 flex justify-between items-center border-b border-white/10 sticky top-0 bg-black/80 backdrop-blur z-50"><span className="font-black tracking-widest">KLA-MEET</span><span className="text-xs bg-white text-black px-2 py-1 rounded-full font-bold">{form.name||'Guest'}</span></header>
      {appTab==='discover' && <div className="p-4 grid grid-cols-2 gap-3 max-w-xl mx-auto">{[1,2,3,4,5,6].map(i=><div key={i} className="rounded-2xl overflow-hidden bg-zinc-900 border border-white/10"><div className="h-40 bg-gradient-to-br from-zinc-700 to-black"/><div className="p-3"><p className="font-bold text-sm">Amina {i} 🌍</p><p className="text-[11px] text-white/50">Kampala • {i*200}m away</p></div></div>)}</div>}
      {appTab==='near' && <div className="p-8 text-center max-w-xl mx-auto"><h2 className="text-2xl font-black">Near You 📍</h2><p className="text-white/50 text-sm mt-2">Using your location to find matches - API kept</p><div className="mt-6 h-64 bg-zinc-900 rounded-2xl grid place-items-center border border-white/10">Map View</div></div>}
      {appTab==='chat' && <div className="p-6 max-w-xl mx-auto"><div className="bg-white text-black rounded-[24px] p-6 text-center"><h2 className="font-black text-xl">Random Chat 🎲</h2><p className="text-sm opacity-60 mt-1">Connect instantly with someone new in Kampala</p><button className="mt-6 w-full bg-black text-white py-3 rounded-full font-bold">Start Random Match</button></div></div>}
      <nav className="fixed bottom-0 left-0 right-0 bg-black border-t border-white/10 flex justify-around p-2">
        {['discover','near','chat'].map(t=><button key={t} onClick={()=>setAppTab(t)} className={`px-5 py-2 rounded-full text-sm capitalize ${appTab===t?'bg-white text-black font-bold':'text-white/60'}`}>{t}</button>)}
        <button onClick={()=>setPage('landing')} className="px-5 py-2 rounded-full text-sm text-white/60">Home</button>
      </nav>
    </div>
  )
}
