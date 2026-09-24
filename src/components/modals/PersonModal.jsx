export default function PersonModal({post,isAdmin,onClose,onLike,onDelete,onBan,onChat}){
  return (
    <div className="fixed inset-0 bg-black/90 p-4 flex items-center justify-center z-[200]">
      <div className="bg-zinc-900 rounded-[24px] overflow-hidden w-full max-w-sm border border-[#FFC300]/30">
        <img src={post.image_url} className="h-80 w-full object-cover" />
        <div className="p-4">
          <h3 className="font-black text-white">{post.name} • {post.age}</h3><p className="text-[11px] text-white/60">📍 {post.city}</p><p className="text-xs mt-2 text-white">{post.bio}</p>
          <div className="flex gap-2 mt-4"><button onClick={()=>onLike(post)} className="flex-1 bg-[#FFC300] text-black rounded-full py-3 font-black text-xs">❤️ Like</button><button onClick={()=>onChat(post)} className="flex-1 bg-white text-black rounded-full py-3 font-black text-xs">💬 Chat</button></div>
          {isAdmin && <div className="flex gap-2 mt-2"><button onClick={()=>onDelete(post.id)} className="flex-1 bg-red-600 rounded-full py-2 text-[10px] text-white">🗑️ Delete Photo</button><button onClick={()=>onBan(post)} className="flex-1 bg-black border border-red-500 rounded-full py-2 text-[10px] text-white">🚫 Ban</button></div>}
          <button onClick={onClose} className="mt-3 w-full bg-zinc-800 rounded-full py-2 text-xs text-white">Close</button>
        </div>
      </div>
    </div>
  )
}