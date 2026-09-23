export default async function handler(req,res){
  // Pesapal IPN + Crypto confirmation -> mark premium in Supabase
  console.log('payment webhook', req.body)
  res.json({received:true})
}
