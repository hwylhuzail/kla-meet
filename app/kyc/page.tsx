'use client'
import { supabase } from '@/lib/supabase'
import BottomNav from '@/components/BottomNav'
export default function KYC(){
  const upload=async(e:any)=>{
    const file=e.target.files[0]; const {data:{user}}=await supabase.auth.getUser();
    const {data}=await supabase.storage.from('kyc-docs').upload(`${user?.id}/${file.name}`,file);
    await supabase.from('kyc_verifications').insert({user_id:user?.id, id_photo_url:data?.path, status:'pending'});
    alert('KYC Submitted! Admin will verify ✅');
  }
  return <div className="p-6 pb-20"><h1 className="text-xl font-bold">KYC Verification</h1><p className="text-sm text-gray-500 mb-4">Upload ID to get blue tick ✅</p><input type="file" onChange={upload} className="w-full p-4 border rounded-xl bg-white"/><BottomNav/></div>
}