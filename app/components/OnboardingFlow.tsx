// app/components/OnboardingFlow.tsx — INTERNATIONAL VERSION
export default function OnboardingFlow() {
  const steps = [
    { id: 1, title: "Create Profile", desc: "Add photos, interests, and what you're looking for" },
    { id: 2, title: "Verify & Stay Safe", desc: "Quick photo verification for authentic members" },
    { id: 3, title: "Discover Matches", desc: "Swipe, match, and connect with people nearby or globally" },
    { id: 4, title: "Chat & Connect", desc: "Start conversations safely with built-in messaging" },
    { id: 5, title: "Meet & Build", desc: "Plan your first meetup and grow a meaningful connection" },
  ];

  return (
    <section className="bg-white py-20 px-6">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-4xl md:text-5xl font-black">How KLA-MEET Works</h2>
        <p className="text-gray-600 mt-4">
          Get started in 5 simple steps — simple, safe, and built for real connections.
        </p>
        {/* Your Bumble screenshots go here with yellow theme */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 mt-12">
          {steps.map((s) => (
            <div key={s.id} className="bg-white rounded-[32px] p-4 border-[3px] border-black shadow-lg">
              <div className="bg-[#FFC629] w-8 h-8 rounded-full flex items-center justify-center font-black mx-auto">{s.id}</div>
              <h3 className="font-bold mt-3">{s.title}</h3>
              <p className="text-sm text-gray-600 mt-1">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}