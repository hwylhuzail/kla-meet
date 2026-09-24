export default function AdminPanel({posts,allProfiles,banned,adminTab,setAdminTab,adminSearch,setAdminSearch,onDeletePost,onBan,onWarn,onDeleteProfile,onClearChats,onUnban,adminEmails,user}){
  return (
    <div className="max-w-md mx-auto p-3">
      <h2 className="font-black">Admin Panel - SECURE</h2><p className="text-[9px] text-white/60">{adminEmails.join(', ')}</p>
      <div className="mt-3 flex gap-2">
        <button onClick={()=>setAdminTab('posts')} className={`px-4 py-2 rounded-full text-[11px] font-black ${adminTab==='posts'?'bg-[#FFC300] text-black':'bg-zinc-800'}`}>Posts {posts.length}</button>
        <button onClick={()=>setAdminTab('users')} className={`px-4 py-2 rounded-full text-[11px] font-black ${adminTab==='users'?'bg-[#FFC300] text-black':'bg-zinc-800'}`}>Users {allProfiles.length}</button>
        <button onClick={()=>setAdminTab('banned')} className={`px-4 py-2 rounded-full text-[11px] font-black ${adminTab==='banned'?'bg-red-600':'bg-zinc-800'}`}>Banned {banned.length}</button>
      </div>
      <input value={adminSearch} onChange={e=>setAdminSearch(e.target.value)} placeholder="Search" className="mt-3 w-full bg-zinc-900 border border-white/10 rounded-full px-4 py-2 text-xs" />
      {adminTab==='posts' && <div className="mt-4 space-y-3">{posts.map(p=>(<div key={p.id} className="bg-zinc-900 rounded-[16px] flex overflow-hidden"><img src={p.image_url} className="w-24 h-24 object-cover"/><div className="p-2 flex-1"><p className="text-[11px] font-bold">{p.name} • {p.city}</p><div className="flex gap-1 mt-2"><button onClick={()=>onDeletePost(p.id)} className="bg-red-600 px-2 py-1 rounded-full text-[9px]">🗑️ Delete Photo</button><button onClick={()=>onBan(p)} className="bg-black border border-red-500 px-2 py-1 rounded-full text-[9px]">🚫 Ban</button><button onClick={()=>onWarn(p)} className="bg-yellow-600 px-2 py-1 rounded-full text-[9px]">⚠️ Warn</button></div></div></div>))}</div>}
      {adminTab==='users' && <div className="mt-4 space-y-2">{allProfiles.map(p=>(<div key={p.id} className="bg-zinc-900 rounded-xl p-3"><p className="text-xs font-bold">{p.name} • {p.email}</p><div className="flex gap-1 mt-2"><button onClick={()=>onWarn(p)} className="bg-yellow-600 px-3 py-1 rounded-full text-[9px]">⚠️ Warn</button><button onClick={()=>onBan(p)} className="bg-red-600 px-3 py-1 rounded-full text-[9px]">🚫 Ban</button><button onClick={()=>onDeleteProfile(p)} className="bg-black border px-3 py-1 rounded-full text-[9px]">🗑️ Delete</button><button onClick={()=>onClearChats(p)} className="bg-zinc-800 px-3 py-1 rounded-full text-[9px]">🧹 Clear</button></div></div>))}</div>}
      {adminTab==='banned' && <div className="mt-4 space-y-2">{banned.map(b=>(<div key={b.id} className="bg-red-900/20 border border-red-500/30 rounded-xl p-3"><p className="text-xs">{b.email} • {b.reason}</p><button onClick={()=>onUnban(b.id)} className="mt-2 bg-white text-black px-3 py-1 rounded-full text-[9px]">Unban</button></div>))}</div>}
    </div>
  )
}