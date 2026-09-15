"use client"
export const dynamic = 'force-dynamic'
import { useState } from "react"

const DEMO = [
  {id:"2",name:"Vanessa",age:24,location:"Ntinda, Kampala",bio:"Entrepreneur in Ntinda. Own boutique. Looking for real vibes, not games. 18+ only ✨ Let's meet at Acacia Mall?",photos:["/vanessa-main.jpg","https://images.unsplash.com/photo-1517841905240-472988babdf9?w=600"],interests:["Business","Travel","Gym","Fashion"],verified:true, isMain:true},
  {id:"1",name:"Aisha",age:22,location:"Kawempe, Kampala",bio:"Love music, chapati & late night talks. Makerere student 💕",photos:["https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=600"],interests:["Music","Dancing","Coffee"],verified:true},
  {id:"3",name:"Martha",age:21,location:"Muyenga, Kampala",bio:"Fun, loyal, love cooking matoke 😍 Church girl",photos:["https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=600"],interests:["Cooking","Movies","Church"],verified:true},
  {id:"4",name:"Brian",age:26,location:"Bugolobi, Kampala",bio:"Tech & gym. Safety first 🛡️ Respectful",photos:["https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600"],interests:["Tech","Gym","Football"],verified:false},
]

export default function Home(){
  const [profiles,setProfiles]=useState(DEMO)
  const [i,setI]=useState(0)
  const [matches,setMatches]=useState<any[]>([])
  const [tab,setTab]=useState('discover')
  const [showMatch,setShowMatch]=useState<any>(null)
  const [showSupport,setShowSupport]=useState(false)
  const like = ()=>{ const p=profiles[i]; if(p){if(Math.random()>0.2){setMatches(m=>[...m,p]); setShowMatch(p)}; setI(x=>x+1)} }
  const pass = ()=> setI(x=>x+1)
  const card = profiles[i]

  return (
    <div style={{background:"#fff",color:"#111",minHeight:"100vh",fontFamily:"system-ui"}}>
      {/* YELLOW HEADER */}
      <div style={{background:"#FFC107",padding:"12px 16px",display:"flex",justifyContent:"space-between",alignItems:"center",position:"sticky",top:0,zIndex:20,borderBottom:"3px solid #000"}}>
        <b style={{fontSize:"20px"}}>KLA•MEET <span style={{background:"#000",color:"#FFC107",padding:"2px 8px",borderRadius:"12px",fontSize:"11px"}}>UG</span></b>
        <div style={{display:"flex",gap:"8px"}}>
          <button onClick={()=>setShowSupport(true)} style={{background:"#000",color:"#FFC107",padding:"8px 14px",borderRadius:"20px",fontSize:"13px",fontWeight:700}}>Support 💬</button>
          <button onClick={()=>setTab('discover')} style={{background:tab==='discover'?"#000":"#fff",color:tab==='discover'?"#FFC107":"#000",padding:"8px 12px",borderRadius:"20px",fontSize:"12px",fontWeight:700,border:"2px solid #000"}}>Discover</button>
          <button onClick={()=>setTab('matches')} style={{background:tab==='matches'?"#000":"#fff",color:tab==='matches'?"#FFC107":"#000",padding:"8px 12px",borderRadius:"20px",fontSize:"12px",fontWeight:700,border:"2px solid #000"}}>Matches ({matches.length})</button>
        </div>
      </div>

      {tab==='discover' && (
        <>
          {/* HERO WITH VANESSA AS MAIN */}
          <div style={{position:"relative",height:"320px",overflow:"hidden"}}>
            <img src="/vanessa-main.jpg" style={{width:"100%",height:"100%",objectFit:"cover",objectPosition:"center 20%"}}/>
            <div style={{position:"absolute",inset:0,background:"linear-gradient(to top, rgba(0,0,0,0.85) 0%, transparent 60%)"}}/>
            <div style={{position:"absolute",bottom:"16px",left:"16px",right:"16px",color:"#fff"}}>
              <span style={{background:"#FFC107",color:"#000",padding:"4px 10px",borderRadius:"20px",fontSize:"11px",fontWeight:900,border:"2px solid #000"}}>🔥 MOST POPULAR IN KAMPALA</span>
              <h1 style={{fontSize:"28px",fontWeight:900,marginTop:"8px",lineHeight:"28px"}}>Meet Vanessa & 2,300+ real people in Kampala</h1>
              <p style={{fontSize:"13px",opacity:0.9,marginTop:"6px"}}>Verified profiles • 18+ only • Safety first 🛡️</p>
            </div>
          </div>

          <div style={{maxWidth:"400px",margin:"0 auto",padding:"12px"}}>
            {!card? (
              <div style={{textAlign:"center",marginTop:"20px",background:"#FFF8E1",padding:"20px",borderRadius:"20px",border:"3px solid #000"}}>
                <img src="/vanessa-main.jpg" style={{width:"80px",height:"80px",borderRadius:"40px",border:"3px solid #000",margin:"0 auto"}}/>
                <p style={{fontWeight:800,marginTop:"12px"}}>No more profiles near Ntinda</p>
                <button onClick={()=>setI(0)} style={{background:"#FFC107",border:"2px solid #000",padding:"10px 20px",borderRadius:"20px",marginTop:"12px",fontWeight:800}}>Start Over with Vanessa</button>
              </div>
            ) : (
              <div style={{background:"#fff",borderRadius:"20px",overflow:"hidden",boxShadow:"0 10px 30px rgba(0,0,0,0.15)",border:"3px solid #000"}}>
                <div style={{position:"relative"}}>
                  <img src={card.photos[0]} style={{width:"100%",height:"480px",objectFit:"cover"}}/>
                  <div style={{position:"absolute",top:"12px",left:"12px",display:"flex",gap:"6px"}}>
                    <span style={{background:"#FFC107",border:"2px solid #000",padding:"4px 10px",borderRadius:"20px",fontSize:"11px",fontWeight:800}}>📍 {card.location}</span>
                    <span style={{background:"#4CAF50",color:"#fff",border:"2px solid #000",padding:"4px 10px",borderRadius:"20px",fontSize:"11px",fontWeight:800}}>✓ VERIFIED</span>
                  </div>
                  {card.isMain && <span style={{position:"absolute",top:"12px",right:"12px",background:"#FF3366",color:"#fff",padding:"4px 10px",borderRadius:"20px",fontSize:"10px",fontWeight:900,border:"2px solid #000"}}>⭐ MAIN PROFILE</span>}
                  <div style={{position:"absolute",bottom:0,left:0,right:0,background:"linear-gradient(transparent, rgba(0,0,0,0.9))",padding:"20px",color:"#fff"}}>
                    <h2 style={{fontSize:"26px",fontWeight:900}}>{card.name}, {card.age}</h2>
                    <p style={{opacity:0.9,marginTop:"2px",fontSize:"13px"}}>{card.bio}</p>
                  </div>
                </div>
                <div style={{padding:"16px"}}>
                  <div style={{display:"flex",gap:"6px",flexWrap:"wrap"}}>
                    {card.interests.map((x:string)=><span key={x} style={{background:"#FFF8E1",border:"2px solid #000",padding:"6px 12px",borderRadius:"20px",fontSize:"11px",fontWeight:700}}>{x}</span>)}
                  </div>
                  <div style={{display:"flex",gap:"20px",justifyContent:"center",marginTop:"18px"}}>
                    <button onClick={pass} style={{width:"64px",height:"64px",borderRadius:"32px",background:"#fff",border:"3px solid #000",fontSize:"26px"}}>✕</button>
                    <button onClick={like} style={{width:"72px",height:"72px",borderRadius:"36px",background:"#FFC107",border:"3px solid #000",fontSize:"32px",boxShadow:"0 4px 0px #000"}}>♥</button>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* REAL DESCRIPTIONS WITH VANESSA PHOTO */}
          <div style={{maxWidth:"400px",margin:"20px auto",padding:"0 12px",display:"grid",gap:"16px"}}>
            <div style={{background:"#FFF8E1",border:"3px solid #000",borderRadius:"20px",padding:"16px",display:"flex",gap:"12px"}}>
              <img src="/vanessa-main.jpg" style={{width:"90px",height:"90px",borderRadius:"16px",objectFit:"cover",border:"3px solid #000"}}/>
              <div><h3 style={{fontWeight:900,fontSize:"15px"}}>Meet Vanessa - Face of Kla Meet</h3><p style={{fontSize:"12px",marginTop:"6px",lineHeight:"17px"}}>Vanessa, 24 from Ntinda runs a boutique. Joined KLA MEET 2 months ago. "I was tired of fake guys on Facebook. Here everyone is verified with photo. I met 3 real friends!" She is our most liked profile this week with 142 likes. Real Ugandan, real story.</p><span style={{background:"#000",color:"#FFC107",padding:"4px 8px",borderRadius:"10px",fontSize:"10px",marginTop:"8px",display:"inline-block"}}>✓ Interviewed & Verified</span></div>
            </div>

            <div style={{background:"#fff",border:"3px solid #000",borderRadius:"20px",overflow:"hidden"}}>
              <img src="/vanessa-main.jpg" style={{width:"100%",height:"180px",objectFit:"cover"}}/>
              <div style={{padding:"16px"}}>
                <h3 style={{fontWeight:900}}>Why 2,300+ Kampala youth trust us 💛</h3>
                <p style={{fontSize:"13px",marginTop:"8px",lineHeight:"18px"}}>We are Ugandan owned. No mzungu company. We understand Kampala dating - from chapati dates in Wandegeya to coffee in Acacia. Every profile checked by our team in Ntinda office. We ban fake in 10 minutes. Your safety is our hustle. 18+ only, no games.</p>
                <div style={{display:"flex",gap:"8px",marginTop:"12px"}}>
                  <div style={{background:"#FFC107",border:"2px solid #000",padding:"8px",borderRadius:"12px",textAlign:"center",flex:1}}><b>2.3k</b><p style={{fontSize:"10px"}}>Members</p></div>
                  <div style={{background:"#fff",border:"2px solid #000",padding:"8px",borderRadius:"12px",textAlign:"center",flex:1}}><b>100%</b><p style={{fontSize:"10px"}}>Verified</p></div>
                  <div style={{background:"#000",color:"#FFC107",padding:"8px",borderRadius:"12px",textAlign:"center",flex:1}}><b>18+</b><p style={{fontSize:"10px"}}>Only</p></div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {tab==='matches' && (
        <div style={{maxWidth:"400px",margin:"0 auto",padding:"16px"}}>
          {matches.length===0? <div style={{textAlign:"center",marginTop:"30px"}}><img src="/vanessa-main.jpg" style={{width:"100px",height:"100px",borderRadius:"50px",border:"3px solid #000",margin:"0 auto",opacity:0.5}}/><p style={{marginTop:"12px",background:"#FFF8E1",padding:"12px",borderRadius:"12px",border:"2px dashed #000"}}>Like Vanessa to get your first match! 💛</p></div> : matches.map(m=>(
            <div key={m.id} style={{display:"flex",gap:"12px",background:"#fff",padding:"12px",borderRadius:"14px",marginBottom:"10px",border:"3px solid #000"}}>
              <img src={m.photos[0]} style={{width:"56px",height:"56px",borderRadius:"28px",objectFit:"cover",border:"2px solid #000"}}/>
              <div><b>{m.name}, {m.age}</b><p style={{fontSize:"12px",opacity:0.6}}>{m.location}</p><p style={{fontSize:"12px",background:"#FFC107",display:"inline-block",padding:"2px 8px",borderRadius:"10px",fontWeight:700,border:"1px solid #000"}}>Say hi 👋</p></div>
            </div>
          ))}
        </div>
      )}

      {showSupport && (
        <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.85)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:100,padding:"20px"}}>
          <div style={{background:"#fff",border:"3px solid #000",borderRadius:"20px",padding:"20px",width:"100%",maxWidth:"360px"}}>
            <div style={{display:"flex",justifyContent:"space-between"}}><h3 style={{fontWeight:900}}>Support 24/7 💛</h3><button onClick={()=>setShowSupport(false)}>✕</button></div>
            <img src="/vanessa-main.jpg" style={{width:"60px",height:"60px",borderRadius:"30px",border:"2px solid #000",marginTop:"12px"}}/>
            <p style={{fontSize:"12px",marginTop:"8px"}}>Vanessa & team reply in 5 min on WhatsApp</p>
            <a href="https://wa.me/256700000000" style={{display:"block",background:"#25D366",color:"#fff",textAlign:"center",padding:"12px",borderRadius:"12px",marginTop:"12px",fontWeight:800,border:"2px solid #000"}}>WhatsApp Us</a>
            <a href="mailto:support@kla-meet.com" style={{display:"block",background:"#FFC107",color:"#000",textAlign:"center",padding:"12px",borderRadius:"12px",marginTop:"8px",fontWeight:800,border:"2px solid #000"}}>support@kla-meet.com</a>
          </div>
        </div>
      )}

      {showMatch && (
        <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.92)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:100,padding:"20px"}}>
          <div style={{textAlign:"center",background:"#FFC107",border:"4px solid #000",padding:"24px",borderRadius:"24px"}}>
            <h1 style={{fontSize:"28px",fontWeight:900}}>It's a Match! 🎉</h1>
            <img src={showMatch.photos[0]} style={{width:"120px",height:"120px",borderRadius:"60px",margin:"16px auto",border:"4px solid #000"}}/>
            <p style={{fontWeight:700}}>You & {showMatch.name} liked each other</p>
            <div style={{display:"flex",gap:"12px",justifyContent:"center",marginTop:"16px"}}>
              <button onClick={()=>setShowMatch(null)} style={{background:"#fff",border:"3px solid #000",padding:"12px 20px",borderRadius:"20px",fontWeight:800}}>Keep Swiping</button>
              <button onClick={()=>{setShowMatch(null);setTab('matches')}} style={{background:"#000",color:"#FFC107",padding:"12px 20px",borderRadius:"20px",fontWeight:800}}>Chat Now</button>
            </div>
          </div>
        </div>
      )}

      <div style={{textAlign:"center",padding:"16px",background:"#FFC107",borderTop:"3px solid #000",fontSize:"11px",fontWeight:700,display:"flex",gap:"12px",justifyContent:"center",marginTop:"20px"}}>
        <a href="/privacy">Privacy</a><a href="/terms">Terms</a><a href="/safety">Safety</a><span style={{background:"#000",color:"#FFC107",padding:"2px 8px",borderRadius:"10px"}}>18+ VERIFIED</span>
      </div>
      <button onClick={()=>setShowSupport(true)} style={{position:"fixed",bottom:"20px",right:"20px",background:"#000",color:"#FFC107",width:"56px",height:"56px",borderRadius:"28px",fontSize:"22px",border:"3px solid #FFC107",zIndex:50}}>💬</button>
    </div>
  )
}
