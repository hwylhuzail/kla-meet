"use client"
import { useState } from "react"
import { createClient } from "@supabase/supabase-js"
export default function Login(){
  const [phone,setPhone]=useState(""); const [otp,setOtp]=useState(""); const [step,setStep]=useState(1)
  const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!)
  const sendCode = async()=>{
    const {error} = await supabase.auth.signInWithOtp({phone:"+256"+phone.replace(/^0/,"")})
    if(!error) setStep(2); else alert(error.message)
  }
  const verifyCode = async()=>{
    const {error} = await supabase.auth.verifyOtp({phone:"+256"+phone.replace(/^0/,""),token:otp,type:"sms"})
    if(!error) window.location.href="/"; else alert("Wrong code")
  }
  return (
    <div style={{maxWidth:"400px",margin:"40px auto",padding:"20px",background:"#1a1a1a",borderRadius:"16px",color:"#fff"}}>
      <h2>Login with Phone 🇺🇬</h2>
      {step===1 ? <>
        <input value={phone} onChange={e=>setPhone(e.target.value)} placeholder="772 123456 (MTN/Airtel)" style={{width:"100%",padding:"12px",borderRadius:"8px",background:"#222",color:"#fff",marginTop:"16px"}}/>
        <button onClick={sendCode} style={{width:"100%",background:"#ff3366",padding:"12px",borderRadius:"8px",marginTop:"12px"}}>Send Code via SMS</button>
      </> : <>
        <input value={otp} onChange={e=>setOtp(e.target.value)} placeholder="Enter 6-digit code" style={{width:"100%",padding:"12px",borderRadius:"8px",background:"#222",color:"#fff",marginTop:"16px"}}/>
        <button onClick={verifyCode} style={{width:"100%",background:"#ff3366",padding:"12px",borderRadius:"8px",marginTop:"12px"}}>Verify & Login</button>
      </>}
      <p style={{fontSize:"12px",opacity:0.5,marginTop:"16px"}}>We use Supabase Auth. Your number is for verification only. 18+ only.</p>
    </div>
  )
}
