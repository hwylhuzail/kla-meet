import './style.css'
import { supabase } from './lib/supabase.js'
import { renderLoginPage, setLoginModeUI } from './pages/login.js'

let currentUser = null
let userLocation = null
let activeTab = 'discover'
let step=1, onboard={name:'', email:'', pass:'', loginMode:'password'}

const demo=[
{name:"Amina, 24", city:"Kampala", img:"https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=400&h=500&fit=crop", dist:"2km", bio:"Makerere grad 💛"},
{name:"David, 26", city:"Nairobi", img:"https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=500&fit=crop", dist:"5km", bio:"Entrepreneur"},
{name:"Sophie, 23", city:"London", img:"https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=500&fit=crop", dist:"Worldwide", bio:"Travel"},
{name:"Brian, 27", city:"Kampala", img:"https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=500&fit=crop", dist:"1km", bio:"Verified ✓"},
]

const footerHTML = `<footer class="bg-black text-zinc-400 text-[11px] text-center py-6 mt-12 leading-7 px-4">
© 2026 KLA-MEET • Keep Love Alive 💛<br>
<a href="/how-it-works" onclick="route(event,'/how-it-works')" class="hover:text-yellow-400 underline">How it Works</a> •
<a href="/faqs" onclick="route(event,'/faqs')" class="hover:text-yellow-400 underline">FAQs</a> •
<a href="/signin" onclick="route(event,'/signin')" class="hover:text-yellow-400 underline font-bold">/signin</a> •
<a href="/login" onclick="route(event,'/login')" class="hover:text-yellow-400 underline font-bold">/login</a> •
<a href="/premium" onclick="route(event,'/premium')" class="hover:text-yellow-400 underline font-bold">Premium $3.99</a> •
<a href="/privacy" onclick="route(event,'/privacy')" class="underline">Privacy</a> •
<a href="/terms" onclick="route(event,'/terms')" class="underline">Terms</a> •
<a href="/safety" onclick="route(event,'/safety')" class="underline">Safety</a> •
<a href="/about" onclick="route(event,'/about')" class="underline">About</a>
</footer>`

async function checkUser(){
  const path=window.location.pathname.replace(/\/$/,'')
  if(['/terms','/privacy','/safety','/guidelines','/about','/how-it-works','/faqs','/premium','/login','/signin','/signup'].includes(path)){
    if(path==='/premium') return renderPremium()
    if(path==='/login') return renderLogin()
    if(path==='/signin'||path==='/signup') return renderOnboarding()
    return renderStatic(path)
  }
  if(['/profile','/discover','/liked','/chats'].includes(path)) activeTab=path.replace('/','')
  const {data}=await supabase.auth.getSession()
  if(data.session){
    const {data:profile}=await supabase.from('profiles').select('*').eq('id', data.session.user.id).single()
    currentUser=profile||{id:data.session.user.id,email:data.session.user.email,name:data.session.user.email.split('@')[0]}
    userLocation=JSON.parse(localStorage.getItem('kla_location')||'null')
    if(!userLocation) return renderLocationGate()
    renderApp()
  } else {
    if(path==='/login') return renderLogin()
    if(path==='/signin'||path==='/signup') return renderOnboarding()
    if(path==='/premium') return renderPremium()
    renderWelcome()
  }
}

function renderWelcome(){
document.getElementById('app').innerHTML=`
<nav class="bg-black text-white px-6 py-4 flex justify-between items-center sticky top-0 z-20"><div class="font-black tracking-widest">KLA•MEET</div><div class="flex gap-2"><button onclick="route(event,'/login')" class="bg-white text-black px-4 py-1.5 rounded-full text-xs font-bold">Sign In</button><button onclick="route(event,'/signin')" class="bg-yellow-400 text-black px-4 py-1.5 rounded-full text-xs font-bold">Sign Up</button></div></nav>

<section class="px-6 py-8 max-w-6xl mx-auto">
<h1 class="text-5xl font-black leading-[0.9]">Date. Meet.<br>Connect.<br>Worldwide.</h1>
<p class="mt-4 text-sm text-zinc-600 max-w-md leading-6">Real people, real pics, verified ✅ Like is <b>FREE</b>. Chat Premium <b>$3.99 / $6.99 USD</b> via Pesapal LIVE — MTN MoMo, Airtel, Card. No 20k limit. Supabase auth with activation code.</p>

<button onclick="route(event,'/signin')" class="mt-6 bg-yellow-400 px-8 py-3.5 rounded-full font-black">Get Started Free →</button>

<div class="flex gap-2 mt-4 flex-wrap"><button onclick="route(event,'/premium')" class="text-xs bg-black text-white px-5 py-2.5 rounded-full font-bold">View Premium $3.99 →</button><button onclick="route(event,'/how-it-works')" class="text-xs border border-black px-5 py-2.5 rounded-full font-bold">How it Works</button><button onclick="route(event,'/faqs')" class="text-xs underline">FAQs</button></div>

<div class="grid grid-cols-3 gap-3 mt-8 max-w-[360px]">${demo.slice(0,3).map(p=>`<div class="rounded-[18px] overflow-hidden border-2 border-black aspect-[3/4] relative"><img src="${p.img}" class="w-full h-full object-cover"><div class="absolute bottom-0 bg-gradient-to-t from-black/80 to-transparent p-2 w-full"><p class="text-white text-[10px] font-bold">${p.name} • ${p.dist}</p></div></div>`).join('')}</div>

<div class="mt-10 grid grid-cols-2 gap-3 max-w-[360px] text-[12px]">
<div class="bg-yellow-50 border-2 border-yellow-400 rounded-[20px] p-4"><b>✅ Verified</b><p class="mt-1 text-zinc-600">Real pics, no scams. Code via email.</p></div>
<div class="bg-zinc-50 border rounded-[20px] p-4"><b>💛 Like FREE</b><p class="mt-1 text-zinc-600">Swipe & like free. Chat premium.</p></div>
<div class="bg-black text-white rounded-[20px] p-4"><b>📍 Location</b><p class="mt-1 text-zinc-400">Enable to unlock discover /liked /chats</p></div>
<div class="bg-white border-2 border-black rounded-[20px] p-4"><b>💳 Pesapal LIVE</b><p class="mt-1 text-zinc-600">MTN, Airtel, Visa. $3.99 / $6.99 USD</p></div>
</div>
</section>
${footerHTML}`
}

window.toggleEye=(id,btn)=>{
  const inp=document.getElementById(id)
  if(!inp) return
  if(inp.type==='password'){ inp.type='text'; btn.innerText='🙈' } else { inp.type='password'; btn.innerText='👁️' }
}

function renderOnboarding(){
let h= step==1?
`<div class="min-h-screen flex items-center justify-center p-6 bg-white"><div class="w-full max-w-[360px] border-2 border-black rounded-[30px] p-7 bg-white"><h2 class="font-black text-xl text-center">Create Account 💛 /signin</h2><p class="text-[11px] text-center text-zinc-500 mt-1">Real Supabase + activation code + eye 👁️</p><input id="name" placeholder="Full name" class="w-full mt-5 border-2 border-[#EAB308] rounded-xl px-4 py-3 text-sm outline-none focus:border-black"><input id="email" placeholder="Email" class="w-full mt-3 border rounded-xl px-4 py-3 text-sm bg-[#E8F0FE] outline-none"><div class="relative mt-3"><input id="pass" type="password" placeholder="Password min 6" class="w-full border rounded-xl px-4 py-3 pr-12 text-sm bg-[#E8F0FE] outline-none"><button type="button" onclick="toggleEye('pass',this)" class="absolute right-3 top-1/2 -translate-y-1/2 text-lg">👁️</button></div><button onclick="signUp()" class="mt-5 w-full bg-yellow-400 py-3.5 rounded-full font-black">Create + Send Code</button><p class="text-xs text-center mt-3">Already have? <a href="/login" onclick="route(event,'/login')" class="underline font-bold">Login /login</a> • <a href="/premium" onclick="route(event,'/premium')" class="underline">Premium</a></p></div></div>`
:
`<div class="min-h-screen flex items-center justify-center p-6"><div class="w-full max-w-[360px] border rounded-[30px] p-7 text-center bg-white"><div class="text-4xl">📧</div><h2 class="font-black mt-3">Check Email — Code Sent!</h2><p class="text-sm mt-1">Code + link sent to <b>${onboard.email}</b></p><div class="relative mt-4"><input id="otp" type="password" placeholder="6-digit code" class="w-full border-2 border-black rounded-xl px-4 py-3 text-center tracking-[6px] pr-12"><button type="button" onclick="toggleEye('otp',this)" class="absolute right-3 top-1/2 -translate-y-1/2 text-lg">👁️</button></div><button onclick="verifyOtp()" class="mt-3 w-full bg-black text-white py-3.5 rounded-full font-bold">Verify →</button><button onclick="resendCode()" class="mt-3 w-full bg-zinc-100 py-3 rounded-full text-xs">Resend code</button></div></div>`
document.getElementById('app').innerHTML=h+footerHTML
}

function renderLogin(){ renderLoginPage(document.getElementById('app'), footerHTML, onboard) }
window.setLoginMode=(m)=>setLoginModeUI(m, onboard)

function renderLocationGate(){ document.getElementById('app').innerHTML=`<div class="max-w-[430px] mx-auto min-h-screen flex items-center justify-center p-6 bg-white"><div class="w-full border-2 border-black rounded-[32px] p-8 text-center"><div class="w-20 h-20 bg-yellow-400 rounded-full flex items-center justify-center mx-auto text-3xl">📍</div><h2 class="font-black text-2xl mt-5">Enable Location</h2><p class="text-sm text-zinc-600 mt-3">Unlock /discover /profile /liked /chats /premium</p><button onclick="activateLocation()" class="mt-6 w-full bg-black text-white py-4 rounded-full font-black">Activate Location →</button><button onclick="skipLocation()" class="mt-3 w-full bg-zinc-100 py-3 rounded-full text-xs font-bold">Skip (Kampala)</button></div></div>${footerHTML}` }

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
</div>`; renderTab()
}

function renderTab(){
const el=document.getElementById('tabContent')
if(activeTab==='discover'){
 el.innerHTML=`<div class="grid grid-cols-2 gap-3">${demo.map((p,i)=>`<div class="bg-white rounded-[20px] overflow-hidden border"><div class="h-[180px] relative"><img src="${p.img}" class="w-full h-full object-cover"><div class="absolute top-2 left-2 bg-black/70 text-white text-[10px] px-2 py-1 rounded-full">${p.dist} • ${p.city}</div></div><div class="p-2.5"><p class="text-xs font-bold">${p.name}</p><p class="text-[10px] text-zinc-500">${p.bio}</p><div class="flex gap-1.5 mt-2"><button onclick="likeUser(${i})" class="flex-1 bg-black text-white py-2 rounded-full text-[11px] font-bold">Like</button><button onclick="switchTab('chats')" class="flex-1 bg-yellow-400 py-2 rounded-full text-[11px] font-black">Chat</button></div></div></div>`).join('')}</div><button onclick="route(event,'/premium')" class="mt-4 w-full bg-yellow-400 py-3 rounded-full text-xs font-black">Upgrade $3.99 / $6.99 →</button>`
}
if(activeTab==='liked'){ el.innerHTML=`<h2 class="font-black text-xl">Who Liked You</h2><div class="mt-4 text-center bg-zinc-50 p-6 rounded-2xl border"><p class="text-sm">2 people liked you ❤️</p><button onclick="route(event,'/premium')" class="mt-3 bg-yellow-400 px-6 py-2.5 rounded-full text-xs font-black">Unlock Premium $3.99</button></div>` }
if(activeTab==='chats'){ el.innerHTML=`<h2 class="font-black text-xl">Chats</h2><div class="mt-4 bg-yellow-50 border rounded-2xl p-4 text-center"><p class="text-sm font-bold">Chat needs Premium</p><p class="text-xs mt-1 text-zinc-600">Like is FREE, chat $3.99/$6.99 USD LIVE Pesapal</p><button onclick="route(event,'/premium')" class="mt-3 bg-black text-white px-6 py-2.5 rounded-full text-xs font-bold">Get Premium $3.99</button></div>` }
if(activeTab==='profile'){ el.innerHTML=`<h2 class="font-black text-xl">Profile</h2><div class="mt-4 border-2 border-black rounded-[28px] p-6 text-center"><div class="w-20 h-20 bg-yellow-400 rounded-full mx-auto flex items-center justify-center font-black text-xl">${currentUser.name[0]}</div><p class="font-black mt-3">${currentUser.name}</p><p class="text-xs">${currentUser.email} • Verified ✅</p><p class="text-[11px] mt-2 text-zinc-500">City: ${userLocation?.city||'Kampala'}</p><button onclick="logout()" class="w-full mt-4 bg-zinc-100 py-3 rounded-full text-xs font-bold">Logout</button><div class="mt-4 flex gap-2 justify-center text-[11px]"><a href="/privacy" onclick="route(event,'/privacy')" class="underline">Privacy</a><a href="/terms" onclick="route(event,'/terms')" class="underline">Terms</a><a href="/safety" onclick="route(event,'/safety')" class="underline">Safety</a></div></div>` }
}

function renderPremium(){
const logged=!!currentUser
document.getElementById('app').innerHTML=`
<div class="max-w-[430px] mx-auto min-h-screen bg-white">
<div class="p-6 border-b sticky top-0 bg-white z-10 flex justify-between items-center"><a href="/" onclick="route(event,'/')" class="font-black">KLA•MEET</a><button onclick="${logged?'goBack()':'route(event,\'/\')'}" class="text-xs underline">← Back</button></div>
<div class="p-5">
<h2 class="font-black text-3xl">Premium</h2><p class="text-xs mt-1 text-zinc-600">kla-meet.vercel.app/premium/ • USD pricing LIVE - Pesapal (No 20k limit)</p>
<div class="mt-2 text-[11px] bg-green-50 border border-green-200 rounded-xl p-3">✅ <b>LIVE Pesapal USD:</b> MTN MoMo, Airtel, Card. Min $1, so $3.99 / $6.99 works! No 20k UGX block.</div>

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

<div class="mt-6 text-[11px] text-zinc-500 text-center">Secure by Pesapal. <a href="/terms" onclick="route(event,'/terms')" class="underline">Terms</a> • <a href="/privacy" onclick="route(event,'/privacy')" class="underline">Privacy</a> • <a href="/safety" onclick="route(event,'/safety')" class="underline">Safety</a></div>
</div>
${footerHTML}
</div>`
}

function renderStatic(path){
  let title='', body=''
  if(path==='/how-it-works'){ title='How it Works'; body=`<div class="space-y-4"><p><b>1. Sign up /signin</b> — Create account with activation code sent to email (real Supabase OTP + link).</p><p><b>2. Enable Location</b> — Unlock /discover /profile /liked /chats /premium. Skip = Kampala default.</p><p><b>3. Like FREE, Chat Premium</b> — Like is FREE. Chat needs Premium $3.99 BASIC (10 chats/day) or $6.99 STANDARD (unlimited + video 30min). USD pricing avoids Pesapal 20k UGX min.</p><p><b>4. Verified</b> — Real pics, eye 👁️ to see password.</p></div>`}
  if(path==='/faqs'){ title='FAQs'; body=`<div class="space-y-3"><p><b>Why USD $3.99?</b> Pesapal UGX min is 20,000 UGX. USD min is $1, so $3.99 works. That's ≈15k UGX but allowed because it's USD.</p><p><b>Is Like free?</b> Yes, Like is FREE. Chat is Premium.</p><p><b>Activation code?</b> Real Supabase — 6-digit code + magic link sent to email. Eye 👁️ to see password.</p><p><b>Login vs Signin?</b> /signin = create account, /login = sign in with password OR activation code.</p></div>`}
  if(path==='/terms'){ title='Terms'; body=`<p>18+ only. Premium $3.99/$6.99 USD via Pesapal LIVE. MTN MoMo, Airtel, Card accepted. No refunds after chat use.</p>`}
  if(path==='/privacy'){ title='Privacy'; body=`<p>We store email, name, city only. Location lat/lng stored locally in localStorage + city in profile. No tracking.</p>`}
  if(path==='/safety'){ title='Safety'; body=`<p>Meet in public, tell a friend, verify profile. KLA-MEET Kampala. Report abuse via profile.</p>`}
  if(path==='/guidelines'){ title='Community Guidelines'; body=`<p>Be kind, be real, 18+ only, no scams, no nudes. Verified profiles only.</p>`}
  if(path==='/about'){ title='About KLA-MEET'; body=`<p><b>Keep Love Alive 💛</b> — Dating app for Uganda + Worldwide. Built in Kampala. Real Supabase auth, Pesapal LIVE payments.</p><p class="mt-3"><b>Subfolders:</b> /signin /login /premium /how-it-works /faqs /privacy /terms /safety /about /guidelines</p>`}
  document.getElementById('app').innerHTML=`<div class="max-w-3xl mx-auto min-h-screen bg-white"><div class="p-6 border-b flex justify-between items-center sticky top-0 bg-white"><a href="/" onclick="route(event,'/')" class="font-black">KLA•MEET</a><a href="/" onclick="route(event,'/')" class="text-xs underline">← Home</a></div><div class="p-6"><h1 class="text-3xl font-black">${title}</h1><div class="mt-6 text-sm leading-6">${body}</div><div class="mt-8 flex gap-2"><a href="/signin" onclick="route(event,'/signin')" class="bg-yellow-400 px-6 py-3 rounded-full font-black text-sm">Sign Up /signin</a><a href="/login" onclick="route(event,'/login')" class="bg-black text-white px-6 py-3 rounded-full font-bold text-sm">Sign In /login</a></div></div>${footerHTML}</div>`
}

window.activateLocation=()=>{
  if(!navigator.geolocation) return alert('No geolocation')
  const btn=event?.target; if(btn) btn.innerText='Getting...'
  navigator.geolocation.getCurrentPosition(async pos=>{
    const loc={lat:pos.coords.latitude, lng:pos.coords.longitude, city:'Kampala'}
    localStorage.setItem('kla_location', JSON.stringify(loc))
    userLocation=loc
    activeTab='discover'; window.history.pushState({},'','/discover'); renderApp()
  }, err=>{ alert(err.message); if(btn) btn.innerText='Activate Location →' })
}
window.skipLocation=()=>{ const loc={lat:0.3476, lng:32.5825, city:'Kampala'}; localStorage.setItem('kla_location', JSON.stringify(loc)); userLocation=loc; activeTab='discover'; window.history.pushState({},'','/discover'); renderApp() }
window.switchTab=(tab)=>{ activeTab=tab; window.history.pushState({},'','/'+tab); renderApp() }
window.goBack=()=>renderApp()
window.route=(e,path)=>{ if(e) e.preventDefault(); window.history.pushState({},'',path); const p=path.replace(/\/$/,''); if(['/terms','/privacy','/safety','/guidelines','/about','/how-it-works','/faqs','/premium','/login','/signin','/signup'].includes(p)){ if(p==='/premium') renderPremium(); else if(p==='/login') renderLogin(); else if(p==='/signin'||p==='/signup') renderOnboarding(); else renderStatic(p) } else if(p===''||p==='/') checkUser(); else { activeTab=p.replace('/',''); renderApp() } }
window.addEventListener('popstate',()=>{ const p=window.location.pathname.replace(/\/$/,''); if(['/terms','/privacy','/safety','/guidelines','/about','/how-it-works','/faqs','/premium','/login','/signin','/signup'].includes(p)){ if(p==='/premium') renderPremium(); else if(p==='/login') renderLogin(); else if(p==='/signin'||p==='/signup') renderOnboarding(); else renderStatic(p) } else checkUser() })

window.signUp=async()=>{
const name=document.getElementById('name').value.trim()
const email=document.getElementById('email').value.trim()
const pass=document.ge