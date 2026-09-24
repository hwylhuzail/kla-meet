export default async function handler(req, res) {
  if (req.method!== 'POST') return res.status(405).json({error:'POST only'})
  try {
    const { plan } = req.body || {}
    const amount = plan === 'standard'? 5.99 : 2.99

    const key = process.env.PESAPAL_CONSUMER_KEY || process.env.PESAPAL_KEY
    const secret = process.env.PESAPAL_CONSUMER_SECRET || process.env.PESAPAL_SECRET

    if(!key ||!secret) return res.status(500).json({error:`Missing keys. Found KEY=${!!key} SECRET=${!!secret} — Set PESAPAL_CONSUMER_KEY and PESAPAL_CONSUMER_SECRET in Vercel`})

    const authRes = await fetch('https://pay.pesapal.com/v3/api/Auth/RequestToken', {
      method:'POST',
      headers:{'Content-Type':'application/json'},
      body: JSON.stringify({ consumer_key: key, consumer_secret: secret })
    })
    const auth = await authRes.json()
    if(!auth.token) return res.status(500).json({error:'Pesapal auth failed', detail: auth})

    // AUTO CREATE IPN - no manual dashboard needed
    let ipnId = process.env.PESAPAL_IPN_ID
    if(!ipnId){
      try{
        const domain = `https://${req.headers.host}`
        // try list first
        const listRes = await fetch('https://pay.pesapal.com/v3/api/URLSetup/GetIpnList', {
          headers:{ Authorization:`Bearer ${auth.token}` }
        })
        const list = await listRes.json()
        if(Array.isArray(list) && list.length>0){
          const found = list.find(i=>i.url && i.url.includes('pesapal-ipn')) || list[0]
          ipnId = found.ipn_id || found.id || found.ipnId
        }
        // if still none, register new
        if(!ipnId){
          const ipnRes = await fetch('https://pay.pesapal.com/v3/api/URLSetup/RegisterIPN', {
            method:'POST',
            headers:{'Content-Type':'application/json','Authorization':`Bearer ${auth.token}`},
            body: JSON.stringify({url:`${domain}/api/pesapal-ipn`, ipn_notification_type:'GET'})
          })
          const ipnData = await ipnRes.json()
          ipnId = ipnData.ipn_id || ipnData.id || ipnData.ipnId
        }
      }catch(e){ console.log('IPN auto error', e) }
    }

    if(!ipnId) return res.status(500).json({error:'IPN ID could not be created automatically. Go to Pesapal Dashboard > IPN and add https://'+req.headers.host+'/api/pesapal-ipn'})

    const orderId = `KLA-${Date.now()}`
    const orderRes = await fetch('https://pay.pesapal.com/v3/api/Transactions/SubmitOrderRequest', {
      method:'POST',
      headers:{'Content-Type':'application/json','Authorization':`Bearer ${auth.token}`},
      body: JSON.stringify({
        id: orderId,
        currency:'USD',
        amount: amount,
        description:`KLA-MEET ${plan || 'basic'}`,
        callback_url:`https://${req.headers.host}/api/pesapal-callback?order=${orderId}`,
        notification_id: ipnId,
        billing_address:{email_address:'user@kla-meet.app', first_name:'KLA', last_name:'User', country_code:'UG'}
      })
    })
    const order = await orderRes.json()
    if(!order.redirect_url) return res.status(500).json({error:'No redirect_url', detail: order})
    return res.status(200).json({redirect_url: order.redirect_url})
  } catch(e){
    return res.status(500).json({error:e.message})
  }
}