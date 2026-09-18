"use client";
import Link from "next/link";
import { useState } from "react";

export default function Home() {
  return (
    <main className="min-h-screen bg-white text-[#111]">
      {/* HEADER - Like Bumble */}
      <header className="sticky top-0 z-50 flex items-center justify-between bg-white px-6 py-4 lg:px-10 border-b border-black/5">
        <Link href="/" className="text-2xl font-black tracking-tight">KLA<span className="text-[#FFC629]">•</span>MEET</Link>
        <div className="flex items-center gap-3">
          <a href="#explore" className="hidden md:inline-flex text-sm font-bold">Explore</a>
          <Link href="/auth" className="rounded-full border-2 border-black px-6 py-2.5 text-sm font-black hover:bg-black hover:text-white transition">Sign In</Link>
        </div>
      </header>

      {/* HERO - Bumble style */}
      <section className="bg-[#FFC629] px-6 py-16 lg:px-10 lg:py-24">
        <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-2">
          <div>
            <h1 className="text-[52px] md:text-[84px] font-black leading-[0.85] tracking-[-0.05em]">Make the<br/>first move.</h1>
            <p className="mt-6 max-w-md text-lg font-medium leading-6">Meet new people nearby and worldwide. Real connections start with a thoughtful hello.</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/auth" className="rounded-full bg-black px-8 py-4 text-base font-black text-white hover:bg-zinc-800 transition">Create Account</Link>
              <Link href="/discover" className="rounded-full bg-white px-8 py-4 text-base font-black text-black border-2 border-black hover:bg-black hover:text-white transition">Start Meeting</Link>
            </div>
            <p className="mt-4 text-xs font-bold opacity-60">18+ • Safety first • Free to start</p>
          </div>
          <div className="relative mx-auto">
            <div className="relative h-[520px] w-[340px] rounded-[48px] bg-white p-3 shadow-[0_30px_80px_rgba(0,0,0,0.2)] rotate-[-2deg]">
              <img src="https://i.pravatar.cc/640?img=47" className="h-[65%] w-full rounded-[36px] object-cover"/>
              <div className="p-4">
                <h3 className="text-xl font-black">Maya, 28</h3>
                <p className="text-sm text-zinc-500">Curious mind • Loves long walks • Kampala</p>
                <div className="mt-3 flex gap-2">
                  <span className="rounded-full bg-black px-3 py-1 text-xs font-bold text-white">♥ Like</span>
                  <span className="rounded-full border-2 border-black px-3 py-1 text-xs font-bold">✕ Pass</span>
                </div>
              </div>
            </div>
            <div className="absolute -bottom-6 -right-6 rounded-full bg-black px-5 py-3 text-sm font-black text-[#FFC629] shadow-xl">🌍 150+ countries</div>
          </div>
        </div>
      </section>

      {/* EXPLORE SECTION - ONLY ON WELCOME PAGE (Bumble style) */}
      <section id="explore" className="bg-[#111] px-6 py-20 text-white lg:px-10">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <h2 className="text-5xl font-black leading-[0.9] tracking-tight">Explore<br/><span className="text-[#FFC629]">worldwide.</span></h2>
            <p className="max-w-sm text-white/60">Your Explore experience lives right here on the welcome page. No separate page needed. Filter by country, interests, and who's online now - then jump into Discover.</p>
          </div>
          <div className="mt-12 grid gap-4 md:grid-cols-3">
            <div className="rounded-[24px] bg-white/10 p-7">
              <div className="text-3xl">🌍</div>
              <h3 className="mt-4 text-xl font-black">Worldwide</h3>
              <p className="mt-2 text-sm text-white/60 leading-5">Browse people from Kampala to Tokyo. Filter by country or city.</p>
            </div>
            <div className="rounded-[24px] bg-white/10 p-7">
              <div className="text-3xl">🔍</div>
              <h3 className="mt-4 text-xl font-black">Smart Filters</h3>
              <p className="mt-2 text-sm text-white/60 leading-5">Find by interests, language, and what you're looking for.</p>
            </div>
            <div className="rounded-[24px] bg-[#FFC629] p-7 text-black">
              <div className="text-3xl">🟢</div>
              <h3 className="mt-4 text-xl font-black">Online Now</h3>
              <p className="mt-2 text-sm leading-5">See who's active in Discover and start a real conversation.</p>
              <Link href="/discover" className="mt-4 inline-flex rounded-full bg-black px-5 py-2.5 text-sm font-black text-white">Open Discover →</Link>
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS - Bumble 3 steps */}
      <section className="px-6 py-20 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-4xl font-black tracking-tight">How KLA MEET works</h2>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {[
              { n:"01", t:"Create your profile", d:"Add photos and what makes you, you." },
              { n:"02", t:"Discover people", d:"Explore nearby and worldwide in Discover feed." },
              { n:"03", t:"Make the first move", d:"If you like each other, start a meaningful hello." },
            ].map(s=>(
              <div key={s.n} className="rounded-[24px] border-2 border-black p-7">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-[#FFC629] font-black">{s.n}</span>
                <h3 className="mt-6 text-xl font-black">{s.t}</h3>
                <p className="mt-2 text-sm text-zinc-600">{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER CTA - Yellow like Bumble */}
      <section className="bg-[#FFC629] px-6 py-16 text-center lg:px-10">
        <h2 className="mx-auto max-w-2xl text-5xl font-black leading-[0.9] tracking-tight">A bigger world.<br/>A more personal hello.</h2>
        <Link href="/auth" className="mt-8 inline-flex rounded-full bg-black px-10 py-4 text-base font-black text-white hover:bg-zinc-900">Create your profile</Link>
        <p className="mt-3 text-xs font-bold opacity-60">No explore page - everything is here on welcome + Discover</p>
      </section>

      <footer className="bg-black px-6 py-8 text-center text-xs font-bold tracking-widest text-white/40">KLA•MEET © 2026 • SAFETY • GUIDELINES • TERMS</footer>
    </main>
  );
}