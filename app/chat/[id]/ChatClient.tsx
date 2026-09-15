'use client'
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { useParams } from 'next/navigation'
export default function Chat() {
  const {id}=useParams();
  const [msgs,setMsgs]=useState<any[]>([]); const [txt,setTxt]=useState('');
  useEffect(()=>{supabase.from('messages').select('*').eq('match_id',id).order('created_at').then(({data})=>setMsgs(data||[])); const ch=supabase.channel('chat').on('postgres_changes',{event:'INSERT',schema:'public',table:'messages',filter:`match_id=eq.${id}`},p=>setMsgs(m=>[...m,p.new])).subscribe(); return()=>{supabase.removeChannel(ch)}},[id]);
  const send=async()=>{ if(!txt.trim()) return; await supabase.from('messages').insert({match_id:id,content:txt}); setTxt('') }
  return <div className="app-shell"><header className="topbar"><div className="flex items-center gap-3"><button className="icon-button" aria-label="Go back">←</button><div><p className="font-bold">Your conversation</p><p className="text-xs text-stone-500">KLA Meet</p></div></div><button className="icon-button" aria-label="More options">⋯</button></header><main className="content min-h-[calc(100vh-154px)]"><div className="soft-panel mt-4 mb-4 text-center"><p className="text-sm font-semibold">Start with a question</p><p className="text-xs text-stone-500 mt-1">Good conversations begin with curiosity.</p></div><div className="space-y-3">{msgs.map((m:any,i:number)=><div key={i} className="bg-white border border-[#ece9e2] rounded-2xl p-3 max-w-[80%]">{m.content}</div>)}</div></main><div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[520px] p-3 border-t border-[#ece9e2] bg-white flex gap-2"><input value={txt} onChange={e=>setTxt(e.target.value)} placeholder="Write a message..." className="field rounded-full"/><button onClick={send} className="bg-[#ffc629] text-black w-12 h-12 rounded-full font-bold" aria-label="Send message">↑</button></div></div>
}
