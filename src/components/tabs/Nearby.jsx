import { useState, useEffect, useMemo } from 'react'

export default function Nearby({posts,onSelect,isPremium,isAdmin}){
  const [loc,setLoc]=useState(null)
  const [maxDist,setMaxDist]=useState('All')

  useEffect(()=>{
    if(navigator.geolocation){
      navigator.geolocation.getCurrentPosition(
        p=>setLoc({lat:p.coords.latitude,lng:p.coords.longitude}),
        ()=>setLoc({lat:0.3476,lng:32.5825})
      )
    }
  },[])

  const withDist = useMemo(()=>{
    return posts.map(p=>{
      if(!loc ||!p.lat ||!p.lng) return {...p, dist: null}
      const R=6371; const dLat=(p.lat-loc.lat)*Math.PI/180; const dLng=(p.lng-loc.lng)*Math.PI/180
      const a=Math.sin(dLat/2)**2 + Math.cos(loc.lat*Math.PI/180)*Math.cos(p.lat*Math.PI/180)*Math.sin(dLng/2)**2
      return {...p, dist: R*2*Math.atan2(Math.sqrt(a),Math.sqrt(1-a))}
    }).filter(p=>{
      if(maxDist==='All') return true
      if(!isPremium &&!isAdmin && maxDist!=='All'){ return true } // free can't use distance filter
      if(p.dist===null) return false
      return p.dist <= parseInt(maxDist)
    }).sort((a,b)=>(a.dist??9999)-(b.dist??9999))
  },[posts,loc,maxDist,isPremium,isAdmin])

  const visible = isPremium||isAdmin? withDist : withDist.slice(0,4)

  return (
    <div className="max-w-md mx-auto p-3 pb-32 space-y-3">
      <h2 className="font-black text-white text-xs">📍 Nearby • True GPS locations</h2>
      <p className="text-[10px] text-white/50">{loc?`You: ${loc.lat.toFixed(3)},${loc.lng.toFixed(3)} • All profiles with lat/lng from Discover post`:'Getting location...'}</p>

      <div className="flex gap-1.5 overflow-x-auto">
        {['All','5','20','50'].map(d=>(
          <button key={d} onClick={()=>{
            if(d!=='All' &&!isPremium &&!isAdmin){ alert('Distance filter = Premium 🔒'); return }
            setMaxDist(d)
          }} className={`px-3 py-1.5 rounded-full text-[10px] font-bold ${maxDist===d?'bg-[#FFC300] text-black':'bg-zinc-800 text-white'} ${d!=='All'&&!isPremium?'opacity-60':''}`}>
            {d==='All'?'All FREE':`${d}km ${!isPremium&&d!=='All'?'🔒':''}`}
          </button>
        ))}
      </div>

      <div className="space-y-2">
        {visible.map(p=>(
          <div key={p.id} onClick={()=>onSelect(p)} className="bg-zinc-900 rounded-[16px] p-3 flex gap-3 items-center cursor-pointer">
            <img src={p.image_url} className="w-16 h-16 rounded-full object-cover bg-zinc-800" />
            <div className="flex-1">
              <p className="text-xs font-bold text-white">{p.name} • {p.city}</p>
              <p className="text-[10px] text-[#FFC300]">{p.dist!==null?`${p.dist.toFixed(1)} km away • 📍 real GPS`:'No GPS • old post'}</p>
              <p className="text-[9px] text-white/30 truncate">{p.bio||'Friendship'}</p>
            </div>
            <span className="bg-white text-black px-3 py-1 rounded-full text-[10px] font-black">Chat</span>
          </div>
        ))}
      </div>

      {!isPremium && withDist.length>4 && (
        <div className="bg-[#FFC300] rounded-[16px] p-3 text-center">
          <p className="text-black font-black text-xs">+{withDist.length-4} more nearby friends</p>
          <p className="text-[10px] text-black/60">Premium unlocks all + distance filter</p>
        </div>
      )}
    </div>
  )
}