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
import AdminPanel from './components/admin/AdminPanel'

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
  const [allProfiles,setAllProfiles]=useState([])
  const [banned,setBanned]=useState([])
  const [adminTab,setAdminTab]=useState('posts')
  const [adminSearch,setAdminSearch]=useState('')
  const [user,setUser]=useState(null)
  const [userLoc,setUserLoc]=useState(null)
  const [form,setForm]=useState({name:'',email:'',password:'',bio:'',age:'22',city:'Kampala',photos:['']})
  const [agreed,setAgreed]=useState(false)
  const [chatWith,setChatWith]=useState(null)
  const [messages,setMessages]=useState([])
  const [newMsg,setNewMsg]=useState('')
  const [notifications,setNotifications]=useState([])
  const [showPost,setShowPost]=useState(false)
  const [newPost,setNewPost]=useState({name:'',city:'Kampala',image_url:'',bio:'',useLocation:true,uploading:false})

  useEffect(()=>{
    if(navigator.geolocation){
      navigator.geolocation.getCurrentPosition(
        p=>setUserLoc({lat:p.coords.latitude,lng:p.coords.longitude}),
        ()=>setUserLoc({lat:0.3476,lng:32.5825})
      )
    }
    supabase.auth.getSession().then(({data})=>{
      if(data?.session?.user){
        const u=data.session.user; setUser(u); setView('app')
        if(ADMIN_EMAILS.includes(u.email?.toLowerCase().trim())){ setIsAdmin(true); setIsPremium(true) }
        supabase.from('profiles').select('*').eq('id',u.id).single().then(({data:p})=>{ if(p) setForm(f=>({...f,...p})) })
      }
      setLoading(false)
    })
    const loadAll = async () => {
      const {data:postData} = await supabase.from('posts').select('*').order('created_at',{ascending:false})
      const {data:profileData} = await supabase.from('profiles').select('*').order('created_at',{ascending:false})
      const {data:bannedData} = await supabase.from('banned_users').select('*').order('created_at',{ascending:false}).limit(100)
      if(profileData) setAllProfiles(profileData)
      if(bannedData) setBanned(bannedData)
      let combined = [...(postData||[])]
      if(profileData){
        profileData.forEach(pro=>{
          if(pro.image_url || pro.avatar_url){
            if(!combined.find(p=>p.user_id===pro.id)){
              combined.push({
                id:'profile-'+pro.id,
                user_id:pro.id,
                name:pro.name||pro.email?.split('@')[0],
                city:pro.city||'Kampala',
                image_url:pro.image_url||pro.avatar_url,
                bio:pro.bio||'Friendship',
                age:pro.age||22,
                lat:pro.lat||null,
                lng:pro.lng||null,
                created_at:pro.created_at,
                email:pro.email
              })
            }
          }
        })
      }
      setPosts(combined)
    }
    loadAll()
  },[])

  const handleTab = (t) => { if(t==='admin' &&!isAdmin) return; setTab(t) }

  const handleSignup = async () => {
    if(!agreed) return alert('Confirm 18+')
    const { data, error } = await supabase.auth.signUp({email:form.email.trim(), password:form.password || '12345678'})
    if(error) return alert(error.message)
    const u=data.user || data.session?.user
    setUser(u);
    if(ADMIN_EMAILS.includes(form.email.toLowerCase().trim())){ setIsAdmin(true); setIsPremium(true) }
    await supabase.from('profiles').upsert({ id:u.id, email:form.email.trim(), name:form.name, city:form.city, age:parseInt(form.age||22), bio:form.bio, lat:userLoc?.lat||null, lng:userLoc?.lng||null, created_at:new Date().toISOString() })
    setView('app'); setTab('profile')
  }
  const handleSignin = async () => {
    const { data, error } = await supabase.auth.signInWithPassword({email:form.email.trim(), password:form.password})
    if(error) return alert(error.message)
    setUser(data.user);
    if(ADMIN_EMAILS.includes(data.user.email?.toLowerCase().trim())){ setIsAdmin(true); setIsPremium(true) }
    setView('app'); setTab('discover')
  }

  const onDeletePost = async (id) => {
    if(!confirm('Delete this photo/post?')) return
    const realId = id.startsWith('profile-')? null : id
    if(realId) await supabase.from('posts').delete().eq('id', realId)
    setPosts(p=>p.filter(x=>x.id!==id))
  }
  const onBan = async (p) => {
    const reason = prompt('Ban reason?','spam.su link / guideline violation')
    if(!reason) return
    await supabase.from('banned_users').insert([{email:p.email||p.name, reason, user_id:p.user_id||p.id}])
    await supabase.from('posts').delete().eq('user_id', p.user_id)
    await supabase.from('profiles').delete().eq('id', p.user_id)
    setPosts(x=>x.filter(i=>i.user_id!==p.user_id))
    setAllProfiles(x=>x.filter(i=>i.id!==p.user_id))
    alert('User banned and removed')
  }
  const onUnban = async (id) => {
    await supabase.from('banned_users').delete().eq('id', id)
    setBanned(b=>b.filter(x=>x.id!==id))
  }
  const onDeleteProfile = async (p) => {
    if(!confirm(`Delete user ${p.email} forever?`)) return
    await supabase.from('posts').delete().eq('user_id', p.id)
    await supabase.from('profiles').delete().eq('id', p.id)
    setAllProfiles(a=>a.filter(x=>x.id!==p.id))
    setPosts(a=>a.filter(x=>x.user_id!==p.id))
  }
  const onWarn = (p) => alert(`Warn ${p.email||p.name}: Please follow Guidelines - no links, no sexual content`)
  const onClearChats = (p) => alert(`Clear chats for ${p.email||p.name} - add messages table delete if you have it`)

  const onSelect = (post) => { setChatWith(post); setTab('chat'); setNotifications(prev=>[...prev,{id:Date.now(), from_name:post.name, type:'liked your profile', post_id:post.id}]) }
  const onFetchMessages = async (uid) => { setMessages([{id:1,text:'Hi! 👋 Nice to meet you. Friendship only 😊', from:uid}]) }
  const onSend = () => { if(!newMsg.trim()) return; setMessages([...messages,{id:Date.now(), text:newMsg, from:'me'}]); setNewMsg('') }

  const handleGalleryUpload = async (e) => {
    const file=e.target.files[0]; if(!file) return
    if(file.size>5*1024*1024) return alert('Max 5MB')
    setNewPost(s=>({...s,uploading:true}))
    try{
      const fileName=`${user.id}/${Date.now()}_${file.name.replace(/\s/g,'_')}`
      const { error } = await supabase.storage.from('post-images').upload(fileName,file,{upsert:true})
      if(error) throw error
      const { data } = supabase.storage.from('post-images').getPublicUrl(fileName)
      setNewPost(s=>({...s,image_url:data.publicUrl, uploading:false}))
    }catch(err){ alert(err.message); setNewPost(s=>({...s,uploading:false})) }
  }
  const createPost = async () => {
    if(!newPost.name ||!newPost.image_url) return alert('Name + Photo required')
    let lat=null,lng=null
    if(newPost.useLocation && userLoc){ lat=userLoc.lat; lng=userLoc.lng }
    const { data, error } = await supabase.from('posts').insert([{ name:newPost.name, city:newPost.city, image_url:newPost.image_url, bio:newPost.bio, user_id:user?.id, age:parseInt(form.age||22), lat, lng }]).select()
    if(error) return alert(error.message)
    await supabase.from('profiles').upsert({id:user.id, image_url:newPost.image_url, lat, lng, city:newPost.city, updated_at:new Date().toISOString()},{onConflict:'id'})
    setPosts([data[0],...posts]); setShowPost(false); setNewPost({name:'',city:'Kampala',image_url:'',bio:'',useLocation:true,uploading:false})
  }
  const handleDeleteAccount = async () => {
    if(!confirm('Delete ALL your posts + profile forever?')) return
    await supabase.from('posts').delete().eq('user_id', user.id)
    await supabase.from('profiles').delete().eq('id', user.id)
    await supabase.auth.signOut(); localStorage.clear(); window.location.href='/'
  }
  const onCrypto = () => {
    const email = encodeURIComponent(user?.email || form.email || '')
    window.open(`https://nowpayments.io/payment/?iid=4727316829&email=${email}`,'_blank','noopener,noreferrer')
  }
  const onPesapal = () => {
    const email = user?.email || form.email || ''
    window.open('https://www.pesapal.com/','_blank','noopener,noreferrer');
    alert(`Pesapal LIVE: MTN/Airtel UGX 10k. Email: ${email}. After payment send screenshot to kla.meet.ug@gmail.com — admin activates in 5 mins`)
  }

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
        <About /><HowItWorks /><Safety /><Pricing onCrypto={onCrypto} onPesapal={onPesapal} /><Faqs />
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
      <header className="p-3 bg-black flex justify-between"><h1 className="font-black text-xs">KLA-MEET {isAdmin && '• ADMIN'} {userLoc&&'• 📍'}</h1><button onClick={async()=>{await supabase.auth.signOut(); setView('landing')}} className="text-[11px] bg-white text-black px-3 py-1.5 rounded-full">Logout</button></header>
      {tab==='discover' && <DiscoverTab posts={posts} onSelect={onSelect} isAdmin={isAdmin} isPremium={isPremium||isAdmin} userLocation={userLoc} />}
      {tab==='chat' && <ChatTab notifications={notifications} chatWith={chatWith} messages={messages} newMsg={newMsg} setNewMsg={setNewMsg} onSend={onSend} onFetchMessages={onFetchMessages} setChatWith={setChatWith} posts={posts} isPremium={isPremium||isAdmin} />}
      {tab==='nearby' && <NearbyTab posts={posts} onSelect={onSelect} isPremium={isPremium||isAdmin} userLocation={userLoc} />}
      {tab==='premium' && <PremiumTab isAdmin={isAdmin} onCrypto={onCrypto} onPesapal={onPesapal} />}
      {tab==='profile' && <ProfileTab user={user} isAdmin={isAdmin} form={form} setForm={setForm} onDelete={handleDeleteAccount} />}
      {tab==='admin' && isAdmin && <AdminPanel posts={posts} allProfiles={allProfiles} banned={banned} adminTab={adminTab} setAdminTab={setAdminTab} adminSearch={adminSearch} setAdminSearch={setAdminSearch} onDeletePost={onDeletePost} onBan={onBan} onWarn={onWarn} onDeleteProfile={onDeleteProfile} onClearChats={onClearChats} onUnban={onUnban} adminEmails={ADMIN_EMAILS} user={user} />}

      {showPost && (
        <div className="fixed inset-0 bg-black/80 z-[100] flex items-center justify-center p-4">
          <div className="bg-zinc-900 rounded-[24px] p-5 w-full max-w-sm max-h-[92vh] overflow-y-auto">
            <h3 className="font-black text-white">+ Post to Discover</h3>
            <input value={newPost.name} onChange={e=>setNewPost({...newPost,name:e.target.value})} placeholder="Your display name" className="mt-3 w-full bg-black rounded-full px-4 py-3 text-xs text-white" />
            <input value={newPost.city} onChange={e=>setNewPost({...newPost,city:e.target.value})} placeholder="City: Kampala" className="mt-2 w-full bg-black rounded-full px-4 py-3 text-xs text-white" />
            <div className="mt-3 bg-black rounded-[16px] p-3">
              <p className="text-[10px] font-bold text-white">Photo • Gallery Upload + URL</p>
              <label className="mt-2 block w-full bg-zinc-800 text-white rounded-full py-2.5 text-center text-xs font-bold cursor-pointer">
                {newPost.uploading?'Uploading...':'📸 Choose from Gallery'}
                <input type="file" accept="image/*" onChange={handleGalleryUpload} className="hidden" />
              </label>
              <input value={newPost.image_url} onChange={e=>setNewPost({...newPost,image_url:e.target.value})} placeholder="Photo URL https://..." className="mt-2 w-full bg-zinc-800 rounded-full px-4 py-3 text-xs text-white" />
              {newPost.image_url && <img src={newPost.image_url} className="mt-2 w-full h-36 object-cover rounded-xl bg-zinc-800" />}
            </div>
            <textarea value={newPost.bio} onChange={e=>setNewPost({...newPost,bio:e.target.value})} placeholder="Bio: football, music, friendship..." className="mt-2 w-full bg-black rounded-xl px-4 py-3 text-xs text-white h-20" />
            <label className="mt-3 flex items-center gap-2 bg-[#FFC300]/10 border border-[#FFC300]/20 rounded-full px-3 py-2">
              <input type="checkbox" checked={newPost.useLocation} onChange={e=>setNewPost({...newPost,useLocation:e.target.checked})} />
              <span className="text-[10px] text-white">Use my true location for Nearby • 📍 {userLoc?`${userLoc.lat.toFixed(2)},${userLoc.lng.toFixed(2)}`:'locating...'}</span>
            </label>
            <div className="flex gap-2 mt-3">
              <button onClick={()=>setShowPost(false)} className="flex-1 bg-zinc-800 text-white rounded-full py-3 text-xs font-bold">Cancel</button>
              <button onClick={createPost} disabled={newPost.uploading} className="flex-1 bg-[#FFC300] text-black rounded-full py-3 text-xs font-black">{newPost.uploading?'Wait...':'Post Now'}</button>
            </div>
          </div>
        </div>
      )}
      <nav className="fixed bottom-0 left-0 right-0 bg-black border-t border-white/10 flex justify-around items-center py-2 z-50">
        <button onClick={()=>handleTab('discover')} className={`text-[10px] flex flex-col items-center ${tab==='discover'?'text-[#FFC300]':'text-white/60'}`}>♡<span>Discover</span></button>
        <button onClick={()=>handleTab('nearby')} className={`text-[10px] flex flex-col items-center ${tab==='nearby'?'text-[#FFC300]':'text-white/60'}`}>📍<span>Nearby</span></button>
        <button onClick={()=>setShowPost(true)} className="bg-[#FFC300] w-14 h-14 rounded-full flex items-center justify-center text-black font-black text-2xl -mt-6 border-4 border-[#0a0a0a] shadow-lg">+</button>
        <button onClick={()=>handleTab('chat')} className={`text-[10px] flex flex-col items-center ${tab==='chat'?'text-[#FFC300]':'text-white/60'}`}>💬<span>Chat</span></button>
        {isAdmin && <button onClick={()=>handleTab('admin')} className={`text-[10px] flex flex-col items-center ${tab==='admin'?'text-red-500':'text-white/60'}`}>🛡️<span>ADMIN</span></button>}
        <button onClick={()=>handleTab('profile')} className={`text-[10px] flex flex-col items-center ${tab==='profile'?'text-[#FFC300]':'text-white/60'}`}>👤<span>Me</span></button>
      </nav>
    </div>
  )
}