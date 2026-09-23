export default async function handler(req, res){
  res.setHeader('Access-Control-Allow-Origin', '*')
  if(req.method === 'OPTIONS') return res.status(200).end()
  if(req.method !== 'POST') return res.status(405).json({error:'POST only'})
  
  const { amount, plan } = req.body
  if(!amount || amount < 20000) return res.status(400).json({error:'Pesapal min 20000 UGX'})

  const key = process.env.PESAPAL_KEY
  const secret = process.env.PESAPAL_SECRET
  let ipnId = process.env.PESAPAL_IPN_ID

  if(!key || !secret) return res.status(500).json({error:'Missing PESAPAL_KEY in Vercel env'})

  try{
    // 1. AUTH
    const authRes = await fetch('https://pay.pesapal.com/v3/api/Auth/RequestToken',{
      method:'POST', headers:{'Content-Type':'application/json'},
      body:JSON.stringify({consumer_key:key, consumer_secret:secret})
    })
    const auth = await authRes.json()
    if(!auth.token) return res.status(500).json({error:'Auth failed', details:auth})

    // 2. AUTO-CREATE IPN IF NOT SET
    if(!ipnId){
      const ipnRes = await fetch('https://pay.pesapal.com/v3/api/URLSetup/RegisterIPN',{
        method:'POST',
        headers:{'Content-Type':'application/json','Authorization':`Bearer ${auth.token}`},
        body:JSON.stringify({
          url:'https://kla-meet.vercel.app/api/pesapal-callback',
          ipn_notification_type:'GET'
        })
      })
      const ipnData = await ipnRes.json()
      // Pesapal returns ipn_id
      ipnId = ipnData.ipn_id || ipnData.ipnId || ipnData.id
      console.log('Auto-created IPN:', ipnData)
    }

    // 3. CREATE ORDER
    const orderRes = await fetch('https://pay.pesapal.com/v3/api/Transactions/SubmitOrderRequest',{
      method:'POST',
      headers:{'Content-Type':'application/json','Authorization':`Bearer ${auth.token}`},
      body:JSON.stringify({
        id: `KLA-${Date.now()}`,
        currency:'UGX',
        amount: Number(amount),
        description:`KLA-MEET ${plan}`,
        callback_url:'https://kla-meet.vercel.app/api/pesapal-callback',
        notification_id: ipnId,
        billing_address:{email_address:'user@kla-meet.com', first_name:'KLA', last_name:'User', line_1:'Kampala', country_code:'UG'}
      })
    })
    const order = await orderRes.json()
    // Include auto IPN id for debugging
    order.auto_ipn_id = ipnId
    return res.json(order)

  }catch(e){
    return res.status(500).json({error:e.message})
  }
}