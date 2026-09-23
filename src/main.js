import './style.css'
let currentUser = JSON.parse(localStorage.getItem('kla_user')||'null')
let step=1, onboard={name:'', gender:'Woman', interests:[]}
const demo=[
{name:"Amina, 24", city:"Kampala", img:"👩🏾"},
{name:"David, 26", city:"Nairobi", img:"👨🏾"},
{name:"Sophie, 23", city:"London", img:"👩‍🦰"},
{name:"James, 29", city:"New York", img:"🧑"},
{name:"Luna, 25", city:"Berlin", img:"👩"},
{name:"Sam, 27", city:"Toronto", img:"👨"},
]

function renderWelcome(){
document.getElementById('app').innerHTML=`
<nav class="bg-black text-white px-6 py-4 flex justify-between items-center"><div class="font-black text-xl">KLA<span class="text-yellow-400">•</span>MEET</div><button onclick="renderLogin()" class="bg-yellow-400 text-black px-4 py-1.5 rounded-full font-bold text-sm">Log in / Sign up</button></nav>
<section class="px-6 py-12 flex flex-col md:flex-row gap-8 max-w-6xl mx-auto">
<div class="flex-1"><h1 class="text-5xl font-black leading-[0.9]">Date. Meet.<br>Connect.<br>Worldwide.</h1><p class="mt-4 text-zinc-600 text-sm">Join thousands building meaningful relationships — safely.</p><button onclick="renderOnboarding()" class="mt-6 bg-yellow-400 px-6 py-3 rounded-full font-bold">Get Started — It's Free →</button></div>
<div class="flex-1 grid grid-cols-3 gap-3 max-w-[340px]">${['👩🏾‍🦰','👨🏾','👩‍🦱','👩','👨🏽‍🦱'].map(e=>`<div class="bg-zinc-100 rounded-[20px] h-[100px] flex items-center justify-center text-3xl">${e}</div>`).join('')}</div>
</section>
<section class="bg-zinc-50 px-6 py-10"><h2 class="text-2xl font-black text-center">How it Works</h2><div class="grid grid-cols-5 gap-2 mt-6 text-[11px] text-center">${['Create Profile','Verify Safe','Discover','Chat','Meet'].map((t,i)=>`<div><div class="w-10 h-10 bg-yellow-400 rounded-full mx-auto flex items-center justify-center font-bold">${i+1}</div><p class="font-bold mt-2">${t}</p></div>`).join('')}</div></section>
<footer class="bg-black text-zinc-400 text-[11px] text-center py-4">© KLA-MEET • Privacy • Terms • Safety</footer>`
}

function renderOnboarding(){
let h=''
if(step==1) h=`<div class="min-h-screen flex items-center justify-center p-6"><div class="w-full max-w-[340px] border rounded-[30px] p-6"><h2 class="font-black text-2xl text-center mt-8">Welcome to KLA-MEET 💛</h2><button onclick="next()" class="mt-10 w-full bg-yellow-400 py-3 rounded-full font-bold">Get Started</button></div></div>`
if(step==2) h=`<div class="min-h-screen flex items-center justify-center p-6"><div class="w-full max-w-[340px] border rounded-[30px] p-6"><h2 class="font-bold">Create profile</h2><input id="name" placeholder="Your name" class="w-full mt-4 border border-black rounded-xl px-4 py-3 text-sm"><button onclick="saveName()" class="mt-4 w-full bg-yellow-400 py-3 rounded-full font-bold">Continue</button></div></div>`
if(step==3) h=`<div class="min-h-screen flex items-center justify-center p-6"><div class="w-full max-w-[340px] border rounded-[30px] p-6"><h2 class="font-bold">Gender</h2><div class="mt-4 space-y-2">${['Woman','Man','Nonbinary'].map(g=>`<button onclick="setGender('${g}')" class="w-full border rounded-xl px-4 py-3 text-sm text-left ${onboard.gender==g?'bg-yellow-100':''}">${g}</button>`).join('')}</div><button onclick="finish()" class="mt-4 w-full bg-yellow-400 py-3 rounded-full font-bold">Finish</button></div></div>`
document.getElementById('app').innerHTML=h
}

function renderLogin(){
document.getElementById('app').innerHTML=`<div class="min-h-screen flex items-center justify-center p-6"><div class="w-full max-w-[340px] border-2 border-black rounded-[30px] p-8"><h2 class="font-black text-xl">Log in</h2><input id="email" placeholder="Email" class="w-full mt-4 border border-black rounded-xl px-4 py-3 text-sm"><button onclick="doLogin()" class="mt-4 w-full bg-yellow-400 py-3 rounded-full font-bold">Log in</button><p class="text-xs text-center mt-3"><a href="#" onclick="renderOnboarding()" class="underline">Sign up Free</a></p></div></div>`
}

function renderDiscover(){
if(!currentUser){ renderWelcome(); return }
document.getElementById('app').innerHTML=`
<div class="max-w-[430px] mx-auto min-h-screen bg-white pb-20">
<header class="p-6 flex justify-between"><h1 class="font-black text-xl">KLA-MEET</h1><span onclick="logout()" class="text-xs">Logout</span></header>
<div id="grid" class="grid grid-cols-2 gap-3 p-3"></div>
<nav class="fixed bottom-0 left-0 right-0 bg-white border-t flex justify-around p-3 max-w-[430px] mx-auto text-xs"><span class="font-bold">Discover</span><span onclick="renderPremium()" class="text-zinc-400">Premium</span></nav>
</div>`
document.getElementById('grid').innerHTML=demo.map((p,i)=>`
<div class="bg-zinc-50 rounded-[20px] p-2 border"><div class="h-[120px] bg-yellow-50 rounded-[16px] flex items-center justify-center text-3xl">${p.img}</div><p class="font-bold text-[13px] mt-2">${p.name}</p><p class="text-[11px] text-zinc-500">${p.city}</p>
<div class="flex gap-1 mt-2"><button onclick="like(${i})" class="flex-1 bg-black text-white py-2 rounded-full text-xs">Like</button><button onclick="chat(${i})" class="flex-1 bg-yellow-400 py-2 rounded-full text-xs font-bold">Chat</button></div></div>`).join('')
}

function renderPremium(){
document.getElementById('app').innerHTML=`
<div class="max-w-[430px] mx-auto p-4 pb-28">
<h2 class="text-xl font-black">Upgrade to Chat</h2><p class="text-xs text-zinc-600 mt-1">Free account & Like. Chat requires upgrade. Pesapal min 20k ✅</p>
<div class="mt-4 space-y-3">
<div class="bg-zinc-50 rounded-[24px] p-5 border"><div class="flex justify-between"><h3 class="font-black">BASIC</h3><b>35,000 UGX</b></div>
<ul class="mt-2 text-[13px] space-y-1"><li>✅ Everything Basic + Free account</li><li>✅ Unlimited Likes</li><li>✅ See who liked you</li><li>✅ 10 Chats/day</li><li>✅ 5 Countries filter</li></ul>
<button onclick="payLive(35000,'BASIC')" class="mt-3 w-full bg-black text-white py-3 rounded-full font-bold text-sm">Pay Pesapal 35k</button></div>

<div class="bg-yellow-50 rounded-[24px] p-5 border-2 border-yellow-400"><div class="flex justify-between"><h3 class="font-black">STANDARD</h3><b>75,000 UGX</b></div>
<ul class="mt-2 text-[13px] space-y-1 font-medium"><li>✅ <b>Everything in BASIC</b></li><li>✅ Unlimited Chats</li><li>✅ Video Call 30min/day</li><li>✅ ALL Countries + Boost + No Ads</li></ul>
<button onclick="payLive(75000,'STANDARD')" class="mt-3 w-full bg-yellow-400 py-3 rounded-full font-bold text-sm">Pay Pesapal 75k</button>
<button onclick="alert('USDT TRC20: TX...KLA')" class="mt-2 w-full border border-black py-3 rounded-full text-sm">Crypto USDT</button></div>
</div>
<button onclick="renderDiscover()" class="mt-4 w-full bg-zinc-100 py-3 rounded-full text-sm">← Back</button>
</div>`
}

// ACTIONS - LIVE PESAPAL (NO DEMO POPUP)
window.payLive=async(amount,plan)=>{
if(amount<20000) return alert('Min 20k UGX')
const btn=event.target
const old=btn.innerText
btn.innerText='Connecting Pesapal...'
try{
const r=await fetch('/api/pesapal-order',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({amount,plan})})
const d=await r.json()
if(d.redirect_url) return window.location.href=d.redirect_url
if(d.order_tracking_id) return window.location.href=`https://pay.pesapal.com/iframe/PesapalIframe3/Index?OrderTrackingId=${d.order_tracking_id}`
alert('Error: '+JSON.stringify(d).slice(0,250))
}catch(e){ alert('Check api folder exists & redeploy Vercel - '+e.message) }
finally{ btn.innerText=old }
}

window.like=(i)=>alert(`You liked ${demo[i].name} ❤️ Free! Upgrade to Chat.`)
window.chat=()=>renderPremium()
window.next=()=>{step++; renderOnboarding()}
window.saveName=()=>{ const v=document.getElementById('name').value; if(!v) return alert('Enter name'); onboard.name=v; step++; renderOnboarding()}
window.setGender=(g)=>{onboard.gender=g; renderOnboarding()}
window.finish=()=>{currentUser={name:onboard.name||'User'}; localStorage.setItem('kla_user',JSON.stringify(currentUser)); renderDiscover()}
window.doLogin=()=>{ const e=document.getElementById('email').value; if(!e) return alert('Email'); currentUser={name:e.split('@')[0]}; localStorage.setItem('kla_user',JSON.stringify(currentUser)); renderDiscover()}
window.logout=()=>{localStorage.removeItem('kla_user'); currentUser=null; renderWelcome()}
window.renderOnboarding=()=>{step=1; renderOnboarding()}
window.renderLogin=renderLogin
window.renderWelcome=renderWelcome
window.renderDiscover=renderDiscover
window.renderPremium=renderPremium

if(currentUser) renderDiscover(); else renderWelcome()