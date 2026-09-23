export default async function handler(req, res){
  const { OrderTrackingId } = req.query
  if(OrderTrackingId){
    try{
      const authRes = await fetch('https://pay.pesapal.com/v3/api/Auth/RequestToken',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({consumer_key:process.env.PESAPAL_CONSUMER_KEY,consumer_secret:process.env.PESAPAL_CONSUMER_SECRET})})
      const auth = await authRes.json()
      await fetch(`https://pay.pesapal.com/v3/api/Transactions/GetTransactionStatus?orderTrackingId=${OrderTrackingId}`,{headers:{'Authorization':`Bearer ${auth.token}`}})
    }catch(e){}
  }
  return res.status(200).send('IPN OK')
}
