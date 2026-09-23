import { supabase } from '../lib/supabase.js'

export function renderLoginPage(appEl, footerHTML, onboard){
  const el = document.getElementById('app')
  el.innerHTML=`
<div class="min-h-screen flex flex-col bg-white">
<div class="p-6 flex justify-between border-b"><a href="/" onclick="window.route(event,'/')" class="font-black text-xl">KLA•MEET</a><a href="/signin" onclick="window.route(event,'/signin')" class="text-xs bg-yellow-400 px-4 py-1.5 rounded-full font-bold">Sign Up</a></div>
<div class="flex-1 flex items-center justify-center p-6">
<div class="w-full max-w-[360px] border-2 border-black rounded-[30px] p-7 bg-white">
<h2 class="font-black text-xl text-center">Sign In 💛 /login</h2>
<div class="flex gap-2 mt-5">
<button onclick="window.setLoginMode('password')" id="tab-pass" class="flex-1 py-2.5 rounded-full text-xs font-black bg-black text-white">Password</button>
<button onclick="window.setLoginMode('code')" id="tab-code" class="flex-1 py-2.5 rounded-full text-xs bg-zinc-100">Code</button>
</div>
<div id="login-form" class="mt-5"></div>
<p class="text-xs text-center mt-4">No account? <a href="/signin" onclick="window.route(event,'/signin')" class="underline font-bold">Create /signin</a></p>
</div>
</div>
${footerHTML}
</div>`
  window.setLoginMode(onboard.loginMode)
}

export function setLoginModeUI(mode, onboard){
  onboard.loginMode=mode
  const p=document.getElementById('tab-pass'), c=document.getElementById('tab-code')
  if(p) p.className= mode==='password'?'flex-1 py-2.5 rounded-full text-xs font-black bg-black text-white':'flex-1 py-2.5 rounded-full text-xs bg-zinc-100 font-bold'
  if(c) c.className= mode==='code'?'flex-1 py-2.5 rounded-full text-xs font-black bg-black text-white':'flex-1 py-2.5 rounded-full text-xs bg-zinc-100 font-bold'
  const el=document.getElementById('login-form')
  if(mode==='password'){
    el.innerHTML=`<input id="email" placeholder="Email" class="w-full border-2 border-black rounded-xl px-4 py-3 text-sm bg-[#E8F0FE]"><div class="relative mt-3"><input id="pass" type="password" placeholder="Password" class="w-full border rounded-xl px-4 py-3 pr-12 text-sm bg-[#E8F0FE]"><button type="button" onclick="window.toggleEye('pass',this)" class="absolute right-3 top-1/2 -translate-y-1/2 text-lg">👁️</button></div><button onclick="window.doLogin()" class="mt-4 w-full bg-yellow-400 py-3.5 rounded-full font-black">Sign In</button><button onclick="window.sendMagicLink()" class="mt-3 w-full bg-zinc-100 py-3 rounded-full text-xs font-bold">Send activation code →</button>`
  } else {
    el.innerHTML=`<input id="email" placeholder="Email" value="${onboard.email||''}" class="w-full border-2 border-black rounded-xl px-4 py-3 text-sm"><button onclick="window.sendMagicLink()" class="mt-3 w-full bg-yellow-400 py-3.5 rounded-full font-black">Send Activation Code →</button><div class="mt-5 border-t pt-5"><div class="relative"><input id="otp" type="password" placeholder="Enter 6-digit code" class="w-full border-2 border-black rounded-xl px-4 py-3 text-center tracking-[6px] pr-12"><button type="button" onclick="window.toggleEye('otp',this)" class="absolute right-3 top-1/2 -translate-y-1/2 text-lg">👁️</button></div><button onclick="window.verifyOtpLogin()" class="mt-3 w-full bg-black text-white py-3.5 rounded-full font-bold">Verify & Login</button></div>`
  }
}