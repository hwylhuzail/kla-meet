"use client";
export default function LiveTicker(){
  const messages = ["💛 Sharon from around the world just joined", "✨ James from New York just connected", "🌍 Aisha from London is online", "💛 Sharon from around the world just joined", "✨ James from New York just connected"];
  return (
    <div className="w-full bg-black text-[#FFC629] py-2.5 overflow-hidden border-y border-white/10">
      <div className="flex animate-marquee whitespace-nowrap gap-10">
        {messages.map((m,i)=><span key={i} className="text-[12px] font-bold tracking-wide">{m}</span>)}
      </div>
      <style>{`@keyframes marquee{0%{transform:translateX(0)}100%{transform:translateX(-50%)}}.animate-marquee{animation: marquee 18s linear infinite}`}</style>
    </div>
  )
}