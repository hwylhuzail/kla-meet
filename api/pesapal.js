export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({error:'POST only'})
  try {
    const { plan, email } = req.body
    const isStandard = plan === 'standard'
    const amount = isStandard ? 5.99 : 2.99
    const id = `KLA-${Date.now()}-${Math.random().toString(36).slice(2,6)}`

    // 1. Auth Pesapal
    const authRes = await fetch('https://pay.pesapal.com/v3/api/Auth/RequestToken', {
      method:'POST',
      headers:{'Content-Type':'application/json','Accept':'application/json'},
      body: JSON.stringify({
        consumer_key: process.env.PESAPAL_CONSUMER_KEY,
        consumer_secret: process.env.PESAPAL_CONSUMER_SECRET
      })
    })
    const auth = await authRes.json()
    if(!auth.token) return res.status(200).json({error:'Pesapal auth failed', details: auth, useCrypto:true})
    const token = auth.token

    // 2. Auto IPN - create if not exists
    let ipnId = process.env.PESAPAL_IPN_ID
    if(!ipnId){
      const domain = process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'https://kla-meet.vercel.app'
      const ipnRes = await fetch('https://pay.pesapal.com/v3/api/URLSetup/RegisterIPN', {
        method:'POST',
        headers:{'Content-Type':'application/json','Accept':'application/json','Authorization':`Bearer ${token}`},
        body: JSON.stringify({
          url: `${domain}/api/pesapal-ipn`,
          ipn_notification_type: 'GET'
        })
      })
      const ipnData = await ipnRes.json()
      ipnId = ipnData.ipn_id || ipnData.ipnId
    }

    // 3. Submit Order - automatic
    const orderRes = await fetch('https://pay.pesapal.com/v3/api/Transactions/SubmitOrderRequest', {
      method:'POST',
      headers:{'Content-Type':'application/json','Accept':'application/json','Authorization':`Bearer ${token}`},
      body: JSON.stringify({
        id,
        currency: 'USD',
        amount,
        description: `KLA-MEET ${plan} - Keep Love Alive`,
        callback_url: `https://kla-meet.vercel.app/api/pesapal-callback?order=${id}`,
        notification_id: ipnId,
        billing_address: {
          email_address: email || 'user@kla-meet.app',
          phone_number: '',
          country_code: 'UG',
          first_name: 'KLA',
          last_name: 'User'
        }
      })
    })
    const order = await orderRes.json()
    
    if(order.redirect_url){
      return res.status(200).json({ redirect_url: order.redirect_url, order_tracking_id: order.order_tracking_id })
    } else {
      // fallback to crypto if Pesapal fails
      return res.status(200).json({ redirect_url: null, error: order.error || order.message, details: order, fallback: 'https://pay.oxapay.com/18802533' })
    }

  } catch(e){
    return res.status(200).json({ redirect_url: null, error: e.message, fallback: 'https://pay.oxapay.com/18802533' })
  }
}
