import { useState } from 'react'
export default function Faqs(){
  const [open,setOpen]=useState(null)
  const faqs=[
    {q:"How to unlock Chat?",a:"Pay $2.99 in Premium tab via Crypto or Pesapal. Instant."},
    {q:"Why WORLD photos always show?",a:"So landing not empty even if no users posted yet."},
    {q:"Can Admin delete my photo?",a:"Yes if nude, fake, spam. Can also warn, ban, delete account."},
    {q:"Is location safe?",a:"True GPS one-time, we show city only not exact house."},
    {q:"Refund?",a:"Non-refundable after unlock unless technical fault."},
    {q:"Why must I agree?",a:"Legal - 18+, no fake, admin can moderate."},
  ]
  return (
    <div className="border rounded-[24px] p-5">
      <h3 className="font-black text-sm">❓ FAQs</h3>
      <div className="mt-3 space-y-2">
        {faqs.map((f,i)=>(
          <div key={i} className="border-b pb-2">
            <button onClick={()=>setOpen(open===i?null:i)} className="w-full flex justify-between font-bold text-[11px] text-left"><span>{f.q}</span><span>{open===i?'−':'+'}</span></button>
            {open===i && <p className="text-[11px] mt-1 text-zinc-600">{f.a}</p>}
          </div>
        ))}
      </div>
    </div>
  )
}