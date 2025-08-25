import type { Metadata } from "next"
import { VotingProvider } from '@/contexts/VotingContext'
import ConvexClientProvider from '@/components/ConvexClientProvider'
import { ClerkClientProvider } from '@/components/ClerkClientProvider'
import "./globals.css"

export const metadata: Metadata = {
  title: "Paonia Truth Feed - AI-Generated Government Analysis",
  description: "Neutral AI analysis of Paonia government documents and actions",
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'),
  openGraph: {
    title: "Paonia Truth Feed",
    description: "Neutral AI analysis of Paonia government documents and actions",
    url: "/",
    siteName: "Paonia Truth Feed",
    type: "website",
    locale: "en_US",
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