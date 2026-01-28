import type { Metadata } from 'next'
import './globals.css'
import { Open_Sans } from 'next/font/google'


const openSans = Open_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-open-sans',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Illustria Community Portal',
  description: 'Portal informasi dan transparansi warga Illustria',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="id" className={openSans.variable}>
      <body className="font-sans">
        {/* Page Content */}
        <div className="pb-8">
          {children}
        </div>

        
      </body>
    </html>
  )
}
