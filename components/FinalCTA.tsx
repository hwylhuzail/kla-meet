"use client";
import Link from "next/link";
export default function FinalCTA() {
  return (
    <section className="max-w-6xl mx-auto px-6 py-20 text-center">
      <h2 className="text-4xl font-bold mb-4">People who make the world<br/>feel smaller</h2>
      <p className="text-zinc-500 mb-8">Join thousands finding friendships & love across borders.</p>
      <Link href="/auth" className="primary-button inline-block px-8 py-4 rounded-full bg-black text-white font-medium">Get Started - It's Free</Link>
      <p className="text-xs text-zinc-400 mt-4">No credit card required • Safe & private</p>
    </section>
  )
}
