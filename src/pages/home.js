export function home(){
return `
<header class="flex justify-between items-center px-6 lg:px-14 py-4 border-b bg-white sticky top-0 z-50">
  <div class="flex items-center gap-2 font-black text-[20px]"><div class="w-8 h-8 rounded-full bg-[#FFC700] grid place-items-center border-2 border-black">📍</div> KLA-MEET</div>
  <nav class="hidden md:flex gap-7 font-bold text-[13px]"><a href="/about/">About</a><a href="/safety/">Safety</a><a href="/guidelines/">Community</a></nav>
  <div class="flex gap-2"><a href="/login/" class="px-5 py-2 rounded-full border-2 border-black font-bold text-[13px]">Log in</a><a href="/signup/?step=1" class="px-5 py-2 rounded-full bg-[#FFC700] border-2 border-black font-black text-[13px]">Sign up</a></div>
</header>

<section class="px-6 lg:px-14 py-12 grid lg:grid-cols-2 gap-10 items-center">
  <div>
    <h1 class="text-[46px] lg:text-[62px] font-black leading-[0.88] tracking-tight">Date. Meet.<br/>Connect.<br/>In Kampala.</h1>
    <p class="mt-5 text-[15px] text-zinc-600 max-w-[520px]">The modern way for Kampala to meet real people, nearby. Join thousands of singles building meaningful relationships — safely, locally, authentically.</p>
    <div class="mt-7 flex gap-3"><a href="/signup/?step=1" class="px-7 py-3 rounded-full bg-[#FFC700] border-2 border-black font-black text-sm">Get Started — It's Free</a></div>
    <div class="mt-5 flex gap-3 text-[11px] font-bold text-zinc-700"><span>Verified profiles</span><span>Privacy-first</span><span>Made for Kampala</span></div>
  </div>
  <div class="relative"><div class="absolute -z-10 -right-14 top-12 w-[140%] h-[86%] bg-[#FFC700] rounded-l-[80px]"></div><img src="https://images.unsplash.com/photo-1525134479668-1bee5c7c6845?q=80&w=900" class="rounded-[26px] w-full h-[480px] object-cover border-[3px] border-black"/></div>
</section>

<section class="bg-[#fafafa] py-16 px-6">
  <h2 class="text-center text-[30px] font-black">How KLA-MEET Works</h2>
  <p class="text-center text-zinc-600 mt-2 text-[14px]">Get started in 5 simple steps.</p>
  <div class="mt-10 grid grid-cols-2 lg:grid-cols-5 gap-6 max-w-[1100px] mx-auto">
    <div class="text-center"><div class="bg-black text-white rounded-[26px] p-4 h-[300px] border-2"><div class="text-[10px] text-[#FFC700]">Step 1 of 5</div><div class="mt-6 font-bold">Name</div></div><div class="mt-2 font-black text-[11px]">1. Name & Birthday</div></div>
    <div class="text-center"><div class="bg-black text-white rounded-[26px] p-4 h-[300px] border-2"><div class="text-[10px] text-[#FFC700]">Step 2 of 5</div><div class="mt-6 font-bold">Gender</div></div><div class="mt-2 font-black text-[11px]">2. Gender</div></div>
    <div class="text-center"><div class="bg-black text-white rounded-[26px] p-4 h-[300px] border-2"><div class="text-[10px] text-[#FFC700]">Step 3 of 5</div><div class="mt-6 font-bold">Looking for</div></div><div class="mt-2 font-black text-[11px]">3. Relationship</div></div>
    <div class="text-center"><div class="bg-black text-white rounded-[26px] p-4 h-[300px] border-2"><div class="text-[10px] text-[#FFC700]">Step 4 of 5</div><div class="mt-6 font-bold">Interests</div></div><div class="mt-2 font-black text-[11px]">4. Interests</div></div>
    <div class="text-center"><div class="bg-black text-white rounded-[26px] p-4 h-[300px] border-2"><div class="text-[10px] text-[#FFC700]">Step 5 of 5</div><div class="mt-6 font-bold">Location</div></div><div class="mt-2 font-black text-[11px]">5. Location</div></div>
  </div>
</section>

<footer class="bg-black text-white text-[10px] px-6 py-3 flex justify-between"><span>Built with Vite</span><span>© 2024 KLA-MEET - Made in Kampala</span></footer>
`
}
