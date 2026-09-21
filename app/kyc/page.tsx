'use client';









import { supabase } from '@/lib/supabase'
import BottomNav from '@/components/BottomNav'
export default function KYC(){
  const upload=async(e:any)=>{
    const file=e.target.files[0]; const {data:{user}}=await supabase.auth.getUser();
    const {data}=await supabase.storage.from('kyc-docs').upload(`${user?.id}/${file.name}`,file);
    await supabase.from('kyc_verifications').insert({user_id:user?.id, id_photo_url:data?.path, status:'pending'});
    alert('KYC Submitted! Admin will verify ✅');
  }
  return <div className="app-shell"><header className="topbar"><div><p className="eyebrow">Your profile</p><h1 className="display text-2xl font-bold mt-1">Verification</h1></div><div className="w-10 h-10 rounded-full bg-[#ffc629] grid place-items-center font-bold">K</div></header><main className="content"><div className="soft-panel mt-4"><div className="w-12 h-12 rounded-full bg-[#ffc629] grid place-items-center text-xl mb-5">✓</div><h2 className="display text-xl font-bold">Get verified</h2><p className="text-sm text-stone-500 mt-2 mb-6">A verified profile helps people feel confident saying hello. Your ID stays private.</p><label className="block text-sm font-bold mb-2">Government ID</label><input type="file" onChange={upload} className="field bg-[#fffdf9]"/><p className="text-xs text-stone-400 mt-4">Accepted formats: JPG, PNG or PDF</p></div></main><BottomNav/></div>
}
