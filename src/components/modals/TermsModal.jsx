export default function TermsModal({onClose,onAgree}){
  return (
    <div className="fixed inset-0 bg-black/90 z-[300] p-4 overflow-y-auto">
      <div className="bg-white rounded-[24px] p-6 max-w-md mx-auto">
        <div className="flex justify-between"><h2 className="font-black text-sm">📄 Terms</h2><button onClick={onClose} className="bg-black text-white w-8 h-8 rounded-full">✕</button></div>
        <div className="mt-4 text-[11px] space-y-2 h-[60vh] overflow-y-auto"><p><b>1. 18+ only, one account, true info.</b></p><p><b>2. No nudity, spam, hate, money requests.</b></p><p><b>3. Photos yours, admin can delete.</b></p><p><b>4. $2.99/$5.99 via Oxapay/Pesapal non-refundable.</b></p><p><b>5. Admin can warn/ban/delete. 3 warns=ban.</b></p><p><b>6. By checking box you agree.</b></p></div>
        <button onClick={()=>{onAgree(); onClose()}} className="mt-4 w-full bg-[#FFC300] text-black rounded-full py-3 font-black text-xs">I Agree ✓</button>
      </div>
    </div>
  )
}