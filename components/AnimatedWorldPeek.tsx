"use client";
export default function AnimatedWorldPeek() {
  return (
    <div className="w-full h-[140px] relative my-4 overflow-visible flex justify-center">
      <div className="flex gap-3 items-center">
        {[
          "https://i.pravatar.cc/150?img=5",
          "https://i.pravatar.cc/150?img=10",
          "https://i.pravatar.cc/150?img=23",
          "https://i.pravatar.cc/150?img=32",
          "https://i.pravatar.cc/150?img=15",
        ].map((src, i) => (
          <div key={i} className="w-[70px] h-[70px] rounded-full overflow-hidden border-2 border-white shadow-lg" style={{animation:`floaty ${3+i*0.3}s ease-in-out infinite`, animationDelay:`${i*0.2}s`}}>
            <img src={src} className="w-full h-full object-cover" alt="" />
          </div>
        ))}
      </div>
      <style>{`@keyframes floaty{0%,100%{transform:translateY(0)}50%{transform:translateY(-10px)}}`}</style>
    </div>
  );
}
