import { useState } from 'react'
import { OXA_LINKS } from './config/payments.js'
import PesapalButton from './components/PesapalButton.jsx'

export default function App(){
  const payOxa=(plan)=> window.open(OXA_LINKS[plan],'_blank')
  return (
    <div className="min-h-screen bg-black text-white p-6">
      <h1 className="font-black text-xl">KLA-MEET • OXA + PESAPAL ALIVE ⚡</h1>

      <div className="max-w-md mx-auto mt-8 space-y-4">
        <div className="bg-zinc-900 rounded-[20px] p-5 border border-white/10">
          <h3 className="font-bold">Basic — $2.99/mo</h3>
          <div className="mt-4 space-y-2">
            <button onClick={()=>payOxa('basic')} className="w-full bg-white text-black rounded-full py-3 font-bold text-sm">⚡ Pay $2.99 with OXA LIGHT</button>
            <PesapalButton plan="basic" />
          </div>
        </div>

        <div className="bg-[#FFC300] text-black rounded-[20px] p-5">
          <h3 className="font-black">Standard — $5.99/mo ⭐</h3>
          <div className="mt-4 space-y-2">
            <button onClick={()=>payOxa('standard')} className="w-full bg-black text-white rounded-full py-3 font-bold text-sm">⚡ Pay $5.99 with OXA LIGHT</button>
            <PesapalButton plan="standard" />
          </div>
        </div>

        <p className="text-[10px] text-white/40 text-center mt-4">Oxa: {OXA_LINKS.wallet} • Pesapal: MTN/Airtel/Card live via api/pesapal.js</p>
      </div>
    </div>
  )
}
