export default function PrivacyModal({ onClose, onAgree }){
  return (
    <div className="fixed inset-0 bg-black/90 z-[300] p-4 overflow-y-auto">
      <div className="bg-white rounded-[24px] p-6 max-w-md mx-auto">
        <div className="flex justify-between">
          <h2 className="font-black text-sm">🔒 Privacy Policy</h2>
          <button onClick={onClose} className="bg-black text-white w-8 h-8 rounded-full">✕</button>
        </div>
        <div className="mt-4 text-[11px] space-y-2 h-[60vh] overflow-y-auto">
          <p><b>1. Data:</b> Name, email, age, gender, bio, city, lat/lng, photos 150KB, likes, messages.</p>
          <p><b>2. Use:</b> Matching, Near Me, Chat, Admin moderation. Never sold.</p>
          <p><b>3. Location:</b> True GPS one-time, show city only.</p>
          <p><b>4. Rights:</b> Delete via Logout + Clear. GDPR.</p>
          <p><b>5. 18+ only.</b></p>
        </div>
        <button onClick={()=>{onAgree(); onClose()}} className="mt-4 w-full bg-black text-white rounded-full py-3 font-black text-xs">I Agree</button>
      </div>
    </div>
  )
}