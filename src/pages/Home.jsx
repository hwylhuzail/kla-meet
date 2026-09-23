export default function Home({setTab}){
 return (
  <div className="p-6 pb-24 max-w-xl mx-auto space-y-6">
    <div className="rounded-[24px] bg-gradient-to-br from-zinc-800 to-black border border-white/10 p-8">
      <h2 className="text-4xl font-black leading-none">MEET THE<br/>WORLD IN<br/>KAMPALA</h2>
      <p className="mt-4 text-white/60">Same layout you had — rebuilt clean. API + icons kept.</p>
      <div className="mt-6 flex gap-3">
        <button onClick={()=>setTab('discover')} className="flex-1 bg-white text-black font-bold py-3 rounded-full">Discover</button>
        <button onClick={()=>setTab('chat')} className="flex-1 bg-white/10 border border-white/20 py-3 rounded-full">Random Chat</button>
      </div>
    </div>
    <div className="grid grid-cols-2 gap-3">
      <div className="rounded-2xl bg-white/5 p-4 border border-white/10"><p className="text-2xl font-bold">2k+</p><p className="text-xs text-white/50">International profiles</p></div>
      <div className="rounded-2xl bg-white/5 p-4 border border-white/10"><p className="text-2xl font-bold">Live</p><p className="text-xs text-white/50">Near you now</p></div>
    </div>
  </div>
 )
}
