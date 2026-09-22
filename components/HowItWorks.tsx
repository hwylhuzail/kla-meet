"use client";
export default function HowItWorks() {
  return (
    <section id="app" className="max-w-6xl mx-auto px-6 py-16">
      <h2 className="text-3xl font-bold text-center mb-10">How KLA-MEET works</h2>
      <div className="grid md:grid-cols-3 gap-6">
        {[
          {icon:"🌍", title:"Discover", desc:"Find real people from 150+ countries near and far."},
          {icon:"💛", title:"Say Hi", desc:"Send interest, like or message. No swiping stress."},
          {icon:"💬", title:"Connect", desc:"Chat, video and meet safely on KLA-MEET."},
        ].map((c,i)=>(
          <div key={i} className="bg-white rounded-[24px] p-6 border border-zinc-100 shadow-[0_8px_30px_rgba(0,0,0,0.06)] text-center">
            <div className="text-4xl mb-4">{c.icon}</div>
            <h3 className="font-semibold text-lg mb-2">{c.title}</h3>
            <p className="text-zinc-500 text-sm">{c.desc}</p>
          </div>
        ))}
      </div>
    </section>
  )
}