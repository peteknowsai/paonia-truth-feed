import type { Metadata } from "next"
import { VotingProvider } from '@/contexts/VotingContext'
import ConvexClientProvider from '@/components/ConvexClientProvider'
import "./globals.css"

export const metadata: Metadata = {
  title: "Paonia Truth Feed - AI-Generated Government Analysis",
  description: "Neutral AI analysis of Paonia government documents and actions",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>
        <ConvexClientProvider>
          <VotingProvider>
            {children}
          </VotingProvider>
        </ConvexClientProvider>
      </body>
    </html>
  )
}