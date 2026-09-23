export default async function handler(req, res){
  // Pesapal will call this automatically - IPN
  try{
    const { OrderTrackingId, OrderMerchantReference } = req.query
    console.log('IPN Received:', OrderTrackingId, OrderMerchantReference)
    
    // Here you can verify transaction status and unlock premium in your DB
    // For now just log - you can add Supabase/Firebase later
    
    res.status(200).json({ status: 'received', OrderTrackingId })
  }catch(e){
    res.status(200).json({ status:'error', error:e.message })
  }
}

export const config = { api: { bodyParser: false } }
