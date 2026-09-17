"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { useState } from "react";
import AnimatedWorldPeek from "@/components/AnimatedWorldPeek";
import LiveTicker from "@/components/LiveTicker";
import HowItWorks from "@/components/HowItWorks";
import TrustBar from "@/components/TrustBar";
import FinalCTA from "@/components/FinalCTA";

const fallbackProfiles = [
  { name: "Sarah", photos: ["/avatar1.jpg", "https://i.pravatar.cc/300?img=1"] },
  { name: "Vanessa", photos: ["https://i.pravatar.cc/300?img=5"] },
  { name: "Daniel", photos: ["https://i.pravatar.cc/300?img=8"] },
];

function Footer(){
  return (
    <footer className="py-10 text-center text-sm text-stone-500 border-t">
      <p>© {new Date().getFullYear()} KLA-MEET • Real connections worldwide</p>
    </footer>
  )
}

function Landing() {
  return (
    <div className="landing-shell">
      <nav className="landing-nav">
        <Link href="/" className="brand">KLA<span className="brand-mark">•</span>MEET</Link>
        <div className="landing-nav-links">
          <a href="#app">The App</a>
          <a href="#about">About</a>
          <a href="/safety">Safety</a>
          <a href="#shop">Shop</a>
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
            <img src={fallbackProfiles[0].photos[0]} alt="KLA Meet profile" />
          </motion.div>
          <motion.div className="floating-profile one" animate={{ y: [0, -12, 0] }} transition={{ duration: 3.5, repeat: Infinity }}>
            <img src={fallbackProfiles[1].photos[0]} alt="Vanessa" />
            <span>Vanessa, 24 · Dubai</span>
          </motion.div>
          <motion.div className="floating-profile two" animate={{ y: [0, 9, 0] }} transition={{ duration: 4.5, repeat: Infinity }}>
            <img src={fallbackProfiles[0].photos[0]} alt="Sarah" />
            <span>Sarah, 27 · Verified</span>
          </motion.div>
        </div>
      </motion.section>

      <LiveTicker />
      <HowItWorks />
      <TrustBar />
      <FinalCTA />
      <Footer />
    </div>
  );
}

function DiscoverHome(){
  const [profiles] = useState(fallbackProfiles);
  return <div>Discover - {profiles.length} profiles</div>
}

export default function Page(){
  const [isLogged] = useState(false);
  if(isLogged) return <DiscoverHome />;
  return <Landing />;
}
