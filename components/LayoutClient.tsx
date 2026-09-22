'use client';
import { usePathname } from 'next/navigation';
import Header from '@/components/Header';
import BottomNav from '@/components/BottomNav';

export default function LayoutClient({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isHome = pathname === '/'; // hide global nav on home only
  return (
    <>
      {!isHome && <Header />}
      <main className={isHome? "" : "pb-[80px] max-w-md mx-auto"}>
        {children}
      </main>
      {!isHome && <BottomNav />}
    </>
  );
}