import { useState, useEffect } from 'react'
import { supabase } from './supabase'
import PrivacyPage from './Privacy'
import TermsPage from './Terms'
import GuidelinesPage from './Guidelines'

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
  if(typeof window!== 'undefined'){
    if(window.location.pathname === '/privacy') return <PrivacyPage />
    if(window.location.pathname === '/terms') return <TermsPage />
    if(window.location.pathname === '/guidelines') return <GuidelinesPage />
  }
  const [view,setView]=useState('landing')
  const [tab,setTab]=useState('discover')
  const [loading,setLoading]=useState(true)
  const [isPremium,setIsPremium]=useState(false)
  const [isAdmin,setIsAdmin]=useState(false)
  const [posts,setPosts]=useState([])
  const [user,setUser]=useState(null)
  const [form,setForm]=useState({name:'',email:'',password:'',bio:'',age:'22',city:'Kampala',photos:['']})
  const [agreed,setAgreed]=useState(false)

  // Chat states
  const [chatWith,setChatWith]=useState(null)
  const [messages,setMessages]=useState([])
  const [newMsg,setNewMsg]=useState('')
  const [notifications,setNotifications]=useState([])

  useEffect(()=>{
    supabase.auth.getSession().then(({data})=>{
      if(data?.session?.user){
        const u = data.session.user
        setUser(u)
        setView('app')
        if(ADMIN_EMAILS.includes(u.email?.toLowerCase().trim())){ setIsAdmin(true); setIsPremium(true) }
      }
      setLoading(false)
    })
    supabase.from('posts').select('*').order('created_at',{ascending:false}).then(({data})=>{ if(data) setPosts(data) })
  },[])

  const handleTab = (t) => {
    if(t==='admin' &&!isAdmin) return
    if((t==='nearby' || t==='chat') &&!isPremium &&!isAdmin){ setTab('premium'); return }
    setTab(t)
  }

  const handleSignup = async () => {
    if(!agreed) return alert('Please confirm you are 18 or older')
    const { data, error } = await supabase.auth.signUp({email:form.email.trim(), password:form.password || '12345678'})
    if(error) return alert(error.message)
    setUser(data.user); setView('app'); setTab('profile')
  }
  const handleSignin = async () => {
    const { data, error } = await supabase.auth.signInWithPassword({email:form.email.trim(), password:form.password})
    if(error) return alert(error.message)
    setUser(data.user); setView('app'); setTab('discover')
  }

  const onSelect = (post) => {
    setChatWith(post)
    setTab('chat')
    setNotifications(prev=>[...prev,{id:Date.now(), from_name:post.name, type:'like', post_id:post.id}])
  }

  const onFetchMessages = async (uid) => {
    // demo fetch
    setMessages([{id:1,text:'Hi! Nice to meet you 👋', from:uid}])
  }
  const onSend = () => {
    if(!newMsg.trim()) return
    setMessages([...messages,{id:Date.now(), text:newMsg, from:'me'}])
    setNewMsg('')
  }

  if(loading){
    return <div className="min-h-screen bg-black flex items-center justify-center text-white font-black text-xs">KLA-MEET • Loading...</div>
  }

  if(view==='landing'){
    return (
      <div className="min-h-screen bg-white text-black">
        <header className="bg-black text-white px-4 py-3 flex justify-between items-center sticky top-0 z-50">
          <h1 className="font-black text-xs">KLA-MEET • Friendship in Uganda</h1>
          <div className="flex gap-2">
            <button onClick={()=>document.getElementById('signin-box')?.scrollIntoView({behavior:'smooth'})} className="bg-zinc-800 text-white px-4 py-2 rounded-full font-bold text-xs">Sign In</button>
            <button onClick={()=>document.getElementById('signup-box')?.scrollIntoView({behavior:'smooth'})} className="bg-[#FFC300] text-black px-4 py-2 rounded-full font-bold text-xs">Join</button>
          </div>
        </header>

        <div className="max-w-md mx-auto p-6">
          <h2 className="text-[36px] font-black leading-none">Make New Friends<br/>Near You in Uganda.</h2>
          <p className="text-[11px] bg-black text-white px-3 py-2 rounded-full font-bold inline-block mt-3">Kampala • Entebbe • Jinja • Safe Community</p>
        </div>

        <About />
        <HowItWorks />
        <Safety />
        <Pricing />
        <Faqs />

        <div className="max-w-md mx-auto p-6 space-y-4">
          <div id="signin-box" className="bg-zinc-900 text-white rounded-[24px] p-5">
            <h3 className="font-black">Welcome Back</h3>
            <input value={form.email} onChange={e=>setForm({...form,email:e.target.value})} placeholder="Email" className="mt-3 w-full bg-zinc-800 rounded-full px-4 py-3 text-xs" />
            <input value={form.password} onChange={e=>setForm({...form,password:e.target.value})} type="password" placeholder="Password" className="mt-2 w-full bg-zinc-800 rounded-full px-4 py-3 text-xs" />
            <button onClick={handleSignin} className="mt-3 w-full bg-[#FFC300] text-black rounded-full py-3 font-black text-xs">Sign In & Continue</button>
          </div>
          <div id="signup-box" className="bg-[#FFC300] rounded-[24px] p-5">
            <h3 className="font-black">Create Friendship Profile</h3>
            <input value={form.name} onChange={e=>setForm({...form,name:e.target.value})} placeholder="Full Name" className="mt-3 w-full bg-white rounded-full px-4 py-3 text-xs" />
            <input value={form.email} onChange={e=>setForm({...form,email:e.target.value})} placeholder="Email" className="mt-2 w-full bg-white rounded-full px-4 py-3 text-xs" />
            <input value={form.password} onChange={e=>setForm({...form,password:e.target.value})} type="password" placeholder="Password 8+ chars" className="mt-2 w-full bg-white rounded-full px-4 py-3 text-xs" />
            <div className="mt-3 bg-black rounded-xl p-3 flex gap-2">
              <input type="checkbox" checked={agreed} onChange={e=>setAgreed(e.target.checked)} className="w-5 h-5" />
              <p className="text-[10px] text-white">I confirm I am 18 years or older and agree to Privacy & Terms</p>
            </div>
            <button onClick={handleSignup} disabled={!agreed} className={`mt-3 w-full rounded-full py-3 font-black text-xs ${agreed?'bg-black text-white':'bg-zinc-400'}`}>Create Account</button>
          </div>
        </div>

        <footer className="py-10 text-center text-[10px] text-gray-500 border-t mt-6">
          <a href="/privacy" className="mx-2 underline">Privacy</a> | <a href="/terms" className="mx-2 underline">Terms</a> | <a href="/guidelines" className="mx-2 underline">Guidelines</a> | <a href="mailto:kla.meet.ug@gmail.com" className="mx-2 underline">Contact</a>
          <p className="mt-2">© 2026 KLA-MEET Uganda - Friendship Community</p>
        </footer>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white pb-28">
      <header className="p-3 bg-black flex justify-between">
        <h1 className="font-black text-xs">KLA-MEET {isAdmin && '• ADMIN'}</h1>
        <button onClick={async()=>{await supabase.auth.signOut(); setView('landing')}} className="text-[11px] bg-white text-black px-3 py-1.5 rounded-full">Logout</button>
      </header>

      {tab==='discover' && <DiscoverTab posts={posts} onSelect={onSelect} isAdmin={isAdmin} />}
      {tab==='chat' && <ChatTab notifications={notifications} chatWith={chatWith} messages={messages} newMsg={newMsg} setNewMsg={setNewMsg} onSend={onSend} onFetchMessages={onFetchMessages} setChatWith={setChatWith} posts={posts} isPremium={isPremium||isAdmin} />}
      {tab==='nearby' && <NearbyTab posts={posts} onSelect={onSelect} />}
      {tab==='premium' && <PremiumTab />}
      {tab==='profile' && <ProfileTab user={user} isAdmin={isAdmin} form={form} setForm={setForm} />}

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