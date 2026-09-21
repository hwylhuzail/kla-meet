"use client";
import { useState } from "react";
export default function PremiumPage(){
  const [email,setEmail]=useState("huzayirukalungi4@gmail.com");
  const [plan,setPlan]=useState<'basic'|'pro'>('pro');
  const [error,setError]=useState("");
  const [loading,setLoading]=useState(false);
  
  async function pay(){
    setError(""); setLoading(true);
    try{
      const amount = plan==='basic'?5.41:13.51;
      const res = await fetch("/api/pesapal/order",{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body: JSON.stringify({email, amount, plan})
      });
      const data = await res.json();
      if(!res.ok) throw new Error(data.error || JSON.stringify(data).slice(0,300));
      if(data.redirect_url){
        window.location.href = data.redirect_url;
      }else{
        throw new Error("No redirect_url: "+JSON.stringify(data).slice(0,300));
      }
    }catch(e:any){
      setError(e.message);
    }finally{ setLoading(false); }
  }
  
  return (
    <div style={{maxWidth:420, margin:"20px auto", padding:20, fontFamily:"system-ui"}}>
      <div style={{display:"flex", gap:10, marginBottom:20}}>
        <button onClick={()=>setPlan('basic')} style={{flex:1, padding:12, borderRadius:8, border: plan==='basic'?'2px solid gold':'1px solid #ccc', background: plan==='basic'?'#fffbe6':'#f5f5f5'}}>Basic $5.41 30 days premium</button>
      </div>
      <div style={{display:"flex", gap:10, marginBottom:20}}>
        <button onClick={()=>setPlan('pro')} style={{flex:1, padding:12, borderRadius:8, border: plan==='pro'?'2px solid gold':'1px solid #ccc', background: plan==='pro'?'#fffbe6':'#f5f5f5', fontWeight:"bold"}}>POPULAR Pro $13.51 30 days premium</button>
      </div>
      <div style={{fontSize:14, lineHeight:"28px", marginBottom:20}}>
        ⭐ Unlimited discovery<br/>🌍 Worldwide filters<br/>❤️ See who liked you<br/>✨ Profile priority<br/>🎯 Advanced matching<br/>🔒 Incognito mode<br/>💬 Translation-ready chats<br/>🛡️ Safety tools
      </div>
      <input value={email} onChange={e=>setEmail(e.target.value)} placeholder="email" style={{width:"100%", padding:12, borderRadius:20, border:"1px solid #000", marginBottom:10}}/>
      {error && <div style={{color:"red", marginBottom:10, fontSize:13, wordBreak:"break-all"}}>{error}</div>}
      <button onClick={pay} disabled={loading} style={{width:"100%", padding:14, borderRadius:20, background: loading?"#ccc":"gold", border:"none", fontWeight:"bold"}}>{loading?"Processing...":`Pay $${plan==='basic'? '5.41':'13.51'} USD`}</button>
      <div style={{marginTop:10, fontSize:12}}>🔒 Secured by Pesapal - Cards • Bank Account • Worldwide</div>
    </div>
  )
}
