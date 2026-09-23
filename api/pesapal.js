export default async function handler(req,res){
  if(req.method!=='POST') return res.status(405).json({error:'POST only'})
  try{
    const { plan, email='user@kla-meet.com' } = req.body
    const prices = { basic: 2.99, standard: 5.99 }
    const amount = prices[plan] || 2.99

    const KEY = process.env.PESAPAL_CONSUMER_KEY
    const SECRET = process.env.PESAPAL_CONSUMER_SECRET
    const ENV = process.env.PESAPAL_ENV || 'sandbox' // live when ready
    if(!KEY ||!SECRET) return res.json({ok:false, error:'Add PESAPAL_CONSUMER_KEY/SECRET in Vercel'})

    const base = ENV==='live'? 'https://pay.pesapal.com/v3' : 'https://cybqa.pesapal.com/pesapalv3'

    // 1. Auth
    const authRes = await fetch(`${base}/api/Auth/RequestToken`,{
      method:'POST',
      headers:{'Content-Type':'application/json'},
      body: JSON.stringify({consumer_key: KEY, consumer_secret: SECRET})
    })
    const auth = await authRes.json()
    const token = auth.token

    // 2. Order
    const orderRes = await fetch(`${base}/api/Transactions/SubmitOrderRequest`,{
      method:'POST',
      headers:{'Content-Type':'application/json','Authorization':`Bearer ${token}`},
      body: JSON.stringify({
        id: `KLA-${plan}-${Date.now()}`,
        currency: 'USD',
        amount,
        description: `KLA-MEET ${plan} Keep Love Alive`,
        callback_url: `https://${req.headers.host}/?paid=${plan}`,
        notification_id: process.env.PESAPAL_IPN_ID || '',
        billing_address: { email_address: email, first_name:'KLA', last_name:'User' }
      })
    })
    const order = await orderRes.json()
    res.json({ok:true,...order, amount, plan, provider:'pesapal'})
  }catch(e){
    res.status(500).json({ok:false, error:e.message})
  }
}
