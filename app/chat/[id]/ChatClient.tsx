'use client'
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { useParams } from 'next/navigation'
export default function Chat() {
  const {id}=useParams();
  const [msgs,setMsgs]=useState<any[]>([]); const [txt,setTxt]=useState('');
  useEffect(()=>{supabase.from('messages').select('*').eq('match_id',id).order('created_at').then(({data})=>setMsgs(data||[])); const ch=supabase.channel('chat').on('postgres_changes',{event:'INSERT',schema:'public',table:'messages',filter:`match_id=eq.${id}`},p=>setMsgs(m=>[...m,p.new])).subscribe(); return()=>{supabase.removeChannel(ch)}},[id]);
  const send=async()=>{ if(!txt.trim()) return; await supabase.from('messages').insert({match_id:id,content:txt}); setTxt('') }
  return <div style={{padding:16}}><div>{msgs.map((m:any,i:number)=><div key={i}>{m.content}</div>)}</div><input value={txt} onChange={e=>setTxt(e.target.value)} placeholder="Type..." style={{border:'1px solid #ccc',padding:8,marginTop:16,width:'80%'}}/><button onClick={send} style={{padding:8,marginLeft:8}}>Send</button></div>
}
