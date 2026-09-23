export default async function handler(req,res){
  if(req.method!=='POST') return res.status(405).json({error:'POST only'})
  const { plan, method, user } = req.body // plan: basic|standard, method: pesapal|crypto
  const prices = { basic: 2.99, standard: 5.99 }
  const amount = prices[plan]

  // PESAPAL
  if(method==='pesapal'){
    // Call Pesapal API with your VITE_PESAPAL_KEY
    // For now return redirect URL
    return res.json({ ok:true, redirect: `https://pay.pesapal.com?amount=${amount}&plan=${plan}&user=${user}`, provider:'pesapal' })
  }
  // CRYPTO
  if(method==='crypto'){
    // Example BTC/USDT address — replace with yours
    return res.json({ ok:true, address: 'bc1q...YOUR_BTC', usdt: '0x...YOUR_USDT', amount, provider:'crypto', note:'Send and upload TX hash' })
  }
  res.json({ok:true})
}
