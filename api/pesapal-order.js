export default async function handler(req,res){
 if(req.method!=='POST') return res.status(405).json({error:'POST only'})
 const { amount, plan, currency='USD', email } = req.body
 const key = process.env.PESAPAL_KEY
 const secret = process.env.PESAPAL_SECRET
 if(!key||!secret) return res.status(500).json({error:'Missing PESAPAL_KEY/SECRET in Vercel env (without VITE_)'})

 // Auth Pesapal
 const authR = await fetch('https://pay.pesapal.com/v3/api/Auth/RequestToken',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({consumer_key:key, consumer_secret:secret})})
 const authD = await authR.json()
 if(!authD.token) return res.status(500).json({error:'Pesapal auth failed', detail:authD})

 // Create order USD to avoid 20k UGX limit
 const orderR = await fetch('https://pay.pesapal.com/v3/api/Transactions/SubmitOrderRequest',{
  method:'POST',
  headers:{'Content-Type':'application/json','Authorization':`Bearer ${authD.token}`},
  body:JSON.stringify({
    id: `KLA-${Date.now()}`,
    currency: currency, // USD
    amount: amount, // 3.99 or 6.99
    description: `KLA-MEET Premium ${plan}`,
    callback_url: `https://${req.headers.host}/premium/?success=1`,
    notification_id: process.env.PESAPAL_IPN_ID || '',
    billing_address: { email_address: email || 'user@kla-meet.com', first_name: 'KLA', last_name: 'User', phone_number: '' }
  })
 })
 const orderD = await orderR.json()
 return res.json(orderD)
}