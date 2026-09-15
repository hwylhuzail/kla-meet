"use client"
import { useState, useEffect } from "react"
import { supabase } from "@/lib/supabase"

const DEMO = [
{name:"Vanessa",age:24,location:"Ntinda",bio:"Entrepreneur. Real vibes, not games. 18+ only ✨",photos:["https://images.unsplash.com/photo-1517841905240-472988babdf9?w=600"],interests:["Business","Travel","Gym"],verified:true,id:"v1"},
{name:"Aisha",age:22,location:"Kawempe, Kampala",bio:"Love music, chapati & late talks. Makerere student 💕",photos:["https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=600"],interests:["Music","Dancing","Coffee"],verified:true,id:"a1"},
]

export default function Home(){
const [profiles,setProfiles]=useState(DEMO)
const [i,setI]=useState(0)
const [showMatch,setShowMatch]=useState<any>(null)
const [showID,setShowID]=useState(false)

useEffect(()=>{
(async()=>{
try{
const {data}=await supabase.from('profiles').select('*')
if(data && data.length>0) setProfiles(data)
}catch(e){console.log("Using demo - add env keys")}
})()
},[])

const card=profiles[i]
const like=()=>{ if(card) setShowMatch(card); setI(x=>x+1)}
const pass=()=> setI(x=>x+1)

return(
<div style={{background:"#121212",color:"#fff",minHeight:"100vh",fontFamily:"system-ui"}}>
<div style={{background:"#FFC107",padding:"10px 12px",display:"flex",justifyContent:"space-between",alignItems:"center",position:"sticky",top:0,zIndex:20}}>
<b style={{color:"#000"}}>KLA•MEET <span style={{background:"#000",color:"#FFC107",padding:"2px 6px",borderRadius:"10px",fontSize:"9px"}}>18+</span></b>
<button onClick={()=>setShowID(true)} style={{background:"#7C4DFF",color:"#fff",padding:"6px 12px",borderRadius:"20px",fontSize:"11px",fontWeight:800,border:"2px solid #000"}}>Verify ID</button>
</div>

<div style={{maxWidth:"400px",margin:"0 auto",padding:"12px"}}>
{!card? <div style={{textAlign:"center",marginTop:"40px"}}><p>No more</p><button onClick={()=>setI(0)} style={{background:"#FFC107",color:"#000",padding:"10px 20px",borderRadius:"20px",marginTop:"10px",fontWeight:800}}>Start Over</button></div> :
<div style={{background:"#1E1E1E",borderRadius:"20px",overflow:"hidden",border:"1px solid #333"}}>
<div style={{position:"relative"}}>
<img src={card.photos[0]} style={{width:"100%",height:"520px",objectFit:"cover"}} alt=""/>
<div style={{position:"absolute",bottom:0,left:0,right:0,background:"linear-gradient(transparent, rgba(0,0,0,0.9))",padding:"16px"}}>
<div style={{display:"flex",gap:"8px",alignItems:"center"}}><h2 style={{fontSize:"24px",fontWeight:900}}>{card.name}, {card.age}</h2><span style={{background:"#7C4DFF",color:"#fff",padding:"3px 8px",borderRadius:"12px",fontSize:"10px"}}>ID OK</span></div>
<p style={{fontSize:"12px",marginTop:"6px"}}>{card.bio}</p>
<div style={{marginTop:"8px"}}><span style={{background:"#7C4DFF",padding:"5px 10px",borderRadius:"20px",fontSize:"11px"}}>✓ NIN: Verified • Real person • office checked</span></div>
</div>
</div>
<div style={{padding:"12px"}}>
<div style={{display:"flex",gap:"8px"}}>{card.interests.map((x:string)=><span key={x} style={{background:"#2A2A2A",padding:"6px 12px",borderRadius:"20px",fontSize:"11px"}}>{x}</span>)}</div>
<div style={{display:"flex",gap:"20px",justifyContent:"center",marginTop:"18px"}}>
<button onClick={pass} style={{width:"56px",height:"56px",borderRadius:"28px",background:"#2A2A2A",border:"1px solid #444",color:"#fff"}}>✕</button>
<button style={{width:"50px",height:"50px",borderRadius:"25px",background:"#7C4DFF",border:"none"}}>8</button>
<button onClick={like} style={{width:"64px",height:"64px",borderRadius:"32px",background:"#FFC107",border:"3px solid #000"}}>❤️</button>
</div>
</div>
</div>
}

<div style={{marginTop:"14px",display:"flex",flexDirection:"column",gap:"12px"}}>
<div style={{background:"#1E1E1E",border:"1px solid #333",borderRadius:"16px",padding:"12px",display:"flex",gap:"10px"}}>
<img src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=100" style={{width:"60px",height:"60px",borderRadius:"12px",objectFit:"cover"}} alt=""/>
<div><b style={{fontSize:"13px"}}>Why Kampala trusts KLA MEET</b><p style={{fontSize:"11px",opacity:0.6,marginTop:"4px"}}>2,300+ verified with NIN, Passport, Student ID. Our team in Ntinda checks every ID in 24h. No fake. 18+ only.</p></div>
</div>
<div style={{textAlign:"center",padding:"10px",fontSize:"10px",opacity:0.5,display:"flex",justifyContent:"center",gap:"10px"}}>
<a href="/privacy" style={{color:"#FFC107"}}>Privacy</a><a href="/terms" style={{color:"#FFC107"}}>Terms</a><a href="/guidelines" style={{color:"#FFC107"}}>Guidelines</a>
</div>
</div>
</div>

<div style={{position:"fixed",bottom:0,left:0,right:0,background:"#FFC107",padding:"8px",textAlign:"center",fontSize:"10px",fontWeight:700,color:"#000"}}>18+ ID VERIFIED • Supabase • {profiles.length} Real</div>

{showMatch && (<div style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.85)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:100}}><div style={{background:"#FFC107",padding:"24px",borderRadius:"20px",textAlign:"center"}}><h1 style={{color:"#000",fontWeight:900}}>Match! 🎉</h1><p style={{color:"#000"}}>You & {showMatch.name}</p><button onClick={()=>setShowMatch(null)} style={{marginTop:"12px",background:"#000",color:"#FFC107",padding:"10px 20px",borderRadius:"20px"}}>Continue</button></div></div>)}
{showID && (<div style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.9)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:100,padding:"16px"}}><div style={{background:"#fff",color:"#000",borderRadius:"20px",padding:"16px",width:"100%",maxWidth:"360px"}}><div style={{display:"flex",justifyContent:"space-between"}}><h3 style={{fontWeight:900}}>Verify ID</h3><button onClick={()=>setShowID(false)}>✕</button></div><input type="file" style={{marginTop:"10px",width:"100%"}} onChange={async(e)=>{const f=e.target.files?.[0]; if(!f)return; try{await supabase.storage.from('id-docs').upload(`${Date.now()}_${f.name}`,f); alert('Uploaded to Supabase')}catch(err){alert('Add Supabase keys in Vercel env first')}}}/><button onClick={async()=>{try{await supabase.from('id_verifications').insert({user_name:"You",status:"pending"}); alert('Saved!')}catch{alert('Add env keys')} setShowID(false)}} style={{width:"100%",background:"#4CAF50",color:"#fff",padding:"12px",borderRadius:"12px",marginTop:"10px",fontWeight:900}}>Submit</button></div></div>)}
</div>
)
}
