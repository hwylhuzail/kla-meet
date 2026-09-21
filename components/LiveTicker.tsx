"use client";
export default function LiveTicker(){
  const messages = ["💛 Sharon from around the world just joined", "✨ James from New York just connected", "🌍 Aisha from London is online"];
  return <div className="flex overflow-hidden"><div className="animate-marquee flex gap-8">{messages.map((m,i)=><span key={i}>{m}</span>)}</div></div>
}
