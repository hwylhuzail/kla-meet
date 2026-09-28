import { useState, useMemo, useEffect } from 'react'

const UGANDA_CITIES = ['All','Kampala','Entebbe','Jinja','Arua','Mbarara','Gulu','Mbale']
const AGE_FILTERS = ['All','18-22','23-27','28-35','35+']

export default function Discover({posts,onSelect,isAdmin,isPremium}){
  const [city,setCity]=useState('All')
  const [ageFilter,setAgeFilter]=useState('All')
  const [reported,setReported]=useState([])
  const [userLoc,setUserLoc]=useState(null)

  useEffect(()=>{
    if(navigator.geolocation){
      navigator.geolocation.getCurrentPosition(
        p=>setUserLoc({lat:p.coords.latitude,lng:p.coords.longitude}),
        ()=>setUserLoc({lat:0.3476,lng:32.5825}) // Kampala fallback
      )
    }
  },[])

  const getDist = (lat,lng) => {
    if(!userLoc ||!lat ||!lng) return null
    const R=6371; const dLat=(lat-userLoc.lat)*Math.PI/180; const dLng=(lng-userLoc.lng)*Math.PI/180
    const a=Math.sin(dLat/2)**2 + Math.cos(userLoc.lat*Math.PI/180)*Math.cos(lat*Math.PI/180)*Math.sin(dLng/2)**2
    return R*2*Math.atan2(Math.sqrt(a),Math.sqrt(1-a))
  }

  const ugandaOnly = posts.filter(p=>{
    if(!p.city) return true
    const banned=['paris','tokyo','london','new york','usa','france','japan','uk']
    return!banned.some(b=>p.city.toLowerCase().includes(b))
  })

  const filtered = useMemo(()=>{
    return ugandaOnly.filter(p=>{
      if(reported.includes(p.id)) return false
      if(city!=='All' && p.city!==city) return false
      if(ageFilter!=='All'){
        const age=parseInt(p.age||22)
        if(ageFilter==='18-22' && (age<18||age>22)) return false
        if(ageFilter==='23-27' && (age<23||age>27)) return false
        if(ageFilter==='28-35' && (age<28||age>35)) return false
        if(ageFilter==='35+' && age<35) return false
      }
      return true
    }).sort((a,b)=>{
      // Premium: sort by real distance, Free: keep order
      if(!isPremium &&!isAdmin) return 0
      return (getDist(a.lat,a.lng)??9999) - (getDist(b.lat,b.lng)??9999)
    })
  },[ugandaOnly,city,ageFilter,reported,userLoc,isPremium,isAdmin])

  const visible = isPremium||isAdmin? filtered : filtered.slice(0,10)

  return (
    <div className="max-w-md mx-auto p-3 space-y-3 pb-32">
      <div className="bg-[#FFC300] rounded-full px-4 py-2 flex justify-between">
        <p className="text-[10px] font-black text-black">🛡️ {filtered.length} Friends • True location • {userLoc?'📍 GPS on':'Locating...'}</p>
        {isAdmin && <span className="text-[9px] bg-black text-white px-2 py-0.5 rounded-full">ADMIN</span>}
      </div>

      <div className="flex gap-1.5 overflow-x-auto pb-1">
        {UGANDA_CITIES.map(c=>(
          <button key={c} onClick={()=>setCity(c)} className={`whitespace-nowrap px-3 py-1.5 rounded-full text-[10px] font-bold ${city===c?'bg-white text-black':'bg-zinc-800 text-white'}`}>{c} FREE</button>
        ))}
      </div>

      <div className="flex gap-1.5 overflow-x-auto pb-1">
        {AGE_FILTERS.map(a=>(
          <button key={a} onClick={()=>{
            if(a!=='All' &&!isPremium &&!isAdmin){ alert('Age filter = Premium 🔒'); return }
            setAgeFilter(a)
          }} className={`whitespace-nowrap px-3 py-1.5 rounded-full text-[10px] font-bold ${ageFilter===a?'bg-[#FFC300] text-black':'bg-zinc-800 text-white'} ${a!=='All'&&!isPremium&&!isAdmin?'opacity-60':''}`}>
            {a} {a!=='All'&&!isPremium?'🔒':''}
          </button>
        ))}
      </div>

      <h2 className="font-black text-white text-xs">Discover {city!=='All'&&`• ${city}`} {ageFilter!=='All'&&`• ${ageFilter}`} {isPremium?'• Sorted by distance':''}</h2>

      <div className="grid grid-cols-2 gap-3">
        {visible.map(p=>{
          const d=getDist(p.lat,p.lng)
          return (
            <div key={p.id} className="bg-zinc-900 rounded-[20px] overflow-hidden border border-white/10">
              <img src={p.image_url||p.photo} onClick={()=>onSelect?.(p)} className="h-48 w-full object-cover cursor-pointer bg-zinc-800" />
              <div className="p-2.5">
                <p className="text-xs font-bold text-white truncate">{p.name} • {p.age||22}</p>
                <p className="text-[9px] text-white/50">{p.city||'Kampala'} {d?`• ${d.toFixed(1)}km` : p.lat?'• 📍 real':''}</p>
                <div className="mt-2 flex gap-1">
                  <button onClick={()=>onSelect?.(p)} className="flex-1 bg-white text-black rounded-full py-1.5 text-[10px] font-black">♡ Like</button>
                  <button onClick={()=>onSelect?.(p)} className="flex-1 bg-[#FFC300] text-black rounded-full py-1.5 text-[10px] font-black">Chat</button>
                </div>
                <div className="mt-2 flex justify-center gap-2">
                  <button onClick={()=>{ if(confirm(`Report ${p.name}?`)){ setReported([...reported,p.id]) } }} className="text-[8px] text-red-400 underline">Report</button>
                  <span className="text-[8px] text-white/20">•</span>
                  <button onClick={()=>setReported([...reported,p.id])} className="text-[8px] text-white/40 underline">Block</button>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {!isPremium && filtered.length>10 && (
        <div className="bg-zinc-900 border border-[#FFC300]/30 rounded-[20px] p-4 text-center">
          <p className="text-white font-black text-xs">+{filtered.length-10} more friends with real location</p>
          <p className="text-[10px] text-white/50">Premium unlocks all + distance sorting</p>
        </div>
      )}

      {filtered.length===0 && (
        <div className="bg-zinc-900 rounded-[24px] p-8 text-center">
          <p className="text-white font-bold text-sm">No friends in {city} {ageFilter}</p>
          <button onClick={()=>{setCity('All');setAgeFilter('All')}} className="mt-3 bg-white text-black px-4 py-2 rounded-full text-xs font-bold">Show All Uganda</button>
        </div>
      )}
    </div>
  )
}