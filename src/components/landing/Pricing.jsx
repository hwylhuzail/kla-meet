export default function Pricing({onCrypto,onPesapal}){
  // LIVE fallback - works even if App.jsx calls <Pricing /> without props
  const liveCrypto = onCrypto || (() => window.open('https://nowpayments.io/payment/?iid=4727316829','_blank','noopener,noreferrer'))
  const livePesapal = onPesapal || (() => {
    window.open('https://www.pesapal.com/','_blank','noopener,noreferrer')
    alert('Pesapal LIVE: MTN/Airtel UGX 10k. Send screenshot to kla.meet.ug@gmail.com')
  })

  return (
    <div className="flex gap-3">
      <div className="bg-black text-white rounded-[20px] p-4 w-[160px]"><p className="text-[10px] text-[#FFC300]">Basic $2.99</p><button onClick={liveCrypto} className="mt-3 w-full bg-white text-black rounded-full py-2 font-bold text-[10px]">Crypto</button><button onClick={livePesapal} className="mt-2 w-full bg-[#FF6A00] text-white rounded-full py-2 font-bold text-[10px]">Pesapal</button></div>
      <div className="bg-black text-white rounded-[20px] p-4 w-[160px]"><p className="text-[10px] text-[#FFC300]">Standard $5.99</p><button onClick={liveCrypto} className="mt-3 w-full bg-white text-black rounded-full py-2 font-bold text-[10px]">Crypto</button><button onClick={livePesapal} className="mt-2 w-full bg-[#FF6A00] text-white rounded-full py-2 font-bold text-[10px]">Pesapal</button></div>
    </div>
  )
}