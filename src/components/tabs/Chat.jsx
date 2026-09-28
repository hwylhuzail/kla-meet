import { useState } from 'react'

export default function Chat({notifications,chatWith,messages,newMsg,setNewMsg,onSend,onFetchMessages,setChatWith,posts,isPremium}){
  const [showTip,setShowTip]=useState(true)
  const [reported,setReported]=useState([])

  if(!isPremium) return (
    <div className="max-w-md mx-auto p-6 text-center">
      <div className="bg-zinc-900 rounded-[24px] p-8">
        <p className="text-3xl">🔒</p>
        <h2 className="font-black text-white mt-3">Premium Required</h2>
        <p className="text-[11px] text-white/60 mt-2">Unlock unlimited friendship chats, see who liked you, and Nearby friends.</p>
        <p className="text-[9px] text-white/30 mt-4">Safe community • Verified profiles • Report & Block</p>
      </div>
    </div>
  )

  return (
    <div className="max-w-md mx-auto p-3 space-y-3 pb-24">
      {/* Safety Tip - REQUIRED */}
      {showTip && (
        <div className="bg-[#FFC300] rounded-[20px] p-4">
          <h3 className="font-black text-black text-xs">🛡️ Chat Safety</h3>
          <ul className="text-[10px] text-black mt-2 space-y-1 leading-relaxed">
            <li>• Friendship chat only — no explicit content</li>
            <li>• Never send money, airtime or gifts</li>
            <li>• Meet in public place first, tell a friend</li>
            <li>• Use Report & Block if uncomfortable — admin reviews in 24h</li>
          </ul>
          <button onClick={()=>setShowTip(false)} className="mt-3 w-full bg-black text-white rounded-full py-2.5 text-xs font-black">I Understand - Continue</button>
        </div>
      )}

      <h2 className="font-black text-white text-xs">🔔 Notifications + Chats</h2>

      {notifications.length===0 &&!chatWith && (
        <div className="bg-zinc-900 rounded-[24px] p-6 text-center">
          <p className="text-white font-bold text-sm">No notifications yet</p>
          <p className="text-[11px] text-white/60 mt-2">When someone likes your profile, you'll get a notification here to start a friendly chat.</p>
        </div>
      )}

      <div className="space-y-2">
        {notifications.filter(n=>!reported.includes(n.id)).map(n=>(
          <div key={n.id} className="bg-zinc-900 rounded-[16px] p-3 flex justify-between items-center">
            <div>
              <p className="text-xs font-bold text-white">🔔 {n.from_name} {n.type==='like'?'liked your profile':'messaged you'}</p>
              <p className="text-[9px] text-white/40">Tap Chat to reply • Friendship only</p>
            </div>
            <div className="flex gap-1.5">
              <button onClick={()=>{ const post=posts.find(pp=>pp.id===n.post_id); if(post){ setChatWith(post); onFetchMessages(post.user_id) } }} className="text-[10px] bg-[#FFC300] text-black px-4 py-1.5 rounded-full font-black">Chat</button>
              <button onClick={()=>setReported([...reported,n.id])} className="text-[9px] bg-zinc-800 text-white px-2 py-1.5 rounded-full">Dismiss</button>
            </div>
          </div>
        ))}
      </div>

      {chatWith && (
        <div className="bg-black border border-white/10 rounded-[24px] p-3">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <img src={chatWith.image_url||chatWith.photo} className="w-8 h-8 rounded-full bg-zinc-800" />
              <div>
                <p className="font-black text-xs text-white">Chat with {chatWith.name} • {chatWith.city||'Kampala'}</p>
                <p className="text-[8px] text-white/40">Friendship • Be respectful</p>
              </div>
            </div>
            <div className="flex gap-1.5">
              <button onClick={()=>{ if(confirm(`Report ${chatWith.name}?`)){ setReported([...reported,chatWith.id]); setChatWith(null); alert('Reported to admin') } }} className="text-[8px] bg-red-900/50 text-red-400 px-2.5 py-1 rounded-full">Report</button>
              <button onClick={()=>setChatWith(null)} className="text-[8px] bg-zinc-800 text-white px-2.5 py-1 rounded-full">Close</button>
            </div>
          </div>

          <div className="mt-3 h-72 overflow-y-auto space-y-2 bg-zinc-900 rounded-[16px] p-3">
            {messages.length===0 && <p className="text-[11px] text-white/30 text-center mt-20">No messages yet. Say hi! 👋 Keep it friendly.</p>}
            {messages.map(m=>(
              <div key={m.id} className={`text-[11px] p-2.5 rounded-[16px] max-w-[80%] ${m.from===chatWith.user_id?'bg-zinc-800 text-white':'bg-[#FFC300] text-black ml-auto'}`}>
                {m.text}
              </div>
            ))}
          </div>

          <div className="flex gap-2 mt-3">
            <input value={newMsg} onChange={e=>setNewMsg(e.target.value)} onKeyDown={e=>e.key==='Enter'&&onSend()} placeholder="Type friendly message..." className="flex-1 bg-zinc-800 rounded-full px-4 py-3 text-xs text-white outline-none" />
            <button onClick={onSend} className="bg-[#FFC300] text-black px-6 py-3 rounded-full text-xs font-black">Send</button>
          </div>
          <p className="text-[8px] text-white/20 text-center mt-2">Photos reviewed • No explicit content • Report abuse anytime</p>
        </div>
      )}
    </div>
  )
}