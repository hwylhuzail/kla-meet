import './style.css'

const demo=[
 {id:1,name:"Lisa",age:22,city:"Kampala",bio:"Verified"},
 {id:2,name:"Shanitah",age:24,city:"Entebbe",bio:"Real"},
 {id:3,name:"Aisha",age:23,city:"Kampala",bio:"New"}
]

const footerHTML=`<div class="p-6 text-center text-[11px] text-zinc-500"><div class="flex flex-wrap justify-center gap-3 underline"><a href="/how-it-works" onclick="route(event,'/how-it-works')">How it works</a><a href="/faqs" onclick="route(event,'/faqs')">FAQs</a><a href="/safety" onclick="route(event,'/safety')">Safety</a><a href="/terms" onclick="route(event,'/terms')">Terms</a><a href="/privacy" onclick="route(event,'/privacy')">Privacy</a><a href="/about" onclick="route(event,'/about')">About</a></div><p class="mt-3">KLA-MEET 2026 - Keep Love Alive</p></div>`

function route(e,path){
  if(e) e.preventDefault()
  history.pushState(null,null,path)
  render(path)
}

window.route=route

function renderWelcome(){
  document.getElementById('app').innerHTML=`<div class="max-w-[430px] mx-auto min-h-screen bg-white"><div class="p-6"><div class="border-2 border-black rounded-[28px] p-6"><h1 class="text-3xl font-black text-center">KLA•MEET</h1><p class="text-center text-sm mt-2">Keep Love Alive - Kampala + Worldwide</p><div class="mt-6 space-y-3"><a href="/signin" onclick="route(event,'/signin')" class="block bg-yellow-400 text-center py-3 rounded-full font-black border-2 border-black">Create Account - Free</a><a href="/login" onclick="route(event,'/login')" class="block bg-black text-white text-center py-3 rounded-full font-bold">Sign In</a></div><div class="mt-6 grid grid-cols-3 gap-2">${demo.map(d=>`<div class="border rounded-xl p-2 text-center"><b class="text-sm">${d.name}</b><p class="text-[11px] text-zinc-500">${d.age}, ${d.city}</p></div>`).join('')}</div></div></div>${footerHTML}</div>`
}

function renderStatic(path){
  let t='', b=''
  if(path==='/how-it-works'){t='How it Works';b='<p class="text-sm leading-6 text-left">1. Sign up<br>2. Enable Location<br>3. Like FREE<br>4. Chat Premium $3.99 / $6.99 USD via Pesapal LIVE</p>'}
  if(path==='/faqs'){t='FAQs';b='<p class="text-sm text-left">Like FREE, Chat Premium. Why USD? UGX min 20k, USD min $1.</p>'}
  if(path==='/about'){t='About';b='<p class="text-sm text-left">KLA-MEET Real verified people. Keep Love Alive.</p>'}
  if(path==='/terms'){t='Terms';b='<p class="text-sm text-left">18+ only. Premium $3.99/$6.99 USD.</p>'}
  if(path==='/privacy'){t='Privacy';b='<p class="text-sm text-left">We store only email, name, city. No selling data.</p>'}
  if(path==='/safety'){t='Safety';b='<p class="text-sm text-left">Meet public, tell friend, video call first.</p>'}
  if(path==='/guidelines'){t='Guidelines';b='<p class="text-sm text-left">Be kind, 18+, no nudity/scam.</p>'}
  if(!t){t=path; b='<p class="text-sm">Page ready.</p>'}
  document.getElementById('app').innerHTML=`<div class="max-w-[430px] mx-auto min-h-screen bg-white"><div class="p-4 border-b flex justify-between"><a href="/" onclick="route(event,'/')" class="font-black">KLA•MEET</a><a href="/" onclick="route(event,'/')" class="text-xs underline">Home</a></div><div class="p-5"><div class="border-2 border-black rounded-[28px] p-6"><h1 class="text-xl font-black text-center">${t}</h1><div class="mt-4">${b}</div></div></div>${footerHTML}</div>`
}

function render(path){
  if(path==='/' || path==='/index.html'){renderWelcome(); return}
  if(['/how-it-works','/faqs','/about','/terms','/privacy','/safety','/guidelines'].includes(path)){renderStatic(path); return}
  if(path==='/signin' || path==='/signup' || path==='/login'){renderStatic('/how-it-works'); return}
  renderWelcome()
}

render(window.location.pathname)
window.addEventListener('popstate',()=>render(window.location.pathname))
