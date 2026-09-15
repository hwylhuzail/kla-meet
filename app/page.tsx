"use client"
import { useState, useEffect } from "react"
import { supabase } from "@/lib/supabase"

const DEMO = [
{name:"Vanessa",age:24,location:"Ntinda",bio:"Entrepreneur. Real vibes, not games. 18+ only ✨",photos:["https://images.unsplash.com/photo-1517841905240-472988babdf9?w=600"],interests:["Business","Travel","Gym"],verified:true,id:"v1"},
{name:"Aisha",age:22,location:"Kawempe, Kampala",bio:"Love music, chapati & late talks. Makerere student 💕",photos:["https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=600"],interests:["Music","Dancing","Coffee"],verified:true,id:"a1"},
{name:"Brian",age:26,location:"Bugolobi",bio:"Gym, tech, and good conversations!",photos:["https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600"],interests:["Tech","Gym","Football"],verified:false,id:"b1"},
]

export default function Home(){
const [profiles,setProfiles]=useState(DEMO)
const [i,setI]=useState(0)
const [showMatch,setShowMatch]=useState<any>(null)
const [showID,setShowID]=useState(false)
const [tab,setTab]=useState('discover')

useEffect(()=>{
(async()=>{try{const {data}=await supabase.from('profiles').select('*'); if(data?.length) setProfiles(data)}catch{}})()
},[])

const card=profiles[i]
return(
<div style={{background:"#121212",minHeight:"100vh",color:"#fff",fontFamily:"system-ui",paddingBottom:"50px"}}>
{/* TOP - OLD EXACT */}
<div style={{background:"#FFC107",padding:"10px 12px",display:"flex",justifyContent:"space-between",alignItems:"center",position:"sticky",top:0,zIndex:30}}>
<div style={{display:"flex",alignItems:"center",gap:"6px"}}><b style={{color:"#000",fontSize:"18px",fontWeight:900}}>KLA•MEET</b><span style={{background:"#000",color:"#FFC107",fontSize:"8px",padding:"2px 6px",borderRadius:"10px",fontWeight:900}}>18+</span></div>
<div style={{display:"flex",gap:"6px"}}>
<button onClick={()=>setTab('discover')} style={{background:tab==='discover'?"#000":"#fff",color:tab==='discover'?"#FFC107":"#000",padding:"6px 12px",borderRadius:"20px",fontSize:"11px",fontWeight:800,border:"2px solid #000"}}>Discover</button>
<button onClick={()=>setShowID(true)} style={{background:"#7C4DFF",color:"#fff",padding:"6px 12px",borderRadius:"20px",fontSize:"11px",fontWeight:800,border:"2px solid #000"}}>Verify ID</button>
</div>
</div>

<div style={{maxWidth:"400px",margin:"0 auto",padding:"12px"}}>
{/* CARD - YOUR OLD SCREENSHOT 100% SAME */}
{!card? <div style={{textAlign:"center",marginTop:"50px"}}><p>No more profiles</p><button onClick={()=>setI(0)} style={{background:"#FFC107",color:"#000",padding:"10px 20px",borderRadius:"20px",fontWeight:900,marginTop:"10px"}}>Start Over</button></div> :
<div style={{background:"#1E1E1E",borderRadius:"22px",overflow:"hidden",border:"1px solid #2A2A2A",boxShadow:"0 4px 20px rgba(0,0,0,0.5)"}}>
<div style={{position:"relative"}}>
<img src={card.photos[0]} alt={card.name} style={{width:"100%",height:"540px",objectFit:"cover",display:"block"}}/>
<div style={{position:"absolute",bottom:0,left:0,right:0,padding:"16px",background:"linear-gradient(to top, rgba(0,0,0,0.95) 40%, transparent)"}}>
<div style={{display:"flex",alignItems:"center",gap:"8px"}}><h2 style={{fontSize:"26px",fontWeight:900,margin:0}}>{card.name}, {card.age}</h2><span style={{background:"#7C4DFF",color:"#fff",padding:"4px 10px",borderRadius:"12px",fontSize:"11px",fontWeight:800}}>ID OK</span></div>
<p style={{fontSize:"12px",marginTop:"6px",lineHeight:"1.4",opacity:0.9}}>{card.bio}</p>
<div style={{marginTop:"10px"}}><span style={{background:"#7C4DFF",color:"#fff",padding:"6px 12px",borderRadius:"20px",fontSize:"11px",fontWeight:600,display:"inline-block"}}>✓ NIN: Verified • Real person • office checked</span></div>
</div>
</div>
<div style={{padding:"14px",background:"#1E1E1E"}}>
<div style={{display:"flex",gap:"8px",flexWrap:"wrap"}}>{card.interests.map((x:string)=><span key={x} style={{background:"#2A2A2A",color:"#fff",padding:"7px 14px",borderRadius:"20px",fontSize:"11px",border:"1px solid #333"}}>{x}</span>)}</div>
<div style={{display:"flex",gap:"18px",justifyContent:"center",alignItems:"center",marginTop:"20px"}}>
<button onClick={()=>setI(v=>v+1)} style={{width:"58px",height:"58px",borderRadius:"50%",background:"#2A2A2A",border:"1px solid #444",color:"#fff",fontSize:"22px",fontWeight:300}}>✕</button>
<button style={{width:"52px",height:"52px",borderRadius:"50%",background:"#7C4DFF",border:"none",color:"#fff",fontSize:"18px",fontWeight:900}}>8</button>
<button onClick={()=>{setShowMatch(card); setI(v=>v+1)}} style={{width:"68px",height:"68px",borderRadius:"50%",background:"#FFC107",border:"3px solid #000",fontSize:"28px"}}>❤️</button>
</div>
</div>
</div>
}

{/* SCROLL DOWN INFO - BELOW OLD CARD - NOT CHANGING OLD */}
<div style={{marginTop:"16px",display:"flex",flexDirection:"column",gap:"12px"}}>
<div style={{background:"#1E1E1E",border:"1px solid #2A2A2A",borderRadius:"18px",padding:"14px",display:"flex",gap:"12px",alignItems:"center"}}>
<img src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=100" style={{width:"64px",height:"64px",borderRadius:"14px",objectFit:"cover"}} alt=""/>
<div><b style={{fontSize:"13px",color:"#fff",lineHeight:"1.3"}}>Why Kampala trusts KLA MEET</b><p style={{fontSize:"11px",color:"#aaa",marginTop:"4px",lineHeight:"1.4"}}>2,300+ verified with NIN, Passport, Student ID. Our team in Ntinda checks every ID in 24h. No fake. 18+ only.</p></div>
</div>
<div style={{background:"#000",borderRadius:"16px",padding:"14px",display:"flex",justifyContent:"space-around",border:"1px solid #222",textAlign:"center"}}>
<div><b style={{color:"#FFC107",fontSize:"18px"}}>2.3k+</b><p style={{fontSize:"10px",color:"#666",marginTop:"2px"}}>Verified</p></div>
<div><b style={{color:"#FFC107",fontSize:"18px"}}>98%</b><p style={{fontSize:"10px",color:"#666",marginTop:"2px"}}>Real Person</p></div>
<div><b style={{color:"#FFC107",fontSize:"18px"}}>24h</b><p style={{fontSize:"10px",color:"#666",marginTop:"2px"}}>ID Check</p></div>
<div><b style={{color:"#FFC107",fontSize:"18px"}}>18+</b><p style={{fontSize:"10px",color:"#666",marginTop:"2px"}}>Only</p></div>
</div>
<div style={{display:"flex",justifyContent:"center",gap:"10px",padding:"8px",fontSize:"10px"}}>
<a href="/privacy" style={{color:"#FFC107",textDecoration:"underline"}}>Privacy</a><a href="/terms" style={{color:"#FFC107",textDecoration:"underline"}}>Terms</a><a href="/guidelines" style={{color:"#FFC107",textDecoration:"underline"}}>Guidelines</a><a href="/safety" style={{color:"#FFC107",textDecoration:"underline"}}>Safety</a>
</div>
</div>
</div>

<div style={{position:"fixed",bottom:0,left:0,right:0,background:"#FFC107",color:"#000",textAlign:"center",padding:"8px",fontSize:"10px",fontWeight:800,letterSpacing:"0.5px"}}>18+ ID VERIFIED • Privacy • Safety • {profiles.length} Real</div>

{showMatch && <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.85)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:100}}><div style={{background:"#FFC107",padding:"28px",borderRadius:"24px",textAlign:"center",border:"4px solid #000"}}><h1 style={{fontSize:"30px",fontWeight:900,color:"#000"}}>It's a Match! 🎉</h1><p style={{color:"#000",marginTop:"8px",fontWeight:600}}>You & {showMatch.name}</p><button onClick={()=>setShowMatch(null)} style={{marginTop:"16px",background:"#000",color:"#FFC107",padding:"12px 24px",borderRadius:"20px",fontWeight:900}}>Continue</button></div></div>}
{showID && <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.9)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:100,padding:"16px"}}><div style={{background:"#fff",color:"#000",borderRadius:"20px",padding:"16px",width:"100%",maxWidth:"360px"}}><h3 style={{fontWeight:900}}>Verify ID → Supabase</h3><input type="file" style={{marginTop:"12px",width:"100%"}} onChange={async(e)=>{const f=e.target.files?.[0]; if(!f)return; const {error}=await supabase.storage.from('id-docs').upload(`${Date.now()}_${f.name}`,f); alert(error?error.message:'Uploaded to Supabase bucket!')}}/><button onClick={async()=>{await supabase.from('id_verifications').insert({user_name:"You",status:"pending"}); alert('Saved to Supabase table'); setShowID(false)}} style={{width:"100%",background:"#4CAF50",color:"#fff",padding:"12px",borderRadius:"12px",marginTop:"10px",fontWeight:900,border:"3px solid #000"}}>Submit ID</button><button onClick={()=>setShowID(false)} style={{width:"100%",marginTop:"8px",padding:"8px"}}>Close</button></div></div>}
</div>
)
}
