export default async function handler(req,res){
  // 1. SUCCESS PAGE - when Pesapal redirects back (GET)
  if(req.method==='GET'){
    res.setHeader('Content-Type','text/html')
    return res.send(`<html><head><meta name="viewport" content="width=device-width"><style>body{background:#000;color:white;font-family:sans-serif;text-align:center;padding:40px} h1{font-size:32px} a{background:#FFD400;color:black;padding:14px 28px;border-radius:30px;text-decoration:none;font-weight:bold;display:inline-block;margin-top:20px}</style></head><body><h1>Payment Successful! 🎉</h1><p>Welcome to KLA Premium - Keep Love Alive 💛</p><p>Plan activated - You can now chat worldwide!</p><p style="font-size:12px;color:#888;margin-top:20px">Transaction: ${req.query.OrderTrackingId || req.query.OrderMerchantReference || 'OK'}</p><a href="/discover">Go to Discover →</a></body></html>`)
  }

  // 2. CREATE ORDER - LIVE USD (POST)
  if(req.method!=='POST') return res.status(405).json({error:'POST only'})
  const { amount, plan, currency='USD', email } = req.body
  const key = process.env.PESAPAL_KEY
  const secret = process.env.PESAPAL_SECRET
  let ipnId = process.env.PESAPAL_IPN_ID
  if(!key||!secret) return res.status(500).json({error:'Missing PESAPAL_KEY/SECRET'})

  // Auth Pesapal
  const authR = await fetch('https://pay.pesapal.com/v3/api/Auth/RequestToken',{
    method:'POST',headers:{'Content-Type':'application/json'},
    body:JSON.stringify({consumer_key:key, consumer_secret:secret})
  })
  const authD = await authR.json()
  if(!authD.token) return res.status(500).json({error:'Pesapal auth failed', detail:authD})
  const token = authD.token

  // AUTOMATIC IPN - if env not set, get or create
  if(!ipnId){
    try{
      const listR = await fetch('https://pay.pesapal.com/v3/api/URLSetup/GetIpnList',{headers:{Authorization:`Bearer ${token}`}})
      const listD = await listR.json()
      if(Array.isArray(listD) && listD.length>0){
        // use existing IPN that matches our domain
        const found = listD.find(i=>i.url && i.url.includes(req.headers.host)) || listD[0]
        ipnId = found.ipn_id || found.id
      }
      if(!ipnId){
        const regR = await fetch('https://pay.pesapal.com/v3/api/URLSetup/RegisterIPN',{
          method:'POST',
          headers:{'Content-Type':'application/json', Authorization:`Bearer ${token}`},
          body:JSON.stringify({url:`https://${req.headers.host}/api/pesapal-ipn`, ipn_notification_type:'POST'})
        })
        const regD = await regR.json()
        ipnId = regD.ipn_id || regD.id
      }
    }catch(e){ console.log('IPN auto fail', e) }
  }
  if(!ipnId) return res.status(500).json({error:'No IPN ID - add PESAPAL_IPN_ID in Vercel or create IPN manually in Pesapal dashboard'})

  // Create order USD - bypass 20k UGX limit
  const orderR = await fetch('https://pay.pesapal.com/v3/api/Transactions/SubmitOrderRequest',{
    method:'POST',
    headers:{'Content-Type':'application/json','Authorization':`Bearer ${token}`},
    body:JSON.stringify({
      id: `KLA-${Date.now()}`,
      currency: currency || 'USD',
      amount: parseFloat(amount),
      description: `KLA-MEET Premium ${plan}`,
      callback_url: `https://${req.headers.host}/api/pesapal-order`,
      notification_id: ipnId,
      billing_address: { email_address: email||'user@kla-meet.com', first_name:'KLA', last_name:'User' }
    })
  })
  const orderD = await orderR.json()
  return res.json(orderD)
}