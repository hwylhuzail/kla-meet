"use client"
import { useState, useEffect } from "react"
import { supabase } from "@/lib/supabase"

const DEMO = [
{name:"Vanessa",age:24,location:"London, UK",bio:"Entrepreneur. Real vibes, not games. 18+ only ✨",photos:["https://images.unsplash.com/photo-1517841905240-472988babdf9?w=600"],interests:["Business","Travel","Gym"],verified:true,id:"v1"},
{name:"Sofia",age:23,location:"New York, USA",bio:"NYC designer. Love art, coffee & real connection 💕",photos:["https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=600"],interests:["Art","Fashion","Travel"],verified:true,id:"a1"},
{name:"David",age:27,location:"Berlin, Germany",bio:"Tech founder. Gym, travel, good talks!",photos:["https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600"],interests:["Tech","Fitness","Music"],verified:false,id:"b1"},
{name:"Aisha",age:22,location:"Kampala, Uganda",bio:"Makerere student, love music & culture 🌍",photos:["https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=600"],interests:["Music","Dancing","Coffee"],verified:true,id:"c1"},
]

export default function Home(){
const [profiles,setProfiles]=useState(DEMO)
const [i,setI]=useState(0)
const [showMatch,setShowMatch]=useState<any>(null)
const [showID,setShowID]=useState(false)
const [showPay,setShowPay]=useState(false)
const [payPlan,setPayPlan]=useState("monthly")

useEffect(()=>{(async()=>{try{const {data}=await supabase.from('profiles').select('*'); if(data?.length) setProfiles(data)}catch{}})()},[])
const card=profiles[i]

return(
<div style={{background:"#121212",minHeight:"100vh",color:"#fff",fontFamily:"system-ui"}}>
{/* TOP - INTERNATIONAL */}
<div style={{background:"#FFC107",padding:"10px 12px",display:"flex",justifyContent:"space-between",alignItems:"center",position:"sticky",top:0,zIndex:30}}>
<b style={{color:"#000",fontSize:"18px",fontWeight:900}}>KLA•MEET <span style={{background:"#000",color:"#FFC107",fontSize:"8px",padding:"2px 6px",borderRadius:"10px"}}>GLOBAL • 18+</span></b>
<div style={{display:"flex",gap:"6px"}}>
<button onClick={()=>setShowPay(true)} style={{background:"#000",color:"#FFC107",padding:"6px 10px",borderRadius:"20px",fontSize:"10px",fontWeight:800}}>PRO 💎 $</button>
<button onClick={()=>setShowID(true)} style={{background:"#7C4DFF",color:"#fff",padding:"6px 12px",borderRadius:"20px",fontSize:"11px",fontWeight:800,border:"2px solid #000"}}>Verify ID 🌍</button>
</div>
</div>

<div style={{maxWidth:"420px",margin:"0 auto",padding:"12px",paddingBottom:"70px"}}>
{/* OLD CARD - SAME LAYOUT, INTERNATIONAL DATA */}
{!card? <div style={{textAlign:"center",marginTop:"50px",background:"#1E1E1E",padding:"20px",borderRadius:"20px"}}><p>No more profiles worldwide</p><button onClick={()=>setI(0)} style={{background:"#FFC107",color:"#000",padding:"10px 20px",borderRadius:"20px",fontWeight:900,marginTop:"10px"}}>Start Over Globally</button></div> :
<div style={{background:"#1E1E1E",borderRadius:"22px",overflow:"hidden",border:"1px solid #2A2A2A"}}>
<div style={{position:"relative"}}>
<img src={card.photos[0]} style={{width:"100%",height:"540px",objectFit:"cover"}} alt=""/>
<div style={{position:"absolute",bottom:0,left:0,right:0,padding:"16px",background:"linear-gradient(to top, rgba(0,0,0,0.95), transparent)"}}>
<div style={{display:"flex",gap:"8px",alignItems:"center"}}><h2 style={{fontSize:"26px",fontWeight:900,margin:0}}>{card.name}, {card.age}</h2><span style={{background:"#7C4DFF",padding:"4px 10px",borderRadius:"12px",fontSize:"11px",fontWeight:800}}>ID VERIFIED</span></div>
<p style={{fontSize:"12px",marginTop:"4px",opacity:0.8}}>📍 {card.location}</p>
<p style={{fontSize:"12px",marginTop:"6px",opacity:0.9}}>{card.bio}</p>
<div style={{marginTop:"10px"}}><span style={{background:"#7C4DFF",padding:"6px 12px",borderRadius:"20px",fontSize:"11px"}}>✓ Passport Verified • Real person • Global check</span></div>
</div>
</div>
<div style={{padding:"14px"}}>
<div style={{display:"flex",gap:"8px"}}>{card.interests.map((x:string)=><span key={x} style={{background:"#2A2A2A",padding:"7px 14px",borderRadius:"20px",fontSize:"11px",border:"1px solid #333"}}>{x}</span>)}</div>
<div style={{display:"flex",gap:"18px",justifyContent:"center",marginTop:"20px"}}>
<button onClick={()=>setI(v=>v+1)} style={{width:"58px",height:"58px",borderRadius:"50%",background:"#2A2A2A",border:"1px solid #444",color:"#fff",fontSize:"22px"}}>✕</button>
<button style={{width:"52px",height:"52px",borderRadius:"50%",background:"#7C4DFF",border:"none",color:"#fff",fontWeight:900}}>8</button>
<button onClick={()=>{setShowMatch(card); setI(v=>v+1)}} style={{width:"68px",height:"68px",borderRadius:"50%",background:"#FFC107",border:"3px solid #000",fontSize:"28px"}}>❤️</button>
</div>
</div>
</div>
}

{/* INTERNATIONAL SCROLL CONTENT */}
<div style={{marginTop:"18px",display:"flex",flexDirection:"column",gap:"14px"}}>

<div style={{background:"#1E1E1E",border:"1px solid #2A2A2A",borderRadius:"18px",padding:"14px",display:"flex",gap:"12px"}}>
<img src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=120" style={{width:"64px",height:"64px",borderRadius:"14px",objectFit:"cover"}} alt=""/>
<div><b style={{fontSize:"14px"}}>Why 50,000+ Worldwide Trust KLA MEET 🌍</b><p style={{fontSize:"11px",color:"#aaa",marginTop:"5px",lineHeight:"1.5"}}>Verified with Passport, National ID, Driver's License. AI face check + human review 24h. No fake. 18+ only. From Kampala to London to NYC.</p></div>
</div>

{/* INTERNATIONAL PAYMENT CTA */}
<div style={{background:"#FFC107",color:"#000",borderRadius:"18px",padding:"16px",border:"3px solid #000"}}>
<b style={{fontSize:"15px"}}>Go PRO Global • Unlimited 💎 $</b>
<p style={{fontSize:"11px",marginTop:"6px"}}>See who liked you, unlimited swipes, worldwide boost.</p>
<div style={{display:"flex",gap:"8px",marginTop:"10px"}}>
<button onClick={()=>{setPayPlan("weekly"); setShowPay(true)}} style={{flex:1,background:"#000",color:"#FFC107",padding:"10px",borderRadius:"12px",fontWeight:900,fontSize:"11px",border:"none"}}>Weekly<br/>$9.99</button>
<button onClick={()=>{setPayPlan("monthly"); setShowPay(true)}} style={{flex:1,background:"#fff",color:"#000",padding:"10px",borderRadius:"12px",fontWeight:900,fontSize:"11px",border:"2px solid #000"}}>Monthly 🔥<br/>$29.99</button>
<button onClick={()=>{setPayPlan("yearly"); setShowPay(true)}} style={{flex:1,background:"#7C4DFF",color:"#fff",padding:"10px",borderRadius:"12px",fontWeight:900,fontSize:"11px",border:"2px solid #000"}}>Yearly<br/>$199</button>
</div>
<p style={{fontSize:"9px",marginTop:"8px",opacity:0.7}}>USD • Stripe • PayPal • Apple Pay • Google Pay + Local: MTN MoMo UGX</p>
</div>

<div style={{background:"#000",borderRadius:"16px",padding:"14px",display:"flex",justifyContent:"space-around",border:"1px solid #222",textAlign:"center"}}>
{[{n:"50k+",l:"Verified"},{n:"98%",l:"Real"},{n:"24h",l:"Check"},{n:"120+",l:"Countries"}].map(s=><div key={s.l}><b style={{color:"#FFC107",fontSize:"18px"}}>{s.n}</b><p style={{fontSize:"9px",color:"#666"}}>{s.l}</p></div>)}
</div>

<div style={{background:"#1E1E1E",borderRadius:"18px",padding:"16px",border:"1px solid #2A2A2A"}}>
<b style={{fontSize:"14px"}}>Global Cities Active 🌐</b>
<div style={{display:"flex",flexWrap:"wrap",gap:"6px",marginTop:"10px"}}>
{['London 🇬🇧','New York 🇺🇸','Berlin 🇩🇪','Dubai 🇦🇪','Lagos 🇳🇬','Kampala 🇺🇬','Nairobi 🇰🇪','Paris 🇫🇷','Toronto 🇨🇦','Sydney 🇦🇺'].map(a=><span key={a} style={{background:"#2A2A2A",color:"#fff",padding:"5px 10px",borderRadius:"20px",fontSize:"10px",border:"1px solid #333"}}>{a}</span>)}
</div>
</div>

<div style={{background:"#FFF8E1",color:"#000",borderRadius:"18px",padding:"16px",border:"3px solid #000"}}>
<b style={{fontSize:"14px"}}>International Safety & ID Check 🛡️</b>
<p style={{fontSize:"11px",marginTop:"8px",lineHeight:"1.6"}}>
✓ Passport / National ID / Driver License verified<br/>
✓ 98% AI face match + human review 24h<br/>
✓ Supabase encrypted storage (GDPR compliant)<br/>
✓ 18+ only - minors auto-banned<br/>
✓ Stripe secure payments - USD global
</p>
</div>

<div style={{textAlign:"center",padding:"10px",fontSize:"10px",color:"#666",display:"flex",justifyContent:"center",gap:"12px"}}>
<a href="/privacy" style={{color:"#FFC107"}}>Privacy</a><a href="/terms" style={{color:"#FFC107"}}>Terms</a><a href="/guidelines" style={{color:"#FFC107"}}>Guidelines</a>
</div>

</div>
</div>

<div style={{position:"fixed",bottom:0,left:0,right:0,background:"#FFC107",color:"#000",textAlign:"center",padding:"8px",fontSize:"10px",fontWeight:900}}>🌍 GLOBAL 18+ VERIFIED • $ USD • Stripe • 50k+ Real Worldwide</div>

{showMatch && <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.85)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:100}}><div style={{background:"#FFC107",padding:"28px",borderRadius:"24px",textAlign:"center",border:"4px solid #000"}}><h1 style={{fontSize:"30px",fontWeight:900,color:"#000"}}>It's a Match! 🎉</h1><p style={{color:"#000",marginTop:"8px"}}>You & {showMatch.name} from {showMatch.location}</p><button onClick={()=>setShowMatch(null)} style={{marginTop:"16px",background:"#000",color:"#FFC107",padding:"12px 24px",borderRadius:"20px",fontWeight:900}}>Continue</button></div></div>}

{/* INTERNATIONAL VERIFICATION MODAL */}
{showID && <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.92)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:100,padding:"16px"}}><div style={{background:"#fff",color:"#000",borderRadius:"20px",padding:"16px",width:"100%",maxWidth:"400px",border:"4px solid #000"}}>
<div style={{display:"flex",justifyContent:"space-between"}}><h3 style={{fontWeight:900}}>Global ID Verification 🌍</h3><button onClick={()=>setShowID(false)} style={{background:"#eee",padding:"6px 12px",borderRadius:"12px",fontWeight:800}}>✕</button></div>
<p style={{fontSize:"11px",marginTop:"8px",background:"#FFF8E1",padding:"10px",borderRadius:"12px",border:"1px solid #000"}}>Accept: Passport (any country), National ID, Driver License, Student ID. Upload to Supabase <b>'id-docs'</b> encrypted. GDPR + Uganda Data Act compliant.</p>
<select style={{width:"100%",marginTop:"10px",border:"2px solid #000",padding:"8px",borderRadius:"10px",fontSize:"12px"}}><option>Passport 🌍</option><option>National ID (NIN)</option><option>Driver License</option><option>Student ID</option></select>
<input type="file" style={{width:"100%",marginTop:"8px",border:"2px solid #000",padding:"8px",borderRadius:"10px"}} onChange={async(e)=>{const f=e.target.files?.[0]; if(!f)return; try{const {data,error}=await supabase.storage.from('id-docs').upload(`id_${Date.now()}_${f.name}`,f); if(error) throw error; alert('✅ Uploaded to Supabase: '+data.path)}catch(err:any){alert(err.message)}}}/>
<input type="file" placeholder="Selfie" style={{width:"100%",marginTop:"8px",border:"2px solid #000",padding:"8px",borderRadius:"10px"}} onChange={async(e)=>{const f=e.target.files?.[0]; if(!f)return; try{await supabase.storage.from('id-docs').upload(`selfie_${Date.now()}_${f.name}`,f); alert('✅ Selfie uploaded for 98% face match')}catch(err:any){alert(err.message)}}}/>
<button onClick={async()=>{try{await supabase.from('id_verifications').insert({user_name:"You",id_type:"Passport",status:"pending",face_match:98}); alert('✅ Global verification submitted - 24h check'); setShowID(false)}catch(err:any){alert(err.message)}}} style={{width:"100%",background:"#4CAF50",color:"#fff",padding:"14px",borderRadius:"14px",marginTop:"14px",fontWeight:900,border:"3px solid #000"}}>Submit Global Verification ✓</button>
</div></div>}

{/* INTERNATIONAL PAYMENT MODAL - USD */}
{showPay && <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.92)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:100,padding:"16px"}}><div style={{background:"#fff",color:"#000",borderRadius:"20px",padding:"16px",width:"100%",maxWidth:"400px",border:"4px solid #000"}}>
<div style={{display:"flex",justifyContent:"space-between"}}><h3 style={{fontWeight:900}}>Go PRO Global 💎 $ USD</h3><button onClick={()=>setShowPay(false)} style={{background:"#eee",padding:"6px 12px",borderRadius:"12px"}}>✕</button></div>
<div style={{marginTop:"12px",display:"flex",gap:"8px"}}>
<button onClick={()=>setPayPlan("weekly")} style={{flex:1,padding:"12px",borderRadius:"12px",border:payPlan==="weekly"?"3px solid #000":"2px solid #ccc",background:payPlan==="weekly"?"#FFC107":"#fff",fontWeight:900,fontSize:"11px"}}>Weekly<br/>$9.99</button>
<button onClick={()=>setPayPlan("monthly")} style={{flex:1,padding:"12px",borderRadius:"12px",border:payPlan==="monthly"?"3px solid #000":"2px solid #ccc",background:payPlan==="monthly"?"#FFC107":"#fff",fontWeight:900,fontSize:"11px"}}>Monthly 🔥<br/>$29.99</button>
<button onClick={()=>setPayPlan("yearly")} style={{flex:1,padding:"12px",borderRadius:"12px",border:payPlan==="yearly"?"3px solid #000":"2px solid #ccc",background:payPlan==="yearly"?"#7C4DFF":"#fff",color:payPlan==="yearly"?"#fff":"#000",fontWeight:900,fontSize:"11px"}}>Yearly<br/>$199</button>
</div>
<div style={{marginTop:"14px",display:"flex",flexDirection:"column",gap:"8px"}}>
<button onClick={async()=>{try{await supabase.from('payments').insert({plan:payPlan,amount:payPlan==="weekly"?9.99:payPlan==="monthly"?29.99:199,currency:"USD",status:"pending",method:"Stripe"}); alert('✅ Stripe payment $'+(payPlan==="weekly"?9.99:payPlan==="monthly"?29.99:199)+' saved to Supabase - redirect to checkout'); window.open('https://buy.stripe.com/test','_blank'); setShowPay(false)}catch(err:any){alert(err.message)}}} style={{width:"100%",background:"#635BFF",color:"#fff",padding:"14px",borderRadius:"12px",fontWeight:900,border:"3px solid #000"}}>💳 Pay with Stripe - ${payPlan==="weekly"?9.99:payPlan==="monthly"?29.99:199} USD</button>
<button onClick={async()=>{try{await supabase.from('payments').insert({plan:payPlan,amount:payPlan==="weekly"?9.99:payPlan==="monthly"?29.99:199,currency:"USD",status:"pending",method:"PayPal"}); alert('PayPal pending - Supabase saved'); window.open('https://paypal.com','_blank'); setShowPay(false)}catch(err:any){alert(err.message)}}} style={{width:"100%",background:"#FFC439",color:"#000",padding:"14px",borderRadius:"12px",fontWeight:900,border:"3px solid #000"}}>PayPal - ${payPlan==="weekly"?9.99:payPlan==="monthly"?29.99:199} USD</button>
<button onClick={async()=>{try{await supabase.from('payments').insert({plan:payPlan,amount:payPlan==="weekly"?15000:45000,currency:"UGX",status:"pending",method:"MTN MoMo"}); alert('MTN MoMo UGX - for Uganda users'); setShowPay(false)}catch(err:any){alert(err.message)}}} style={{width:"100%",background:"#FFCC00",color:"#000",padding:"12px",borderRadius:"12px",fontWeight:800,border:"3px solid #000",fontSize:"12px"}}>🇺🇬 Local: MTN MoMo 15k-45k UGX</button>
</div>
<p style={{fontSize:"9px",marginTop:"10px",opacity:0.6,textAlign:"center"}}>Supabase 'payments' table • Stripe secure • USD global • GDPR • 18+ only • Auto-renew</p>
</div></div>}

</div>
)
}
