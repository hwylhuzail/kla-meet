export default function Liked({posts,likedIds,isPremium}){
  if(!isPremium) return <div className="max-w-md mx-auto p-6 text-center">🔒 Premium Required</div>
  return <div className="max-w-md mx-auto p-4"><h2 className="font-black">Liked • {likedIds.length}</h2><div className="mt-4 grid grid-cols-2 gap-3">{posts.filter(p=>likedIds.includes(p.id)).map(p=>(<div key={p.id} className="bg-zinc-900 rounded-[20px] overflow-hidden"><img src={p.image_url} className="h-32 w-full object-cover"/><div className="p-2"><p className="text-xs">{p.name}</p></div></div>))}</div></div>
}