"use client";
import { useState } from "react";
const PROFILES = [
  { id:1, name:"Aisha", age:23, bio:"Makerere • Loves coffee", location:"Kololo", img:"https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=600" },
  { id:2, name:"Brian", age:26, bio:"Gym • Entrepreneur", location:"Kololo", img:"https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=600" },
  { id:3, name:"Vanessa", age:22, bio:"Model • Ntinda", location:"Ntinda", img:"https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=600" },
  { id:4, name:"Joshua", age:27, bio:"Dev • Football", location:"Kansanga", img:"https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=600" },
  { id:5, name:"Mercy", age:24, bio:"Bukoto • Music", location:"Bukoto", img:"https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=600" },
  { id:6, name:"Sharon", age:25, bio:"Kisaasi • Foodie", location:"Kisaasi", img:"https://images.unsplash.com/photo-1517841905240-472988babdf9?w=600" },
];
export default function App(){
  const [step,setStep] = useState<"login"|"swipe"|"match"|"chat">("login");
  const [idx,setIdx] = useState(0);
  const [matches,setMatches]=useState<any[]>([]);
  const [currentMatch,setCurrentMatch]=useState<any>(null);
  const [phone,setPhone]=useState("");
  const profile = PROFILES[idx % PROFILES.length];
  const like = () => {
    const isMatch = Math.random() > 0.4;
    if(isMatch){ setMatches(m=>[...m,profile]); setCurrentMatch(profile); setStep("match"); }
    else { setIdx(i=>i+1); }
  };
  const nope = () => setIdx(i=>i+1);

  if(step==="login"){
    return (
      <div className="entry-screen">
        <section className="entry-story"><div><h1 className="brand">KLA<span className="brand-mark">•</span></h1><p className="text-sm font-semibold mt-1">Meet someone worth meeting.</p></div><div className="entry-copy"><p className="eyebrow text-black/60">Made for Kampala</p><h2>Good people.<br/>Better dates.</h2><p>Make space for a connection that feels easy, genuine, and close to home.</p></div><div className="entry-collage"><img src={PROFILES[0].img} alt="KLA Meet member"/><img src={PROFILES[2].img} alt="KLA Meet member"/><img src={PROFILES[4].img} alt="KLA Meet member"/></div></section>
        <section className="entry-form"><div className="entry-form-card"><p className="eyebrow">Welcome in</p><h1 className="mt-2">Your next hello<br/>starts here.</h1><label className="form-label">Email or phone number</label><input value={phone} onChange={e=>setPhone(e.target.value)} placeholder="+256 700 000000" className="field" /><label className="form-label">Password</label><input placeholder="Enter your password" type="password" className="field mb-5" /><button onClick={()=>setStep("swipe")} className="primary-button w-full text-base">Continue</button><p className="text-[11px] text-center text-stone-500 mt-4">By continuing, you agree to our Terms and Privacy Policy.</p><div className="flex items-center gap-3 my-7 text-xs text-stone-400"><span className="h-px bg-[#ece9e2] flex-1"/>or<span className="h-px bg-[#ece9e2] flex-1"/></div><button onClick={()=>setStep("swipe")} className="w-full border border-[#ece9e2] rounded-[14px] p-3 font-bold hover:bg-white">Continue as a guest</button>
        </div></section>
      </div>
    )
  }
  if(step==="match"){
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center" style={{background:'#ffc629'}}>
        <p className="eyebrow text-black/60 mb-3">New connection</p><h1 className="display text-5xl font-bold mb-2">It&apos;s a match!</h1>
        <p className="text-black/70 mb-6">You and {currentMatch.name} liked each other</p>
        <img src={currentMatch.img} className="w-56 h-56 rounded-full object-cover border-[7px] border-white mb-8 shadow-2xl" />
        <div className="flex gap-4 w-full max-w-sm">
          <button onClick={()=>{setIdx(i=>i+1); setStep("swipe")}} className="flex-1 bg-white/80 py-4 rounded-xl font-bold">Keep swiping</button>
          <button onClick={()=>setStep("chat")} className="flex-1 bg-black text-white py-4 rounded-xl font-bold">Message</button>
        </div>
      </div>
    )
  }
  if(step==="chat"){
    const chatUser = currentMatch || matches[0] || PROFILES[0];
    return (
      <div className="min-h-screen flex flex-col bg-[#fffdf9]">
        <div className="p-4 border-b border-[#ece9e2] flex items-center gap-3">
          <button onClick={()=>setStep("swipe")} className="font-bold text-xl">←</button>
          <img src={chatUser.img} className="w-10 h-10 rounded-full object-cover" />
          <div><p className="font-bold">{chatUser.name}</p><p className="text-xs text-green-400">Online • {chatUser.location}</p></div>
        </div>
        <div className="flex-1 p-4 space-y-3 bg-[#f6f4ee]">
          <div className="bg-white border border-[#ece9e2] rounded-2xl rounded-bl-none p-3 max-w-[75%]">Hey! I saw you are from {chatUser.location} 😊</div>
          <div className="bg-[#ffc629] text-black rounded-2xl rounded-br-none p-3 max-w-[75%] ml-auto">Haha yes! Want to meet tomorrow?</div>
          <div className="bg-white border border-[#ece9e2] rounded-2xl rounded-bl-none p-3 max-w-[75%]">Sure! Cafe Javas Kololo 5pm?</div>
          {matches.length>0 && <div className="text-center text-xs text-zinc-500 pt-4">You have {matches.length} matches: {matches.map(m=>m.name).join(", ")}</div>}
        </div>
        <div className="p-3 border-t border-[#ece9e2] flex gap-2 bg-white">
          <input placeholder="Type a message..." className="field rounded-full" />
          <button className="bg-[#ffc629] text-black w-12 h-12 rounded-full font-black text-xl">↑</button>
        </div>
      </div>
    )
  }
  return (
    <div className="app-shell">
      <header className="topbar"><h1 className="brand">KLA<span className="brand-mark">•</span></h1>
        <button onClick={()=>setStep("chat")} className="icon-button" aria-label="Open matches">♡</button>
      </header>
      <main className="content"><div className="flex items-end justify-between mb-4"><div><p className="eyebrow">Discover</p><h2 className="display text-2xl font-bold mt-1">Your daily picks</h2></div><span className="text-xs text-stone-500">Kampala · 2 km</span></div>
        <div className="profile-card">
          <img src={profile.img} alt={profile.name} />
          <div className="profile-info"><h2>{profile.name}, {profile.age}</h2><p>{profile.location} · {profile.bio}</p><div className="chip-row"><span className="chip">Verified profile</span><span className="chip">2 km away</span></div>
            </div>
          </div>
        <div className="action-row"><button onClick={nope} className="round-action" aria-label="Pass">✕</button><button className="round-action" aria-label="Super like">★</button><button onClick={like} className="round-action primary" aria-label="Like">♥</button>
        </div>
        <p className="text-center text-xs text-stone-400 mt-3">You have {PROFILES.length - idx} profiles waiting for you</p>
      </main>
    </div>
  )
}
