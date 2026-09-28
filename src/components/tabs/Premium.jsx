export default function Premium({isAdmin,onCrypto,onPesapal}){
  // LIVE accessible - works even without props
  const payCrypto = onCrypto || (() => window.open('https://nowpayments.io/payment/?iid=4727316829','_blank','noopener,noreferrer'))
  const payPesapal = onPesapal || (() => {
    window.open('https://www.pesapal.com/','_blank','noopener,noreferrer')
    alert('Pesapal LIVE: MTN/Airtel UGX 10k. After payment send screenshot to kla.meet.ug@gmail.com - admin activates in 5 mins')
  })

  return (
  <div className="max-w-md mx-auto p-4 space-y-4 pb-24">
    <h2 className="font-black text-white text-sm">Premium • Friendship Plus</h2>
    {isAdmin && <div className="bg-green-500 text-black rounded-xl p-3 text-xs font-black">ADMIN FREE • All unlocked</div>}
    <div className="bg-zinc-900 rounded-[24px] p-4 border border-[#FFC300]/20">
      <p className="text-[11px] text-white/60">Free: 5 likes/day, 1 chat/day, 3 nearby preview</p>
      <p className="text-[11px] text-[#FFC300] mt-1">Premium: unlimited chat, see likes, boost post</p>
      <button onClick={payCrypto} className="mt-4 w-full bg-[#FFC300] text-black rounded-full py-4 font-black text-xs">Crypto $2.99 / $5.99 • Pay Now</button>
      <button onClick={payPesapal} className="mt-3 w-full bg-[#FF6A00] text-white rounded-full py-4 font-black text-xs">Pesapal • MTN / Airtel Money</button>
    </div>
  </div>
  )
}