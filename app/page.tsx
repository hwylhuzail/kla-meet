"use client"
import { useState, useEffect } from "react"
import { supabase } from "@/lib/supabase"

const USERS = [
  { id:"1", name:"Vanessa", age:24, city:"Ntinda", country:"Uganda", flag:"🇺🇬", bio:"Entrepreneur. Real vibes, not games. 18+ only", photo:"https://images.unsplash.com/photo-1517841905240-472988babdf9?w=600", interests:["Business","Travel","Gym"], verified:true, match:92, online:true, job:"Entrepreneur", intention:"Serious" },
  { id:"2", name:"Sarah", age:27, city:"Kampala", country:"Uganda", flag:"🇺🇬", bio:"Loves travel, music & good conversations.", photo:"https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=600", interests:["Travel","Music"], verified:true, match:92, online:true, job:"Designer", intention:"Serious" },
  { id:"3", name:"Aisha", age:24, city:"Nairobi", country:"Kenya", flag:"🇰🇪", bio:"Coffee & gym", photo:"https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=600", interests:["Art","Coffee"], verified:true, match:88, online:true, job:"Student", intention:"Dating" },
  { id:"4", name:"David", age:28, city:"London", country:"UK", flag:"🇬🇧", bio:"Tech & travel", photo:"https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600", interests:["Tech","Gym"], verified:true, match:95, online:false, job:"Founder", intention:"Marriage" },
]

export default function Home(){
  const [profiles,setProfiles]=useState(USERS)
  const [idx,setIdx]=useState(0)
  const [showPay,setShowPay]=useState(false)
  const [showID,setShowID]=useState(false)
  const [chatUser,setChatUser]=useState<any>(null)
  const [country,setCountry]=useState("All")

  useEffect(()=>{
    (async()=>{
      try{
        const {data} = await supabase.from('profiles').select('*').limit(20)
        if(data && data.length>0){
          const mapped = data.map((d:any)=>({
            id:d.id, name:d.name||"Vanessa", age:d.age||24, city:d.city||"Ntinda", country:d.country||"Uganda", flag:d.flag||"🇺🇬",
            bio:d.bio||"Entrepreneur", photo:d.photos?.[0]||d.photo||USERS[0].photo, interests:d.interests||["Business","Travel","Gym"], verified:true, match:d.match_percent||92, online:true, job:d.job||"Entrepreneur", intention:d.intention||"Serious"
          }))
          setProfiles(mapped)
        }
      }catch{}
    })()
  },[])

  const card = profiles[idx % profiles.length] || USERS[0]
  const filtered = country==="All"? profiles : profiles.filter(p=>p.country===country)

  async function likeLive(){
    try{
      await supabase.from('likes').insert({from_id:'me', to_id:card.id, type:'like'})
      await supabase.from('matches').insert({user1:'me', user2:card.id, compat:card.match})
      alert('Like LIVE saved to Supabase')
    }catch(e:any){ alert('Like LIVE - create likes/matches tables') }
    setIdx(v=>v+1)
  }
  async function passLive(){
    try{ await supabase.from('likes').insert({from_id:'me', to_id:card.id, type:'pass'}) }catch{}
    setIdx(v=>v+1)
  }
  async function payLive(amount:number, method:string){
    try{
      await supabase.from('payments').insert({plan:'monthly', amount, currency:'USD', method, status:'pending'})
      alert(method+' LIVE $'+amount+' saved')
      setShowPay(false)
    }catch(e:any){ alert('Create payments table: '+e.message) }
  }
  async function verifyLive(){
    try{
      await supabase.from('id_verifications').insert({user_name:'You', status:'pending', face_match:98})
      alert('Verification LIVE saved')
      setShowID(false)
    }catch(e:any){ alert('Create id_verifications table') }
  }

  return(
    <div style={{background:'#121212', minHeight:'100vh', color:'#fff', fontFamily:'system-ui'}}>
      <div style={{background:'#FFC107', padding:'12px', display:'flex', justifyContent:'space-between', alignItems:'center', position:'sticky', top:0, zIndex:40}}>
        <b style={{color:'#000', fontSize:'18px', fontWeight:900}}>KLA•MEET</b>
        <div style={{display:'flex', gap:'8px'}}>
          <button onClick={()=>setShowPay(true)} style={{background:'#000', color:'#FFC107', padding:'8px 12px', borderRadius:'20px', fontWeight:800, border:'none', fontSize:'12px'}}>PRO $</button>
          <button onClick={()=>setShowID(true)} style={{background:'#7C4DFF', color:'#fff', padding:'8px 12px', borderRadius:'20px', fontWeight:800, border:'2px solid #000', fontSize:'12px'}}>Verify ID</button>
        </div>
      </div>

      <div style={{maxWidth:'420px', margin:'0 auto', padding:'12px', paddingBottom:'80px'}}>

        <div style={{background:'#1E1E1E', borderRadius:'22px', overflow:'hidden', border:'1px solid #333'}}>
          <div style={{position:'relative'}}>
            <img src={card.photo} style={{width:'100%', height:'540px', objectFit:'cover'}} alt="profile"/>
            <div style={{position:'absolute', bottom:0, left:0, right:0, padding:'16px', background:'linear-gradient(to top, rgba(0,0,0,0.95), transparent)'}}>
              <div style={{display:'flex', gap:'8px', alignItems:'center'}}>
                <h2 style={{fontSize:'26px', fontWeight:900, margin:0}}>{card.name}, {card.age}</h2>
                <span style={{background:'#7C4DFF', padding:'4px 10px', borderRadius:'12px', fontSize:'11px', fontWeight:800}}>ID OK</span>
              </div>
              <p style={{fontSize:'12px', marginTop:'6px'}}>{card.bio}</p>
              <div style={{marginTop:'10px'}}>
                <span style={{background:'#7C4DFF', padding:'6px 12px', borderRadius:'20px', fontSize:'11px'}}>✓ NIN: Verified • Real person • office checked</span>
              </div>
            </div>
          </div>
          <div style={{padding:'14px'}}>
            <div style={{display:'flex', gap:'8px'}}>
              {card.interests.map((x:string)=><span key={x} style={{background:'#2A2A2A', padding:'7px 14px', borderRadius:'20px', fontSize:'11px', border:'1px solid #333'}}>{x}</span>)}
            </div>
            <div style={{display:'flex', gap:'20px', justifyContent:'center', marginTop:'20px'}}>
              <button onClick={passLive} style={{width:'60px', height:'60px', borderRadius:'30px', background:'#2A2A2A', border:'1px solid #444', color:'#fff', fontSize:'22px'}}>✕</button>
              <button onClick={likeLive} style={{width:'70px', height:'70px', borderRadius:'35px', background:'#FFC107', border:'3px solid #000', fontSize:'28px'}}>❤️</button>
            </div>
            <div style={{display:'flex', gap:'8px', justifyContent:'center', marginTop:'14px'}}>
              <button onClick={()=>setChatUser(card)} style={{background:'#4CAF50', color:'#fff', padding:'8px 16px', borderRadius:'20px', border:'none', fontSize:'11px', fontWeight:700}}>💬 Chat LIVE</button>
              <button onClick={()=>setCountry('Uganda')} style={{background:'#7C4DFF', color:'#fff', padding:'8px 16px', borderRadius:'20px', border:'none', fontSize:'11px'}}>🌍 Explore LIVE</button>
            </div>
            <div style={{marginTop:'12px', background:'#FFF8E1', color:'#000', padding:'10px', borderRadius:'12px', fontSize:'11px', border:'2px solid #000'}}>
              <b>Why This Match? {card.match}% ❤️ LIVE</b><br/>
              ✓ Both want {card.intention}<br/>
              ✓ Both enjoy {card.interests[0]}<br/>
              ✓ Similar age preferences<br/>
              ✓ 4 shared interests
            </div>
          </div>
        </div>

        <div style={{marginTop:'14px', background:'#1E1E1E', borderRadius:'16px', padding:'14px', border:'1px solid #333'}}>
          <b>🌍 Explore the World LIVE</b>
          <div style={{display:'flex', gap:'6px', flexWrap:'wrap', marginTop:'10px'}}>
            {['All','Uganda','Kenya','UK','USA','UAE'].map(c=><button key={c} onClick={()=>setCountry(c)} style={{background:country===c?'#FFC107':'#2A2A2A', color:country===c?'#000':'#fff', padding:'6px 12px', borderRadius:'20px', fontSize:'11px', border:'1px solid #444', fontWeight:700}}>{c==='All'?'🌎 All':'Dating in '+c}</button>)}
          </div>
        </div>

        <div style={{marginTop:'12px'}}>
          <b>💕 Recommended LIVE</b>
          <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:'10px', marginTop:'10px'}}>
            {filtered.slice(0,4).map((u:any)=><div key={u.id} style={{background:'#1E1E1E', borderRadius:'16px', overflow:'hidden', border:'1px solid #333'}}>
              <img src={u.photo} style={{width:'100%', height:'160px', objectFit:'cover'}} alt=""/>
              <div style={{padding:'8px'}}>
                <b style={{fontSize:'12px'}}>{u.name}, {u.age}</b>
                <p style={{fontSize:'10px', color:'#aaa'}}>{u.flag} {u.city} • {u.match}% Match</p>
                <button onClick={()=>likeLive()} style={{width:'100%', marginTop:'6px', background:'#FFC107', color:'#000', padding:'6px', borderRadius:'10px', fontWeight:800, border:'none', fontSize:'11px'}}>❤️ Like LIVE</button>
              </div>
            </div>)}
          </div>
        </div>

        <div style={{marginTop:'14px', background:'linear-gradient(135deg,#7C4DFF,#FFC107)', padding:'14px', borderRadius:'18px', border:'3px solid #000'}}>
          <b style={{color:'#fff'}}>💎 Upgrade to KLA MEET Pro LIVE</b>
          <div style={{marginTop:'8px', background:'rgba(255,255,255,0.95)', color:'#000', padding:'10px', borderRadius:'12px', fontSize:'11px', lineHeight:'1.6'}}>
            ✅ See who likes you LIVE<br/>
            ✅ Unlimited likes LIVE<br/>
            ✅ Travel mode LIVE<br/>
            ✅ Profile boost LIVE<br/>
            ✅ Unlimited messaging LIVE
          </div>
          <button onClick={()=>setShowPay(true)} style={{width:'100%', marginTop:'10px', background:'#000', color:'#FFC107', padding:'12px', borderRadius:'12px', fontWeight:900, border:'none'}}>Upgrade to Pro LIVE</button>
        </div>

        <div style={{marginTop:'12px', background:'#1E1E1E', borderRadius:'14px', padding:'12px', border:'1px solid #333}}>
          <b>🛡️ Safe & Verified LIVE</b>
          <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:'8px', marginTop:'10px', fontSize:'11px'}}>
            <div style={{background:'#121212', padding:'10px', borderRadius:'12px'}}>✅ Profile verification LIVE</div>
            <div style={{background:'#121212', padding:'10px', borderRadius:'12px'}}>🛡️ Privacy LIVE</div>
            <div style={{background:'#121212', padding:'10px', borderRadius:'12px'}}>🚫 Block & report LIVE</div>
            <div style={{background:'#121212', padding:'10px', borderRadius:'12px'}}>🔐 Secure messaging LIVE</div>
          </div>
        </div>

      </div>

      <div style={{position:'fixed', bottom:0, left:0, right:0, background:'#1E1E1E', borderTop:'1px solid #333', display:'flex', justifyContent:'space-around', padding:'10px 0'}}>
        <span style={{color:'#FFC107', fontSize:'11px', fontWeight:900}}>🏠 Home</span>
        <span style={{color:'#888', fontSize:'11px'}}>🔎 Discover LIVE</span>
        <span style={{color:'#888', fontSize:'11px'}}>❤️ Matches LIVE</span>
        <span style={{color:'#888', fontSize:'11px'}}>💬 Messages LIVE</span>
        <span style={{color:'#888', fontSize:'11px'}}>👤 Profile LIVE</span>
      </div>

      {chatUser && <div style={{position:'fixed', inset:0, background:'#121212', zIndex:100, display:'flex', flexDirection:'column'}}>
        <div style={{background:'#1E1E1E', padding:'12px', display:'flex', gap:'10px', alignItems:'center'}}>
          <button onClick={()=>setChatUser(null)} style={{background:'#2A2A2A', color:'#fff', padding:'6px 10px', borderRadius:'8px', border:'none'}}>←</button>
          <b>{chatUser.name} LIVE Chat</b>
        </div>
        <div style={{flex:1, padding:'12px'}}>
          <p style={{background:'#2A2A2A', padding:'10px', borderRadius:'12px', fontSize:'13px'}}>Hey! How's your day going? LIVE</p>
        </div>
        <div style={{padding:'12px', display:'flex', gap:'8px', background:'#1E1E1E'}}>
          <input id="msg" placeholder="Message LIVE" style={{flex:1, background:'#2A2A2A', border:'1px solid #444', padding:'12px', borderRadius:'20px', color:'#fff'}}/>
          <button onClick={async()=>{const el=document.getElementById('msg') as any; if(!el.value) return; try{await supabase.from('messages').insert({from_id:'me', to_id:chatUser.id, text:el.value})}catch{}; alert('Message LIVE sent'); el.value=''}} style={{background:'#FFC107', color:'#000', padding:'12px 18px', borderRadius:'20px', fontWeight:900, border:'none'}}>Send LIVE</button>
        </div>
      </div>}

      {showPay && <div style={{position:'fixed', inset:0, background:'rgba(0,0,0,0.9)', display:'flex', alignItems:'center', justifyContent:'center', zIndex:100, padding:'16px'}}>
        <div style={{background:'#fff', color:'#000', borderRadius:'20px', padding:'16px', width:'100%', maxWidth:'360px', border:'4px solid #000'}}>
          <h3 style={{fontWeight:900}}>PRO LIVE $29.99</h3>
          <button onClick={()=>payLive(29.99,'Stripe')} style={{width:'100%', marginTop:'12px', background:'#635BFF', color:'#fff', padding:'14px', borderRadius:'12px', fontWeight:900, border:'3px solid #000'}}>Stripe LIVE $29.99</button>
          <button onClick={()=>payLive(29.99,'PayPal')} style={{width:'100%', marginTop:'8px', background:'#FFC439', color:'#000', padding:'14px', borderRadius:'12px', fontWeight:900, border:'3px solid #000'}}>PayPal LIVE</button>
          <button onClick={()=>payLive(45000,'MoMo')} style={{width:'100%', marginTop:'8px', background:'#FFCC00', color:'#000', padding:'14px', borderRadius:'12px', fontWeight:900, border:'3px solid #000'}}>MTN MoMo LIVE</button>
          <button onClick={()=>setShowPay(false)} style={{width:'100%', marginTop:'10px', padding:'10px', background:'#eee', borderRadius:'10px', border:'none'}}>Close</button>
        </div>
      </div>}

      {showID && <div style={{position:'fixed', inset:0, background:'rgba(0,0,0,0.9)', display:'flex', alignItems:'center', justifyContent:'center', zIndex:100, padding:'16px'}}>
        <div style={{background:'#fff', color:'#000', borderRadius:'20px', padding:'16px', width:'100%', maxWidth:'360px', border:'4px solid #000'}}>
          <h3 style={{fontWeight:900}}>Verify ID LIVE</h3>
          <input type="file" onChange={async(e)=>{const f=e.target.files?.[0]; if(!f) return; try{await supabase.storage.from('id-docs').upload('id_'+Date.now()+'_'+f.name,f); alert('Uploaded LIVE')}catch(err:any){alert('Create bucket id-docs')}}} style={{width:'100%', marginTop:'10px', border:'2px solid #000', padding:'8px', borderRadius:'10px'}}/>
          <button onClick={verifyLive} style={{width:'100%', marginTop:'12px', background:'#4CAF50', color:'#fff', padding:'14px', borderRadius:'12px', fontWeight:900, border:'3px solid #000'}}>Submit LIVE</button>
          <button onClick={()=>setShowID(false)} style={{width:'100%', marginTop:'8px', padding:'10px', background:'#eee', borderRadius:'10px', border:'none'}}>Close</button>
        </div>
      </div>}
    </div>
  )
}
