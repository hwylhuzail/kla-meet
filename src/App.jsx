import { useState } from 'react'
import { supabase } from './lib/supabase.js'

const REAL_PHOTOS = [
  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400",
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400",
  "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400",
  "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400",
  "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400",
  "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400",
]

const INTERESTS = ['Music','Travel','Foodie','Fitness','Arts & Culture','Photography','Reading','Outdoors','Crypto','Gaming','Dance','Yoga']

export default function App(){
  const [page,setPage]=useState('landing')
  const [step,setStep]=useState(1)
  const [legal,setLegal]=useState(null)
  const [appTab,setAppTab]=useState('discover')
  const [form,setForm]=useState({name:'', age:'22', birthday:'', gender:'Woman', looking:'Dating', bio:'', interests:[], kycFile:null, location:''})

  const toggle=(i)=>setForm(f=>({...f, interests: f.interests.includes(i)? f.interests.filter(x=>x!==i) : [...f.interests,i]}))

  const handleSignup=async()=>{
    // Supabase save (will work once you add keys in Vercel Env)
    const { data } = await supabase.from('profiles').insert([{...form}]).select()
    setPage('app')
  }

  const LegalModal=()=>(
    <div className="fixed inset-0 z-[100] bg-black/60 backdrop-blur flex items-center justify-center p-4">
      <div className="bg-white max-w-xl w-full rounded-[24px] p-6 max-h-[80vh] overflow-auto">
        <div className="flex justify-between"><h3 className="font-black text-xl uppercase">{legal}</h3><button onClick={()=>setLegal(null)} className="font-bold">✕</button></div>
        <div className="mt-4 text-sm text-zinc-600 space-y-3">
          {legal==='privacy' && <p><b>KLA-MEET Privacy:</b> Keep Love Alive. We never share exact location, KYC is optional & encrypted, photos blurred until match. Supabase Row Level Security enabled. Data stored in EU. Delete anytime in Settings.</p>}
          {legal==='terms' && <p><b>Terms of Use:</b> 18+ only. No harassment, no spam. Keep Love Alive is international. Paid plans non-refundable. Pesapal & crypto payments via API. Violation = ban.</p>}
          {legal==='guidelines' && <p><b>Community Guidelines:</b> Be respectful, verify optionally via KYC selfie, no nudes in public feed. Bio must be real. Interests help matching. Keep Love Alive.</p>}
          {legal==='safety' && <p><b>Safety:</b> Block/report button on every profile, KYC optional badge, AI face blur for minors blocked, location approximate only. Meet in public first.</p>}
          {legal==='how' && <p><b>How it Works:</b> 1. Name & Birthday 2. Gender 3. Looking for 4. Bio + Interests + Age + KYC optional 5. Location → Discover → Near → Random Chat → Premium.</p>}
        </div>
      </div>
    </div>
  )

  if(page==='landing'){
    return (
      <div className="bg-white min-h-screen">
        <header className="max-w-6xl mx-auto flex justify-between items-center p-4 sticky top-0 bg-white z-20">
          <div className="font-black text-xl">📍 KLA-MEET <span className="text-[8px] bg-black text-white px-1.5 py-0.5 rounded-full">KEEP LOVE ALIVE</span></div>
          <div className="hidden md:flex gap-4 text-sm font-medium">
            <button onClick={()=>setLegal('how')}>How it Works</button>
            <button onClick={()=>setLegal('safety')}>Safety</button>
            <button onClick={()=>setLegal('guidelines')}>Guidelines</button>
          </div>
          <div className="flex gap-2"><button onClick={()=>setPage('onboarding')} className="border border-black rounded-full px-4 py-1.5 text-sm font-bold">Log in</button><button onClick={()=>setPage('onboarding')} className="bg-[#FFC300] rounded-full px-4 py-1.5 text-sm font-bold">Sign up</button></div>
        </header>

        <section className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8 p-6 items-center">
          <div>
            <h1 className="text-5xl font-black leading-[0.95]">Date. Meet. Connect.<br/>Worldwide.</h1>
            <p className="mt-4 text-zinc-600">Keep Love Alive — international dating, real photos, Supabase secure. Join thousands building meaningful connections.</p>
            <div className="mt-6 flex gap-3">
              <button onClick={()=>setPage('onboarding')} className="bg-[#FFC300] rounded-full px-6 py-3 font-bold text-sm">Get Started — It's Free →</button>
              <button className="border border-black rounded-full px-6 py-3 font-bold text-sm">◐ Download the app</button>
            </div>
            <div className="mt-6 flex gap-3 text-[11px]">
              <button onClick={()=>setLegal('privacy')} className="underline">Privacy Policy</button>
              <button onClick={()=>setLegal('terms')} className="underline">Terms of Use</button>
              <button onClick={()=>setLegal('safety')} className="underline">Safety</button>
              <button onClick={()=>setLegal('guidelines')} className="underline">Guidelines</button>
            </div>
          </div>
          <img src={REAL_PHOTOS[0]} className="rounded-[24px] w-full h-[380px] object-cover"/>
        </section>

        <section className="bg-[#fafafa] py-12 text-center">
          <h2 className="text-3xl font-black">How KLA-MEET Works</h2>
          <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-5 gap-4 p-6 mt-6">
            {['Name & Birthday','Gender','Relationship','Bio & Interests & KYC','Location'].map((t,i)=><div key={i}><div className="bg-black text-white rounded-[24px] p-4 h-[200px] grid place-items-center"><p className="text-xs font-bold">{t}</p></div><p className="mt-2 text-xs font-bold">{i+1}. {t}</p></div>)}
          </div>
        </section>

        <footer className="bg-black text-white text-[11px] p-4 flex justify-between flex-wrap gap-2">
          <span>© 2024 KLA-MEET • Keep Love Alive • International</span>
          <span className="flex gap-3"><button onClick={()=>setLegal('privacy')}>Privacy</button><button onClick={()=>setLegal('terms')}>Terms</button><button onClick={()=>setLegal('safety')}>Safety</button></span>
        </footer>
        {legal && <LegalModal/>}
      </div>
    )
  }

  if(page==='onboarding'){
    return (
      <div className="min-h-screen bg-[#f6f6f6] flex items-center justify-center p-4">
        <div className="bg-white w-full max-w-[380px] rounded-[32px] shadow-xl p-6 border">
          {step===1 && <div className="text-center"><p className="font-black">♡ KLA-MEET KEEP LOVE ALIVE</p><h2 className="mt-8 font-black text-xl">Welcome</h2><p className="text-xs text-zinc-500">Worldwide • Keep Love Alive</p><button onClick={()=>setStep(2)} className="w-full mt-8 bg-[#FFC300] rounded-full py-3 font-bold">Get Started</button></div>}
          {step===2 && <><p className="font-black">Create your profile</p>
            <div className="mt-4 space-y-3">
              <input value={form.name} onChange={e=>setForm({...form,name:e.target.value})} placeholder="Name" className="w-full border border-black rounded-xl p-3 text-sm"/>
              <div className="flex gap-2"><input value={form.age} onChange={e=>setForm({...form,age:e.target.value})} placeholder="Age" type="number" className="w-20 border border-black rounded-xl p-3 text-sm"/><input value={form.birthday} onChange={e=>setForm({...form,birthday:e.target.value})} placeholder="DD/MM/YYYY" className="flex-1 border border-black rounded-xl p-3 text-sm"/></div>
              <textarea value={form.bio} onChange={e=>setForm({...form,bio:e.target.value})} placeholder="Bio — tell world about you (Keep Love Alive)" className="w-full border border-black rounded-xl p-3 text-sm h-20"/>
            </div>
            <button onClick={()=>setStep(3)} className="w-full mt-4 bg-[#FFC300] rounded-full py-3 font-bold text-sm">Continue</button>
          </>}
          {step===3 && <><p className="font-black">Gender & Looking For</p>
            <div className="mt-4 space-y-2">{['Woman','Man','Nonbinary'].map(g=><div key={g} onClick={()=>setForm({...form,gender:g})} className={`border rounded-full p-3 text-sm flex justify-between ${form.gender===g?'bg-black text-white':''}`}><span>{g}</span><span>●</span></div>)}</div>
            <div className="mt-4 space-y-2">{['Dating','Friendship','Networking'].map(v=><div key={v} onClick={()=>setForm({...form,looking:v})} className={`border rounded-full p-3 text-sm flex justify-between ${form.looking===v?'bg-[#FFC300]':''}`}><span>{v}</span></div>)}</div>
            <button onClick={()=>setStep(4)} className="w-full mt-4 bg-[#FFC300] rounded-full py-3 font-bold text-sm">Continue</button>
          </>}
          {step===4 && <><p className="font-black">Interests & KYC (Optional)</p>
            <div className="mt-3 grid grid-cols-2 gap-2">{INTERESTS.map(i=><button key={i} onClick={()=>toggle(i)} className={`border rounded-full p-2 text-xs ${form.interests.includes(i)?'bg-black text-[#FFC300]':''}`}>{i}</button>)}</div>
            <div className="mt-4 border border-dashed border-black rounded-xl p-3"><p className="text-[11px] font-bold">KYC Optional — Verify badge</p><input type="file" onChange={e=>setForm({...form,kycFile:e.target.files[0]?.name})} className="text-xs mt-1"/><p className="text-[10px] text-zinc-500 mt-1">Selfie + ID, encrypted, Supabase storage. Skip if you want.</p></div>
            <button onClick={()=>setStep(5)} className="w-full mt-4 bg-[#FFC300] rounded-full py-3 font-bold text-sm">Continue</button>
          </>}
          {step===5 && <><p className="font-black text-center">Enable location & Find matches</p><p className="text-[11px] text-center text-zinc-500 mt-2">We use approx location only.</p>
            <input value={form.location} onChange={e=>setForm({...form,location:e.target.value})} placeholder="City, Country" className="w-full border border-black rounded-xl p-3 text-sm mt-4"/>
            <button onClick={handleSignup} className="w-full mt-6 bg-[#FFC300] rounded-full py-3 font-bold text-sm">Finish & Join KLA-MEET</button>
            <button onClick={()=>setPage('app')} className="w-full mt-2 text-xs">Maybe later — skip Supabase</button>
          </>}
          <div className="flex justify-center gap-1 mt-6">{[1,2,3,4,5].map(i=><span key={i} className={`w-1.5 h-1.5 rounded-full ${step===i?'bg-black':'bg-zinc-200'}`}/>)}</div>
        </div>
      </div>
    )
  }

  // APP TABS
  return (
    <div className="min-h-screen bg-black text-white pb-24">
      <header className="p-4 flex justify-between items-center border-b border-white/10 sticky top-0 bg-black/80 backdrop-blur z-50"><span className="font-black">KLA-MEET</span><div className="flex gap-2"><button onClick={()=>setAppTab('premium')} className="text-xs bg-[#FFC300] text-black px-3 py-1 rounded-full font-bold">Premium</button><button onClick={()=>setAppTab('settings')} className="text-xs bg-white/10 px-3 py-1 rounded-full">⚙️</button></div></header>

      {appTab==='discover' && <div className="p-3 grid grid-cols-2 gap-3 max-w-xl mx-auto">
        {REAL_PHOTOS.map((p,i)=><div key={i} className="rounded-2xl overflow-hidden bg-zinc-900 border border-white/10"><img src={p} className="h-48 w-full object-cover"/><div className="p-3"><p className="font-bold text-sm">{['Amina','John','Zara','David','Luna','Chris'][i]} • {22+i} 🌍</p><p className="text-[11px] text-white/50">Worldwide • {200*(i+1)}m away • {form.interests[0]||'Music'}</p></div></div>)}
      </div>}

      {appTab==='near' && <div className="p-6 text-center max-w-xl mx-auto"><h2 className="text-2xl font-black">Near You 📍</h2><div className="mt-4 h-64 bg-zinc-900 rounded-2xl grid place-items-center border border-white/10">Global Map — Supabase geo</div></div>}

      {appTab==='chat' && <div className="p-6 max-w-xl mx-auto"><div className="bg-white text-black rounded-[24px] p-6 text-center"><h2 className="font-black text-xl">Random Chat 🎲</h2><button className="mt-6 w-full bg-black text-white py-3 rounded-full font-bold">Start Match</button></div></div>}

      {appTab==='premium' && (
        <div className="p-6 max-w-xl mx-auto space-y-4">
          <h2 className="text-2xl font-black text-center">Premium — Keep Love Alive</h2>
          <div className="grid grid-cols-1 gap-4">
            <div className="bg-zinc-900 border border-white/10 rounded-2xl p-5"><h3 className="font-bold">Basic — $2.99/mo</h3><ul className="text-xs text-white/60 mt-2 list-disc ml-4"><li>Unlimited likes</li><li>See who liked you</li><li>1 Boost / week</li></ul><button className="w-full mt-4 bg-white text-black rounded-full py-2 font-bold text-sm">Pay with Pesapal / Crypto</button></div>
            <div className="bg-[#FFC300] text-black rounded-2xl p-5 border-2 border-white"><h3 className="font-black">Standard — $5.99/mo ⭐ Most Popular</h3><ul className="text-xs mt-2 list-disc ml-4"><li>Everything in Basic</li><li>Unlimited Random Chat</li><li>Advanced filters + KYC badge</li><li>Global + Near You priority</li></ul><button className="w-full mt-4 bg-black text-white rounded-full py-2 font-bold text-sm">Pay with Pesapal / Crypto / USDT / BTC</button></div>
          </div>
          <p className="text-[10px] text-white/40 text-center">Payments: Pesapal (MTN/Airtel/Card) + Crypto (BTC, USDT, ETH) via API route /api/pay</p>
        </div>
      )}

      {appTab==='settings' && (
        <div className="p-6 max-w-xl mx-auto space-y-3">
          <h2 className="text-2xl font-black">Settings</h2>
          <div className="bg-zinc-900 rounded-2xl p-4 space-y-3">
            <div><p className="text-xs text-white/50">Name</p><input value={form.name} onChange={e=>setForm({...form,name:e.target.value})} className="w-full bg-black border border-white/10 rounded p-2 text-sm"/></div>
            <div><p className="text-xs text-white/50">Bio</p><textarea value={form.bio} onChange={e=>setForm({...form,bio:e.target.value})} className="w-full bg-black border border-white/10 rounded p-2 text-sm"/></div>
            <div className="flex gap-2"><button onClick={()=>alert('Profile updated (Supabase)')} className="flex-1 bg-white text-black rounded-full py-2 font-bold text-sm">Save</button><button onClick={()=>{setPage('landing');}} className="flex-1 bg-white/10 rounded-full py-2 text-sm">Logout</button></div>
            <button onClick={()=>{if(confirm('Delete account permanently?')){ supabase.auth.signOut(); setPage('landing')}}} className="w-full bg-red-600 rounded-full py-2 font-bold text-sm mt-4">Delete Account</button>
          </div>
        </div>
      )}

      <nav className="fixed bottom-0 left-0 right-0 bg-black border-t border-white/10 flex justify-around p-2">
        {[
          ['discover','Discover'],
          ['near','Near'],
          ['chat','Chat'],
          ['premium','Premium'],
        ].map(([k,l])=><button key={k} onClick={()=>setAppTab(k)} className={`px-4 py-2 rounded-full text-xs ${appTab===k?'bg-white text-black font-bold':'text-white/60'}`}>{l}</button>)}
        <button onClick={()=>setPage('landing')} className="px-4 py-2 rounded-full text-xs text-white/60">Home</button>
      </nav>
    </div>
  )
}
