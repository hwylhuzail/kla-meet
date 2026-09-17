"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import AnimatedWorldPeek from "@/components/AnimatedWorldPeek";

const fallbackProfiles = [
  { photos: ["https://i.pravatar.cc/300?img=1"] },
  { photos: ["https://i.pravatar.cc/300?img=5"] },
];

function Landing() {
  return (
    <div className="landing-shell">
      <nav className="landing-nav">
        <Link href="/" className="brand">KLA<span className="brand-mark">•</span>MEET</Link>
        <div className="landing-nav-links">
          <a href="#app">The App</a><a href="#about">About</a>
          <a href="/safety">Safety</a><a href="#shop">Shop</a>
        </div>
        <Link href="/auth" className="primary-button">Get Started</Link>
      </nav>
      <AnimatedWorldPeek />

      <motion.section className="landing-hero" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
        <div>
          <p className="eyebrow">REAL CONNECTIONS · WORLDWIDE</p>
          <h1>Make the first move anywhere.</h1>
          <p>Meet thoughtful people nearby and around the world, with safety and authenticity built into every hello.</p>
          <Link href="/auth" className="primary-button inline-block">Get started</Link>
        </div>
        <div className="phone-stage">
          <motion.div className="phone" animate={{ y: [0, -8, 0] }} transition={{ duration: 4, repeat: Infinity }}>
            <img src={fallbackProfiles[0].photos[0]} alt="profile" />
          </motion.div>
        </div>
      </motion.section>

      <div style={{padding:'40px', textAlign:'center', background:'#f5f5f5'}}>
        <h2>How KLA-MEET works</h2>
        <p>Discover • Say Hi • Connect</p>
      </div>

      <footer className="py-10 text-center text-sm text-stone-500 border-t">
        © {new Date().getFullYear()} KLA-MEET
      </footer>
    </div>
  );
}

export default function Page() {
  return <Landing />;
}
