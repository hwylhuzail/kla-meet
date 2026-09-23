export default async function handler(req, res){
  res.setHeader('Access-Control-Allow-Origin', '*')
  if(req.method === 'OPTIONS') return res.status(200).end()
  if(req.method !== 'POST') return res.status(405).json({error:'POST only'})
  
  const { amount, plan } = req.body
  if(!amount || amount < 20000) return res.status(400).json({error:'Pesapal min 20000 UGX'})

  const key = process.env.PESAPAL_KEY
  const secret = process.env.PESAPAL_SECRET
  const ipnId = process.env.PESAPAL_IPN_ID

  if(!key || !secret){
    return res.status(500).json({error:'Missing PESAPAL_KEY - Add in Vercel env vars', demo:true})
  }

  try{
    const authRes = await fetch('https://pay.pesapal.com/v3/api/Auth/RequestToken',{
      method:'POST',
      headers:{'Content-Type':'application/json'},
      body:JSON.stringify({consumer_key:key, consumer_secret:secret})
    })
    const auth = await authRes.json()
    if(!auth.token) return res.status(500).json({error:'Auth failed', details:auth})

    const orderRes = await fetch('https://pay.pesapal.com/v3/api/Transactions/SubmitOrderRequest',{
      method:'POST',
      headers:{'Content-Type':'application/json','Authorization':`Bearer ${auth.token}`},
      body:JSON.stringify({
        id: `KLA-${Date.now()}`,
        currency:'UGX',
        amount: Number(amount),
        description:`KLA-MEET ${plan} - Keep Love Alive`,
        callback_url:'https://kla-meet.vercel.app/api/pesapal-callback',
        notification_id: ipnId,
        billing_address:{email_address:'user@kla-meet.com', phone_number:'', country_code:'UG', first_name:'KLA', last_name:'User', line_1:'Kampala'}
      })
    })
    const order = await orderRes.json()
    return res.json(order)
  }catch(e){
    return res.status(500).json({error:e.message})
  }
}