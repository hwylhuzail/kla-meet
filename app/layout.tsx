import './globals.css'
export const metadata = { title: 'KLA MEET', description: 'Find Love Near You', manifest: '/manifest.json', themeColor: '#FF2D7B' }
export default function RootLayout({children}:{children:React.ReactNode}){return <html><body className="bg-[#FFF5F7]">{children}</body></html>}