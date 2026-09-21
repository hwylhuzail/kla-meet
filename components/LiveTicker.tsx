"use client";
export default function LiveTicker() {
  const items = [
    "💛 Sharon from around the world just joined",
    "🌍 Kevin matched with Aisha from Paris",
    "✨ 3 people from USA are online now",
    "🔥 New: 12 people near you",
    "💬 Maria replied to a message",
  ];
  return (
    <div className="w-full bg-black text-white py-3 overflow-hidden border-y border-zinc-800">
      <div className="flex animate-[marquee_20s_linear_infinite] gap-12 whitespace-nowrap">
        {[...items,...items].map((t,i)=>(
          <span key={i} className="text-sm tracking-wide opacity-90">{t}</span>
        ))}
      </div>
      <style>{`@keyframes marquee{0%{transform:translateX(0)}100%{transform:translateX(-50%)}}`}</style>
    </div>
  )
}
