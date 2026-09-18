import './globals.css'
import './kla-styles.css'

export const metadata = { 
  title: 'KLA MEET - Real Connections Worldwide',
  description: 'The premium dating app for meaningful connections. Meet verified, intentional singles nearby and around the world. Safety-first, authenticity guaranteed. Where good people find better dates - worldwide.',
  manifest: '/manifest.json',
  keywords: ['dating app', 'meet singles', 'verified dating', 'serious relationship', 'global dating', 'authentic connections'],
  openGraph: {
    title: 'KLA MEET - Real Connections Worldwide',
    description: 'Meet someone worth meeting. Verified profiles, intentional dating, worldwide discovery.',
    type: 'website',
  }
}

export const viewport = { themeColor: '#FFC629' }

export default function RootLayout({children}:{children:React.ReactNode}){
  return <html lang="en" className="light" style={{ colorScheme: 'light' }}><head><meta name="apple-mobile-web-app-capable" content="yes" /><link rel="apple-touch-icon" href="/apple-touch-icon.png" /></head><body style={{ backgroundColor: 'white', color: 'black' }}>{children}</body></html>
}
