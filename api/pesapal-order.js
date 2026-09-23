export default async function handler(req,res){
 if(req.method!=='POST') return res.status(405).json({error:'POST only'})
 const { amount, plan, currency='USD', email } = req.body
 const key = process.env.PESAPAL_KEY
 const secret = process.env.PESAPAL_SECRET
 let ipnId = process.env.PESAPAL_IPN_ID
 if(!key||!secret) return res.status(500).json({error:'Missing PESAPAL_KEY/SECRET'})

 const authR = await fetch('https://pay.pesapal.com/v3/api/Auth/RequestToken',{
  method:'POST',headers:{'Content-Type':'application/json'},
  body:JSON.stringify({consumer_key:key, consumer_secret:secret})
 })
 const authD = await authR.json()
 if(!authD.token) return res.status(500).json({error:'Pesapal auth failed', detail:authD})
 const token = authD.token

 if(!ipnId){
   try{
     const listR = await fetch('https://pay.pesapal.com/v3/api/URLSetup/GetIpnList',{headers:{Authorization:`Bearer ${token}`}})
     const listD = await listR.json()
     if(Array.isArray(listD) && listD.length>0){
       const found = listD.find(i=>i.url.includes(req.headers.host)) || listD[0]
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
   }catch(e){}
 }
 if(!ipnId) return res.status(500).json({error:'No IPN ID - create IPN in Pesapal dashboard: https://'+req.headers.host+'/api/pesapal-ipn'})

 const orderR = await fetch('https://pay.pesapal.com/v3/api/Transactions/SubmitOrderRequest',{
  method:'POST',
  headers:{'Content-Type':'application/json','Authorization':`Bearer ${token}`},
  body:JSON.stringify({
    id: `KLA-${Date.now()}`,
    currency: 'USD',
    amount: parseFloat(amount), // 3.99 / 6.99 - bypass 20k UGX
    description: `KLA-MEET Premium ${plan}`,
    callback_url: `https://${req.headers.host}/api/pesapal-callback`,
    notification_id: ipnId,
    billing_address: { email_address: email||'user@kla-meet.com', first_name:'KLA', last_name:'User' }
  })
 })
 const orderD = await orderR.json()
 return res.json(orderD)
}