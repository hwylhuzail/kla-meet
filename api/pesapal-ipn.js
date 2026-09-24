export default async function handler(req, res){
  const { OrderTrackingId, OrderMerchantReference } = req.query
  // Just log status — Pesapal will call this automatically
  if(OrderTrackingId){
    try{
      const key = process.env.PESAPAL_CONSUMER_KEY || process.env.PESAPAL_KEY
      const secret = process.env.PESAPAL_CONSUMER_SECRET || process.env.PESAPAL_SECRET
      const authRes = await fetch('https://pay.pesapal.com/v3/api/Auth/RequestToken',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({consumer_key:key, consumer_secret:secret})})
      const auth = await authRes.json()
      if(auth.token){
        await fetch(`https://pay.pesapal.com/v3/api/Transactions/GetTransactionStatus?orderTrackingId=${OrderTrackingId}`,{headers:{'Authorization':`Bearer ${auth.token}`}})
      }
    }catch(e){}
  }
  return res.status(200).send('IPN OK - '+ (OrderTrackingId || 'no id'))
}