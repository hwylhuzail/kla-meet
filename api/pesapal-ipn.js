export default async function handler(req,res){
  console.log('IPN received', req.body)
  // TODO: mark user premium in Supabase
  return res.status(200).json({status:'ok'})
}