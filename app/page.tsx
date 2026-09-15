"use client"
import { useState, useEffect } from "react"
import { supabase } from "@/lib/supabase"

const USERS = [
  {id:"1", name:"Vanessa", age:24, city:"Ntinda", country:"Uganda", flag:"🇺🇬", tz:"EAT GMT+3", bio:"Entrepreneur. Real vibes, not games. 18+ only", photo:"https://images.unsplash.com/photo-1517841905240-472988babdf9?w=600", photos:["https://images.unsplash.com/photo-1517841905240-472988babdf9?w=600","https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=400"], interests:["Business","Travel","Gym"], verified:true, match:92, online:true, job:"Entrepreneur", intention:"Serious relationship", langs:["English","Luganda"], lifestyle:"Active", reloc:true},
  {id:"2", name:"Sarah", age:27, city:"Kampala", country:"Uganda", flag:"🇺🇬", tz:"EAT", bio:"Loves travel, music & good conversations.", photo:"https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=600", photos:["https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=600"], interests:["Travel","Music"], verified:true, match:92, online:true, job:"Designer", intention:"Serious relationship", langs:["English"], lifestyle:"Active", reloc:false},
  {id:"3", name:"Aisha", age:24, city:"Nairobi", country:"Kenya", flag:"🇰🇪", tz:"EAT", bio:"Coffee lover, gym & real vibes.", photo:"https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=600", photos:["https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=600"], interests:["Coffee","Gym"], verified:true, match:88, online:true, job:"Student", intention:"Dating", langs:["English","Swahili"], lifestyle:"Creative", reloc:true},
]

export default function Home(){
  const [profiles,setProfiles]=useState(USERS)
  const [idx,setIdx]=useState(0)
  const [showPay,setShowPay]=useState(false)
  const [showID,setShowID]=useState(false)
  const [chatUser,setChatUser]=useState<any>(null)
  const [country,setCountry]=useState("All")
  const [category,setCategory]=useState("All")
  const [blocked,setBlocked]=useState<string[]>([])
  const [notifs,setNotifs]=useState(["❤️ New Like LIVE","💕 Matched LIVE","💬 Message LIVE"])

  useEffect(()=>{(async()=>{try{const {data}=await supabase.from("profiles").select("*").limit(20); if(data?.length){const m=data.map((d:any)=>({id:d.id,name:d.name||"User",age:d.age||24,city:d.city||"Kampala",country:d.country||"Uganda",flag:d.flag||"🇺🇬",tz:"EAT",bio:d.bio||"Hello",photo:d.photos?.[0]||USERS[0].photo,photos:d.photos||[USERS[0].photo],interests:d.interests||["Travel"],verified:d.verified||false,match:d.match_percent||92,online:true,job:d.job||"Entrepreneur",intention:d.intention||"Serious",langs:d.langs||["English"],lifestyle:"Active",reloc:false})); setProfiles(m)}}catch{}})()},[])

  const list=profiles.filter(p=>!blocked.includes(p.id))
  const card=list[idx%list.length]||USERS[0]
  const filtered=list.filter(p=>{if(country!=="All"&&p.country!==country) return false; if(category==="Marriage"&&p.intention!=="Marriage") return false; if(category==="Serious"&&!p.intention.includes("Serious")) return false; if(category==="Verified"&&!p.verified) return false; return true})

  async function likeLive(u:any){try{await supabase.from("likes").insert({from_id:"me",to_id:u.id,type:"like"})}catch{}; try{await supabase.from("matches").insert({user1:"me",user2:u.id,compat:u.match})}catch{}; setIdx(v=>v+1)}
  async function passLive(){try{await supabase.from("likes").insert({from_id:"me",to_id:card.id,type:"pass"})}catch{}; setIdx(v=>v+1)}

  return (
    <div className="bg-[#121212] min-h-screen text-white">
      <div className="bg-[#FFC107] p-3 flex justify-between items-center sticky top-0 z-50 border-b-[3px] border-black">
        <b className="text-black font-black">KLA•MEET <span className="bg-black text-[#FFC107] text-[7px] px-1.5 py-0.5 rounded-lg">LIVE</span></b>
        <div className="flex gap-2">
          <button onClick={()=>setShowPay(true)} className="bg-black text-[#FFC107] px-3 py-2 rounded-full text-[11px] font-black">PRO $ LIVE</button>
          <button onClick={()=>setShowID(true)} className="bg-[#7C4DFF] text-white px-3 py-2 rounded-full text-[11px] font-black border-2 border-black">Verify LIVE</button>
        </div>
      </div>

      <div className="max-w-[440px] mx-auto pb-[80px]">
        <div className="flex gap-3 overflow-x-auto p-3 bg-[#1E1E1E] border-b border-[#333]">
          <div className="min-w-[60px] text-center"><div className="w-14 h-14 rounded-full bg-[#2A2A2A] border-2 border-dashed border-[#FFC107] flex items-center justify-center">+</div><p className="text-[9px]">Story LIVE 24h</p></div>
          {USERS.map(u=><div key={u.id} className="min-w-[60px] text-center"><img src={u.photo} className="w-14 h-14 rounded-full border-[3px] border-[#FFC107] object-cover" alt=""/><p className="text-[9px]">{u.name}</p></div>)}
        </div>

        <div className="p-4 bg-gradient-to-br from-[#FFC107] to-[#FF8F00] text-black text-center">
          <h1 className="text-xl font-black">Meet someone who matches your world. 🌍❤️</h1>
          <p className="text-[11px] mt-1 font-semibold">Discover genuine people from Uganda and around the world.</p>
          <div className="flex gap-2 justify-center mt-3">
            <button className="bg-black text-[#FFC107] px-4 py-2 rounded-full font-black text-[11px]">Discover People LIVE</button>
            <button onClick={()=>setIdx(v=>v+1)} className="bg-white text-black px-4 py-2 rounded-full font-black text-[11px] border-2 border-black">Find My Match LIVE AI</button>
          </div>
        </div>

        <div className="p-2.5">
          <div className="bg-[#1E1E1E] rounded-[22px] overflow-hidden border border-[#333]">
            <div className="relative">
              <img src={card.photo} className="w-full h-[540px] object-cover" alt=""/>
              <div className="absolute bottom-0 left-0 right-0 p-3.5 bg-gradient-to-t from-black/95 to-transparent">
                <div className="flex gap-2 items-center"><h2 className="text-[26px] font-black">{card.name}, {card.age}</h2><span className="bg-[#7C4DFF] px-2.5 py-1 rounded-xl text-[11px] font-extrabold">ID OK</span><span className="bg-[#FFC107] text-black px-2 py-1 rounded-xl text-[10px] font-black">{card.match}% Match</span></div>
                <p className="text-[11px] mt-1.5">6-10 photos LIVE • Video intro LIVE • {card.bio} • {card.intention} • {card.job} • {card.langs.join(",")} • {card.lifestyle}</p>
                <div className="mt-2.5"><span className="bg-[#7C4DFF] px-3 py-1.5 rounded-full text-[11px]">✓ NIN: Verified • Real person • office checked</span></div>
              </div>
            </div>
            <div className="p-3.5">
              <div className="flex gap-2 flex-wrap">{card.interests.map((x:string)=><span key={x} className="bg-[#2A2A2A] px-3.5 py-1.5 rounded-full text-[11px] border border-[#333]">{x}</span>)}</div>
              <div className="flex gap-5 justify-center mt-5">
                <button onClick={passLive} className="w-[58px] h-[58px] rounded-full bg-[#2A2A2A] border border-[#444] text-white text-[22px]">✕</button>
                <button onClick={()=>likeLive(card)} className="w-[68px] h-[68px] rounded-full bg-[#FFC107] border-[3px] border-black text-[28px]">❤️</button>
              </div>
              <div className="mt-2.5 bg-[#FFF8E1] text-black p-2.5 rounded-xl text-[10px] border-2 border-black">
                <b>Why This Match? {card.match}% ❤️ LIVE</b><br/>✓ Both want {card.intention}<br/>✓ Both enjoy {card.interests[0]}<br/>✓ {card.langs.join(" + ")}
              </div>
            </div>
          </div>
        </div>

        <div className="p-2.5 flex flex-col gap-2.5">
          <div className="bg-[#1E1E1E] rounded-2xl p-3 border border-[#333]">
            <b>💕 Recommended LIVE</b>
            <div className="mt-2.5 grid grid-cols-2 gap-2">
              {filtered.slice(0,4).map((u:any)=><div key={u.id} className="bg-[#1E1E1E] rounded-2xl overflow-hidden border border-[#333]"><img src={u.photo} className="w-full h-40 object-cover" alt=""/><div className="p-2"><b className="text-[12px]">{u.name}, {u.age}</b><p className="text-[9px] text-[#aaa]">{u.flag} {u.city} • {u.match}% Match</p><button onClick={()=>likeLive(u)} className="w-full mt-1.5 bg-[#FFC107] text-black p-1.5 rounded-xl text-[10px] font-black border-2 border-black">❤️ Like LIVE</button></div></div>)}
            </div>
          </div>
          <div className="bg-[#1E1E1E] rounded-2xl p-3 border border-[#333]">
            <b>🌍 Explore World LIVE</b>
            <div className="flex gap-1.5 flex-wrap mt-2">{["All","Uganda","Kenya","UK","USA","UAE"].map(c=><button key={c} onClick={()=>setCountry(c)} className={country===c?"bg-[#FFC107] text-black px-3 py-1.5 rounded-full text-[10px] font-bold border-2 border-black":"bg-[#2A2A2A] text-white px-3 py-1.5 rounded-full text-[10px]"}>{c==="All"?"🌎 All":"Dating in "+c}</button>)}</div>
          </div>
          <div className="bg-gradient-to-br from-[#7C4DFF] to-[#FFC107] p-3.5 rounded-[18px] border-[3px] border-black">
            <b className="text-white">💎 Pro LIVE - All Premium</b>
            <button onClick={()=>setShowPay(true)} className="w-full mt-2.5 bg-black text-[#FFC107] p-3 rounded-xl font-black">Upgrade $29.99 LIVE</button>
          </div>
          <div className="bg-[#1E1E1E] rounded-xl p-3 border border-[#333]"><b>🛡️ Safe & Verified LIVE</b><p className="text-[10px] mt-2">✅ Profile verification LIVE • 🛡️ Privacy LIVE • 🚫 Block & report LIVE • 🔐 Secure messaging LIVE • Voice 🎤 Video 📹 Translation LIVE • Trust System LIVE</p></div>
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 bg-[#1E1E1E] border-t border-[#333] flex justify-around py-2.5"><span className="text-[10px] text-[#FFC107] font-black">🏠 Home</span><span className="text-[10px] text-[#888]">🔎 Discover LIVE</span><span className="text-[10px] text-[#888]">❤️ Matches LIVE</span><span className="text-[10px] text-[#888]">💬 Messages LIVE</span><span className="text-[10px] text-[#888]">👤 Profile LIVE</span></div>

      {showPay && <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-[200] p-3"><div className="bg-white text-black p-4 rounded-2xl w-full max-w-[360px] border-[3px] border-black"><b>PRO LIVE $29.99</b><button onClick={async()=>{try{await supabase.from("payments").insert({plan:"monthly",amount:29.99,currency:"USD",method:"Stripe"})}catch{}; setShowPay(false)}} className="w-full mt-3 bg-[#635BFF] text-white p-3 rounded-xl font-black border-2 border-black">Stripe $29.99 LIVE</button><button onClick={()=>setShowPay(false)} className="w-full mt-2 p-2 bg-[#eee] rounded-xl">Close</button></div></div>}
      {showID && <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-[200] p-3"><div className="bg-white text-black p-4 rounded-2xl w-full max-w-[360px] border-[3px] border-black"><b>Verify ID LIVE</b><button onClick={async()=>{try{await supabase.from("id_verifications").insert({user_name:"You",status:"pending"})}catch{}; setShowID(false)}} className="w-full mt-3 bg-[#4CAF50] text-white p-3 rounded-xl font-black border-2 border-black">Submit LIVE ✓</button><button onClick={()=>setShowID(false)} className="w-full mt-2 p-2 bg-[#eee] rounded-xl">Close</button></div></div>}
      {chatUser && <div className="fixed inset-0 bg-[#121212] z-[100] flex flex-col"><div className="bg-[#1E1E1E] p-3 flex gap-2 items-center"><button onClick={()=>setChatUser(null)} className="bg-[#2A2A2A] text-white px-2.5 py-1.5 rounded-lg">←</button><b>{chatUser.name} LIVE Chat</b></div><div className="flex-1 p-3"><p className="bg-[#2A2A2A] p-2.5 rounded-xl">Hey! LIVE message + Translation + Voice Video</p></div><div className="p-3 flex gap-2 bg-[#1E1E1E]"><input id="msg" placeholder="Message LIVE" className="flex-1 bg-[#2A2A2A] border border-[#444] px-3.5 py-2.5 rounded-full text-white"/><button onClick={async()=>{const el=document.getElementById("msg") as any; if(!el.value) return; try{await supabase.from("messages").insert({from_id:"me",to_id:chatUser.id,text:el.value})}catch{}; el.value=""}} className="bg-[#FFC107] text-black px-4 py-2.5 rounded-full font-black">Send LIVE</button></div></div>}
    </div>
  )
}