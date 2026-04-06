"use client";

import { ClerkProvider } from "@clerk/nextjs";

export function ClerkClientProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider
      appearance={{
        variables: {
          colorPrimary: "#000",
          colorText: "#000",
          colorBackground: "#fff",
          colorInputBackground: "#fff",
          colorInputText: "#000",
          borderRadius: "0",
        },
        elements: {
          card: "border border-black",
          formButtonPrimary: "bg-black text-white",
        },
      }}
    >
      {children}
    </ClerkProvider>
  );
}
