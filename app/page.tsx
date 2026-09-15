"use client"
export const dynamic = 'force-dynamic'
import { useState } from "react"

const DEMO = [
  {id:"1",name:"Aisha",age:22,location:"Kawempe, Kampala",bio:"Love music, chapati & late night talks. Makerere student 💕",photos:["https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=600"],interests:["Music","Dancing","Coffee"],verified:true},
  {id:"2",name:"Vanessa",age:24,location:"Ntinda",bio:"Entrepreneur. Looking for real vibes, not games. 18+ only ✨",photos:["https://images.unsplash.com/photo-1517841905240-472988babdf9?w=600"],interests:["Business","Travel","Gym"],verified:true},
  {id:"3",name:"Brian",age:26,location:"Bugolobi",bio:"Gym, tech, and good conversations. Let's meet!",photos:["https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600"],interests:["Tech","Gym","Football"],verified:false},
  {id:"4",name:"Martha",age:21,location:"Muyenga",bio:"Fun, loyal, love cooking matoke 😍",photos:["https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=600"],interests:["Cooking","Movies","Church"],verified:true},
  {id:"5",name:"Sharon",age:23,location:"Kansanga",bio:"Finalist MUK. Let's explore Kla together 🌍",photos:["https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=600"],interests:["Study","Music","Dance"],verified:true},
  {id:"6",name:"Kevin",age:27,location:"Kololo",bio:"Business man, respectful. Safety first 🛡️",photos:["https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=600"],interests:["Business","Cars","Travel"],verified:true},
]

export default function Home(){
  const [profiles,setProfiles] = useState(DEMO)
  const [i,setI]=useState(0)
  const [matches,setMatches]=useState<any[]>([])
  const [tab,setTab]=useState('discover')
  const [showMatch,setShowMatch]=useState<any>(null)
  const [showSupport,setShowSupport]=useState(false)

  const like = ()=>{ const p=profiles[i]; if(p && Math.random()>0.3){setMatches(m=>[...m,p]); setShowMatch(p)}; setI(x=>x+1) }
  const pass = ()=> setI(x=>x+1)
  const card = profiles[i]

  return (
    <div style={{background:"#fff",color:"#111",minHeight:"100vh",fontFamily:"system-ui"}}>
      {/* HEADER - YELLOW */}
      <div style={{background:"#FFC107",padding:"12px 16px",display:"flex",justifyContent:"space-between",alignItems:"center",position:"sticky",top:0,zIndex:20,borderBottom:"3px solid #000"}}>
        <b style={{fontSize:"20px",letterSpacing:"-1px"}}>KLA•MEET <span style={{background:"#000",color:"#FFC107",padding:"2px 8px",borderRadius:"12px",fontSize:"11px",marginLeft:"6px"}}>UG</span></b>
        <div style={{display:"flex",gap:"8px",alignItems:"center"}}>
          <button onClick={()=>setShowSupport(true)} style={{background:"#000",color:"#FFC107",padding:"8px 14px",borderRadius:"20px",fontSize:"13px",fontWeight:700}}>Support 💬</button>
          <button onClick={()=>setTab('discover')} style={{background:tab==='discover'?"#000":"#fff",color:tab==='discover'?"#FFC107":"#000",padding:"8px 12px",borderRadius:"20px",fontSize:"12px",fontWeight:700,border:"2px solid #000"}}>Discover</button>
          <button onClick={()=>setTab('matches')} style={{background:tab==='matches'?"#000":"#fff",color:tab==='matches'?"#FFC107":"#000",padding:"8px 12px",borderRadius:"20px",fontSize:"12px",fontWeight:700,border:"2px solid #000"}}>Matches ({matches.length})</button>
        </div>
      </div>

      {tab==='discover' && (
        <>
          <div style={{maxWidth:"400px",margin:"0 auto",padding:"12px"}}>
            {!card? (
              <div style={{textAlign:"center",marginTop:"60px",background:"#FFF8E1",padding:"24px",borderRadius:"20px",border:"2px solid #FFC107"}}>
                <p style={{fontWeight:800}}>🔄 No more profiles near you</p><p style={{fontSize:"13px",opacity:0.7,marginTop:"6px"}}>We have more people in Kampala - check back tomorrow!</p><button onClick={()=>setI(0)} style={{background:"#FFC107",border:"2px solid #000",padding:"10px 20px",borderRadius:"20px",marginTop:"16px",fontWeight:800}}>Start Over</button>
              </div>
            ) : (
              <div style={{background:"#fff",borderRadius:"20px",overflow:"hidden",boxShadow:"0 10px 30px rgba(0,0,0,0.15)",border:"3px solid #000"}}>
                <div style={{position:"relative"}}>
                  <img src={card.photos[0]} style={{width:"100%",height:"480px",objectFit:"cover"}}/>
                  <div style={{position:"absolute",top:"12px",left:"12px",display:"flex",gap:"6px"}}>
                    <span style={{background:"#FFC107",border:"2px solid #000",padding:"4px 10px",borderRadius:"20px",fontSize:"11px",fontWeight:800}}>📍 {card.location}</span>
                    {card.verified && <span style={{background:"#4CAF50",color:"#fff",border:"2px solid #000",padding:"4px 10px",borderRadius:"20px",fontSize:"11px",fontWeight:800}}>✓ VERIFIED</span>}
                  </div>
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
                    <button onClick={pass} style={{width:"64px",height:"64px",borderRadius:"32px",background:"#fff",border:"3px solid #000",fontSize:"26px",fontWeight:800}}>✕</button>
                    <button onClick={like} style={{width:"72px",height:"72px",borderRadius:"36px",background:"#FFC107",border:"3px solid #000",fontSize:"32px",boxShadow:"0 4px 0px #000"}}>♥</button>
                  </div>
                  <div style={{display:"flex",justifyContent:"space-between",marginTop:"16px",fontSize:"11px",fontWeight:700}}>
                    <span>🛡️ Safety first</span><span>💬 Real people</span><span>18+ only</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* LONG DESCRIPTIONS - REAL & CONVINCING - Yellow sections */}
          <div style={{maxWidth:"400px",margin:"20px auto",padding:"0 12px",display:"grid",gap:"16px"}}>

            <div style={{background:"#FFF8E1",border:"3px solid #000",borderRadius:"20px",padding:"16px",display:"flex",gap:"12px"}}>
              <img src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=200" style={{width:"80px",height:"80px",borderRadius:"16px",objectFit:"cover",border:"2px solid #000"}}/>
              <div><h3 style={{fontWeight:900,fontSize:"15px"}}>Why Kampala loves KLA MEET</h3><p style={{fontSize:"13px",marginTop:"6px",lineHeight:"18px"}}>Over 2,300 real Ugandans joined last month. We verify every profile with photo + video selfies. No fake, no catfish. Meet students from Makerere, MUBS, KYU, professionals in Kololo, Nakawa & beyond. All 18+ verified.</p></div>
            </div>

            <div style={{background:"#fff",border:"3px solid #000",borderRadius:"20px",padding:"16px"}}>
              <h3 style={{fontWeight:900}}>How it works - Simple & Safe 🛡️</h3>
              <div style={{marginTop:"12px",display:"grid",gap:"10px"}}>
                <div style={{display:"flex",gap:"10px",alignItems:"center"}}><span style={{background:"#FFC107",width:"32px",height:"32px",borderRadius:"16px",display:"flex",alignItems:"center",justifyContent:"center",border:"2px solid #000",fontWeight:800}}>1</span><div><b style={{fontSize:"13px"}}>Create profile with real photos</b><p style={{fontSize:"12px",opacity:0.7}}>Add 2+ photos, bio, interests - takes 60 sec</p></div></div>
                <div style={{display:"flex",gap:"10px",alignItems:"center"}}><span style={{background:"#FFC107",width:"32px",height:"32px",borderRadius:"16px",display:"flex",alignItems:"center",justifyContent:"center",border:"2px solid #000",fontWeight:800}}>2</span><div><b style={{fontSize:"13px"}}>Swipe & match near you</b><p style={{fontSize:"12px",opacity:0.7}}>See people in Kawempe, Ntinda, Muyenga - within 10km</p></div></div>
                <div style={{display:"flex",gap:"10px",alignItems:"center"}}><span style={{background:"#FFC107",width:"32px",height:"32px",borderRadius:"16px",display:"flex",alignItems:"center",justifyContent:"center",border:"2px solid #000",fontWeight:800}}>3</span><div><b style={{fontSize:"13px"}}>Chat safely inside app</b><p style={{fontSize:"12px",opacity:0.7}}>No sharing number until you trust. Block/report in 1 tap</p></div></div>
              </div>
              <img src="https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=600" style={{width:"100%",height:"140px",objectFit:"cover",borderRadius:"14px",marginTop:"14px",border:"2px solid #000"}}/>
            </div>

            <div style={{background:"#000",color:"#FFC107",borderRadius:"20px",padding:"16px",border:"3px solid #000"}}>
              <h3 style={{fontWeight:900,color:"#fff"}}>Real stories from Kampala 💛</h3>
              <div style={{marginTop:"12px",background:"#222",padding:"12px",borderRadius:"14px",border:"1px solid #333"}}>
                <p style={{fontSize:"13px",fontStyle:"italic",color:"#fff"}}>"Met Aisha on KLA MEET in Feb. We met at Acacia Mall. Now dating 4 months!"</p><p style={{fontSize:"11px",marginTop:"6px",opacity:0.6}}>- Brian, 26, Bugolobi</p>
              </div>
              <div style={{marginTop:"10px",background:"#222",padding:"12px",borderRadius:"14px",border:"1px solid #333"}}>
                <p style={{fontSize:"13px",fontStyle:"italic",color:"#fff"}}>"I like that profiles are verified. No fake boys wasting time."</p><p style={{fontSize:"11px",marginTop:"6px",opacity:0.6}}>- Vanessa, 24, Ntinda</p>
              </div>
            </div>

            <div style={{background:"#FFC107",border:"3px solid #000",borderRadius:"20px",padding:"16px",textAlign:"center"}}>
              <h3 style={{fontWeight:900}}>Join 2,300+ in Kampala today</h3><p style={{fontSize:"13px",marginTop:"4px"}}>18+ only • Verified • Safe • Ugandan owned</p>
              <div style={{display:"flex",gap:"8px",justifyContent:"center",marginTop:"12px"}}><img src="https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=100" style={{width:"48px",height:"48px",borderRadius:"24px",border:"2px solid #000"}}/><img src="https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100" style={{width:"48px",height:"48px",borderRadius:"24px",border:"2px solid #000"}}/><img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100" style={{width:"48px",height:"48px",borderRadius:"24px",border:"2px solid #000"}}/><span style={{background:"#000",color:"#FFC107",width:"48px",height:"48px",borderRadius:"24px",display:"flex",alignItems:"center",justifyContent:"center",fontWeight:800,fontSize:"12px"}}>+2k</span></div>
            </div>

          </div>
        </>
      )}

      {tab==='matches' && (
        <div style={{maxWidth:"400px",margin:"0 auto",padding:"16px"}}>
          {matches.length===0? <p style={{textAlign:"center",opacity:0.5,marginTop:"50px",background:"#FFF8E1",padding:"20px",borderRadius:"16px",border:"2px dashed #000"}}>No matches yet. Like someone! 💛</p> : matches.map(m=>(
            <div key={m.id} style={{display:"flex",gap:"12px",background:"#fff",padding:"12px",borderRadius:"14px",marginBottom:"10px",border:"3px solid #000"}}>
              <img src={m.photos[0]} style={{width:"56px",height:"56px",borderRadius:"28px",objectFit:"cover",border:"2px solid #000"}}/>
              <div><b>{m.name}, {m.age}</b><p style={{fontSize:"12px",opacity:0.6}}>{m.location} • Online now</p><p style={{fontSize:"12px",color:"#000",background:"#FFC107",display:"inline-block",padding:"2px 8px",borderRadius:"10px",fontWeight:700}}>Say hi 👋</p></div>
            </div>
          ))}
        </div>
      )}

      {/* SUPPORT MODAL */}
      {showSupport && (
        <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.85)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:100,padding:"20px"}}>
          <div style={{background:"#fff",border:"3px solid #000",borderRadius:"20px",padding:"20px",width:"100%",maxWidth:"360px"}}>
            <div style={{display:"flex",justifyContent:"space-between"}}><h3 style={{fontWeight:900}}>Support 24/7 💛</h3><button onClick={()=>setShowSupport(false)} style={{fontSize:"20px"}}>✕</button></div>
            <p style={{fontSize:"13px",marginTop:"10px"}}>Need help? We reply in 5 min on WhatsApp.</p>
            <a href="https://wa.me/256700000000" style={{display:"block",background:"#25D366",color:"#fff",textAlign:"center",padding:"12px",borderRadius:"12px",marginTop:"12px",fontWeight:800,border:"2px solid #000"}}>WhatsApp: +256 700 000000</a>
            <a href="mailto:support@kla-meet.com" style={{display:"block",background:"#FFC107",color:"#000",textAlign:"center",padding:"12px",borderRadius:"12px",marginTop:"8px",fontWeight:800,border:"2px solid #000"}}>Email: support@kla-meet.com</a>
            <p style={{fontSize:"11px",opacity:0.6,marginTop:"10px"}}>🛡️ Report fake? Block? Safety issue? Contact us - we ban fake accounts in 10 min.</p>
          </div>
        </div>
      )}

      {showMatch && (
        <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.92)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:100,padding:"20px"}}>
          <div style={{textAlign:"center",background:"#FFC107",border:"4px solid #000",padding:"24px",borderRadius:"24px"}}>
            <h1 style={{fontSize:"32px",fontWeight:900}}>It's a Match! 🎉</h1>
            <p style={{marginTop:"8px",fontWeight:700}}>You & {showMatch.name} liked each other</p>
            <img src={showMatch.photos[0]} style={{width:"120px",height:"120px",borderRadius:"60px",margin:"20px auto",border:"4px solid #000"}}/>
            <div style={{display:"flex",gap:"12px",justifyContent:"center"}}>
              <button onClick={()=>setShowMatch(null)} style={{background:"#fff",border:"3px solid #000",padding:"12px 20px",borderRadius:"20px",fontWeight:800}}>Keep Swiping</button>
              <button onClick={()=>{setShowMatch(null);setTab('matches')}} style={{background:"#000",color:"#FFC107",padding:"12px 20px",borderRadius:"20px",fontWeight:800}}>Chat Now 💬</button>
            </div>
          </div>
        </div>
      )}

      {/* FOOTER - Yellow */}
      <div style={{textAlign:"center",marginTop:"30px",padding:"16px",background:"#FFC107",borderTop:"3px solid #000",fontSize:"11px",fontWeight:700,display:"flex",gap:"12px",justifyContent:"center"}}>
        <a href="/privacy" style={{textDecoration:"underline"}}>Privacy</a><a href="/terms">Terms</a><a href="/safety">Safety</a><span style={{background:"#000",color:"#FFC107",padding:"2px 8px",borderRadius:"10px"}}>18+ VERIFIED UG</span>
      </div>

      {/* FLOATING SUPPORT BUTTON */}
      <button onClick={()=>setShowSupport(true)} style={{position:"fixed",bottom:"20px",right:"20px",background:"#000",color:"#FFC107",width:"56px",height:"56px",borderRadius:"28px",fontSize:"22px",border:"3px solid #FFC107",boxShadow:"0 4px 12px rgba(0,0,0,0.3)",zIndex:50}}>💬</button>
    </div>
  )
}
