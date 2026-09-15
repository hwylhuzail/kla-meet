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

  const like = ()=>{ const p=profiles[i]; if(p && Math.random()>0.3){setMatches(m=>[...m,p]); setShowMatch(p)}; setI(x=>x+1) }
  const pass = ()=> setI(x=>x+1)
  const card = profiles[i]

  return (
    <div style={{background:"#0f0f0f",color:"#fff",minHeight:"100vh",fontFamily:"system-ui",paddingBottom:"20px"}}>
      <div style={{background:"#1a1a1a",padding:"12px 16px",display:"flex",justifyContent:"space-between",alignItems:"center",position:"sticky",top:0,zIndex:20}}>
        <b style={{color:"#ff3366",fontSize:"18px"}}>KLA MEET</b>
        <div style={{display:"flex",gap:"8px"}}>
          <button onClick={()=>setTab('discover')} style={{background:tab==='discover'?"#ff3366":"#333",padding:"8px 14px",borderRadius:"20px",fontSize:"13px"}}>Discover</button>
          <button onClick={()=>setTab('matches')} style={{background:tab==='matches'?"#ff3366":"#333",padding:"8px 14px",borderRadius:"20px",fontSize:"13px"}}>Matches ({matches.length})</button>
          <button onClick={()=>setTab('premium')} style={{background:tab==='premium'?"#FFC107":"#333",color:tab==='premium'?"#000":"#fff",padding:"8px 14px",borderRadius:"20px",fontSize:"13px"}}>Premium</button>
        </div>
      </div>

      {tab==='discover' && (
        <div style={{maxWidth:"400px",margin:"0 auto",padding:"12px"}}>
          {!card? (
            <div style={{textAlign:"center",marginTop:"60px"}}>
              <p>🔄 No more profiles</p><button onClick={()=>setI(0)} style={{background:"#ff3366",padding:"10px 20px",borderRadius:"20px",marginTop:"16px"}}>Start Over</button>
            </div>
          ) : (
            <div style={{background:"#222",borderRadius:"20px",overflow:"hidden",boxShadow:"0 10px 30px rgba(0,0,0,0.5)"}}>
              <div style={{position:"relative"}}>
                <img src={card.photos[0]} style={{width:"100%",height:"480px",objectFit:"cover"}}/>
                <div style={{position:"absolute",bottom:0,left:0,right:0,background:"linear-gradient(transparent, rgba(0,0,0,0.9))",padding:"20px"}}>
                  <div style={{display:"flex",alignItems:"center",gap:"8px"}}>
                    <h2 style={{fontSize:"24px",fontWeight:800}}>{card.name}, {card.age}</h2>
                    {card.verified && <span style={{background:"#4CAF50",fontSize:"10px",padding:"2px 6px",borderRadius:"10px"}}>✓ VERIFIED</span>}
                  </div>
                  <p style={{opacity:0.9,marginTop:"4px",fontSize:"13px"}}>📍 {card.location}</p>
                </div>
              </div>
              <div style={{padding:"16px"}}>
                <p style={{fontSize:"14px",lineHeight:"20px"}}>{card.bio}</p>
                <div style={{display:"flex",gap:"6px",flexWrap:"wrap",marginTop:"12px"}}>
                  {card.interests.map((x:string)=><span key={x} style={{background:"#333",border:"1px solid #444",padding:"6px 10px",borderRadius:"20px",fontSize:"11px"}}>{x}</span>)}
                </div>
                <div style={{display:"flex",gap:"20px",justifyContent:"center",marginTop:"20px"}}>
                  <button onClick={pass} style={{width:"64px",height:"64px",borderRadius:"32px",background:"#2a2a2a",border:"2px solid #444",fontSize:"26px"}}>✕</button>
                  <button onClick={like} style={{width:"72px",height:"72px",borderRadius:"36px",background:"#ff3366",fontSize:"32px",boxShadow:"0 4px 15px rgba(255,51,102,0.4)"}}>♥</button>
                </div>
                <div style={{display:"flex",justifyContent:"space-between",marginTop:"16px",fontSize:"11px",opacity:0.5}}>
                  <span>🛡️ Safety first</span><span>💬 Across languages</span><span>18+ only</span>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {tab==='matches' && (
        <div style={{maxWidth:"400px",margin:"0 auto",padding:"16px"}}>
          {matches.length===0? <p style={{textAlign:"center",opacity:0.5,marginTop:"50px"}}>No matches yet. Like someone! ❤️</p> : matches.map(m=>(
            <div key={m.id} style={{display:"flex",gap:"12px",background:"#1e1e1e",padding:"12px",borderRadius:"14px",marginBottom:"10px",border:"1px solid #2a2a2a"}}>
              <img src={m.photos[0]} style={{width:"56px",height:"56px",borderRadius:"28px",objectFit:"cover"}}/>
              <div><b>{m.name}, {m.age}</b><p style={{fontSize:"12px",opacity:0.6}}>{m.location} • Online now</p><p style={{fontSize:"12px",color:"#ff3366"}}>Say hi 👋</p></div>
            </div>
          ))}
        </div>
      )}

      {tab==='premium' && (
        <div style={{maxWidth:"400px",margin:"0 auto",padding:"16px"}}>
          <h2 style={{color:"#FFC107"}}>Premium 💎</h2>
          <div style={{background:"linear-gradient(135deg,#FFC107,#FF9800)",color:"#000",padding:"18px",borderRadius:"16px",marginTop:"12px"}}>
            <b>MTN MoMo, Airtel Money, Visa</b><p style={{fontSize:"13px",marginTop:"6px"}}>Unlimited likes, see who liked you, boost in Kampala</p>
            <button style={{width:"100%",background:"#000",color:"#FFC107",padding:"12px",borderRadius:"12px",marginTop:"12px",fontWeight:800}}>15,000 UGX / week</button>
          </div>
        </div>
      )}

      {showMatch && (
        <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.92)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:100,padding:"20px"}}>
          <div style={{textAlign:"center"}}>
            <h1 style={{fontSize:"36px",fontWeight:900}}>It's a Match! 🎉</h1>
            <p style={{marginTop:"8px"}}>You & {showMatch.name} liked each other</p>
            <img src={showMatch.photos[0]} style={{width:"140px",height:"140px",borderRadius:"70px",margin:"20px auto",border:"4px solid #ff3366"}}/>
            <div style={{display:"flex",gap:"12px",justifyContent:"center"}}>
              <button onClick={()=>setShowMatch(null)} style={{background:"#333",padding:"12px 20px",borderRadius:"20px"}}>Keep Swiping</button>
              <button onClick={()=>{setShowMatch(null);setTab('matches')}} style={{background:"#ff3366",padding:"12px 20px",borderRadius:"20px"}}>Chat Now 💬</button>
            </div>
          </div>
        </div>
      )}

      <div style={{textAlign:"center",marginTop:"20px",fontSize:"11px",opacity:0.4,display:"flex",gap:"10px",justifyContent:"center"}}>
        <a href="/privacy">Privacy</a><a href="/terms">Terms</a><a href="/safety">Safety</a>
      </div>
    </div>
  )
}
