import { useState, useEffect, useRef } from 'react'
import { supabase } from './supabase'
import PrivacyPage from './Privacy'
const OXA = "https://pay.oxapay.com/18802533"
const ADMIN_EMAILS = ["huzayirukalungi4@gmail.com", "alexmakkoali@gmail.com"]
const PACKAGES = [
  {id:1, months:'1 Month', price:2.99, label:'$2.99', save:''},
  {id:2, months:'3 Months', price:5.99, label:'$5.99', save:'Save 33%'},
  {id:3, months:'6 Months', price:9.99, label:'$9.99', save:'Save 44%'},
  {id:4, months:'1 Year', price:15.99, label:'$15.99', save:'Best Value 🔥'},
]
const WORLD = [
  {city:'Kampala', flag:'🇺🇬', img:'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400'},
  {city:'Entebbe', flag:'🇺🇬', img:'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400'},
  {city:'Jinja', flag:'🇺🇬', img:'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400'},
  {city:'Mbarara', flag:'🇺🇬', img:'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400'},
  {city:'Wakiso', flag:'🇺🇬', img:'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=400'},
]
const INTERESTS = ['Music','Football','Movies','Travel','Cooking','Gym','Business','History','Building','Dancing','Reading','Fashion','Tech','Art','Yoga','Photography']
const EMOJIS = ['😊','😂','❤️','🔥','😍','🥰','😘','🙏','👍','👋','😅','🤩','😭','💋','🌹','✨']
export default function App(){
  if(typeof window!== 'undefined' && window.location.pathname === '/privacy'){
    return <PrivacyPage />
  }
  const [view,setView]=useState('landing')
  const [tab,setTab]=useState('discover')
  const [isPremium,setIsPremium]=useState(false)
  const [isAdmin,setIsAdmin]=useState(false)
  const [allProfiles,setAllProfiles]=useState([])
  const [posts,setPosts]=useState([])
  const [showPostModal,setShowPostModal]=useState(false)
  const [posting,setPosting]=useState(false)
  const [postForm,setPostForm]=useState({type:'friends', bio:'', interests:'', city:'Kampala', lat:0, lng:0, preview:''})
  const [form,setForm]=useState({name:'',email:'',password:'',bio:'',interests:[],gender:'Female',age:'22',city:'Kampala',country:'Uganda',lookingFor:'Friends',photos:['']})
  const [user,setUser]=useState(null)
  const [selectedPost,setSelectedPost]=useState(null)
  const [likedIds,setLikedIds]=useState([])
  const [notifications,setNotifications]=useState([])
  const [chatWith,setChatWith]=useState(null)
  const [messages,setMessages]=useState([])
  const [newMsg,setNewMsg]=useState('')
  const [adminTab,setAdminTab]=useState('posts')
  const [banned,setBanned]=useState([])
  const [adminSearch,setAdminSearch]=useState('')
  const [agreed,setAgreed]=useState(false)
  const [showPrivacy,setShowPrivacy]=useState(false)
  const [showTerms,setShowTerms]=useState(false)
  const [showEmoji,setShowEmoji]=useState(false)
  const [isRecording,setIsRecording]=useState(false)
  const [conversations,setConversations]=useState([])
  const mediaRecorderRef = useRef(null)
  const fileInputRef = useRef(null)
  const isAdminEmail = (e) => ADMIN_EMAILS.includes(e?.toLowerCase().trim())
  useEffect(()=>{
    supabase.auth.getUser().then(({data})=>{
      if(data?.user){
        setUser(data.user)
        if(isAdminEmail(data.user.email)){ setIsAdmin(true); setIsPremium(true); }
      }
    })
    fetchPosts()
  },[])
  useEffect(()=>{ if(user){ fetchLikes(); fetchNotifs(); fetchConversations(); } },[user])
  const fetchPosts = async () => { const { data } = await supabase.from('posts').select('*').order('created_at',{ascending:false}); if(data) setPosts(data) }
  const fetchLikes = async () => { const { data } = await supabase.from('likes').select('post_id').eq('from_user',user.id); if(data) setLikedIds(data.map(d=>d.post_id)) }
  const fetchNotifs = async () => { const { data } = await supabase.from('notifications').select('*').eq('to_user',user.id).order('created_at',{ascending:false}).limit(20); if(data) setNotifications(data) }
  const fetchBanned = async () => { const { data } = await supabase.from('banned_users').select('*'); if(data) setBanned(data) }
  const fetchConversations = async () => {
    if(!user) return
    const { data } = await supabase.from('messages').select('*').or(`from_user.eq.${user.id},to_user.eq.${user.id}`).order('created_at',{ascending:false}).limit(100)
    if(!data) return
    const map = {}
    data.forEach(m=>{
      const otherId = m.from_user===user.id? m.to_user : m.from_user
      if(!map[otherId]) map[otherId] = { user_id: otherId, lastMsg: m.text, time: m.created_at }
    })
    setConversations(Object.values(map))
  }
  const fetchMessages = async (otherId) => {
    const { data } = await supabase.from('messages').select('*').or(`and(from_user.eq.${user.id},to_user.eq.${otherId}),and(from_user.eq.${otherId},to_user.eq.${user.id})`).order('created_at',{ascending:true})
    if(data) setMessages(data)
  }
  const openCrypto = () => window.open(OXA, '_blank')
  const openPesapal = async () => { try{ const r=await fetch('/api/pesapal',{method:'POST'}); const j=await r.json(); if(j.redirect_url) window.open(j.redirect_url,'_blank'); else window.open(OXA,'_blank') }catch{ window.open(OXA,'_blank') } }
  const handleTab = (t) => {
    if(t==='admin' &&!isAdmin) return
    if((t==='nearby' || t==='chat') &&!isPremium &&!isAdmin){ setTab('premium'); return }
    if(t==='chat') fetchConversations()
    setTab(t)
  }
  const handleSignup = async () => {
    if(!agreed){ alert('You must be 18+ and agree'); return }
    if(parseInt(form.age) < 18){ alert('18+ only'); return }
    try{
      const { data } = await supabase.auth.signUp({email:form.email.trim(), password:form.password || '12345678'});
      await supabase.from('profiles').insert([{id:data.user?.id, name:form.name, email:form.email.trim()}])
      setUser(data.user); setView('app'); setTab('profile')
    }catch(e){ alert(e.message) }
  }
  const handleSignin = async () => {
    try{
      const { data } = await supabase.auth.signInWithPassword({email:form.email.trim(), password:form.password})
      setUser(data.user); setView('app'); setTab('discover')
    }catch(e){ alert(e.message) }
  }
  const handleMainPhoto = (e) => {
    const file=e.target.files[0]; if(!file) return
    const reader=new FileReader()
    reader.onload=(ev)=>{
      const img=new Image()
      img.onload=()=>{
        const c=document.createElement('canvas'); let w=img.width,h=img.height,max=500; if(w>max){h=Math.round(h*max/w);w=max}
        c.width=w; c.height=h; c.getContext('2d').drawImage(img,0,0,w,h)
        setForm(f=>({...f, photos:[c.toDataURL('image/jpeg',0.6)]}))
        setPostForm(p=>({...p, preview:c.toDataURL('image/jpeg',0.6)}))
      }; img.src=ev.target.result
    }; reader.readAsDataURL(file)
  }
  const handleCreatePost = async () => {
    if(!user) return
    setPosting(true)
    try{
      const imgUrl=form.photos[0]||WORLD[0].img
      await supabase.from('posts').insert([{user_id:user.id,name:form.name||user.email.split('@')[0],type:postForm.type,bio:form.bio||postForm.bio,age:form.age,city:postForm.city||form.city,image_url:imgUrl}])
      setShowPostModal(false); await fetchPosts(); setTab('discover')
    }catch(e){ alert(e.message) } finally{ setPosting(false) }
  }
  const handleLike = async (post) => {
    if(!isPremium&&!isAdmin){ setTab('premium'); return }
    await supabase.from('likes').insert([{from_user:user.id,to_user:post.user_id,post_id:post.id}])
    setLikedIds([...likedIds,post.id]); setChatWith(post); setTab('chat'); fetchMessages(post.user_id)
  }
  const handleSendMsg = async () => {
    if(!newMsg.trim()||!chatWith) return
    const txt = newMsg; setNewMsg('')
    setMessages(m=>[...m,{id:Date.now(), from_user:user.id, text:txt, created_at:new Date().toISOString()}])
    await supabase.from('messages').insert([{from_user:user.id,to_user:chatWith.user_id,text:txt}])
    fetchMessages(chatWith.user_id)
  }
  const handleReportUser = async (p) => {
    const reason = prompt(`Report ${p.name} - Reason?`)
    if(!reason) return
    alert('Reported ✓')
    setSelectedPost(null)
  }
  if(view==='landing'){
    return (
      <div className="min-h-screen bg-white text-black">
        <header className="bg-black text-white px-4 py-3 flex justify-between items-center"><h1 className="font-black text-xs">KLA-MEET • Uganda Social</h1><button onClick={()=>{setView('app'); setTab('discover')}} className="bg-[#FFC300] text-black px-4 py-2 rounded-full font-bold text-xs">Enter App</button></header>
        <div className="max-w-md mx-auto p-6 space-y-4">
          <h2 className="text-[32px] font-black leading-none">Meet. Chat.<br/>Friends in Uganda.</h2>
          <p className="text-[10px] bg-black text-white px-3 py-2 rounded-full font-bold inline-block">18+ Only • Safe Friendship</p>
          <div className="grid grid-cols-2 gap-3">{PACKAGES.map(pkg=>(<div key={pkg.id} className="bg-black text-white rounded-[20px] p-4"><p className="text-[11px] font-black">{pkg.months}</p><p className="text-[18px] font-black text-[#FFC300]">{pkg.label}</p><button onClick={openCrypto} className="mt-3 w-full bg-white text-black rounded-full py-2 font-bold text-[10px]">Pay</button></div>))}</div>
          <div className="bg-zinc-100 rounded-[24px] p-5"><h3 className="font-black text-sm">About KLA-MEET Uganda</h3><p className="text-[11px] mt-2">Real friendship social network based in Kampala. Connect in Kampala, Wakiso, Entebbe, Jinja. Safe, 18+ only.</p></div>
          <div className="bg-zinc-900 text-white rounded-[24px] p-5"><h3 className="font-black">Sign In - 18+</h3><input value={form.email} onChange={e=>setForm({...form,email:e.target.value})} placeholder="Email" className="mt-3 w-full bg-zinc-800 rounded-full px-4 py-3 text-xs" /><input value={form.password} onChange={e=>setForm({...form,password:e.target.value})} type="password" placeholder="Password" className="mt-2 w-full bg-zinc-800 rounded-full px-4 py-3 text-xs" /><button onClick={handleSignin} className="mt-3 w-full bg-[#FFC300] text-black rounded-full py-3 font-black text-xs">Sign In</button></div>
          <div className="bg-[#FFC300] rounded-[24px] p-5"><h3 className="font-black">Sign Up - 18+</h3><input value={form.name} onChange={e=>setForm({...form,name:e.target.value})} placeholder="Full Name" className="mt-3 w-full bg-white rounded-full px-4 py-3 text-xs" /><input value={form.email} onChange={e=>setForm({...form,email:e.target.value})} placeholder="Email" className="mt-2 w-full bg-white rounded-full px-4 py-3 text-xs" /><input value={form.password} onChange={e=>setForm({...form,password:e.target.value})} type="password" placeholder="Password" className="mt-2 w-full bg-white rounded-full px-4 py-3 text-xs" /><div className="mt-3 bg-black rounded-xl p-3 flex gap-2"><input type="checkbox" checked={agreed} onChange={e=>setAgreed(e.target.checked)} className="w-5 h-5" /><p className="text-[10px] text-white">I am 18+ and agree to Privacy</p></div><button onClick={handleSignup} disabled={!agreed} className={`mt-3 w-full rounded-full py-3 font-black text-xs ${agreed?'bg-black text-white':'bg-zinc-400'}`}>Sign Up</button></div>
        </div>
      </div>
    )
  }
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white pb-28">
      <header className="p-3 bg-black flex justify-between"><h1 className="font-black text-xs">KLA-MEET</h1><button onClick={()=>handleTab('profile')} className="text-[11px] bg-white text-black px-3 py-1.5 rounded-full">Profile</button></header>
      {tab==='discover' && (<div className="max-w-md mx-auto p-4"><h2 className="font-black">Discover • Uganda • 18+</h2><div className="mt-4 grid grid-cols-2 gap-3">{posts.map(p=>(<div key={p.id} onClick={()=>setSelectedPost(p)} className="bg-zinc-900 rounded-[20px] overflow-hidden"><img src={p.image_url} className="h-48 w-full object-cover" /><div className="p-2"><p className="text-xs font-bold">{p.name} • {p.age}</p><p className="text-[9px]">{p.city}</p></div></div>))}</div><h3 className="mt-6 font-bold text-xs">Uganda Cities</h3><div className="grid grid-cols-2 gap-3 mt-2">{WORLD.map(w=>(<div key={w.city} className="bg-zinc-900 rounded-[20px] overflow-hidden"><img src={w.img} className="h-32 w-full object-cover"/><div className="p-2"><p className="text-xs">{w.flag} {w.city}</p></div></div>))}</div></div>)}
      {tab==='chat' && (<div className="max-w-md mx-auto p-4"><h2 className="font-black">Messages</h2>{chatWith && (<div className="mt-6 bg-black border border-[#FFC300]/30 rounded-2xl p-3"><p className="font-black text-xs">{chatWith.name}</p><div className="mt-3 h-80 overflow-y-auto space-y-2 bg-zinc-900 rounded-xl p-2">{messages.map(m=>(<div key={m.id} className={`text-xs p-2 rounded-2xl max-w-[85%] ${m.from_user===user?.id?'bg-[#FFC300] text-black ml-auto':'bg-zinc-800 mr-auto'}`}>{m.text}</div>))}</div><div className="flex gap-2 mt-3"><input value={newMsg} onChange={e=>setNewMsg(e.target.value)} placeholder="Aa..." className="flex-1 bg-zinc-800 rounded-full px-4 py-3 text-xs" /><button onClick={handleSendMsg} className="bg-[#FFC300] text-black px-4 py-3 rounded-full text-xs font-black">Send</button></div></div>)}</div>)}
      {tab==='profile' && (<div className="max-w-md mx-auto p-4"><h2 className="font-black">My Profile</h2><input type="file" accept="image/*" onChange={handleMainPhoto} className="mt-4 w-full text-xs" />{form.photos[0] && <img src={form.photos[0]} className="mt-3 w-full h-64 object-cover rounded-[20px]" />}<button onClick={async()=>{ localStorage.setItem('kla_profile_'+user.id, JSON.stringify(form)); alert('Saved ✓') }} className="w-full mt-4 bg-[#FFC300] text-black rounded-full py-4 font-black">Save Profile ✓</button></div>)}
      {tab==='premium' && (<div className="max-w-md mx-auto p-4"><h2 className="font-black">Premium - Uganda</h2><div className="grid grid-cols-2 gap-3 mt-4">{PACKAGES.map(pkg=>(<div key={pkg.id} className="bg-zinc-900 rounded-[20px] p-4"><p className="text-[11px]">{pkg.months}</p><p className="text-[20px] font-black text-[#FFC300]">{pkg.label}</p><button onClick={openCrypto} className="mt-3 w-full bg-white text-black rounded-full py-2 text-[10px]">Pay</button></div>))}</div></div>)}
      {selectedPost && (<div className="fixed inset-0 bg-black/90 p-4 flex items-center justify-center z-[200]"><div className="bg-zinc-900 rounded-[24px] overflow-hidden w-full max-w-sm"><img src={selectedPost.image_url} className="h-80 w-full object-cover" /><div className="p-4"><h3 className="font-black">{selectedPost.name}</h3><div className="grid grid-cols-2 gap-2 mt-4"><button onClick={()=>handleLike(selectedPost)} className="bg-zinc-800 rounded-full py-3 text-xs">❤️ Like</button><button onClick={()=>{setChatWith(selectedPost); setSelectedPost(null); setTab('chat')}} className="bg-white text-black rounded-full py-3 text-xs font-black">💬 Chat</button></div><button onClick={()=>setSelectedPost(null)} className="mt-3 w-full bg-zinc-800 rounded-full py-2 text-xs">Close</button></div></div></div>)}
      {showPostModal && (<div className="fixed inset-0 bg-black/95 flex items-end justify-center z-[100]"><div className="bg-zinc-900 rounded-t-[32px] p-6 w-full max-w-md"><h3 className="font-black text-sm">Create Post - Uganda • 18+</h3><textarea value={postForm.bio} onChange={e=>setPostForm({...postForm,bio:e.target.value})} placeholder="Write about yourself - respectful" className="mt-4 w-full bg-black border border-white/20 rounded-2xl px-4 py-3 text-xs h-20" /><button onClick={handleCreatePost} disabled={posting} className="mt-5 w-full bg-[#FFC300] text-black rounded-full py-4 font-black">{posting?'Posting...':'Post Now'}</button><button onClick={()=>setShowPostModal(false)} className="mt-2 w-full bg-zinc-800 rounded-full py-3 text-xs">Cancel</button></div></div>)}
      <nav className="fixed bottom-0 left-0 right-0 bg-black border-t border-white/10 flex justify-around items-center py-2"><button onClick={()=>handleTab('discover')} className="text-[11px]">♡<br/>Discover</button><button onClick={()=>setShowPostModal(true)} className="bg-[#FFC300] text-black w-14 h-14 rounded-full flex items-center justify-center font-black text-2xl -mt-5">+</button><button onClick={()=>handleTab('chat')} className="text-[11px]">💬<br/>Chat</button><button onClick={()=>handleTab('premium')} className="text-[11px]">★<br/>Premium</button></nav>
    </div>
  )
}