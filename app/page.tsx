import Link from "next/link";

const images = {
  top: [
    {
      src: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&w=520&q=85",
      alt: "Smiling Black woman with natural hair",
    },
    {
      src: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=520&q=85",
      alt: "Smiling man wearing glasses outdoors",
    },
  ],
  phones: [
    {
      src: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=crop&w=900&q=85",
      alt: "Woman smiling in a warm portrait",
    },
    {
      src: "https://images.unsplash.com/photo-1522556189639-b150ed9c4330?auto=format&fit=crop&w=900&q=85",
      alt: "Diverse group of friends smiling together",
    },
  ],
};

function StartButton({ className = "" }: { className?: string }) {
  return (
    <Link
      href="/signup"
      className={`inline-flex items-center justify-center rounded-full bg-[#FFC629] px-6 py-3 text-sm font-bold text-zinc-950 transition-transform hover:-translate-y-0.5 ${className}`}
    >
      Get started
    </Link>
  );
}

export default function Page() {
  return (
    <main className="min-h-screen overflow-hidden bg-zinc-950 text-white">
      <div className="mx-auto max-w-2xl px-5 sm:px-8">
        <header className="flex items-center justify-between py-6">
          <Link href="/" className="text-xl font-black tracking-[-0.08em]">
            KLA<span className="text-[#FFC629]">•</span>MEET
          </Link>
          <StartButton className="px-5 py-2.5" />
        </header>

        <section className="pb-14 pt-10 text-center sm:pt-16">
          <div className="mb-9 flex items-end justify-center gap-4">
            {images.top.map((image, index) => (
              <div
                key={image.src}
                className={`h-[150px] w-[130px] overflow-hidden rounded-2xl bg-zinc-800 shadow-2xl ${index === 1 ? "translate-y-5" : ""}`}
              >
                <img
                  src={image.src}
                  alt={image.alt}
                  className="h-full w-full object-cover"
                />
              </div>
            ))}
          </div>

          <p className="mb-4 text-[11px] font-bold tracking-[0.2em] text-[#FFC629]">
            REAL CONNECTIONS · WORLDWIDE
          </p>
          <h1 className="mx-auto max-w-xl text-[clamp(3rem,11vw,4rem)] font-black leading-[0.96] tracking-[-0.06em]">
            Make the first move anywhere.
          </h1>
          <p className="mx-auto mt-6 max-w-md text-base leading-7 text-zinc-400">
            Meet people who make the world feel a little smaller. Start a real
            conversation and see where it takes you.
          </p>
          <StartButton className="mt-8" />
        </section>

        <section aria-label="Meet people everywhere" className="space-y-6 pb-20">
          {images.phones.map((image) => (
            <div
              key={image.src}
              className="mx-auto h-[420px] w-full max-w-[340px] overflow-hidden rounded-[24px] bg-zinc-900"
            >
              <img
                src={image.src}
                alt={image.alt}
                className="h-full w-full object-cover"
              />
            </div>
          ))}
        </section>

        <section className="border-t border-zinc-800 py-14 text-center">
          <h2 className="text-2xl font-bold tracking-tight">How KLA-MEET works</h2>
          <p className="mt-4 text-sm font-medium text-zinc-400">
            Discover <span className="px-2 text-[#FFC629]">•</span> Say Hi
            <span className="px-2 text-[#FFC629]">•</span> Connect
          </p>
        </section>

        <footer className="border-t border-zinc-800 py-8 text-center text-xs text-zinc-500">
          © 2026 KLA-MEET
        </footer>
      </div>
    </main>
  );
}
