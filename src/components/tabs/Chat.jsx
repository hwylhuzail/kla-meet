export default function Chat({notifications,chatWith,messages,newMsg,setNewMsg,onSend,onFetchMessages,setChatWith,posts,isPremium}){
  if(!isPremium) return <div className="max-w-md mx-auto p-6 text-center">🔒 Premium Required</div>
  return (
    <div className="max-w-md mx-auto p-4">
      <h2 className="font-black">Chats + Notifications</h2>
      <div className="mt-3 space-y-2">{notifications.map(n=>(<div key={n.id} className="bg-zinc-900 rounded-xl p-3 flex justify-between"><p className="text-xs">🔔 {n.from_name} {n.type}</p><button onClick={()=>{ const post=posts.find(pp=>pp.id===n.post_id); if(post){ setChatWith(post); onFetchMessages(post.user_id) } }} className="text-[10px] bg-[#FFC300] text-black px-3 py-1 rounded-full">Chat</button></div>))}</div>
      {chatWith && <div className="mt-6 bg-black border border-white/10 rounded-2xl p-3"><p className="font-black text-xs text-white">Chat with {chatWith.name}</p><div className="mt-3 h-64 overflow-y-auto space-y-2 bg-zinc-900 rounded-xl p-2">{messages.map(m=>(<div key={m.id} className="text-xs p-2 rounded-full max-w-[80%] bg-zinc-800 text-white">{m.text}</div>))}</div><div className="flex gap-2 mt-3"><input value={newMsg} onChange={e=>setNewMsg(e.target.value)} placeholder="Type..." className="flex-1 bg-zinc-800 rounded-full px-4 py-2 text-xs text-white" /><button onClick={onSend} className="bg-[#FFC300] text-black px-5 py-2 rounded-full text-xs font-black">Send</button></div></div>}
    </div>
  )
}