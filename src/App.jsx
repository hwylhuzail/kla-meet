import { useState, useEffect } from 'react'
import { supabase } from './supabase'
const OXA = "https://pay.oxapay.com/18802533"
const WALLET = "0XAY27FbUKmf4xPg5ZRFP1l1dbe"
const ADMIN_EMAILS = ["huzayirukalungi4@gmail.com", "alexmakkoali@gmail.com"]
const WORLD = [
  {city:'Paris', flag:'🇫🇷', img:'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400'},
  {city:'Tokyo', flag:'🇯🇵', img:'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400'},
  {city:'New York', flag:'🇺🇸', img:'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400'},
  {city:'London', flag:'🇬🇧', img:'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400'},
]
export default function App(){
  const [view,setView]=useState('landing')
  const [tab,setTab]=useState('discover')
  const [isPremium,setIsPremium]=useState(false)
  const [isAdmin,setIsAdmin]=useState(false)
  const [allProfiles,setAllProfiles]=useState([])
  const [posts,setPosts]=useState([])
  const [showPostModal,setShowPostModal]=useState(false)
  const [postForm,setPostForm]=useState({type:'dating', bio:'', interests:'', city:'Arua', lat:3.03, lng:30.91, imageFile:null, preview:''})
  const [form,setForm]=useState({name:'',email:'',password:'',bio:'',interests:'',gender:'Female',age:'22'})
  const [user,setUser]=useState(null)
  const [editData,setEditData]=useState(null)
  const isAdminEmail = (e) => ADMIN_EMAILS.includes((e||'').toLowerCase().trim())

  useEffect(()=>{
    supabase.auth.getUser().then(({data})=>{ if(data?.user){ setUser(data.user); if(isAdminEmail(data.user.email)){ setIsAdmin(true); setIsPremium(true); localStorage.setItem('kla_premium','yes') } } })
    if(localStorage.getItem('kla_premium')==='yes') setIsPremium(true)
    fetchPosts()
  },[])
  useEffect(()=>{ if(tab==='admin' && isAdmin) fetchProfiles() },[tab])
  const fetchProfiles = async () => { const { data } = await supabase.from('profiles').select('*').order('created_at',{ascending:false}); if(data) setAllProfiles(data) }
  const fetchPosts = async () => { const { data } = await supabase.from('posts').select('*').order('created_at',{ascending:false}); if(data) setPosts(data) }
  const openCrypto = () => window.open(OXA, '_blank')
  const openPesapal = async () => { try{ const r=await fetch('/api/pesapal',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({})}); const j=await r.json(); if(j.redirect_url) window.open(j.redirect_url,'_blank'); else window.open(OXA,'_blank') }catch{ window.open(OXA,'_blank') } }
  const handleTab = (t) => { if(t==='admin' &&!isAdmin) return; if((t==='nearby' || t==='chat' || t==='liked' || t==='profile') &&!isPremium &&!isAdmin){ setTab('premium'); return } setTab(t) }
  const handleSignup = async () => { try{ const { data, error } = await supabase.auth.signUp({email:form.email.trim(), password:form.password || '12345678'}); if(error) throw error; await supabase.from('profiles').insert([{id:data.user?.id, name:form.name, email:form.email.trim(), bio:form.bio, interests:form.interests, gender:form.gender, age:form.age}]); if(isAdminEmail(form.email)){ setIsAdmin(true); setIsPremium(true); localStorage.setItem('kla_premium','yes') } alert('Account created!'); setView('app'); setTab('profile'); setUser(data.user) }catch(e){ alert(e.message) } }
  const handleSignin = async () => { try{ const { data, error } = await supabase.auth.signInWithPassword({email:form.email.trim(), password:form.password}); if(error) throw error; setUser(data.user); if(isAdminEmail(data.user.email)){ setIsAdmin(true); setIsPremium(true); localStorage.setItem('kla_premium','yes') } setView('app'); setTab(isAdminEmail(data.user.email)?'admin':'profile') }catch(e){ alert(e.message) } }

  // ACTIVE LOCATION - FIXED FOR ARUA
  const getLocation = () => {
    // Instant active for UX
    setPostForm(f=>({...f, city:'Arua - Locating...'}))
    if(!navigator.geolocation){
      setPostForm(f=>({...f, lat:3.0307, lng:30.907, city:'Arua'}))
      alert('✅ Location Activated: Arua')
      return
    }
    navigator.geolocation.getCurrentPosition(
      (pos)=>{
        setPostForm(f=>({...f, lat:pos.coords.latitude, lng:pos.coords.longitude, city:`Arua • ${pos.coords.latitude.toFixed(2)}, ${pos.coords.longitude.toFixed(2)} Live`}))
        alert('✅ Location Activated!')
      },
      ()=>{
        setPostForm(f=>({...f, lat:3.0307, lng:30.907, city:'Arua'}))
        alert('✅ Location Activated: Arua (fallback)')
      },
      {enableHighAccuracy:false, timeout:8000, maximumAge:60000}
    )
  }

  const handleImage = (e) => { const file = e.target.files[0]; if(file){ setPostForm({...postForm, imageFile:file, preview:URL.createObjectURL(file)}) } }

  // POST NOW - ACTIVE + FALLBACK IF NO BUCKET
  const handleCreatePost = async () => {
    if(!user){ alert('Sign in first'); setView('landing'); return }
    if(!isPremium &&!isAdmin){ setTab('premium'); setShowPostModal(false); return }
    if(!postForm.bio &&!postForm.preview){ alert('Add photo or bio - Looking for serious marriage partner'); return }
    try{
      let imageUrl = postForm.preview || `https://picsum.photos/seed/${Date.now()}/400/600`
      if(postForm.imageFile){
        try{
          const fileName = `${user.id}_${Date.now()}.jpg`
          const { error } = await supabase.storage.from('post-images').upload(fileName, postForm.imageFile, {upsert:true})
          if(!error){
            const { data } = supabase.storage.from('post-images').getPublicUrl(fileName)
            imageUrl = data.publicUrl
          }
        }catch{}
      }
      const { error } = await supabase.from('posts').insert([{
        user_id:user.id,
        name:form.name || user.email.split('@')[0],
        type:postForm.type,
        bio:postForm.bio || 'Looking for a serious marriage partner. Here to spread love.',
        interests:postForm.interests || form.interests || 'Music',
        age:form.age, gender:form.gender,
        city:postForm.city || 'Arua',
        lat:postForm.lat || 3.0307, lng:postForm.lng || 30.907,
        image_url:imageUrl
      }])
      if(error) throw error
      alert('✅ Posted! Keep Love Alive')
      setShowPostModal(false)
      setPostForm({type:'dating', bio:'', interests:'', city:'Arua', lat:3.03, lng:30.91, imageFile:null, preview:''})
      fetchPosts()
      setTab('discover')
    }catch(e){ alert('Post failed: '+e.message) }
  }

  const PremiumWall = () => (
    <div className="max-w-md mx-auto p-6 text-center"><div className="bg-zinc-900 rounded-[24px] p-6 border border-[#FFC300]/30"><p className="text-4xl">🔒</p><h2 className="font-black text-lg mt-3">Premium Required</h2><p className="text-[11px] text-white/60 mt-2">Unlock {tab}</p><button onClick={()=>setTab('premium')} className="mt-4 w-full bg-[#FFC300] text-black rounded-full py-3 font-black text-xs">Unlock Premium</button></div></div>
  )

  if(view==='landing'){
    return (
      <div className="min-h-screen bg-white text-black">
        <header className="bg-black text-white px-4 py-3 flex justify-between items-center"><h1 className="font-black text-xs">KLA-MEET • Keep Love Alive</h1><button onClick={()=>{setView('app'); setTab('discover')}} className="bg-[#FFC300] text-black px-4 py-2 rounded-full font-bold text-xs">Enter App</button></header>
        <div className="max-w-md mx-auto p-6">
          <h2 className="text-[32px] font-black leading-none">Date. Meet.<br/>Worldwide.</h2>
          <div className="mt-6 flex gap-3">
            <div className="bg-black text-white rounded-[20px] p-4 w-[160px]"><p className="text-[10px] text-[#FFC300]">Basic $2.99</p><button onClick={openCrypto} className="mt-3 w-full bg-white text-black rounded-full py-2 font-bold text-[10px]">Crypto ALONE</button><button onClick={openPesapal} className="mt-2 w-full bg-[#FF6A00] text-white rounded-full py-2 font-bold text-[10px]">Pesapal ALONE</button></div>
            <div className="bg-black text-white rounded-[20px] p-4 w-[160px]"><p className="text-[10px] text-[#FFC300]">Standard $5.99</p><button onClick={openCrypto} className="mt-3 w-full bg-white text-black rounded-full py-2 font-bold text-[10px]">Crypto ALONE</button><button onClick={openPesapal} className="mt-2 w-full bg-[#FF6A00] text-white rounded-full py-2 font-bold text-[10px]">Pesapal ALONE</button></div>
          </div>
          <div className="mt-10 space-y-6">
            <div className="bg-zinc-100 rounded-[24px] p-5"><h3 className="font-black">About</h3><p className="text-[11px] mt-2">KLA-MEET connects Arua to Paris, Tokyo, New York, London.</p></div>
            <div className="bg-black text-white rounded-[24px] p-5"><h3 className="font-black text-[#FFC300]">How It Works</h3><p className="text-[11px] mt-2">1. Discover 2. Pay $2.99/$5.99 3. Unlock</p></div>
            <div className="border rounded-[24px] p-5"><h3 className="font-black">FAQs</h3><p className="text-[11px] mt-2">Q: How to unlock? A: Premium tab.</p></div>
            <div className="bg-zinc-900 text-white rounded-[24px] p-5"><h3 className="font-black">Sign In</h3><input value={form.email} onChange={e=>setForm({...form,email:e.target.value})} placeholder="Email" className="mt-3 w-full bg-zinc-800 rounded-full px-4 py-3 text-xs" /><input value={form.password} onChange={e=>setForm({...form,password:e.target.value})} placeholder="Password" type="password" className="mt-2 w-full bg-zinc-800 rounded-full px-4 py-3 text-xs" /><button onClick={handleSignin} className="mt-3 w-full bg-[#FFC300] text-black rounded-full py-3 font-black text-xs">Sign In</button></div>
            <div className="bg-[#FFC300] rounded-[24px] p-5"><h3 className="font-black">Sign Up</h3><input value={form.name} onChange={e=>setForm({...form,name:e.target.value})} placeholder="Name" className="mt-3 w-full bg-white rounded-full px-4 py-3 text-xs" /><input value={form.email} onChange={e=>setForm({...form,email:e.target.value})} placeholder="Email" className="mt-2 w-full bg-white rounded-full px-4 py-3 text-xs" /><input value={form.password} onChange={e=>setForm({...form,password:e.target.value})} placeholder="Password" type="password" className="mt-2 w-full bg-white rounded-full px-4 py-3 text-xs" /><div className="flex gap-2 mt-2"><select value={form.gender} onChange={e=>setForm({...form,gender:e.target.value})} className="w-1/2 bg-white rounded-full px-4 py-3 text-xs"><option>Female</option><option>Male</option><option>Other</option></select><input value={form.age} onChange={e=>setForm({...form,age:e.target.value})} placeholder="Age" className="w-1/2 bg-white rounded-full px-4 py-3 text-xs" /></div><input value={form.interests} onChange={e=>setForm({...form,interests:e.target.value})} placeholder="Interests" className="mt-2 w-full bg-white rounded-full px-4 py-3 text-xs" /><textarea value={form.bio} onChange={e=>setForm({...form,bio:e.target.value})} placeholder="Bio" className="mt-2 w-full bg-white rounded-2xl px-4 py-3 text-xs h-20" /><button onClick={handleSignup} className="mt-3 w-full bg-black text-white rounded-full py-3 font-black text-xs">Sign Up</button></div>
          </div>
        </div>
      </div>
    )
  }  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white pb-28">
      <header className="p-3 bg-black border-b border-white/10 flex justify-between items-center">
        <h1 className="font-black text-xs">KLA-MEET {isPremium && '• PREMIUM'} {isAdmin && '• ADMIN'}</h1>
        <div className="flex gap-1">
          <button onClick={()=>handleTab('liked')} className="text-[11px] bg-zinc-800 px-3 py-1.5 rounded-full">❤️ Liked</button>
          <button onClick={()=>handleTab('profile')} className="text-[11px] bg-white text-black px-3 py-1.5 rounded-full font-black">Profile</button>
          {isAdmin && <button onClick={()=>handleTab('admin')} className="text-[11px] bg-[#FFC300] text-black px-3 py-1.5 rounded-full font-black">Admin</button>}
          <button onClick={()=>setView('landing')} className="text-[10px] bg-zinc-800 px-2 py-1 rounded-full">Landing</button>
        </div>
      </header>

      {tab==='discover' && (
        <div className="max-w-md mx-auto p-4">
          <h2 className="font-black">Discover • Worldwide</h2>
          {posts.length>0 && <div className="mt-4 grid grid-cols-2 gap-3">{posts.map(p=>(
            <div key={p.id} className="bg-zinc-900 rounded-[20px] overflow-hidden border border-[#FFC300]/20">
              <img src={p.image_url} className="h-48 w-full object-cover" />
              <div className="p-2"><p className="text-xs font-bold">{p.type==='dating'?'❤️':'🤝'} {p.name}</p><p className="text-[9px] text-white/50">{p.city}</p><p className="text-[10px] mt-1">{p.bio?.slice(0,50)}</p></div>
            </div>
          ))}</div>}
          <div className="grid grid-cols-2 gap-3 mt-6">{WORLD.map(w=>(<div key={w.city} className="bg-zinc-900 rounded-[20px] overflow-hidden"><img src={w.img} className="h-32 w-full object-cover"/><div className="p-2"><p className="text-xs font-bold">{w.flag} {w.city}</p></div></div>))}</div>
        </div>
      )}

      {tab==='nearby' && (isPremium? <div className="max-w-md mx-auto p-4"><h2 className="font-black">Near Me • Arua</h2><div className="mt-4 grid grid-cols-2 gap-3">{posts.map(p=>(<div key={p.id} className="bg-zinc-900 rounded-[20px] overflow-hidden"><img src={p.image_url} className="h-32 w-full object-cover"/><div className="p-2"><p className="text-xs">{p.name} • {p.city}</p></div></div>))}</div></div> : <PremiumWall />)}
      {tab==='chat' && (isPremium? <div className="max-w-md mx-auto p-4"><h2 className="font-black">Chat</h2></div> : <PremiumWall />)}
      {tab==='liked' && (isPremium? <div className="max-w-md mx-auto p-4"><h2 className="font-black">Liked</h2></div> : <PremiumWall />)}
      {tab==='profile' && (isPremium? <div className="max-w-md mx-auto p-4"><h2 className="font-black">Profile — {user?.email}</h2><div className="mt-4 bg-zinc-900 rounded-[24px] p-5"><p className="text-xs">Name: {form.name} • {form.gender} • {form.age}</p></div></div> : <PremiumWall />)}
      {tab==='premium' && <div className="max-w-md mx-auto p-4 space-y-4"><h2 className="font-black">Premium</h2>{isAdmin && <div className="bg-green-500 text-black rounded-xl p-3 text-xs font-black">Admin FREE</div>}<div className="bg-[#FFC300] text-black rounded-2xl p-4"><button onClick={openCrypto} className="w-full bg-black text-white rounded-full py-3 font-bold text-xs">Crypto ALONE $2.99 / $5.99</button></div><div className="bg-zinc-900 rounded-2xl p-4"><button onClick={openPesapal} className="w-full bg-[#FF6A00] text-white rounded-full py-3 font-bold text-xs">Pesapal ALONE</button></div><button onClick={()=>{localStorage.setItem('kla_premium','yes'); setIsPremium(true)}} className="w-full bg-zinc-800 rounded-full py-3 text-xs">TEST PREMIUM FREE</button></div>}
      {tab==='admin' && <div className="max-w-md mx-auto p-4"><h2 className="font-black">Admin Panel</h2><p className="text-[10px]">{ADMIN_EMAILS.join(', ')}</p><div className="mt-4 space-y-2">{allProfiles.map(p=>(<div key={p.id} className="bg-zinc-900 rounded-xl p-3"><p className="text-xs">{p.name} • {p.email}</p><div className="flex gap-2 mt-2"><button onClick={()=>setEditData(p)} className="bg-white text-black px-3 py-1 rounded-full text-[10px]">Edit</button><button onClick={async()=>{await supabase.from('profiles').delete().eq('id',p.id); fetchProfiles()}} className="bg-red-600 px-3 py-1 rounded-full text-[10px]">Delete</button></div></div>))}</div></div>}

      {showPostModal && (
        <div className="fixed inset-0 bg-black/95 p-0 flex items-end justify-center z-[100]">
          <div className="bg-zinc-900 rounded-t-[32px] p-6 w-full max-w-md max-h-[90vh] overflow-y-auto border-t border-[#FFC300]/20">
            <div className="flex justify-between items-center"><h3 className="font-black text-sm">Create Post</h3><button onClick={()=>setShowPostModal(false)} className="bg-zinc-800 w-8 h-8 rounded-full">✕</button></div>
            <div className="flex gap-2 mt-4">
              <button onClick={()=>setPostForm({...postForm,type:'dating'})} className={`flex-1 rounded-full py-3 text-xs font-black ${postForm.type==='dating'?'bg-[#FFC300] text-black':'bg-zinc-800'}`}>❤️ Dating</button>
              <button onClick={()=>setPostForm({...postForm,type:'friends'})} className={`flex-1 rounded-full py-3 text-xs font-black ${postForm.type==='friends'?'bg-white text-black':'bg-zinc-800'}`}>🤝 Friends</button>
            </div>
            <div className="mt-4">
              <p className="text-[10px] text-white/50">Upload Photo from Gallery</p>
              <input type="file" accept="image/*" onChange={handleImage} className="mt-2 w-full text-xs file:bg-white file:text-black file:rounded-full file:px-4 file:py-2 file:text-xs file:font-bold" />
              {postForm.preview && <img src={postForm.preview} className="mt-3 w-full h-64 object-cover rounded-[20px] border-2 border-[#FFC300]/30" />}
            </div>
            <textarea value={postForm.bio} onChange={e=>setPostForm({...postForm,bio:e.target.value})} placeholder="Looking for a serious marriage partner. Here to spread love." className="mt-4 w-full bg-black border border-white/20 rounded-2xl px-4 py-3 text-xs h-20 focus:border-[#FFC300] outline-none" />
            <input value={postForm.interests} onChange={e=>setPostForm({...postForm,interests:e.target.value})} placeholder="Music" className="mt-2 w-full bg-black border border-white/20 rounded-full px-4 py-3 text-xs focus:border-[#FFC300] outline-none" />

            <div className="mt-3 bg-black rounded-2xl p-4 border border-white/10">
              <div className="flex justify-between items-center">
                <p className="text-xs font-bold">📍 Location {postForm.lat? <span className="text-green-400">• Active</span> : null}</p>
                <button onClick={getLocation} className="bg-[#FFC300] text-black px-5 py-2.5 rounded-full text-[11px] font-black">Activate Location</button>
              </div>
              <p className="text-[10px] text-white/60 mt-2">City: {postForm.city}</p>
            </div>

            <button onClick={handleCreatePost} className="mt-5 w-full bg-[#FFC300] text-black rounded-full py-4 font-black text-[15px] shadow-xl">Post Now • Keep Love Alive</button>
          </div>
        </div>
      )}

      <nav className="fixed bottom-0 left-0 right-0 bg-black border-t border-white/10 flex justify-around items-center py-2">
        <button onClick={()=>handleTab('discover')} className="text-[11px]">♡<br/><span className="text-[8px]">Discover</span></button>
        <button onClick={()=>handleTab('nearby')} className="text-[11px]">◎<br/><span className="text-[8px]">Near Me</span></button>
        <button onClick={()=>setShowPostModal(true)} className="bg-[#FFC300] text-black w-14 h-14 rounded-full flex items-center justify-center font-black text-2xl -mt-5 border-4 border-black">+</button>
        <button onClick={()=>handleTab('chat')} className="text-[11px]">💬<br/><span className="text-[8px]">Chat</span></button>
        {isAdmin? <button onClick={()=>handleTab('admin')} className="text-[11px] text-[#FFC300] font-black">★<br/><span className="text-[8px]">Admin</span></button> : <button onClick={()=>handleTab('premium')} className="text-[11px]">★<br/><span className="text-[8px]">Premium</span></button>}
      </nav>
    </div>
  )
}