import './style.css'
import { supabase } from './lib/supabase.js'
import { renderLoginPage, setLoginModeUI } from './pages/login.js'

let currentUser = null
let userLocation = null
let activeTab = 'discover'
let step=1, onboard={name:'', email:'', pass:'', loginMode:'password'}

const demo=[{name:"Amina, 24", city:"Kampala", img:"https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=400&h=500&fit=crop", dist:"2km"}, {name:"David, 26", city:"Nairobi", img:"https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=500&fit=crop", dist:"5km"}]

const footerHTML=`<footer class="bg-black text-zinc-400 text-[11px] text-center py-6 mt-12">© KLA-MEET • <a href="/signin" onclick="route(event,'/signin')" class="underline font-bold">/signin</a> • <a href="/login" onclick="route(event,'/login')" class="underline font-bold">/login</a> • <a href="/premium" onclick="route(event,'/premium')" class="underline">Premium</a></footer>`

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
document.getElementById('app').innerHTML=`<nav class="bg-black text-white px-6 py-4 flex justify-between"><div class="font-black">KLA•MEET</div><div class="flex gap-2"><button onclick="route(event,'/login')" class="bg-white text-black px-4 py-1.5 rounded-full text-xs font-bold">Sign In</button><button onclick="route(event,'/signin')" class="bg-yellow-400 text-black px-4 py-1.5 rounded-full text-xs font-bold">Sign Up</button></div></nav><section class="px-6 py-8"><h1 class="text-5xl font-black">Date. Meet.<br>Connect.</h1><button onclick="route(event,'/signin')" class="mt-6 bg-yellow-400 px-8 py-3.5 rounded-full font-black">Get Started →</button></section>${footerHTML}`
}

window.toggleEye=(id,btn)=>{
  const inp=document.getElementById(id)
  if(!inp) return
  if(inp.type==='password'){ inp.type='text'; btn.innerText='🙈' } else { inp.type='password'; btn.innerText='👁️' }
}

function renderOnboarding(){
let h= step==1? `<div class="min-h-screen flex items-center justify-center p-6 bg-white"><div class="w-full max-w-[360px] border-2 border-black rounded-[30px] p-7 bg-white"><h2 class="font-black text-xl text-center">Create Account 💛 /signin</h2><input id="name" placeholder="Full name" class="w-full mt-5 border-2 border-[#EAB308] rounded-xl px-4 py-3 text-sm"><input id="email" placeholder="Email" class="w-full mt-3 border rounded-xl px-4 py-3 text-sm bg-[#E8F0FE]"><div class="relative mt-3"><input id="pass" type="password" placeholder="Password" class="w-full border rounded-xl px-4 py-3 pr-12 text-sm bg-[#E8F0FE]"><button type="button" onclick="toggleEye('pass',this)" class="absolute right-3 top-1/2 -translate-y-1/2 text-lg">👁️</button></div><button onclick="signUp()" class="mt-5 w-full bg-yellow-400 py-3.5 rounded-full font-black">Create + Send Code</button><p class="text-xs text-center mt-3"><a href="/login" onclick="route(event,'/login')" class="underline font-bold">Login /login</a></p></div></div>` : `<div class="min-h-screen flex items-center justify-center p-6"><div class="w-full max-w-[360px] border rounded-[30px] p-7 text-center bg-white"><div class="text-4xl">📧</div><h2 class="font-black mt-3">Code Sent to ${onboard.email}</h2><div class="relative mt-4"><input id="otp" type="password" placeholder="6-digit code" class="w-full border-2 border-black rounded-xl px-4 py-3 text-center tracking-[6px] pr-12"><button type="button" onclick="toggleEye('otp',this)" class="absolute right-3 top-1/2 -translate-y-1/2 text-lg">👁️</button></div><button onclick="verifyOtp()" class="mt-3 w-full bg-black text-white py-3.5 rounded-full font-bold">Verify →</button><button onclick="resendCode()" class="mt-3 w-full bg-zinc-100 py-3 rounded-full text-xs">Resend</button></div></div>`
document.getElementById('app').innerHTML=h+footerHTML
}
function renderLogin(){ renderLoginPage(document.getElementById('app'), footerHTML, onboard) }
window.setLoginMode=(m)=>setLoginModeUI(m, onboard)

function renderLocationGate(){ document.getElementById('app').innerHTML=`<div class="max-w-[430px] mx-auto min-h-screen flex items-center justify-center p-6"><div class="w-full border-2 border-black rounded-[32px] p-8 text-center bg-white"><div class="w-20 h-20 bg-yellow-400 rounded-full flex items-center justify-center mx-auto text-3xl">📍</div><h2 class="font-black text-2xl mt-5">Enable Location</h2><button onclick="activateLocation()" class="mt-6 w-full bg-black text-white py-4 rounded-full font-black">Activate →</button></div></div>${footerHTML}` }
function renderApp(){ document.getElementById('app').innerHTML=`<div class="max-w-[430px] mx-auto min-h-screen pb-24 bg-white"><header class="p-5 flex justify-between border-b"><h1 class="font-black">KLA•MEET</h1><span class="text-xs">Hi ${currentUser.name} • <a href="#" onclick="logout()" class="underline">Logout</a></span></header><div id="tabContent" class="p-3"></div><nav class="fixed bottom-0 left-0 right-0 bg-white border-t flex justify-around p-3.5 max-w-[430px] mx-auto text-[11px]"><button onclick="switchTab('discover')" class="${activeTab==='discover'?'font-black':''}">Discover</button><button onclick="route(event,'/premium')" class="font-bold">Premium</button><button onclick="switchTab('profile')" class="${activeTab==='profile'?'font-black':''}">Profile</button></nav>${footerHTML}</div>`; renderTab() }
function renderTab(){ const el=document.getElementById('tabContent'); if(activeTab==='discover') el.innerHTML=`<div class="grid grid-cols-2 gap-3">${demo.map(p=>`<div class="rounded-[20px] overflow-hidden border"><img src="${p.img}" class="w-full h-[180px] object-cover"><div class="p-2 text-xs font-bold">${p.name}</div></div>`).join('')}</div>`; if(activeTab==='profile') el.innerHTML=`<h2 class="font-black">Profile</h2><p class="text-sm">${currentUser.email} • Verified ✅</p>` }
function renderPremium(){ document.getElementById('app').innerHTML=`<div class="max-w-[430px] mx-auto bg-white min-h-screen"><div class="p-6 border-b flex justify-between"><b>KLA•MEET</b><button onclick="goBack()" class="text-xs underline">← Back</button></div><div class="p-5"><h2 class="font-black text-3xl">Premium $3.99 / $6.99 USD LIVE</h2><button onclick="payLive(3.99,'BASIC')" class="mt-4 w-full bg-black text-white py-3.5 rounded-full font-bold">Pay $3.99 LIVE →</button><button onclick="payLive(6.99,'STANDARD')" class="mt-4 w-full bg-yellow-400 py-3.5 rounded-full font-black">Pay $6.99 LIVE →</button></div>${footerHTML}</div>` }
function renderStatic(p){ document.getElementById('app').innerHTML=`<div class="p-6"><a href="/" onclick="route(event,'/')" class="font-black">KLA•MEET</a><h1 class="text-3xl font-black mt-8">${p}</h1><a href="/" class="mt-8 inline-block bg-yellow-400 px-6 py-3 rounded-full font-bold">Back</a>${footerHTML}</div>` }

window.activateLocation=()=>{ navigator.geolocation.getCurrentPosition(pos=>{ const loc={lat:pos.coords.latitude,lng:pos.coords.longitude,city:'Kampala'}; localStorage.setItem('kla_location', JSON.stringify(loc)); userLocation=loc; activeTab='discover'; window.history.pushState({},'','/discover'); renderApp() }) }
window.switchTab=(t)=>{ activeTab=t; window.history.pushState({},'','/'+t); renderApp() }
window.goBack=()=>renderApp()
window.route=(e,path)=>{ if(e) e.preventDefault(); window.history.pushState({},'',path); const p=path.replace(/\/$/,''); if(['/terms','/privacy','/safety','/guidelines','/about','/how-it-works','/faqs','/premium','/login','/signin','/signup'].includes(p)){ if(p==='/premium') renderPremium(); else if(p==='/login') renderLogin(); else if(p==='/signin'||p==='/signup') renderOnboarding(); else renderStatic(p) } else if(p===''||p==='/') checkUser(); else { activeTab=p.replace('/',''); renderApp() } }
window.addEventListener('popstate',()=>{ const p=window.location.pathname.replace(/\/$/,''); if(['/terms','/privacy','/safety','/guidelines','/about','/how-it-works','/faqs','/premium','/login','/signin','/signup'].includes(p)){ if(p==='/premium') renderPremium(); else if(p==='/login') renderLogin(); else if(p==='/signin'||p==='/signup') renderOnboarding(); else renderStatic(p) } else checkUser() })

window.signUp=async()=>{ const name=document.getElementById('name').value.trim(); const email=document.getElementById('email').value.trim(); const pass=document.getElementById('pass').value.trim(); if(!name||!email||!pass) return alert('Fill all'); onboard={name,email,pass,loginMode:'code'}; const {data,error}=await supabase.auth.signUp({email,password:pass,options:{data:{name}, emailRedirectTo:`https://${window.location.host}/api/auth-callback`}}); if(error) return alert(error.message); if(data.user&&!data.session){ step=2; renderOnboarding() } else { await supabase.from('profiles').insert([{id:data.user.id,name,email,city:'Kampala'}]); currentUser={id:data.user.id,name,email}; renderLocationGate() } }
window.verifyOtp=async()=>{ const token=document.getElementById('otp').value.trim(); const {data,error}=await supabase.auth.verifyOtp({email:onboard.email,token,type:'signup'}); if(error) return alert(error.message); await supabase.from('profiles').insert([{id:data.user.id,name:onboard.name,email:onboard.email,city:'Kampala'}]); currentUser={id:data.user.id,name:onboard.name,email:onboard.email}; renderLocationGate() }
window.resendCode=async()=>{ await supabase.auth.resend({type:'signup',email:onboard.email, options:{emailRedirectTo:`https://${window.location.host}/api/auth-callback`}}); alert('Resent to '+onboard.email) }
window.doLogin=async()=>{ const email=document.getElementById('email')?.value.trim(); const pass=document.getElementById('pass')?.value.trim(); const {data,error}=await supabase.auth.signInWithPassword({email,password:pass}); if(error) return alert(error.message); currentUser={id:data.user.id,email,name:email.split('@')[0]}; const loc=JSON.parse(localStorage.getItem('kla_location')||'null'); if(!loc) renderLocationGate(); else {activeTab='discover'; window.history.pushState({},'','/discover'); renderApp()} }
window.sendMagicLink=async()=>{ const email=document.getElementById('email').value.trim(); if(!email) return alert('Enter email'); onboard.email=email; const {error}=await supabase.auth.signInWithOtp({email, options:{emailRedirectTo:`https://${window.location.host}/discover`, shouldCreateUser:false}}); if(error) return alert(error.message); alert('Code/link sent to '+email); onboard.loginMode='code'; setLoginModeUI('code', onboard); const eEl=document.getElementById('email'); if(eEl) eEl.value=email }
window.verifyOtpLogin=async()=>{ const email=document.getElementById('email').value.trim(); const token=document.getElementById('otp').value.trim(); const {data,error}=await supabase.auth.verifyOtp({email,token,type:'email'}); if(error) return alert(error.message); currentUser={id:data.user.id,email,name:email.split('@')[0]}; const loc=JSON.parse(localStorage.getItem('kla_location')||'null'); if(!loc) renderLocationGate(); else {activeTab='discover'; window.history.pushState({},'','/discover'); renderApp()} }
window.logout=async()=>{ await supabase.auth.signOut(); localStorage.removeItem('kla_location'); location.href='/' }
window.payLive=async(a,p)=>{ const b=event.target; b.innerText=`Paying $${a}...`; const r=await fetch('/api/pesapal-order',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({amount:a,plan:p,currency:'USD',email:currentUser?.email})}); const d=await r.json(); if(d.redirect_url) location.href=d.redirect_url; else if(d.order_tracking_id) location.href=`https://pay.pesapal.com/iframe/PesapalIframe3/Index?OrderTrackingId=${d.order_tracking_id}`; else alert(JSON.stringify(d).slice(0,500)); b.innerText=`Pay $${a}` }
window.renderOnboarding=()=>{step=1; renderOnboarding()}; window.renderWelcome=renderWelcome; window.renderLogin=renderLogin
checkUser()