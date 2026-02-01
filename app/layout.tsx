import type { Metadata, Viewport } from 'next'
import { Inter, Orbitron } from 'next/font/google'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
})

const orbitron = Orbitron({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Radio Retro Dance | Classic 90s & 2000s',
  description: 'Emisora de música dance con los mejores clásicos de los 90s y 2000s. Escucha en directo la mejor música electrónica retro.',
  keywords: ['radio', 'dance', 'retro', '90s', '2000s', 'electrónica', 'música', 'streaming'],
  authors: [{ name: 'Radio Retro Dance' }],
  creator: 'Radio Retro Dance',
  publisher: 'Radio Retro Dance',
  metadataBase: new URL('https://radioretrodance.com'),
  openGraph: {
    title: 'Radio Retro Dance | Classic 90s & 2000s',
    description: 'Emisora de música dance con los mejores clásicos de los 90s y 2000s.',
    url: 'https://radioretrodance.com',
    siteName: 'Radio Retro Dance',
    locale: 'es_ES',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Radio Retro Dance | Classic 90s & 2000s',
    description: 'Emisora de música dance con los mejores clásicos de los 90s y 2000s.',
  },
  manifest: '/manifest.json',
  icons: {
    icon: [
      { url: '/icons/icon-192.png', sizes: '192x192', type: 'image/png' },
      { url: '/icons/icon-512.png', sizes: '512x512', type: 'image/png' },
    ],
    apple: [
      { url: '/icons/apple-icon-180.png', sizes: '180x180', type: 'image/png' },
    ],
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'Radio Retro Dance',
  },
}

export const viewport: Viewport = {
  themeColor: '#0a0a0f',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" className={`${inter.variable} ${orbitron.variable}`}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className={`${inter.className} antialiased`}>
        {children}
      </body>
    </html>
  )
}
