"use client"
import { useState, useEffect } from "react"
import { supabase } from "@/lib/supabase"

const USERS = [
{name:"Sarah",age:27,country:"Uganda",flag:"🇺🇬",city:"Kampala",online:true,match:92,bio:"Loves travel, music & good conversations.",photo:"https://images.unsplash.com/photo-1517841905240-472988babdf9?w=600",verified:true,intention:"Serious relationship",id:"1"},
{name:"Aisha",age:24,city:"Nairobi",country:"Kenya",flag:"🇰🇪",online:true,match:88,bio:"Coffee lover, gym & real vibes.",photo:"https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=600",verified:true,intention:"Dating",id:"2"},
{name:"David",age:28,city:"London",country:"UK",flag:"🇬🇧",online:false,match:95,bio:"Tech & travel. Open to relocating.",photo:"https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600",verified:true,intention:"Marriage",id:"3"},
{name:"Vanessa",age:24,city:"Ntinda",country:"Uganda",flag:"🇺🇬",online:true,match:94,bio:"Entrepreneur. Real vibes, not games.",photo:"https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=600",verified:true,intention:"Serious relationship",id:"4"},
{name:"James",age:26,city:"Toronto",country:"Canada",flag:"🇨🇦",online:true,match:89,bio:"Gym, music, good talks.",photo:"https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=600",verified:false,intention:"Friendship",id:"5"},
{name:"Fatima",age:25,city:"Dubai",country:"UAE",flag:"🇦🇪",online:true,match:91,bio:"Fashion designer, travel lover.",photo:"https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=600",verified:true,intention:"Serious",id:"6"},
]

export default function Home(){
const [profiles,setProfiles]=useState(USERS)
const [i,setI]=useState(0)
const [showPay,setShowPay]=useState(false)
const [showID,setShowID]=useState(false)
const [chatUser,setChatUser]=useState<any>(null)
const [tab,setTab]=useState('home')

useEffect(()=>{(async()=>{try{const {data}=await supabase.from('profiles').select('*'); if(data?.length) setProfiles(data)}catch{}})()},[])
const card = profiles[i]

const Card = ({u, large=false}:{u:any, large?:boolean}) => (
<div style={{background:"#1E1E1E",borderRadius:large?"22px":"18px",overflow:"hidden",border:"1px solid #2A2A2A",minWidth:large?"100%":"160px"}}>
<div style={{position:"relative"}}>
<img src={u.photo} style={{width:"100%",height:large?"540px":"190px",objectFit:"cover",display:"block"}} alt=""/>
<div style={{position:"absolute",top:"8px",left:"8px",display:"flex",gap:"4px"}}>
<span style={{background:"#000",color:"#fff",padding:"3px 7px",borderRadius:"12px",fontSize:"10px"}}>{u.flag} {u.city}</span>
{u.online && <span style={{background:"#4CAF50",color:"#fff",padding:"3px 7px",borderRadius:"12px",fontSize:"9px"}}>🟢 Online</span>}
</div>
<div style={{position:"absolute",top:"8px",right:"8px",display:"flex",gap:"4px"}}>
{u.verified && <span style={{background:"#7C4DFF",color:"#fff",padding:"3px 7px",borderRadius:"12px",fontSize:"9px",fontWeight:800}}>✓ ID</span>}
<span style={{background:"#FFC107",color:"#000",padding:"3px 7px",borderRadius:"12px",fontSize:"9px",fontWeight:900}}>{u.match}% Match</span>
</div>
{large && <div style={{position:"absolute",bottom:0,left:0,right:0,padding:"14px",background:"linear-gradient(to top, rgba(0,0,0,0.95), transparent)"}}>
<div style={{display:"flex",gap:"8px",alignItems:"center"}}><h2 style={{fontSize:"26px",fontWeight:900,margin:0}}>{u.name}, {u.age}</h2><span style={{background:"#7C4DFF",padding:"4px 10px",borderRadius:"12px",fontSize:"10px",fontWeight:800}}>ID OK</span></div>
<p style={{fontSize:"11px",marginTop:"4px"}}>{u.flag} {u.city}, {u.country} • {u.intention}</p>
<p style={{fontSize:"11px",marginTop:"6px"}}>{u.bio}</p>
<div style={{marginTop:"8px"}}><span style={{background:"#7C4DFF",padding:"5px 10px",borderRadius:"20px",fontSize:"10px"}}>✓ NIN: Verified • Real person • office checked</span></div>
</div>}
</div>
<div style={{padding:"10px"}}>
{!large && <><b style={{fontSize:"13px"}}>{u.name}, {u.age}</b><p style={{fontSize:"10px",color:"#aaa"}}>{u.flag} {u.city} • {u.intention}</p><p style={{fontSize:"10px",marginTop:"4px",lineHeight:"1.3"}}>{u.bio}</p></>}
<div style={{display:"flex",gap:"6px",marginTop:large?"14px":"8px",justifyContent:large?"center":"space-between"}}>
<button onClick={()=>setI(v=>v+1)} style={{background:"#2A2A2A",color:"#fff",border:"1px solid #444",padding:large?"10px 18px":"6px 10px",borderRadius:"20px",fontSize:large?"14px":"10px",fontWeight:700}}>✕ Pass</button>
<button onClick={()=>setChatUser(u)} style={{background:"#FFC107",color:"#000",border:"2px solid #000",padding:large?"10px 18px":"6px 10px",borderRadius:"20px",fontSize:large?"14px":"10px",fontWeight:900}}>❤️ Like</button>
<button onClick={()=>setChatUser(u)} style={{background:"#7C4DFF",color:"#fff",border:"none",padding:large?"10px 18px":"6px 10px",borderRadius:"20px",fontSize:large?"14px":"10px",fontWeight:700}}>💬 Message</button>
</div>
</div>
</div>
)

return(
<div style={{background:"#121212",minHeight:"100vh",color:"#fff",fontFamily:"system-ui"}}>
{/* HEADER - KLA MEET logo + Notifications + Messages + Profile */}
<div style={{background:"#FFC107",padding:"10px 12px",display:"flex",justifyContent:"space-between",alignItems:"center",position:"sticky",top:0,zIndex:40,borderBottom:"3px solid #000"}}>
<b style={{color:"#000",fontSize:"18px",fontWeight:900,letterSpacing:"-0.5px"}}>KLA•MEET <span style={{fontSize:"10px",background:"#000",color:"#FFC107",padding:"2px 6px",borderRadius:"10px"}}>GLOBAL</span></b>
<div style={{display:"flex",gap:"8px",alignItems:"center"}}>
<button onClick={()=>setTab('notifications')} style={{background:"#000",color:"#FFC107",width:"34px",height:"34px",borderRadius:"17px",border:"none",fontSize:"14px"}}>🔔</button>
<button onClick={()=>setTab('messages')} style={{background:"#000",color:"#FFC107",width:"34px",height:"34px",borderRadius:"17px",border:"none",fontSize:"14px"}}>💬</button>
<button onClick={()=>setTab('profile')} style={{background:"#fff",color:"#000",width:"34px",height:"34px",borderRadius:"17px",border:"2px solid #000",fontWeight:900}}>👤</button>
</div>
</div>

<div style={{maxWidth:"440px",margin:"0 auto",paddingBottom:"80px"}}>

{/* HERO */}
<div style={{padding:"16px",background:"linear-gradient(135deg, #FFC107 0%, #FF8F00 100%)",color:"#000",textAlign:"center"}}>
<h1 style={{fontSize:"22px",fontWeight:900,lineHeight:"1.2",margin:0}}>Meet someone who matches your world. 🌍❤️</h1>
<p style={{fontSize:"12px",marginTop:"6px",fontWeight:600,opacity:0.8}}>Discover genuine people from Uganda and around the world.</p>
<div style={{display:"flex",gap:"10px",justifyContent:"center",marginTop:"12px"}}>
<button onClick={()=>document.getElementById('discover-sec')?.scrollIntoView()} style={{background:"#000",color:"#FFC107",padding:"10px 18px",borderRadius:"20px",fontWeight:900,fontSize:"12px",border:"none"}}>Discover People</button>
<button onClick={()=>setTab('recommended')} style={{background:"#fff",color:"#000",padding:"10px 18px",borderRadius:"20px",fontWeight:900,fontSize:"12px",border:"3px solid #000"}}>Find My Match</button>
</div>
</div>

{/* OLD LAYOUT SWIPE CARD - KEPT AT TOP */}
<div id="discover-sec" style={{padding:"12px"}}>
<Card u={profiles[i] || USERS[0]} large={true} />
</div>

{/* RECOMMENDED */}
<div style={{padding:"12px"}}>
<div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}><b style={{fontSize:"15px"}}>💕 Recommended for You</b><span style={{fontSize:"10px",color:"#FFC107"}}>See All</span></div>
<div style={{marginTop:"10px",display:"grid",gridTemplateColumns:"1fr 1fr",gap:"10px"}}>
{profiles.slice(0,4).map(u=><Card key={u.id} u={u} />)}
</div>
</div>

{/* EXPLORE WORLD */}
<div style={{padding:"12px",background:"#1E1E1E",marginTop:"8px",borderTop:"1px solid #333",borderBottom:"1px solid #333"}}>
<b style={{fontSize:"15px"}}>🌍 Explore the World</b><p style={{fontSize:"11px",color:"#aaa",marginTop:"4px"}}>Meet people beyond borders</p>
<div style={{display:"flex",gap:"6px",flexWrap:"wrap",marginTop:"10px"}}>
{["🇺🇬 Uganda","🇰🇪 Kenya","🇹🇿 Tanzania","🇬🇧 UK","🇺🇸 USA","🇨🇦 Canada","🇦🇪 UAE","🇿🇦 South Africa"].map(c=><span key={c} style={{background:"#2A2A2A",border:"1px solid #444",padding:"6px 12px",borderRadius:"20px",fontSize:"11px"}}>{c}</span>)}
</div>
<button onClick={()=>setTab('worldwide')} style={{width:"100%",marginTop:"10px",background:"#FFC107",color:"#000",padding:"10px",borderRadius:"12px",fontWeight:900,border:"3px solid #000",fontSize:"12px"}}>Explore Worldwide ✈️</button>
</div>

{/* TODAY'S MATCHES */}
<div style={{padding:"12px"}}>
<b style={{fontSize:"15px"}}>✨ Today's Matches</b>
<div style={{marginTop:"10px",display:"grid",gridTemplateColumns:"1fr 1fr",gap:"10px"}}>
{profiles.slice(0,6).map(u=><div key={u.id} style={{background:"#1E1E1E",borderRadius:"14px",overflow:"hidden",border:"1px solid #333"}}><div style={{position:"relative"}}><img src={u.photo} style={{width:"100%",height:"160px",objectFit:"cover"}} alt=""/><span style={{position:"absolute",top:"6px",left:"6px",background:"#000",color:"#fff",fontSize:"9px",padding:"3px 6px",borderRadius:"10px"}}>{u.flag} {u.country}</span><span style={{position:"absolute",top:"6px",right:"6px",background:"#7C4DFF",color:"#fff",fontSize:"8px",padding:"3px 6px",borderRadius:"10px"}}>{u.verified?"✓ Verified":""}</span><span style={{position:"absolute",bottom:"6px",right:"6px",background:"#FFC107",color:"#000",fontSize:"9px",padding:"3px 6px",borderRadius:"10px",fontWeight:900}}>{u.match}%</span></div><div style={{padding:"8px"}}><b style={{fontSize:"11px"}}>{u.name}, {u.age}</b><p style={{fontSize:"9px",color:"#aaa"}}>{u.intention}</p></div></div>)}
</div>
</div>

{/* POPULAR - HORIZONTAL CAROUSEL */}
<div style={{padding:"12px"}}>
<b style={{fontSize:"15px"}}>🔥 Popular Members</b>
<div style={{display:"flex",gap:"10px",overflowX:"auto",marginTop:"10px",paddingBottom:"6px"}}>
{profiles.map(u=><div key={u.id} style={{minWidth:"110px",background:"#1E1E1E",borderRadius:"14px",overflow:"hidden",border:"2px solid #FFC107"}}><img src={u.photo} style={{width:"110px",height:"110px",objectFit:"cover"}} alt=""/><div style={{padding:"6px",textAlign:"center"}}><b style={{fontSize:"11px"}}>{u.name}</b><p style={{fontSize:"9px",color:"#FFC107"}}>{u.match}% • {u.flag}</p></div></div>)}
</div>
</div>

{/* NEW MEMBERS */}
<div style={{padding:"12px",background:"#1E1E1E",borderTop:"1px solid #333"}}>
<b style={{fontSize:"15px"}}>🆕 New Members</b><p style={{fontSize:"11px",color:"#aaa"}}>Meet people who recently joined KLA MEET.</p>
<div style={{display:"flex",gap:"10px",overflowX:"auto",marginTop:"10px"}}>
{[...profiles].reverse().map(u=><div key={u.id} style={{minWidth:"140px",background:"#121212",borderRadius:"14px",overflow:"hidden",border:"1px solid #333"}}><img src={u.photo} style={{width:"140px",height:"140px",objectFit:"cover"}} alt=""/><div style={{padding:"6px"}}><b style={{fontSize:"11px"}}>{u.name}, {u.age} • 🟢</b><p style={{fontSize:"9px",color:"#4CAF50"}}>Joined 2h ago • {u.city}</p></div></div>)}
</div>
</div>

{/* PRO UPGRADE */}
<div style={{margin:"12px",background:"linear-gradient(135deg,#7C4DFF,#FFC107)",padding:"16px",borderRadius:"18px",border:"3px solid #000",color:"#000"}}>
<b style={{fontSize:"15px",color:"#fff"}}>💎 Upgrade to KLA MEET Pro</b><p style={{fontSize:"11px",marginTop:"6px",color:"#fff",fontWeight:600}}>Get more matches. Go further.</p>
<div style={{marginTop:"8px",fontSize:"11px",color:"#000",background:"rgba(255,255,255,0.9)",padding:"10px",borderRadius:"12px",lineHeight:"1.6"}}>
✅ See who likes you<br/>✅ Unlimited likes<br/>✅ Advanced international filters<br/>✅ Profile boost 🔥<br/>✅ Incognito mode 👁️<br/>✅ Travel mode ✈️<br/>✅ Unlimited messaging 💬
</div>
<button onClick={()=>setShowPay(true)} style={{width:"100%",marginTop:"10px",background:"#000",color:"#FFC107",padding:"12px",borderRadius:"12px",fontWeight:900,border:"none"}}>Upgrade to Pro $29.99 →</button>
</div>

{/* SAFE & VERIFIED */}
<div style={{margin:"12px",background:"#1E1E1E",borderRadius:"16px",padding:"14px",border:"1px solid #333"}}>
<b>🛡️ Safe & Verified</b><p style={{fontSize:"11px",color:"#aaa",marginTop:"4px"}}>Real people. Real connections.</p>
<div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"8px",marginTop:"10px",fontSize:"11px"}}>
<div style={{background:"#121212",padding:"10px",borderRadius:"12px",border:"1px solid #333"}}>✅ Profile verification</div>
<div style={{background:"#121212",padding:"10px",borderRadius:"12px",border:"1px solid #333"}}>🛡️ Privacy protection</div>
<div style={{background:"#121212",padding:"10px",borderRadius:"12px",border:"1px solid #333"}}>🚫 Block & report</div>
<div style={{background:"#121212",padding:"10px",borderRadius:"12px",border:"1px solid #333"}}>🔐 Secure messaging</div>
</div>
</div>

{/* YOUR PROFILE */}
<div style={{margin:"12px",background:"#FFF8E1",color:"#000",borderRadius:"16px",padding:"14px",border:"3px solid #000"}}>
<b>📊 Your Profile</b><p style={{fontSize:"12px",marginTop:"4px"}}>Your profile is 75% complete</p>
<div style={{background:"#000",height:"8px",borderRadius:"4px",marginTop:"8px",overflow:"hidden"}}><div style={{width:"75%",background:"#FFC107",height:"100%"}}></div></div>
<button onClick={()=>setTab('profile')} style={{marginTop:"10px",background:"#000",color:"#FFC107",padding:"8px 16px",borderRadius:"20px",fontSize:"11px",fontWeight:800}}>Complete Profile →</button>
</div>

{/* CONVERSATION PREVIEW */}
<div style={{margin:"12px",background:"#1E1E1E",borderRadius:"16px",padding:"14px",border:"1px solid #333"}}>
<b>💬 Conversation Preview</b>
<div style={{marginTop:"10px",display:"flex",flexDirection:"column",gap:"8px"}}>
<div style={{display:"flex",gap:"10px",alignItems:"center",background:"#121212",padding:"8px",borderRadius:"12px"}}><img src={USERS[1].photo} style={{width:"40px",height:"40px",borderRadius:"20px"}} alt=""/><div><b style={{fontSize:"12px"}}>Aisha {USERS[1].flag}</b><p style={{fontSize:"11px",color:"#aaa"}}>"Hey! How's your day going?"</p></div><span style={{marginLeft:"auto",fontSize:"9px",color:"#888"}}>2 min ago</span></div>
<div style={{display:"flex",gap:"10px",alignItems:"center",background:"#121212",padding:"8px",borderRadius:"12px"}}><img src={USERS[0].photo} style={{width:"40px",height:"40px",borderRadius:"20px"}} alt=""/><div><b style={{fontSize:"12px"}}>Sarah {USERS[0].flag}</b><p style={{fontSize:"11px",color:"#aaa"}}>"Loved your travel pics! ✈️"</p></div><span style={{marginLeft:"auto",fontSize:"9px",color:"#888"}}>10 min ago</span></div>
</div>
</div>

<div style={{textAlign:"center",padding:"12px",fontSize:"10px",color:"#666"}}>
<a href="/privacy" style={{color:"#FFC107",margin:"0 8px"}}>Privacy</a><a href="/terms" style={{color:"#FFC107",margin:"0 8px"}}>Terms</a><a href="/safety" style={{color:"#FFC107",margin:"0 8px"}}>Safety</a>
<p style={{marginTop:"6px"}}>© 2026 KLA MEET • Global 50k+ Verified • Supabase</p>
</div>
</div>

{/* BOTTOM NAV */}
<div style={{position:"fixed",bottom:0,left:0,right:0,background:"#1E1E1E",borderTop:"1px solid #333",display:"flex",justifyContent:"space-around",padding:"8px 0",zIndex:40}}>
{[{k:'home',l:'🏠 Home'},{k:'discover',l:'🔎 Discover'},{k:'matches',l:'❤️ Matches'},{k:'messages',l:'💬 Messages'},{k:'profile',l:'👤 Profile'}].map(b=><button key={b.k} onClick={()=>setTab(b.k)} style={{background:"none",border:"none",color:tab===b.k?"#FFC107":"#888",fontSize:"10px",fontWeight:tab===b.k?"900":"600"}}>{b.l}</button>)}
</div>

{chatUser && <div style={{position:"fixed",inset:0,background:"#121212",zIndex:100,display:"flex",flexDirection:"column"}}><div style={{background:"#1E1E1E",padding:"10px",display:"flex",gap:"8px",alignItems:"center"}}><button onClick={()=>setChatUser(null)} style={{background:"#2A2A2A",color:"#fff",padding:"6px 10px",borderRadius:"8px",border:"none"}}>←</button><img src={chatUser.photo} style={{width:"32px",height:"32px",borderRadius:"16px"}} alt=""/><b>{chatUser.name} {chatUser.flag} • {chatUser.match}% Match • Verified</b></div><div style={{flex:1,padding:"12px",display:"flex",flexDirection:"column",gap:"8px"}}><div style={{background:"#2A2A2A",padding:"10px",borderRadius:"16px",alignSelf:"flex-start",fontSize:"12px"}}>Hey! How's your day going? 😊</div><div style={{background:"#FFC107",color:"#000",padding:"10px",borderRadius:"16px",alignSelf:"flex-end",fontSize:"12px"}}>Great! Love your {chatUser.city} vibe!</div></div><div style={{padding:"10px",display:"flex",gap:"6px",background:"#1E1E1E"}}><button style={{background:"#2A2A2A",padding:"8px",borderRadius:"10px",border:"none"}}>🎤</button><input placeholder="Message... Voice • Video • Translate" style={{flex:1,background:"#2A2A2A",border:"1px solid #444",padding:"8px 12px",borderRadius:"20px",color:"#fff"}}/><button style={{background:"#FFC107",color:"#000",padding:"8px 14px",borderRadius:"20px",fontWeight:900,border:"none"}}>Send</button></div></div>}

{showPay && <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.9)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:100,padding:"12px"}}><div style={{background:"#fff",color:"#000",padding:"16px",borderRadius:"16px",width:"100%",maxWidth:"360px",border:"3px solid #000"}}><b>💎 PRO $29.99</b><p style={{fontSize:"11px"}}>Unlimited likes, see who liked you, travel mode, boost, incognito, voice, video, translation, AI</p><button onClick={async()=>{try{await supabase.from('payments').insert({plan:"monthly",amount:29.99,currency:"USD"}); alert('Stripe $29.99 saved to Supabase'); setShowPay(false)}catch{alert('Create payments table')}}} style={{width:"100%",marginTop:"10px",background:"#635BFF",color:"#fff",padding:"12px",borderRadius:"12px",fontWeight:900,border:"2px solid #000"}}>Pay Stripe $29.99 • PayPal • MoMo</button><button onClick={()=>setShowPay(false)} style={{width:"100%",marginTop:"6px",padding:"8px"}}>Close</button></div></div>}

</div>
)
}
