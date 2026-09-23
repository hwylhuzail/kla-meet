export default function Discover(){
 const users=[1,2,3,4,5,6].map(i=>({id:i,name:`User ${i}`,flag:'🌍'}))
 return <div className="p-4 pb-24 grid grid-cols-2 gap-3 max-w-xl mx-auto">
  {users.map(u=><div key={u.id} className="rounded-2xl overflow-hidden bg-zinc-900 border border-white/10"><div className="h-40 bg-gradient-to-br from-zinc-700 to-zinc-900"/><div className="p-3"><p className="font-bold">{u.name} {u.flag}</p><p className="text-xs text-white/50">New in Kla</p></div></div>)}
 </div>
}
