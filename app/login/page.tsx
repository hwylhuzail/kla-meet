'use client';
import Link from 'next/link';
export default function LoginPage() {
  return (
    <main className="min-h-screen bg-black text-white flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-3xl font-black">Login</h1>
        <Link href="/auth" className="mt-4 inline-block rounded-full bg-[#FFC629] px-6 py-3 text-black font-bold">Go to Auth</Link>
      </div>
    </main>
  );
}
