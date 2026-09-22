import './globals.css'
import './polish.css'
import './kla-styles.css'
import LayoutClient from '@/components/LayoutClient'

export const metadata = { title: 'KLA MEET', description: 'Real Connections' }
export const viewport = { themeColor: '#FFC629' }

export default function RootLayout({children}:{children:React.ReactNode}){
  return (
    <html lang="en">
      <body className="bg-white dark:bg-black text-black dark:text-white min-h-screen">
        <LayoutClient>{children}</LayoutClient>
      </body>
    </html>
  )
}