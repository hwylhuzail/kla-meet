import { useState } from 'react'
export default function PesapalButton({plan, email}){
  const [loading,setLoading]=useState(false)
  const pay=async()=>{
    setLoading(true)
    const r=await fetch('/api/pesapal',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({plan,email})})
    const j=await r.json()
    setLoading(false)
    if(j.error){ alert(j.error); return }
    if(j.redirect_url || j.order_tracking_id){
      window.open(j.redirect_url || `https://cybqa.pesapal.com/pesapaliframe/PesapalIframe3/Index?OrderTrackingId=${j.order_tracking_id}`,'_blank')
    }else{
      alert(JSON.stringify(j))
    }
  }
  return (
    <button onClick={pay} disabled={loading} className="w-full bg-[#FF6A00] text-white rounded-full py-3 font-bold text-sm flex items-center justify-center gap-2">
      {loading?'Processing...':'Pay with Pesapal (MTN/Airtel/Card) →'}
    </button>
  )
}
