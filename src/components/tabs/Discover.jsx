import { WORLD } from '../../App'
export default function Discover({posts,onSelect,isAdmin}){
  const WORLD_LIST = WORLD || []
  return (
    <div className="max-w-md mx-auto p-4">
      <h2 className="font-black text-white">Discover • Tap to Like {isAdmin && '(Admin)'}</h2>
      {posts.length>0 && <div className="mt-4 grid grid-cols-2 gap-3">{posts.map(p=>(<div key={p.id} onClick={()=>onSelect(p)} className="bg-zinc-900 rounded-[20px] overflow-hidden border border-[#FFC300]/20"><img src={p.image_url} className="h-48 w-full object-cover" /><div className="p-2"><p className="text-xs font-bold text-white">{p.name}</p><p className="text-[9px] text-white/50">{p.city}</p></div></div>))}</div>}
      <h3 className="mt-6 font-bold text-xs text-white/60">🌍 Worldwide Examples</h3>
      <div className="grid grid-cols-2 gap-3 mt-2">{WORLD_LIST.map(w=>(<div key={w.city} className="bg-zinc-900 rounded-[20px] overflow-hidden"><img src={w.img} className="h-32 w-full object-cover"/><div className="p-2"><p className="text-xs font-bold text-white">{w.flag} {w.city}</p></div></div>))}</div>
    </div>
  )
}