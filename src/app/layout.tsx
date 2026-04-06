import type { Metadata } from "next";
import ConvexClientProvider from "@/components/ConvexClientProvider";
import { ClerkClientProvider } from "@/components/ClerkClientProvider";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import "./globals.css";

export const metadata: Metadata = {
  title: "Paonia Truth Nuggets",
  description:
    "A public record of local government in Paonia, Colorado.",
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"
  ),
  icons: {
    icon: "data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>💎</text></svg>",
  },
  openGraph: {
    title: "Paonia Truth Nuggets",
    description:
      "A public record of local government in Paonia, Colorado.",
    siteName: "Paonia Truth Nuggets",
    type: "website",
    locale: "en_US",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkClientProvider>
      <html lang="en">
        <body>
          <ConvexClientProvider>
            <SiteHeader />
            <main style={{ maxWidth: "640px", margin: "0 auto", padding: "0 2rem 2rem" }}>
              {children}
            </main>
            <SiteFooter />
          </ConvexClientProvider>
        </body>
      </html>
    </ClerkClientProvider>
  );
}
