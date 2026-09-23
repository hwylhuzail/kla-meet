import { useState } from 'react'

const OXA_LINKS = {
  basic: "https://pay.oxapay.com/18802533",
  standard: "https://pay.oxapay.com/18802533",
  wallet: "0XAY27FbUKmf4xPg5ZRFP1l1dbe"
}

const PHOTOS = [
  {name:'Amina', age:24, city:'Kampala', img:'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=600'},
  {name:'David', age:26, city:'Mbarara', img:'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600'},
  {name:'Grace', age:22, city:'Bushenyi', img:'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=600'},
]

function PayButtons({plan}){
  const [loading,setLoading]=useState(false)
  const price = plan==='basic'? '2.99' : '5.99'
  const payOxa = () => window.open(OXA_LINKS[plan], '_blank')

  const payPesapal = async () => {
    setLoading(true)
    try{
      const r = await fetch('/api/pesapal',{
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body: JSON.stringify({plan})
      })
      const j = await r.json()
      if(j.error) { alert(j.error + ' - Add Pesapal keys in Vercel'); return }
      if(j.redirect_url) window.open(j.redirect_url,'_blank')
      else if(j.order_tracking_id) window.open(`https://www.pesapal.com/pesapaliframe/PesapalIframe3/Index?OrderTrackingId=${j.order_tracking_id}`,'_blank')
      else alert('Pesapal: '+JSON.stringify(j))
    }catch(e){ alert(e.message) }
    setLoading(false)
  }

  return (
    <div className="space-y-2 mt-4">
      <button onClick={payOxa} className="w-full bg-white text-black rounded-full py-3 font-bold text-sm">
        ⚡ Pay ${price} with OXA LIGHT
      </button>
      <button onClick={payPesapal} disabled={loading} className="w-full bg-[#FF6A00] text-white rounded-full py-3 font-bold text-sm">
        {loading? 'Processing...' : `Pay $${price} with Pesapal`}
      </button>
    </div>
  )
}

export default function App(){
  const [tab,setTab]=useState('discover')

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-black/80 backdrop-blur border-b border-white/10 p-4 flex justify-between items-center">
        <h1 className="font-black tracking-tight">KLA-MEET<span className="text-[#FFC300]"> • Keep Love Alive</span></h1>
        <span className="text-[10px] bg-zinc-800 px-2 py-1 rounded-full">OXA {OXA_LINKS.wallet.slice(0,8)}...</span>
      </header>

      {/* Landing / Discover */}
      {tab==='discover' && (
        <div className="p-4 max-w-md mx-auto space-y-4">
          <h2 className="text-2xl font-black mt-4">Discover Bushenyi</h2>
          <div className="grid grid-cols-2 gap-3">
            {PHOTOS.map(p=>(
              <div key={p.name} className="bg-zinc-900 rounded-[20px] overflow-hidden border border-white/10">
                <img src={p.img} className="h-40 w-full object-cover"/>
                <div className="p-3">
                  <p className="font-bold text-sm">{p.name}, {p.age}</p>
                  <p className="text-[11px] text-white/50">{p.city}</p>
                </div>
              </div>
            ))}
          </div>
          <button onClick={()=>setTab('premium')} className="w-full bg-[#FFC300] text-black rounded-full py-4 font-black mt-6">
            Unlock Premium ⚡
          </button>
        </div>
      )}

      {/* Premium - RESTORED LAYOUT + Both payments */}
      {tab==='premium' && (
        <div className="p-4 max-w-md mx-auto space-y-4 mt-6">
          <button onClick={()=>setTab('discover')} className="text-xs text-white/50">← Back</button>
          <h2 className="text-2xl font-black">Keep Love Alive Premium</h2>

          <div className="bg-zinc-900 rounded-[24px] p-5 border border-white/10">
            <h3 className="font-bold">Basic — $2.99/mo</h3>
            <p className="text-xs text-white/60 mt-1">Unlimited likes, see who liked you, 3 super likes/day</p>
            <PayButtons plan="basic" />
          </div>

          <div className="bg-[#FFC300] text-black rounded-[24px] p-5 border-2 border-white shadow-xl">
            <h3 className="font-black">Standard — $5.99/mo ⭐ Most Popular</h3>
            <p className="text-xs mt-1 font-medium">Everything in Basic + Unlimited chat, KYC badge, boost profile</p>
            <PayButtons plan="standard" />
          </div>

          <p className="text-[10px] text-center text-white/30 mt-4">
            Crypto via OxaPay 18802533 → {OXA_LINKS.wallet}<br/>Mobile Money via Pesapal live
          </p>
        </div>
      )}

      {/* Bottom Nav */}
      <nav className="fixed bottom-0 left-0 right-0 bg-black border-t border-white/10 flex justify-around p-3">
        <button onClick={()=>setTab('discover')} className={`text-xs ${tab==='discover'?'font-black text-[#FFC300]':'text-white/50'}`}>Discover</button>
        <button onClick={()=>setTab('premium')} className={`text-xs ${tab==='premium'?'font-black text-[#FFC300]':'text-white/50'}`}>Premium</button>
      </nav>
    </div>
  )
}
