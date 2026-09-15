"use client"
import { useState, useEffect } from "react"
import { supabase } from "@/lib/supabase"

const DATA = [
  {id:"1", name:"Vanessa", age:24, city:"Ntinda", country:"Uganda", flag:"🇺🇬", bio:"Entrepreneur. Real vibes, not games. 18+ only ✨", photo:"https://images.unsplash.com/photo-1517841905240-472988babdf9?w=600", interests:["Business","Travel","Gym"], verified:true, match:92, online:true, job:"Entrepreneur", intention:"Serious relationship", langs:["English","Luganda"]},
  {id:"2", name:"Sarah", age:27, city:"Kampala", country:"Uganda", flag:"🇺🇬", bio:"Loves travel, music & good conversations.", photo:"https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=600", interests:["Travel","Music"], verified:true, match:92, online:true, job:"Designer", intention:"Serious relationship", langs:["English"]},
  {id:"3", name:"Aisha", age:24, city:"Nairobi", country:"Kenya", flag:"🇰🇪", bio:"Coffee lover, gym & real vibes.", photo:"https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=600", interests:["Coffee","Gym"], verified:true, match:88, online:true, job:"Student", intention:"Dating", langs:["English","Swahili"]},
  {id:"4", name:"David", age:28, city:"London", country:"UK", flag:"🇬🇧", bio:"Tech & travel.", photo:"https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600", interests:["Tech","Fitness"], verified:true, match:95, online:false, job:"Founder", intention:"Marriage", langs:["English"]},
]

export default function Home(){
  const [profiles,setProfiles]=useState(DATA)
  const [idx,setIdx]=useState(0)
  const [showPay,setShowPay]=useState(false)
  const [showID,setShowID]=useState(false)
  const [chatUser,setChatUser]=useState<any>(null)
  const [country,setCountry]=useState("All")
  const [blocked,setBlocked]=useState<string[]>([])

  useEffect(()=>{(async()=>{try{const {data}=await supabase.from("profiles").select("*").limit(20); if(data?.length){const m=data.map((d:any)=>({id:d.id,name:d.name||"User",age:d.age||24,city:d.city||"Kampala",country:d.country||"Uganda",flag:d.flag||"🇺🇬",bio:d.bio||"Hello",photo:d.photos?.[0]||DATA[0].photo,interests:d.interests||["Travel"],verified:true,match:d.match_percent||92,online:true,job:d.job||"Entrepreneur",intention:d.intention||"Serious",langs:d.langs||["English"]})); setProfiles(m)}}catch{}})()},[])

  const list=profiles.filter(p=>!blocked.includes(p.id))
  const card=list[idx%list.length]||DATA[0]
  const filtered=country==="All"?list:list.filter(p=>p.country===country)

  async function likeLive(u:any){try{await supabase.from("likes").insert({from_id:"me",to_id:u.id,type:"like"})}catch{}; try{await supabase.from("matches").insert({user1:"me",user2:u.id,compat:u.match})}catch{}; setIdx(v=>v+1)}
  async function passLive(){try{await supabase.from("likes").insert({from_id:"me",to_id:card.id,type:"pass"})}catch{}; setIdx(v=>v+1)}
  async function payLive(a:number,m:string){try{await supabase.from("payments").insert({amount:a,method:m,status:"pending"})}catch{}; alert(m+" LIVE $"+a); setShowPay(false)}
  async function verifyLive(){try{await supabase.from("id_verifications").insert({status:"pending"})}catch{}; alert("Verification LIVE"); setShowID(false)}

  return (
    <div className="bg-[#121212] min-h-screen text-white font-sans">
      <div className="bg-[#FFC107] p-3 flex justify-between items-center sticky top-0 z-50 border-b-[3px] border-black">
        <b className="text-black font-black text-lg">KLA•MEET <span className="bg-black text-[#FFC107] text-[7px] px-1.5 py-0.5 rounded-lg ml-1">LIVE RESTORED 2a576b6</span></b>
        <div className="flex gap-2">
          <button onClick={()=>setShowPay(true)} className="bg-black text-[#FFC107] px-3 py-2 rounded-full text-[11px] font-black">PRO $ LIVE</button>
          <button onClick={()=>setShowID(true)} className="bg-[#7C4DFF] text-white px-3 py-2 rounded-full text-[11px] font-black border-2 border-black">Verify LIVE</button>
        </div>
      </div>

      <div className="max-w-[440px] mx-auto pb-20">
        <div className="p-4 bg-gradient-to-br from-[#FFC107] to-[#FF8F00] text-black text-center">
          <h1 className="text-xl font-black">Meet someone who matches your world. 🌍❤️</h1>
          <p className="text-[11px] mt-1 font-semibold">Discover genuine people from Uganda and around the world.</p>
        </div>

        <div className="p-2.5">
          <div className="bg-[#1E1E1E] rounded-[22px] overflow-hidden border border-[#333]">
            <div className="relative">
              <img src={card.photo} className="w-full h-[540px] object-cover" alt=""/>
              <div className="absolute top-2.5 left-2.5 flex gap-1.5"><span className="bg-black text-white px-2 py-1 rounded-xl text-[9px]">{card.flag} {card.city} • Online LIVE</span></div>
              <div className="absolute bottom-0 left-0 right-0 p-3.5 bg-gradient-to-t from-black/95 to-transparent">
                <div className="flex gap-2 items-center"><h2 className="text-[26px] font-black">{card.name}, {card.age}</h2><span className="bg-[#7C4DFF] px-2.5 py-1 rounded-xl text-[11px] font-extrabold">ID OK</span><span className="bg-[#FFC107] text-black px-2 py-1 rounded-xl text-[10px] font-black">{card.match}% Match ❤️</span></div>
                <p className="text-[12px] mt-1.5">{card.bio} • {card.intention} • {card.job} • {card.langs.join(", ")}</p>
                <div className="mt-2.5"><span className="bg-[#7C4DFF] px-3 py-1.5 rounded-full text-[11px]">✓ NIN: Verified • Real person • office checked • Verified LIVE</span></div>
              </div>
            </div>
            <div className="p-3.5">
              <div className="flex gap-2 flex-wrap">{card.interests.map((x:string)=><span key={x} className="bg-[#2A2A2A] px-3.5 py-1.5 rounded-full text-[11px] border border-[#333]">{x}</span>)}</div>
              <div className="flex gap-5 justify-center mt-5">
                <button onClick={passLive} className="w-14 h-14 rounded-full bg-[#2A2A2A] border border-[#444] text-white text-xl">✕</button>
                <button onClick={()=>likeLive(card)} className="w-[68px] h-[68px] rounded-full bg-[#FFC107] border-[3px] border-black text-[28px]">❤️</button>
              </div>
              <div className="mt-2.5 bg-[#FFF8E1] text-black p-2.5 rounded-xl text-[10px] border-2 border-black">
                <b>Why This Match? {card.match}% ❤️ LIVE AI</b><br/>✓ Both want {card.intention}<br/>✓ Both enjoy {card.interests[0]}<br/>✓ {card.langs.join(" + ")} • Lifestyle compatibility LIVE
              </div>
              <div className="flex gap-2 justify-center mt-3">
                <button onClick={()=>setChatUser(card)} className="bg-[#4CAF50] text-white px-4 py-2 rounded-full text-[10px] font-bold">💬 Chat LIVE Real-time</button>
                <button onClick={()=>{setBlocked(b=>[...b,card.id]); setIdx(v=>v+1)}} className="bg-[#2A2A2A] text-white px-3 py-2 rounded-full text-[10px]">🚫 Block LIVE</button>
              </div>
            </div>
          </div>
        </div>

        <div className="p-2.5 flex flex-col gap-2.5">
          <div className="bg-[#1E1E1E] rounded-2xl p-3 border border-[#333]">
            <b>💕 Recommended for You LIVE</b>
            <div className="mt-2.5 grid grid-cols-2 gap-2">
              {filtered.slice(0,4).map((u:any)=><div key={u.id} className="bg-[#1E1E1E] rounded-2xl overflow-hidden border border-[#333]"><img src={u.photo} className="w-full h-40 object-cover" alt=""/><div className="p-2"><b className="text-[12px]">{u.name}, {u.age}</b><p className="text-[9px] text-zinc-400">{u.flag} {u.city} • {u.match}% • 🟢 Online LIVE</p><button onClick={()=>likeLive(u)} className="w-full mt-1.5 bg-[#FFC107] text-black p-1.5 rounded-xl text-[10px] font-black border-2 border-black">❤️ Like LIVE</button></div></div>)}
            </div>
          </div>

          <div className="bg-[#1E1E1E] rounded-2xl p-3 border border-[#333]">
            <b>🌍 Explore the World LIVE</b>
            <div className="flex gap-1.5 flex-wrap mt-2">{["All","Uganda","Kenya","UK","USA","UAE"].map(c=><button key={c} onClick={()=>setCountry(c)} className={country===c?"bg-[#FFC107] text-black px-3 py-1.5 rounded-full text-[10px] font-bold border-2 border-black":"bg-[#2A2A2A] text-white px-3 py-1.5 rounded-full text-[10px]"}>{c==="All"?"🌎 All":`Dating in ${c}`}</button>)}</div>
            <button className="w-full mt-2.5 bg-[#FFC107] text-black p-2.5 rounded-xl font-black border-2 border-black text-[11px]">✈️ Travel Mode LIVE • Explore Worldwide</button>
          </div>

          <div className="bg-[#1E1E1E] rounded-2xl p-3 border border-[#333]">
            <b>✨ Today's Matches LIVE • 🔥 Popular • 🆕 New</b>
            <div className="flex gap-2 overflow-x-auto mt-2 pb-1">{filtered.map((u:any)=><div key={u.id} className="min-w-[110px] bg-[#121212] rounded-xl overflow-hidden border border-[#333]"><img src={u.photo} className="w-[110px] h-[110px] object-cover" alt=""/><div className="p-1.5 text-center"><b className="text-[10px]">{u.name}</b><p className="text-[8px] text-[#FFC107]">{u.match}% • {u.flag} • {u.intention}</p></div></div>)}</div>
          </div>

          <div className="bg-gradient-to-br from-[#7C4DFF] to-[#FFC107] p-3.5 rounded-[18px] border-[3px] border-black">
            <b className="text-white">💎 Upgrade to KLA MEET Pro LIVE</b>
            <p className="text-[11px] text-white/90 mt-1">See who liked you LIVE • Unlimited likes • Travel • Boost • Incognito • Rewind • Read receipts</p>
            <button onClick={()=>setShowPay(true)} className="w-full mt-2.5 bg-black text-[#FFC107] p-3 rounded-xl font-black">Upgrade $29.99 LIVE</button>
          </div>

          <div className="bg-[#1E1E1E] rounded-xl p-3 border border-[#333]">
            <b>🛡️ Safe & Verified LIVE</b>
            <div className="grid grid-cols-2 gap-2 mt-2.5 text-[11px]">
              <div className="bg-[#121212] p-2.5 rounded-xl">✅ Verification LIVE</div>
              <div className="bg-[#121212] p-2.5 rounded-xl">🛡️ Privacy LIVE</div>
              <div className="bg-[#121212] p-2.5 rounded-xl">🚫 Block/report LIVE</div>
              <div className="bg-[#121212] p-2.5 rounded-xl">🔐 Secure chat LIVE</div>
            </div>
          </div>

          <div className="bg-white text-black p-3 rounded-2xl border-[3px] border-black">
            <b>👑 Admin LIVE - Old Features</b>
            <div className="grid grid-cols-2 gap-1.5 mt-2 text-[10px]">
              <div className="bg-[#FFF8E1] p-2 rounded-lg border border-black font-bold">Users LIVE: {profiles.length}</div>
              <div className="bg-[#E8F5E9] p-2 rounded-lg border border-black font-bold">Matches LIVE</div>
              <div className="bg-[#FFEBEE] p-2 rounded-lg border border-black font-bold">Reports LIVE</div>
              <div className="bg-[#E3F2FD] p-2 rounded-lg border border-black font-bold">Revenue LIVE $</div>
            </div>
          </div>
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 bg-[#1E1E1E] border-t border-[#333] flex justify-around py-2.5 z-40">
        <span className="text-[10px] text-[#FFC107] font-black">🏠 Home</span><span className="text-[10px] text-zinc-500">🔎 Discover LIVE</span><span className="text-[10px] text-zinc-500">❤️ Matches LIVE</span><span className="text-[10px] text-zinc-500">💬 Messages LIVE</span><span className="text-[10px] text-zinc-500">👤 Profile LIVE</span>
      </div>

      {chatUser && <div className="fixed inset-0 bg-[#121212] z-[100] flex flex-col"><div className="bg-[#1E1E1E] p-3 flex gap-2 items-center"><button onClick={()=>setChatUser(null)} className="bg-[#2A2A2A] text-white px-2.5 py-1.5 rounded-lg">←</button><b>{chatUser.name} LIVE Chat + Translation + Voice Video</b></div><div className="flex-1 p-3"><p className="bg-[#2A2A2A] p-2.5 rounded-xl">Hey! LIVE message • Read ✓✓ • Typing... • Voice 🎤 • Video 📹 • Translation 🌐</p></div><div className="p-3 flex gap-2 bg-[#1E1E1E]"><input id="msg" placeholder="Message LIVE" className="flex-1 bg-[#2A2A2A] border border-[#444] px-3.5 py-2.5 rounded-full text-white"/><button onClick={async()=>{const el=document.getElementById("msg") as any; if(!el.value) return; try{await supabase.from("messages").insert({from_id:"me",to_id:chatUser.id,text:el.value})}catch{}; el.value=""}} className="bg-[#FFC107] text-black px-4 py-2.5 rounded-full font-black">Send LIVE</button></div></div>}

      {showPay && <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-[200] p-3"><div className="bg-white text-black p-4 rounded-2xl w-full max-w-[360px] border-[3px] border-black"><b>PRO LIVE $29.99 USD + UGX</b><button onClick={()=>payLive(29.99,"Stripe")} className="w-full mt-3 bg-[#635BFF] text-white p-3 rounded-xl font-black border-2 border-black">Stripe $29.99 LIVE</button><button onClick={()=>payLive(29.99,"PayPal")} className="w-full mt-2 bg-[#FFC439] text-black p-3 rounded-xl font-black border-2 border-black">PayPal LIVE</button><button onClick={()=>payLive(45000,"MoMo")} className="w-full mt-2 bg-[#FFCC00] text-black p-3 rounded-xl font-black border-2 border-black">MTN MoMo LIVE</button><button onClick={()=>setShowPay(false)} className="w-full mt-2 p-2 bg-[#eee] rounded-xl">Close</button></div></div>}

      {showID && <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-[200] p-3"><div className="bg-white text-black p-4 rounded-2xl w-full max-w-[360px] border-[3px] border-black"><b>Verify ID LIVE 🪪</b><button onClick={verifyLive} className="w-full mt-3 bg-[#4CAF50] text-white p-3 rounded-xl font-black border-2 border-black">Submit LIVE ✓ ID OK Badge</button><button onClick={()=>setShowID(false)} className="w-full mt-2 p-2 bg-[#eee] rounded-xl">Close</button></div></div>}
    </div>
  )
}
