export default function Discover({posts,WORLD,onSelect,isAdmin}){
  return (
    <div className="max-w-md mx-auto p-4">
      <h2 className="font-black">Discover • Tap to Like {isAdmin && '(Admin)'}</h2>
      {posts.length>0 && <div className="mt-4 grid grid-cols-2 gap-3">{posts.map(p=>(<div key={p.id} onClick={()=>onSelect(p)} className="bg-zinc-900 rounded-[20px] overflow-hidden border border-[#FFC300]/20"><img src={p.image_url} className="h-48 w-full object-cover" /><div className="p-2"><p className="text-xs font-bold">{p.name}</p><p className="text-[9px] text-white/50">{p.city}</p></div></div>))}</div>}
      <h3 className="mt-6 font-bold text-xs text-white/60">🌍 Worldwide Examples - Always</h3>
      <div className="grid grid-cols-2 gap-3 mt-2">{WORLD.map(w=>(<div key={w.city} className="bg-zinc-900 rounded-[20px] overflow-hidden"><img src={w.img} className="h-32 w-full object-cover"/><div className="p-2"><p className="text-xs font-bold">{w.flag} {w.city}</p></div></div>))}</div>
    </div>
  )
}