"use client";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
function LoginContent(){
  const params = useSearchParams();
  const error = params.get("error");
  return (
    <div style={{maxWidth:400, margin:"40px auto", padding:20, fontFamily:"system-ui"}}>
      <h2>KLA-MEET Login</h2>
      {error && <div style={{background:"#fee", color:"#c00", padding:12, borderRadius:8, marginBottom:12, fontSize:13}}>Login failed: {error}<br/><br/>Magic link expired? Request new one. Magic links expire in 1 hour.</div>}
      <p style={{fontSize:13, color:"#666"}}>If you see "Email link is invalid", go to Supabase Dashboard → Auth → URL Config → Set Site URL to https://kla-meet.vercel.app</p>
      <a href="/welcome" style={{display:"block", marginTop:20, padding:12, background:"#000", color:"#fff", textAlign:"center", borderRadius:20, textDecoration:"none"}}>Go to Login</a>
    </div>
  )
}
export default function LoginPage(){
  return <Suspense><LoginContent/></Suspense>
}
