export default function PostModal({postForm,setPostForm,posting,onClose,onImage,onLocation,onCreate}){
  return (
    <div className="fixed inset-0 bg-black/95 p-0 flex items-end justify-center z-[100]">
      <div className="bg-zinc-900 rounded-t-[32px] p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between"><h3 className="font-black text-sm text-white">Create Post</h3><button onClick={onClose} className="bg-zinc-800 w-8 h-8 rounded-full text-white">✕</button></div>
        <div className="flex gap-2 mt-4"><button onClick={()=>setPostForm({...postForm,type:'dating'})} className={`flex-1 rounded-full py-3 text-xs font-black ${postForm.type==='dating'?'bg-[#FFC300] text-black':'bg-zinc-800 text-white'}`}>❤️ Dating</button><button onClick={()=>setPostForm({...postForm,type:'friends'})} className={`flex-1 rounded-full py-3 text-xs font-black ${postForm.type==='friends'?'bg-white text-black':'bg-zinc-800 text-white'}`}>🤝 Friends</button></div>
        <input type="file" accept="image/*" onChange={onImage} className="mt-4 w-full text-xs file:bg-white file:text-black file:rounded-full file:px-4 file:py-2" />{postForm.preview && <img src={postForm.preview} className="mt-3 w-full h-64 object-cover rounded-[20px]" />}
        <textarea value={postForm.bio} onChange={e=>setPostForm({...postForm,bio:e.target.value})} placeholder="Bio" className="mt-4 w-full bg-black border border-white/20 rounded-2xl px-4 py-3 text-xs h-20 text-white" />
        <div className="mt-3 bg-black rounded-2xl p-4 border border-white/10 flex justify-between items-center"><p className="text-xs text-white font-bold">📍 {postForm.city}</p><button onClick={onLocation} className="bg-[#FFC300] text-black px-5 py-2 rounded-full text-[11px] font-black">True Location</button></div>
        <button onClick={onCreate} disabled={posting} className="mt-5 w-full bg-[#FFC300] text-black rounded-full py-4 font-black text-[15px]">{posting?'Posting...':'Post Now'}</button>
      </div>
    </div>
  )
}