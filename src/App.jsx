import { useState, useEffect, useRef } from 'react'
import { supabase } from './supabase'
const OXA = "https://pay.oxapay.com/18802533"
const ADMIN_EMAILS = ["huzayirukalungi4@gmail.com", "alexmakkoali@gmail.com"]
const PACKAGES = [
  {id:1, months:'1 Month', price:2.99, label:'$2.99', save:''},
  {id:2, months:'3 Months', price:5.99, label:'$5.99', save:'Save 33%'},
  {id:3, months:'6 Months', price:9.99, label:'$9.99', save:'Save 44%'},
  {id:4, months:'1 Year', price:15.99, label:'$15.99', save:'Best Value 🔥'},
]
const WORLD = [
  {city:'Paris', flag:'🇫🇷', img:'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400'},
  {city:'Tokyo', flag:'🇯🇵', img:'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400'},
  {city:'New York', flag:'🇺🇸', img:'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400'},
  {city:'London', flag:'🇬🇧', img:'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400'},
  {city:'Dubai', flag:'🇦🇪', img:'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=400'},
]
const INTERESTS = ['Music','Football','Movies','Travel','Cooking','Gym','Business','History','Building','Dancing','Reading','Fashion','Tech','Art','Yoga','Photography']
const EMOJIS = ['😊','😂','❤️','🔥','😍','🥰','😘','🙏','👍','👋','😅','🤩','😭','💋','🌹','✨']
export default function App(){
  const [view,setView]=useState('landing')
  const [tab,setTab]=useState('discover')
  const [isPremium,setIsPremium]=useState(false)
  const [isAdmin,setIsAdmin]=useState(false)
  const [allProfiles,setAllProfiles]=useState([])
  const [posts,setPosts]=useState([])
  const [showPostModal,setShowPostModal]=useState(false)
  const [posting,setPosting]=useState(false)
  const [postForm,setPostForm]=useState({type:'dating', bio:'', interests:'', city:'Worldwide', lat:0, lng:0, preview:''})
  const [form,setForm]=useState({name:'',email:'',password:'',bio:'',interests:[],gender:'Female',age:'22',dob:'',city:'Paris',country:'France',lookingFor:'Love',status:'Single',height:'',bodyType:'',religion:'Christian',smoking:'No',drinking:'No',haveKids:'No',wantKids:'Yes',idealDate:'',twoTruths:'',loveLang:'',lookingDesc:'',funFact:'',photos:[''],phone:'',verified:false,lastActive:'Online Now'})
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
  const [faqOpen,setFaqOpen]=useState(null)
  const [showEmoji,setShowEmoji]=useState(false)
  const [isRecording,setIsRecording]=useState(false)
  const [isOnline,setIsOnline]=useState(true)
  const mediaRecorderRef = useRef(null)
  const fileInputRef = useRef(null)
  const isAdminEmail = (e) => { if(!e) return false; return ADMIN_EMAILS.includes(e.toLowerCase().trim()) }
  useEffect(()=>{
    supabase.auth.getUser().then(({data})=>{
      if(data?.user){
        setUser(data.user)
        if(isAdminEmail(data.user.email)){ setIsAdmin(true); setIsPremium(true); localStorage.setItem('kla_premium','yes'); localStorage.setItem('kla_email',data.user.email.toLowerCase()) }
        else { setIsAdmin(false); const saved=localStorage.getItem('kla_email'); if(localStorage.getItem('kla_premium')==='yes' && saved===data.user.email.toLowerCase()) setIsPremium(true) }
        const savedForm = localStorage.getItem('kla_profile_'+data.user.id)
        if(savedForm){ try{ setForm(f=>({...f,...JSON.parse(savedForm)})) }catch{} }
      }
    })
    fetchPosts()
  },[])
  useEffect(()=>{ if(user){ fetchLikes(); fetchNotifs(); const i=setInterval(fetchNotifs,3000); return ()=>clearInterval(i) } },[user])
  useEffect(()=>{ if(tab==='admin' && isAdmin){ fetchProfiles(); fetchBanned() } },[tab])
  const fetchProfiles = async () => { const { data } = await supabase.from('profiles').select('*').order('created_at',{ascending:false}); if(data) setAllProfiles(data) }
  const fetchPosts = async () => { const { data } = await supabase.from('posts').select('*').order('created_at',{ascending:false}); if(data) setPosts(data) }
  const fetchLikes = async () => { if(!user) return; const { data } = await supabase.from('likes').select('post_id').eq('from_user',user.id); if(data) setLikedIds(data.map(d=>d.post_id)) }
  const fetchNotifs = async () => { if(!user) return; const { data } = await supabase.from('notifications').select('*').eq('to_user',user.id).order('created_at',{ascending:false}).limit(20); if(data) setNotifications(data) }
  const fetchBanned = async () => { const { data } = await supabase.from('banned_users').select('*').order('created_at',{ascending:false}); if(data) setBanned(data) }
  const fetchMessages = async (otherId) => {
    if(!user ||!otherId) return
    const { data } = await supabase.from('messages').select('*').or(`and(from_user.eq.${user.id},to_user.eq.${otherId}),and(from_user.eq.${otherId},to_user.eq.${user.id})`).order('created_at',{ascending:true})
    if(data) setMessages(data)
  }
  useEffect(()=>{
    if(!chatWith) return
    fetchMessages(chatWith.user_id)
    const t = setInterval(()=>fetchMessages(chatWith.user_id),2000)
    return ()=>clearInterval(t)
  },[chatWith])
  const openCrypto = () => window.open(OXA, '_blank')
  const openPesapal = async () => { try{ const r=await fetch('/api/pesapal',{method:'POST'}); const j=await r.json(); if(j.redirect_url) window.open(j.redirect_url,'_blank'); else window.open(OXA,'_blank') }catch{ window.open(OXA,'_blank') } }
  const handleTab = (t) => {
    if(t==='admin' &&!isAdmin) return
    if((t==='nearby' || t==='chat' || t==='liked') &&!isPremium &&!isAdmin){ setTab('premium'); return }
    setTab(t)
  }
  const handleSignup = async () => {
    if(!agreed){ alert('Check box to agree Terms & Privacy'); return }
    try{
      const { data, error } = await supabase.auth.signUp({email:form.email.trim(), password:form.password || '12345678'});
      if(error) throw error
      await supabase.from('profiles').insert([{id:data.user?.id, name:form.name, email:form.email.trim(), bio:form.bio, interests:form.interests.join(','), gender:form.gender, age:form.age}])
      if(isAdminEmail(form.email)){ setIsAdmin(true); setIsPremium(true); localStorage.setItem('kla_premium','yes'); localStorage.setItem('kla_email', form.email.toLowerCase()) }
      setUser(data.user); setView('app'); setTab('profile')
    }catch(e){ alert(e.message) }
  }
  const handleSignin = async () => {
    try{
      const { data, error } = await supabase.auth.signInWithPassword({email:form.email.trim(), password:form.password})
      if(error) throw error
      setUser(data.user)
      if(isAdminEmail(data.user.email)){ setIsAdmin(true); setIsPremium(true); localStorage.setItem('kla_premium','yes'); localStorage.setItem('kla_email', data.user.email.toLowerCase()); setView('app'); setTab('admin') }
      else { setIsAdmin(false); setView('app'); setTab('discover') }
    }catch(e){ alert(e.message) }
  }
  const getLocation = async () => {
    setPostForm(f=>({...f, city:'Locating...'}))
    const setCity = (cityName, lat, lng) => { setPostForm(f=>({...f, lat:lat||f.lat, lng:lng||f.lng, city: cityName || 'Worldwide'})) }
    try{
      const r = await fetch('https://ipapi.co/json/')
      const j = await r.json()
      if(j.city) setCity(j.city+', '+(j.country_name||''), j.latitude, j.longitude)
      else throw 0
    }catch{
      if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(async (pos)=>{
          const lat=pos.coords.latitude; const lng=pos.coords.longitude
          try{
            const rr = await fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}&localityLanguage=en`)
            const jj = await rr.json()
            setCity((jj.city||'Worldwide')+', '+(jj.countryName||''), lat, lng)
          }catch{ setCity('Worldwide', lat, lng) }
        },()=> setCity('Worldwide',0,0),{ enableHighAccuracy:false, timeout:7000 })
      } else setCity('Worldwide',0,0)
    }
  }
  const handleMainPhoto = (e) => {
    const file=e.target.files[0]; if(!file) return
    const reader=new FileReader()
    reader.onload=(ev)=>{
      const img=new Image()
      img.onload=()=>{
        const c=document.createElement('canvas'); let w=img.width,h=img.height,max=500; if(w>max){h=Math.round(h*max/w);w=max}
        c.width=w; c.height=h; c.getContext('2d').drawImage(img,0,0,w,h)
        let q=0.6,d=c.toDataURL('image/jpeg',q)
        while(d.length>200000&&q>0.2){q-=0.1; d=c.toDataURL('image/jpeg',q)}
        setForm(f=>({...f, photos:[d,...(f.photos.slice(1,6))]}))
        setPostForm(p=>({...p, preview:d}))
      }; img.src=ev.target.result
    }; reader.readAsDataURL(file)
  }
  const handleExtraPhoto = (idx, e) => {
    const file=e.target.files[0]; if(!file) return
    const reader=new FileReader()
    reader.onload=(ev)=>{
      const img=new Image()
      img.onload=()=>{
        const c=document.createElement('canvas'); let w=img.width,h=img.height,max=400; if(w>max){h=Math.round(h*max/w);w=max}
        c.width=w; c.height=h; c.getContext('2d').drawImage(img,0,0,w,h)
        const d=c.toDataURL('image/jpeg',0.5)
        const newPhotos=[...form.photos]; newPhotos[idx]=d
        setForm(f=>({...f, photos:newPhotos}))
      }; img.src=ev.target.result
    }; reader.readAsDataURL(file)
  }
  const toggleInterest = (chip) => {
    setForm(f=>{
      const has=f.interests.includes(chip)
      if(has) return {...f, interests:f.interests.filter(x=>x!==chip)}
      if(f.interests.length>=8){ alert('Max 8 interests'); return f }
      return {...f, interests:[...f.interests, chip]}
    })
  }
  const handleCreatePost = async () => {
    if(!user){ alert('Sign in'); return }
    if(!postForm.bio &&!form.bio){ alert('Add bio'); return }
    if(posting) return
    setPosting(true)
    try{
      const imgUrl=form.photos[0]||postForm.preview||WORLD[0].img
      const cityName = postForm.city || `${form.city}, ${form.country}` || 'Worldwide'
      await supabase.from('posts').insert([{user_id:user.id,name:form.name||user.email.split('@')[0],type:postForm.type||'dating',bio:form.bio||postForm.bio,interests:form.interests.join(',')||'music',age:form.age||'22',gender:form.gender||'Female',city:cityName,lat:postForm.lat||0,lng:postForm.lng||0,image_url:imgUrl}])
      setShowPostModal(false); await fetchPosts(); setTab('discover')
    }catch(e){ alert(e.message) } finally{ setPosting(false) }
  }
  const handleLike = async (post) => {
    if(!isPremium&&!isAdmin){ setTab('premium'); return }
    try{
      await supabase.from('likes').insert([{from_user:user.id,to_user:post.user_id,post_id:post.id}])
      await supabase.from('notifications').insert([{to_user:post.user_id,from_user:user.id,from_name:form.name||user.email.split('@')[0],type:'like',post_id:post.id}])
      setLikedIds([...likedIds,post.id]); setChatWith(post); setTab('chat'); fetchMessages(post.user_id)
    }catch(e){ alert(e.message) }
  }
  const handleSendMsg = async () => {
    if(!newMsg.trim()||!chatWith) return
    const txt = newMsg; setNewMsg(''); setShowEmoji(false)
    setMessages(m=>[...m,{id:Date.now(), from_user:user.id, text:txt, created_at:new Date().toISOString(), status:'sent'}])
    const { error } = await supabase.from('messages').insert([{from_user:user.id,to_user:chatWith.user_id,text:txt}])
    if(error) alert('Failed: '+error.message)
    else fetchMessages(chatWith.user_id)
  }
  const handleGallerySend = (e) => {
    const file=e.target.files[0]; if(!file ||!chatWith) return
    const reader=new FileReader()
    reader.onload=async (ev)=>{
      const base64 = ev.target.result
      const txt = `📷 Photo: ${file.name}`
      setMessages(m=>[...m,{id:Date.now(), from_user:user.id, text:txt, image:base64, created_at:new Date().toISOString()}])
      await supabase.from('messages').insert([{from_user:user.id,to_user:chatWith.user_id,text:txt}])
    }
    reader.readAsDataURL(file)
  }
  const handleDeleteChat = async () => {
    if(!chatWith ||!confirm(`Delete all chat with ${chatWith.name}?`)) return
    try{
      await supabase.from('messages').delete().or(`and(from_user.eq.${user.id},to_user.eq.${chatWith.user_id}),and(from_user.eq.${chatWith.user_id},to_user.eq.${user.id})`)
      setMessages([]); alert('Chat deleted ✓')
    }catch{ setMessages([]) }
  }
  const handleDeleteNotif = async (id) => {
    setNotifications(n=>n.filter(x=>x.id!==id))
    try{ await supabase.from('notifications').delete().eq('id',id) }catch{}
  }
  const handleClearAllNotifs = async () => {
    if(!confirm('Clear all notifications?')) return
    setNotifications([])
    if(user){ try{ await supabase.from('notifications').delete().eq('to_user',user.id) }catch{} }
  }
  const handleVideoCall = () => {
    if(!chatWith) return
    alert(`📹 Starting video call with ${chatWith.name}...\n(In production connect WebRTC / Agora)`)
    window.open(`https://meet.jit.si/KLAMEET_${chatWith.user_id}_${user.id}`, '_blank')
  }
  const handleAudioCall = () => {
    if(!chatWith) return
    alert(`📞 Calling ${chatWith.name}...`)
  }
  const startRecording = async () => {
    try{
      const stream = await navigator.mediaDevices.getUserMedia({audio:true})
      const mr = new MediaRecorder(stream)
      mediaRecorderRef.current = mr
      const chunks=[]
      mr.ondataavailable = e=>chunks.push(e.data)
      mr.onstop = async () => {
        const blob = new Blob(chunks,{type:'audio/webm'})
        const url = URL.createObjectURL(blob)
        const txt = `🎤 Voice message`
        setMessages(m=>[...m,{id:Date.now(), from_user:user.id, text:txt, audio:url, created_at:new Date().toISOString()}])
        if(chatWith) await supabase.from('messages').insert([{from_user:user.id,to_user:chatWith.user_id,text:txt}])
        stream.getTracks().forEach(t=>t.stop())
      }
      mr.start(); setIsRecording(true)
    }catch(e){ alert('Mic permission needed') }
  }
  const stopRecording = () => {
    if(mediaRecorderRef.current){ mediaRecorderRef.current.stop(); setIsRecording(false) }
  }
  const adminDeletePost = async (id) => { if(!confirm('Delete?')) return; await supabase.from('posts').delete().eq('id',id); setPosts(posts.filter(p=>p.id!==id)) }
  const adminBanUser = async (p) => { const r=prompt('Reason?','Spam'); if(!r) return; await supabase.from('banned_users').insert([{user_id:p.user_id||p.id,email:p.email||'',reason:r}]); await supabase.from('posts').delete().eq('user_id',p.user_id||p.id); fetchPosts(); fetchBanned() }
  const adminUnban = async (id) => { await supabase.from('banned_users').delete().eq('id',id); fetchBanned() }
  const adminWarnUser = async (p) => { const m=prompt('Warning?'); if(!m) return; await supabase.from('warnings').insert([{user_id:p.user_id||p.id,message:m,by_admin:user.email}]); await supabase.from('notifications').insert([{to_user:p.user_id||p.id,from_user:user.id,from_name:'ADMIN',type:'warn'}]) }
  const adminDeleteProfile = async (p) => { if(!confirm('Delete '+p.email)) return; await supabase.from('profiles').delete().eq('id',p.id); fetchProfiles() }
  if(view==='landing'){
    return (
      <div className="min-h-screen bg-white text-black">
        <header className="bg-black text-white px-4 py-3 flex justify-between items-center"><h1 className="font-black text-xs">KLA-MEET • Keep Love Alive</h1><button onClick={()=>{setView('app'); setTab('discover')}} className="bg-[#FFC300] text-black px-4 py-2 rounded-full font-bold text-xs">Enter App</button></header>
        <div className="max-w-md mx-auto p-6 space-y-4">
          <h2 className="text-[32px] font-black leading-none">Date. Meet.<br/>Worldwide.</h2>
          <div className="grid grid-cols-2 gap-3">
            {PACKAGES.map(pkg=>(
              <div key={pkg.id} className="bg-black text-white rounded-[20px] p-4 border border-[#FFC300]/20">
                <p className="text-[11px] font-black">{pkg.months}</p>
                <p className="text-[18px] font-black text-[#FFC300]">{pkg.label}</p>
                {pkg.save && <p className="text-[9px] bg-green-500 text-black rounded-full px-2 py-0.5 inline-block mt-1 font-bold">{pkg.save}</p>}
                <button onClick={openCrypto} className="mt-3 w-full bg-white text-black rounded-full py-2 font-bold text-[10px]">Crypto</button>
                <button onClick={openPesapal} className="mt-2 w-full bg-[#FF6A00] text-white rounded-full py-2 font-bold text-[10px]">Card</button>
              </div>
            ))}
          </div>
          <div className="bg-white border-2 border-[#FFC300] rounded-[20px] p-4">
            <p className="font-black text-[12px] mb-2 text-black">💳 Pay with Pesapal</p>
            <iframe width="100%" height="70" src="https://store.pesapal.com/embed-code?pageUrl=https://store.pesapal.com/klameet" frameBorder="0" allowFullScreen className="w-full rounded-xl bg-white"></iframe>
          </div>
          <div className="bg-zinc-100 rounded-[24px] p-5"><h3 className="font-black text-sm">About KLA-MEET</h3><p className="text-[11px] mt-2 leading-relaxed">International dating platform - video call, voice, emojis, gallery, online status, read receipts.</p></div>
          <div className="grid grid-cols-2 gap-3"><div className="bg-zinc-900 text-white rounded-[20px] p-4"><h4 className="font-black text-[11px]">Privacy</h4><button onClick={()=>setShowPrivacy(true)} className="text-[9px] text-[#FFC300] underline">Read Full</button></div><div className="bg-zinc-900 text-white rounded-[20px] p-4"><h4 className="font-black text-[11px]">Terms</h4><button onClick={()=>setShowTerms(true)} className="text-[9px] text-[#FFC300] underline">Read Full</button></div></div>
          <div className="bg-zinc-900 text-white rounded-[24px] p-5"><h3 className="font-black">Sign In</h3><input value={form.email} onChange={e=>setForm({...form,email:e.target.value})} placeholder="Email" className="mt-3 w-full bg-zinc-800 rounded-full px-4 py-3 text-xs" /><input value={form.password} onChange={e=>setForm({...form,password:e.target.value})} type="password" placeholder="Password" className="mt-2 w-full bg-zinc-800 rounded-full px-4 py-3 text-xs" /><button onClick={handleSignin} className="mt-3 w-full bg-[#FFC300] text-black rounded-full py-3 font-black text-xs">Sign In</button></div>
          <div className="bg-[#FFC300] rounded-[24px] p-5"><h3 className="font-black">Sign Up - Must Agree</h3><input value={form.name} onChange={e=>setForm({...form,name:e.target.value})} placeholder="Full Name" className="mt-3 w-full bg-white rounded-full px-4 py-3 text-xs" /><input value={form.email} onChange={e=>setForm({...form,email:e.target.value})} placeholder="Email" className="mt-2 w-full bg-white rounded-full px-4 py-3 text-xs" /><input value={form.password} onChange={e=>setForm({...form,password:e.target.value})} type="password" placeholder="Password" className="mt-2 w-full bg-white rounded-full px-4 py-3 text-xs" /><div className="flex gap-2 mt-2"><select value={form.gender} onChange={e=>setForm({...form,gender:e.target.value})} className="w-1/2 bg-white rounded-full px-4 py-3 text-xs"><option>Female</option><option>Male</option><option>Other</option></select><input value={form.age} onChange={e=>setForm({...form,age:e.target.value})} placeholder="Age 18+" className="w-1/2 bg-white rounded-full px-4 py-3 text-xs" /></div><div className="mt-3 bg-black rounded-xl p-3 flex gap-2"><input type="checkbox" checked={agreed} onChange={e=>setAgreed(e.target.checked)} className="w-5 h-5" /><p className="text-[10px] text-white">I am 18+ and agree to Terms & Privacy</p></div><button onClick={handleSignup} disabled={!agreed} className={`mt-3 w-full rounded-full py-3 font-black text-xs ${agreed?'bg-black text-white':'bg-zinc-400'}`}>{agreed?'Sign Up ✓':'Check Box'}</button></div>
          <p className="text-center text-[9px] text-zinc-400">© 2026 KLA-MEET • International</p>
        </div>
        {showPrivacy && (<div className="fixed inset-0 bg-black/90 z-[300] p-4 overflow-y-auto"><div className="bg-white rounded-[24px] p-6 max-w-md mx-auto"><h2 className="font-black text-sm">Privacy Policy</h2><div className="mt-4 text-[11px] space-y-2"><p>Data encrypted, never sold.</p></div><button onClick={()=>{setAgreed(true); setShowPrivacy(false)}} className="mt-4 w-full bg-black text-white rounded-full py-3 font-black text-xs">I Agree</button></div></div>)}
        {showTerms && (<div className="fixed inset-0 bg-black/90 z-[300] p-4 overflow-y-auto"><div className="bg-white rounded-[24px] p-6 max-w-md mx-auto"><h2 className="font-black text-sm">Terms</h2><div className="mt-4 text-[11px] space-y-2"><p>18+ only. No fake photos.</p></div><button onClick={()=>{setAgreed(true); setShowTerms(false)}} className="mt-4 w-full bg-[#FFC300] text-black rounded-full py-3 font-black text-xs">I Agree ✓</button></div></div>)}
      </div>
    )
  }
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white pb-28">
      <header className="p-3 bg-black border-b border-white/10 flex justify-between items-center"><h1 className="font-black text-xs">KLA-MEET {isPremium && '• PREMIUM'} {isAdmin && '• ADMIN'}</h1><div className="flex gap-1"><button onClick={()=>handleTab('profile')} className="text-[11px] bg-white text-black px-3 py-1.5 rounded-full font-black">Profile</button>{isAdmin && <button onClick={()=>handleTab('admin')} className="text-[11px] bg-[#FFC300] text-black px-3 py-1.5 rounded-full font-black">Admin</button>}<button onClick={()=>setView('landing')} className="text-[10px] bg-zinc-800 px-2 py-1 rounded-full">Landing</button></div></header>
      {tab==='discover' && (
        <div className="max-w-md mx-auto p-4">
          <h2 className="font-black">Discover • Worldwide</h2>
          {posts.length>0 && <div className="mt-4 grid grid-cols-2 gap-3">{posts.map(p=>(<div key={p.id} onClick={()=>setSelectedPost(p)} className="bg-zinc-900 rounded-[20px] overflow-hidden border border-[#FFC300]/20"><img src={p.image_url} className="h-48 w-full object-cover" /><div className="p-2"><p className="text-xs font-bold">{p.name}</p><p className="text-[9px] text-white/50">{p.city} • 2km away</p><p className="text-[8px] text-green-400">● Online Now</p></div></div>))}</div>}
          <h3 className="mt-6 font-bold text-xs text-white/60">Worldwide</h3>
          <div className="grid grid-cols-2 gap-3 mt-2">{WORLD.map(w=>(<div key={w.city} className="bg-zinc-900 rounded-[20px] overflow-hidden border border-white/10"><img src={w.img} className="h-32 w-full object-cover"/><div className="p-2"><p className="text-xs font-bold">{w.flag} {w.city}</p></div></div>))}</div>
        </div>
      )}
      {tab==='nearby' && <div className="max-w-md mx-auto p-4"><h2 className="font-black">Near You</h2><div className="mt-4 grid grid-cols-2 gap-3">{posts.map(p=>(<div key={p.id} onClick={()=>setSelectedPost(p)} className="bg-zinc-900 rounded-[20px] overflow-hidden"><img src={p.image_url} className="h-32 w-full object-cover"/><div className="p-2"><p className="text-xs">{p.name} • {p.city}</p><p className="text-[8px] text-green-400">2km away • Online</p></div></div>))}</div></div>}
      {tab==='chat' && (
        <div className="max-w-md mx-auto p-4">
          <div className="flex justify-between items-center">
            <h2 className="font-black">Messages - LIVE {isOnline && <span className="text-[9px] text-green-400 ml-2">● Online</span>}</h2>
            <div className="flex gap-2">
              <button onClick={handleClearAllNotifs} className="text-[9px] bg-zinc-800 px-3 py-1 rounded-full border border-red-500/30 text-red-400">Clear All</button>
            </div>
          </div>
          <p className="text-[10px] text-green-400">● Live auto-refresh 2s • Delivered ✓ Seen ✓✓ • Unseen • Online</p>
          <div className="mt-3 space-y-2">
            {notifications.length===0 && <p className="text-[11px] text-white/40">No notifications.</p>}
            {notifications.map(n=>(
              <div key={n.id} className="bg-zinc-900 rounded-xl p-3 flex justify-between items-center border border-white/10">
                <div><p className="text-xs font-bold">🔔 {n.from_name} {n.type==='like' && '❤️'}</p><p className="text-[9px] text-white/50">{n.type} • {new Date(n.created_at).toLocaleTimeString()} • Unseen</p></div>
                <div className="flex gap-1">
                  <button onClick={async()=>{
                    const post=posts.find(pp=>pp.id===n.post_id)
                    if(post){ setChatWith(post); await fetchMessages(post.user_id) }
                    else { setChatWith({user_id:n.from_user, name:n.from_name, image_url:WORLD[0].img}); await fetchMessages(n.from_user) }
                  }} className="text-[10px] bg-[#FFC300] text-black px-3 py-1.5 rounded-full font-black">Open</button>
                  <button onClick={()=>handleDeleteNotif(n.id)} className="text-[10px] bg-zinc-800 border border-red-500/30 text-red-400 px-2 py-1 rounded-full">🗑️</button>
                </div>
              </div>
            ))}
          </div>
          {chatWith && (
            <div className="mt-6 bg-black border border-[#FFC300]/30 rounded-2xl p-3">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <img src={chatWith.image_url||WORLD[0].img} className="w-8 h-8 rounded-full"/>
                  <div><p className="font-black text-xs">{chatWith.name}</p><p className="text-[8px] text-green-400">● Online Now • Typing...</p></div>
                </div>
                <div className="flex gap-2">
                  <button onClick={handleAudioCall} className="w-8 h-8 bg-zinc-800 rounded-full flex items-center justify-center text-xs">📞</button>
                  <button onClick={handleVideoCall} className="w-8 h-8 bg-[#FFC300] text-black rounded-full flex items-center justify-center text-xs">📹</button>
                  <button onClick={handleDeleteChat} className="w-8 h-8 bg-red-900/50 border border-red-500/30 rounded-full flex items-center justify-center text-xs">🗑️</button>
                </div>
              </div>
              <div className="mt-3 h-80 overflow-y-auto space-y-2 bg-zinc-900 rounded-xl p-2">
                {messages.length===0 && <p className="text-[10px] text-white/30 text-center mt-10">No messages yet. Say hi 👋</p>}
                {messages.map(m=>(
                  <div key={m.id} className={`text-xs p-2.5 rounded-2xl max-w-[80%] ${m.from_user===user?.id?'bg-[#FFC300] text-black ml-auto':'bg-zinc-800 text-white'}`}>
                    {m.image && <img src={m.image} className="w-full h-24 object-cover rounded-lg mb-1"/>}
                    {m.audio && <audio src={m.audio} controls className="w-full h-8"/>}
                    <span>{m.text}</span>
                    <span className="block text-[8px] opacity-60 mt-1">
                      {m.from_user===user?.id? (m.id%2===0? '✓✓ Seen • '+new Date(m.created_at).toLocaleTimeString() : '✓ Delivered • '+new Date(m.created_at).toLocaleTimeString()) : 'Unseen • '+new Date(m.created_at).toLocaleTimeString()}
                    </span>
                  </div>
                ))}
              </div>
              {showEmoji && (
                <div className="mt-2 bg-zinc-800 rounded-xl p-2 flex flex-wrap gap-2">
                  {EMOJIS.map(e=><button key={e} onClick={()=>setNewMsg(newMsg+e)} className="text-[18px] hover:bg-zinc-700 rounded p-1">{e}</button>)}
                </div>
              )}
              <div className="flex gap-2 mt-3 items-center">
                <button onClick={()=>setShowEmoji(!showEmoji)} className="w-9 h-9 bg-zinc-800 rounded-full flex items-center justify-center text-[16px]">😊</button>
                <button onClick={()=>fileInputRef.current?.click()} className="w-9 h-9 bg-zinc-800 rounded-full flex items-center justify-center text-[14px]">🖼️</button>
                <input ref={fileInputRef} type="file" accept="image/*" onChange={handleGallerySend} className="hidden"/>
                <input value={newMsg} onChange={e=>setNewMsg(e.target.value)} onKeyDown={e=>{if(e.key==='Enter') handleSendMsg()}} placeholder="Aa - Type message..." className="flex-1 bg-zinc-800 rounded-full px-4 py-3 text-xs" />
                <button onClick={isRecording?stopRecording:startRecording} className={`w-9 h-9 rounded-full flex items-center justify-center text-[14px] ${isRecording?'bg-red-600 animate-pulse':'bg-zinc-800'}`}>🎤</button>
                <button onClick={handleSendMsg} className="bg-[#FFC300] text-black px-4 py-3 rounded-full text-xs font-black">Send</button>
              </div>
              {isRecording && <p className="text-[9px] text-red-400 mt-1">● Recording... Tap mic to stop</p>}
            </div>
          )}
        </div>
      )}
      {tab==='liked' && <div className="max-w-md mx-auto p-4"><h2 className="font-black">Liked • {likedIds.length}</h2><div className="mt-4 grid grid-cols-2 gap-3">{posts.filter(p=>likedIds.includes(p.id)).map(p=>(<div key={p.id} className="bg-zinc-900 rounded-[20px] overflow-hidden"><img src={p.image_url} className="h-32 w-full object-cover"/><div className="p-2"><p className="text-xs">{p.name}</p></div></div>))}</div></div>}
      {tab==='profile' && (
        <div className="max-w-md mx-auto p-4 space-y-4">
          <div className="flex justify-between items-center"><h2 className="font-black text-lg">My Profile</h2><p className="text-[9px] bg-green-500 text-black px-2 py-1 rounded-full font-bold">● Online Now</p></div>
          <p className="text-[10px] text-white/60">{user?.email} • {isPremium?'PREMIUM ✓':'Free'} • {form.city}, {form.country} • Online Now • 2km away</p>
          <div className="bg-zinc-900 rounded-[24px] p-5 border border-[#FFC300]/20">
            <h3 className="font-black text-xs text-[#FFC300]">📸 Profile Photo (main + 5 extra photos)</h3>
            <div className="mt-3">
              <p className="text-[10px] mb-1">Main Photo - Add pic</p>
              <div className="w-full h-64 bg-black rounded-[20px] overflow-hidden border border-white/10 relative">
                {form.photos[0]? <img src={form.photos[0]} className="w-full h-full object-cover"/> : <div className="w-full h-full flex items-center justify-center text-[11px] text-white/30">Add pic</div>}
                <label className="absolute bottom-2 right-2 bg-[#FFC300] text-black px-3 py-1.5 rounded-full text-[10px] font-black cursor-pointer">Add pic<input type="file" accept="image/*" onChange={handleMainPhoto} className="hidden"/></label>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-2 mt-3">
              {[1,2,3,4,5].map(idx=>(
                <div key={idx} className="h-24 bg-black rounded-xl overflow-hidden border border-white/10 relative">
                  {form.photos[idx]? <img src={form.photos[idx]} className="w-full h-full object-cover"/> : <div className="w-full h-full flex items-center justify-center text-[20px] text-white/20">+</div>}
                  <label className="absolute inset-0 cursor-pointer"><input type="file" accept="image/*" onChange={(e)=>handleExtraPhoto(idx,e)} className="hidden"/></label>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-zinc-900 rounded-[24px] p-5 space-y-3 border border-white/10">
            <h3 className="font-black text-xs text-[#FFC300]">👤 Full Info</h3>
            <div><p className="text-[10px] text-white/50 mb-1">Full Name</p><input value={form.name} onChange={e=>setForm({...form,name:e.target.value})} placeholder="Full Name" className="w-full bg-black border border-white/20 rounded-full px-4 py-3 text-xs"/></div>
            <div className="flex gap-2">
              <div className="w-1/2"><p className="text-[10px] text-white/50 mb-1">Age / DOB</p><input value={form.age} onChange={e=>setForm({...form,age:e.target.value})} placeholder="Age 22" className="w-full bg-black border border-white/20 rounded-full px-4 py-3 text-xs"/></div>
              <div className="w-1/2"><p className="text-[10px] text-white/50 mb-1">DOB</p><input value={form.dob} onChange={e=>setForm({...form,dob:e.target.value})} type="date" className="w-full bg-black border border-white/20 rounded-full px-4 py-3 text-xs"/></div>
            </div>
            <div className="flex gap-2">
              <div className="w-1/2"><p className="text-[10px] text-white/50 mb-1">Gender</p><select value={form.gender} onChange={e=>setForm({...form,gender:e.target.value})} className="w-full bg-black border border-white/20 rounded-full px-4 py-3 text-xs"><option>Female</option><option>Male</option><option>Other</option></select></div>
              <div className="w-1/2"><p className="text-[10px] text-white/50 mb-1">What are you looking for?</p><select value={form.lookingFor} onChange={e=>setForm({...form,lookingFor:e.target.value})} className="w-full bg-black border border-white/20 rounded-full px-4 py-3 text-xs"><option>Love</option><option>Friends</option><option>Casual</option><option>Marriage</option></select></div>
            </div>
            <div className="flex gap-2">
              <div className="w-1/2"><p className="text-[10px] text-white/50 mb-1">Location - City</p><input value={form.city} onChange={e=>setForm({...form,city:e.target.value})} placeholder="Paris" className="w-full bg-black border border-white/20 rounded-full px-4 py-3 text-xs"/></div>
              <div className="w-1/2"><p className="text-[10px] text-white/50 mb-1">Country</p><input value={form.country} onChange={e=>setForm({...form,country:e.target.value})} placeholder="France" className="w-full bg-black border border-white/20 rounded-full px-4 py-3 text-xs"/></div>
            </div>
            <div className="flex gap-2">
              <div className="w-1/2"><p className="text-[10px] text-white/50 mb-1">Status</p><select value={form.status} onChange={e=>setForm({...form,status:e.target.value})} className="w-full bg-black border border-white/20 rounded-full px-4 py-3 text-xs"><option>Single</option><option>Divorced</option><option>Widowed</option></select></div>
              <div className="w-1/2"><p className="text-[10px] text-white/50 mb-1">Height</p><input value={form.height} onChange={e=>setForm({...form,height:e.target.value})} placeholder="165cm" className="w-full bg-black border border-white/20 rounded-full px-4 py-3 text-xs"/></div>
            </div>
          </div>
          <div className="bg-zinc-900 rounded-[24px] p-5 space-y-3 border border-white/10">
            <h3 className="font-black text-xs text-[#FFC300]">Details</h3>
            <div><p className="text-[10px] text-white/50 mb-1">Body Type</p><select value={form.bodyType} onChange={e=>setForm({...form,bodyType:e.target.value})} className="w-full bg-black border border-white/20 rounded-full px-4 py-3 text-xs"><option value="">Select</option><option>Slim</option><option>Average</option><option>Athletic</option><option>Curvy</option><option>Plus Size</option></select></div>
            <div className="flex gap-2">
              <div className="w-1/2"><p className="text-[10px] text-white/50 mb-1">Religion</p><select value={form.religion} onChange={e=>setForm({...form,religion:e.target.value})} className="w-full bg-black border border-white/20 rounded-full px-4 py-3 text-xs"><option>Christian</option><option>Muslim</option><option>Catholic</option><option>Other</option></select></div>
              <div className="w-1/2"><p className="text-[10px] text-white/50 mb-1">Smoking / Drinking</p><select value={form.smoking} onChange={e=>setForm({...form,smoking:e.target.value})} className="w-full bg-black border border-white/20 rounded-full px-4 py-3 text-xs"><option>No</option><option>Yes</option><option>Sometimes</option></select></div>
            </div>
            <div className="flex gap-2">
              <div className="w-1/2"><p className="text-[10px] text-white/50 mb-1">Have Kids?</p><select value={form.haveKids} onChange={e=>setForm({...form,haveKids:e.target.value})} className="w-full bg-black border border-white/20 rounded-full px-4 py-3 text-xs"><option>No</option><option>Yes</option></select></div>
              <div className="w-1/2"><p className="text-[10px] text-white/50 mb-1">Want Kids?</p><select value={form.wantKids} onChange={e=>setForm({...form,wantKids:e.target.value})} className="w-full bg-black border border-white/20 rounded-full px-4 py-3 text-xs"><option>Yes</option><option>No</option><option>Maybe</option></select></div>
            </div>
          </div>
          <div className="bg-zinc-900 rounded-[24px] p-5 space-y-3 border border-white/10">
            <h3 className="font-black text-xs text-[#FFC300]">💬 Prompts</h3>
            <div><p className="text-[10px] text-white/50 mb-1">My ideal date is...</p><input value={form.idealDate} onChange={e=>setForm({...form,idealDate:e.target.value})} placeholder="My ideal date is..." className="w-full bg-black border border-white/20 rounded-full px-4 py-3 text-xs"/></div>
            <div><p className="text-[10px] text-white/50 mb-1">Two truths and a lie...</p><input value={form.twoTruths} onChange={e=>setForm({...form,twoTruths:e.target.value})} placeholder="Two truths and a lie..." className="w-full bg-black border border-white/20 rounded-full px-4 py-3 text-xs"/></div>
            <div><p className="text-[10px] text-white/50 mb-1">My love language is...</p><input value={form.loveLang} onChange={e=>setForm({...form,loveLang:e.target.value})} placeholder="My love language is..." className="w-full bg-black border border-white/20 rounded-full px-4 py-3 text-xs"/></div>
            <div><p className="text-[10px] text-white/50 mb-1">I'm looking for...</p><input value={form.lookingDesc} onChange={e=>setForm({...form,lookingDesc:e.target.value})} placeholder="I'm looking for..." className="w-full bg-black border border-white/20 rounded-full px-4 py-3 text-xs"/></div>
            <div><p className="text-[10px] text-white/50 mb-1">Fun fact about me...</p><input value={form.funFact} onChange={e=>setForm({...form,funFact:e.target.value})} placeholder="Fun fact about me..." className="w-full bg-black border border-white/20 rounded-full px-4 py-3 text-xs"/></div>
          </div>
          <div className="bg-black border border-[#FFC300]/20 rounded-[24px] p-5 space-y-3">
            <h3 className="font-black text-xs">🎯 Chips: Select 5-8 interests</h3>
            <p className="text-[9px] text-white/40">{form.interests.length}/8 selected</p>
            <div className="flex flex-wrap gap-2">
              {INTERESTS.map(chip=>(
                <button key={chip} onClick={()=>toggleInterest(chip)} className={`px-3 py-1.5 rounded-full text-[10px] font-bold border ${form.interests.includes(chip)?'bg-[#FFC300] text-black border-[#FFC300]':'bg-zinc-800 text-white/70 border-white/10'}`}>{chip}</button>
              ))}
            </div>
          </div>
          <div className="bg-zinc-900 rounded-[24px] p-5 space-y-3 border border-white/10">
            <h3 className="font-black text-xs text-[#FFC300]">✅ Verify + Safety</h3>
            <div><p className="text-[10px] text-white/50 mb-1">Verify with Phone Number (OTP)</p><div className="flex gap-2"><input value={form.phone} onChange={e=>setForm({...form,phone:e.target.value})} placeholder="+1 234..." className="flex-1 bg-black border border-white/20 rounded-full px-4 py-3 text-xs"/><button onClick={()=>{ if(!form.phone) alert('Enter phone'); else { alert('OTP sent to '+form.phone); setForm(f=>({...f, verified:true})) } }} className="bg-green-500 text-black px-4 py-2 rounded-full text-[10px] font-black">Verify OTP</button></div>{form.verified && <p className="text-[9px] text-green-400 mt-1">✓ Phone Verified</p>}</div>
            <div><p className="text-[10px] text-white/50 mb-1">Verify Photo (selfie check)</p><button onClick={()=>alert('Selfie verified ✓')} className="w-full bg-black border border-white/20 rounded-full py-3 text-[10px]">📸 Verify Photo</button></div>
            <div className="bg-black rounded-xl p-3 flex justify-between items-center"><div><p className="text-[11px] font-bold">Last Active / Online Now</p><p className="text-[9px] text-green-400">● Online Now • Distance Away: 2km away • {form.city}</p></div><div>✓</div></div>
            <div className="flex gap-2"><button className="flex-1 bg-zinc-800 border border-red-500/30 text-red-400 py-2 rounded-full text-[10px]">🚩 Report</button><button className="flex-1 bg-zinc-800 border border-white/10 py-2 rounded-full text-[10px]">🚫 Block</button></div>
          </div>
          <button onClick={async()=>{
            if(!user) return
            localStorage.setItem('kla_profile_'+user.id, JSON.stringify(form))
            try{ await supabase.from('profiles').update({name:form.name, bio:form.bio, interests:form.interests.join(','), gender:form.gender, age:form.age}).eq('id',user.id) }catch{}
            alert('Profile saved ✓')
          }} className="w-full bg-[#FFC300] text-black rounded-full py-4 font-black text-sm">Save Full Profile ✓</button>
          <div className="grid grid-cols-4 gap-2">
            <button className="bg-zinc-900 border border-white/10 rounded-2xl py-3 text-[11px]">❤️<br/><span className="text-[8px]">Like</span></button>
            <button className="bg-[#FFC300] text-black rounded-2xl py-3 text-[11px] font-black">⭐<br/><span className="text-[8px]">Super Like</span></button>
            <button onClick={()=>setTab('chat')} className="bg-white text-black rounded-2xl py-3 text-[11px] font-black">💬<br/><span className="text-[8px]">Message</span></button>
            <button onClick={()=>setTab('premium')} className="bg-zinc-800 border border-[#FFC300]/30 rounded-2xl py-3 text-[11px]">🎁<br/><span className="text-[8px]">Gift</span></button>
          </div>
          <button onClick={async()=>{await supabase.auth.signOut(); localStorage.clear(); location.reload()}} className="w-full bg-zinc-900 border border-red-500/30 text-red-400 px-4 py-3 rounded-full text-xs font-bold">Logout</button>
        </div>
      )}
      {tab==='premium' && (
        <div className="max-w-md mx-auto p-4 space-y-4">
          <h2 className="font-black">Premium Packages - International</h2>
          {isAdmin && <div className="bg-green-500 text-black rounded-xl p-3 text-xs font-black">Admin Access - Free</div>}
          <div className="grid grid-cols-2 gap-3">
            {PACKAGES.map(pkg=>(
              <div key={pkg.id} className="bg-zinc-900 rounded-[20px] p-4 border border-white/10">
                <p className="text-[11px] font-black">{pkg.months}</p>
                <p className="text-[20px] font-black text-[#FFC300]">{pkg.label}</p>
                {pkg.save && <p className="text-[9px] bg-[#FFC300] text-black rounded-full px-2 py-0.5 inline-block mt-1 font-bold">{pkg.save}</p>}
                <button onClick={openCrypto} className="mt-3 w-full bg-white text-black rounded-full py-2 font-bold text-[10px]">Crypto {pkg.label}</button>
                <button onClick={openPesapal} className="mt-2 w-full bg-[#FF6A00] text-white rounded-full py-2 font-bold text-[10px]">Card {pkg.label}</button>
              </div>
            ))}
          </div>
          <div className="bg-white rounded-[20px] p-4 border-2 border-[#FFC300]">
            <p className="font-black text-[13px] text-black">💳 Pay with Pesapal</p>
            <p className="text-[10px] text-zinc-500 mb-3">Official checkout - Mobile Money, Visa, Mastercard</p>
            <iframe width="100%" height="60" src="https://store.pesapal.com/embed-code?pageUrl=https://store.pesapal.com/klameet" frameBorder="0" allowFullScreen style={{borderRadius:'12px', background:'white'}}></iframe>
            <p className="text-[9px] text-zinc-400 mt-2 text-center">Secure checkout by Pesapal - store.pesapal.com/klameet</p>
          </div>
        </div>
      )}
      {tab==='admin' && <div className="max-w-md mx-auto p-3"><h2 className="font-black">Admin Panel</h2><p className="text-[9px] text-green-400">Logged: {user?.email} {isAdmin?'Authorized':'X'}</p><div className="mt-3 flex gap-2"><button onClick={()=>setAdminTab('posts')} className={`px-4 py-2 rounded-full text-[11px] font-black ${adminTab==='posts'?'bg-[#FFC300] text-black':'bg-zinc-800'}`}>Posts {posts.length}</button><button onClick={()=>setAdminTab('users')} className={`px-4 py-2 rounded-full text-[11px] font-black ${adminTab==='users'?'bg-[#FFC300] text-black':'bg-zinc-800'}`}>Users {allProfiles.length}</button><button onClick={()=>setAdminTab('banned')} className={`px-4 py-2 rounded-full text-[11px] font-black ${adminTab==='banned'?'bg-red-600':'bg-zinc-800'}`}>Banned {banned.length}</button></div><input value={adminSearch} onChange={e=>setAdminSearch(e.target.value)} placeholder="Search" className="mt-3 w-full bg-zinc-900 border border-white/10 rounded-full px-4 py-2 text-xs" />{adminTab==='posts' && <div className="mt-4 space-y-3">{posts.map(p=>(<div key={p.id} className="bg-zinc-900 rounded-[16px] flex overflow-hidden"><img src={p.image_url} className="w-24 h-24 object-cover"/><div className="p-2 flex-1"><p className="text-[11px] font-bold">{p.name} • {p.city}</p><div className="flex gap-1 mt-2"><button onClick={()=>adminDeletePost(p.id)} className="bg-red-600 px-2 py-1 rounded-full text-[9px]">Delete</button><button onClick={()=>adminBanUser(p)} className="bg-black border border-red-500 px-2 py-1 rounded-full text-[9px]">Ban</button></div></div></div>))}</div>}{adminTab==='users' && <div className="mt-4 space-y-2">{allProfiles.map(p=>(<div key={p.id} className="bg-zinc-900 rounded-xl p-3"><p className="text-xs font-bold">{p.name} • {p.email}</p><div className="flex gap-1 mt-2"><button onClick={()=>adminWarnUser(p)} className="bg-yellow-600 px-3 py-1 rounded-full text-[9px]">Warn</button><button onClick={()=>adminBanUser(p)} className="bg-red-600 px-3 py-1 rounded-full text-[9px]">Ban</button></div></div>))}</div>}{adminTab==='banned' && <div className="mt-4 space-y-2">{banned.map(b=>(<div key={b.id} className="bg-red-900/20 border border-red-500/30 rounded-xl p-3"><p className="text-xs">{b.email} • {b.reason}</p><button onClick={()=>adminUnban(b.id)} className="mt-2 bg-white text-black px-3 py-1 rounded-full text-[9px]">Unban</button></div>))}</div>}</div>}
      {selectedPost && (
        <div className="fixed inset-0 bg-black/90 p-4 flex items-center justify-center z-[200] overflow-y-auto">
          <div className="bg-zinc-900 rounded-[24px] overflow-hidden w-full max-w-sm border border-[#FFC300]/30">
            <img src={selectedPost.image_url} className="h-80 w-full object-cover" />
            <div className="p-4">
              <h3 className="font-black">{selectedPost.name} • {selectedPost.age}</h3>
              <p className="text-[11px] text-white/60">📍 {selectedPost.city} • 2km away • Online Now • {isOnline?'● Online':'○ Offline'}</p>
              <p className="text-xs mt-2">{selectedPost.bio}</p>
              <div className="grid grid-cols-4 gap-2 mt-4">
                <button onClick={()=>handleLike(selectedPost)} className="bg-zinc-800 rounded-full py-3 text-xs">❤️ Like</button>
                <button className="bg-[#FFC300] text-black rounded-full py-3 text-xs font-black">⭐</button>
                <button onClick={()=>{setChatWith(selectedPost); setSelectedPost(null); setTab('chat'); fetchMessages(selectedPost.user_id)}} className="bg-white text-black rounded-full py-3 text-xs font-black">💬 Message</button>
                <button className="bg-zinc-800 rounded-full py-3 text-xs">🎁 Gift</button>
              </div>
              <button className="mt-2 w-full bg-black border border-red-500/30 text-red-400 rounded-full py-2 text-[10px]">🚩 Report & Block</button>
              {isAdmin && <div className="flex gap-2 mt-2"><button onClick={()=>adminDeletePost(selectedPost.id)} className="flex-1 bg-red-600 rounded-full py-2 text-[10px]">Delete</button><button onClick={()=>adminBanUser(selectedPost)} className="flex-1 bg-black border border-red-500 rounded-full py-2 text-[10px]">Ban</button></div>}
              <button onClick={()=>setSelectedPost(null)} className="mt-3 w-full bg-zinc-800 rounded-full py-2 text-xs">Close</button>
            </div>
          </div>
        </div>
      )}
      {showPostModal && (
        <div className="fixed inset-0 bg-black/95 p-0 flex items-end justify-center z-[100]">
          <div className="bg-zinc-900 rounded-t-[32px] p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center"><h3 className="font-black text-sm">Create Post</h3><button onClick={()=>setShowPostModal(false)} className="bg-zinc-800 w-8 h-8 rounded-full">✕</button></div>
            <div className="flex gap-2 mt-4">
              <button onClick={()=>setPostForm({...postForm,type:'dating'})} className={`flex-1 rounded-full py-3 text-xs font-black ${postForm.type==='dating'?'bg-[#FFC300] text-black':'bg-zinc-800'}`}>❤️ Dating</button>
              <button onClick={()=>setPostForm({...postForm,type:'friends'})} className={`flex-1 rounded-full py-3 text-xs font-black ${postForm.type==='friends'?'bg-white text-black':'bg-zinc-800'}`}>🤝 Friends</button>
            </div>
            <div className="mt-4">
              <input type="file" accept="image/*" onChange={handleMainPhoto} className="mt-2 w-full text-xs file:bg-white file:text-black file:rounded-full file:px-4 file:py-2" />
              {(postForm.preview || form.photos[0]) && <img src={postForm.preview || form.photos[0]} className="mt-3 w-full h-64 object-cover rounded-[20px]" />}
            </div>
            <textarea value={postForm.bio} onChange={e=>setPostForm({...postForm,bio:e.target.value})} placeholder="Bio" className="mt-4 w-full bg-black border border-white/20 rounded-2xl px-4 py-3 text-xs h-20" />
            <div className="mt-3 bg-black rounded-2xl p-4 border border-white/10 flex justify-between items-center"><p className="text-xs font-bold">📍 {postForm.city || form.city+', '+form.country}</p><button onClick={getLocation} className="bg-[#FFC300] text-black px-5 py-2.5 rounded-full text-[11px] font-black">Location</button></div>
            <button onClick={handleCreatePost} disabled={posting} className="mt-5 w-full bg-[#FFC300] text-black rounded-full py-4 font-black text-[15px]">{posting?'Posting...':'Post Now'}</button>
          </div>
        </div>
      )}
      <nav className="fixed bottom-0 left-0 right-0 bg-black border-t border-white/10 flex justify-around items-center py-2">
        <button onClick={()=>handleTab('discover')} className="text-[11px]">♡<br/><span className="text-[8px]">Discover</span></button>
        <button onClick={()=>handleTab('nearby')} className="text-[11px]">◎<br/><span className="text-[8px]">Near You</span></button>
        <button onClick={()=>setShowPostModal(true)} className="bg-[#FFC300] text-black w-14 h-14 rounded-full flex items-center justify-center font-black text-2xl -mt-5 border-4 border-black">+</button>
        <button onClick={()=>handleTab('chat')} className="text-[11px] relative">💬<br/><span className="text-[8px]">Chat</span>{notifications.length>0 && <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[7px] w-3 h-3 rounded-full flex items-center justify-center">{notifications.length}</span>}</button>
        {isAdmin? <button onClick={()=>handleTab('admin')} className="text-[11px] text-[#FFC300] font-black">★<br/><span className="text-[8px]">Admin</span></button> : <button onClick={()=>handleTab('premium')} className="text-[11px]">★<br/><span className="text-[8px]">Premium</span></button>}
      </nav>
    </div>
  )
}
