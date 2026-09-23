export default async function handler(req,res){
  if(req.method!=='POST') return res.status(405).json({error:'POST only'})
  const { plan, coin='USDT', network='TRC20', user } = req.body
  const prices = { basic: 2.99, standard: 5.99 }
  const amount = prices[plan] || 2.99

  const OXAPAY_MERCHANT_KEY = process.env.OXAPAY_MERCHANT_KEY // <- add this in Vercel Env from Oxa dashboard > Merchant API
  if(!OXAPAY_MERCHANT_KEY) return res.json({ok:false, error:'Add OXAPAY_MERCHANT_KEY in Vercel'})

  // Create White Label payment - gives you raw address + QR, stays in your design
  const response = await fetch('https://api.oxapay.com/v1/payment/white-label',{
    method:'POST',
    headers:{'Content-Type':'application/json'},
    body: JSON.stringify({
      merchant: OXAPAY_MERCHANT_KEY,
      amount,
      coin, // BTC, ETH, USDT etc
      network, // TRC20, ERC20, BSC etc
      trackId: `${user||'guest'}-${plan}-${Date.now()}`,
      callbackUrl: `https://${req.headers.host}/api/oxa-webhook`,
      returnUrl: `https://${req.headers.host}/?paid=1`,
      description: `KLA-MEET Keep Love Alive ${plan}`,
      email: 'user@kla-meet.com'
    })
  })
  const data = await response.json()
  res.json({ok:true,...data, amount, plan})
}
