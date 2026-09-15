"use client"
export const dynamic = 'force-dynamic'
import { useEffect, useState } from "react"
import { createClient } from "@supabase/supabase-js"
export default function Page(){
  const [users,setUsers]=useState<any[]>([])
  useEffect(()=>{
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL
    const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    if(!url || !key) return
    const supabase = createClient(url, key)
    supabase.from('profiles').select('*').then(r=>setUsers(r.data||[]))
  },[])
  return (
    <div style={{background:"#111",color:"#fff",minHeight:"100vh",padding:"20px"}}>
      <h1>KLA Meet - Kampala</h1>
      <p>{users.length} real users</p>
      {users.map((u:any)=><div key={u.id} style={{background:"#222",margin:"10px 0",padding:"10px",borderRadius:"8px"}}><p>{u.name} {u.age} {u.location}</p></div>)}
      <div style={{marginTop:"20px"}}><a href="/privacy" style={{color:"#888"}}>Privacy</a> | <a href="/terms" style={{color:"#888"}}>Terms</a></div>
    </div>
  )
}
