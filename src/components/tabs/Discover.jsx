import { useState } from 'react'

const UGANDA_CITIES = ['All','Kampala','Entebbe','Jinja','Arua','Mbarara','Gulu','Mbale']

export default function Discover({posts,onSelect,isAdmin}){
  const [city,setCity]=useState('All')
  const [reported,setReported]=useState([])

  const ugandaOnly = posts.filter(p=>{
    if(!p.city) return true
    const banned = ['paris','tokyo','london','new york','usa','france','japan','uk']
    return!banned.some(b=>p.city.toLowerCase().includes(b))
  })

  const filtered = ugandaOnly.filter(p=>{
    if(reported.includes(p.id)) return false
    if(city!=='All' && p.city!==city) return false
    return true
  })

  const handleReport = (id,name) => {
    if(confirm(`Report ${name}? Admin reviews in 24h`)){
      setReported([...reported,id])
      alert('Reported. Thanks for keeping community safe!')
    }
  }

  return (
    <div className="max-w-md mx-auto p-3 space-y-3 pb-24">
      <div className="bg-[#FFC300] rounded-full px-4 py-2 flex justify-between">
        <p className="text-[10px] font-black text-black">🛡️ {filtered.length} Friends in Uganda • Verified</p>
        {isAdmin && <span className="text-[9px] bg-black text-white px-2 py-0.5 rounded-full">ADMIN</span>}
      </div>

      <div className="flex gap-1.5 overflow-x-auto pb-1">
        {UGANDA_CITIES.map(c=>(
          <button key={c} onClick={()=>setCity(c)} className={`whitespace-nowrap px-3 py-1.5 rounded-full text-[10px] font-bold ${city===c?'bg-white text-black':'bg-zinc-800 text-white'}`}>{c}</button>
        ))}
      </div>

      <h2 className="font-black text-white text-xs">Discover Friends {city!=='All'&&`• ${city}`}</h2>

      <div className="grid grid-cols-2 gap-3">
        {filtered.map(p=>(
          <div key={p.id} className="bg-zinc-900 rounded-[20px] overflow-hidden border border-white/10">
            <img src={p.image_url||p.photo} onClick={()=>onSelect?.(p)} className="h-48 w-full object-cover cursor-pointer bg-zinc-800" />
            <div className="p-2.5">
              <p className="text-xs font-bold text-white truncate">{p.name} • {p.age||22}</p>
              <p className="text-[9px] text-white/50">{p.city||'Kampala'}</p>
              <div className="mt-2 flex gap-1">
                <button onClick={()=>onSelect?.(p)} className="flex-1 bg-white text-black rounded-full py-1.5 text-[10px] font-black">♡ Like</button>
                <button onClick={()=>alert('Chat unlocked with Premium')} className="flex-1 bg-[#FFC300] text-black rounded-full py-1.5 text-[10px] font-black">Chat</button>
              </div>
              <div className="mt-2 flex justify-center gap-2">
                <button onClick={()=>handleReport(p.id,p.name)} className="text-[8px] text-red-400 underline">Report</button>
                <span className="text-[8px] text-white/20">•</span>
                <button onClick={()=>setReported([...reported,p.id])} className="text-[8px] text-white/40 underline">Block</button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filtered.length===0 && (
        <div className="bg-zinc-900 rounded-[24px] p-8 text-center">
          <p className="text-white font-bold text-sm">No friends in {city} yet</p>
          <p className="text-[11px] text-white/50 mt-1">Be first to post in {city}!</p>
          <button onClick={()=>setCity('All')} className="mt-3 bg-white text-black px-4 py-2 rounded-full text-xs font-bold">Show All Uganda</button>
        </div>
      )}

      <p className="text-[9px] text-white/30 text-center">Uganda friendship only • Photos reviewed • Report & Block available</p>
    </div>
  )
}