export function home(){
return `
<header class="flex justify-between items-center px-6 py-4 border-b bg-white sticky top-0 z-50">
  <div class="flex items-center gap-2 font-black text-[20px]"><div class="w-8 h-8 rounded-full bg-[#FFC700] grid place-items-center border-2 border-black">♥</div> KLA-MEET</div>
  <div class="flex gap-2"><a href="/login/" class="px-5 py-2 rounded-full border-2 border-black font-bold text-[13px]">Log in</a><a href="/signup/?step=1" class="px-5 py-2 rounded-full bg-[#FFC700] border-2 border-black font-black text-[13px]">Sign up</a></div>
</header>
<section class="px-6 py-12 grid lg:grid-cols-2 gap-10 items-center">
  <div>
    <h1 class="text-[46px] lg:text-[64px] font-black leading-[0.88]">Date. Meet.<br/>Connect.<br/>Worldwide.</h1>
    <p class="mt-5 text-[14px] text-zinc-600">Modern, international way to meet real people.</p>
    <div class="mt-7 flex gap-3"><a href="/discover/" class="px-7 py-3 rounded-full bg-black text-white border-2 border-black font-black text-sm">Discover →</a><a href="/signup/?step=1" class="px-7 py-3 rounded-full bg-[#FFC700] border-2 border-black font-black text-sm">Get Started</a></div>
  </div>
  <div class="relative"><div class="absolute -z-10 -right-10 top-10 w-[130%] h-[85%] bg-[#FFC700] rounded-l-[80px]"></div><img src="https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=900" class="rounded-[26px] w-full h-[480px] object-cover border-[3px] border-black"/></div>
</section>
<section class="bg-[#fafafa] py-12 px-6">
  <h2 class="text-center text-[28px] font-black">How It Works</h2>
  <div class="mt-8 grid grid-cols-2 lg:grid-cols-5 gap-4 max-w-[1100px] mx-auto">
    <div class="phone h-[340px] relative"><img src="https://images.unsplash.com/photo-1524661135-423995f22d0b?w=400" class="w-full h-full object-cover"/><div class="absolute bottom-0 p-3 bg-gradient-to-t from-black/70 to-transparent w-full text-white font-bold text-[12px]">1. Location</div></div>
    <div class="phone h-[340px] relative"><img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400" class="w-full h-full object-cover"/><div class="absolute bottom-0 p-3 bg-gradient-to-t from-black/70 to-transparent w-full text-white font-bold text-[12px]">2. Profile</div></div>
    <div class="phone h-[340px] relative"><img src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=400" class="w-full h-full object-cover"/><div class="absolute bottom-0 p-3 bg-gradient-to-t from-black/70 to-transparent w-full text-white font-bold text-[12px]">3. Interests</div></div>
    <div class="phone h-[340px] relative"><img src="https://images.unsplash.com/photo-1554151228-14d9def656e4?w=400" class="w-full h-full object-cover"/><div class="absolute bottom-0 p-3 bg-gradient-to-t from-black/70 to-transparent w-full text-white font-bold text-[12px]">4. KYC (Optional)</div></div>
    <div class="phone h-[340px] relative"><img src="https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=400" class="w-full h-full object-cover"/><div class="absolute bottom-0 p-3 bg-gradient-to-t from-black/70 to-transparent w-full text-white font-bold text-[12px]">5. Premium 20K</div></div>
  </div>
</section>
<footer class="bg-black text-white text-[11px] px-6 py-4 flex justify-between"><span>© 2026 KLA-MEET • International</span><span>About • Safety • Guidelines</span></footer>
`
}
