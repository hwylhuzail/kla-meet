"use client"
export const dynamic = 'force-dynamic'
import { useEffect, useState } from "react"
import { createClient } from "@supabase/supabase-js"

type Profile = { id:string, name:string, age:number, location:string, bio:string, photos:string[], interests:string[] }

export default function Home(){
  const [profiles,setProfiles] = useState<Profile[]>([])
  const [current,setCurrent] = useState(0)
  const [matches,setMatches] = useState<Profile[]>([])
  const [showMatch,setShowMatch] = useState<Profile|null>(null)
  const [tab,setTab] = useState<'discover'|'matches'|'premium'>('discover')

  useEffect(()=>{
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL
    const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    if(!url ||!key){ // fallback demo if no keys yet
      setProfiles([
        {id:"1",name:"Aisha",age:22,location:"Kawempe, Kampala",bio:"Love music and chapati 😍",photos:["https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=500"],interests:["Music","Dancing"]},
        {id:"2",name:"Brian",age:26,location:"Ntinda",bio:"Makerere student, gym guy",photos:["https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500"],interests:["Gym","Tech"]},
      ])
      return
    }
    const supabase = createClient(url,key)
    supabase.from('profiles').select('*').limit(20).then(({data})=>{
      if(data && data.length>0) setProfiles(data as any)
    })
  },[])

  const like = ()=>{
    const p = profiles[current]
    if(!p) return
    if(Math.random()>0.5){ setMatches(m=>[...m,p]); setShowMatch(p) }
    setCurrent(c=>c+1)
  }
  const pass = ()=> setCurrent(c=>c+1)

  const card = profiles[current]

  return (
    <div style={{background:"#0f0f0f",color:"white",minHeight:"100vh",fontFamily:"system-ui"}}>
      {/* Header */}
      <div style={{display:"flex",justifyContent:"space-between",padding:"16px",background:"#1a1a1a",position:"sticky",top:0,zIndex:10}}>
        <b style={{color:"#ff3366",fontSize:"20px"}}>KLA MEET</b>
        <div style={{display:"flex",gap:"12px"}}>
          <button onClick={()=>setTab('discover')} style={{opacity:tab==='discover'?1:0.5}}>Discover</button>
          <button onClick={()=>setTab('matches')} style={{opacity:tab==='matches'?1:0.5}}>Matches ({matches.length})</button>
          <button onClick={()=>setTab('premium')} style={{color:"#ff3366"}}>Premium</button>
        </div>
      </div>

      {tab==='discover' && (
        <div style={{maxWidth:"400px",margin:"0 auto",padding:"16px"}}>
          {!card? (
            <div style={{textAlign:"center",marginTop:"100px",opacity:0.6}}>
              <p>No more profiles near you</p>
              <p style={{fontSize:"12px",marginTop:"10px"}}>Add profiles in Supabase → profiles table → Insert row</p>
              <button onClick={()=>setCurrent(0)} style={{marginTop:"20px",background:"#ff3366",padding:"10px 20px",borderRadius:"20px"}}>Refresh</button>
            </div>
          ) : (
            <div style={{background:"#222",borderRadius:"20px",overflow:"hidden"}}>
              <img src={card.photos?.[0]} style={{width:"100%",height:"500px",objectFit:"cover"}}/>
              <div style={{padding:"16px"}}>
                <h2>{card.name}, {card.age} • {card.location}</h2>
                <p style={{opacity:0.7,margin:"8px 0"}}>{card.bio}</p>
                <div style={{display:"flex",gap:"6px",flexWrap:"wrap"}}>{card.interests?.map(i=><span key={i} style={{background:"#333",padding:"4px 10px",borderRadius:"12px",fontSize:"12px"}}>{i}</span>)}</div>
                <div style={{display:"flex",justifyContent:"space-around",marginTop:"20px"}}>
                  <button onClick={pass} style={{width:"60px",height:"60px",borderRadius:"30px",background:"#333",fontSize:"24px"}}>✕</button>
                  <button onClick={like} style={{width:"70px",height:"70px",borderRadius:"35px",background:"#ff3366",fontSize:"28px"}}>♥</button>
                </div>
              </div>
            </div>
          )}
          <div style={{display:"flex",gap:"10px",justifyContent:"center",marginTop:"30px",fontSize:"12px",opacity:0.4}}>
            <a href="/privacy">Privacy</a><a href="/terms">Terms</a><a href="/safety">Safety</a><a href="/premium">Premium - MTN/Airtel/Visa</a>
          </div>
        </div>
      )}

      {tab==='matches' && (
        <div style={{maxWidth:"400px",margin:"0 auto",padding:"16px"}}>
          <h3>Your Matches</h3>
          {matches.length===0 && <p style={{opacity:0.5,marginTop:"40px"}}>No matches yet. Start swiping!</p>}
          {matches.map(m=><div key={m.id} style={{display:"flex",gap:"12px",background:"#1e1e1e",padding:"12px",borderRadius:"12px",marginTop:"10px"}}><img src={m.photos?.[0]} style={{width:"50px",height:"50px",borderRadius:"25px"}}/><div><b>{m.name}</b><p style={{fontSize:"12px",opacity:0.6}}>Say hi! 👋</p></div></div>)}
        </div>
      )}

      {tab==='premium' && (
        <div style={{maxWidth:"400px",margin:"0 auto",padding:"20px"}}>
          <h2 style={{color:"#ff3366"}}>KLA Premium 💎</h2>
          <div style={{background:"linear-gradient(135deg,#ff3366,#ff6b6b)",padding:"20px",borderRadius:"16px",marginTop:"16px"}}>
            <p>✓ Unlimited likes</p><p>✓ See who liked you</p><p>✓ Boost in Kampala</p><p>✓ MTN, Airtel Money, Visa</p>
            <button style={{width:"100%",marginTop:"16px",background:"white",color:"#ff3366",padding:"12px",borderRadius:"12px",fontWeight:"bold"}}>Upgrade 15,000 UGX/week</button>
          </div>
          <p style={{fontSize:"11px",opacity:0.5,marginTop:"20px"}}>Payments processed by Google Play Billing & PesaPal. 18+ only. Block & Report available in chat.</p>
        </div>
      )}

      {showMatch && (
        <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.9)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:100}}>
          <div style={{textAlign:"center",padding:"20px"}}>
            <h1 style={{fontSize:"40px"}}>It's a Match! 🎉</h1>
            <p>You and {showMatch.name} liked each other</p>
            <img src={showMatch.photos?.[0]} style={{width:"120px",height:"120px",borderRadius:"60px",margin:"20px auto"}}/>
            <div style={{display:"flex",gap:"10px",justifyContent:"center",marginTop:"20px"}}>
              <button onClick={()=>setShowMatch(null)} style={{background:"#333",padding:"12px 24px",borderRadius:"20px"}}>Keep Swiping</button>
              <button onClick={()=>{setShowMatch(null);setTab('matches')}} style={{background:"#ff3366",padding:"12px 24px",borderRadius:"20px"}}>Say Hi</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
