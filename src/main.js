import './style.css'
import { supabase } from './lib/supabase.js'

let currentUser = null
let userLocation = null
let activeTab = 'discover'
let step=1, onboard={name:'', email:'', pass:'', gender:'Woman'}

const demo=[
{name:"Amina, 24", city:"Kampala", img:"https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=400&h=500&fit=crop", age:24, bio:"Makerere grad 💛", dist:"2km"},
{name:"David, 26", city:"Nairobi", img:"https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=500&fit=crop", age:26, bio:"Entrepreneur", dist:"5km"},
{name:"Sophie, 23", city:"London", img:"https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=500&fit=crop", age:23, bio:"Travel", dist:"Worldwide"},
{name:"Brian, 27", city:"Kampala", img:"https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=500&fit=crop", age:27, bio:"Verified ", dist:"1km"},
{name:"Grace, 22", city:"Mbarara", img:"https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=400&h=500&fit=crop", age:22, bio:"Student", dist:"120km"},
{name:"Kevin, 28", city:"Kigali", img:"https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=500&fit=crop", age:28, bio:"Real • No scams", dist:"300km"},
]

const footerHTML = `<footer class="bg-black text-zinc-400 text-[11px] text-center py-6 mt-12 leading-7 px-4">
© 2026 KLA-MEET • Keep Love Alive 💛<br>
<a href="/how-it-works" onclick="route(event,'/how-it-works')" class="hover:text-yellow-400 underline">How it Works</a> •
<a href="/faqs" onclick="route(event,'/faqs')" class="hover:text-yellow-400 underline">FAQs</a> •
<a href="/premium" onclick="route(event,'/premium')" class="hover:text-yellow-400 underline font-bold">Premium</a> •
<a href="/privacy" onclick="route(event,'/privacy')" class="hover:text-yellow-400 underline">Privacy</a> •
<a href="/terms" onclick="route(event,'/terms')" class="hover:text-yellow-400 underline">Terms</a> •
<a href="/safety" onclick="route(event,'/safety')" class="hover:text-yellow-400 underline">Safety</a>
</footer>`

async function checkUser(){
  const path = window.location.pathname.replace(/\/$/,'')
  if(['/terms','/privacy','/safety','/guidelines','/about','/how-it-works','/faqs','/premium'].includes(path)){
    if(path==='/premium') return renderPremium()
    return renderStatic(path)
  }
  if(['/profile','/discover','/liked','/chats'].includes(path)) activeTab = path.replace('/','')
  const { data } = await supabase.auth.getSession()
  if(data.session){
    const { data: profile } = await supabase.from('profiles').select('*').eq('id', data.session.user.id).single()
    currentUser = profile || { id: data.session.user.id, email: data.session.user.email, name: data.session.user.email.split('@')[0] }
    userLocation = JSON.parse(localStorage.getItem('kla_location')||'null')
    if(!userLocation){ renderLocationGate(); return }
    if(path==='/premium') renderPremium(); else renderApp()
  } else {
    if(path==='/premium') renderPremium();
    else renderWelcome()
  }
}

function renderWelcome(){
document.getElementById('app').innerHTML=`
<nav class="bg-black text-white px-6 py-4 flex justify-between items-center sticky top-0 z-20"><div class="font-black tracking-widest">KLA•MEET</div><button onclick="renderLogin()" class="bg-yellow-400 text-black px-5 py-1.5 rounded-full font-bold text-sm">Log in</button></nav>
<section class="px-6 py-8 max-w-6xl mx-auto">
<h1 class="text-5xl font-black leading-[0.9]">Date. Meet.<br>Connect.<br>Worldwide.</h1>
<p class="mt-4 text-sm text-zinc-600 max-w-md">Real people, real pics, verified. Like is FREE. Chat Premium <b>$3.99 / $6.99</b> via Pesapal LIVE.</p>
<button onclick="renderOnboarding()" class="mt-6 bg-yellow-400 px-8 py-3.5 rounded-full font-black">Get Started Free →</button>
<div class="flex gap-2 mt-4"><button onclick="route(event,'/premium')" class="text-xs bg-black text-white px-4 py-2 rounded-full">View Premium $3.99</button><button onclick="route(event,'/how-it-works')" class="text-xs underline">How it Works</button></div>
<div class="grid grid-cols-3 gap-3 mt-8 max-w-[360px]">${demo.slice(0,3).map(p=>`<div class="rounded-[18px] overflow-hidden border aspect-[3/4] relative"><img src="${p.img}" class="w-full h-full object-cover"><div class="absolute bottom-0 bg-gradient-to-t from-black/80 to-transparent p-2 w-full"><p class="text-white text-xs font-bold">${p.name}</p></div></div>`).join('')}</div>
</section>
${footerHTML}`
}

function renderOnboarding(){
let h=''
if(step==1) h=`<div class="min-h-screen flex items-center justify-center p-6"><div class="w-full max-w-[360px] border-2 border-black rounded-[30px] p-7 bg-white"><h2 class="font-black text-xl text-center">Create Account 💛</h2><input id="name" placeholder="Full name" class="w-full mt-5 border-2 border-black rounded-xl px-4 py-3 text-sm"><input id="email" placeholder="Email" class="w-full mt-3 border rounded-xl px-4 py-3 text-sm"><input id="pass" type="password" placeholder="Password" class="w-full mt-3 border rounded-xl px-4 py-3 text-sm"><button onclick="signUp()" class="mt-5 w-full bg-yellow-400 py-3.5 rounded-full font-black">Create Account</button></div></div>`
if(step==2) h=`<div class="min-h-screen flex items-center justify-center p-6"><div class="w-full max-w-[360px] border rounded-[30px] p-7 text-center bg-white"><div class="text-4xl">✅</div><h2 class="font-black mt-3">Welcome ${onboard.name}!</h2><button onclick="renderLocationGate()" class="mt-6 w-full bg-yellow-400 py-3.5 rounded-full font-black">Enable Location →</button></div></div>`
document.getElementById('app').innerHTML=h + footerHTML
}
function renderLogin(){
document.getElementById('app').innerHTML=`<div class="min-h-screen flex items-center justify-center p-6"><div class="w-full max-w-[360px] border-2 border-black rounded-[30px] p-8 bg-white"><h2 class="font-black text-2xl">Log in</h2><input id="email" placeholder="Email" class="w-full mt-6 border-2 border-black rounded-xl px-4 py-3 text-sm"><input id="pass" type="password" placeholder="Password" class="w-full mt-3 border rounded-xl px-4 py-3 text-sm"><button onclick="doLogin()" class="mt-5 w-full bg-yellow-400 py-3.5 rounded-full font-black">Log in</button><button onclick="renderWelcome()" class="w-full mt-4 text-xs underline">← Back</button></div></div>${footerHTML}`
}
function renderLocationGate(){
document.getElementById('app').innerHTML=`
<div class="max-w-[430px] mx-auto min-h-screen flex flex-col bg-white"><div class="flex-1 flex items-center justify-center p-6"><div class="w-full border-2 border-black rounded-[32px] p-8 text-center"><div class="w-20 h-20 bg-yellow-400 rounded-full flex items-center justify-center mx-auto text-3xl">📍</div><h2 class="font-black text-2xl mt-5">Enable Location</h2><p class="text-sm text-zinc-600 mt-3">Activate to unlock /discover /profile /liked /chats /premium</p><button onclick="activateLocation()" class="mt-6 w-full bg-black text-white py-4 rounded-full font-black">Activate Location →</button><button onclick="skipLocation()" class="mt-3 w-full bg-zinc-100 py-3 rounded-full text-xs font-bold">Skip</button></div></div>${footerHTML}</div>`
}
function renderApp(){
document.getElementById('app').innerHTML=`
<div class="max-w-[430px] mx-auto min-h-screen pb-24 bg-white">
<header class="p-5 flex justify-between items-center border-b sticky top-0 bg-white z-10"><h1 class="font-black">KLA•MEET</h1><span class="text-xs">Hi, ${currentUser.name} • <a href="#" onclick="logout()" class="underline">Logout</a></span></header>
<div id="tabContent" class="p-3"></div>
<nav class="fixed bottom-0 left-0 right-0 bg-white border-t flex justify-around p-3.5 max-w-[430px] mx-auto text-[11px] z-20">
<button onclick="switchTab('discover')" class="${activeTab==='discover'?'font-black':'text-zinc-400'}">Discover</button>
<button onclick="switchTab('liked')" class="${activeTab==='liked'?'font-black':'text-zinc-400'}">Liked</button>
<button onclick="switchTab('chats')" class="${activeTab==='chats'?'font-black':'text-zinc-400'}">Chats</button>
<button onclick="switchTab('profile')" class="${activeTab==='profile'?'font-black':'text-zinc-400'}">Profile</button>
<button onclick="route(event,'/premium')" class="text-zinc-400 font-bold">Premium</button>
</nav>
${footerHTML}
</div>`
renderTab()
}
function renderTab(){
const el=document.getElementById('tabContent')
if(activeTab==='discover'){
 el.innerHTML=`<div class="grid grid-cols-2 gap-3">${demo.map((p,i)=>`
 <div class="bg-white rounded-[20px] overflow-hidden border"><div class="h-[180px] relative"><img src="${p.img}" class="w-full h-full object-cover"><div class="absolute top-2 left-2 bg-black/70 text-white text-[10px] px-2 py-1 rounded-full">${p.dist} • ${p.city}</div></div><div class="flex gap-1.5 p-2.5"><button onclick="likeUser(${i})" class="flex-1 bg-black text-white py-2.5 rounded-full text-xs font-bold">Like</button><button onclick="switchTab('chats')" class="flex-1 bg-yellow-400 py-2.5 rounded-full text-xs font-black">Chat</button></div></div>`).join('')}</div><button onclick="route(event,'/premium')" class="mt-4 w-full bg-yellow-400 py-3 rounded-full text-xs font-black">Upgrade $3.99 / $6.99 →</button>`
}
if(activeTab==='liked'){ el.innerHTML=`<h2 class="font-black text-xl">Who Liked You</h2><div class="mt-4 text-center bg-zinc-50 p-6 rounded-2xl"><p class="text-sm">2 people liked you</p><button onclick="route(event,'/premium')" class="mt-3 bg-yellow-400 px-6 py-2.5 rounded-full text-xs font-black">Unlock Premium</button></div>` }
if(activeTab==='chats'){ el.innerHTML=`<h2 class="font-black text-xl">Chats</h2><div class="mt-4 bg-yellow-50 border rounded-2xl p-4 text-center"><p class="text-sm font-bold">Chat needs Premium</p><button onclick="route(event,'/premium')" class="mt-3 bg-black text-white px-6 py-2.5 rounded-full text-xs font-bold">Get Premium $3.99</button></div>` }
if(activeTab==='profile'){ el.innerHTML=`<h2 class="font-black text-xl">Profile</h2><div class="mt-4 border-2 border-black rounded-[28px] p-6 text-center"><div class="w-20 h-20 bg-yellow-400 rounded-full mx-auto flex items-center justify-center font-black">${currentUser.name[0]}</div><p class="font-black mt-3">${currentUser.name}</p><p class="text-xs">${currentUser.email}</p><button onclick="logout()" class="w-full mt-4 bg-zinc-100 py-3 rounded-full text-xs font-bold">Logout</button></div>` }
}

function renderPremium(){
const logged =!!currentUser
document.getElementById('app').innerHTML=`
<div class="max-w-[430px] mx-auto min-h-screen bg-white">
<div class="p-6 border-b sticky top-0 bg-white z-10 flex justify-between items-center"><a href="/" onclick="route(event,'/')" class="font-black">KLA•MEET</a><button onclick="${logged?'goBack()':'route(event,\'/\')'}" class="text-xs underline">← Back</button></div>
<div class="p-5">
<h2 class="font-black text-3xl">Premium</h2><p class="text-xs mt-1 text-zinc-600">kla-meet.vercel.app/premium/ • USD pricing LIVE - Pesapal (No 20k limit)</p>
<div class="mt-2 text-[11px] bg-green-50 border border-green-200 rounded-xl p-3">✅ <b>LIVE Pesapal USD:</b> Pay with MTN MoMo, Airtel, Card. Min is $1, so $3.99 / $6.99 works! No 20k UGX block.</div>

<div class="mt-6 space-y-4">
<div class="rounded-[24px] p-5 border bg-white">
<div class="flex justify-between items-center"><b>BASIC</b><b class="text-lg">$3.99</b></div>
<p class="text-[11px] text-zinc-500">≈ 15,000 UGX • Less than 20k ✅</p>
<ul class="text-[13px] mt-3 space-y-1"><li>✅ Unlimited Likes</li><li>✅ See who liked you</li><li>✅ 10 Chats/day</li><li>✅ 5 Countries</li></ul>
<button onclick="payLive(3.99,'BASIC')" class="mt-4 w-full bg-black text-white py-4 rounded-full font-black text-sm">Pay $3.99 LIVE via Pesapal →</button>
</div>

<div class="rounded-[24px] p-5 border-2 border-yellow-400 bg-yellow-50">
<div class="flex justify-between items-center"><b>STANDARD ⭐ Best</b><b class="text-lg">$6.99</b></div>
<p class="text-[11px] text-zinc-500">≈ 26,000 UGX but USD pricing avoids limit</p>
<ul class="text-[13px] mt-3 space-y-1 font-medium"><li>✅ Everything in BASIC</li><li>✅ Unlimited Chats</li><li>✅ Video 30min</li><li>✅ ALL Countries + Boost + No Ads</li></ul>
<button onclick="payLive(6.99,'STANDARD')" class="mt-4 w-full bg-yellow-400 py-4 rounded-full font-black text-sm">Pay $6.99 LIVE via Pesapal →</button>
</div>
</div>

<div class="mt-6 text-[11px] text-zinc-500 text-center">Secure by Pesapal. MTN MoMo, Airtel Money, Visa. <a href="/terms" onclick="route(event,'/terms')" class="underline">Terms</a></div>
</div>
${footerHTML}
</div>`
}

function renderStatic(path){
  let title='', body=''
  if(path==='/how-it-works'){ title='How it Works'; body=`<p>1. Sign up free</p><p>2. Activate location → unlock tabs</p><p>3. Like FREE, Chat Premium $3.99/$6.99 USD LIVE via Pesapal</p>`}
  if(path==='/faqs'){ title='FAQs'; body=`<p><b>Why USD?</b> Pesapal UGX min 20k blocks small payments. USD min $1 allows $3.99.</p><p><b>Is Like free?</b> Yes.</p>`}
  if(path==='/terms'){ title='Terms'; body=`<p>18+ only. Premium $3.99/$6.99 USD via Pesapal.</p>`}
  if(path==='/privacy'){ title='Privacy'; body=`<p>Location city only.</p>`}
  if(path==='/safety'){ title='Safety'; body=`<p>Meet public.</p>`}
  if(path==='/guidelines'){ title='Guidelines'; body=`<p>Be kind.</p>`}
  if(path==='/about'){ title='About'; body=`<p>KLA-MEET Kampala.</p>`}
  document.getElementById('app').innerHTML=`<div class="max-w-3xl mx-auto p-6"><a href="/" onclick="route(event,'/')" class="font-black">KLA•MEET</a><h1 class="text-3xl font-black mt-8">${title}</h1><div class="mt-6 text-sm">${body}</div><a href="/" onclick="route(event,'/')" class="mt-8 inline-block bg-yellow-400 px-8 py-3.5 rounded-full font-black">← Back</a>${footerHTML}</div>`
}

window.activateLocation=()=>{
  if(!navigator.geolocation) return alert('No geolocation')
  const btn=event.target; btn.innerText='Getting...'
  navigator.geolocation.getCurrentPosition(async pos=>{
    const loc={lat:pos.coords.latitude, lng:pos.coords.longitude, city:'Kampala'}
    localStorage.setItem('kla_location', JSON.stringify(loc))
    userLocation=loc
    activeTab='discover'; window.history.pushState({},'','/discover'); renderApp()
  }, err=>{ alert(err.message); btn.innerText='Activate Location →' })
}
window.skipLocation=()=>{ const loc={lat:0.3476, lng:32.5825, city:'Kampala'}; localStorage.setItem('kla_location', JSON.stringify(loc)); userLocation=loc; activeTab='discover'; window.history.pushState({},'','/discover'); renderApp() }
window.switchTab=(tab)=>{ activeTab=tab; window.history.pushState({},'','/'+tab); renderApp() }
window.goBack=()=>renderApp()
window.route=(e,path)=>{ if(e) e.preventDefault(); window.history.pushState({},'',path); const p=path.replace(/\/$/,''); if(['/terms','/privacy','/safety','/guidelines','/about','/how-it-works','/faqs','/premium'].includes(p)){ if(p==='/premium') renderPremium(); else renderStatic(p) } else if(p===''||p==='/') checkUser(); else { activeTab=p.replace('/',''); renderApp() } }
window.addEventListener('popstate',()=>{ const p=window.location.pathname.replace(/\/$/,''); if(['/terms','/privacy','/safety','/guidelines','/about','/how-it-works','/faqs','/premium'].includes(p)){ if(p==='/premium') renderPremium(); else renderStatic(p) } else checkUser() })

window.signUp=async()=>{
const name=document.getElementById('name').value.trim()
const email=document.getElementById('email').value.trim()
const pass=document.getElementById('pass').value.trim()
if(!name||!email||!pass) return alert('Fill all')
onboard.name=name
const btn=event.target; btn.innerText='Creating...'
const { data, error } = await supabase.auth.signUp({email, password:pass})
if(error){ alert(error.message); btn.innerText='Create'; return }
if(data.user){ await supabase.from('profiles').insert([{id:data.user.id, name, email, city:'Kampala'}]); currentUser={id:data.user.id, name, email} }
step=2; renderOnboarding()
}
window.doLogin=async()=>{
const email=document.getElementById('email').value.trim()
const pass=document.getElementById('pass').value.trim()
const { data, error } = await supabase.auth.signInWithPassword({email, password:pass})
if(error) return alert(error.message)
currentUser={id:data.user.id, email, name:email.split('@')[0]}
userLocation=JSON.parse(localStorage.getItem('kla_location')||'null')
if(!userLocation) renderLocationGate(); else { activeTab='discover'; window.history.pushState({},'','/discover'); renderApp() }
}
window.logout=async()=>{ await supabase.auth.signOut(); currentUser=null; localStorage.removeItem('kla_location'); window.history.pushState({},'','/'); renderWelcome() }
window.likeUser=async(i)=>{ if(!currentUser) return renderLogin(); await supabase.from('likes').insert([{from_user:currentUser.id, to_name:demo[i].name}]); alert(`Liked ${demo[i].name} ❤️`) }
window.payLive=async(amount,plan)=>{
const btn=event.target; const old=btn.innerText; btn.innerText=`Paying $${amount}... Pesapal LIVE`
try{
const r=await fetch('/api/pesapal-order',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({amount, plan, currency:'USD', email:currentUser?.email})})
const d=await r.json()
if(d.redirect_url) return window.location.href=d.redirect_url
if(d.order_tracking_id) return window.location.href=`https://pay.pesapal.com/iframe/PesapalIframe3/Index?OrderTrackingId=${d.order_tracking_id}`
alert(JSON.stringify(d).slice(0,500))
}catch(e){alert(e.message)} finally{btn.innerText=old}
}
window.renderOnboarding=()=>{step=1; renderOnboarding()}
window.renderLogin=renderLogin
window.renderWelcome=renderWelcome
window.renderDiscover=()=>switchTab('discover')
window.renderPremium=renderPremium
checkUser()