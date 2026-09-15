"use client"
import { useState } from "react"
export default function Premium(){
  const [method,setMethod]=useState("mtn")
  const pay = async()=>{
    const res = await fetch("/api/pesapal",{method:"POST",body:JSON.stringify({method,amount:15000})})
    const data = await res.json()
    if(data.url) window.location.href=data.url; else alert("PesaPal not configured yet - add keys in .env. Using Google Play Billing for now.")
  }
  return (
    <div style={{maxWidth:"400px",margin:"20px auto",padding:"20px",color:"#fff"}}>
      <h1 style={{color:"#ff3366"}}>KLA Premium 💎</h1>
      <div style={{background:"#222",padding:"16px",borderRadius:"12px",marginTop:"16px"}}>
        <h3>Choose Payment</h3>
        <select value={method} onChange={e=>setMethod(e.target.value)} style={{width:"100%",padding:"12px",background:"#111",color:"#fff",borderRadius:"8px",marginTop:"10px"}}>
          <option value="mtn">MTN MoMo</option><option value="airtel">Airtel Money</option><option value="visa">Visa / Mastercard</option><option value="google">Google Play Billing</option>
        </select>
        <button onClick={pay} style={{width:"100%",background:"#ff3366",padding:"14px",borderRadius:"12px",marginTop:"16px",fontWeight:"bold"}}>Pay 15,000 UGX / week</button>
        <p style={{fontSize:"11px",opacity:0.5,marginTop:"10px"}}>Secure via PesaPal & Google. Auto-renews. Cancel anytime in Settings → Subscription. 18+ only.</p>
      </div>
    </div>
  )
}
