import { createClient } from '@supabase/supabase-js'
const supabase = createClient(process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL, process.env.VITE_SUPABASE_ANON || process.env.SUPABASE_ANON_KEY)
export default async function handler(req,res){
  const { tx_hash, user } = req.body
  await supabase.from('payments').update({status:'confirmed'}).eq('tx_hash',tx_hash)
  await supabase.from('profiles').update({is_premium:'standard'}).eq('name',user)
  res.json({ok:true, premium:true})
}
