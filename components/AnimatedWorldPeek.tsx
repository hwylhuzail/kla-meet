"use client";
export default function AnimatedWorldPeek() {
  return (
    <div className="w-full py-4 my-2 flex justify-center gap-3 overflow-x-auto scrollbar-none">
      {[
        "https://i.pravatar.cc/150?img=5",
        "https://i.pravatar.cc/150?img=10",
        "https://i.pravatar.cc/150?img=23",
        "https://i.pravatar.cc/150?img=32",
        "https://i.pravatar.cc/150?img=15",
      ].map((src, i) => (
        <div key={i} className="shrink-0 w-[64px] h-[64px] rounded-full overflow-hidden border-[3px] border-white shadow-[0_6px_16px_rgba(0,0,0,0.15)] bg-zinc-200" style={{animation:`floaty ${3+i*0.3}s ease-in-out infinite`, animationDelay:`${i*0.2}s`}}>
          <img src={src} className="w-full h-full object-cover" alt="user" />
        </div>
      ))}
      <style>{`@keyframes floaty{0%,100%{transform:translateY(0)}50%{transform:translateY(-10px)}}`}</style>
    </div>
  );
}