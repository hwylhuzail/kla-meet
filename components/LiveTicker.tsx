"use client";
export default function LiveTicker(){
  return (
    <div className="w-full bg-black text-[#FFC629] py-2.5 overflow-hidden border-y border-white/10">
      <div className="flex whitespace-nowrap gap-10 animate-marquee">
        <span className="text-[12px] font-bold">💛 Sharon from around the world just joined • </span>
        <span className="text-[12px] font-bold">✨ James from New York just connected • </span>
        <span className="text-[12px] font-bold">🌍 Aisha from London is online • </span>
        <span className="text-[12px] font-bold">💛 Sharon from around the world just joined • </span>
      </div>
      <style>{`@keyframes marquee{0%{transform:translateX(0)}100%{transform:translateX(-50%)}}.animate-marquee{animation: marquee 15s linear infinite}`}</style>
    </div>
  )
}
