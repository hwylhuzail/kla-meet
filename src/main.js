import './style.css'
import { supabase } from './lib/supabase.js'

let currentUser = null
let userLocation = null
let activeTab = 'discover'
let step=1, onboard={name:'', email:'', pass:'', loginMode:'password'}

const demo=[
{name:"Amina, 24", city:"Kampala", img:"https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=400&h=500&fit=crop", dist:"2km"},
{name:"David, 26", city:"Nairobi", img:"https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=500&fit=crop", dist:"5km"},
{name:"Sophie, 23", city:"London", img:"https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=500&fit=crop", dist:"Worldwide"},
{name:"Brian, 27", city:"Kampala", img:"https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=500&fit=crop", dist:"1km"},
]

const footerHTML = `<footer class="bg-black text-zinc-400 text-[11px] text-center py-6 mt-12 leading-7 px-4">
© 2026 KLA-MEET • <a href="/login" onclick="route(event,'/login')" class="hover:text-yellow-400 underline font-bold">Login</a> •
<a href="/premium" onclick="route(event,'/premium')" class="hover:text-yellow-400 underline font-bold">Premium $3.99</a> •
<a href="/how-it-works" onclick="route(event,'/how-it-works')" class="underline">How it Works</a> •
<a href="/faqs" onclick="route(event,'/faqs')" class="underline">FAQs</a>
</footer>`

async function checkUser(){
  const path = window.location.pathname.replace(/\/$/,'')
  if(['/terms','/privacy','/safety','/guidelines','/about','/how-it-works','/faqs','/premium','/login'].includes(path)){
    if(path==='/premium') return renderPremium()
    if(path==='/login') return renderLogin()
    return renderStatic(path)
  }
  if(['/profile','/discover','/liked','/chats'].includes(path)) activeTab = path.replace('/','')
  const { data } = await supabase.auth.getSession()
  if(data.session){
    const { data: profile } = await supabase.from('profiles').select('*').eq('id', data.session.user.id).single()
    currentUser = profile || { id: data.session.user.id, email: data.session.user.email, name: data.session.user.email.split('@')[0] }
    userLocation = JSON.parse(localStorage.getItem('kla_location')||'null')
    if(!userLocation) return renderLocationGate()
    if(path==='/login'){ window.history.replaceState({},'','/discover'); activeTab='discover' }
    renderApp()
  } else {
    if(path==='/login') return renderLogin()
    if(path==='/premium') return renderPremium()
    renderWelcome()
  }
}

function renderWelcome(){
document.getElementById('app').innerHTML=`
<nav class="bg-black text-white px-6 py-4 flex justify-between items-center sticky top-0 z-20"><div class="font-black">KLA•MEET</div><button onclick="route(event,'/login')" class="bg-yellow-400 text-black px-5 py-1.5 rounded-full font-bold text-sm">Log in</button></nav>
<section class="px-6 py-8 max-w-6xl mx-auto">
<h1 class="text-5xl font-black leading-[0.9]">Date. Meet.<br>Connect.</h1>
<p class="mt-4 text-sm text-zinc-600 max-w-md">Login via activation code/link — real Supabase. Premium <b>$3.99 / $6.99 USD</b> LIVE.</p>
<button onclick="renderOnboarding()" class="mt-6 bg-yellow-400 px-8 py-3.5 rounded-full font-black">Get Started Free →</button>
<div class="flex gap-2 mt-4"><button onclick="route(event,'/login')" class="text-xs bg-black text-white px-4 py-2 rounded-full">Login /login</button><button onclick="route(event,'/premium')" class="text-xs bg-yellow-400 px-4 py-2 rounded-full font-bold">Premium $3.99</button></div>
</section>${footerHTML}`
}

function renderOnboarding(){
let h=''
if(step==1) h=`<div class="min-h-screen flex items-center justify-center p-6"><div class="w-full max-w-[360px] border-2 border-black rounded-[30px] p-7 bg-white"><h2 class="font-black text-xl text-center">Create Account 💛</h2><input id="name" placeholder="Full name" class="w-full mt-5 border-2 border-black rounded-xl px-4 py-3 text-sm"><input id="email" placeholder="Email" class="w-full mt-3 border rounded-xl px-4 py-3 text-sm"><input id="pass" type="password" placeholder="Password min 6" class="w-full mt-3 border rounded-xl px-4 py-3 text-sm"><button onclick="signUp()" class="mt-5 w-full bg-yellow-400 py-3.5 rounded-full font-black">Create + Send Activation Code</button><p class="text-xs text-center mt-3">Already have account? <a href="/login" onclick="route(event,'/login')" class="underline font-bold">Login /login</a></p></div></div>`
if(step==2) h=`<div class="min-h-screen flex items-center justify-center p-6"><div class="w-full max-w-[360px] border rounded-[30px] p-7 text-center bg-white"><div class="text-4xl">📧</div><h2 class="font-black mt-3">Check Email — Activation Code Sent!</h2><p class="text-sm mt-2">We sent 6-digit code + link to <b>${onboard.email}</b></p><input id="otp" placeholder="Enter 6-digit code" class="w-full mt-4 border-2 border-black rounded-xl px-4 py-3 text-center tracking-[6px]"><button onclick="verifyOtp()" class="mt-3 w-full bg-black text-white py-3.5 rounded-full font-bold">Verify Code →</button><button onclick="resendCode()" class="mt-3 w-full bg-zinc-100 py-3 rounded-full text-xs">Resend code</button><p class="text-[10px] mt-3 text-zinc-500">Link valid 1 hour. Check spam.</p></div></div>`
document.getElementById('app').innerHTML=h + footerHTML
}

function renderLogin(){
document.getElementById('app').innerHTML=`
<div class="min-h-screen flex flex-col bg-white">
<div class="p-6 flex justify-between items-center border-b"><a href="/" onclick="route(event,'/')" class="font-black text-xl">KLA•MEET</a><a href="/" onclick="route(event,'/')" class="text-xs underline">← Home</a></div>
<div class="flex-1 flex items-center justify-center p-6">
<div class="w-full max-w-[360px] border-2 border-black rounded-[30px] p-8">
<h2 class="font-black text-2xl">Log in /login</h2>
<p class="text-[11px] text-zinc-500 mt-1">Real Supabase activation code/link</p>

<div class="flex gap-2 mt-5">
<button onclick="setLoginMode('password')" id="tab-pass" class="flex-1 py-2.5 rounded-full text-xs font-black bg-black text-white">Password</button>
<button onclick="setLoginMode('code')" id="tab-code" class="flex-1 py-2.5 rounded-full text-xs font-bold bg-zinc-100">Activation Code</button>
</div>

<div id="login-form" class="mt-6"></div>

<div class="mt-6 text-center text-[11px]"><p>Don't have account? <a href="/" onclick="route(event,'/'); setTimeout(()=>renderOnboarding(),100)" class="underline font-bold">Sign up free</a></p><p class="mt-2"><a href="/premium" onclick="route(event,'/premium')" class="underline">Premium $3.99 →</a></p></div>
</div>
</div>
${footerHTML}
</div>`
setLoginMode(onboard.loginMode)
}

window.setLoginMode=(mode)=>{
  onboard.loginMode=mode
  const passBtn=document.getElementById('tab-pass')
  const codeBtn=document.getElementById('tab-code')
  if(passBtn){ passBtn.className= mode==='password'? 'flex-1 py-2.5 rounded-full text-xs font-black bg-black text-white' : 'flex-1 py-2.5 rounded-full text-xs font-bold bg-zinc-100' }
  if(codeBtn){ codeBtn.className= mode==='code'? 'flex-1 py-2.5 rounded-full text-xs font-black bg-black text-white' : 'flex-1 py-2.5 rounded-full text-xs font-bold bg-zinc-100' }
  const el=document.getElementById('login-form')
  if(!el) return
  if(mode==='password'){
    el.innerHTML=`
    <input id="email" placeholder="Email" class="w-full border-2 border-black rounded-xl px-4 py-3 text-sm">
    <input id="pass" type="password" placeholder="Password" class="w-full mt-3 border rounded-xl px-4 py-3 text-sm">
    <button onclick="doLogin()" class="mt-4 w-full bg-yellow-400 py-3.5 rounded-full font-black">Log in with Password</button>
    <button onclick="sendMagicLink()" class="mt-3 w-full bg-zinc-100 py-3 rounded-full text-xs font-bold">Send activation code/link instead →</button>
    `
  } else {
    el.innerHTML=`
    <input id="email" placeholder="Email" class="w-full border-2 border-black rounded-xl px-4 py-3 text-sm">
    <p class="text-[11px] mt-2 text-zinc-500">We'll send 6-digit code to your email (real Supabase OTP)</p>
    <button onclick="sendMagicLink()" class="mt-3 w-full bg-yellow-400 py-3.5 rounded-full font-black">Send Activation Code →</button>
    <div class="mt-5 border-t pt-5">
    <input id="otp" placeholder="Enter 6-digit code from email" class="w-full border-2 border-black rounded-xl px-4 py-3 text-center tracking-[6px] text-sm">
    <button onclick="verifyOtpLogin()" class="mt-3 w-full bg-black text-white py-3.5 rounded-full font-bold">Verify & Login</button>
    </div>
    `
  }
}

function renderLocationGate(){
document.getElementById('app').innerHTML=`<div class="max-w-[430px] mx-auto min-h-screen flex items-center justify-center p-6 bg-white"><div class="w-full border-2 border-black rounded-[32px] p-8 text-center"><div class="w-20 h-20 bg-yellow-400 rounded-full flex items-center justify-center mx-auto text-3xl">📍</div><h2 class="font-black text-2xl mt-5">Enable Location</h2><p class="text-sm text-zinc-600 mt-3">Unlock /discover /liked /chats /profile /premium</p><button onclick="activateLocation()" class="mt-6 w-full bg-black text-white py-4 rounded-full font-black">Activate →</button></div></div>${footerHTML}`
}
function renderApp(){
document.getElementById('app').innerHTML=`
<div class="max-w-[430px] mx-auto min-h-screen pb-24 bg-white">
<header class="p-5 flex justify-between items-center border-b sticky top-0 bg-white z-10"><h1 class="font-black">KLA•MEET</h1><span class="text-xs">Hi, ${currentUser.name} • <a href="#" onclick="logout()" class="underline">Logout</a></span></header>
<div id="tabContent" class="p-3"></div>
<nav class="fixed bottom-0 left-0 right-0 bg-white border-t flex justify-around p-3.5 max-w-[430px] mx-auto text-[11px] z-20">
<button onclick="switchTab('discover')" class="${activeTab==='discover'?'font-black':'text-zinc-400'}">Discover</button>
<button onclick="switchTab('liked')" class="text-zinc-400">Liked</button>
<button onclick="switchTab('chats')" class="text-zinc-400">Chats</button>
<button onclick="route(event,'/premium')" class="text-zinc-400 font-bold">Premium</button>
<button onclick="switchTab('profile')" class="${activeTab==='profile'?'font-black':'text-zinc-400'}">Profile</button>
</nav>
${footerHTML}
</div>`; renderTab()
}
function renderTab(){
const el=document.getElementById('tabContent')
if(activeTab==='discover') el.innerHTML=`<div class="grid grid-cols-2 gap-3">${demo.map(p=>`<div class="rounded-[20px] overflow-hidden border"><img src="${p.img}" class="w-full h-[180px] object-cover"><div class="p-2 text-xs font-bold">${p.name} • ${p.dist}</div></div>`).join('')}</div><button onclick="route(event,'/premium')" class="mt-4 w-full bg-yellow-400 py-3 rounded-full text-xs font-black">Upgrade $3.99 →</button>`
if(activeTab==='liked') el.innerHTML=`<h2 class="font-black text-xl">Who Liked You</h2><p class="text-xs">Login verified ✅</p>`
if(activeTab==='chats') el.innerHTML=`<h2 class="font-black text-xl">Chats</h2><button onclick="route(event,'/premium')" class="mt-3 bg-black text-white px-6 py-2 rounded-full text-xs">Premium $3.99</button>`
if(activeTab==='profile') el.innerHTML=`<h2 class="font-black text-xl">Profile</h2><p class="text-sm mt-2">${currentUser.email} • Verified ✅</p><button onclick="logout()" class="mt-4 bg-zinc-100 py-3 w-full rounded-full text-xs">Logout</button>`
}
function renderPremium(){
const logged=!!currentUser
document.getElementById('app').innerHTML=`
<div class="max-w-[430px] mx-auto min-h-screen bg-white"><div class="p-6 border-b flex justify-between"><b>KLA•MEET</b><button onclick="${logged?'goBack()':'route(event,\'/\')'}" class="text-xs underline">← Back</button></div><div class="p-5"><h2 class="font-black text-3xl">Premium</h2><p class="text-xs">/premium/ • $3.99/$6.99 USD LIVE</p><div class="mt-6 space-y-3"><div class="border rounded-[24px] p-5"><b>BASIC $3.99</b><button onclick="payLive(3.99,'BASIC')" class="mt-3 w-full bg-black text-white py-3.5 rounded-full font-bold">Pay $3.99 LIVE →</button></div><div class="border-2 border-yellow-400 bg-yellow-50 rounded-[24px] p-5"><b>STANDARD $6.99</b><button onclick="payLive(6.99,'STANDARD')" class="mt-3 w-full bg-yellow-400 py-3.5 rounded-full font-black">Pay $6.99 LIVE →</button></div></div></div>${footerHTML}</div>`
}
function renderStatic(p){ document.getElementById('app').innerHTML=`<div class="max-w-3xl mx-auto p-6"><a href="/" onclick="route(event,'/')" class="font-black">KLA•MEET</a><h1 class="text-3xl font-black mt-8">${p}</h1><a href="/" class="mt-8 inline-block bg-yellow-400 px-6 py-3 rounded-full font-bold">Back</a>${footerHTML}</div>` }

window.activateLocation=()=>{
  navigator.geolocation.getCurrentPosition(pos=>{
    const loc={lat:pos.coords.latitude,lng:pos.coords.longitude,city:'Kampala'}
    localStorage.setItem('kla_location', JSON.stringify(loc)); userLocation=loc; activeTab='discover'; window.history.pushState({},'','/discover'); renderApp()
  })
}
window.switchTab=(t)=>{ activeTab=t; window.history.pushState({},'','/'+t); renderApp() }
window.goBack=()=>renderApp()
window.route=(e,path)=>{ if(e) e.preventDefault(); window.history.pushState({},'',path); const p=path.replace(/\/$/,''); if(['/terms','/privacy','/safety','/guidelines','/about','/how-it-works','/faqs','/premium','/login'].includes(p)){ if(p==='/premium') renderPremium(); else if(p==='/login') renderLogin(); else renderStatic(p) } else if(p===''||p==='/') checkUser(); else { activeTab=p.replace('/',''); renderApp() } }
window.addEventListener('popstate',()=>{ const p=window.location.pathname.replace(/\/$/,''); if(['/terms','/privacy','/safety','/guidelines','/about','/how-it-works','/faqs','/premium','/login'].includes(p)){ if(p==='/premium') renderPremium(); else if(p==='/login') renderLogin(); else renderStatic(p) } else checkUser() })

window.signUp=async()=>{
  const name=document.getElementById('name').value.trim()
  const email=document.getElementById('email').value.trim()
  const pass=document.getElementById('pass').value.trim()
  if(!name||!email||!pass) return alert('Fill all')
  if(pass.length<6) return alert('Password min 6')
  onboard={name, email, pass, loginMode:'code'}
  const btn=event.target; btn.innerText='Sending activation code...'
  const {data, error}=await supabase.auth.signUp({email, password:pass, options:{data:{name}, emailRedirectTo:`https://${window.location.host}/api/auth-callback`}})
  if(error){ alert(error.message); btn.innerText='Create'; return }
  if(data.user &&!data.session){
    step=2; renderOnboarding() // needs email confirmation
  } else if(data.session){
    await supabase.from('profiles').insert([{id:data.user.id, name, email, city:'Kampala'}])
    currentUser={id:data.user.id, name, email}
    renderLocationGate()
  }
}
window.verifyOtp=async()=>{
  const token=document.getElementById('otp').value.trim()
  if(!token) return alert('Enter code')
  const {data, error}=await supabase.auth.verifyOtp({email:onboard.email, token, type:'signup'})
  if(error) return alert('Invalid code: '+error.message)
  await supabase.from('profiles').insert([{id:data.user.id, name:onboard.name, email:onboard.email, city:'Kampala'}])
  currentUser={id:data.user.id, name:onboard.name, email:onboard.email}
  renderLocationGate()
}
window.resendCode=async()=>{
  await supabase.auth.resend({type:'signup', email:onboard.email, options:{emailRedirectTo:`https://${window.location.host}/api/auth-callback`}})
  alert('Code resent to '+onboard.email)
}
window.doLogin=async()=>{
  const email=document.getElementById('email')?.value.trim()
  const pass=document.getElementById('pass')?.value.trim()
  if(!email||!pass) return alert('Fill all')
  const {data, error}=await supabase.auth.signInWithPassword({email, password:pass})
  if(error) return alert(error.message)
  currentUser={id:data.user.id, email, name:email.split('@')[0]}
  const loc=JSON.parse(localStorage.getItem('kla_location')||'null')
  if(!loc) renderLocationGate(); else {activeTab='discover'; window.history.pushState({},'','/discover'); renderApp()}
}
window.sendMagicLink=async()=>{
  const email=document.getElementById('email').value.trim()
  if(!email) return alert('Enter email')
  onboard.email=email
  const btn=event.target; const old=btn.innerText; btn.innerText='Sending code...'
  const {error}=await supabase.auth.signInWithOtp({email, options:{emailRedirectTo:`https://${window.location.host}/discover`, shouldCreateUser:false}})
  if(error){ alert(error.message); btn.innerText=old; return }
  alert('Activation code/link sent to '+email+' — check email (code + link) — real Supabase')
  btn.innerText=old
  onboard.loginMode='code'
  setLoginMode('code')
  document.getElementById('email').value=email
}
window.verifyOtpLogin=async()=>{
  const email=document.getElementById('email').value.trim()
  const token=document.getElementById('otp').value.trim()
  if(!email||!token) return alert('Fill email & code')
  const {data, error}=await supabase.auth.verifyOtp({email, token, type:'email'})
  if(error) return alert('Invalid code: '+error.message)
  currentUser={id:data.user.id, email, name:email.split('@')[0]}
  const loc=JSON.parse(localStorage.getItem('kla_location')||'null')
  if(!loc) renderLocationGate(); else {activeTab='discover'; window.history.pushState({},'','/discover'); renderApp()}
}
window.logout=async()=>{ await supabase.auth.signOut(); localStorage.removeItem('kla_location'); location.href='/' }
window.payLive=async(amount,plan)=>{
  const btn=event.target; const old=btn.innerText; btn.innerText=`Paying $${amount}...`
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

checkUser()