import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Inter, Oswald } from 'next/font/google'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const oswald = Oswald({
  subsets: ['latin'],
  variable: '--font-oswald',
  weight: ['400', '500', '600', '700'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: 'E-kwip-T Sales and Service | Equipment & Machinery Sales',
    template: '%s | E-kwip-T Sales and Service',
  },
  description:
    'E-kwip-T Sales and Service — agricultural, forestry, yellow equipment, mining plant and support machinery for sale across South Africa.',
  icons: {
    icon: '/123367.jpg',
    shortcut: '/123367.jpg',
    apple: '/123367.jpg',
  },
  generator: 'v0.app',
}

export const viewport: Viewport = {
  themeColor: '#132f2f',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en-ZA" className={`${inter.variable} ${oswald.variable} bg-background`}>
      <body className="font-sans antialiased">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
