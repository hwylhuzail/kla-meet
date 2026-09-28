import { useState, useEffect } from 'react'
import { supabase } from './supabase'
import PrivacyPage from './Privacy'

import About from './components/landing/About'
import HowItWorks from './components/landing/HowItWorks'
import Safety from './components/landing/Safety'
import Pricing from './components/landing/Pricing'
import Faqs from './components/landing/Faqs'

import DiscoverTab from './components/tabs/Discover'
import ChatTab from './components/tabs/Chat'
import NearbyTab from './components/tabs/Nearby'
import PremiumTab from './components/tabs/Premium'
import ProfileTab from './components/tabs/Profile'

const ADMIN_EMAILS = ["huzayirukalungi4@gmail.com", "alexmakkoali@gmail.com"]

export default function App(){
  if(typeof window!== 'undefined' && window.location.pathname === '/privacy'){
    return <PrivacyPage />
  }
  const [view,setView]=useState('landing')
  const [tab,setTab]=useState('discover')
  const [isPremium,setIsPremium]=useState(false)
  const [isAdmin,setIsAdmin]=useState(false)
  const [posts,setPosts]=useState([])
  const [user,setUser]=useState(null)
  const [form,setForm]=useState({name:'',email:'',password:'',bio:'',age:'22',city:'Kampala',photos:['']})
  const [agreed,setAgreed]=useState(false)

  useEffect(()=>{
    supabase.auth.getUser().then(({data})=>{
      if(data?.user){
        setUser(data.user)
        if(ADMIN_EMAILS.includes(data.user.email?.toLowerCase().trim())){ setIsAdmin(true); setIsPremium(true) }
      }
    })
    supabase.from('posts').select('*').order('created_at',{ascending:false}).then(({data})=>{ if(data) setPosts(data) })
  },[])

  const handleTab = (t) => {
    if(t==='admin' &&!isAdmin) return
    if((t==='nearby' || t==='chat') &&!isPremium &&!isAdmin){ setTab('premium'); return }
    setTab(t)
  }

  const handleSignup = async () => {
    if(!agreed) return alert('18+ agree required')
    if(parseInt(form.age)<18) return alert('18+ only')
    const { data } = await supabase.auth.signUp({email:form.email.trim(), password:form.password || '12345678'})
    setUser(data.user); setView('app'); setTab('profile')
  }
  const handleSignin = async () => {
    const { data } = await supabase.auth.signInWithPassword({email:form.email.trim(), password:form.password})
    setUser(data.user); setView('app'); setTab('discover')
  }

  if(view==='landing'){
    return (
      <div className="min-h-screen bg-white text-black">
        <header className="bg-black text-white px-4 py-3 flex justify-between items-center sticky top-0 z-50">
          <h1 className="font-black text-xs">KLA-MEET • Uganda 18+</h1>
          <button onClick={()=>{setView('app'); setTab('discover')}} className="bg-[#FFC300] text-black px-4 py-2 rounded-full font-bold text-xs">Enter App</button>
        </header>
        <div className="max-w-md mx-auto p-6">
          <h2 className="text-[36px] font-black leading-none">Meet. Chat.<br/>Friends in Uganda.</h2>
          <p className="text-[11px] bg-black text-white px-3 py-2 rounded-full font-bold inline-block mt-3">18+ Only • Safe Friendship</p>
        </div>
        <About />
        <HowItWorks />
        <Safety />
        <Pricing />
        <Faqs />
        <div className="max-w-md mx-auto p-6 space-y-4">
          <div className="bg-zinc-900 text-white rounded-[24px] p-5">
            <h3 className="font-black">Sign In</h3>
            <input value={form.email} onChange={e=>setForm({...form,email:e.target.value})} placeholder="Email" className="mt-3 w-full bg-zinc-800 rounded-full px-4 py-3 text-xs" />
            <input value={form.password} onChange={e=>setForm({...form,password:e.target.value})} type="password" placeholder="Password" className="mt-2 w-full bg-zinc-800 rounded-full px-4 py-3 text-xs" />
            <button onClick={handleSignin} className="mt-3 w-full bg-[#FFC300] text-black rounded-full py-3 font-black text-xs">Sign In</button>
          </div>
          <div className="bg-[#FFC300] rounded-[24px] p-5">
            <h3 className="font-black">Sign Up</h3>
            <input value={form.name} onChange={e=>setForm({...form,name:e.target.value})} placeholder="Full Name" className="mt-3 w-full bg-white rounded-full px-4 py-3 text-xs" />
            <input value={form.email} onChange={e=>setForm({...form,email:e.target.value})} placeholder="Email" className="mt-2 w-full bg-white rounded-full px-4 py-3 text-xs" />
            <input value={form.password} onChange={e=>setForm({...form,password:e.target.value})} type="password" placeholder="Password" className="mt-2 w-full bg-white rounded-full px-4 py-3 text-xs" />
            <div className="mt-3 bg-black rounded-xl p-3 flex gap-2">
              <input type="checkbox" checked={agreed} onChange={e=>setAgreed(e.target.checked)} className="w-5 h-5" />
              <p className="text-[10px] text-white">I am 18+ and agree to Privacy</p>
            </div>
            <button onClick={handleSignup} disabled={!agreed} className={`mt-3 w-full rounded-full py-3 font-black text-xs ${agreed?'bg-black text-white':'bg-zinc-400'}`}>Sign Up</button>
          </div>
        </div>
        <footer className="py-10 text-center text-[10px] text-gray-500 border-t mt-6">
          <a href="/privacy" className="mx-2 underline">Privacy</a> | <a href="mailto:kla.meet.ug@gmail.com" className="mx-2 underline">Contact</a>
          <p className="mt-2">© 2026 KLA-MEET Uganda - 18+ Only</p>
        </footer>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white pb-28">
      <header className="p-3 bg-black flex justify-between"><h1 className="font-black text-xs">KLA-MEET</h1><button onClick={()=>handleTab('profile')} className="text-[11px] bg-white text-black px-3 py-1.5 rounded-full">Profile</button></header>
      {tab==='discover' && <DiscoverTab posts={posts} />}
      {tab==='chat' && <ChatTab />}
      {tab==='nearby' && <NearbyTab />}
      {tab==='premium' && <PremiumTab />}
      {tab==='profile' && <ProfileTab form={form} setForm={setForm} user={user} />}
      <nav className="fixed bottom-0 left-0 right-0 bg-black border-t border-white/10 flex justify-around items-center py-2">
        <button onClick={()=>handleTab('discover')} className="text-[11px]">♡<br/>Discover</button>
        <button onClick={()=>handleTab('nearby')} className="text-[11px]">📍<br/>Nearby</button>
        <button onClick={()=>handleTab('chat')} className="text-[11px]">💬<br/>Chat</button>
        <button onClick={()=>handleTab('premium')} className="text-[11px]">★<br/>Premium</button>
        <button onClick={()=>handleTab('profile')} className="text-[11px]">👤<br/>Me</button>
      </nav>
    </div>
  )
}