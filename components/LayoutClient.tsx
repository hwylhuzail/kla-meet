'use client';
import { usePathname } from 'next/navigation';
import Header from '@/components/Header';
import BottomNav from '@/components/BottomNav';

export default function LayoutClient({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const hideNav = pathname === '/'; // hide on landing page

  return (
    <>
      {!hideNav && <Header />}
      <main className={hideNav? "" : "pb-[80px] max-w-md mx-auto"}>
        {children}
      </main>
      {!hideNav && <BottomNav />}
    </>
  );
}