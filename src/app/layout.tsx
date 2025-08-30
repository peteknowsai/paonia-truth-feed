import type { Metadata } from "next"
import { VotingProvider } from '@/contexts/VotingContext'
import ConvexClientProvider from '@/components/ConvexClientProvider'
import { ClerkClientProvider } from '@/components/ClerkClientProvider'
import "./globals.css"

export const metadata: Metadata = {
  title: "Paonia Truth Feed - AI Truth Bombs 💣",
  description: "Where AI meets small-town politics and drops truth bombs on the absurdity of it all. Satirical takes on Paonia's most bewildering government moments.",
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'),
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
    ],
    shortcut: '/favicon.svg',
    apple: '/favicon.svg',
  },
  openGraph: {
    title: "Paonia Truth Feed - AI Truth Bombs 💣",
    description: "Where AI meets small-town politics and drops truth bombs on the absurdity of it all. Satirical takes on Paonia's most bewildering government moments.",
    url: "https://paoniatruth.site",
    siteName: "Paonia Truth Feed",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: '/og-image.svg',
        width: 1200,
        height: 630,
        alt: 'Paonia Truth Feed - AI Truth Bombs',
      }
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Paonia Truth Feed - AI Truth Bombs 💣',
    description: 'Where AI drops truth bombs on small-town political absurdity',
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