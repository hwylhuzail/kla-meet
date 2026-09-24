export default function Pricing({onCrypto,onPesapal}){
  return (
    <div className="flex gap-3">
      <div className="bg-black text-white rounded-[20px] p-4 w-[160px]"><p className="text-[10px] text-[#FFC300]">Basic $2.99</p><button onClick={onCrypto} className="mt-3 w-full bg-white text-black rounded-full py-2 font-bold text-[10px]">Crypto</button><button onClick={onPesapal} className="mt-2 w-full bg-[#FF6A00] text-white rounded-full py-2 font-bold text-[10px]">Pesapal</button></div>
      <div className="bg-black text-white rounded-[20px] p-4 w-[160px]"><p className="text-[10px] text-[#FFC300]">Standard $5.99</p><button onClick={onCrypto} className="mt-3 w-full bg-white text-black rounded-full py-2 font-bold text-[10px]">Crypto</button><button onClick={onPesapal} className="mt-2 w-full bg-[#FF6A00] text-white rounded-full py-2 font-bold text-[10px]">Pesapal</button></div>
    </div>
  )
}