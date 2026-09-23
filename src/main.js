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
  <div class="p-6"><h2 class="text-xl font-bold">You 👤</h2>
  <div class="mt-4 bg-zinc-900 rounded-[26px] p-6 border border-zinc-800 text-center">
    <div class="w-20 h-20 bg-zinc-800 rounded-full mx-auto flex items-center justify-center text-3xl">👤</div>
    <p class="font-bold mt-3">Welcome to KLA</p><p class="text-xs text-[#00D8A0] tracking-widest">KEEP LOVE ALIVE</p>
    <p class="text-sm text-zinc-400 mt-3">International dating • 12,847 singles</p>
    <button onclick="alert('Premium coming: Pesapal + Crypto (USDT, BTC)')" class="mt-4 w-full bg-[#FF6B00] py-3 rounded-full font-bold text-sm">⭐ Get Premium - $9.99</button>
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
    document.querySelectorAll('nav a').forEach(x=>x.className='text-zinc-500 text-xs')
    a.className='text-[#00D8A0] text-xs text-center'
  })
})