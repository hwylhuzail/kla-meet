'use client'
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
export default function Admin(){
  const [kycs,setKycs]=useState<any[]>([]);
  useEffect(()=>{supabase.from('kyc_verifications').select('*, profiles(full_name)').eq('status','pending').then(({data})=>setKycs(data||[]))},[]);
  const approve=async(id:string, uid:string)=>{await supabase.from('kyc_verifications').update({status:'approved'}).eq('id',id); await supabase.from('profiles').update({is_verified:true}).eq('id',uid); alert('Approved'); setKycs(kycs.filter(k=>k.id!==id))};
  return <div className="p-6"><h1 className="text-xl font-bold">Admin Panel</h1><p className="text-sm mb-4">KYC Queue: {kycs.length}</p>{kycs.map(k=><div key={k.id} className="bg-white p-4 rounded-xl mb-3 shadow flex justify-between"><span>{k.profiles?.full_name}</span><button onClick={()=>approve(k.id,k.user_id)} className="bg-green-500 text-white px-4 py-1 rounded-full">Approve</button></div>)}</div>
}