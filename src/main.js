import './style.css'

const demo=[
{name:"Maya, 24 🇺🇸",city:"New York • 2km", bio:"Keep Love Alive 💚"},
{name:"Alex, 26 🇬🇧",city:"London • 5km", bio:"Adventurer • Coffee lover"},
{name:"Chloe, 23 🇨🇦",city:"Toronto • 1km", bio:"Artist • Travel"},
{name:"Jordan, 29 🇦🇺",city:"Sydney • 3km", bio:"Surfer • Music"},
{name:"Luna, 25 🇩🇪",city:"Berlin • 4km", bio:"Designer • Love"},
{name:"Sam, 27 🇿🇦",city:"Cape Town • 2km", bio:"Keep Love Alive"}
]

function renderDiscover(){
  const app=document.getElementById('app')
  app.innerHTML=`
  <p class="px-6 text-zinc-400 text-[13px] mt-2">12,847 singles worldwide • Keep Love Alive</p>
  <div id="grid" class="grid grid-cols-2 gap-3 p-3 mt-3"></div>
  `
  const grid=document.getElementById('grid')
  grid.innerHTML=demo.map((p,i)=>`
    <div class="bg-zinc-900 rounded-[26px] p-2 border border-zinc-800">
      <div class="w-full h-[130px] bg-gradient-to-br from-teal-500/20 to-orange-500/20 rounded-[20px] flex items-center justify-center text-3xl">👤</div>
      <p class="font-bold mt-2 text-center text-[14px]">${p.name}</p>
      <p class="text-[11px] text-center text-zinc-400">📍 ${p.city}</p>
      <div class="flex gap-1 mt-2">
        <button onclick="likeUser(${i})" class="flex-1 bg-zinc-800 py-2 rounded-full text-xs">❤️ Like</button>
        <button onclick="openChat(${i})" class="flex-1 bg-[#00D8A0] text-black py-2 rounded-full text-xs font-bold">💬 Chat</button>
      </div>
    </div>
  `).join('')
}

function renderChat(){
  document.getElementById('app').innerHTML=`
  <div class="p-6"><h2 class="text-xl font-bold">Messages 💬</h2>
  <p class="text-zinc-500 text-sm mt-2">Upgrade to Premium to chat internationally 🌍</p>
  <div class="mt-4 bg-zinc-900 rounded-2xl p-4 border border-zinc-800">
    ${demo.slice(0,3).map(p=>`<div class="flex items-center gap-3 py-3 border-b border-zinc-800 last:border-0"><div class="w-10 h-10 bg-zinc-800 rounded-full flex items-center justify-center">👤</div><div><p class="text-sm font-bold">${p.name}</p><p class="text-xs text-zinc-500">${p.bio}</p></div><button onclick="openChat(0)" class="ml-auto text-xs bg-[#00D8A0] text-black px-3 py-1 rounded-full">Chat</button></div>`).join('')}
  </div>
  <button onclick="renderDiscover()" class="mt-4 w-full bg-zinc-800 py-3 rounded-full text-sm">← Back to Discover</button>
  </div>`
}

function renderProfile(){
  document.getElementById('app').innerHTML=`
  <div class="p-4 pb-28"><h2 class="text-xl font-bold">You 👤 Premium Plans</h2>
  <p class="text-[12px] text-zinc-500 mt-1">Pesapal requires min 20,000 UGX • All plans >20k ✅</p>
  
  <div class="mt-4 space-y-4">
    <!-- BASIC 35,000 UGX -->
    <div class="bg-zinc-900 rounded-[26px] p-5 border border-zinc-800">
      <div class="flex justify-between items-center"><h3 class="font-black text-[16px]">BASIC</h3><p class="font-bold text-[#00D8A0]">35,000 UGX</p></div>
      <p class="text-[11px] text-zinc-500">~$9.99 / month • Keep Love Alive</p>
      <ul class="mt-3 text-[13px] space-y-1.5 text-zinc-300">
        <li>✅ Unlimited Likes ❤️</li>
        <li>✅ See who liked you 👀</li>
        <li>✅ 10 Chats per day 💬</li>
        <li>✅ International filter (5 countries) 🌍</li>
        <li>✅ Basic search filters</li>
        <li>❌ No Video Call</li>
        <li>❌ No Boost</li>
      </ul>
      <button onclick="payPesapal(35000,'BASIC')" class="mt-4 w-full bg-zinc-800 py-3 rounded-full font-bold text-sm">💳 Pesapal - MTN/Airtel/Card 35k</button>
      <button onclick="payCrypto('BASIC - 35k')" class="mt-2 w-full bg-[#121212] border border-zinc-700 py-3 rounded-full text-sm">🪙 Crypto USDT/BTC - $9.99</button>
    </div>

    <!-- STANDARD 75,000 UGX - MOST POPULAR -->
    <div class="bg-zinc-900 rounded-[26px] p-5 border-2 border-[#00D8A0] relative">
      <span class="absolute -top-3 left-5 bg-[#00D8A0] text-black text-[10px] px-3 py-1 rounded-full font-bold">MOST POPULAR 🔥</span>
      <div class="flex justify-between items-center"><h3 class="font-black text-[16px]">STANDARD</h3><p class="font-bold text-[#00D8A0]">75,000 UGX</p></div>
      <p class="text-[11px] text-zinc-500">~$19.99 / month</p>
      <ul class="mt-3 text-[13px] space-y-1.5 text-white">
        <li>✅ <b>Everything in BASIC included</b></li>
        <li>✅ Unlimited Chats 💬 unlimited</li>
        <li>✅ Unlimited Likes ❤️</li>
        <li>✅ See who liked you + Super Likes</li>
        <li>✅ International filter ALL countries 🌍</li>
        <li>✅ Video Call 30 min/day 📹</li>
        <li>✅ 1 Boost per week 🚀 (top profile)</li>
        <li>✅ Read receipts + No Ads</li>
        <li>✅ Advanced filters (age, distance)</li>
      </ul>
      <button onclick="payPesapal(75000,'STANDARD')" class="mt-4 w-full bg-[#00D8A0] text-black py-3 rounded-full font-bold text-sm">💳 Pay STANDARD 75,000 UGX</button>
      <button onclick="payCrypto('STANDARD - 75k')" class="mt-2 w-full bg-[#121212] border border-[#00D8A0]/30 py-3 rounded-full text-sm">🪙 Crypto USDT - $19.99</button>
    </div>

    <!-- VIP 150k -->
    <div class="bg-gradient-to-br from-orange-500/20 to-zinc-900 rounded-[26px] p-5 border border-orange-500/30">
      <div class="flex justify-between items-center"><h3 class="font-black text-[16px]">VIP KLA</h3><p class="font-bold text-orange-400">150,000 UGX</p></div>
      <p class="text-[11px] text-zinc-500">~$39.99 / month</p>
      <ul class="mt-3 text-[13px] space-y-1.5 text-zinc-300">
        <li>✅ Everything in STANDARD + BASIC</li>
        <li>✅ Unlimited Video Calls 📹</li>
        <li>✅ Daily Boost + VIP Badge 👑</li>
        <li>✅ Top Profile in all countries</li>
      </ul>
      <button onclick="payPesapal(150000,'VIP')" class="mt-4 w-full bg-[#FF6B00] py-3 rounded-full font-bold text-sm">Pay VIP 150k UGX</button>
    </div>
  </div>
  <button onclick="renderDiscover()" class="mt-4 w-full bg-zinc-800 py-3 rounded-full text-sm">← Back to Discover</button>
  </div>`
}

window.likeUser=(i)=>alert(`You liked ${demo[i].name} ❤️ - Keep Love Alive!`)
window.openChat=(i)=>{
  document.getElementById('app').innerHTML=`
  <div class="p-6"><h2 class="text-xl font-bold">Chat with ${demo[i].name} 💬</h2>
  <div class="mt-4 bg-zinc-900 rounded-2xl p-4 h-[300px] flex flex-col justify-end border border-zinc-800">
    <p class="text-sm text-zinc-300">${demo[i].bio}</p>
    <p class="text-xs text-zinc-500 mt-2">Say hi to keep love alive! 💚</p>
    <div class="flex gap-2 mt-4"><input id="msg" placeholder="Type a message..." class="flex-1 bg-zinc-800 rounded-full px-4 py-2 text-sm outline-none"><button onclick="sendMsg()" class="bg-[#00D8A0] text-black px-5 py-2 rounded-full text-sm font-bold">Send</button></div>
  </div>
  <button onclick="renderDiscover()" class="mt-4 w-full bg-zinc-800 py-3 rounded-full text-sm">← Back</button>
  </div>`
}
window.sendMsg=()=>{
  const m=document.getElementById('msg').value
  if(m) alert(`Message sent: "${m}" - Premium unlocks real chat!`)
}

// PESAPAL WORKING >20k
window.payPesapal=async(amount,plan)=>{
  if(amount < 20000){ alert('Pesapal minimum is 20,000 UGX - amount too low!'); return }
  const btn=event.target
  const oldText=btn.innerText
  btn.innerText='Connecting Pesapal...'
  btn.disabled=true
  try{
    const r=await fetch('/api/pesapal-order',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({amount,plan})})
    const d=await r.json()
    console.log(d)
    if(d.redirect_url){ window.location.href=d.redirect_url; return }
    if(d.order_tracking_id){ window.location.href=`https://pay.pesapal.com/iframe/PesapalIframe3/Index?OrderTrackingId=${d.order_tracking_id}`; return }
    if(d.error && d.error.includes('env')) throw new Error('Add PESAPAL_KEY in Vercel')
    // DEMO MODE if no keys yet
    if(!d.redirect_url){
      alert(`DEMO MODE (Add Pesapal keys in Vercel to go live):\n\nPlan: ${plan}\nAmount: ${amount.toLocaleString()} UGX (>20k OK ✅)\n\nWould redirect to Pesapal MTN/Airtel/Card.\n\nIn demo, we activate Premium for you!`)
      alert(`✅ ${plan} Activated! Keep Love Alive 💚`)
      renderDiscover()
    }
  }catch(e){
    alert(`Pesapal Error: ${e.message}\n\nDEMO: Activating ${plan} for 35k/75k (>20k limit passed ✅)`)
    renderDiscover()
  }finally{
    btn.innerText=oldText
    btn.disabled=false
  }
}
window.payCrypto=(plan)=>alert(`Crypto Payment for ${plan}\n\nSend USDT TRC20 to:\nTXa7KLA...KeepLoveAlive...USDT\n\nOr BTC:\nbc1qkla...keep...love...\n\nAmount: 35k= $9.99, 75k= $19.99\nAfter payment WhatsApp +256... with TX ID`)

window.renderDiscover=renderDiscover
window.renderChat=renderChat
window.renderProfile=renderProfile

renderDiscover()

document.querySelectorAll('nav a').forEach(a=>{
  a.addEventListener('click',e=>{
    e.preventDefault()
    const href=a.getAttribute('href')
    if(href==='#chat') renderChat()
    else if(href==='#profile') renderProfile()
    else renderDiscover()
    document.querySelectorAll('nav a').forEach(x=>x.className='text-zinc-500 text-xs text-center')
    a.className='text-[#00D8A0] text-xs text-center'
  })
})