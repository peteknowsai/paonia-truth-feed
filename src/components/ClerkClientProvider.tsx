"use client";

import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";

export function ClerkClientProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider
      appearance={{
        baseTheme: dark,
        variables: {
          colorPrimary: "#3b82f6",
          colorText: "#e5e7eb",
          colorBackground: "#111827",
          colorInputBackground: "#1f2937",
          colorInputText: "#e5e7eb",
          borderRadius: "0.375rem",
        },
        elements: {
          card: "bg-gray-800 border border-gray-700",
          headerTitle: "text-gray-100",
          headerSubtitle: "text-gray-400",
          socialButtonsBlockButton: "bg-gray-700 hover:bg-gray-600 text-gray-100",
          formButtonPrimary: "bg-blue-600 hover:bg-blue-700",
          footerActionLink: "text-blue-400 hover:text-blue-300",
          identityPreviewText: "text-gray-300",
          identityPreviewEditButton: "text-blue-400 hover:text-blue-300",
          formFieldLabel: "text-gray-300",
          formFieldInput: "bg-gray-700 border-gray-600 text-gray-100",
          dividerLine: "bg-gray-700",
          dividerText: "text-gray-400",
        },
      }}
    >
      {children}
    </ClerkProvider>
  );
}