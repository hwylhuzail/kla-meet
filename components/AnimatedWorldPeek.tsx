"use client";
export default function AnimatedWorldPeek() {
  const photos = [
    "https://i.pravatar.cc/200?img=5",
    "https://i.pravatar.cc/200?img=10",
    "https://i.pravatar.cc/200?img=23",
    "https://i.pravatar.cc/200?img=32",
    "https://i.pravatar.cc/200?img=15",
    "https://i.pravatar.cc/200?img=26",
  ];
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div className="absolute inset-0 bg-gradient-to-br from-yellow-200/20 via-transparent to-purple-200/20 blur-2xl" />
      {photos.map((src, i) => (
        <div
          key={i}
          className="absolute rounded-full overflow-hidden border-2 border-white shadow-xl"
          style={{
            width: `${58 + (i % 3) * 18}px`,
            height: `${58 + (i % 3) * 18}px`,
            left: `${5 + i * 15}%`,
            top: `${12 + (i % 4) * 18}%`,
            animation: `floaty ${3.5 + i*0.5}s ease-in-out infinite`,
            animationDelay: `${i * 0.3}s`,
          }}
        >
          <img src={src} alt="" className="w-full h-full object-cover" />
        </div>
      ))}
      <style>{`@keyframes floaty{0%,100%{transform:translateY(0) scale(1)}50%{transform:translateY(-20px) scale(1.08)}}`}</style>
    </div>
  );
}
