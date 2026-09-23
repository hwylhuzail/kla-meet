import { useState } from 'react'
import Home from './pages/Home.jsx'
import Discover from './pages/Discover.jsx'
import Near from './pages/Near.jsx'
import Chat from './pages/Chat.jsx'

export default function App(){
  const [tab,setTab]=useState('home')
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <header className="sticky top-0 z-50 bg-black/80 backdrop-blur border-b border-white/10 p-4 flex justify-between items-center">
        <h1 className="font-black text-xl tracking-widest">KLA-MEET</h1>
        <div className="text-[10px] px-2 py-1 bg-white text-black rounded-full font-bold">INTL • UPGRADED</div>
      </header>

      {tab==='home' && <Home setTab={setTab}/>}
      {tab==='discover' && <Discover/>}
      {tab==='near' && <Near/>}
      {tab==='chat' && <Chat/>}

      <nav className="fixed bottom-0 left-0 right-0 bg-black border-t border-white/10 flex justify-around p-2">
        {[
          ['home','Home'],['discover','Discover'],['near','Near You'],['chat','Random Chat']
        ].map(([k,l])=>(
          <button key={k} onClick={()=>setTab(k)} className={`px-4 py-2 rounded-full text-sm ${tab===k?'bg-white text-black font-bold':'text-white/60'}`}>{l}</button>
        ))}
      </nav>
    </div>
  )
}
