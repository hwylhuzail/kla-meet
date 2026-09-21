import Header from '@/components/Header'
import './globals.css'
import './polish.css'
import './kla-styles.css'
import BottomNav from '@/components/BottomNav'

export const metadata = {
  title: 'KLA MEET - Real Connections Worldwide',
  description: 'The premium dating app for meaningful connections.',
  manifest: '/manifest.json',
  keywords: ['dating app', 'meet singles', 'verified dating'],
}

export const viewport = { themeColor: '#FFC629' }

export default function RootLayout({children}:{children:React.ReactNode}){
  return (
    <html lang="en">
      <head>
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body className="bg-white dark:bg-black text-black dark:text-white min-h-screen">
        <Header />
        <main className="pb-[80px] max-w-md mx-auto">
          {children}
        </main>
        <BottomNav />
      </body>
    </html>
  )
}