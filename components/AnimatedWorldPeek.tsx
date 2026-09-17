"use client";
export default function AnimatedWorldPeek() {
  return (
    <div className="w-full h-[280px] relative my-6 overflow-visible">
      <div className="absolute inset-0 flex items-center justify-center gap-3 flex-wrap">
        {[
          "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=150&h=150&fit=crop",
          "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop",
          "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=150&h=150&fit=crop",
          "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop",
          "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&h=150&fit=crop",
        ].map((src, i) => (
          <div
            key={i}
            className="rounded-[20px] overflow-hidden shadow-[0_10px_30px_rgba(0,0,0,0.15)] border-2 border-white"
            style={{
              width: "88px",
              height: "88px",
              transform: `rotate(${(i-2)*6}deg)`,
              animation: `floaty ${3 + i*0.3}s ease-in-out infinite`,
              animationDelay: `${i*0.2}s`,
              zIndex: 10-i
            }}
          >
            <img src={src} className="w-full h-full object-cover" alt="" />
          </div>
        ))}
      </div>
      <div className="absolute left-[18%] top-[10%] text-2xl" style={{animation:'floaty 2.5s ease-in-out infinite'}}>💛</div>
      <div className="absolute right-[18%] top-[20%] text-2xl" style={{animation:'floaty 3s ease-in-out infinite'}}>🌍</div>
      <style>{`@keyframes floaty{0%,100%{transform:translateY(0) rotate(var(--r,0deg))}50%{transform:translateY(-14px) rotate(var(--r,0deg))}}`}</style>
    </div>
  );
}
