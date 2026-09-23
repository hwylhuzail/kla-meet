import { useState } from 'react'
export default function OxaPayModal({ plan, user, onClose }){
  const [coin,setCoin]=useState('USDT')
  const [network,setNetwork]=useState('TRC20')
  const [payData,setPayData]=useState(null)
  const [loading,setLoading]=useState(false)

  const createPayment=async()=>{
    setLoading(true)
    const r=await fetch('/api/oxa-pay',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({plan, coin, network, user})})
    const j=await r.json()
    setPayData(j)
    setLoading(false)
  }

  return (
    <div className="fixed inset-0 z-[200] bg-black/80 backdrop-blur flex items-center justify-center p-4">
      <div className="bg-white text-black rounded-[24px] p-5 w-full max-w-sm">
        <div className="flex justify-between items-center"><h3 className="font-black">OXA LIGHT • {plan} ${plan==='basic'?'2.99':'5.99'}</h3><button onClick={onClose}>✕</button></div>

        {!payData? (
          <>
            <div className="mt-4 grid grid-cols-2 gap-2">
              <select value={coin} onChange={e=>setCoin(e.target.value)} className="border rounded-xl p-2 text-sm">
                <option>USDT</option><option>BTC</option><option>ETH</option><option>TRX</option><option>LTC</option>
              </select>
              <select value={network} onChange={e=>setNetwork(e.target.value)} className="border rounded-xl p-2 text-sm">
                <option>TRC20</option><option>ERC20</option><option>BEP20</option><option>BTC</option>
              </select>
            </div>
            <button onClick={createPayment} disabled={loading} className="w-full mt-4 bg-black text-white rounded-full py-3 font-bold">{loading?'Creating...':'Pay with OXA LIGHT →'}</button>
            <p className="text-[10px] text-center mt-2 text-zinc-500">Your wallet: 0XAY27Fb...dbe • Fee 0.4% • Instant confirm</p>
          </>
        ):(
          <div className="mt-4 text-center">
            <p className="text-xs font-bold">Send {payData.amount} {coin}</p>
            {payData.data?.qrCode && <img src={payData.data.qrCode} className="w-40 h-40 mx-auto mt-3 rounded-xl"/>}
            <p className="mt-3 text-[11px] break-all bg-zinc-100 p-2 rounded-xl">{payData.data?.address || payData.address}</p>
            <p className="text-[10px] mt-2">Expires in: {payData.data?.expiredAt? new Date(payData.data.expiredAt).toLocaleTimeString() : '30 min'}</p>
            <div className="mt-4 bg-[#FFC300] rounded-full py-2 text-xs font-bold">Waiting for payment... auto-confirms</div>
          </div>
        )}
      </div>
    </div>
  )
}
