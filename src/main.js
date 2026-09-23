import './style.css'
import { supabase } from './lib/supabase.js'

let currentUser = null
let step=1, onboard={name:'', email:'', pass:'', gender:'Woman'}

const demo=[
{name:"Amina, 24", city:"Kampala", img:"👩🏾"},
{name:"David, 26", city:"Nairobi", img:"👨🏾"},
{name:"Sophie, 23", city:"London", img:"👩‍🦰"},
]

async function checkUser(){
const { data } = await supabase.auth.getSession()
if(data.session){
const { data: profile } = await supabase.from('profiles').select('*').eq('id', data.session.user.id).single()
currentUser = profile || { id: data.session.user.id, email: data.session.user.email, name: data.session.user.email.split('@')[0] }
renderDiscover()
} else {
renderWelcome()
}
}

function renderWelcome(){
document.getElementById('app').innerHTML=`
<nav class="bg-black text-white px-6 py-4 flex justify-between"><div class="font-black">KLA•MEET</div><button onclick="renderLogin()" class="bg-yellow-400 text-black px-4 py-1.5 rounded-full font-bold text-sm">Log in</button></nav>
<section class="px-6 py-12 max-w-6xl mx-auto"><h1 class="text-5xl font-black">Date. Meet.<br>Connect.<br>Worldwide.</h1><p class="mt-4 text-sm text-zinc-600">Join thousands building meaningful relationships.</p><button onclick="renderOnboarding()" class="mt-6 bg-yellow-400 px-6 py-3 rounded-full font-bold">Get Started Free →</button></section>
<footer class="bg-black text-zinc-400 text-[11px] text-center py-4">© KLA-MEET</footer>`
}

function renderOnboarding(){
let h=''
if(step==1) h=`<div class="min-h-screen flex items-center justify-center p-6"><div class="w-full max-w-[340px] border rounded-[30px] p-6"><h2 class="font-black text-xl text-center">Create Account 💛</h2><input id="name" placeholder="Full name" class="w-full mt-4 border border-black rounded-xl px-4 py-3 text-sm"><input id="email" placeholder="Email" class="w-full mt-3 border rounded-xl px-4 py-3 text-sm"><input id="pass" type="password" placeholder="Password" class="w-full mt-3 border rounded-xl px-4 py-3 text-sm"><button onclick="signUp()" class="mt-4 w-full bg-yellow-400 py-3 rounded-full font-bold">Create Account</button><p class="text-xs text-center mt-3">Have account? <a href="#" onclick="renderLogin()" class="underline">Log in</a></p></div></div>`
if(step==2) h=`<div class="min-h-screen flex items-center justify-center p-6"><div class="w-full max-w-[340px] border rounded-[30px] p-6 text-center"><h2 class="font-bold">Welcome ${onboard.name}!</h2><p class="text-sm mt-2">Account created in Supabase ✅</p><button onclick="renderDiscover()" class="mt-6 w-full bg-yellow-400 py-3 rounded-full font-bold">Go to Discover</button></div></div>`
document.getElementById('app').innerHTML=h
}

function renderLogin(){
document.getElementById('app').innerHTML=`<div class="min-h-screen flex items-center justify-center p-6"><div class="w-full max-w-[340px] border-2 border-black rounded-[30px] p-8"><h2 class="font-black text-xl">Log in</h2><input id="email" placeholder="Email" class="w-full mt-4 border border-black rounded-xl px-4 py-3 text-sm"><input id="pass" type="password" placeholder="Password" class="w-full mt-3 border rounded-xl px-4 py-3 text-sm"><button onclick="doLogin()" class="mt-4 w-full bg-yellow-400 py-3 rounded-full font-bold">Log in</button><button onclick="renderWelcome()" class="w-full mt-3 text-xs underline">← Back</button></div></div>`
}

function renderDiscover(){
if(!currentUser){ renderWelcome(); return }
document.getElementById('app').innerHTML=`
<div class="max-w-[430px] mx-auto min-h-screen pb-20"><header class="p-6 flex justify-between"><h1 class="font-black">KLA-MEET</h1><span class="text-xs">Hi, ${currentUser.name} • <a href="#" onclick="logout()" class="underline">Logout</a></span></header>
<div id="grid" class="grid grid-cols-2 gap-3 p-3"></div>
<nav class="fixed bottom-0 left-0 right-0 bg-white border-t flex justify-around p-3 max-w-[430px] mx-auto text-xs"><span class="font-bold">Discover</span><span onclick="renderPremium()" class="text-zinc-400">Premium 35k/75k</span></nav></div>`
document.getElementById('grid').innerHTML=demo.map((p,i)=>`<div class="bg-zinc-50 rounded-[20px] p-2 border"><div class="h-[120px] bg-yellow-50 rounded-[16px] flex items-center justify-center text-3xl">${p.img}</div><p class="font-bold text-[13px] mt-2">${p.name}</p><div class="flex gap-1 mt-2"><button onclick="likeUser(${i})" class="flex-1 bg-black text-white py-2 rounded-full text-xs">Like</button><button onclick="chatUser(${i})" class="flex-1 bg-yellow-400 py-2 rounded-full text-xs font-bold">Chat</button></div></div>`).join('')
}

function renderPremium(){
document.getElementById('app').innerHTML=`
<div class="max-w-[430px] mx-auto p-4"><h2 class="font-black text-xl">Upgrade to Chat</h2><p class="text-xs mt-1">Like is FREE, Chat needs Premium (Pesapal min 20k ✅)</p>
<div class="mt-4 space-y-3">
<div class="bg-zinc-50 rounded-[24px] p-5 border"><div class="flex justify-between"><b>BASIC</b><b>35,000 UGX</b></div><ul class="text-[13px] mt-2"><li>✅ Everything Basic</li><li>✅ Unlimited Likes, See who liked you, 10 Chats/day, 5 Countries</li></ul><button onclick="payLive(35000,'BASIC')" class="mt-3 w-full bg-black text-white py-3 rounded-full font-bold text-sm">Pesapal 35k</button></div>
<div class="bg-yellow-50 rounded-[24px] p-5 border-2 border-yellow-400"><div class="flex justify-between"><b>STANDARD</b><b>75,000 UGX</b></div><ul class="text-[13px] mt-2 font-medium"><li>✅ Everything in BASIC</li><li>✅ Unlimited Chats, Video 30min, ALL Countries, Boost, No Ads</li></ul><button onclick="payLive(75000,'STANDARD')" class="mt-3 w-full bg-yellow-400 py-3 rounded-full font-bold text-sm">Pesapal 75k</button></div>
</div><button onclick="renderDiscover()" class="mt-4 w-full bg-zinc-100 py-3 rounded-full text-sm">← Back</button></div>`
}

window.signUp=async()=>{
const name=document.getElementById('name').value
const email=document.getElementById('email').value
const pass=document.getElementById('pass').value
if(!name||!email||!pass) return alert('Fill all')
const btn=event.target; btn.innerText='Creating...'
const { data, error } = await supabase.auth.signUp({email, password:pass})
if(error){ alert(error.message); btn.innerText='Create Account'; return }
await supabase.from('profiles').insert([{id:data.user.id, name, email, gender:onboard.gender}])
currentUser={id:data.user.id, name, email}
step=2; renderOnboarding()
}

window.doLogin=async()=>{
const email=document.getElementById('email').value
const pass=document.getElementById('pass').value
const { data, error } = await supabase.auth.signInWithPassword({email, password:pass})
if(error) return alert(error.message)
const { data: profile } = await supabase.from('profiles').select('*').eq('id', data.user.id).single()
currentUser=profile
renderDiscover()
}

window.logout=async()=>{ await supabase.auth.signOut(); currentUser=null; renderWelcome() }
window.likeUser=async(i)=>{
if(!currentUser) return renderLogin()
await supabase.from('likes').insert([{from_user:currentUser.id, to_name:demo[i].name}])
alert(`You liked ${demo[i].name} ❤️ Saved to Supabase! Upgrade to chat.`)
}
window.chatUser=()=>renderPremium()
window.payLive=async(amount,plan)=>{
const btn=event.target; const old=btn.innerText; btn.innerText='Connecting Pesapal...'
try{
const r=await fetch('/api/pesapal-order',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({amount,plan})})
const d=await r.json()
if(d.redirect_url) return window.location.href=d.redirect_url
if(d.order_tracking_id) return window.location.href=`https://pay.pesapal.com/iframe/PesapalIframe3/Index?OrderTrackingId=${d.order_tracking_id}`
alert(JSON.stringify(d).slice(0,300))
}catch(e){alert(e.message)} finally{btn.innerText=old}
}

window.renderOnboarding=()=>{step=1; renderOnboarding()}
window.renderLogin=renderLogin
window.renderWelcome=renderWelcome
window.renderDiscover=renderDiscover
window.renderPremium=renderPremium

checkUser()