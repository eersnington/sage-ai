import type { Metadata, Viewport } from 'next'
import { Inter as FontSans } from 'next/font/google'
import './globals.css'
import { cn } from '@/lib/utils'
import { ThemeProvider } from '@/components/theme-provider'
import Header from '@/components/header'
import Footer from '@/components/footer'
import { Sidebar } from '@/components/sidebar'
import { Toaster } from '@/components/ui/sonner'
import { AppStateProvider } from '@/lib/utils/app-state'
import { Analytics } from "@vercel/analytics/react"

const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-sans'
})

const title = 'sage-ai'
const description = "Burned out with market research? Sage AI helps indie hackers and developers find market insights fast. Validate your product ideas with your AI co-pilot. Discover opportunities, save time, and make smarter decisions."

export const metadata: Metadata = {
  metadataBase: new URL('https://sageai.live'),
  title,
  description,
  openGraph: {
    title,
    description
  },
  twitter: {
    title,
    description,
    card: 'summary_large_image',
    creator: '@sreenington'
  },
  keywords: [
    'Sage AI',
    'market research tool',
    'market analysis',
    'indie hackers',
    'developers',
    'product ideas',
    'AI-powered',
    'hidden opportunities',
    'validate product ideas',
    'marketing co-pilot',
    'market insights tool',
    'market size estimation tool',
    'product validation tool',
    'Product Hunt Marketing',
  ]
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  minimumScale: 1,
  maximumScale: 1
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn('font-sans antialiased', fontSans.variable)}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <Analytics />
          <AppStateProvider>
            <Header />
            {children}
            <Sidebar />
            <Footer />
            <Toaster />
          </AppStateProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
