import './style.css'
import { supabase } from './lib/supabase.js'

let currentUser = null
let step=1, onboard={name:'', email:'', pass:'', gender:'Woman'}

// REAL PICS - no more icons
const demo=[
{name:"Amina, 24", city:"Kampala • 2km", img:"https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=400&h=500&fit=crop", age:24, bio:"KLA • Makerere grad 💛"},
{name:"David, 26", city:"Nairobi • 5km", img:"https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=500&fit=crop", age:26, bio:"Entrepreneur | Gym"},
{name:"Sophie, 23", city:"London • Worldwide", img:"https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=500&fit=crop", age:23, bio:"Travel • Love alive"},
{name:"Brian, 27", city:"Kampala • 1km", img:"https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=500&fit=crop", age:27, bio:"Engineer • Verified ✓"},
{name:"Grace, 22", city:"Mbarara", img:"https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=400&h=500&fit=crop", age:22, bio:"Student • Chat me"},
{name:"Kevin, 28", city:"Kigali", img:"https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=500&fit=crop", age:28, bio:"Real • No scams"},
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
  if(['/terms','/privacy','/safety','/guidelines','/about','/how-it-works','/faqs'].includes(path)){
    return renderStatic(path)
  }
  const { data } = await supabase.auth.getSession()
  if(data.session){
    const { data: profile } = await supabase.from('profiles').select('*').eq('id', data.session.user.id).single()
    currentUser = profile || { id: data.session.user.id, email: data.session.user.email, name: data.session.user.email.split('@')[0] }
    renderDiscover()
  } else { renderWelcome() }
}

function renderWelcome(){
document.getElementById('app').innerHTML=`
<nav class="bg-black text-white px-6 py-4 flex justify-between items-center sticky top-0 z-20"><div class="font-black tracking-widest">KLA•MEET</div><button onclick="renderLogin()" class="bg-yellow-400 text-black px-5 py-1.5 rounded-full font-bold text-sm">Log in</button></nav>
<section class="px-6 py-8 max-w-6xl mx-auto">
<h1 class="text-5xl font-black leading-[0.9]">Date. Meet.<br>Connect.<br>Worldwide.</h1>
<p class="mt-4 text-sm text-zinc-600 max-w-md">Real people, real pics, verified. Like is FREE. Chat is Premium 35k/75k UGX via Pesapal.</p>
<button onclick="renderOnboarding()" class="mt-6 bg-yellow-400 px-8 py-3.5 rounded-full font-black">Get Started Free →</button>
<div class="flex gap-2 mt-6 text-xs"><a href="/how-it-works" onclick="route(event,'/how-it-works')" class="underline">How it Works</a> • <a href="/faqs" onclick="route(event,'/faqs')" class="underline">FAQs</a></div>
<div class="grid grid-cols-3 gap-3 mt-8 max-w-[360px]">
${demo.slice(0,3).map(p=>`<div class="rounded-[18px] overflow-hidden border aspect-[3/4] relative"><img src="${p.img}" class="w-full h-full object-cover"><div class="absolute bottom-0 bg-gradient-to-t from-black/80 to-transparent p-2 w-full"><p class="text-white text-xs font-bold">${p.name}</p></div></div>`).join('')}
</div>
</section>
${footerHTML}`
}

function renderOnboarding(){
let h=''
if(step==1) h=`<div class="min-h-screen flex items-center justify-center p-6"><div class="w-full max-w-[360px] border-2 border-black rounded-[30px] p-7 bg-white"><h2 class="font-black text-xl text-center">Create Account 💛</h2><input id="name" placeholder="Full name" class="w-full mt-5 border-2 border-black rounded-xl px-4 py-3 text-sm"><input id="email" placeholder="Email" class="w-full mt-3 border rounded-xl px-4 py-3 text-sm"><input id="pass" type="password" placeholder="Password" class="w-full mt-3 border rounded-xl px-4 py-3 text-sm"><button onclick="signUp()" class="mt-5 w-full bg-yellow-400 py-3.5 rounded-full font-black">Create Account - Live to Supabase</button><p class="text-xs text-center mt-4"><a href="#" onclick="renderLogin()" class="underline font-bold">Log in</a> • <a href="/terms" onclick="route(event,'/terms')" class="underline">Terms</a></p></div></div>`
if(step==2) h=`<div class="min-h-screen flex items-center justify-center p-6"><div class="w-full max-w-[360px] border rounded-[30px] p-7 text-center bg-white"><div class="text-4xl">✅</div><h2 class="font-black mt-3">Welcome ${onboard.name}!</h2><button onclick="renderDiscover()" class="mt-6 w-full bg-yellow-400 py-3.5 rounded-full font-black">Go to Discover →</button></div></div>`
document.getElementById('app').innerHTML=h + footerHTML
}

function renderLogin(){
document.getElementById('app').innerHTML=`<div class="min-h-screen flex items-center justify-center p-6"><div class="w-full max-w-[360px] border-2 border-black rounded-[30px] p-8 bg-white"><h2 class="font-black text-2xl">Log in</h2><input id="email" placeholder="Email" class="w-full mt-6 border-2 border-black rounded-xl px-4 py-3 text-sm"><input id="pass" type="password" placeholder="Password" class="w-full mt-3 border rounded-xl px-4 py-3 text-sm"><button onclick="doLogin()" class="mt-5 w-full bg-yellow-400 py-3.5 rounded-full font-black">Log in</button><button onclick="renderWelcome()" class="w-full mt-4 text-xs underline">← Back</button></div></div>${footerHTML}`
}

function renderDiscover(){
if(!currentUser){ renderWelcome(); return }
document.getElementById('app').innerHTML=`
<div class="max-w-[430px] mx-auto min-h-screen pb-24 bg-white"><header class="p-6 flex justify-between items-center sticky top-0 bg-white z-10 border-b"><h1 class="font-black">KLA•MEET</h1><span class="text-xs">Hi, ${currentUser.name} • <a href="#" onclick="logout()" class="underline">Logout</a></span></header>
<div id="grid" class="grid grid-cols-2 gap-3 p-3"></div>
<nav class="fixed bottom-0 left-0 right-0 bg-white border-t flex justify-around p-3.5 max-w-[430px] mx-auto text-xs z-20"><span class="font-black">Discover</span><span onclick="renderPremium()" class="text-zinc-400 font-bold">Premium 35k/75k</span></nav>
${footerHTML}</div>`
document.getElementById('grid').innerHTML=demo.map((p,i)=>`
<div class="bg-white rounded-[20px] overflow-hidden border shadow-sm">
<div class="h-[180px] relative"><img src="${p.img}" class="w-full h-full object-cover"><div class="absolute top-2 left-2 bg-black/70 text-white text-[10px] px-2 py-1 rounded-full">${p.city}</div><div class="absolute bottom-0 w-full bg-gradient-to-t from-black/80 to-transparent p-2.5"><p class="text-white font-bold text-[13px]">${p.name}</p><p class="text-white/80 text-[11px]">${p.bio}</p></div></div>
<div class="flex gap-1.5 p-2.5"><button onclick="likeUser(${i})" class="flex-1 bg-black text-white py-2.5 rounded-full text-xs font-bold">❤️ Like</button><button onclick="chatUser(${i})" class="flex-1 bg-yellow-400 py-2.5 rounded-full text-xs font-black">Chat</button></div>
</div>`).join('')
}

function renderPremium(){
document.getElementById('app').innerHTML=`
<div class="max-w-[430px] mx-auto p-5 min-h-screen bg-white"><button onclick="renderDiscover()" class="text-xs underline">← Back</button><h2 class="font-black text-2xl mt-4">Upgrade to Chat</h2><p class="text-xs mt-1">Like FREE. Chat needs Premium (Pesapal >20k)</p>
<div class="mt-5 space-y-3">
<div class="rounded-[24px] p-5 border bg-zinc-50"><div class="flex justify-between"><b>BASIC</b><b>35k UGX</b></div><button onclick="payLive(35000,'BASIC')" class="mt-3 w-full bg-black text-white py-3.5 rounded-full font-bold text-sm">Pay 35k via Pesapal</button></div>
<div class="rounded-[24px] p-5 border-2 border-yellow-400 bg-yellow-50"><div class="flex justify-between"><b>STANDARD ⭐</b><b>75k UGX</b></div><button onclick="payLive(75000,'STANDARD')" class="mt-3 w-full bg-yellow-400 py-3.5 rounded-full font-black text-sm">Pay 75k via Pesapal</button></div>
</div>${footerHTML}</div>`
}

function renderStatic(path){
  let title='', body=''
  if(path==='/how-it-works'){ title='How KLA-MEET Works'; body=`
  <div class="space-y-6">
  <div class="flex gap-4"><div class="bg-yellow-400 w-8 h-8 rounded-full flex items-center justify-center font-black">1</div><div><b>Create free account</b><p class="text-sm text-zinc-600">Sign up - stored live to Supabase in 5 sec.</p></div></div>
  <div class="flex gap-4"><div class="bg-black text-white w-8 h-8 rounded-full flex items-center justify-center font-black">2</div><div><b>Discover real people</b><p class="text-sm text-zinc-600">Real pics from Kampala & worldwide. Swipe Like (FREE, saved to DB).</p></div></div>
  <div class="flex gap-4"><div class="bg-yellow-400 w-8 h-8 rounded-full flex items-center justify-center font-black">3</div><div><b>Upgrade to Chat (35k/75k)</b><p class="text-sm text-zinc-600">Pesapal MTN/Airtel >20k min. Unlock chat, video, filters.</p></div></div>
  <div class="flex gap-4"><div class="bg-black text-white w-8 h-8 rounded-full flex items-center justify-center font-black">4</div><div><b>Meet safely</b><p class="text-sm text-zinc-600">Video call, meet public, Keep Love Alive 💛</p></div></div>
  </div>`}
  if(path==='/faqs'){ title='FAQs'; body=`
  <div class="space-y-4 text-sm">
  <div class="border rounded-xl p-4"><b>Is Like free?</b><p>Yes! Like is FREE and saved to Supabase. Chat needs Premium.</p></div>
  <div class="border rounded-xl p-4"><b>Why 35k/75k?</b><p>Pesapal min is 20,000 UGX. We set BASIC 35k, STANDARD 75k to include all fees. MTN MoMo / Airtel.</p></div>
  <div class="border rounded-xl p-4"><b>Is it safe?</b><p>Verified profiles, report button, no exact location. Meet in public places like Acacia Mall.</p></div>
  <div class="border rounded-xl p-4"><b>How to delete?</b><p>Email support@kla-meet.com - we delete auth + profile in 7 days.</p></div>
  <div class="border rounded-xl p-4"><b>18+?</b><p>Yes, 18+ only. Keep Love Alive is adult dating.</p></div>
  </div>`}
  if(path==='/terms'){ title='Terms'; body=`<p>18+ only. No harassment, nudity, scams. Payments BASIC 35k STANDARD 75k via Pesapal, no refund after chat used. Meet at own risk.</p>`}
  if(path==='/privacy'){ title='Privacy'; body=`<p>We store name, email, city approx in Supabase. No exact GPS. Pesapal handles payments. Delete via support@kla-meet.com</p>`}
  if(path==='/safety'){ title='Safety'; body=`<p>Video call first, public meet, never send money. Report button 24/7. Emergency 999 Uganda.</p>`}
  if(path==='/guidelines'){ title='Guidelines'; body=`<p>✅ Real pics, be kind. ❌ No nudity, hate, scams, under 18. 3 reports = review.</p>`}
  if(path==='/about'){ title='About'; body=`<p>KLA-MEET = Keep Love Alive MEET. Built Kampala 2024 for real love worldwide.</p>`}

  document.getElementById('app').innerHTML=`<div class="max-w-3xl mx-auto p-6 min-h-screen bg-white"><a href="/" onclick="route(event,'/')" class="font-black text-xl">KLA•MEET</a><h1 class="text-3xl font-black mt-8">${title}</h1><p class="text-xs text-zinc-500">kla-meet.vercel.app${path}/</p><div class="mt-6 text-[14px] leading-relaxed space-y-3">${body}</div><a href="/" onclick="route(event,'/')" class="mt-10 inline-block bg-yellow-400 px-8 py-3.5 rounded-full font-black">← Back</a>${footerHTML}</div>`
}

window.route=(e,path)=>{ if(e) e.preventDefault(); window.history.pushState({},'',path); const p=path.replace(/\/$/,''); if(p===''||p==='/') checkUser(); else renderStatic(p) }
window.addEventListener('popstate',()=>{ const p=window.location.pathname.replace(/\/$/,''); if(p===''||p==='/') checkUser(); else renderStatic(p) })

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
renderDiscover()
}
window.logout=async()=>{ await supabase.auth.signOut(); currentUser=null; window.history.pushState({},'','/'); renderWelcome() }
window.likeUser=async(i)=>{ if(!currentUser) return renderLogin(); await supabase.from('likes').insert([{from_user:currentUser.id, to_name:demo[i].name}]); alert(`Liked ${demo[i].name} ❤️ Saved to Supabase!`) }
window.chatUser=()=>renderPremium()
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
window.renderDiscover=renderDiscover
window.renderPremium=()=>{ window.history.pushState({},'','/premium'); renderPremium() }
checkUser()