'use client';
import { usePathname } from 'next/navigation';
import Header from '@/components/Header';
import BottomNav from '@/components/BottomNav';

export default function LayoutClient({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  // hide global nav on these routes
  const hideNav =
    pathname === '/' ||
    pathname.startsWith('/chat') ||
    pathname.startsWith('/auth') ||
    pathname.startsWith('/verification');

  return (
    <>
      {!hideNav && <Header />}
      <main className={hideNav? "" : "pb-[90px] max-w-md mx-auto min-h-screen bg-[#fbf9ff] dark:bg-black"}>
        {children}
      </main>
      {!hideNav && <BottomNav />}
    </>
  );
}