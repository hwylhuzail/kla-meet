export default function OnboardingFlow() {
  const steps = [
    { id: 1, title: "Welcome to KLA-MEET", desc: "Date. Meet. Connect. Worldwide.", emoji: "🌍" },
    { id: 2, title: "Create Profile", desc: "Add your best photos & intro", emoji: "✨" },
    { id: 3, title: "Your Vibe", desc: "Gender, preferences & interests", emoji: "💫" },
    { id: 4, title: "Discover", desc: "Find real people nearby or far", emoji: "💛" },
    { id: 5, title: "Start Chatting", desc: "Match, chat & meet safely", emoji: "💬" },
  ];

  return (
    <section className="bg-[#FFF8E7] py-16 px-6">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-5xl font-black text-center text-black">
          How KLA-MEET Works
        </h2>
        <p className="text-center text-gray-600 mt-3">
          5 simple steps — 100% KLA-MEET, built for global connections
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-5 mt-10">
          {steps.map((s) => (
            <div
              key={s.id}
              className="bg-white rounded-[28px] border-[3px] border-black p-5 shadow-[6px_6px_0px_#000] hover:translate-y-[-4px] transition"
            >
              <div className="bg-[#FFC629] w-10 h-10 rounded-full flex items-center justify-center font-black border-2 border-black">
                {s.id}
              </div>
              <div className="mt-4 bg-gray-50 rounded-2xl h-32 flex items-center justify-center text-4xl">
                {s.emoji}
              </div>
              <h3 className="font-black mt-4 text-black">{s.title}</h3>
              <p className="text-sm text-gray-600 mt-1">{s.desc}</p>
              <div className="mt-3 h-2 w-full bg-black rounded-full overflow-hidden">
                <div className="h-full bg-[#FFC629]" style={{ width: `${s.id * 20}%` }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}