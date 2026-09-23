import './style.css'

// --- STATE ---
let currentUser = JSON.parse(localStorage.getItem('kla_user') || 'null')
let currentStep = 1
let onboarding = { name:'', birthday:'', gender:'Woman', interests:[] }

const demo=[
{name:"Amina, 24", city:"Kampala • 2km", country:"UG", img:"👩🏾"},
{name:"David, 26", city:"Nairobi • 5km", country:"KE", img:"👨🏾"},
{name:"Sophie, 23", city:"London • 1km", country:"GB", img:"👩‍🦰"},
{name:"James, 29", city:"New York • 3km", country:"US", img:"🧑"},
{name:"Luna, 25", city:"Berlin • 4km", country:"DE", img:"👩"},
{name:"Sam, 27", city:"Toronto • 2km", country:"CA", img:"👨"},
]

function renderWelcome(){
document.getElementById('app').innerHTML=`
<!-- NAVBAR -->
<nav class="bg-black text-white px-6 py-4 flex justify-between items-center sticky top-0 z-50">
<div class="font-black text-2xl">KLA<span class="text-yellow-400">•</span>MEET</div>
<div class="hidden md:flex gap-6 text-sm items-center">
<a href="#" onclick="showPage('about')" class="hover:text-yellow-400">About</a>
<a href="#" onclick="showPage('safety')" class="hover:text-yellow-400">Safety</a>
<a href="#" onclick="showPage('community')" class="hover:text-yellow-400">Community</a>
<a href="#" onclick="showPage('stories')" class="hover:text-yellow-400">Success Stories</a>
<a href="#" onclick="renderLogin()" class="hover:text-yellow-400">Log in</a>
<button onclick="renderOnboarding()" class="bg-yellow-400 text-black px-5 py-2 rounded-full font-bold">Sign up</button>
</div>
<button onclick="renderLogin()" class="md:hidden bg-yellow-400 text-black px-4 py-1.5 rounded-full font-bold text-sm">Sign up</button>
</nav>

<!-- HERO -->
<section class="px-6 md:px-16 py-10 md:py-16 flex flex-col md:flex-row items-center gap-8">
<div class="flex-1">
<h1 class="text-5xl md:text-7xl font-black leading-[0.9]">Date. Meet.<br>Connect.<br>Worldwide.</h1>
<p class="mt-4 text-zinc-600 max-w-lg">The modern way to meet real people, nearby or far. Join thousands building meaningful relationships — safely, authentically.</p>
<div class="flex gap-3 mt-6 flex-wrap">
<button onclick="renderOnboarding()" class="bg-yellow-400 text-black px-6 py-3 rounded-full font-bold flex items-center gap-2">Get Started — It's Free →</button>
<button class="border border-black px-6 py-3 rounded-full font-bold">↓ Download the app</button>
</div>
<div class="flex gap-4 mt-6 text-xs text-zinc-600">
<span>✓ 1M+ members worldwide</span><span>✓ Verified profiles</span><span>✓ 24/7 Safety & Support</span>
</div>
</div>
<div class="flex-1 relative">
<div class="grid grid-cols-3 gap-3 max-w-[380px] ml-auto">
<div class="bg-zinc-100 rounded-[20px] h-[120px] flex items-center justify-center text-4xl animate-float">👩🏾‍🦰</div>
<div class="bg-zinc-100 rounded-[20px] h-[120px] flex items-center justify-center text-4xl animate-float" style="animation-delay:.2s">👨🏾</div>
<div class="bg-zinc-100 rounded-[20px] h-[120px] flex items-center justify-center text-4xl animate-float" style="animation-delay:.4s">👩‍🦱</div>
<div class="bg-zinc-100 rounded-[20px] h-[120px] flex items-center justify-center text-4xl animate-float col-start-2" style="animation-delay:.6s">👩</div>
<div class="bg-zinc-100 rounded-[20px] h-[120px] flex items-center justify-center text-4xl animate-float" style="animation-delay:.8s">👨🏽‍🦱</div>
</div>
<div class="absolute -z-10 top-10 right-10 w-[250px] h-[250px] bg-yellow-300 rounded-full blur-[0px] opacity-60"></div>
</div>
</section>

<!-- HOW IT WORKS -->
<section class="bg-zinc-50 px-6 md:px-16 py-12">
<h2 class="text-3xl font-black text-center">How KLA-MEET Works</h2>
<p class="text-center text-zinc-600 text-sm mt-2">Get started in 5 simple steps — simple, safe, and built for real connections.</p>
<div class="grid grid-cols-2 md:grid-cols-5 gap-6 mt-8 max-w-6xl mx-auto">
${[
{t:'Create Profile',d:'Add photos, interests, and what you looking for',n:1},
{t:'Verify & Stay Safe',d:'Quick photo & ID verification for authentic members',n:2},
{t:'Discover Matches',d:'Swipe, match, and connect with people nearby or globally',n:3},
{t:'Chat & Connect',d:'Start conversations safely with built-in messaging',n:4},
{t:'Meet & Build Relationship',d:'Plan your first meetup and grow a meaningful connection',n:5},
].map(s=>`
<div class="text-center">
<div class="mx-auto w-[140px] h-[240px] bg-white border-2 border-black rounded-[20px] p-3 flex flex-col items-center justify-center shadow-lg">
<div class="w-6 h-6 bg-yellow-400 rounded-full text-xs font-bold flex items-center justify-center">${s.n}</div>
<div class="text-2xl mt-2">${s.n==1?'👤':s.n==2?'🛡️':s.n==3?'💘':s.n==4?'💬':'📅'}</div>
<p class="font-bold text-[12px] mt-2">${s.t}</p><p class="text-[10px] text-zinc-500 mt-1">${s.d}</p>
</div>
<p class="font-bold text-xs mt-3">${s.n}. ${s.t}</p>
</div>`).join('')}
</div>
</section>

<footer class="bg-black text-white text-center py-6 text-xs text-zinc-400">
© 2024 KLA-MEET • <a href="#" onclick="showPage('privacy')" class="hover:text-yellow-400">Privacy Policy</a> • <a href="#" onclick="showPage('terms')" class="hover:text-yellow-400">Terms of Service</a> • <a href="#" onclick="showPage('safety')" class="hover:text-yellow-400">Safety</a> • Support • Global Community
</footer>
`
}

function renderOnboarding(){
let html=''
if(currentStep==1){
html=`
<div class="min-h-screen bg-white flex flex-col items-center justify-center p-6">
<div class="w-full max-w-[340px] border border-zinc-200 rounded-[30px] p-6 shadow-xl">
<div class="font-bold">♡ KLA-MEET</div>
<div class="text-center mt-10"><div class="text-6xl">💬💛</div><h2 class="font-black text-2xl mt-6">Welcome to KLA-MEET</h2><p class="text-sm text-zinc-500">Date. Meet. Connect. Worldwide.</p></div>
<button onclick="nextStep()" class="mt-10 w-full bg-yellow-400 py-3 rounded-full font-bold">Get Started</button>
<div class="flex justify-center gap-1 mt-4"><div class="w-6 h-1.5 bg-yellow-400 rounded-full"></div><div class="w-1.5 h-1.5 bg-zinc-200 rounded-full"></div><div class="w-1.5 h-1.5 bg-zinc-200 rounded-full"></div></div>
</div>
</div>`
}else if(currentStep==2){
html=`
<div class="min-h-screen bg-white flex flex-col items-center justify-center p-6">
<div class="w-full max-w-[340px] border border-zinc-200 rounded-[30px] p-6 shadow-xl">
<div class="flex justify-between"><span>←</span><span class="font-bold">Create your profile</span><span></span></div>
<p class="text-sm font-bold mt-6">Let's get to know you</p>
<input id="name" placeholder="Name - Enter your name" class="w-full mt-3 border border-black rounded-xl px-4 py-3 text-sm">
<input id="birthday" type="date" class="w-full mt-3 border border-black rounded-xl px-4 py-3 text-sm">
<button onclick="saveStep1()" class="mt-6 w-full bg-yellow-400 py-3 rounded-full font-bold">Continue</button>
</div></div>`
}else if(currentStep==3){
html=`
<div class="min-h-screen bg-white flex flex-col items-center justify-center p-6">
<div class="w-full max-w-[340px] border border-zinc-200 rounded-[30px] p-6 shadow-xl">
<h2 class="font-black text-xl">Gender & Preferences</h2><p class="text-xs text-zinc-500">You can update this anytime</p>
<div class="mt-6 space-y-3">
${['Woman','Man','Nonbinary'].map(g=>`<button onclick="selectGender('${g}')" class="w-full flex justify-between items-center border border-black rounded-xl px-4 py-3 text-sm ${onboarding.gender==g?'bg-yellow-100 border-yellow-400':''}"><span>${g}</span><span class="w-5 h-5 rounded-full border flex items-center justify-center ${onboarding.gender==g?'bg-yellow-400':''}">${onboarding.gender==g?'●':''}</span></button>`).join('')}
</div>
<button onclick="nextStep()" class="mt-6 w-full bg-yellow-400 py-3 rounded-full font-bold">Continue</button>
</div></div>`
}else if(currentStep==4){
html=`
<div class="min-h-screen bg-white flex flex-col items-center justify-center p-6">
<div class="w-full max-w-[340px] border border-zinc-200 rounded-[30px] p-6 shadow-xl">
<h2 class="font-black text-xl">What are you into?</h2><p class="text-xs text-zinc-500">Select 3 or more interests to match better</p>
<div class="grid grid-cols-2 gap-2 mt-4">
${['🎵 Music','✈️ Travel','🍔 Foodie','🏋️ Fitness','🎨 Arts & Culture','📸 Photography','📖 Reading','🏔️ Outdoors'].map(i=>`<button onclick="toggleInterest('${i}')" class="border border-black rounded-full px-3 py-2 text-xs text-left ${onboarding.interests.includes(i)?'bg-yellow-400 font-bold':''}">${i}</button>`).join('')}
</div>
<button onclick="finishOnboarding()" class="mt-6 w-full bg-yellow-400 py-3 rounded-full font-bold">Continue</button>
</div></div>`
}else if(currentStep==5){
html=`
<div class="min-h-screen bg-white flex flex-col items-center justify-center p-6">
<div class="w-full max-w-[340px] border border-zinc-200 rounded-[30px] p-6 shadow-xl text-center">
<h2 class="font-black text-xl">Enable location &<br>Find matches near you</h2>
<div class="text-6xl my-6">📍🌍</div>
<p class="text-xs text-zinc-600">We use your location to show people near you. We'll never share your exact location.</p>
<button onclick="finishOnboarding()" class="mt-6 w-full bg-yellow-400 py-3 rounded-full font-bold">Allow Location</button>
<button onclick="finishOnboarding()" class="mt-2 text-xs underline">Maybe later</button>
</div></div>`
}
document.getElementById('app').innerHTML=html
}

function renderLogin(){
document.getElementById('app').innerHTML=`
<div class="min-h-screen bg-white flex items-center justify-center p-6">
<div class="w-full max-w-[360px] border-2 border-black rounded-[30px] p-8">
<h1 class="font-black text-2xl">KLA-MEET</h1>
<h2 class="font-bold text-xl mt-6">Log in</h2>
<input id="email" placeholder="Email" class="w-full mt-4 border border-black rounded-xl px-4 py-3 text-sm">
<input id="pass" type="password" placeholder="Password" class="w-full mt-3 border border-black rounded-xl px-4 py-3 text-sm">
<button onclick="doLogin()" class="mt-6 w-full bg-yellow-400 py-3 rounded-full font-bold">Log in</button>
<p class="text-xs text-center mt-4">No account? <a href="#" onclick="renderOnboarding()" class="underline font-bold">Sign up - Free</a></p>
<button onclick="renderWelcome()" class="w-full mt-4 text-xs underline">← Back to Welcome</button>
</div></div>`
}

function renderDiscover(){
if(!currentUser){ renderWelcome(); return }
document.getElementById('app').innerHTML=`
<div class="max-w-[430px] mx-auto min-h-screen bg-white pb-20">
<header class="p-6 flex justify-between items-center"><div><h1 class="text-2xl font-black">KLA-MEET</h1><p class="text-[10px] text-zinc-500">12,847 singles worldwide</p></div><div class="text-xl" onclick="renderWelcome()">👤</div></header>
<div id="grid" class="grid grid-cols-2 gap-3 p-3"></div>
<nav class="fixed bottom-0 left-0 right-0 bg-white border-t flex justify-around p-3 max-w-[430px] mx-auto text-xs">
<a href="#" class="text-black font-bold">Discover</a><a href="#" onclick="renderChatList()" class="text-zinc-400">Chat</a><a href="#" onclick="renderPremium()" class="text-zinc-400">Premium</a><a href="#" onclick="logout()" class="text-zinc-400">Logout</a>
</nav>
</div>`
const grid=document.getElementById('grid')
grid.innerHTML=demo.map((p,i)=>`
<div class="bg-zinc-50 rounded-[20px] p-2 border">
<div class="w-full h-[140px] bg-gradient-to-br from-yellow-100 to-orange-100 rounded-[16px] flex items-center justify-center text-4xl">${p.img}</div>
<p class="font-bold mt-2 text-[13px]">${p.name}</p><p class="text-[11px] text-zinc-500">📍 ${p.city}</p>
<div class="flex gap-1 mt-2">
<button onclick="likePerson(${i})" class="flex-1 bg-black text-white py-2 rounded-full text-xs">❤️ Like</button>
<button onclick="tryChat(${i})" class="flex-1 bg-yellow-400 py-2 rounded-full text-xs font-bold">💬 Chat</button>
</div>
</div>`).join('')
}

function renderPremium(){
document.getElementById('app').innerHTML=`
<div class="max-w-[430px] mx-auto min-h-screen bg-white p-4 pb-28">
<h2 class="text-xl font-black">Upgrade to Chat 💬</h2>
<p class="text-xs text-zinc-600 mt-1">Every user can create account & Like. To CHAT you must upgrade. Pesapal min 20,000 UGX ✅</p>
<div class="mt-4 space-y-4">
<div class="bg-zinc-50 rounded-[24px] p-5 border">
<div class="flex justify-between"><h3 class="font-black">BASIC</h3><p class="font-bold">35,000 UGX</p></div>
<p class="text-[11px] text-zinc-500">~$9.99 - Includes Everything Basic</p>
<ul class="mt-3 text-[13px] space-y-1">
<li>✅ Free account creation</li><li>✅ Unlimited Likes ❤️</li><li>✅ See who liked you</li><li>✅ 10 Chats/day after upgrade</li><li>✅ International filter (5 countries)</li>
</ul>
<button onclick="pay(35000,'BASIC')" class="mt-4 w-full bg-black text-white py-3 rounded-full font-bold text-sm">Pesapal 35,000 UGX</button>
</div>
<div class="bg-yellow-50 rounded-[24px] p-5 border-2 border-yellow-400 relative">
<span class="absolute -top-3 left-5 bg-yellow-400 text-black text-[10px] px-3 py-1 rounded-full font-bold">MOST POPULAR</span>
<div class="flex justify-between"><h3 class="font-black">STANDARD</h3><p class="font-bold">75,000 UGX</p></div>
<p class="text-[11px] text-zinc-500">~$19.99 - Everything in BASIC +</p>
<ul class="mt-3 text-[13px] space-y-1 font-medium">
<li>✅ Everything in BASIC included</li><li>✅ Unlimited Chats 💬</li><li>✅ Video Call 30min/day</li><li>✅ ALL Countries Filter 🌍</li><li>✅ 1 Boost/week + Read receipts + No Ads</li>
</ul>
<button onclick="pay(75000,'STANDARD')" class="mt-4 w-full bg-yellow-400 text-black py-3 rounded-full font-bold text-sm">Pesapal 75,000 UGX</button>
<button onclick="payCrypto()" class="mt-2 w-full border border-black py-3 rounded-full text-sm">Crypto USDT/BTC</button>
</div>
</div>
<button onclick="renderDiscover()" class="mt-4 w-full bg-zinc-100 py-3 rounded-full text-sm">← Back</button>
</div>`
}

window.likePerson=(i)=>{
if(!currentUser){ renderLogin(); return }
alert(`You liked ${demo[i].name} ❤️ Free! But to CHAT you need Premium.`)
}
window.tryChat=(i)=>{
if(!currentUser){ renderLogin(); return }
renderPremium()
}
window.pay=(amount,plan)=>{
if(amount<20000){ alert('Pesapal requires >20,000 UGX'); return }
alert(`DEMO: Would redirect to Pesapal for ${plan} - ${amount.toLocaleString()} UGX (min 20k passed ✅). Add PESAPAL_KEY in Vercel to go live!`)
localStorage.setItem('kla_premium', plan)
alert(`${plan} Activated! You can now chat 💬`)
renderDiscover()
}
window.payCrypto=()=>alert('Send USDT TRC20 to TX...KLA... after payment WhatsApp for activation')
window.nextStep=()=>{ currentStep++; renderOnboarding() }
window.saveStep1=()=>{
const n=document.getElementById('name').value
if(!n){ alert('Enter name'); return }
onboarding.name=n
onboarding.birthday=document.getElementById('birthday').value
nextStep()
}
window.selectGender=(g)=>{ onboarding.gender=g; renderOnboarding() }
window.toggleInterest=(i)=>{
if(onboarding.interests.includes(i)) onboarding.interests=onboarding.interests.filter(x=>x!=i)
else onboarding.interests.push(i)
renderOnboarding()
}
window.finishOnboarding=()=>{
currentUser={name:onboarding.name||'New User', gender:onboarding.gender, interests:onboarding.interests}
localStorage.setItem('kla_user', JSON.stringify(currentUser))
currentStep=1
renderDiscover()
}
window.doLogin=()=>{
const email=document.getElementById('email').value
if(!email){ alert('Enter email'); return }
currentUser={name:email.split('@')[0], email}
localStorage.setItem('kla_user', JSON.stringify(currentUser))
renderDiscover()
}
window.logout=()=>{ localStorage.removeItem('kla_user'); currentUser=null; renderWelcome() }
window.renderOnboarding=()=>{ currentStep=1; renderOnboarding() }
window.renderLogin=renderLogin
window.renderDiscover=renderDiscover
window.renderWelcome=renderWelcome
window.renderPremium=renderPremium
window.renderChatList=()=>alert('Chat list - Premium needed to chat')
window.showPage=(p)=>{
if(p=='privacy') alert('Privacy Policy: We never share exact location. Verified profiles, 24/7 safety. Data encrypted. Contact: privacy@kla-meet.com')
if(p=='terms') alert('Terms: 18+ only. Be respectful. No harassment. Keep Love Alive. Full terms at kla-meet.com/terms')
if(p=='safety') alert('Safety: Verify profile, meet in public, report suspicious users. 24/7 support. Your safety is our priority.')
if(p=='about') alert('About KLA-MEET: Date. Meet. Connect. Worldwide. 1M+ members. Built for real connections.')
if(p=='community') alert('Community: Join thousands worldwide building meaningful relationships safely.')
if(p=='stories') alert('Success Stories: Thousands found love on KLA-MEET - Keep Love Alive!')
}

if(currentUser) renderDiscover()
else renderWelcome()