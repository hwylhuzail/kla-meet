"use client";
export default function TrustBar() {
  return (
    <section className="bg-zinc-50 border-y border-zinc-100 py-10">
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
        {[
          {k:"10K+", v:"Connections"},
          {k:"150+", v:"Countries"},
          {k:"100%", v:"Verified"},
          {k:"24/7", v:"Active"},
        ].map((s,i)=>(
          <div key={i}><div className="text-2xl font-bold">{s.k}</div><div className="text-zinc-500 text-sm">{s.v}</div></div>
        ))}
      </div>
    </section>
  )
}
