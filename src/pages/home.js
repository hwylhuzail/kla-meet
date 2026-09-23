export function home(){
return `
<header class="flex justify-between items-center px-6 lg:px-14 py-4 border-b bg-white sticky top-0 z-50">
  <div class="flex items-center gap-2 font-black text-[20px]"><div class="w-8 h-8 rounded-full bg-[#FFC700] grid place-items-center border-2 border-black">📍</div> KLA-MEET</div>
  <nav class="hidden md:flex gap-7 font-bold text-[13px]"><a href="/about/">About</a><a href="/safety/">Safety</a><a href="/guidelines/">Community</a></nav>
  <div class="flex gap-2"><a href="/login/" class="px-5 py-2 rounded-full border-2 border-black font-bold text-[13px]">Log in</a><a href="/signup/?step=1" class="px-5 py-2 rounded-full bg-[#FFC700] border-2 border-black font-black text-[13px]">Sign up</a></div>
</header>
<section class="px-6 lg:px-14 py-12 grid lg:grid-cols-2 gap-10 items-center">
  <div>
    <h1 class="text-[46px] lg:text-[62px] font-black leading-[0.88]">Date. Meet.<br/>Connect.<br/>In Kampala.</h1>
    <p class="mt-5 text-[15px] text-zinc-600 max-w-[520px]">The modern way for Kampala to meet real people, nearby.</p>
    <div class="mt-7 flex gap-3"><a href="/signup/?step=1" class="px-7 py-3 rounded-full bg-[#FFC700] border-2 border-black font-black text-sm">Get Started — It's Free →</a></div>
  </div>
  <div class="relative"><div class="absolute -z-10 -right-14 top-12 w-[140%] h-[86%] bg-[#FFC700] rounded-l-[80px]"></div><img src="https://images.unsplash.com/photo-1525134479668-1bee5c7c6845?q=80&w=900" class="rounded-[26px] w-full h-[480px] object-cover border-[3px] border-black"/></div>
</section>
<section class="bg-[#fafafa] py-16 px-6"><h2 class="text-center text-[28px] font-black">How KLA-MEET Works</h2><div class="mt-8 grid grid-cols-2 lg:grid-cols-5 gap-4 max-w-[1100px] mx-auto">${[1,2,3,4,5].map(n=>`<div class="text-center"><div class="bg-black text-white rounded-[24px] p-4 h-[280px] border-2"><div class="text-[10px] text-[#FFC700]">Step ${n} of 5</div><div class="mt-6 font-bold text-[12px]">Step ${n}</div><div class="mt-auto bg-[#FFC700] text-black py-2 rounded-full font-black text-[11px]">Continue</div></div></div>`).join('')}</div></section>
`}
}
