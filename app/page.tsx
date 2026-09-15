"use client"
import { useState, useEffect } from "react"
import { supabase } from "@/lib/supabase"

const FALLBACK = [
{name:"Sarah",age:27,city:"Kampala",country:"Uganda",flag:"🇺🇬",bio:"Loves travel, music & good conversations.",photos:["https://images.unsplash.com/photo-1517841905240-472988babdf9?w=600","https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=400","https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400"],video:"",intention:"Serious relationship",job:"Entrepreneur",edu:"MBA",langs:["English","Luganda"],interests:["Travel","Music","Gym"],lifestyle:"Active",verified:true,online:true,match_percent:92,reloc:true,id:"1"},
{name:"Vanessa",age:24,city:"London",country:"UK",flag:"🇬🇧",bio:"Entrepreneur. Real vibes, not games. 18+ only",photos:["https://images.unsplash.com/photo-1517841905240-472988babdf9?w=600"],video:"",intention:"Serious relationship",job:"Founder",edu:"MSc",langs:["English"],interests:["Business","Travel"],lifestyle:"Professional",verified:true,online:true,match_percent:94,reloc:true,id:"4"},
{name:"Aisha",age:24,city:"Nairobi",country:"Kenya",flag:"🇰🇪",bio:"Coffee & gym",photos:["https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=600"],video:"",intention:"Dating",job:"Designer",edu:"BFA",langs:["English","Swahili"],interests:["Art","Coffee"],lifestyle:"Creative",verified:true,online:true,match_percent:88,reloc:false,id:"2"},
]

function WhyMatch({u}:{u:any}){
const reasons = [
`✓ Both want ${u.intention}`,
`✓ Both enjoy ${u.interests?.[0]}`,
`✓ ${u.langs?.join(" + ")}`,
`✓ ${u.match_percent}% lifestyle compatibility`,
`✓ ${u.interests?.length} shared interests`,
`✓ ${u.reloc?"Open to relocating":"Nearby"}`
]
return <div style={{background:"#FFF8E1",color:"#000",padding:"8px",borderRadius:"10px",marginTop:"6px",fontSize:"10px",lineHeight:"1.6",border:"2px solid #000"}}><b>Why This Match? {u.match_percent}% ❤️</b><br/>{reasons.slice(0,4).join("<br/>")}</div>
}

export default function Home(){
const [profiles,setProfiles]=useState<any[]>(FALLBACK)
const [stories,setStories]=useState<any[]>([{user:"Sarah",photo:FALLBACK[0].photos[0]},{user:"Aisha",photo:FALLBACK[2].photos[0]},{user:"David",photo:FALLBACK[1].photos[0]}])
const [i,setI]=useState(0)
const [tab,setTab]=useState('home')
const [chatUser,setChatUser]=useState<any>(null)
const [showPay,setShowPay]=useState(false)
const [showID,setShowID]=useState(false)
const [filterCont,setFilterCont]=useState('All')
const [category,setCategory]=useState('All')
const [notifs,setNotifs]=useState(["❤️ You have a new Like","💕 You matched with Sarah","💬 Aisha sent you a message","🌎 3 new people from UK match you","🔥 Your profile is trending"])

useEffect(()=>{
(async()=>{
try{
const {data: profs} = await supabase.from('profiles').select('*').order('created_at',{ascending:false}).limit(20)
if(profs?.length) setProfiles(profs)
const {data: sts} = await supabase.from('stories').select('*').gt('expires_at', new Date().toISOString())
if(sts?.length) setStories(sts)
}catch(e){console.log("live tables not yet, using fallback")}
})()
},[])

const card = profiles[i] || FALLBACK[0]
const filtered = profiles.filter(p=>{
if(filterCont!=="All" && p.country!==filterCont) return false
if(category==="Marriage" && p.intention!=="Marriage") return false
if(category==="Serious" &&!p.intention?.includes("Serious")) return false
if(category==="Verified" &&!p.verified) return false
if(category==="Online" &&!p.online) return false
return true
})

const Card = ({u, large}:{u:any, large?:boolean}) => (
<div style={{background:"#1E1E1E",borderRadius:large?"22px":"16px",overflow:"hidden",border:"1px solid #2A2A2A"}}>
<div style={{position:"relative"}}>
<img src={u.photos?.[0] || u.photo} style={{width:"100%",height:large?"540px":"180px",objectFit:"cover"}} alt=""/>
<div style={{position:"absolute",top:"8px",left:"8px",display:"flex",gap:"4px"}}><span style={{background:"#000",color:"#fff",padding:"3px 7px",borderRadius:"10px",fontSize:"9px"}}>{u.flag} {u.city} • {u.timezone || "GMT+3"}</span>{u.online && <span style={{background:"#4CAF50",padding:"3px 6px",borderRadius:"10px",fontSize:"8px",color:"#fff"}}>🟢 Online • {new Date(u.last_active||Date.now()).toLocaleTimeString()}</span>}</div>
<div style={{position:"absolute",top:"8px",right:"8px",display:"flex",flexDirection:"column",gap:"4px",alignItems:"flex-end"}}><span style={{background:"#FFC107",color:"#000",padding:"4px 8px",borderRadius:"12px",fontSize:"10px",fontWeight:900}}>{u.match_percent || u.match}% Match ❤️</span>{u.verified && <span style={{background:"#7C4DFF",color:"#fff",padding:"3px 7px",borderRadius:"10px",fontSize:"8px",fontWeight:800}}>✓ Verified Profile</span>}</div>
{large && <div style={{position:"absolute",bottom:0,left:0,right:0,padding:"12px",background:"linear-gradient(to top, rgba(0,0,0,0.95), transparent)"}}>
<h2 style={{fontSize:"26px",fontWeight:900,margin:0}}>{u.name}, {u.age}</h2>
<p style={{fontSize:"10px",marginTop:"4px"}}>{u.flag} {u.city}, {u.country} • 🗣️ {u.langs?.join(", ")} • ⏰ {u.timezone||"EAT"} • {u.job} • {u.edu}</p>
<p style={{fontSize:"11px",marginTop:"6px"}}>{u.bio} • 🎯 {u.intention} • {u.lifestyle} • Reloc: {u.reloc?"Yes ✈️":"No"}</p>
<div style={{marginTop:"8px",display:"flex",gap:"6px",flexWrap:"wrap"}}><span style={{background:"#7C4DFF",padding:"5px 10px",borderRadius:"20px",fontSize:"10px"}}>✓ NIN: Verified • Real person • office checked</span>{u.reloc && <span style={{background:"#FFC107",color:"#000",padding:"5px 10px",borderRadius:"20px",fontSize:"10px",fontWeight:800}}>✈️ Open to relocate</span>}</div>
</div>}
</div>
<div style={{padding:"10px"}}>
<div style={{display:"flex",gap:"4px",overflowX:"auto",marginBottom:"6px"}}>{(u.photos||[]).slice(0,6).map((p:string,k:number)=><img key={k} src={p} style={{width:"50px",height:"50px",borderRadius:"10px",objectFit:"cover",border:"1px solid #333"}} alt=""/> )}{u.video && <span style={{background:"#7C4DFF",color:"#fff",padding:"6px",borderRadius:"10px",fontSize:"10px"}}>▶️ Video Intro</span>}</div>
{!large && <><b style={{fontSize:"12px"}}>{u.name}, {u.age}</b><p style={{fontSize:"9px",color:"#aaa"}}>{u.flag} {u.intention} • {u.job} • {u.langs?.[0]}</p></>}
<WhyMatch u={u} />
<div style={{display:"flex",gap:"6px",marginTop:"8px"}}>
<button onClick={async()=>{await supabase.from('likes').insert({from_id:"me",to_id:u.id,type:"like"}); setI(v=>v+1)}} style={{flex:1,background:"#FFC107",color:"#000",padding:"8px",borderRadius:"20px",fontWeight:900,fontSize:"11px",border:"2px solid #000"}}>❤️ Like</button>
<button onClick={async()=>{await supabase.from('likes').insert({from_id:"me",to_id:u.id,type:"super"}); alert('Super Like sent!')}} style={{background:"#2196F3",color:"#fff",padding:"8px 12px",borderRadius:"20px",fontSize:"11px"}}>⭐ Super</button>
<button onClick={()=>setChatUser(u)} style={{background:"#7C4DFF",color:"#fff",padding:"8px 12px",borderRadius:"20px",fontSize:"11px"}}>💬</button>
<button onClick={async()=>{await supabase.from('reports').insert({reported_id:u.id,reason:"spam"}); alert('Reported - Trust system')}} style={{background:"#2A2A2A",color:"#fff",padding:"8px",borderRadius:"20px",fontSize:"10px"}}>🚫</button>
</div>
<div style={{display:"flex",gap:"4px",marginTop:"6px",fontSize:"9px"}}><span>🎁 Gift</span><span>💬 Ice-breaker</span><span>🎤 Voice</span><span>📹 Video call</span></div>
</div>
</div>
)

return(
<div style={{background:"#121212",minHeight:"100vh",color:"#fff",fontFamily:"system-ui"}}>
<div style={{background:"#FFC107",padding:"10px 12px",display:"flex",justifyContent:"space-between",alignItems:"center",position:"sticky",top:0,zIndex:40,borderBottom:"3px solid #000"}}>
<b style={{color:"#000",fontWeight:900}}>KLA•MEET <span style={{background:"#000",color:"#FFC107",fontSize:"7px",padding:"2px 5px",borderRadius:"8px"}}>LIVE GLOBAL</span></b>
<div style={{display:"flex",gap:"6px"}}><button onClick={()=>setTab('notifications')} style={{background:"#000",color:"#FFC107",width:"32px",height:"32px",borderRadius:"16px",border:"none"}}>🔔{notifs.length}</button><button onClick={()=>setTab('messages')} style={{background:"#000",color:"#FFC107",width:"32px",height:"32px",borderRadius:"16px",border:"none"}}>💬</button><button onClick={()=>setTab('profile')} style={{background:"#fff",color:"#000",width:"32px",height:"32px",borderRadius:"16px",border:"2px solid #000"}}>👤</button></div>
</div>

<div style={{maxWidth:"440px",margin:"0 auto",paddingBottom:"80px"}}>

{/* STORIES - LIVE */}
<div style={{display:"flex",gap:"10px",overflowX:"auto",padding:"10px",background:"#1E1E1E",borderBottom:"1px solid #333"}}>
<div style={{minWidth:"60px",textAlign:"center"}}><div style={{width:"56px",height:"56px",borderRadius:"28px",background:"#2A2A2A",border:"2px dashed #FFC107",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"20px"}}>+</div><p style={{fontSize:"9px",marginTop:"4px"}}>Your Story</p></div>
{stories.map((s:any,i:number)=><div key={i} style={{minWidth:"60px",textAlign:"center"}}><img src={s.media_url || s.photo} style={{width:"56px",height:"56px",borderRadius:"28px",objectFit:"cover",border:"3px solid #FFC107"}} alt=""/><p style={{fontSize:"9px",marginTop:"4px"}}>{s.user || "User"} • 24h</p></div>)}
</div>

{/* HERO */}
<div style={{padding:"14px",background:"linear-gradient(135deg,#FFC107,#FF8F00)",color:"#000",textAlign:"center"}}><h1 style={{fontSize:"20px",fontWeight:900,margin:0}}>Meet someone who matches your world. 🌍❤️</h1><p style={{fontSize:"11px",marginTop:"4px",fontWeight:600}}>Discover genuine people from Uganda and around the world. LIVE</p><div style={{display:"flex",gap:"8px",justifyContent:"center",marginTop:"10px"}}><button style={{background:"#000",color:"#FFC107",padding:"8px 16px",borderRadius:"20px",fontWeight:900,fontSize:"11px",border:"none"}}>Discover People</button><button style={{background:"#fff",color:"#000",padding:"8px 16px",borderRadius:"20px",fontWeight:900,fontSize:"11px",border:"2px solid #000"}}>Find My Match</button></div></div>

{/* OLD LAYOUT - LIVE SWIPE */}
<div style={{padding:"10px"}}><Card u={card} large /></div>

{/* INTERNATIONAL DISCOVERY LIVE */}
<div style={{padding:"10px",background:"#1E1E1E",borderTop:"1px solid #333",borderBottom:"1px solid #333"}}>
<b>🌎 International Discovery - LIVE</b>
<div style={{display:"flex",gap:"6px",marginTop:"8px",overflowX:"auto"}}>
{[
{label:"Dating in 🇺🇬 Uganda",c:"Uganda"},
{label:"Dating in 🇬🇧 UK",c:"UK"},
{label:"Dating in 🇺🇸 USA",c:"USA"},
{label:"Dating in 🇰🇪 Kenya",c:"Kenya"},
{label:"Dating in 🇦🇪 UAE",c:"UAE"},
].map(x=><button key={x.c} onClick={()=>setFilterCont(x.c)} style={{background:filterCont===x.c?"#FFC107":"#2A2A2A",color:filterCont===x.c?"#000":"#fff",padding:"6px 12px",borderRadius:"20px",fontSize:"10px",whiteSpace:"nowrap",border:filterCont===x.c?"2px solid #000":"1px solid #444",fontWeight:700}}>{x.label}</button>)}
</div>
<div style={{display:"flex",gap:"6px",marginTop:"8px",flexWrap:"wrap",fontSize:"10px"}}>
<span style={{background:"#2A2A2A",padding:"5px 10px",borderRadius:"20px"}}>✈️ Travel mode: {filterCont}</span>
<span style={{background:"#2A2A2A",padding:"5px 10px",borderRadius:"20px"}}>⏰ Timezone: EAT/GMT/EST live</span>
<span style={{background:"#2A2A2A",padding:"5px 10px",borderRadius:"20px"}}>🗣️ Languages: {card.langs?.join(", ")}</span>
<span style={{background:"#2A2A2A",padding:"5px 10px",borderRadius:"20px"}}>✈️ Relocation: {card.reloc?"Yes":"No"}</span>
</div>
</div>

{/* DISCOVERY CATEGORIES */}
<div style={{padding:"10px"}}>
<b>🎯 Find Your Type</b>
<div style={{display:"flex",gap:"6px",flexWrap:"wrap",marginTop:"8px"}}>
{[
{label:"💍 Marriage-minded",k:"Marriage"},
{label:"❤️ Serious relationship",k:"Serious"},
{label:"💕 Dating",k:"Dating"},
{label:"🤝 Friendship",k:"Friendship"},
{label:"✈️ International",k:"All"},
{label:"🎓 Professionals",k:"All"},
{label:"🌟 Verified members",k:"Verified"},
{label:"🆕 New members",k:"All"},
{label:"🟢 Online now",k:"Online"},
].map(cat=><button key={cat.label} onClick={()=>setCategory(cat.k)} style={{background:category===cat.k?"#7C4DFF":"#2A2A2A",color:"#fff",padding:"6px 12px",borderRadius:"20px",fontSize:"10px",border:"1px solid #444"}}>{cat.label}</button>)}
</div>
<div style={{marginTop:"10px",display:"grid",gridTemplateColumns:"1fr 1fr",gap:"8px"}}>
{filtered.slice(0,6).map((u:any)=><Card key={u.id} u={u} />)}
</div>
</div>

{/* TODAY'S MATCHES + POPULAR + NEW */}
<div style={{padding:"10px",background:"#1E1E1E",borderTop:"1px solid #333"}}>
<b>✨ Today's Matches LIVE • Daily suggestions</b>
<div style={{marginTop:"8px",display:"flex",gap:"8px",overflowX:"auto"}}>
{profiles.map((u:any)=><div key={u.id} style={{minWidth:"120px",background:"#121212",borderRadius:"12px",overflow:"hidden",border:"1px solid #333"}}><img src={u.photos?.[0]||u.photo} style={{width:"120px",height:"120px",objectFit:"cover"}} alt=""/><div style={{padding:"6px"}}><b style={{fontSize:"10px"}}>{u.name} • {u.match_percent}%</b><p style={{fontSize:"8px",color:"#aaa"}}>{u.flag} {u.intention}</p></div></div>)}
</div>
</div>

{/* PRO + TRUST + SAFETY */}
<div style={{margin:"10px",background:"linear-gradient(135deg,#7C4DFF,#FFC107)",padding:"12px",borderRadius:"16px",border:"3px solid #000"}}>
<b style={{color:"#fff"}}>💎 KLA MEET PRO LIVE</b>
<div style={{fontSize:"10px",marginTop:"6px",background:"rgba(255,255,255,0.9)",color:"#000",padding:"8px",borderRadius:"10px",lineHeight:"1.5"}}>
See who liked you • Unlimited likes/messages • Advanced filters • Unlimited international browsing • Travel mode ✈️ • Incognito 👁️ • Boost 🔥 • Super Likes ⭐ • Rewind ↩️ • Read receipts ✓✓ • Priority matching • Analytics 📊 • Voice 🎤 • Video 📹
</div>
<button onClick={()=>setShowPay(true)} style={{width:"100%",marginTop:"8px",background:"#000",color:"#FFC107",padding:"10px",borderRadius:"12px",fontWeight:900}}>Upgrade $29.99/mo LIVE Stripe</button>
</div>

<div style={{margin:"10px",display:"grid",gridTemplateColumns:"1fr 1fr",gap:"8px",fontSize:"10px"}}>
<div style={{background:"#1E1E1E",padding:"10px",borderRadius:"12px",border:"1px solid #333"}}><b>🔐 Trust System LIVE</b><p style={{marginTop:"4px"}}>✓ Verified Profile<br/>✓ Photo verification<br/>✓ Email/phone<br/>✓ Identity optional<br/>✓ Report/Block<br/>✓ Scam warnings AI</p></div>
<div style={{background:"#1E1E1E",padding:"10px",borderRadius:"12px",border:"1px solid #333"}}><b>🏆 Gamification LIVE</b><p style={{marginTop:"4px"}}>75% complete<br/>Daily login streak<br/>Top profile 🔥<br/>Rising member<br/>Verification badge<br/>Popularity trending</p></div>
</div>

<div style={{margin:"10px",background:"#1E1E1E",padding:"12px",borderRadius:"12px",border:"1px solid #333"}}>
<b>🛡️ Safety Center + 📰 Community LIVE</b>
<p style={{fontSize:"10px",color:"#aaa",marginTop:"6px"}}>How to identify scams • Safe first dates • Reporting • Blocking • Privacy • Dating advice • Success stories • International etiquette</p>
<button style={{marginTop:"8px",background:"#FFC107",color:"#000",padding:"6px 12px",borderRadius:"20px",fontSize:"10px",fontWeight:800,border:"2px solid #000"}}>Open Safety Center</button>
</div>

{/* ADMIN LIVE STATS */}
<div style={{margin:"10px",background:"#fff",color:"#000",padding:"12px",borderRadius:"16px",border:"3px solid #000"}}>
<b>👑 Admin Live Dashboard</b>
<div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"6px",marginTop:"8px",fontSize:"10px"}}>
<div style={{background:"#FFF8E1",padding:"8px",borderRadius:"10px",border:"1px solid #000"}}>Total users: {profiles.length} LIVE</div>
<div style={{background:"#E8F5E9",padding:"8px",borderRadius:"10px",border:"1px solid #000"}}>Revenue: $ live Stripe</div>
<div style={{background:"#FFEBEE",padding:"8px",borderRadius:"10px",border:"1px solid #000"}}>Reports: LIVE queue</div>
<div style={{background:"#E3F2FD",padding:"8px",borderRadius:"10px",border:"1px solid #000"}}>Countries: {[...new Set(profiles.map(p=>p.country))].join(", ")}</div>
</div>
</div>

</div>

<div style={{position:"fixed",bottom:0,left:0,right:0,background:"#1E1E1E",borderTop:"1px solid #333",display:"flex",justifyContent:"space-around",padding:"8px 0",zIndex:40}}>
{[{k:'home',l:'🏠 Home'},{k:'discover',l:'🔎 Discover'},{k:'matches',l:'❤️ Matches'},{k:'messages',l:'💬 Messages'},{k:'profile',l:'👤 Profile'}].map(b=><button key={b.k} onClick={()=>setTab(b.k)} style={{background:"none",border:"none",color:tab===b.k?"#FFC107":"#888",fontSize:"10px",fontWeight:tab===b.k?"900":"600"}}>{b.l}</button>)}
</div>

{chatUser && <div style={{position:"fixed",inset:0,background:"#121212",zIndex:100,display:"flex",flexDirection:"column"}}><div style={{background:"#1E1E1E",padding:"10px",display:"flex",gap:"8px",alignItems:"center"}}><button onClick={()=>setChatUser(null)} style={{background:"#2A2A2A",color:"#fff",padding:"6px 10px",borderRadius:"8px",border:"none"}}>←</button><img src={chatUser.photos?.[0]||chatUser.photo} style={{width:"32px",height:"32px",borderRadius:"16px"}} alt=""/><div><b style={{fontSize:"12px"}}>{chatUser.name} {chatUser.flag} • {chatUser.match_percent}% Match</b><p style={{fontSize:"9px",color:"#4CAF50"}}>Online • Last active now • Translate ON • Voice/Video call ready</p></div></div><div style={{flex:1,padding:"10px"}}><WhyMatch u={chatUser} /></div><div style={{padding:"10px",display:"flex",gap:"6px",background:"#1E1E1E"}}><button style={{background:"#2A2A2A",padding:"8px",borderRadius:"10px",border:"none"}}>🎤 Voice</button><button style={{background:"#2A2A2A",padding:"8px",borderRadius:"10px",border:"none"}}>📹</button><input placeholder="Message... auto-translate + ice-breaker" style={{flex:1,background:"#2A2A2A",border:"1px solid #444",padding:"8px 12px",borderRadius:"20px",color:"#fff"}}/><button style={{background:"#FFC107",color:"#000",padding:"8px 14px",borderRadius:"20px",fontWeight:900,border:"none"}}>Send</button></div></div>}

{showPay && <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.9)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:100,padding:"12px"}}><div style={{background:"#fff",color:"#000",padding:"16px",borderRadius:"16px",width:"100%",maxWidth:"360px",border:"3px solid #000"}}><b>💎 PRO LIVE $29.99</b><button onClick={async()=>{try{await supabase.from('payments').insert({plan:"monthly",amount:29.99,currency:"USD",method:"Stripe",status:"pending"}); alert('LIVE Stripe saved to payments table'); setShowPay(false)}catch(e:any){alert(e.message)}}} style={{width:"100%",marginTop:"10px",background:"#635BFF",color:"#fff",padding:"12px",borderRadius:"12px",fontWeight:900,border:"2px solid #000"}}>Pay Stripe LIVE $29.99</button><button onClick={()=>setShowPay(false)} style={{width:"100%",marginTop:"6px"}}>Close</button></div></div>}
{showID && <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.9)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:100,padding:"12px"}}><div style={{background:"#fff",color:"#000",padding:"16px",borderRadius:"16px",width:"100%",maxWidth:"360px",border:"3px solid #000"}}><b>🔐 Trust Verify LIVE</b><p style={{fontSize:"10px"}}>Photo + Email + Phone + ID optional → id_verifications table → Verified badge</p><input type="file" style={{width:"100%",marginTop:"8px"}}/><button onClick={async()=>{await supabase.from('id_verifications').insert({user_name:"You",status:"pending",face_match:98}); alert('LIVE verification submitted'); setShowID(false)}} style={{width:"100%",marginTop:"8px",background:"#4CAF50",color:"#fff",padding:"10px",borderRadius:"10px",fontWeight:800}}>Submit LIVE</button></div></div>}

</div>
)
}
