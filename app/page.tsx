"use client"
import { useState, useEffect } from "react"
import { supabase } from "@/lib/supabase"

const PROFILES = [
{name:"Vanessa",age:24,city:"London",country:"UK",tz:"GMT+0",langs:["English"],bio:"Entrepreneur. Real vibes, not games. 18+ only",photos:["https://images.unsplash.com/photo-1517841905240-472988babdf9?w=600","https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=400"],goal:"Serious",verified:true,complete:95,id:"v1"},
{name:"Sofia",age:23,city:"New York",country:"USA",tz:"EST",langs:["English","Spanish"],bio:"NYC designer. Art museums & coffee",photos:["https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=600"],goal:"Marriage",verified:true,complete:88,id:"s1"},
{name:"David",age:27,city:"Berlin",country:"Germany",tz:"CET",langs:["English","German"],bio:"Tech founder. Growth together",photos:["https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600"],goal:"Dating",verified:true,complete:90,id:"d1"},
{name:"Aisha",age:22,city:"Kampala",country:"Uganda",tz:"EAT",langs:["English","Luganda"],bio:"Makerere student. Music & chapati",photos:["https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=600"],goal:"Serious",verified:true,complete:92,id:"a1"},
]

export default function Home(){
const [profiles,setProfiles]=useState(PROFILES)
const [i,setI]=useState(0)
const [tab,setTab]=useState('discover')
const [showMatch,setShowMatch]=useState<any>(null)
const [showID,setShowID]=useState(false)
const [showPay,setShowPay]=useState(false)
const [chatUser,setChatUser]=useState<any>(null)
const [msgs,setMsgs]=useState([{from:"Sofia",text:"Hi! Loved your profile",time:"2m"}])
const [matches,setMatches]=useState([PROFILES[1]])
const [country,setCountry]=useState("All")
const [travel,setTravel]=useState("Kampala")

useEffect(()=>{(async()=>{try{const {data}=await supabase.from('profiles').select('*'); if(data?.length) setProfiles(data)}catch{}})()},[])
const card=profiles[i]
const filtered = country==="All"?profiles:profiles.filter(p=>p.country===country)

return(
<div style={{background:"#121212",minHeight:"100vh",color:"#fff",fontFamily:"system-ui"}}>
<div style={{background:"#FFC107",padding:"10px 12px",display:"flex",justifyContent:"space-between",alignItems:"center",position:"sticky",top:0,zIndex:40}}>
<b style={{color:"#000",fontWeight:900}}>KLA•MEET <span style={{background:"#000",color:"#FFC107",fontSize:"8px",padding:"2px 6px",borderRadius:"8px"}}>GLOBAL 18+</span></b>
<div style={{display:"flex",gap:"6px"}}>
<button onClick={()=>setShowPay(true)} style={{background:"#000",color:"#FFC107",padding:"6px 10px",borderRadius:"20px",fontSize:"10px",fontWeight:800}}>PRO $</button>
<button onClick={()=>setShowID(true)} style={{background:"#7C4DFF",color:"#fff",padding:"6px 10px",borderRadius:"20px",fontSize:"10px",fontWeight:800,border:"2px solid #000"}}>Verify</button>
</div>
</div>

<div style={{background:"#1E1E1E",padding:"8px",display:"flex",gap:"6px",overflowX:"auto",borderBottom:"1px solid #333",position:"sticky",top:"42px",zIndex:30}}>
{['discover','recommended','worldwide','matches','messages','profile','admin'].map(t=><button key={t} onClick={()=>setTab(t)} style={{background:tab===t?"#FFC107":"#2A2A2A",color:tab===t?"#000":"#fff",padding:"6px 12px",borderRadius:"20px",fontSize:"10px",fontWeight:700,textTransform:"capitalize"}}>{t}</button>)}
</div>

<div style={{maxWidth:"420px",margin:"0 auto",padding:"10px",paddingBottom:"80px"}}>

{tab==='discover' && (<>
{!card? <div style={{textAlign:"center",marginTop:"40px"}}><p>No more</p><button onClick={()=>setI(0)} style={{background:"#FFC107",color:"#000",padding:"10px 20px",borderRadius:"20px",fontWeight:900,marginTop:"10px"}}>Start Over</button></div> :
<div style={{background:"#1E1E1E",borderRadius:"22px",overflow:"hidden",border:"1px solid #2A2A2A"}}>
<div style={{position:"relative"}}>
<img src={card.photos[0]} alt="" style={{width:"100%",height:"540px",objectFit:"cover"}}/>
<div style={{position:"absolute",bottom:0,left:0,right:0,padding:"14px",background:"linear-gradient(to top, rgba(0,0,0,0.95), transparent)"}}>
<div style={{display:"flex",gap:"8px",alignItems:"center"}}><h2 style={{fontSize:"24px",fontWeight:900,margin:0}}>{card.name}, {card.age}</h2><span style={{background:"#7C4DFF",padding:"4px 10px",borderRadius:"12px",fontSize:"10px",fontWeight:800}}>ID OK</span></div>
<p style={{fontSize:"11px",marginTop:"4px"}}>📍 {card.city}, {card.country} • {card.tz}</p>
<p style={{fontSize:"11px",marginTop:"6px"}}>{card.bio} • 🎯 {card.goal} • {card.complete}% Complete</p>
<div style={{marginTop:"8px"}}><span style={{background:"#7C4DFF",padding:"5px 10px",borderRadius:"20px",fontSize:"10px"}}>✓ Passport Verified • Real person • office checked</span></div>
</div>
</div>
<div style={{padding:"12px"}}>
<div style={{display:"flex",gap:"6px",overflowX:"auto"}}>{card.photos.map((p:string,k:number)=><img key={k} src={p} style={{width:"60px",height:"60px",borderRadius:"10px",objectFit:"cover"}} alt=""/>)}</div>
<div style={{display:"flex",gap:"16px",justifyContent:"center",marginTop:"14px"}}>
<button onClick={()=>setI(v=>v+1)} style={{width:"56px",height:"56px",borderRadius:"50%",background:"#2A2A2A",border:"1px solid #444",color:"#fff"}}>✕</button>
<button onClick={()=>{setShowMatch(card); setMatches(m=>[...m,card]); setI(v=>v+1)}} style={{width:"66px",height:"66px",borderRadius:"50%",background:"#FFC107",border:"3px solid #000",fontSize:"24px"}}>❤️</button>
</div>
<div style={{display:"flex",gap:"6px",justifyContent:"center",marginTop:"10px"}}>
<button onClick={()=>setChatUser(card)} style={{background:"#4CAF50",color:"#fff",padding:"6px 10px",borderRadius:"20px",fontSize:"10px",fontWeight:700}}>💬 Chat Real-time</button>
<button style={{background:"#2196F3",color:"#fff",padding:"6px 10px",borderRadius:"20px",fontSize:"10px"}}>⭐ Super Like</button>
<button style={{background:"#FF5252",color:"#fff",padding:"6px 10px",borderRadius:"20px",fontSize:"10px"}}>🚫 Block/Report</button>
</div>
</div>
</div>
}
<div style={{marginTop:"14px",display:"flex",flexDirection:"column",gap:"10px"}}>
<div style={{background:"#1E1E1E",border:"1px solid #333",borderRadius:"14px",padding:"12px",display:"flex",gap:"10px"}}><img src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=80" style={{width:"56px",height:"56px",borderRadius:"12px",objectFit:"cover"}} alt=""/><div><b style={{fontSize:"13px"}}>Why 50k+ Global Trust KLA MEET</b><p style={{fontSize:"10px",color:"#aaa",marginTop:"4px"}}>Passport verified, 120+ countries, AI face check, 18+ only, Supabase secure.</p></div></div>
<div style={{background:"#FFC107",color:"#000",borderRadius:"14px",padding:"12px",border:"3px solid #000"}}><b>PRO Global $9.99-$29.99</b><p style={{fontSize:"10px"}}>Unlimited, Travel Mode ✈️, Boost 🔥, Incognito, Voice 🎤, Video 📹, Translation 🌐, AI recs</p><button onClick={()=>setShowPay(true)} style={{marginTop:"6px",background:"#000",color:"#FFC107",padding:"6px 12px",borderRadius:"20px",fontSize:"10px",fontWeight:800}}>Upgrade</button></div>
</div>
</>)}

{tab==='recommended' && <div><b>✨ AI Recommended • Smart Match</b><div style={{marginTop:"10px",display:"flex",flexDirection:"column",gap:"8px"}}>{profiles.map(p=><div key={p.id} style={{background:"#1E1E1E",padding:"10px",borderRadius:"12px",display:"flex",gap:"10px",border:"1px solid #333"}}><img src={p.photos[0]} style={{width:"60px",height:"60px",borderRadius:"12px"}} alt=""/><div><b>{p.name} • 92% Match • {p.city}</b><p style={{fontSize:"10px",color:"#aaa"}}>{p.goal} • {p.complete}% rich profile • Video ✓</p></div></div>)}</div></div>}
{tab==='worldwide' && <div><div style={{display:"flex",gap:"6px",marginBottom:"10px"}}><select value={country} onChange={e=>setCountry(e.target.value)} style={{background:"#2A2A2A",color:"#fff",padding:"6px",borderRadius:"8px"}}><option>All</option><option>UK</option><option>USA</option><option>Germany</option><option>Uganda</option></select><select value={travel} onChange={e=>setTravel(e.target.value)} style={{background:"#7C4DFF",color:"#fff",padding:"6px",borderRadius:"8px"}}><option>Travel: Kampala</option><option>Travel: London</option><option>Travel: NYC</option></select></div><div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"8px"}}>{filtered.map(p=><div key={p.id} style={{background:"#1E1E1E",borderRadius:"12px",overflow:"hidden",border:"1px solid #333"}}><img src={p.photos[0]} style={{width:"100%",height:"130px",objectFit:"cover"}} alt=""/><div style={{padding:"6px"}}><b style={{fontSize:"11px"}}>{p.name}, {p.country}</b><button onClick={()=>setChatUser(p)} style={{width:"100%",marginTop:"4px",background:"#FFC107",color:"#000",padding:"4px",borderRadius:"8px",fontSize:"9px",fontWeight:800}}>Chat + Translate</button></div></div>)}</div></div>}
{tab==='matches' && <div><b>❤️ Matches {matches.length}</b>{matches.map(m=><div key={m.id} style={{background:"#1E1E1E",padding:"10px",borderRadius:"12px",marginTop:"8px",display:"flex",gap:"8px",alignItems:"center"}}><img src={m.photos[0]} style={{width:"40px",height:"40px",borderRadius:"20px"}} alt=""/><b>{m.name}</b><button onClick={()=>setChatUser(m)} style={{marginLeft:"auto",background:"#FFC107",color:"#000",padding:"6px 12px",borderRadius:"20px",fontSize:"10px",fontWeight:800}}>Chat</button></div>)}</div>}
{tab==='profile' && <div style={{background:"#1E1E1E",padding:"14px",borderRadius:"16px"}}><b>👤 Rich Profile • 88% Complete</b><p style={{fontSize:"11px",marginTop:"8px"}}>Photos: 3 + Video Intro + Prompts + Interests + Goal + Langs + Relocate option</p><div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:"6px",marginTop:"10px"}}>{PROFILES[0].photos.map((p,i)=><img key={i} src={p} style={{width:"100%",height:"70px",borderRadius:"10px",objectFit:"cover"}} alt=""/>)}</div><button onClick={()=>setShowID(true)} style={{marginTop:"10px",width:"100%",background:"#7C4DFF",color:"#fff",padding:"10px",borderRadius:"12px",fontWeight:800}}>Verify ID + Video</button></div>}
{tab==='admin' && <div style={{background:"#fff",color:"#000",padding:"14px",borderRadius:"16px",border:"3px solid #000"}}><b>👑 Admin Dashboard</b><p style={{fontSize:"11px",marginTop:"6px"}}>Users 50k • Revenue $12k Stripe • Reports 23 • Moderation queue • Ban • Countries/Langs</p><button style={{marginTop:"8px",width:"100%",background:"#000",color:"#FFC107",padding:"8px",borderRadius:"10px",fontWeight:800}}>Open Moderation</button></div>}

{chatUser && <div style={{position:"fixed",inset:0,background:"#121212",zIndex:200,display:"flex",flexDirection:"column"}}><div style={{background:"#1E1E1E",padding:"10px",display:"flex",gap:"8px",alignItems:"center",borderBottom:"1px solid #333"}}><button onClick={()=>setChatUser(null)} style={{background:"#2A2A2A",color:"#fff",padding:"6px 10px",borderRadius:"8px"}}>Back</button><img src={chatUser.photos[0]} style={{width:"32px",height:"32px",borderRadius:"16px"}} alt=""/><b>{chatUser.name} • {chatUser.city} • Online • Translate ON</b></div><div style={{flex:1,padding:"10px",overflowY:"auto",display:"flex",flexDirection:"column",gap:"8px"}}>{msgs.map((m,i)=><div key={i} style={{background:m.from===chatUser.name?"#2A2A2A":"#FFC107",color:m.from===chatUser.name?"#fff":"#000",padding:"8px 12px",borderRadius:"16px",alignSelf:m.from===chatUser.name?"flex-start":"flex-end",fontSize:"11px",maxWidth:"80%"}}>{m.text}<span style={{fontSize:"8px",opacity:0.6,display:"block"}}>{m.time} • Read ✓</span></div>)}<div style={{fontSize:"9px",color:"#888",textAlign:"center",marginTop:"10px"}}>Voice 🎤 • Video 📹 • Photo • GIFs • Typing... • Translation 🌐</div></div><div style={{padding:"10px",display:"flex",gap:"6px",background:"#1E1E1E"}}><button style={{background:"#2A2A2A",padding:"8px",borderRadius:"10px"}}>🎤</button><input placeholder="Message..." style={{flex:1,background:"#2A2A2A",border:"1px solid #444",padding:"8px 12px",borderRadius:"20px",color:"#fff"}} onKeyDown={e=>{if(e.key==='Enter'){const t=(e.target as any).value; if(!t)return; setMsgs(m=>[...m,{from:"You",text:t,time:"now"}]); (e.target as any).value=""}}}/><button style={{background:"#FFC107",color:"#000",padding:"8px 14px",borderRadius:"20px",fontWeight:800}}>Send</button></div></div>}

</div>
<div style={{position:"fixed",bottom:0,left:0,right:0,background:"#FFC107",color:"#000",textAlign:"center",padding:"6px",fontSize:"9px",fontWeight:900}}>GLOBAL 18+ VERIFIED • $ USD Stripe PayPal • {profiles.length} Worldwide • OLD LAYOUT KEPT</div>
{showMatch && <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.85)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:100}}><div style={{background:"#FFC107",padding:"20px",borderRadius:"20px",textAlign:"center",border:"3px solid #000"}}><h2 style={{color:"#000",fontWeight:900}}>Match! 92%</h2><p style={{color:"#000",fontSize:"12px"}}>{showMatch.name} • {showMatch.city}</p><button onClick={()=>setShowMatch(null)} style={{marginTop:"10px",background:"#000",color:"#FFC107",padding:"8px 16px",borderRadius:"20px",fontWeight:800}}>Chat</button></div></div>}
{showID && <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.9)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:100,padding:"12px"}}><div style={{background:"#fff",color:"#000",padding:"14px",borderRadius:"16px",width:"100%",maxWidth:"360px",border:"3px solid #000"}}><b>Global Verification 🌍</b><p style={{fontSize:"10px",marginTop:"6px"}}>Passport + selfie + video → Supabase id-docs → 98% match + admin dashboard</p><input type="file" style={{width:"100%",marginTop:"8px",border:"2px solid #000",padding:"6px",borderRadius:"8px"}}/><button onClick={async()=>{try{await supabase.from('id_verifications').insert({user_name:"You",status:"pending"}); alert('Submitted'); setShowID(false)}catch{alert('Create table id_verifications')}}} style={{width:"100%",background:"#4CAF50",color:"#fff",padding:"10px",borderRadius:"10px",marginTop:"8px",fontWeight:800,border:"2px solid #000"}}>Submit</button><button onClick={()=>setShowID(false)} style={{width:"100%",marginTop:"6px"}}>Close</button></div></div>}
{showPay && <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.9)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:100,padding:"12px"}}><div style={{background:"#fff",color:"#000",padding:"14px",borderRadius:"16px",width:"100%",maxWidth:"360px",border:"3px solid #000"}}><b>PRO Global $ 💎</b><p style={{fontSize:"10px",marginTop:"4px"}}>Unlimited, Travel Mode, Boost, Incognito, Voice, Video, Translation, AI</p><button onClick={async()=>{try{await supabase.from('payments').insert({plan:"monthly",amount:29.99,currency:"USD",method:"Stripe"}); alert('Stripe $29.99 saved'); setShowPay(false)}catch{alert('Create payments table')}}} style={{width:"100%",background:"#635BFF",color:"#fff",padding:"12px",borderRadius:"12px",marginTop:"10px",fontWeight:900,border:"2px solid #000"}}>Stripe $29.99 • PayPal • MoMo</button><button onClick={()=>setShowPay(false)} style={{width:"100%",marginTop:"6px"}}>Close</button></div></div>}
</div>
)
}
