import type { Metadata } from "next"
import { VotingProvider } from '@/contexts/VotingContext'
import ConvexClientProvider from '@/components/ConvexClientProvider'
import { ClerkClientProvider } from '@/components/ClerkClientProvider'
import "./globals.css"

export const metadata: Metadata = {
  title: "Paonia Truth Nuggets",
  description: "Uncovering gems of truth in small-town politics.",
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'),
  icons: {
    icon: [
      { url: '/gem-favicon.svg', type: 'image/svg+xml' },
      { url: 'data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>💎</text></svg>' }
    ],
    shortcut: '/gem-favicon.svg',
    apple: '/gem-favicon.svg',
  },
  openGraph: {
    title: "Paonia Truth Nuggets",
    description: "Uncovering gems of truth in small-town politics.",
    url: "https://paoniatruth.site",
    siteName: "Paonia Truth Nuggets",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: '/og-image.svg',
        width: 1200,
        height: 630,
        alt: 'Paonia Truth Nuggets',
      }
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Paonia Truth Nuggets',
    description: 'Uncovering gems of truth in small-town politics',
    images: ['/og-image.svg'],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <ClerkClientProvider>
      <html lang="en">
        <body>
          <ConvexClientProvider>
            <VotingProvider>
              {children}
            </VotingProvider>
          </ConvexClientProvider>
        </body>
      </html>
    </ClerkClientProvider>
  )
}