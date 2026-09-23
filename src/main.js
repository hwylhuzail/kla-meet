import './style.css'
import { supabase } from './lib/supabase.js'

let currentUser = null
let userLocation = null
let activeTab = 'discover'
let step=1, onboard={name:'', email:'', pass:'', gender:'Woman'}

// REAL PICS - no icons
const demo=[
{name:"Amina, 24", city:"Kampala", img:"https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=400&h=500&fit=crop", age:24, bio:"Makerere grad 💛", dist:"2km"},
{name:"David, 26", city:"Nairobi", img:"https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=500&fit=crop", age:26, bio:"Entrepreneur", dist:"5km"},
{name:"Sophie, 23", city:"London", img:"https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=500&fit=crop", age:23, bio:"Travel", dist:"Worldwide"},
{name:"Brian, 27", city:"Kampala", img:"https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=500&fit=crop", age:27, bio:"Verified ✓", dist:"1km"},
{name:"Grace, 22", city:"Mbarara", img:"https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=400&h=500&fit=crop", age:22, bio:"Student", dist:"120km"},
{name:"Kevin, 28", city:"Kigali", img:"https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=500&fit=crop", age:28, bio:"Real • No scams", dist:"300km"},
]

const footerHTML = `
<footer class="bg-black text-zinc-400 text-[11px] text-center py-6 mt-12 leading-7 px-4">
© 2026 KLA-MEET • Keep Love Alive 💛<br>
<a href="/how-it-works" onclick="route(event,'/how-it-works')" class="hover:text-yellow-400 underline">How it Works</a> •
<a href="/faqs" onclick="route(event,'/faqs')" class="hover:text-yellow-400 underline">FAQs</a> •
<a href="/privacy" onclick="route(event,'/privacy')" class="hover:text-yellow-400 underline">Privacy</a> •
<a href="/terms" onclick="route(event,'/terms')" class="hover:text-yellow-400 underline">Terms</a> •
<a href="/safety" onclick="route(event,'/safety')" class="hover:text-yellow-400 underline">Safety</a> •
<a href="/guidelines" onclick="route(event,'/guidelines')" class="hover:text-yellow-400 underline">Guidelines</a> •
<a href="/about" onclick="route(event,'/about')" class="hover:text-yellow-400 underline">About</a>
</footer>`

async function checkUser(){
  const path = window.location.pathname.replace(/\/$/,'')
  if(['/terms','/privacy','/safety','/guidelines','/about','/how-it-works','/faqs'].includes(path)) return renderStatic(path)
  if(['/profile','/discover','/liked','/chats'].includes(path)) activeTab = path.replace('/','')

  const { data } = await supabase.auth.getSession()
  if(data.session){
    const { data: profile } = await supabase.from('profiles').select('*').eq('id', data.session.user.id).single()
    currentUser = profile || { id: data.session.user.id, email: data.session.user.email, name: data.session.user.email.split('@')[0] }
    userLocation = JSON.parse(localStorage.getItem('kla_location')||'null')
    if(!userLocation){ renderLocationGate(); return }
    renderApp()
  } else { renderWelcome() }
}

function renderWelcome(){
document.getElementById('app').innerHTML=`
<nav class="bg-black text-white px-6 py-4 flex justify-between items-center sticky top-0 z-20"><div class="font-black tracking-widest">KLA•MEET</div><button onclick="renderLogin()" class="bg-yellow-400 text-black px-5 py-1.5 rounded-full font-bold text-sm">Log in</button></nav>
<section class="px-6 py-8 max-w-6xl mx-auto">
<h1 class="text-5xl font-black leading-[0.9]">Date. Meet.<br>Connect.<br>Worldwide.</h1>
<p class="mt-4 text-sm text-zinc-600 max-w-md">Real people, real pics, verified. Like is FREE. Chat is Premium 35k/75k UGX via Pesapal.</p>
<button onclick="renderOnboarding()" class="mt-6 bg-yellow-400 px-8 py-3.5 rounded-full font-black">Get Started Free →</button>
<div class="grid grid-cols-3 gap-3 mt-8 max-w-[360px]">
${demo.slice(0,3).map(p=>`<div class="rounded-[18px] overflow-hidden border aspect-[3/4] relative"><img src="${p.img}" class="w-full h-full object-cover"><div class="absolute bottom-0 bg-gradient-to-t from-black/80 to-transparent p-2 w-full"><p class="text-white text-xs font-bold">${p.name}</p></div></div>`).join('')}
</div>
</section>
${footerHTML}`
}

function renderOnboarding(){
let h=''
if(step==1) h=`<div class="min-h-screen flex items-center justify-center p-6"><div class="w-full max-w-[360px] border-2 border-black rounded-[30px] p-7 bg-white"><h2 class="font-black text-xl text-center">Create Account 💛</h2><input id="name" placeholder="Full name" class="w-full mt-5 border-2 border-black rounded-xl px-4 py-3 text-sm"><input id="email" placeholder="Email" class="w-full mt-3 border rounded-xl px-4 py-3 text-sm"><input id="pass" type="password" placeholder="Password" class="w-full mt-3 border rounded-xl px-4 py-3 text-sm"><button onclick="signUp()" class="mt-5 w-full bg-yellow-400 py-3.5 rounded-full font-black">Create Account</button><p class="text-xs text-center mt-4"><a href="#" onclick="renderLogin()" class="underline font-bold">Log in</a> • <a href="/terms" onclick="route(event,'/terms')" class="underline">Terms</a></p></div></div>`
if(step==2) h=`<div class="min-h-screen flex items-center justify-center p-6"><div class="w-full max-w-[360px] border rounded-[30px] p-7 text-center bg-white"><div class="text-4xl">✅</div><h2 class="font-black mt-3">Welcome ${onboard.name}!</h2><p class="text-sm mt-2">Account created! Now enable location</p><button onclick="renderLocationGate()" class="mt-6 w-full bg-yellow-400 py-3.5 rounded-full font-black">Enable Location →</button></div></div>`
document.getElementById('app').innerHTML=h + footerHTML
}

function renderLogin(){
document.getElementById('app').innerHTML=`<div class="min-h-screen flex items-center justify-center p-6"><div class="w-full max-w-[360px] border-2 border-black rounded-[30px] p-8 bg-white"><h2 class="font-black text-2xl">Log in</h2><input id="email" placeholder="Email" class="w-full mt-6 border-2 border-black rounded-xl px-4 py-3 text-sm"><input id="pass" type="password" placeholder="Password" class="w-full mt-3 border rounded-xl px-4 py-3 text-sm"><button onclick="doLogin()" class="mt-5 w-full bg-yellow-400 py-3.5 rounded-full font-black">Log in</button><button onclick="renderWelcome()" class="w-full mt-4 text-xs underline">← Back</button></div></div>${footerHTML}`
}

function renderLocationGate(){
document.getElementById('app').innerHTML=`
<div class="max-w-[430px] mx-auto min-h-screen flex flex-col bg-white">
<div class="flex-1 flex items-center justify-center p-6">
<div class="w-full border-2 border-black rounded-[32px] p-8 text-center">
<div class="w-20 h-20 bg-yellow-400 rounded-full flex items-center justify-center mx-auto text-3xl">📍</div>
<h2 class="font-black text-2xl mt-5">Enable Location</h2>
<p class="text-sm text-zinc-600 mt-3">To access <b>Profile, Discover, Who Liked You & Chats</b>, activate location. We show distance like "2km" — not exact address.</p>
<div class="bg-zinc-50 rounded-2xl p-4 mt-5 text-left text-xs space-y-2">
<p>✅ Unlock Discover (/discover)</p>
<p>✅ Unlock Who Liked You (/liked)</p>
<p>✅ Unlock Chats (/chats)</p>
<p>✅ Unlock Profile (/profile)</p>
</div>
<button onclick="activateLocation()" class="mt-6 w-full bg-black text-white py-4 rounded-full font-black">Activate Location →</button>
<button onclick="skipLocation()" class="mt-3 w-full bg-zinc-100 py-3 rounded-full text-xs font-bold">Skip (limited access)</button>
<p class="text-[10px] text-zinc-400 mt-4">Stored as city only. <a href="/privacy" onclick="route(event,'/privacy')" class="underline">Privacy Policy</a></p>
</div>
</div>
${footerHTML}
</div>`
}

function renderApp(){
document.getElementById('app').innerHTML=`
<div class="max-w-[430px] mx-auto min-h-screen pb-24 bg-white">
<header class="p-5 flex justify-between items-center border-b sticky top-0 bg-white z-10">
<h1 class="font-black tracking-widest">KLA•MEET</h1>
<div class="flex gap-2 items-center"><span class="text-[10px] bg-green-100 text-green-700 px-2 py-1 rounded-full">📍 ${userLocation?.city||'Kampala'}</span><span class="text-xs">Hi, ${currentUser.name} • <a href="#" onclick="logout()" class="underline">Logout</a></span></div>
</header>

<div id="tabContent" class="p-3"></div>

<nav class="fixed bottom-0 left-0 right-0 bg-white border-t flex justify-around p-3.5 max-w-[430px] mx-auto text-[11px] z-20">
<button onclick="switchTab('discover')" class="${activeTab==='discover'?'font-black':'text-zinc-400'}">Discover</button>
<button onclick="switchTab('liked')" class="${activeTab==='liked'?'font-black':'text-zinc-400'}">Liked You</button>
<button onclick="switchTab('chats')" class="${activeTab==='chats'?'font-black':'text-zinc-400'}">Chats</button>
<button onclick="switchTab('profile')" class="${activeTab==='profile'?'font-black':'text-zinc-400'}">Profile</button>
</nav>
${footerHTML}
</div>`
renderTab()
}

function renderTab(){
const el=document.getElementById('tabContent')
if(activeTab==='discover'){
 el.innerHTML=`<div class="grid grid-cols-2 gap-3">${demo.map((p,i)=>`
 <div class="bg-white rounded-[20px] overflow-hidden border shadow-sm">
 <div class="h-[180px] relative"><img src="${p.img}" class="w-full h-full object-cover"><div class="absolute top-2 left-2 bg-black/70 text-white text-[10px] px-2 py-1 rounded-full">${p.dist} • ${p.city}</div><div class="absolute bottom-0 w-full bg-gradient-to-t from-black/80 to-transparent p-2.5"><p class="text-white font-bold text-[13px]">${p.name}</p><p class="text-white/80 text-[11px]">${p.bio}</p></div></div>
 <div class="flex gap-1.5 p-2.5"><button onclick="likeUser(${i})" class="flex-1 bg-black text-white py-2.5 rounded-full text-xs font-bold">❤️ Like</button><button onclick="switchTab('chats')" class="flex-1 bg-yellow-400 py-2.5 rounded-full text-xs font-black">Chat</button></div>
 </div>`).join('')}</div><button onclick="renderPremium()" class="mt-4 w-full bg-zinc-100 py-3 rounded-full text-xs font-bold">Upgrade to chat 35k/75k →</button>`
}
if(activeTab==='liked'){
 el.innerHTML=`<h2 class="font-black text-xl">Who Liked You</h2><p class="text-xs text-zinc-500">Location active ✅</p>
 <div class="grid grid-cols-2 gap-3 mt-4">${demo.slice(0,2).map(p=>`
 <div class="rounded-[20px] overflow-hidden border relative"><img src="${p.img}" class="w-full h-[160px] object-cover blur-[6px]"><div class="absolute inset-0 flex flex-col items-center justify-center bg-black/40"><p class="text-white font-bold text-xs">${p.name} liked you</p><button onclick="renderPremium()" class="mt-2 bg-yellow-400 px-4 py-1.5 rounded-full text-xs font-black">Unlock</button></div></div>`).join('')}</div>`
}
if(activeTab==='chats'){
 el.innerHTML=`<h2 class="font-black text-xl">Chats</h2><div class="mt-4 bg-yellow-50 border border-yellow-200 rounded-2xl p-4 text-center"><p class="text-sm font-bold">Chat needs Premium</p><p class="text-xs mt-1">BASIC 35k = 10 chats/day • STANDARD 75k = unlimited</p><button onclick="renderPremium()" class="mt-3 bg-black text-white px-6 py-2.5 rounded-full text-xs font-bold">Upgrade 35k/75k</button></div>`
}
if(activeTab==='profile'){
 el.innerHTML=`<h2 class="font-black text-xl">Profile</h2><div class="mt-4 border-2 border-black rounded-[28px] p-6 text-center"><div class="w-20 h-20 bg-yellow-400 rounded-full mx-auto flex items-center justify-center font-black text-xl">${currentUser.name[0].toUpperCase()}</div><p class="font-black mt-3">${currentUser.name}</p><p class="text-xs text-zinc-500">${currentUser.email}</p><p class="text-xs mt-2 bg-green-50 border px-3 py-1 rounded-full inline-block">📍 ${userLocation.city} • ${userLocation.lat?.toFixed(3)}, ${userLocation.lng?.toFixed(3)}</p><button onclick="logout()" class="w-full mt-4 bg-zinc-100 py-3 rounded-full text-xs font-bold">Logout</button></div>`
}
}

function renderPremium(){
document.getElementById('app').innerHTML=`
<div class="max-w-[430px] mx-auto p-5 min-h-screen bg-white"><button onclick="goBack()" class="text-xs underline">← Back</button><h2 class="font-black text-2xl mt-4">Upgrade to Chat</h2><p class="text-xs mt-1">Like FREE. Chat needs Premium (Pesapal min 20k)</p>
<div class="mt-5 space-y-3">
<div class="rounded-[24px] p-5 border bg-zinc-50"><div class="flex justify-between"><b>BASIC</b><b>35k UGX</b></div><button onclick="payLive(35000,'BASIC')" class="mt-3 w-full bg-black text-white py-3.5 rounded-full font-bold text-sm">Pay 35k via Pesapal</button></div>
<div class="rounded-[24px] p-5 border-2 border-yellow-400 bg-yellow-50"><div class="flex justify-between"><b>STANDARD ⭐</b><b>75k UGX</b></div><button onclick="payLive(75000,'STANDARD')" class="mt-3 w-full bg-yellow-400 py-3.5 rounded-full font-black text-sm">Pay 75k via Pesapal</button></div>
</div>${footerHTML}</div>`
}

function renderStatic(path){
  let title='', body=''
  if(path==='/how-it-works'){ title='How KLA-MEET Works'; body=`<div class="space-y-4 text-sm"><p><b>1.</b> Sign up free → Supabase</p><p><b>2.</b> Activate location 📍 → unlock /discover /profile /liked /chats</p><p><b>3.</b> Like FREE, Chat Premium 35k/75k Pesapal MTN/Airtel</p><p><b>4.</b> Meet safely - public place</p></div>`}
  if(path==='/faqs'){ title='FAQs'; body=`<div class="space-y-3 text-sm"><div class="border p-3 rounded-xl"><b>Why location?</b><p>To show 2km nearby, safety, real profiles. Stored as city only.</p></div><div class="border p-3 rounded-xl"><b>Is Like free?</b><p>Yes saved to Supabase</p></div><div class="border p-3 rounded-xl"><b>35k/75k?</b><p>Pesapal minimum 20k UGX</p></div></div>`}
  if(path==='/terms'){ title='Terms'; body=`<p>18+ only. Payments 35k/75k via Pesapal. No refund after use.</p>`}
  if(path==='/privacy'){ title='Privacy'; body=`<p>Location = city only, not exact GPS. Delete via support.</p>`}
  if(path==='/safety'){ title='Safety'; body=`<p>Meet public, never send money, report 24/7.</p>`}
  if(path==='/guidelines'){ title='Guidelines'; body=`<p>Real pics, be kind. No nudity, scams, under 18.</p>`}
  if(path==='/about'){ title='About'; body=`<p>KLA-MEET Keep Love Alive - Built Kampala.</p>`}
  document.getElementById('app').innerHTML=`<div class="max-w-3xl mx-auto p-6 min-h-screen bg-white"><a href="/" onclick="route(event,'/')" class="font-black text-xl">KLA•MEET</a><h1 class="text-3xl font-black mt-8">${title}</h1><div class="mt-6">${body}</div><a href="/" onclick="route(event,'/')" class="mt-8 inline-block bg-yellow-400 px-8 py-3.5 rounded-full font-black">← Back</a>${footerHTML}</div>`
}

// ROUTING & LOCATION
window.activateLocation=()=>{
  if(!navigator.geolocation) return alert('Geolocation not supported')
  const btn=event.target; btn.innerText='Getting location...'
  navigator.geolocation.getCurrentPosition(async pos=>{
    const loc={lat:pos.coords.latitude, lng:pos.coords.longitude, city:'Kampala', accuracy:pos.coords.accuracy}
    localStorage.setItem('kla_location', JSON.stringify(loc))
    userLocation=loc
    if(currentUser) await supabase.from('profiles').update({city:'Kampala', lat:loc.lat, lng:loc.lng}).eq('id', currentUser.id)
    activeTab='discover'; window.history.pushState({},'','/discover'); renderApp()
  }, err=>{ alert('Allow location: '+err.message); btn.innerText='Activate Location →' }, {enableHighAccuracy:true})
}
window.skipLocation=()=>{
  const loc={lat:0.3476, lng:32.5825, city:'Kampala', skipped:true}
  localStorage.setItem('kla_location', JSON.stringify(loc))
  userLocation=loc
  activeTab='discover'; window.history.pushState({},'','/discover'); renderApp()
}
window.switchTab=(tab)=>{ activeTab=tab; window.history.pushState({},'',`/${tab}`); renderApp() }
window.goBack=()=>{ renderApp() }
window.route=(e,path)=>{ if(e) e.preventDefault(); window.history.pushState({},'',path); const p=path.replace(/\/$/,''); if(p===''||p==='/') checkUser(); else if(['/terms','/privacy','/safety','/guidelines','/about','/how-it-works','/faqs'].includes(p)) renderStatic(p); else { activeTab=p.replace('/',''); if(!JSON.parse(localStorage.getItem('kla_location')||'null')) renderLocationGate(); else renderApp() } }
window.addEventListener('popstate',()=>{ const p=window.location.pathname.replace(/\/$/,''); if(p===''||p==='/') checkUser(); else if(['/terms','/privacy','/safety','/guidelines','/about','/how-it-works','/faqs'].includes(p)) renderStatic(p); else { activeTab=p.replace('/',''); renderApp() } })

window.signUp=async()=>{
const name=document.getElementById('name').value.trim()
const email=document.getElementById('email').value.trim()
const pass=document.getElementById('pass').value.trim()
if(!name||!email||!pass) return alert('Fill all')
onboard.name=name
const btn=event.target; btn.innerText='Creating...'
const { data, error } = await supabase.auth.signUp({email, password:pass})
if(error){ alert(error.message); btn.innerText='Create Account'; return }
if(data.user){ await supabase.from('profiles').insert([{id:data.user.id, name, email, gender:onboard.gender, city:'Kampala'}]); currentUser={id:data.user.id, name, email} }
step=2; renderOnboarding()
}
window.doLogin=async()=>{
const email=document.getElementById('email').value.trim()
const pass=document.getElementById('pass').value.trim()
const { data, error } = await supabase.auth.signInWithPassword({email, password:pass})
if(error) return alert(error.message)
const { data: profile } = await supabase.from('profiles').select('*').eq('id', data.user.id).single()
currentUser=profile || {id:data.user.id, email, name:email.split('@')[0]}
userLocation=JSON.parse(localStorage.getItem('kla_location')||'null')
if(!userLocation) renderLocationGate(); else { activeTab='discover'; window.history.pushState({},'','/discover'); renderApp() }
}
window.logout=async()=>{ await supabase.auth.signOut(); currentUser=null; localStorage.removeItem('kla_location'); window.history.pushState({},'','/'); renderWelcome() }
window.likeUser=async(i)=>{ if(!currentUser) return renderLogin(); await supabase.from('likes').insert([{from_user:currentUser.id, to_name:demo[i].name}]); alert(`Liked ${demo[i].name} ❤️`) }
window.payLive=async(amount,plan)=>{
const btn=event.target; const old=btn.innerText; btn.innerText='Connecting Pesapal...'
try{
const r=await fetch('/api/pesapal-order',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({amount,plan,email:currentUser?.email})})
const d=await r.json()
if(d.redirect_url) return window.location.href=d.redirect_url
if(d.order_tracking_id) return window.location.href=`https://pay.pesapal.com/iframe/PesapalIframe3/Index?OrderTrackingId=${d.order_tracking_id}`
alert(JSON.stringify(d).slice(0,400))
}catch(e){alert(e.message)} finally{btn.innerText=old}
}
window.renderOnboarding=()=>{step=1; window.history.pushState({},'','/'); renderOnboarding()}
window.renderLogin=()=>{ window.history.pushState({},'','/login'); renderLogin() }
window.renderWelcome=()=>{ window.history.pushState({},'','/'); renderWelcome() }
window.renderDiscover=()=>switchTab('discover')

checkUser()