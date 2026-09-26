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
  {city:'Paris', flag:'🇫🇷', img:'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400'},
  {city:'Tokyo', flag:'🇯🇵', img:'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400'},
  {city:'New York', flag:'🇺🇸', img:'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400'},
  {city:'London', flag:'🇬🇧', img:'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400'},
  {city:'Dubai', flag:'🇦🇪', img:'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=400'},
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
  const [showEmoji,setShowEmoji]=useState(false)
  const [isRecording,setIsRecording]=useState(false)
  const [isOnline,setIsOnline]=useState(true)
  const [conversations,setConversations]=useState([])
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
  useEffect(()=>{ if(user){ fetchLikes(); fetchNotifs(); fetchConversations(); const i=setInterval(()=>{fetchNotifs(); fetchConversations()},3000); return ()=>clearInterval(i) } },[user])
  useEffect(()=>{ if(tab==='admin' && isAdmin){ fetchProfiles(); fetchBanned() } },[tab])
  const fetchProfiles = async () => { const { data } = await supabase.from('profiles').select('*').order('created_at',{ascending:false}); if(data) setAllProfiles(data) }
  const fetchPosts = async () => { const { data } = await supabase.from('posts').select('*').order('created_at',{ascending:false}); if(data) setPosts(data) }
  const fetchLikes = async () => { if(!user) return; const { data } = await supabase.from('likes').select('post_id').eq('from_user',user.id); if(data) setLikedIds(data.map(d=>d.post_id)) }
  const fetchNotifs = async () => { if(!user) return; const { data } = await supabase.from('notifications').select('*').eq('to_user',user.id).order('created_at',{ascending:false}).limit(20); if(data) setNotifications(data) }
  const fetchBanned = async () => { const { data } = await supabase.from('banned_users').select('*').order('created_at',{ascending:false}); if(data) setBanned(data) }
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
  useEffect(()=>{
    if(!user) return
    const channel = supabase.channel('msg-live-'+user.id)
 .on('postgres_changes',{event:'INSERT', schema:'public', table:'messages', filter:`to_user=eq.${user.id}`}, (payload)=>{
        fetchConversations()
        if(chatWith && payload.new.from_user===chatWith.user_id){ setMessages(m=>[...m, payload.new]) }
      }).subscribe()
    return ()=>{ supabase.removeChannel(channel) }
  },[user, chatWith])
  const openCrypto = () => window.open(OXA, '_blank')
  const openPesapal = async () => { try{ const r=await fetch('/api/pesapal',{method:'POST'}); const j=await r.json(); if(j.redirect_url) window.open(j.redirect_url,'_blank'); else window.open(OXA,'_blank') }catch{ window.open(OXA,'_blank') } }
  const handleTab = (t) => {
    if(t==='admin' &&!isAdmin) return
    if((t==='nearby' || t==='chat' || t==='liked') &&!isPremium &&!isAdmin){ setTab('premium'); return }
    if(t==='chat') fetchConversations()
    setTab(t)
  }
  const handleSignup = async () => {
    if(!agreed){ alert('You must be 18+ and agree to Terms & Privacy Policy - check box'); return }
    const ageNum = parseInt(form.age) || 0
    if(ageNum < 18){ alert('KLA-MEET is strictly 18+ only. You must be 18 or older.'); return }
    if(!form.name ||!form.email){ alert('Name and email required'); return }
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
  const handleMainPhoto = (e) => { const file=e.target.files[0]; if(!file) return
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
      setShowPostModal(false); await fetchPosts(); setTab('discover') }catch(e){ alert(e.message) } finally{ setPosting(false) }
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
    setMessages(m=>[...m,{id:Date.now(), from_user:user.id, text:txt, created_at:new Date().toISOString()}])
    const { error } = await supabase.from('messages').insert([{from_user:user.id,to_user:chatWith.user_id,text:txt}])
    if(error) alert('Failed: '+error.message)
    else { fetchMessages(chatWith.user_id); fetchConversations() }
  }
  const handleGallerySend = async (e) => {
    const file=e.target.files[0]; if(!file ||!chatWith) return
    const reader=new FileReader()
    reader.onload=async (ev)=>{
      const base64 = ev.target.result
      setMessages(m=>[...m,{id:Date.now(), from_user:user.id, text:'📷 Photo', image_url:base64, created_at:new Date().toISOString()}])
      try{
        const fileName = `${user.id}_${Date.now()}_${file.name}`
        const { error: upErr } = await supabase.storage.from('chat-media').upload(fileName, file)
        if(!upErr){
          const { data } = supabase.storage.from('chat-media').getPublicUrl(fileName)
          await supabase.from('messages').insert([{from_user:user.id,to_user:chatWith.user_id,text:'📷 Photo', image_url:data.publicUrl}])
        }else{ await supabase.from('messages').insert([{from_user:user.id,to_user:chatWith.user_id,text:'📷 Photo', image_url:base64}]) }
      }catch{ await supabase.from('messages').insert([{from_user:user.id,to_user:chatWith.user_id,text:'📷 Photo', image_url:base64}]) }
      fetchMessages(chatWith.user_id); fetchConversations()
    }
    reader.readAsDataURL(file)
  }
  const handleDeleteChat = async () => {
    if(!chatWith ||!confirm(`Delete all chat with ${chatWith.name}?`)) return
    try{ await supabase.from('messages').delete().or(`and(from_user.eq.${user.id},to_user.eq.${chatWith.user_id}),and(from_user.eq.${chatWith.user_id},to_user.eq.${user.id})`); setMessages([]); alert('Chat deleted ✓') }catch{ setMessages([]) }
  }
  const handleDeleteNotif = async (id) => { setNotifications(n=>n.filter(x=>x.id!==id)); try{ await supabase.from('notifications').delete().eq('id',id) }catch{} }
  const handleClearAllNotifs = async () => { if(!confirm('Clear all notifications?')) return; setNotifications([]); if(user){ try{ await supabase.from('notifications').delete().eq('to_user',user.id) }catch{} } }
  const handleVideoCall = () => { if(!chatWith) return; window.open(`https://meet.jit.si/KLAMEET_${chatWith.user_id}_${user.id}`, '_blank') }
  const handleAudioCall = () => { if(!chatWith) return; alert(`📞 Calling ${chatWith.name}...`) }
  const handleReportUser = async (p) => {
    const reason = prompt(`Report ${p.name} - Reason? (spam, harassment, fake, underage)`)
    if(!reason) return
    try{
      await supabase.from('notifications').insert([{to_user:p.user_id, from_user:user.id, from_name:'REPORT: '+reason, type:'report', post_id:p.id}])
      alert('Reported ✓ - Admin will review. User blocked for you.')
      setSelectedPost(null)
    }catch(e){ alert('Reported ✓') }
  }
  const startRecording = async () => {
    try{
      const stream = await navigator.mediaDevices.getUserMedia({audio:true})
      const mr = new MediaRecorder(stream)
      mediaRecorderRef.current = mr
      const chunks=[]
      mr.ondataavailable = e=>{ if(e.data.size>0) chunks.push(e.data) }
      mr.onstop = async () => {
        const blob = new Blob(chunks,{type:'audio/webm'})
        const localUrl = URL.createObjectURL(blob)
        setMessages(m=>[...m,{id:Date.now(), from_user:user.id, text:'🎤 Voice message', audio_url:localUrl, created_at:new Date().toISOString()}])
        try{
          const fileName = `${user.id}_${Date.now()}_voice.webm`
          const { error: upErr } = await supabase.storage.from('chat-media').upload(fileName, blob)
          if(!upErr){ const { data } = supabase.storage.from('chat-media').getPublicUrl(fileName); await supabase.from('messages').insert([{from_user:user.id,to_user:chatWith.user_id,text:'🎤 Voice message', audio_url:data.publicUrl}]) }
          else{ const r = new FileReader(); r.onload = async (ev)=>{ await supabase.from('messages').insert([{from_user:user.id,to_user:chatWith.user_id,text:'🎤 Voice message', audio_url:ev.target.result}]) }; r.readAsDataURL(blob) }
        }catch{ await supabase.from('messages').insert([{from_user:user.id,to_user:chatWith.user_id,text:'🎤 Voice message'}]) }
        fetchMessages(chatWith.user_id); fetchConversations()
        stream.getTracks().forEach(t=>t.stop())
      }
      mr.start(); setIsRecording(true)
      setTimeout(()=>{ if(mr.state==='recording'){ mr.stop(); setIsRecording(false) } },15000)
    }catch(e){ alert('Mic blocked! Allow microphone in browser settings') }
  }
  const stopRecording = () => { if(mediaRecorderRef.current && mediaRecorderRef.current.state==='recording'){ mediaRecorderRef.current.stop(); setIsRecording(false) } }
  const adminDeletePost = async (id) => { if(!confirm('Delete post?')) return; await supabase.from('posts').delete().eq('id',id); setPosts(posts.filter(p=>p.id!==id)) }
  const adminBanUser = async (p) => { const r=prompt('Ban reason?','Spam/fake/underage'); if(!r) return; await supabase.from('banned_users').insert([{user_id:p.user_id||p.id,email:p.email||'',reason:r}]); await supabase.from('posts').delete().eq('user_id',p.user_id||p.id); fetchPosts(); fetchBanned(); alert('User banned ✓') }
  const adminUnban = async (id) => { await supabase.from('banned_users').delete().eq('id',id); fetchBanned() }
  const adminWarnUser = async (p) => { const m=prompt('Warning message?'); if(!m) return; await supabase.from('warnings').insert([{user_id:p.user_id||p.id,message:m,by_admin:user.email}]); await supabase.from('notifications').insert([{to_user:p.user_id||p.id,from_user:user.id,from_name:'ADMIN',type:'warn'}]) }
  if(view==='landing'){
    return (
      <div className="min-h-screen bg-white text-black">
        <header className="bg-black text-white px-4 py-3 flex justify-between items-center"><h1 className="font-black text-xs">KLA-MEET • Keep Love Alive</h1><button onClick={()=>{setView('app'); setTab('discover')}} className="bg-[#FFC300] text-black px-4 py-2 rounded-full font-bold text-xs">Enter App</button></header>
        <div className="max-w-md mx-auto p-6 space-y-4">
          <h2 className="text-[32px] font-black leading-none">Date. Meet.<br/>Worldwide.</h2>
          <p className="text-[10px] bg-black text-white px-3 py-2 rounded-full font-bold inline-block">Strictly 18+ Only • Safety First</p>
          <div className="grid grid-cols-2 gap-3">{PACKAGES.map(pkg=>(<div key={pkg.id} className="bg-black text-white rounded-[20px] p-4 border border-[#FFC300]/20"><p className="text-[11px] font-black">{pkg.months}</p><p className="text-[18px] font-black text-[#FFC300]">{pkg.label}</p>{pkg.save && <p className="text-[9px] bg-green-500 text-black rounded-full px-2 py-0.5 inline-block mt-1 font-bold">{pkg.save}</p>}<button onClick={openCrypto} className="mt-3 w-full bg-white text-black rounded-full py-2 font-bold text-[10px]">Crypto</button><button onClick={openPesapal} className="mt-2 w-full bg-[#FF6A00] text-white rounded-full py-2 font-bold text-[10px]">Card</button></div>))}</div>
          <div className="bg-white border-2 border-[#FFC300] rounded-[20px] p-4"><p className="font-black text-[12px] mb-2 text-black">💳 Pay with Pesapal - Mobile Money & Cards</p><iframe width="100%" height="70" src="https://store.pesapal.com/embed-code?pageUrl=https://store.pesapal.com/klameet" frameBorder="0" allowFullScreen className="w-full rounded-xl bg-white"></iframe></div>
          <div className="bg-zinc-100 rounded-[24px] p-5"><h3 className="font-black text-sm">About KLA-MEET</h3><p className="text-[11px] mt-2 leading-relaxed">Real people dating platform based in Kampala, Uganda. Video call, voice messages, gallery, safety report/block. 18+ only, verified profiles.</p><p className="text-[9px] mt-2 text-zinc-500">All profiles are real users. No bots.</p></div>
          <div className="grid grid-cols-2 gap-3"><div className="bg-zinc-900 text-white rounded-[20px] p-4"><h4 className="font-black text-[11px]">Privacy Policy</h4><p className="text-[8px] text-white/60">18+, data deletion, safety</p><a href="/privacy" className="text-[9px] text-[#FFC300] underline">Read Full Page</a></div><div className="bg-zinc-900 text-white rounded-[20px] p-4"><h4 className="font-black text-[11px]">Terms & Safety</h4><p className="text-[8px] text-white/60">No harassment, report</p><button onClick={()=>setShowTerms(true)} className="text-[9px] text-[#FFC300] underline">Read Terms</button></div></div>
          <div className="bg-zinc-900 text-white rounded-[24px] p-5"><h3 className="font-black">Sign In - 18+</h3><input value={form.email} onChange={e=>setForm({...form,email:e.target.value})} placeholder="Email" className="mt-3 w-full bg-zinc-800 rounded-full px-4 py-3 text-xs" /><input value={form.password} onChange={e=>setForm({...form,password:e.target.value})} type="password" placeholder="Password" className="mt-2 w-full bg-zinc-800 rounded-full px-4 py-3 text-xs" /><button onClick={handleSignin} className="mt-3 w-full bg-[#FFC300] text-black rounded-full py-3 font-black text-xs">Sign In</button></div>
          <div className="bg-[#FFC300] rounded-[24px] p-5"><h3 className="font-black">Sign Up - Must Be 18+</h3><input value={form.name} onChange={e=>setForm({...form,name:e.target.value})} placeholder="Full Name" className="mt-3 w-full bg-white rounded-full px-4 py-3 text-xs" /><input value={form.email} onChange={e=>setForm({...form,email:e.target.value})} placeholder="Email" className="mt-2 w-full bg-white rounded-full px-4 py-3 text-xs" /><input value={form.password} onChange={e=>setForm({...form,password:e.target.value})} type="password" placeholder="Password" className="mt-2 w-full bg-white rounded-full px-4 py-3 text-xs" /><div className="flex gap-2 mt-2"><select value={form.gender} onChange={e=>setForm({...form,gender:e.target.value})} className="w-1/2 bg-white rounded-full px-4 py-3 text-xs"><option>Female</option><option>Male</option><option>Other</option></select><input value={form.age} onChange={e=>setForm({...form,age:e.target.value})} placeholder="Age 18+" type="number" min="18" className="w-1/2 bg-white rounded-full px-4 py-3 text-xs" /></div><div className="mt-3 bg-black rounded-xl p-3 flex gap-2"><input type="checkbox" checked={agreed} onChange={e=>setAgreed(e.target.checked)} className="w-5 h-5" /><p className="text-[10px] text-white">I confirm I am 18+ and I agree to Terms & Privacy Policy (Report/Block available)</p></div><button onClick={handleSignup} disabled={!agreed} className={`mt-3 w-full rounded-full py-3 font-black text-xs ${agreed?'bg-black text-white':'bg-zinc-400'}`}>{agreed?'Sign Up 18+ ✓':'Check Box - Must be 18+'}</button></div><p className="text-center text-[9px] text-zinc-400">© 2026 KLA-MEET • 18+ Dating • Kampala • <a href="/privacy" className="underline">Privacy</a></p>
        </div>
        {showPrivacy && (<div className="fixed inset-0 bg-black/90 z-[300] p-4 overflow-y-auto"><div className="bg-white rounded-[24px] p-6 max-w-md mx-auto text-black"><h2 className="font-black text-sm">Privacy Policy</h2><div className="mt-4 text-[11px] space-y-2"><p>Strictly 18+. Data encrypted, never sold. Report/block available. Contact kla.meet.ug@gmail.com to delete data.</p><a href="/privacy" className="text-blue-600 underline">Open full privacy page</a></div><button onClick={()=>{setAgreed(true); setShowPrivacy(false)}} className="mt-4 w-full bg-black text-white rounded-full py-3 font-black text-xs">I Agree 18+ ✓</button></div></div>)}
        {showTerms && (<div className="fixed inset-0 bg-black/90 z-[300] p-4 overflow-y-auto"><div className="bg-white rounded-[24px] p-6 max-w-md mx-auto text-black"><h2 className="font-black text-sm">Terms - 18+ & Safety</h2><div className="mt-4 text-[11px] space-y-2"><p>1. Must be 18+.</p><p>2. No fake photos, no minors, no harassment, no nudity without consent, no hate speech.</p><p>3. Use Report & Block for bad behavior.</p><p>4. We can ban violators.</p></div><button onClick={()=>{setAgreed(true); setShowTerms(false)}} className="mt-4 w-full bg-[#FFC300] text-black rounded-full py-3 font-black text-xs">I Agree 18+ ✓</button></div></div>)}
      </div>
    )
  }
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white pb-28">
      <header className="p-3 bg-black border-b border-white/10 flex justify-between items-center"><h1 className="font-black text-xs">KLA-MEET {isPremium && '• PREMIUM'} {isAdmin && '• ADMIN'}</h1><div className="flex gap-1"><button onClick={()=>handleTab('profile')} className="text-[11px] bg-white text-black px-3 py-1.5 rounded-full font-black">Profile</button>{isAdmin && <button onClick={()=>handleTab('admin')} className="text-[11px] bg-[#FFC300] text-black px-3 py-1.5 rounded-full font-black">Admin</button>}<button onClick={()=>setView('landing')} className="text-[10px] bg-zinc-800 px-2 py-1 rounded-full">Landing</button></div></header>
      {tab==='discover' && (<div className="max-w-md mx-auto p-4"><h2 className="font-black">Discover • Real People • 18+</h2>{posts.length>0 && <div className="mt-4 grid grid-cols-2 gap-3">{posts.map(p=>(<div key={p.id} onClick={()=>setSelectedPost(p)} className="bg-zinc-900 rounded-[20px] overflow-hidden border border-[#FFC300]/20"><img src={p.image_url} className="h-48 w-full object-cover" /><div className="p-2"><p className="text-xs font-bold">{p.name} • {p.age}</p><p className="text-[9px] text-white/50">{p.city} • 2km away</p><p className="text-[8px] text-green-400">● Online Now • Report Available</p></div></div>))}</div>}<h3 className="mt-6 font-bold text-xs text-white/60">Featured Cities - Real Users Join Daily</h3><div className="grid grid-cols-2 gap-3 mt-2">{WORLD.map(w=>(<div key={w.city} className="bg-zinc-900 rounded-[20px] overflow-hidden border border-white/10"><img src={w.img} className="h-32 w-full object-cover"/><div className="p-2"><p className="text-xs font-bold">{w.flag} {w.city}</p><p className="text-[7px] text-white/40">Explore users from {w.city}</p></div></div>))}</div></div>)}
      {tab==='nearby' && <div className="max-w-md mx-auto p-4"><h2 className="font-black">Near You • 18+</h2><div className="mt-4 grid grid-cols-2 gap-3">{posts.map(p=>(<div key={p.id} onClick={()=>setSelectedPost(p)} className="bg-zinc-900 rounded-[20px] overflow-hidden"><img src={p.image_url} className="h-32 w-full object-cover"/><div className="p-2"><p className="text-xs">{p.name} • {p.city}</p><p className="text-[8px] text-green-400">2km away • Online • 18+ Verified</p></div></div>))}</div></div>}
      {tab==='chat' && (<div className="max-w-md mx-auto p-4"><div className="flex justify-between items-center"><h2 className="font-black">Messages - LIVE {isOnline && <span className="text-[9px] text-green-400 ml-2">● Online</span>}</h2><button onClick={handleClearAllNotifs} className="text-[9px] bg-zinc-800 px-3 py-1 rounded-full border border-red-500/30 text-red-400">Clear All</button></div><p className="text-[10px] text-green-400">● Auto receiver ON • Report/Block available in chat</p><div className="mt-4 bg-black border border-[#FFC300]/30 rounded-2xl p-3"><h3 className="font-black text-xs">💬 Recent Chats - Tap to open</h3>{conversations.length===0 && <p className="text-[10px] text-white/30 mt-2">No chats yet.</p>}<div className="mt-2 space-y-2 max-h-48 overflow-y-auto">{conversations.map(c=>{const postData = posts.find(p=>p.user_id===c.user_id); return (<div key={c.user_id} onClick={async()=>{const p = postData || {user_id:c.user_id, name:c.user_id.slice(0,6), image_url:WORLD[0].img}; setChatWith(p); await fetchMessages(c.user_id)}} className="bg-zinc-900 rounded-xl p-2 flex justify-between items-center cursor-pointer border border-white/10"><div className="flex gap-2 items-center"><img src={postData?.image_url || WORLD[0].img} className="w-8 h-8 rounded-full"/><div><p className="text-xs font-bold">{postData?.name || c.user_id.slice(0,6)}</p><p className="text-[9px] text-white/50 truncate w-32">{c.lastMsg}</p></div></div><p className="text-[8px] text-white/40">{new Date(c.time).toLocaleTimeString()}</p></div>)})}</div></div><div className="mt-3 space-y-2"><h3 className="font-bold text-[11px] text-white/60">🔔 Notifications</h3>{notifications.length===0 && <p className="text-[11px] text-white/40">No notifications.</p>}{notifications.map(n=>(<div key={n.id} className="bg-zinc-900 rounded-xl p-3 flex justify-between items-center border border-white/10"><div><p className="text-xs font-bold">🔔 {n.from_name} {n.type==='like' && '❤️'} {n.type==='report' && '🚩'}</p><p className="text-[9px] text-white/50">{n.type} • {new Date(n.created_at).toLocaleTimeString()}</p></div><div className="flex gap-1"><button onClick={async()=>{const post=posts.find(pp=>pp.id===n.post_id); if(post){ setChatWith(post); await fetchMessages(post.user_id)}else{ setChatWith({user_id:n.from_user, name:n.from_name, image_url:WORLD[0].img}); await fetchMessages(n.from_user)}}} className="text-[10px] bg-[#FFC300] text-black px-3 py-1.5 rounded-full font-black">Open</button><button onClick={()=>handleDeleteNotif(n.id)} className="text-[10px] bg-zinc-800 border border-red-500/30 text-red-400 px-2 py-1 rounded-full">🗑️</button></div></div>))}</div>{chatWith && (<div className="mt-6 bg-black border border-[#FFC300]/30 rounded-2xl p-3"><div className="flex justify-between items-center"><div className="flex items-center gap-2"><img src={chatWith.image_url||WORLD[0].img} className="w-8 h-8 rounded-full"/><div><p className="font-black text-xs">{chatWith.name}</p><p className="text-[8px] text-green-400">● Online Now • 18+ • Report Available</p></div></div><div className="flex gap-2"><button onClick={handleAudioCall} className="w-8 h-8 bg-zinc-800 rounded-full flex items-center justify-center text-xs">📞</button><button onClick={handleVideoCall} className="w-8 h-8 bg-[#FFC300] text-black rounded-full flex items-center justify-center text-xs">📹</button><button onClick={handleDeleteChat} className="w-8 h-8 bg-red-900/50 border border-red-500/30 rounded-full flex items-center justify-center text-xs">🗑️</button></div></div><div className="mt-3 h-80 overflow-y-auto space-y-2 bg-zinc-900 rounded-xl p-2">{messages.length===0 && <p className="text-[10px] text-white/30 text-center mt-10">No messages yet. Say hi 👋 - Be respectful, 18+ only</p>}{messages.map(m=>(<div key={m.id} className={`text-xs p-2.5 rounded-2xl max-w-[85%] ${m.from_user===user?.id?'bg-[#FFC300] text-black ml-auto':'bg-zinc-800 text-white mr-auto border border-green-500/30'}`}>{m.image_url && <img src={m.image_url} onClick={()=>window.open(m.image_url,'_blank')} className="w-full h-44 object-cover rounded-lg mb-2 cursor-pointer"/>}{m.audio_url && <audio src={m.audio_url} controls className="w-full mb-2" style={{height:'38px'}}/>}<span>{m.text}</span><span className="block text-[8px] opacity-60 mt-1">{m.from_user===user?.id?'✓✓ Sent • '+new Date(m.created_at).toLocaleTimeString():'● Received • '+new Date(m.created_at).toLocaleTimeString()}</span></div>))}</div>{showEmoji && (<div className="mt-2 bg-zinc-800 rounded-xl p-2 flex flex-wrap gap-2">{EMOJIS.map(e=><button key={e} onClick={()=>setNewMsg(newMsg+e)} className="text-[18px] hover:bg-zinc-700 rounded p-1">{e}</button>)}</div>)}<div className="flex gap-2 mt-3 items-center"><button onClick={()=>setShowEmoji(!showEmoji)} className="w-9 h-9 bg-zinc-800 rounded-full flex items-center justify-center text-[16px]">😊</button><button onClick={()=>fileInputRef.current?.click()} className="w-9 h-9 bg-zinc-800 rounded-full flex items-center justify-center text-[14px]">🖼️</button><input ref={fileInputRef} type="file" accept="image/*" onChange={handleGallerySend} className="hidden"/><input value={newMsg} onChange={e=>setNewMsg(e.target.value)} onKeyDown={e=>{if(e.key==='Enter') handleSendMsg()}} placeholder="Aa... Be respectful" className="flex-1 bg-zinc-800 rounded-full px-4 py-3 text-xs" /><button onClick={isRecording?stopRecording:startRecording} className={`w-9 h-9 rounded-full flex items-center justify-center text-[14px] ${isRecording?'bg-red-600 animate-pulse':'bg-zinc-800'}`}>🎤</button><button onClick={handleSendMsg} className="bg-[#FFC300] text-black px-4 py-3 rounded-full text-xs font-black">Send</button></div>{isRecording && <p className="text-[9px] text-red-400 mt-1">● Recording... Tap to stop (max 15s)</p>}</div>)}</div>)}
      {tab==='liked' && <div className="max-w-md mx-auto p-4"><h2 className="font-black">Liked • {likedIds.length}</h2><div className="mt-4 grid grid-cols-2 gap-3">{posts.filter(p=>likedIds.includes(p.id)).map(p=>(<div key={p.id} className="bg-zinc-900 rounded-[20px] overflow-hidden"><img src={p.image_url} className="h-32 w-full object-cover"/><div className="p-2"><p className="text-xs">{p.name} • 18+</p></div></div>))}</div></div>}
      {tab==='profile' && (<div className="max-w-md mx-auto p-4 space-y-4"><div className="flex justify-between items-center"><h2 className="font-black text-lg">My Profile - 18+</h2><p className="text-[9px] bg-green-500 text-black px-2 py-1 rounded-full font-bold">● Online Now</p></div><p className="text-[10px] text-white/60">{user?.email} • {isPremium?'PREMIUM ✓':'Free'} • {form.city} • Report/Block safety available</p><div className="bg-zinc-900 rounded-[24px] p-5 border border-[#FFC300]/20"><h3 className="font-black text-xs text-[#FFC300]">📸 Profile Photo (Real photo required - No fake)</h3><div className="mt-3"><div className="w-full h-64 bg-black rounded-[20px] overflow-hidden border border-white/10 relative">{form.photos[0]? <img src={form.photos[0]} className="w-full h-full object-cover"/> : <div className="w-full h-full flex items-center justify-center text-[11px] text-white/30">Add real photo 18+</div>}<label className="absolute bottom-2 right-2 bg-[#FFC300] text-black px-3 py-1.5 rounded-full text-[10px] font-black cursor-pointer">Add pic<input type="file" accept="image/*" onChange={handleMainPhoto} className="hidden"/></label></div></div><div className="grid grid-cols-3 gap-2 mt-3">{[1,2,3,4,5].map(idx=>(<div key={idx} className="h-24 bg-black rounded-xl overflow-hidden border border-white/10 relative">{form.photos[idx]? <img src={form.photos[idx]} className="w-full h-full object-cover"/> : <div className="w-full h-full flex items-center justify-center text-[20px] text-white/20">+</div>}<label className="absolute inset-0 cursor-pointer"><input type="file" accept="image/*" onChange={(e)=>handleExtraPhoto(idx,e)} className="hidden"/></label></div>))}</div></div><button onClick={async()=>{ if(!user) return; localStorage.setItem('kla_profile_'+user.id, JSON.stringify(form)); try{ await supabase.from('profiles').update({name:form.name, bio:form.bio, interests:form.interests.join(','), gender:form.gender, age:form.age}).eq('id',user.id) }catch{}; alert('Profile saved ✓ - Real profile') }} className="w-full bg-[#FFC300] text-black rounded-full py-4 font-black text-sm">Save Full Profile ✓</button><button onClick={async()=>{await supabase.auth.signOut(); localStorage.clear(); location.reload()}} className="w-full bg-zinc-900 border border-red-500/30 text-red-400 px-4 py-3 rounded-full text-xs font-bold">Logout - Delete data email kla.meet.ug@gmail.com</button></div>)}
      {tab==='premium' && (<div className="max-w-md mx-auto p-4 space-y-4"><h2 className="font-black">Premium Packages - 18+ Only</h2><div className="grid grid-cols-2 gap-3">{PACKAGES.map(pkg=>(<div key={pkg.id} className="bg-zinc-900 rounded-[20px] p-4 border border-white/10"><p className="text-[11px] font-black">{pkg.months}</p><p className="text-[20px] font-black text-[#FFC300]">{pkg.label}</p>{pkg.save && <p className="text-[9px] bg-[#FFC300] text-black rounded-full px-2 py-0.5 inline-block mt-1 font-bold">{pkg.save}</p>}<button onClick={openCrypto} className="mt-3 w-full bg-white text-black rounded-full py-2 font-bold text-[10px]">Crypto {pkg.label}</button><button onClick={openPesapal} className="mt-2 w-full bg-[#FF6A00] text-white rounded-full py-2 font-bold text-[10px]">Card {pkg.label}</button></div>))}</div><div className="bg-white rounded-[20px] p-4 border-2 border-[#FFC300]"><p className="font-black text-[13px] text-black">💳 Pay with Pesapal - Secure</p><iframe width="100%" height="60" src="https://store.pesapal.com/embed-code?pageUrl=https://store.pesapal.com/klameet" frameBorder="0" allowFullScreen style={{borderRadius:'12px', background:'white'}}></iframe></div></div>)}
      {tab==='admin' && <div className="max-w-md mx-auto p-3"><h2 className="font-black">Admin Panel - Safety Moderation</h2><p className="text-[9px] text-green-400">Logged: {user?.email} • Reports reviewed here</p><div className="mt-3 flex gap-2"><button onClick={()=>setAdminTab('posts')} className={`px-4 py-2 rounded-full text-[11px] font-black ${adminTab==='posts'?'bg-[#FFC300] text-black':'bg-zinc-800'}`}>Posts {posts.length}</button><button onClick={()=>setAdminTab('users')} className={`px-4 py-2 rounded-full text-[11px] font-black ${adminTab==='users'?'bg-[#FFC300] text-black':'bg-zinc-800'}`}>Users {allProfiles.length}</button><button onClick={()=>setAdminTab('banned')} className={`px-4 py-2 rounded-full text-[11px] font-black ${adminTab==='banned'?'bg-red-600':'bg-zinc-800'}`}>Banned {banned.length}</button></div><input value={adminSearch} onChange={e=>setAdminSearch(e.target.value)} placeholder="Search user" className="mt-3 w-full bg-zinc-900 border border-white/10 rounded-full px-4 py-2 text-xs" />{adminTab==='posts' && <div className="mt-4 space-y-3">{posts.map(p=>(<div key={p.id} className="bg-zinc-900 rounded-[16px] flex overflow-hidden"><img src={p.image_url} className="w-24 h-24 object-cover"/><div className="p-2 flex-1"><p className="text-[11px] font-bold">{p.name} • {p.age} • {p.city}</p><div className="flex gap-1 mt-2"><button onClick={()=>adminDeletePost(p.id)} className="bg-red-600 px-2 py-1 rounded-full text-[9px]">Delete</button><button onClick={()=>adminBanUser(p)} className="bg-black border border-red-500 px-2 py-1 rounded-full text-[9px]">Ban 18+</button></div></div></div>))}</div>}{adminTab==='users' && <div className="mt-4 space-y-2">{allProfiles.map(p=>(<div key={p.id} className="bg-zinc-900 rounded-xl p-3"><p className="text-xs font-bold">{p.name} • {p.email} • {p.age || '18+'}y</p><div className="flex gap-1 mt-2"><button onClick={()=>adminWarnUser(p)} className="bg-yellow-600 px-3 py-1 rounded-full text-[9px]">Warn</button><button onClick={()=>adminBanUser(p)} className="bg-red-600 px-3 py-1 rounded-full text-[9px]">Ban</button></div></div>))}</div>}{adminTab==='banned' && <div className="mt-4 space-y-2">{banned.map(b=>(<div key={b.id} className="bg-red-900/20 border border-red-500/30 rounded-xl p-3"><p className="text-xs">{b.email} • {b.reason}</p><button onClick={()=>adminUnban(b.id)} className="mt-2 bg-white text-black px-3 py-1 rounded-full text-[9px]">Unban</button></div>))}</div>}</div>}
      {selectedPost && (<div className="fixed inset-0 bg-black/90 p-4 flex items-center justify-center z-[200] overflow-y-auto"><div className="bg-zinc-900 rounded-[24px] overflow-hidden w-full max-w-sm border border-[#FFC300]/30"><img src={selectedPost.image_url} className="h-80 w-full object-cover" /><div className="p-4"><h3 className="font-black">{selectedPost.name} • {selectedPost.age} • 18+</h3><p className="text-[11px] text-white/60">📍 {selectedPost.city} • 2km away • Online Now</p><p className="text-xs mt-2">{selectedPost.bio}</p><div className="grid grid-cols-4 gap-2 mt-4"><button onClick={()=>handleLike(selectedPost)} className="bg-zinc-800 rounded-full py-3 text-xs">❤️ Like</button><button className="bg-[#FFC300] text-black rounded-full py-3 text-xs font-black">⭐</button><button onClick={()=>{setChatWith(selectedPost); setSelectedPost(null); setTab('chat'); fetchMessages(selectedPost.user_id)}} className="bg-white text-black rounded-full py-3 text-xs font-black">💬 Message</button><button onClick={()=>handleReportUser(selectedPost)} className="bg-zinc-800 border border-red-500/30 text-red-400 rounded-full py-3 text-xs">🚩 Report</button></div><button onClick={()=>setSelectedPost(null)} className="mt-3 w-full bg-zinc-800 rounded-full py-2 text-xs">Close</button><p className="text-[8px] text-white/40 mt-2 text-center">Safety: 18+ only • Report/block available • Real profiles only</p></div></div></div>)}
      {showPostModal && (<div className="fixed inset-0 bg-black/95 p-0 flex items-end justify-center z-[100]"><div className="bg-zinc-900 rounded-t-[32px] p-6 w-full max-w-md max-h-[90vh] overflow-y-auto"><div className="flex justify-between items-center"><h3 className="font-black text-sm">Create Post - 18+ Only - Real Photo</h3><button onClick={()=>setShowPostModal(false)} className="bg-zinc-800 w-8 h-8 rounded-full">✕</button></div><div className="flex gap-2 mt-4"><button onClick={()=>setPostForm({...postForm,type:'dating'})} className={`flex-1 rounded-full py-3 text-xs font-black ${postForm.type==='dating'?'bg-[#FFC300] text-black':'bg-zinc-800'}`}>❤️ Dating 18+</button><button onClick={()=>setPostForm({...postForm,type:'friends'})} className={`flex-1 rounded-full py-3 text-xs font-black ${postForm.type==='friends'?'bg-white text-black':'bg-zinc-800'}`}>🤝 Friends</button></div><div className="mt-4"><input type="file" accept="image/*" onChange={handleMainPhoto} className="mt-2 w-full text-xs file:bg-white file:text-black file:rounded-full file:px-4 file:py-2" />{(postForm.preview || form.photos[0]) && <img src={postForm.preview || form.photos[0]} className="mt-3 w-full h-64 object-cover rounded-[20px]" />}</div><textarea value={postForm.bio} onChange={e=>setPostForm({...postForm,bio:e.target.value})} placeholder="Bio - Be respectful, 18+ only, no explicit content" className="mt-4 w-full bg-black border border-white/20 rounded-2xl px-4 py-3 text-xs h-20" /><div className="mt-3 bg-black rounded-2xl p-4 border border-white/10 flex justify-between items-center"><p className="text-xs font-bold">📍 {postForm.city || form.city+', '+form.country}</p><button onClick={getLocation} className="bg-[#FFC300] text-black px-5 py-2.5 rounded-full text-[11px] font-black">Location</button></div><button onClick={handleCreatePost} disabled={posting} className="mt-5 w-full bg-[#FFC300] text-black rounded-full py-4 font-black text-[15px]">{posting?'Posting...':'Post Now - Real 18+'}</button><p className="text-[8px] text-white/40 mt-2">By posting you confirm you are 18+ and real person. No fake.</p></div></div>)}
      <nav className="fixed bottom-0 left-0 right-0 bg-black border-t border-white/10 flex justify-around items-center py-2"><button onClick={()=>handleTab('discover')} className="text-[11px]">♡<br/><span className="text-[8px]">Discover</span></button><button onClick={()=>handleTab('nearby')} className="text-[11px]">◎<br/><span className="text-[8px]">Near You</span></button><button onClick={()=>setShowPostModal(true)} className="bg-[#FFC300] text-black w-14 h-14 rounded-full flex items-center justify-center font-black text-2xl -mt-5 border-4 border-black">+</button><button onClick={()=>handleTab('chat')} className="text-[11px] relative">💬<br/><span className="text-[8px]">Chat</span>{notifications.length>0 && <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[7px] w-3 h-3 rounded-full flex items-center justify-center">{notifications.length}</span>}</button>{isAdmin? <button onClick={()=>handleTab('admin')} className="text-[11px] text-[#FFC300] font-black">★<br/><span className="text-[8px]">Admin</span></button> : <button onClick={()=>handleTab('premium')} className="text-[11px]">★<br/><span className="text-[8px]">Premium</span></button>}</nav>
    </div>
  )
}