import './style.css'
import { supabase } from './lib/supabase.js'
import { renderLoginPage, setLoginModeUI } from './pages/login.js'

let currentUser=null, userLocation=null, activeTab='discover', step=1
let onboard={name:'', email:'', pass:'', loginMode:'password'}
const demo=[
{name:"Amina, 24", city:"Kampala", img:"https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=400&h=500&fit=crop", dist:"2km"},
{name:"David, 26", city:"Nairobi", img:"https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=500&fit=crop", dist:"5km"},
{name:"Sophie, 23", city:"London", img:"https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=500&fit=crop", dist:"Worldwide"},
]
const footer=`<footer class="bg-black text-zinc-400 text-[11px] text-center py-6 mt-12"><a href="/about/">About</a> • <a href="/how-it-works/">How</a> • <a href="/faqs/">FAQs</a> • <a href="/signin/" class="font-bold">/signin</a> • <a href="/login/" class="font-bold">/login</a> • <a href="/premium/">Premium</a> • <a href="/privacy/">Privacy</a> • <a href="/terms/">Terms</a> • <a href="/safety/">Safety</a></footer>`

async function checkUser(){
  const p=location.pathname.replace(/\/$/,'')
  if(['/premium','/login','/signin','/signup'].includes(p)){
    if(p==='/premium') return renderPremium()
    if(p==='/login') return renderLogin()
    return renderOnboarding()
  }
  if(['/discover','/profile','/liked','/chats'].includes(p)) activeTab=p.slice(1)
  const {data}=await supabase.auth.getSession()
  if(data.session){
    const {data:prof}=await supabase.from('profiles').select('*').eq('id',data.session.user.id).single()
    currentUser=prof||{id:data.session.user.id,email:data.session.user.email,name:data.session.user.email.split('@')[0]}
    userLocation=JSON.parse(localStorage.getItem('kla_location')||'null')
    if(!userLocation) return renderGate()
    if(p==='/login'||p==='/signin'){ history.replaceState({},'','/discover'); activeTab='discover' }
    return renderApp()
  }
  if(p==='/login') return renderLogin()
  if(p==='/signin') return renderOnboarding()
  if(p==='/premium') return renderPremium()
  renderWelcome()
}

function renderWelcome(){
document.getElementById('app').innerHTML=`<nav class="bg-black text-white px-6 py-4 flex justify-between"><div class="font-black">KLA•MEET</div><div class="flex gap-2"><a href="/login/" class="bg-white text-black px-4 py-1.5 rounded-full text-xs font-bold">Sign In</a><a href="/signin/" class="bg-yellow-400 text-black px-4 py-1.5 rounded-full text-xs font-bold">Sign Up</a></div></nav><section class="px-6 py-8"><h1 class="text-5xl font-black leading-[0.9]">Date. Meet.<br>Connect.</h1><p class="mt-4 text-sm text-zinc-600 max-w-md">Real people verified ✅ Like FREE, Chat Premium $3.99/$6.99 USD LIVE Pesapal. Supabase code + eye 👁️</p><a href="/signin/" class="mt-6 inline-block bg-yellow-400 px-8 py-3.5 rounded-full font-black">Get Started →</a><div class="grid grid-cols-3 gap-3 mt-8 max-w-[360px]">${demo.map(d=>`<div class="rounded-[18px] overflow-hidden border-2 border-black aspect-[3/4]"><img src="${d.img}" class="w-full h-full object-cover"></div>`).join('')}</div></section>${footer}`
}

window.toggleEye=(id,btn)=>{const i=document.getElementById(id); if(i.type==='password'){i.type='text';btn.innerText='🙈'}else{i.type='password';btn.innerText='👁️'}}

function renderOnboarding(){
let h=step==1?`<div class="min-h-screen flex items-center justify-center p-6 bg-white"><div class="w-full max-w-[360px] border-2 border-black rounded-[30px] p-7"><h2 class="font-black text-xl text-center">Create /signin</h2><input id="name" placeholder="Full name" class="w-full mt-5 border-2 border-yellow-400 rounded-xl px-4 py-3 text-sm"><input id="email" placeholder="Email" class="w-full mt-3 border rounded-xl px-4 py-3 text-sm bg-[#E8F0FE]"><div class="relative mt-3"><input id="pass" type="password" placeholder="Password" class="w-full border rounded-xl px-4 py-3 pr-12 text-sm bg-[#E8F0FE]"><button onclick="toggleEye('pass',this)" class="absolute right-3 top-1/2 -translate-y-1/2">👁️</button></div><button onclick="signUp()" class="mt-5 w-full bg-yellow-400 py-3.5 rounded-full font-black">Create + Send Code</button><p class="text-xs text-center mt-3"><a href="/login/" class="underline font-bold">Login /login</a></p></div></div>`: `<div class="min-h-screen flex items-center justify-center p-6"><div class="w-full max-w-[360px] border rounded-[30px] p-7 text-center"><h2 class="font-black">Code sent to ${onboard.email}</h2><div class="relative mt-4"><input id="otp" type="password" placeholder="6-digit" class="w-full border-2 border-black rounded-xl px-4 py-3 text-center tracking-[6px] pr-12"><button onclick="toggleEye('otp',this)" class="absolute right-3 top-1/2 -translate-y-1/2">👁️</button></div><button onclick="verifyOtp()" class="mt-3 w-full bg-black text-white py-3.5 rounded-full font-bold">Verify</button></div></div>`
document.getElementById('app').innerHTML=h+footer
}
function renderLogin(){ renderLoginPage(document.getElementById('app'), footer, onboard) }
window.setLoginMode=(m)=>setLoginModeUI(m,onboard)
function renderGate(){document.getElementById('app').innerHTML=`<div class="max-w-[430px] mx-auto min-h-screen flex items-center justify-center p-6"><div class="w-full border-2 border-black rounded-[32px] p-8 text-center"><div class="w-20 h-20 bg-yellow-400 rounded-full flex items-center justify-center mx-auto text-3xl">📍</div><h2 class="font-black text-2xl mt-5">Enable Location</h2><button onclick="activateLocation()" class="mt-6 w-full bg-black text-white py-4 rounded-full font-black">Activate</button><button onclick="skipLoc()" class="mt-3 w-full bg-zinc-100 py-3 rounded-full text-xs">Skip Kampala</button></div></div>${footer}`}
function renderApp(){document.getElementById('app').innerHTML=`<div class="max-w-[430px] mx-auto min-h-screen pb-24 bg-white"><header class="p-5 flex justify-between border-b"><h1 class="font-black">KLA•MEET</h1><span class="text-xs">Hi ${currentUser.name} • <a href="#" onclick="logout()" class="underline">Logout</a></span></header><div id="tab" class="p-3"></div><nav class="fixed bottom-0 left-0 right-0 bg-white border-t flex justify-around p-3.5 max-w-[430px] mx-auto text-[11px]"><button onclick="switchTab('discover')">Discover</button><button onclick="switchTab('profile')">Profile</button><button onclick="route(event,'/premium')" class="font-bold">Premium</button></nav>${footer}</div>`; renderTab()}
function renderTab(){const el=document.getElementById('tab'); if(activeTab==='discover') el.innerHTML=`<div class="grid grid-cols-2 gap-3">${demo.map(p=>`<div class="rounded-[20px] overflow-hidden border"><img src="${p.img}" class="h-[180px] w-full object-cover"><div class="p-2 text-xs font-bold">${p.name}</div></div>`).join('')}</div>`; if(activeTab==='profile') el.innerHTML=`<h2 class="font-black">Profile ${currentUser.email} ✅</h2>`}
function renderPremium(){document.getElementById('app').innerHTML=`<div class="max-w-[430px] mx-auto bg-white min-h-screen"><div class="p-6 border-b flex justify-between"><b>KLA•MEET</b><a href="/" class="text-xs underline">← Back</a></div><div class="p-5"><h2 class="font-black text-3xl">Premium $3.99/$6.99 LIVE</h2><button onclick="payLive(3.99,'BASIC')" class="mt-4 w-full bg-black text-white py-3.5 rounded-full font-bold">Pay $3.99 →</button><button onclick="payLive(6.99,'STANDARD')" class="mt-4 w-full bg-yellow-400 py-3.5 rounded-full font-black">Pay $6.99 →</button></div>${footer}</div>`}

window.activateLocation=()=>navigator.geolocation.getCurrentPosition(p=>{const l={lat:p.coords.latitude,lng:p.coords.longitude,city:'Kampala'}; localStorage.setItem('kla_location',JSON.stringify(l)); userLocation=l; history.pushState({},'','/discover'); renderApp()})
window.skipLoc=()=>{const l={lat:0.3476,lng:32.5825,city:'Kampala'}; localStorage.setItem('kla_location',JSON.stringify(l)); userLocation=l; history.pushState({},'','/discover'); renderApp()}
window.switchTab=t=>{activeTab=t; history.pushState({},'','/'+t); renderApp()}
window.route=(e,path)=>{if(e)e.preventDefault(); const p=path.replace(/\/$/,''); if(['/premium','/login','/signin','/signup'].includes(p)){ history.pushState({},'',path); if(p==='/premium')renderPremium(); else if(p==='/login')renderLogin(); else renderOnboarding(); } else { location.href=path } }
window.addEventListener('popstate',checkUser)

window.signUp=async()=>{const n=document.getElementById('name').value.trim(),e=document.getElementById('email').value.trim(),p=document.getElementById('pass').value.trim(); if(!n||!e||!p)return alert('fill'); onboard={name:n,email:e,pass:p,loginMode:'code'}; const {data,error}=await supabase.auth.signUp({email:e,password:p,options:{data:{name:n}, emailRedirectTo:`https://${location.host}/api/auth-callback`}}); if(error)return alert(error.message); if(data.user&&!data.session){step=2; renderOnboarding()} else renderGate()}
window.verifyOtp=async()=>{const t=document.getElementById('otp').value.trim(); const {data,error}=await supabase.auth.verifyOtp({email:onboard.email,token:t,type:'signup'}); if(error)return alert(error.message); await supabase.from('profiles').insert([{id:data.user.id,name:onboard.name,email:onboard.email,city:'Kampala'}]); currentUser={id:data.user.id,name:onboard.name,email:onboard.email}; renderGate()}
window.doLogin=async()=>{const e=document.getElementById('email').value.trim(),p=document.getElementById('pass').value.trim(); const {data,error}=await supabase.auth.signInWithPassword({email:e,password:p}); if(error)return alert(error.message); location.href='/discover/'}
window.sendMagicLink=async()=>{const e=document.getElementById('email').value.trim(); if(!e)return alert('email'); const {error}=await supabase.auth.signInWithOtp({email:e,options:{emailRedirectTo:`https://${location.host}/discover/`}}); if(error)return alert(error.message); alert('Code sent to '+e); onboard.email=e; setLoginModeUI('code',onboard)}
window.verifyOtpLogin=async()=>{const e=document.getElementById('email').value.trim(),t=document.getElementById('otp').value.trim(); const {data,error}=await supabase.auth.verifyOtp({email:e,token:t,type:'email'}); if(error)return alert(error.message); location.href='/discover/'}
window.logout=async()=>{await supabase.auth.signOut(); localStorage.removeItem('kla_location'); location.href='/'}
window.payLive=async(a,pl)=>{const r=await fetch('/api/pesapal-order',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({amount:a,plan:pl,currency:'USD',email:currentUser?.email})}); const d=await r.json(); if(d.redirect_url)location.href=d.redirect_url; else if(d.order_tracking_id)location.href=`https://pay.pesapal.com/iframe/PesapalIframe3/Index?OrderTrackingId=${d.order_tracking_id}`; else alert(JSON.stringify(d).slice(0,400))}
checkUser()