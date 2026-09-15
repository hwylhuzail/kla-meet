import './globals.css'
export const metadata = { title: 'KLA MEET', description: 'Meet someone worth meeting.', manifest: '/manifest.json' }
export const viewport = { themeColor: '#FFC629' }
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="en"><body>{children}</body></html>}