export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({error:'POST only'})
  try {
    const { plan } = req.body
    const amount = plan === 'standard' ? 5.99 : 2.99
    const id = `KLA-${Date.now()}`
    const authRes = await fetch('https://pay.pesapal.com/v3/api/Auth/RequestToken', {
      method:'POST',
      headers:{'Content-Type':'application/json'},
      body: JSON.stringify({
        consumer_key: process.env.PESAPAL_CONSUMER_KEY,
        consumer_secret: process.env.PESAPAL_CONSUMER_SECRET
      })
    })
    const auth = await authRes.json()
    if(!auth.token) return res.status(200).json({redirect_url:null})
    let ipnId = process.env.PESAPAL_IPN_ID
    if(!ipnId){
      const domain = `https://${process.env.VERCEL_URL || 'kla-meet.vercel.app'}`
      const ipnRes = await fetch('https://pay.pesapal.com/v3/api/URLSetup/RegisterIPN', {
        method:'POST',
        headers:{'Content-Type':'application/json','Authorization':`Bearer ${auth.token}`},
        body: JSON.stringify({url:`${domain}/api/pesapal-ipn`, ipn_notification_type:'GET'})
      })
      const ipnData = await ipnRes.json()
      ipnId = ipnData.ipn_id || ipnData.ipnId
    }
    const orderRes = await fetch('https://pay.pesapal.com/v3/api/Transactions/SubmitOrderRequest', {
      method:'POST',
      headers:{'Content-Type':'application/json','Authorization':`Bearer ${auth.token}`},
      body: JSON.stringify({
        id, currency:'USD', amount,
        description:`KLA-MEET ${plan}`,
        callback_url:`https://kla-meet.vercel.app/api/pesapal-callback?order=${id}`,
        notification_id: ipnId,
        billing_address:{email_address:'user@kla-meet.app', first_name:'KLA', last_name:'User', country_code:'UG'}
      })
    })
    const order = await orderRes.json()
    return res.status(200).json({redirect_url: order.redirect_url || null})
  } catch(e){ return res.status(200).json({redirect_url:null}) }
}
