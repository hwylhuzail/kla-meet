"use client"
export const dynamic = 'force-dynamic'
import { useState } from "react"
const DEMO = [
{id:"1",name:"Aisha",age:22,location:"Kawempe, Kampala",bio:"Love music, chapati & late talks. Makerere student 💕",photos:["https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=600"],interests:["Music","Dancing","Coffee"],verified:true, idVerified:true, nin:"CM****123L"},
{id:"2",name:"Vanessa",age:24,location:"Ntinda",bio:"Entrepreneur. Real vibes, not games. 18+ only ✨",photos:["https://images.unsplash.com/photo-1517841905240-472988babdf9?w=600"],interests:["Business","Travel","Gym"],verified:true, idVerified:true, passport:true},
{id:"3",name:"Brian",age:26,location:"Bugolobi",bio:"Gym, tech, and good conversations!",photos:["https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600"],interests:["Tech","Gym","Football"],verified:false, idVerified:false},
{id:"4",name:"Martha",age:21,location:"Muyenga",bio:"Fun, loyal, love cooking matoke 😍",photos:["https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=600"],interests:["Cooking","Movies","Church"],verified:true, idVerified:true},
]
const POSTS = [
{id:1,user:"Vanessa",age:24,photo:"https://images.unsplash.com/photo-1517841905240-472988babdf9?w=600",text:"Selling dresses in Ntinda today! Who wants to come for coffee at Acacia after? ☕ Real meet only - verified people",time:"2h ago",likes:23,verified:true},
{id:2,user:"Aisha",age:22,photo:"https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=600",text:"At Makerere library studying. Looking for study buddy in Kawempe 📚 18+ only",time:"5h ago",likes:12,verified:true},
{id:3,user:"Brian",age:26,photo:"https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600",text:"Gym at Arena Mall Bugolobi 6pm. Anyone join? Safety first 🛡️",time:"1d ago",likes:8,verified:false},
]
export default function Home(){
const [profiles]=useState(DEMO)
const [i,setI]=useState(0)
const [matches,setMatches]=useState<any[]>([])
const [tab,setTab]=useState('discover')
const [posts,setPosts]=useState(POSTS)
const [newPost,setNewPost]=useState("")
const [showMatch,setShowMatch]=useState<any>(null)
const [showSupport,setShowSupport]=useState(false)
const [showPay,setShowPay]=useState(false)
const [showID,setShowID]=useState(false)
const [showVerifyDetail,setShowVerifyDetail]=useState<any>(null)
const [idType,setIdType]=useState("National ID")
const card=profiles[i]
const like=()=>{const p=profiles[i]; if(p&&Math.random()>0.3){setMatches(m=>[...m,p]); setShowMatch(p)}; setI(x=>x+1)}
const pass=()=>setI(x=>x+1)
const addPost=()=>{if(!newPost.trim())return; setPosts([{id:Date.now(),user:"You",age:24,photo:"https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=600",text:newPost,time:"now",likes:0,verified:false},...posts]); setNewPost("")}
return(
<div style={{background:"#fff",color:"#111",minHeight:"100vh",fontFamily:"system-ui",position:"relative",overflowX:"hidden"}}>
<style>{`@keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-16px)}}@keyframes pulse{0%,100%{transform:scale(1)}50%{transform:scale(1.05)}}`}</style>
<div style={{position:"fixed",inset:0,zIndex:0,pointerEvents:"none"}}><div style={{position:"absolute",inset:0,background:"radial-gradient(circle at 20% 20%, rgba(255,193,7,0.15) 0%, transparent 50%)"}}/><div style={{position:"absolute",top:"10%",left:"5%",width:"60px",height:"60px",background:"#FFC107",borderRadius:"50%",opacity:0.15,animation:"float 6s infinite"}}/></div>
<div style={{background:"#FFC107",padding:"10px 12px",display:"flex",justifyContent:"space-between",alignItems:"center",position:"sticky",top:0,zIndex:20,borderBottom:"3px solid #000"}}>
<b style={{fontSize:"18px"}}>KLA•MEET <span style={{background:"#000",color:"#FFC107",padding:"2px 8px",borderRadius:"12px",fontSize:"10px"}}>UG</span></b>
<div style={{display:"flex",gap:"5px"}}>
<button onClick={()=>setTab('discover')} style={{background:tab==='discover'?"#000":"#fff",color:tab==='discover'?"#FFC107":"#000",padding:"6px 10px",borderRadius:"20px",fontSize:"11px",fontWeight:700,border:"2px solid #000"}}>Swipe</button>
<button onClick={()=>setTab('feed')} style={{background:tab==='feed'?"#000":"#fff",color:tab==='feed'?"#FFC107":"#000",padding:"6px 10px",borderRadius:"20px",fontSize:"11px",fontWeight:700,border:"2px solid #000"}}>Posts</button>
<button onClick={()=>setShowID(true)} style={{background:"#7C4DFF",color:"#fff",padding:"6px 10px",borderRadius:"20px",fontSize:"11px",fontWeight:800,border:"2px solid #000"}}>Verify ID</button>
<button onClick={()=>setTab('matches')} style={{background:tab==='matches'?"#000":"#fff",color:tab==='matches'?"#FFC107":"#000",padding:"6px 10px",borderRadius:"20px",fontSize:"11px",fontWeight:700,border:"2px solid #000"}}>Matches ({matches.length})</button>
</div></div>{tab==='discover' && (<>
<div style={{maxWidth:"400px",margin:"0 auto",padding:"12px",position:"relative",zIndex:1}}>
<div style={{background:"#7C4DFF",color:"#fff",border:"3px solid #000",borderRadius:"16px",padding:"10px",marginBottom:"12px",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
<div><b style={{fontSize:"12px"}}>🛡️ REAL ID VERIFIED</b><p style={{fontSize:"10px",opacity:0.9}}>National ID • Passport • NIN verified by team</p></div><button onClick={()=>setShowID(true)} style={{background:"#FFC107",color:"#000",padding:"6px 10px",borderRadius:"20px",fontSize:"10px",fontWeight:800,border:"2px solid #000"}}>Verify Now</button>
</div>
{!card? (<div style={{textAlign:"center",marginTop:"40px",background:"#FFF8E1",padding:"24px",borderRadius:"20px",border:"3px solid #000"}}><p style={{fontWeight:800}}>No more profiles</p><button onClick={()=>setI(0)} style={{background:"#FFC107",border:"2px solid #000",padding:"10px 20px",borderRadius:"20px",marginTop:"12px",fontWeight:800}}>Start Over</button></div>) : (
<div style={{background:"#fff",borderRadius:"20px",overflow:"hidden",boxShadow:"0 8px 0 #000",border:"3px solid #000"}}>
<div style={{position:"relative"}}><img src={card.photos[0]} style={{width:"100%",height:"460px",objectFit:"cover"}}/>
<div style={{position:"absolute",top:"10px",left:"10px",display:"flex",gap:"5px",flexWrap:"wrap"}}><span style={{background:"#FFC107",border:"2px solid #000",padding:"4px 8px",borderRadius:"20px",fontSize:"10px",fontWeight:800}}>📍 {card.location}</span>{card.verified && <span style={{background:"#4CAF50",color:"#fff",border:"2px solid #000",padding:"4px 8px",borderRadius:"20px",fontSize:"10px",fontWeight:800}}>✓ PHOTO</span>}{card.idVerified && <span onClick={()=>setShowVerifyDetail(card)} style={{background:"#7C4DFF",color:"#fff",border:"2px solid #000",padding:"4px 8px",borderRadius:"20px",fontSize:"10px",fontWeight:800}}>🪪 ID VERIFIED</span>}{card.passport && <span style={{background:"#000",color:"#FFC107",padding:"4px 8px",borderRadius:"20px",fontSize:"10px",fontWeight:800}}>🛂 PASSPORT</span>}</div>
<div style={{position:"absolute",bottom:0,left:0,right:0,background:"linear-gradient(transparent, rgba(0,0,0,0.9))",padding:"16px",color:"#fff"}}><h2 style={{fontSize:"24px",fontWeight:900}}>{card.name}, {card.age} {card.idVerified && <span style={{fontSize:"10px",background:"#7C4DFF",padding:"3px 6px",borderRadius:"8px"}}>ID OK</span>}</h2><p style={{fontSize:"12px",opacity:0.9,marginTop:"2px"}}>{card.bio}</p>{card.idVerified && <p style={{fontSize:"10px",marginTop:"4px",background:"rgba(124,77,255,0.9)",display:"inline-block",padding:"2px 6px",borderRadius:"8px"}}>✓ NIN: {card.nin || "Verified"} • Real person - office checked</p>}</div></div>
<div style={{padding:"14px"}}><div style={{display:"flex",gap:"6px",flexWrap:"wrap"}}>{card.interests.map((x:string)=><span key={x} style={{background:"#FFF8E1",border:"2px solid #000",padding:"5px 10px",borderRadius:"20px",fontSize:"11px",fontWeight:700}}>{x}</span>)}</div>
<div style={{display:"flex",gap:"16px",justifyContent:"center",marginTop:"16px"}}><button onClick={pass} style={{width:"60px",height:"60px",borderRadius:"30px",background:"#fff",border:"3px solid #000",fontSize:"22px",boxShadow:"0 3px 0 #000"}}>✕</button><button onClick={()=>setShowVerifyDetail(card)} style={{width:"44px",height:"44px",borderRadius:"22px",background:"#7C4DFF",border:"3px solid #000",color:"#fff",boxShadow:"0 3px 0 #000"}}>🪪</button><button onClick={like} style={{width:"68px",height:"68px",borderRadius:"34px",background:"#FFC107",border:"3px solid #000",fontSize:"28px",boxShadow:"0 4px 0 #000",animation:"pulse 2s infinite"}}>♥</button></div></div></div>)}
</div>
<div style={{maxWidth:"400px",margin:"16px auto",padding:"0 12px",position:"relative",zIndex:1}}><div style={{background:"#FFF8E1",border:"3px solid #000",borderRadius:"16px",padding:"12px",display:"flex",gap:"10px"}}><img src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=100" style={{width:"60px",height:"60px",borderRadius:"12px",border:"2px solid #000",objectFit:"cover"}}/><div><h3 style={{fontWeight:800,fontSize:"13px"}}>Why Kampala trusts KLA MEET</h3><p style={{fontSize:"11px",lineHeight:"15px",marginTop:"4px"}}>2,300+ verified with NIN, Passport, Student ID. Our team in Ntinda checks every ID in 24h. No fake. 18+ only.</p></div></div></div>
</>)}
{tab==='feed' && (<div style={{maxWidth:"400px",margin:"0 auto",padding:"12px",position:"relative",zIndex:1}}>
<div style={{background:"#fff",border:"3px solid #000",borderRadius:"16px",padding:"12px",boxShadow:"0 4px 0 #000",marginBottom:"12px"}}>
<div style={{display:"flex",gap:"8px"}}><img src="https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=100" style={{width:"40px",height:"40px",borderRadius:"20px",border:"2px solid #000"}}/><textarea value={newPost} onChange={e=>setNewPost(e.target.value)} placeholder="What are you doing in Kampala today? (Real post, verified users only)" style={{flex:1,border:"2px solid #000",borderRadius:"12px",padding:"10px",fontSize:"13px",resize:"none",height:"60px"}}/></div>
<div style={{display:"flex",justifyContent:"space-between",marginTop:"10px",alignItems:"center"}}><span style={{fontSize:"10px",fontWeight:700}}>📍 Kawempe • 18+ • Real ID needed to post</span><button onClick={addPost} style={{background:"#FFC107",border:"2px solid #000",padding:"8px 16px",borderRadius:"20px",fontWeight:800,fontSize:"12px",boxShadow:"0 2px 0 #000"}}>Post 📤</button></div>
</div>
{posts.map(p=>(<div key={p.id} style={{background:"#fff",border:"3px solid #000",borderRadius:"16px",padding:"12px",marginBottom:"10px",boxShadow:"0 3px 0 #000"}}>
<div style={{display:"flex",gap:"10px",alignItems:"center"}}><img src={p.photo} style={{width:"44px",height:"44px",borderRadius:"22px",border:"2px solid #000",objectFit:"cover"}}/><div><b style={{fontSize:"13px"}}>{p.user}, {p.age} {p.verified && <span style={{background:"#7C4DFF",color:"#fff",padding:"2px 6px",borderRadius:"8px",fontSize:"9px"}}>ID VERIFIED</span>}</b><p style={{fontSize:"10px",opacity:0.6}}>{p.time} • Kawempe</p></div></div>
<p style={{fontSize:"13px",marginTop:"10px",lineHeight:"18px"}}>{p.text}</p>
<div style={{display:"flex",gap:"12px",marginTop:"10px",fontSize:"12px",fontWeight:700}}><span>❤️ {p.likes}</span><span>💬 Comment</span><span>🛡️ Report</span></div>
</div>))}
</div>)}
{tab==='matches' && (<div style={{maxWidth:"400px",margin:"0 auto",padding:"16px",position:"relative",zIndex:1}}>{matches.length===0? <p style={{textAlign:"center",opacity:0.5,marginTop:"40px",background:"#FFF8E1",padding:"16px",borderRadius:"16px",border:"2px dashed #000"}}>No matches yet. Swipe! 💛</p> : matches.map(m=>(<div key={m.id} style={{display:"flex",gap:"12px",background:"#fff",padding:"12px",borderRadius:"14px",marginBottom:"10px",border:"3px solid #000"}}><img src={m.photos[0]} style={{width:"52px",height:"52px",borderRadius:"26px",border:"2px solid #000",objectFit:"cover"}}/><div><b>{m.name}, {m.age} {m.idVerified && <span style={{background:"#7C4DFF",color:"#fff",padding:"2px 6px",borderRadius:"8px",fontSize:"9px"}}>ID OK</span>}</b><p style={{fontSize:"11px",opacity:0.6}}>{m.location}</p><p style={{fontSize:"11px",background:"#FFC107",display:"inline-block",padding:"2px 8px",borderRadius:"10px",fontWeight:700}}>Chat 👋</p></div></div>))}</div>)}
{showID && (<div style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.9)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:100,padding:"16px"}}><div style={{background:"#fff",border:"4px solid #000",borderRadius:"20px",padding:"16px",width:"100%",maxWidth:"360px",maxHeight:"90vh",overflowY:"auto"}}>
<div style={{display:"flex",justifyContent:"space-between"}}><h3 style={{fontWeight:900}}>Verify Real ID 🪪</h3><button onClick={()=>setShowID(false)} style={{fontWeight:800}}>✕</button></div>
<p style={{fontSize:"12px",marginTop:"8px",background:"#FFF8E1",padding:"8px",borderRadius:"10px",border:"2px solid #000"}}>🇺🇬 To keep KLA MEET real, verify with Ugandan ID. Our team in Ntinda checks in 24h. 18+ only.</p>
<div style={{marginTop:"12px"}}><p style={{fontSize:"12px",fontWeight:800}}>Select ID type:</p>
<div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"8px",marginTop:"8px"}}>
{["National ID","Passport","Driving Permit","Student ID (MUK/MUBS)","NIN Slip"].map(t=>(<button key={t} onClick={()=>setIdType(t)} style={{padding:"10px",borderRadius:"12px",border:"3px solid #000",background:idType===t?"#FFC107":"#fff",fontSize:"11px",fontWeight:800}}>{t} {idType===t?"✓":""}</button>))}
</div></div>
<div style={{marginTop:"12px",display:"grid",gap:"8px"}}>
<div style={{border:"2px dashed #000",padding:"12px",borderRadius:"12px",textAlign:"center"}}><p style={{fontSize:"11px",fontWeight:800}}>📸 Upload {idType} Front</p><button style={{marginTop:"6px",background:"#000",color:"#fff",padding:"6px 12px",borderRadius:"20px",fontSize:"11px"}}>Choose Photo</button></div>
<div style={{border:"2px dashed #000",padding:"12px",borderRadius:"12px",textAlign:"center"}}><p style={{fontSize:"11px",fontWeight:800}}>📸 Upload {idType} Back</p><button style={{marginTop:"6px",background:"#000",color:"#fff",padding:"6px 12px",borderRadius:"20px",fontSize:"11px"}}>Choose Photo</button></div>
<div style={{border:"2px dashed #7C4DFF",padding:"12px",borderRadius:"12px",textAlign:"center",background:"#F3E5FF"}}><p style={{fontSize:"11px",fontWeight:800}}>🤳 Selfie holding {idType}</p><p style={{fontSize:"9px",opacity:0.7}}>Hold ID near face - we match face to ID</p><button style={{marginTop:"6px",background:"#7C4DFF",color:"#fff",padding:"6px 12px",borderRadius:"20px",fontSize:"11px"}}>Take Selfie</button></div>
</div>
<button style={{width:"100%",background:"#4CAF50",color:"#fff",border:"3px solid #000",padding:"12px",borderRadius:"12px",marginTop:"12px",fontWeight:900,boxShadow:"0 3px 0 #000"}}>Submit for Verification ✓</button>
<p style={{fontSize:"9px",opacity:0.6,marginTop:"8px",textAlign:"center"}}>🔒 Encrypted • Deleted after verification • URSB: 8002000 • Plot 12 Ntinda • 24h check • 18+ only</p>
</div></div>)}
{showVerifyDetail && (<div style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.9)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:100,padding:"20px"}}><div style={{background:"#fff",border:"4px solid #000",borderRadius:"20px",padding:"16px",width:"100%",maxWidth:"340px"}}>
<div style={{display:"flex",justifyContent:"space-between"}}><h3 style={{fontWeight:900}}>Real ID Verified 🪪</h3><button onClick={()=>setShowVerifyDetail(null)}>✕</button></div>
<img src={showVerifyDetail.photos[0]} style={{width:"100%",height:"220px",objectFit:"cover",borderRadius:"14px",marginTop:"10px",border:"3px solid #000"}}/>
<div style={{background:"#7C4DFF",color:"#fff",padding:"10px",borderRadius:"12px",marginTop:"10px",border:"2px solid #000",fontSize:"12px",fontWeight:700}}>
<p>✓ {showVerifyDetail.name} verified real</p><p style={{fontSize:"10px",marginTop:"4px",opacity:0.9}}>ID: National ID • NIN: {showVerifyDetail.nin || "Verified"} • Face match: 98% • Checked by team Ntinda office • Date: 12 Sept 2026</p>
</div>
<div style={{background:"#FFF8E1",border:"2px solid #000",padding:"8px",borderRadius:"10px",marginTop:"8px",fontSize:"11px"}}>🛡️ Why ID verify? No catfish, no underage, no fake. Real Ugandans only. We delete ID photo after check - only keep verified tick.</div>
<button onClick={()=>setShowVerifyDetail(null)} style={{width:"100%",background:"#FFC107",border:"3px solid #000",padding:"10px",borderRadius:"12px",marginTop:"10px",fontWeight:900}}>Got it - Real Person ✓</button>
</div></div>)}
{showSupport && (<div style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.85)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:100,padding:"20px"}}><div style={{background:"#fff",border:"3px solid #000",borderRadius:"20px",padding:"20px",width:"100%",maxWidth:"360px"}}><div style={{display:"flex",justifyContent:"space-between"}}><h3 style={{fontWeight:900}}>Support 24/7 💛</h3><button onClick={()=>setShowSupport(false)}>✕</button></div><a href="https://wa.me/256700000000" style={{display:"block",background:"#25D366",color:"#fff",textAlign:"center",padding:"12px",borderRadius:"12px",marginTop:"12px",fontWeight:800,border:"2px solid #000"}}>WhatsApp</a></div></div>)}
{showMatch && (<div style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.92)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:100,padding:"20px"}}><div style={{textAlign:"center",background:"#FFC107",border:"4px solid #000",padding:"24px",borderRadius:"24px"}}><h1 style={{fontSize:"28px",fontWeight:900}}>It's a Match! 🎉</h1><img src={showMatch.photos[0]} style={{width:"100px",height:"100px",borderRadius:"50px",margin:"16px auto",border:"4px solid #000"}}/><div style={{display:"flex",gap:"12px",justifyContent:"center"}}><button onClick={()=>setShowMatch(null)} style={{background:"#fff",border:"3px solid #000",padding:"10px 18px",borderRadius:"20px",fontWeight:800}}>Keep Swiping</button><button onClick={()=>{setShowMatch(null);setTab('matches')}} style={{background:"#000",color:"#FFC107",padding:"10px 18px",borderRadius:"20px",fontWeight:800}}>Chat Now 💬</button></div></div></div>)}
<div style={{textAlign:"center",padding:"14px",background:"#FFC107",borderTop:"3px solid #000",fontSize:"11px",fontWeight:700,display:"flex",gap:"10px",justifyContent:"center",position:"relative",zIndex:1}}><span>18+ ID VERIFIED</span><span>•</span><span>Privacy</span><span>•</span><span>Safety</span></div>
<button onClick={()=>setShowSupport(true)} style={{position:"fixed",bottom:"18px",right:"18px",background:"#000",color:"#FFC107",width:"54px",height:"54px",borderRadius:"27px",fontSize:"20px",border:"3px solid #FFC107",zIndex:50}}>💬</button>
</div>)}