export default async function handler(req, res){
  if(req.method!=='POST') return res.status(405).json({error:'POST only'})
  const { amount, plan } = req.body
  if(amount < 20000) return res.status(400).json({error:'Amount must be >20000 UGX per Pesapal limit'})

  // Pesapal Auth
  const authRes = await fetch('https://pay.pesapal.com/v3/api/Auth/RequestToken',{
    method:'POST',
    headers:{'Content-Type':'application/json'},
    body:JSON.stringify({
      consumer_key: process.env.PESAPAL_KEY,
      consumer_secret: process.env.PESAPAL_SECRET
    })
  })
  const auth = await authRes.json()
  if(!auth.token) return res.status(500).json({error:'Pesapal auth failed', details:auth})

  const orderRes = await fetch('https://pay.pesapal.com/v3/api/Transactions/SubmitOrderRequest',{
    method:'POST',
    headers:{'Content-Type':'application/json','Authorization':`Bearer ${auth.token}`},
    body:JSON.stringify({
      id: `KLA-${Date.now()}`,
      currency:'UGX',
      amount: amount,
      description:`KLA-MEET ${plan} - Keep Love Alive`,
      callback_url:'https://kla-meet.vercel.app/api/pesapal-callback',
      notification_id: process.env.PESAPAL_IPN_ID,
      billing_address:{email_address:'user@kla-meet.com', first_name:'KLA', last_name:'User'}
    })
  })
  const order = await orderRes.json()
  return res.json(order)
}