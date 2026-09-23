import { createClient } from '@supabase/supabase-js'

const supabase = createClient(process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL, process.env.VITE_SUPABASE_ANON || process.env.SUPABASE_ANON_KEY)

export default async function handler(req,res){
  if(req.method!=='POST') return res.status(405).json({error:'POST only'})
  try{
    const { plan, method, user, tx_hash } = req.body
    const prices = { basic: 2.99, standard: 5.99 }
    const amount = prices[plan] || 2.99

    // Save payment attempt alive
    await supabase.from('payments').insert([{ user_name: user||'guest', plan, method, amount, status: tx_hash?'awaiting_confirm':'pending', tx_hash }])

    if(method==='pesapal'){
      // TODO: Add your PESAPAL_CONSUMER_KEY/SECRET in Vercel Env
      // For now returns Pesapal checkout URL — replace with real API call
      const pesapalUrl = `https://pay.pesapal.com/v3?amount=${amount}&currency=USD&desc=KLA-${plan}&reference=${Date.now()}`
      return res.json({ ok:true, provider:'pesapal', redirect: pesapalUrl, amount })
    }
    if(method==='crypto'){
      return res.json({
        ok:true,
        provider:'crypto',
        amount,
        networks: {
          BTC: 'bc1q...REPLACE_WITH_YOUR_BTC',
          USDT_TRC20: 'T...REPLACE_WITH_YOUR_TRC20',
          USDT_ERC20: '0x...REPLACE_WITH_YOUR_ERC20',
          ETH: '0x...REPLACE_WITH_YOUR_ETH'
        },
        instruction: `Send $${amount} for ${plan}. Then paste TX hash below and we confirm in Supabase.`
      })
    }
    return res.json({ok:true, amount})
  }catch(e){
    return res.status(500).json({error:e.message})
  }
}
