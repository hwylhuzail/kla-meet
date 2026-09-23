import { useState } from 'react'
import { OXA_LINKS } from './config/payments.js'

export default function App(){
  const [paid,setPaid]=useState(false)
  const pay=(plan)=>{
    window.open(OXA_LINKS[plan], '_blank')
    setPaid(plan)
  }
  return (
    <div className="min-h-screen bg-black text-white p-6">
      <h1 className="font-black text-xl">KLA-MEET • OXA LIGHT ALIVE ⚡</h1>
      <p className="text-[11px] text-white/50 mt-1">Wallet: {OXA_LINKS.wallet} • Link: 18802533</p>

      <div className="max-w-md mx-auto mt-8 space-y-4">
        <div className="bg-zinc-900 rounded-[20px] p-5 border border-white/10">
          <h3 className="font-bold">Basic — $2.99/mo</h3>
          <button onClick={()=>pay('basic')} className="w-full mt-4 bg-white text-black rounded-full py-3 font-bold">Pay $2.99 with OXA LIGHT →</button>
        </div>
        <div className="bg-[#FFC300] text-black rounded-[20px] p-5">
          <h3 className="font-black">Standard — $5.99/mo ⭐</h3>
          <button onClick={()=>pay('standard')} className="w-full mt-4 bg-black text-white rounded-full py-3 font-bold">Pay $5.99 with OXA LIGHT →</button>
        </div>
        {paid && <div className="bg-green-400 text-black rounded-xl p-3 text-xs font-bold text-center animate-pulse">Oxa Pay opened for {paid} — pay with USDT/BTC/ETH, it auto-confirms to your wallet {OXA_LINKS.wallet}</div>}
      </div>
    </div>
  )
}
