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

  const [chatWith,setChatWith]=useState(null)
  const [messages,setMessages]=useState([])
  const [newMsg,setNewMsg]=useState('')
  const [notifications,setNotifications]=useState([])
  const [showPost,setShowPost]=useState(false)
  const [newPost,setNewPost]=useState({name:'',city:'Kampala',image_url:'',bio:''})

  useEffect(()=>{
    supabase.auth.getSession().then(({data})=>{
      if(data?.session?.user){
        const u=data.session.user; setUser(u); setView('app')
        if(ADMIN_EMAILS.includes(u.email?.toLowerCase().trim())){ setIsAdmin(true); setIsPremium(true) }
        supabase.from('profiles').select('*').eq('id',u.id).single().then(({data:p})=>{ if(p) setForm(f=>({...f,...p})) })
      }
      setLoading(false)
    })
    supabase.from('posts').select('*').order('created_at',{ascending:false}).then(({data})=>{ if(data) setPosts(data) })
  },[])

  // FREEMIUM: allow preview
  const handleTab = (t) => {
    if(t==='admin' &&!isAdmin) return
    setTab(t) // allow all, limit inside tabs
  }

  const handleSignup = async () => {
    if(!agreed) return alert('Confirm 18+')
    const { data, error } = await supabase.auth.signUp({email:form.email.trim(), password:form.password || '12345678'})
    if(error) return alert(error.message)
    const u=data.user || data.session?.user
    setUser(u);
    // REAL Supabase insert
    await supabase.from('profiles').upsert({id:u.id, email:form.email.trim(), name:form.name, city:form.city, age:parseInt(form.age||22), bio:form.bio, created_at:new Date()})
    setView('app'); setTab('profile')
  }
  const handleSignin = async () => {
    const { data, error } = await supabase.auth.signInWithPassword({email:form.email.trim(), password:form.password})
    if(error) return alert(error.message)
    setUser(data.user); setView('app'); setTab('discover')
  }

  const onSelect = (post) => { setChatWith(post); setTab('chat'); setNotifications(prev=>[...prev,{id:Date.now(), from_name:post.name, type:'liked your profile', post_id:post.id}]) }
  const onFetchMessages = async (uid) => { setMessages([{id:1,text:'Hi! 👋 Nice to meet you. Friendship only 😊', from:uid}]) }
  const onSend = () => { if(!newMsg.trim()) return; setMessages([...messages,{id:Date.now(), text:newMsg, from:'me'}]); setNewMsg('') }

  const createPost = async () => {
    if(!newPost.name ||!newPost.image_url) return alert('Name + Photo required')
    const { data, error } = await supabase.from('posts').insert([{ name:newPost.name, city:newPost.city, image_url:newPost.image_url, bio:newPost.bio, user_id:user?.id, age:form.age }]).select()
    if(error) return alert(error.message)
    setPosts([data[0],...posts]); setShowPost(false); setNewPost({name:'',city:'Kampala',image_url:'',bio:''})
  }

  const handleDeleteAccount = async () => {
    if(!confirm('Delete ALL your posts + profile forever?')) return
    await supabase.from('posts').delete().eq('user_id', user.id)
    await supabase.from('profiles').delete().eq('id', user.id)
    await supabase.auth.signOut(); localStorage.clear(); window.location.href='/'
  }

  // PAYMENTS WORKING
  const onCrypto = () => window.open('https://nowpayments.io/payment/?iid=4727316829','_blank')
  const onPesapal = () => { window.open('https://www.pesapal.com/','_blank'); alert('Pesapal: MTN/Airtel UGX 10k. After payment send screenshot to kla.meet.ug@gmail.com — admin activates in 5 mins') }

  if(loading) return <div className="min-h-screen bg-black flex items-center justify-center text-white font-black text-xs">KLA-MEET • Loading...</div>

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
        <div className="max-w-md mx-auto p-6"><h2 className="text-[36px] font-black leading-none">Make New Friends<br/>Near You in Uganda.</h2><p className="text-[11px] bg-black text-white px-3 py-2 rounded-full font-bold inline-block mt-3">Kampala • Entebbe • Jinja • Safe Community</p></div>
        <About /><HowItWorks /><Safety /><Pricing /><Faqs />
        <div className="max-w-md mx-auto p-6 space-y-4">
          <div id="signin-box" className="bg-zinc-900 text-white rounded-[24px] p-5"><h3 className="font-black">Welcome Back</h3><input value={form.email} onChange={e=>setForm({...form,email:e.target.value})} placeholder="Email" className="mt-3 w-full bg-zinc-800 rounded-full px-4 py-3 text-xs" /><input value={form.password} onChange={e=>setForm({...form,password:e.target.value})} type="password" placeholder="Password" className="mt-2 w-full bg-zinc-800 rounded-full px-4 py-3 text-xs" /><button onClick={handleSignin} className="mt-3 w-full bg-[#FFC300] text-black rounded-full py-3 font-black text-xs">Sign In & Continue</button></div>
          <div id="signup-box" className="bg-[#FFC300] rounded-[24px] p-5"><h3 className="font-black">Create Friendship Profile</h3><input value={form.name} onChange={e=>setForm({...form,name:e.target.value})} placeholder="Full Name" className="mt-3 w-full bg-white rounded-full px-4 py-3 text-xs" /><input value={form.email} onChange={e=>setForm({...form,email:e.target.value})} placeholder="Email" className="mt-2 w-full bg-white rounded-full px-4 py-3 text-xs" /><input value={form.password} onChange={e=>setForm({...form,password:e.target.value})} type="password" placeholder="Password 8+ chars" className="mt-2 w-full bg-white rounded-full px-4 py-3 text-xs" /><div className="mt-3 bg-black rounded-xl p-3 flex gap-2"><input type="checkbox" checked={agreed} onChange={e=>setAgreed(e.target.checked)} className="w-5 h-5" /><p className="text-[10px] text-white">I confirm I am 18 years or older and agree to Privacy & Terms</p></div><button onClick={handleSignup} disabled={!agreed} className={`mt-3 w-full rounded-full py-3 font-black text-xs ${agreed?'bg-black text-white':'bg-zinc-400'}`}>Create Account</button></div>
        </div>
        <footer className="py-10 text-center text-[10px] text-gray-500 border-t mt-6"><a href="/privacy" className="mx-2 underline">Privacy</a> | <a href="/terms" className="mx-2 underline">Terms</a> | <a href="/guidelines" className="mx-2 underline">Guidelines</a> | <a href="mailto:kla.meet.ug@gmail.com" className="mx-2 underline">Contact</a><p className="mt-2">© 2026 KLA-MEET Uganda - Friendship Community</p></footer>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white pb-28">
      <header className="p-3 bg-black flex justify-between"><h1 className="font-black text-xs">KLA-MEET {isAdmin && '• ADMIN'}</h1><button onClick={async()=>{await supabase.auth.signOut(); setView('landing')}} className="text-[11px] bg-white text-black px-3 py-1.5 rounded-full">Logout</button></header>

      {tab==='discover' && <DiscoverTab posts={posts} onSelect={onSelect} isAdmin={isAdmin} />}
      {tab==='chat' && <ChatTab notifications={notifications} chatWith={chatWith} messages={messages} newMsg={newMsg} setNewMsg={setNewMsg} onSend={onSend} onFetchMessages={onFetchMessages} setChatWith={setChatWith} posts={posts} isPremium={isPremium||isAdmin} />}
      {tab==='nearby' && <NearbyTab posts={posts} onSelect={onSelect} isPremium={isPremium||isAdmin} />}
      {tab==='premium' && <PremiumTab isAdmin={isAdmin} onCrypto={onCrypto} onPesapal={onPesapal} />}
      {tab==='profile' && <ProfileTab user={user} isAdmin={isAdmin} form={form} setForm={setForm} onDelete={handleDeleteAccount} />}

      {/* POST MODAL */}
      {showPost && (
        <div className="fixed inset-0 bg-black/80 z-[100] flex items-center justify-center p-4">
          <div className="bg-zinc-900 rounded-[24px] p-5 w-full max-w-sm">
            <h3 className="font-black text-white">+ Post to Discover</h3>
            <input value={newPost.name} onChange={e=>setNewPost({...newPost,name:e.target.value})} placeholder="Your display name" className="mt-3 w-full bg-black rounded-full px-4 py-3 text-xs text-white" />
            <input value={newPost.city} onChange={e=>setNewPost({...newPost,city:e.target.value})} placeholder="City: Kampala" className="mt-2 w-full bg-black rounded-full px-4 py-3 text-xs text-white" />
            <input value={newPost.image_url} onChange={e=>setNewPost({...newPost,image_url:e.target.value})} placeholder="Photo URL https://..." className="mt-2 w-full bg-black rounded-full px-4 py-3 text-xs text-white" />
            <textarea value={newPost.bio} onChange={e=>setNewPost({...newPost,bio:e.target.value})} placeholder="Bio: football, music, friendship..." className="mt-2 w-full bg-black rounded-xl px-4 py-3 text-xs text-white h-20" />
            <div className="flex gap-2 mt-3"><button onClick={()=>setShowPost(false)} className="flex-1 bg-zinc-800 text-white rounded-full py-3 text-xs font-bold">Cancel</button><button onClick={createPost} className="flex-1 bg-[#FFC300] text-black rounded-full py-3 text-xs font-black">Post Now</button></div>
            <p className="text-[8px] text-white/30 mt-2 text-center">Real post saved to Supabase • Visible in Discover</p>
          </div>
        </div>
      )}

      {/* BOTTOM NAV WITH + IN MIDDLE */}
      <nav className="fixed bottom-0 left-0 right-0 bg-black border-t border-white/10 flex justify-around items-center py-2 z-50">
        <button onClick={()=>handleTab('discover')} className={`text-[10px] flex flex-col items-center ${tab==='discover'?'text-[#FFC300]':'text-white/60'}`}>♡<span>Discover</span></button>
        <button onClick={()=>handleTab('nearby')} className={`text-[10px] flex flex-col items-center ${tab==='nearby'?'text-[#FFC300]':'text-white/60'}`}>📍<span>Nearby</span></button>
        <button onClick={()=>setShowPost(true)} className="bg-[#FFC300] w-14 h-14 rounded-full flex items-center justify-center text-black font-black text-2xl -mt-6 border-4 border-[#0a0a0a] shadow-lg">+</button>
        <button onClick={()=>handleTab('chat')} className={`text-[10px] flex flex-col items-center ${tab==='chat'?'text-[#FFC300]':'text-white/60'}`}>💬<span>Chat</span></button>
        <button onClick={()=>handleTab('profile')} className={`text-[10px] flex flex-col items-center ${tab==='profile'?'text-[#FFC300]':'text-white/60'}`}>👤<span>Me</span></button>
      </nav>
    </div>
  )
}