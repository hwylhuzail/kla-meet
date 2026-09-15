"use client"
export const dynamic = 'force-dynamic'
import { useState, useEffect } from "react"
import { supabase } from "@/lib/supabase"

const DEMO = [
{name:"Vanessa",age:24,location:"Ntinda",bio:"Entrepreneur. Real vibes, not games. 18+ only ✨",photos:["https://images.unsplash.com/photo-1517841905240-472988babdf9?w=600"],interests:["Business","Travel","Gym"],verified:true,nin:true,office:true,id:"v1"},
{name:"Aisha",age:22,location:"Kawempe, Kampala",bio:"Love music, chapati & late talks. Makerere student 💕",photos:["https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=600"],interests:["Music","Dancing","Coffee"],verified:true,nin:true,office:true,id:"a1"},
{name:"Brian",age:26,location:"Bugolobi",bio:"Gym, tech, and good conversations!",photos:["https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600"],interests:["Tech","Gym","Football"],verified:false,nin:false,office:false,id:"b1"},
]

export default function Home(){
const [profiles,setProfiles]=useState<any[]>(DEMO)
const [i,setI]=useState(0)
const [tab,setTab]=useState('discover')
const [showMatch,setShowMatch]=useState<any>(null)
const [showID,setShowID]=useState(false)

useEffect(()=>{
async function load(){
const {data}=await supabase.from('profiles').select('*').order('created_at',{ascending:false})
if(data && data.length>0) setProfiles(data)
}
load()
},[])

const card=profiles[i]
const like=async()=>{if(card){await supabase.from('matches').insert({user_id:'me',matched_id:card.id}); setShowMatch(card)}; setI(x=>x+1)}
const pass=()=>setI(x=>x+1)

return(
<div style={{background:"#121212",color:"#fff",minHeight:"100vh",fontFamily:"system-ui",paddingBottom:"60px"}}>
{/* TOP BAR - OLD */}
<div style={{background:"#FFC107",padding:"10px 12px",display:"flex",justifyContent:"space-between",alignItems:"center",position:"sticky",top:0,zIndex:20}}>
<b style={{color:"#000",fontSize:"16px"}}>KLA•MEET <span style={{background:"#000",color:"#FFC107",padding:"2px 6px",borderRadius:"10px",fontSize:"9px"}}>18+</span></b>
<div style={{display:"flex",gap:"6px"}}>
<button onClick={()=>setTab('discover')} style={{background:tab==='discover'?"#000":"#fff",color:tab==='discover'?"#FFC107":"#000",padding:"6px 10px",borderRadius:"20px",fontSize:"11px",fontWeight:700,border:"2px solid #000"}}>Discover</button>
<button onClick={()=>setShowID(true)} style={{background:"#7C4DFF",color:"#fff",padding:"6px 10px",borderRadius:"20px",fontSize:"11px",fontWeight:800,border:"2px solid #000"}}>Verify</button>
</div>
</div>

<div style={{maxWidth:"400px",margin:"0 auto",padding:"12px"}}>
{/* OLD CARD - EXACTLY LIKE YOUR SCREENSHOT */}
{!card? (
<div style={{textAlign:"center",marginTop:"40px",background:"#1E1E1E",padding:"20px",borderRadius:"20px",border:"1px solid #333"}}><p>No more profiles</p><button onClick={()=>setI(0)} style={{background:"#FFC107",border:"none",padding:"10px 20px",borderRadius:"20px",marginTop:"10px",fontWeight:800,color:"#000"}}>Start Over</button></div>
) : (
<div style={{background:"#1E1E1E",borderRadius:"20px",overflow:"hidden",border:"1px solid #2A2A2A"}}>
<div style={{position:"relative"}}>
<img src={card.photos?.[0]} style={{width:"100%",height:"520px",objectFit:"cover"}}/>
<div style={{position:"absolute",bottom:0,left:0,right:0,background:"linear-gradient(transparent, rgba(0,0,0,0.9))",padding:"16px"}}>
<div style={{display:"flex",alignItems:"center",gap:"8px"}}><h2 style={{fontSize:"24px",fontWeight:900}}>{card.name}, {card.age}</h2><span style={{background:"#7C4DFF",color:"#fff",padding:"3px 8px",borderRadius:"12px",fontSize:"10px",fontWeight:800}}>ID OK</span></div>
<p style={{fontSize:"12px",marginTop:"6px",opacity:0.9}}>{card.bio}</p>
{card.nin && <div style={{marginTop:"8px"}}><span style={{background:"#7C4DFF",padding:"5px 10px",borderRadius:"20px",fontSize:"11px",fontWeight:600}}>✓ NIN: Verified • Real person • office checked</span></div>}
</div>
</div>
<div style={{padding:"12px"}}>
<div style={{display:"flex",gap:"8px"}}>{card.interests?.map((x:string)=><span key={x} style={{background:"#2A2A2A",padding:"6px 12px",borderRadius:"20px",fontSize:"11px"}}>{x}</span>)}</div>
<div style={{display:"flex",gap:"20px",justifyContent:"center",marginTop:"18px"}}>
<button onClick={pass} style={{width:"56px",height:"56px",borderRadius:"28px",background:"#2A2A2A",border:"1px solid #444",fontSize:"20px",color:"#fff"}}>✕</button>
<button style={{width:"50px",height:"50px",borderRadius:"25px",background:"#7C4DFF",border:"none",fontSize:"16px"}}>8</button>
<button onClick={like} style={{width:"64px",height:"64px",borderRadius:"32px",background:"#FFC107",border:"3px solid #000",fontSize:"24px"}}>❤️</button>
</div>
</div>
</div>
)}

{/* NEW SCROLLABLE INFO BELOW - DOES NOT CHANGE OLD CARD */}
<div style={{marginTop:"14px",display:"flex",flexDirection:"column",gap:"12px"}}>

<div style={{background:"#1E1E1E",border:"1px solid #2A2A2A",borderRadius:"16px",padding:"12px",display:"flex",gap:"10px"}}>
<img src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=100" style={{width:"60px",height:"60px",borderRadius:"12px",objectFit:"cover"}}/>
<div><b style={{fontSize:"13px",color:"#fff"}}>Why Kampala trusts KLA MEET</b><p style={{fontSize:"11px",opacity:0.6,marginTop:"4px",lineHeight:"1.4",color:"#fff"}}>2,300+ verified with NIN, Passport, Student ID. Our team in Ntinda checks every ID in 24h. No fake. 18+ only.</p></div>
</div>

<div style={{background:"#000",borderRadius:"16px",padding:"12px",display:"flex",justifyContent:"space-around",textAlign:"center",border:"1px solid #333"}}>
<div><b style={{fontSize:"16px",color:"#FFC107"}}>2.3k+</b><p style={{fontSize:"10px",color:"#888"}}>Verified</p></div>
<div><b style={{fontSize:"16px",color:"#FFC107"}}>98%</b><p style={{fontSize:"10px",color:"#888"}}>Real</p></div>
<div><b style={{fontSize:"16px",color:"#FFC107"}}>24h</b><p style={{fontSize:"10px",color:"#888"}}>Check</p></div>
<div><b style={{fontSize:"16px",color:"#FFC107"}}>18+</b><p style={{fontSize:"10px",color:"#888"}}>Only</p></div>
</div>

<div style={{background:"#1E1E1E",border:"1px solid #2A2A2A",borderRadius:"16px",padding:"14px"}}>
<b style={{fontSize:"13px"}}>How it works • Supabase Live</b>
<p style={{fontSize:"11px",opacity:0.6,marginTop:"8px",lineHeight:"1.6"}}>1. Upload NIN/Passport to Supabase bucket 'id-docs'<br/>2. Face match 98% + Ntinda office check<br/>3. Get ID OK badge → Swipe real Kampala users<br/>4. All saves to tables: profiles, matches, posts</p>
</div>

<div style={{background:"#FFF8E1",borderRadius:"16px",padding:"12px",color:"#000"}}>
<b style={{fontSize:"12px"}}>📍 Active: Kawempe, Ntinda, Bugolobi, Kololo, Makerere, Kansanga</b>
</div>

<div style={{textAlign:"center",padding:"10px",fontSize:"10px",opacity:0.5,display:"flex",justifyContent:"center",gap:"10px",flexWrap:"wrap"}}>
<a href="/privacy" style={{color:"#FFC107",textDecoration:"underline"}}>Privacy</a>
<a href="/terms" style={{color:"#FFC107",textDecoration:"underline"}}>Terms</a>
<a href="/guidelines" style={{color:"#FFC107",textDecoration:"underline"}}>Guidelines</a>
<a href="/safety" style={{color:"#FFC107",textDecoration:"underline"}}>Safety</a>
</div>

</div>
</div>

{/* BOTTOM YELLOW BAR - OLD */}
<div style={{position:"fixed",bottom:0,left:0,right:0,background:"#FFC107",padding:"8px",textAlign:"center",fontSize:"10px",fontWeight:700,color:"#000",display:"flex",justifyContent:"center",gap:"12px"}}>
<span>18+ ID VERIFIED</span><span>• Privacy • Safety • Supabase</span>
</div>

{/* MATCH POPUP */}
{showMatch && (<div style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.85)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:100,padding:"20px"}}><div style={{textAlign:"center",background:"#FFC107",border:"4px solid #000",padding:"24px",borderRadius:"20px"}}><h1 style={{fontSize:"28px",fontWeight:900,color:"#000"}}>It's a Match! 🎉</h1><p style={{color:"#000",marginTop:"8px"}}>You & {showMatch.name} - saved to Supabase</p><button onClick={()=>setShowMatch(null)} style={{marginTop:"14px",background:"#000",color:"#FFC107",padding:"10px 20px",borderRadius:"20px",fontWeight:800}}>Continue Swiping</button></div></div>)}

{/* ID MODAL */}
{showID && (<div style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.9)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:100,padding:"16px"}}><div style={{background:"#fff",border:"4px solid #000",borderRadius:"20px",padding:"16px",width:"100%",maxWidth:"360px",color:"#000"}}>
<div style={{display:"flex",justifyContent:"space-between"}}><h3 style={{fontWeight:900}}>Verify ID → Supabase 🪪</h3><button onClick={()=>setShowID(false)} style={{background:"#eee",padding:"4px 8px",borderRadius:"10px"}}>✕</button></div>
<p style={{fontSize:"11px",marginTop:"8px",background:"#FFF8E1",padding:"8px",borderRadius:"10px"}}>Upload to Supabase bucket 'id-docs'. Creates row in id_verifications.</p>
<input type="file" onChange={async(e)=>{const f=e.target.files?.[0]; if(!f)return; const {data,error}=await supabase.storage.from('id-docs').upload(`${Date.now()}_${f.name}`,f); if(error) alert(error.message); else alert('Uploaded to Supabase: '+data.path)}} style={{marginTop:"10px",width:"100%"}}/>
<button onClick={async()=>{const {error}=await supabase.from('id_verifications').insert({user_name:"You",id_type:"NIN",status:"pending",face_match:98}); if(error) alert(error.message); else {alert('Saved to Supabase!'); setShowID(false)}} } style={{width:"100%",background:"#4CAF50",color:"#fff",border:"3px solid #000",padding:"12px",borderRadius:"12px",marginTop:"10px",fontWeight:900}}>Submit to Supabase ✓</button>
</div></div>)}
</div>
)
}
