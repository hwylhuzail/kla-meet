import { createClient } from '@supabase/supabase-js'
const supabase = createClient(process.env.VITE_SUPABASE_URL, process.env.VITE_SUPABASE_ANON)
export default async function handler(req,res){
  const { trackId, status, amount } = req.body
  console.log('OXA webhook', req.body)
  if(status==='Paid' || status==='Confirmed'){
    // Mark premium alive
    await supabase.from('payments').insert([{user_name: trackId, plan: trackId.includes('standard')?'standard':'basic', method:'oxa_light', amount, status:'confirmed', tx_hash: trackId }])
  }
  res.json({received:true})
}
