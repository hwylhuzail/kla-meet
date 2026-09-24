import { useState, useEffect } from 'react'
import { supabase } from './supabase'
import About from './components/landing/About'
import HowItWorks from './components/landing/HowItWorks'
import Safety from './components/landing/Safety'
import Faqs from './components/landing/Faqs'
import Pricing from './components/landing/Pricing'
import PrivacyModal from './components/modals/PrivacyModal'
import TermsModal from './components/modals/TermsModal'
import PostModal from './components/modals/PostModal'
import PersonModal from './components/modals/PersonModal'
import Discover from './components/tabs/Discover'
import Nearby from './components/tabs/Nearby'
import Chat from './components/tabs/Chat'
import Liked from './components/tabs/Liked'
import Profile from './components/tabs/Profile'
import Premium from './components/tabs/Premium'
import AdminPanel from './components/admin/AdminPanel'

const OXA = "https://pay.oxapay.com/18802533"
const ADMIN_EMAILS = ["huzayirukalungi4@gmail.com", "alexmakkoali@gmail.com"]

export const WORLD = [
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
  const [posting,setPosting]=useState(false)
  const [postForm,setPostForm]=useState({type:'dating', bio:'', interests:'', city:'Arua', lat:3.0307, lng:30.907, preview:''})
  const [form,setForm]=useState({name:'',email:'',password:'',bio:'',interests:'',gender:'Female',age:'22'})
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

  const isAdminEmail = (e) => ADMIN_EMAILS.includes((e||'').toLowerCase().trim())

  useEffect(()=>{
    supabase.auth.getUser().then(({data})=>{
      if(data?.user){
        setUser(data.user)
        if(isAdminEmail(data.user.email)){ setIsAdmin(true); setIsPremium(true); localStorage.setItem('kla_premium','yes'); localStorage.setItem('kla_email',data.user.email.toLowerCase()) }
        else { setIsAdmin(false); const saved=localStorage.getItem('kla_email'); if(localStorage.getItem('kla_premium')==='yes' && saved===data.user.email.toLowerCase()) setIsPremium(true) }
      }
    })
    fetchPosts()
  },[])
  useEffect(()=>{ if(user){ fetchLikes(); fetchNotifs(); const i=setInterval(fetchNotifs,5000); return ()=>clearInterval(i) } },[user])
  useEffect(()=>{ if(tab==='admin' && isAdmin){ fetchProfiles(); fetchBanned() } },[tab])

  const fetchProfiles = async () => { const { data } = await supabase.from('profiles').select('*').order('created_at',{ascending:false}); if(data) setAllProfiles(data) }
  const fetchPosts = async () => { const { data } = await supabase.from('posts').select('*').order('created_at',{ascending:false}); if(data) setPosts(data) }
  const fetchLikes = async () => { if(!user) return; const { data } = await supabase.from('likes').select('post_id').eq('from_user',user.id); if(data) setLikedIds(data.map(d=>d.post_id)) }
  const fetchNotifs = async () => { if(!user) return; const { data } = await supabase.from('notifications').select('*').eq('to_user',user.id).order('created_at',{ascending:false}).limit(20); if(data) setNotifications(data) }
  const fetchBanned = async () => { const { data } = await supabase.from('banned_users').select('*').order('created_at',{ascending:false}); if(data) setBanned(data) }
  const fetchMessages = async (otherId) => { if(!user) return; const { data } = await supabase.from('messages').select('*').or(`and(from_user.eq.${user.id},to_user.eq.${otherId}),and(from_user.eq.${otherId},to_user.eq.${user.id})`).order('created_at',{ascending:true}); if(data) setMessages(data) }

  const openCrypto = () => window.open(OXA, '_blank')
  const openPesapal = async () => { try{ const r=await fetch('/api/pesapal',{method:'POST'}); const j=await r.json(); if(j.redirect_url) window.open(j.redirect_url,'_blank'); else window.open(OXA,'_blank') }catch{ window.open(OXA,'_blank') } }
  const handleTab = (t) => { if(t==='admin' &&!isAdmin) return; if((t==='nearby' || t==='chat' || t==='liked' || t==='profile') &&!isPremium &&!isAdmin){ setTab('premium'); return } setTab(t) }

  const handleSignup = async () => {
    if(!agreed){ alert('You must agree to Terms & Privacy'); return }
    try{ const { data, error } = await supabase.auth.signUp({email:form.email.trim(), password:form.password || '12345678'}); if(error) throw error; await supabase.from('profiles').insert([{id:data.user?.id, name:form.name, email:form.email.trim(), bio:form.bio, interests:form.interests, gender:form.gender, age:form.age}]); if(isAdminEmail(form.email)){ setIsAdmin(true); setIsPremium(true); localStorage.setItem('kla_premium','yes'); localStorage.setItem('kla_email', form.email.toLowerCase()) } setUser(data.user); setView('app'); setTab('profile') }catch(e){ alert(e.message) }
  }
  const handleSignin = async () => { try{ const { data, error } = await supabase.auth.signInWithPassword({email:form.email.trim(), password:form.password}); if(error) throw error; setUser(data.user); if(isAdminEmail(data.user.email)){ setIsAdmin(true); setIsPremium(true); localStorage.setItem('kla_premium','yes'); localStorage.setItem('kla_email', data.user.email.toLowerCase()); setView('app'); setTab('admin') } else { setIsAdmin(false); setView('app'); setTab('discover') } }catch(e){ alert(e.message) } }

  const getLocation = () => { setPostForm(f=>({...f, city:'Arua - Locating...'})); if(!navigator.geolocation) return; navigator.geolocation.getCurrentPosition((pos)=>{ setPostForm(f=>({...f, lat:pos.coords.latitude, lng:pos.coords.longitude, city:`Arua • ${pos.coords.latitude.toFixed(4)}, ${pos.coords.longitude.toFixed(4)} True`})) }) }
  const handleImage = (e) => { const file=e.target.files[0]; if(!file) return; const reader=new FileReader(); reader.onload=(ev)=>{ const img=new Image(); img.onload=()=>{ const c=document.createElement('canvas'); let w=img.width,h=img.height,max=500; if(w>max){h=Math.round(h*max/w);w=max} c.width=w;c.height=h; c.getContext('2d').drawImage(img,0,0,w,h); let q=0.5,d=c.toDataURL('image/jpeg',q); while(d.length>150000&&q>0.1){q-=0.1;d=c.toDataURL('image/jpeg',q)} setPostForm(f=>({...f,preview:d})) }; img.src=ev.target.result }; reader.readAsDataURL(file) }
  const handleCreatePost = async () => { if(!user){ alert('Sign in first'); return } if(!postForm.bio){ alert('Add bio'); return } if(posting) return; setPosting(true); try{ const imgUrl=postForm.preview||WORLD[0].img; await supabase.from('posts').insert([{user_id:user.id,name:form.name||user.email.split('@')[0],type:postForm.type,bio:postForm.bio,interests:postForm.interests||'music',age:form.age||'22',gender:form.gender||'Female',city:postForm.city||'Arua',lat:postForm.lat||3.0307,lng:postForm.lng||30.907,image_url:imgUrl}]); setShowPostModal(false); setPostForm({type:'dating',bio:'',interests:'',city:'Arua',lat:3.0307,lng:30.907,preview:''}); await fetchPosts(); setTab('discover') }catch(e){ alert(e.message) } finally{ setPosting(false) } }
  const handleLike = async (post) => { if(!user){ alert('Sign in'); return } if(!isPremium&&!isAdmin){ setTab('premium'); return } if(likedIds.includes(post.id)) return; try{ await supabase.from('likes').insert([{from_user:user.id,to_user:post.user_id,post_id:post.id}]); await supabase.from('notifications').insert([{to_user:post.user_id,from_user:user.id,from_name:form.name||user.email.split('@')[0],type:'like',post_id:post.id}]); setLikedIds([...likedIds,post.id]); setChatWith(post); setTab('chat'); fetchMessages(post.user_id) }catch(e){ alert(e.message) } }
  const handleSendMsg = async () => { if(!newMsg.trim()||!chatWith) return; try{ await supabase.from('messages').insert([{from_user:user.id,to_user:chatWith.user_id,text:newMsg}]); setNewMsg(''); fetchMessages(chatWith.user_id) }catch(e){ alert(e.message) } }

  const adminDeletePost = async (id) => { if(!confirm('Delete this photo?')) return; await supabase.from('posts').delete().eq('id',id); setPosts(posts.filter(p=>p.id!==id)) }
  const adminBanUser = async (p) => { const r=prompt('Ban reason?','Spam'); if(!r) return; await supabase.from('banned_users').insert([{user_id:p.user_id||p.id,email:p.email||'',reason:r}]); await supabase.from('posts').delete().eq('user_id',p.user_id||p.id); fetchPosts(); fetchBanned() }
  const adminUnban = async (id) => { await supabase.from('banned_users').delete().eq('id',id); fetchBanned() }
  const adminWarnUser = async (p) => { const m=prompt('Warning?','Violates rules'); if(!m) return; await supabase.from('warnings').insert([{user_id:p.user_id||p.id,message:m,by_admin:user.email}]); await supabase.from('notifications').insert([{to_user:p.user_id||p.id,from_user:user.id,from_name:'ADMIN',type:'warn'}]) }
  const adminDeleteProfile = async (p) => { if(!confirm('Delete '+p.email+'?')) return; await supabase.from('profiles').delete().eq('id',p.id); fetchProfiles(); fetchPosts() }
  const adminClearChats = async (p) => { if(!confirm('Clear chats?')) return; await supabase.from('messages').delete().or(`from_user.eq.${p.id},to_user.eq.${p.id}`); alert('Cleared') }

  if(view==='landing'){
    return (
      <div className="min-h-screen bg-white text-black">
        <header className="bg-black text-white px-4 py-3 flex justify-between items-center sticky top-0 z-50"><h1 className="font-black text-xs">KLA-MEET • Keep Love Alive</h1><button onClick={()=>{setView('app'); setTab('discover')}} className="bg-[#FFC300] text-black px-4 py-2 rounded-full font-bold text-xs">Enter App</button></header>
        <div className="max-w-md mx-auto p-6 space-y-4">
          <h2 className="text-[32px] font-black leading-none">Date. Meet.<br/>Worldwide.</h2>
          <Pricing onCrypto={openCrypto} onPesapal={openPesapal} />
          <About />
          <HowItWorks />
          <Safety />
          <Faqs />
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-zinc-900 text-white rounded-[20px] p-4"><h4 className="font-black text-[11px]">🔒 Privacy</h4><button onClick={()=>setShowPrivacy(true)} className="text-[9px] text-[#FFC300] underline">Read Full</button></div>
            <div className="bg-zinc-900 text-white rounded-[20px] p-4"><h4 className="font-black text-[11px]">📄 Terms</h4><button onClick={()=>setShowTerms(true)} className="text-[9px] text-[#FFC300] underline">Read Full</button></div>
          </div>
          <div className="bg-zinc-900 text-white rounded-[24px] p-5"><h3 className="font-black">Sign In</h3><input value={form.email} onChange={e=>setForm({...form,email:e.target.value})} placeholder="Email" className="mt-3 w-full bg-zinc-800 rounded-full px-4 py-3 text-xs" /><input value={form.password} onChange={e=>setForm({...form,password:e.target.value})} type="password" placeholder="Password" className="mt-2 w-full bg-zinc-800 rounded-full px-4 py-3 text-xs" /><button onClick={handleSignin} className="mt-3 w-full bg-[#FFC300] text-black rounded-full py-3 font-black text-xs">Sign In</button></div>
          <div className="bg-[#FFC300] rounded-[24px] p-5">
            <h3 className="font-black">Sign Up - Must Agree</h3>
            <input value={form.name} onChange={e=>setForm({...form,name:e.target.value})} placeholder="Name" className="mt-3 w-full bg-white rounded-full px-4 py-3 text-xs" />
            <input value={form.email} onChange={e=>setForm({...form,email:e.target.value})} placeholder="Email" className="mt-2 w-full bg-white rounded-full px-4 py-3 text-xs" />
            <input value={form.password} onChange={e=>setForm({...form,password:e.target.value})} type="password" placeholder="Password" className="mt-2 w-full bg-white rounded-full px-4 py-3 text-xs" />
            <div className="flex gap-2 mt-2"><select value={form.gender} onChange={e=>setForm({...form,gender:e.target.value})} className="w-1/2 bg-white rounded-full px-4 py-3 text-xs"><option>Female</option><option>Male</option><option>Other</option></select><input value={form.age} onChange={e=>setForm({...form,age:e.target.value})} placeholder="Age 18+" className="w-1/2 bg-white rounded-full px-4 py-3 text-xs" /></div>
            <input value={form.interests} onChange={e=>setForm({...form,interests:e.target.value})} placeholder="Interests" className="mt-2 w-full bg-white rounded-full px-4 py-3 text-xs" />
            <textarea value={form.bio} onChange={e=>setForm({...form,bio:e.target.value})} placeholder="Bio" className="mt-2 w-full bg-white rounded-2xl px-4 py-3 text-xs h-20" />
            <div className="mt-3 bg-black rounded-xl p-3 flex gap-2 items-start"><input type="checkbox" checked={agreed} onChange={e=>setAgreed(e.target.checked)} className="w-5 h-5 mt-0.5" /><p className="text-[10px] text-white leading-tight">I am 18+ and agree to <button onClick={()=>setShowTerms(true)} className="underline text-[#FFC300] font-black">Terms</button> and <button onClick={()=>setShowPrivacy(true)} className="underline text-[#FFC300] font-black">Privacy</button></p></div>
            <button onClick={handleSignup} disabled={!agreed} className={`mt-3 w-full rounded-full py-3 font-black text-xs ${agreed?'bg-black text-white':'bg-zinc-400 text-zinc-600'}`}>{agreed?'Sign Up ✓':'Check Box to Sign Up'}</button>
          </div>
          <p className="text-center text-[9px] text-zinc-400">© 2026 KLA-MEET • Secure • Terms & Privacy enforced</p>
        </div>
        {showPrivacy && <PrivacyModal onClose={()=>setShowPrivacy(false)} onAgree={()=>setAgreed(true)} />}
        {showTerms && <TermsModal onClose={()=>setShowTerms(false)} onAgree={()=>setAgreed(true)} />}
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white pb-28">
      <header className="p-3 bg-black border-b border-white/10 flex justify-between items-center"><h1 className="font-black text-xs">KLA-MEET {isPremium && '• PREMIUM'} {isAdmin && '• ADMIN'}</h1><div className="flex gap-1"><button onClick={()=>{setTab('chat'); fetchNotifs()}} className="relative text-[11px] bg-zinc-800 px-3 py-1.5 rounded-full">💬 Chat {notifications.filter(n=>!n.read).length>0 && <span className="absolute -top-1 -right-1 bg-red-500 text-[8px] w-4 h-4 rounded-full flex items-center justify-center">{notifications.filter(n=>!n.read).length}</span>}</button><button onClick={()=>handleTab('profile')} className="text-[11px] bg-white text-black px-3 py-1.5 rounded-full font-black">Profile</button>{isAdmin && <button onClick={()=>handleTab('admin')} className="text-[11px] bg-[#FFC300] text-black px-3 py-1.5 rounded-full font-black">Admin</button>}<button onClick={()=>setView('landing')} className="text-[10px] bg-zinc-800 px-2 py-1 rounded-full">Landing</button></div></header>

      {tab==='discover' && <Discover posts={posts} onSelect={setSelectedPost} isAdmin={isAdmin} />}
      {tab==='nearby' && <Nearby posts={posts} onSelect={setSelectedPost} isPremium={isPremium||isAdmin} />}
      {tab==='chat' && <Chat notifications={notifications} chatWith={chatWith} messages={messages} newMsg={newMsg} setNewMsg={setNewMsg} onSend={handleSendMsg} onFetchMessages={fetchMessages} setChatWith={setChatWith} posts={posts} isPremium={isPremium||isAdmin} />}
      {tab==='liked' && <Liked posts={posts} likedIds={likedIds} isPremium={isPremium||isAdmin} />}
      {tab==='profile' && <Profile user={user} isAdmin={isAdmin} adminEmails={ADMIN_EMAILS} onShowPrivacy={()=>setShowPrivacy(true)} onShowTerms={()=>setShowTerms(true)} />}
      {tab==='premium' && <Premium isAdmin={isAdmin} onCrypto={openCrypto} onPesapal={openPesapal} />}
      {tab==='admin' && <AdminPanel posts={posts} allProfiles={allProfiles} banned={banned} adminTab={adminTab} setAdminTab={setAdminTab} adminSearch={adminSearch} setAdminSearch={setAdminSearch} onDeletePost={adminDeletePost} onBan={adminBanUser} onWarn={adminWarnUser} onDeleteProfile={adminDeleteProfile} onClearChats={adminClearChats} onUnban={adminUnban} adminEmails={ADMIN_EMAILS} user={user} />}

      {showPostModal && <PostModal postForm={postForm} setPostForm={setPostForm} posting={posting} onClose={()=>setShowPostModal(false)} onImage={handleImage} onLocation={getLocation} onCreate={handleCreatePost} />}
      {selectedPost && <PersonModal post={selectedPost} isAdmin={isAdmin} onClose={()=>setSelectedPost(null)} onLike={handleLike} onDelete={adminDeletePost} onBan={adminBanUser} onChat={(p)=>{setChatWith(p); setSelectedPost(null); setTab('chat'); fetchMessages(p.user_id)}} />}

      <nav className="fixed bottom-0 left-0 right-0 bg-black border-t border-white/10 flex justify-around items-center py-2">
        <button onClick={()=>handleTab('discover')} className="text-[11px]">♡<br/><span className="text-[8px]">Discover</span></button>
        <button onClick={()=>handleTab('nearby')} className="text-[11px]">◎<br/><span className="text-[8px]">Near Me</span></button>
        <button onClick={()=>setShowPostModal(true)} className="bg-[#FFC300] text-black w-14 h-14 rounded-full flex items-center justify-center font-black text-2xl -mt-5 border-4 border-black">+</button>
        <button onClick={()=>handleTab('chat')} className="relative text-[11px]">💬<br/><span className="text-[8px]">Chat</span></button>
        {isAdmin? <button onClick={()=>handleTab('admin')} className="text-[11px] text-[#FFC300] font-black">★<br/><span className="text-[8px]">Admin</span></button> : <button onClick={()=>handleTab('premium')} className="text-[11px]">★<br/><span className="text-[8px]">Premium</span></button>}
      </nav>

      {showPrivacy && <PrivacyModal onClose={()=>setShowPrivacy(false)} onAgree={()=>setAgreed(true)} />}
      {showTerms && <TermsModal onClose={()=>setShowTerms(false)} onAgree={()=>setAgreed(true)} />}
    </div>
  )
}