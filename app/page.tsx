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
      <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-6">
        <h1 className="text-5xl font-black text-yellow-400">KLA MEET</h1>
        <p className="text-zinc-400 mb-8 mt-2">Find love in Kampala 💛</p>
        <div className="w-full max-w-sm bg-zinc-900 rounded-[24px] p-6 border border-zinc-800">
          <h2 className="font-bold text-xl mb-4">Welcome</h2>
          <input value={phone} onChange={e=>setPhone(e.target.value)} placeholder="+256 700 000000" className="w-full bg-black border border-zinc-700 rounded-xl p-4 mb-3" />
          <input placeholder="Password" type="password" className="w-full bg-black border border-zinc-700 rounded-xl p-4 mb-4" />
          <button onClick={()=>setStep("swipe")} className="w-full bg-yellow-400 text-black font-black py-4 rounded-xl text-lg">Login / Sign Up</button>
          <p className="text-[11px] text-zinc-500 mt-3 text-center">Kampala's #1 dating app</p>
        </div>
      </div>
    )
  }
  if(step==="match"){
    return (
      <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-6 text-center">
        <h1 className="text-5xl font-black text-yellow-400 mb-2">IT'S A MATCH!</h1>
        <p className="text-zinc-300 mb-6">You and {currentMatch.name} liked each other</p>
        <img src={currentMatch.img} className="w-56 h-56 rounded-full object-cover border-[6px] border-yellow-400 mb-8 shadow-[0_0_40px_rgba(250,204,21,0.6)]" />
        <div className="flex gap-4 w-full max-w-sm">
          <button onClick={()=>{setIdx(i=>i+1); setStep("swipe")}} className="flex-1 bg-zinc-800 py-4 rounded-xl font-bold">Keep Swiping</button>
          <button onClick={()=>setStep("chat")} className="flex-1 bg-yellow-400 text-black py-4 rounded-xl font-bold">Message</button>
        </div>
      </div>
    )
  }
  if(step==="chat"){
    const chatUser = currentMatch || matches[0] || PROFILES[0];
    return (
      <div className="min-h-screen bg-black text-white flex flex-col">
        <div className="p-4 border-b border-zinc-800 flex items-center gap-3">
          <button onClick={()=>setStep("swipe")} className="text-yellow-400 font-bold">←</button>
          <img src={chatUser.img} className="w-10 h-10 rounded-full object-cover" />
          <div><p className="font-bold">{chatUser.name}</p><p className="text-xs text-green-400">Online • {chatUser.location}</p></div>
        </div>
        <div className="flex-1 p-4 space-y-3 bg-zinc-950">
          <div className="bg-zinc-800 rounded-2xl rounded-bl-none p-3 max-w-[75%]">Hey! I saw you are from {chatUser.location} 😊</div>
          <div className="bg-yellow-400 text-black rounded-2xl rounded-br-none p-3 max-w-[75%] ml-auto">Haha yes! Want to meet tomorrow?</div>
          <div className="bg-zinc-800 rounded-2xl rounded-bl-none p-3 max-w-[75%]">Sure! Cafe Javas Kololo 5pm?</div>
          {matches.length>0 && <div className="text-center text-xs text-zinc-500 pt-4">You have {matches.length} matches: {matches.map(m=>m.name).join(", ")}</div>}
        </div>
        <div className="p-3 border-t border-zinc-800 flex gap-2 bg-black">
          <input placeholder="Type a message..." className="flex-1 bg-zinc-900 border border-zinc-700 rounded-full px-5 py-3 outline-none" />
          <button className="bg-yellow-400 text-black w-12 h-12 rounded-full font-black text-xl">↑</button>
        </div>
      </div>
    )
  }
  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      <header className="p-4 flex justify-between items-center">
        <h1 className="text-2xl font-black text-yellow-400 tracking-wider">KLA MEET</h1>
        <button onClick={()=>setStep("chat")} className="bg-zinc-900 border border-zinc-700 px-4 py-2 rounded-full text-sm font-bold">{matches.length} Matches ❤️</button>
      </header>
      <div className="flex-1 flex flex-col items-center p-4">
        <div className="w-full max-w-[360px] h-[62vh] relative">
          <div className="w-full h-full bg-zinc-900 rounded-[32px] overflow-hidden border border-zinc-800 shadow-2xl relative">
            <img src={profile.img} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/10 to-transparent" />
            <div className="absolute bottom-0 p-5 w-full">
              <h2 className="text-[28px] font-black">{profile.name}, {profile.age}</h2>
              <p className="text-white/90 mt-1 font-medium">{profile.location} • {profile.bio}</p>
              <div className="flex gap-2 mt-3">
                <span className="bg-white/20 backdrop-blur px-3 py-1 rounded-full text-xs">🎓 Makerere</span>
                <span className="bg-white/20 backdrop-blur px-3 py-1 rounded-full text-xs">📍 2km away</span>
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-8 mt-6">
          <button onClick={nope} className="w-14 h-14 bg-zinc-900 border-2 border-zinc-700 rounded-full flex items-center justify-center text-xl font-bold text-white active:scale-90 transition">✕</button>
          <button onClick={like} className="w-20 h-20 bg-yellow-400 rounded-full flex items-center justify-center text-3xl shadow-[0_0_30px_rgba(250,204,21,0.5)] active:scale-90 transition">♥</button>
        </div>
        <button onClick={()=>setStep("login")} className="text-zinc-600 text-xs mt-6">Logout</button>
      </div>
    </div>
  )
}
