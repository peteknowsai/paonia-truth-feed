import Link from "next/link";
import { SignedIn, SignedOut, UserButton, SignInButton, SignUpButton } from "@clerk/nextjs";

export default function SiteHeader() {
  return (
    <header style={{ padding: "0.75rem 1rem", marginBottom: "1.5rem" }}>
      <div style={{ maxWidth: "960px", margin: "0 auto" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: "0.5rem" }}>
          <h1 style={{ fontSize: "1.25rem", fontWeight: "normal", margin: 0 }}>
            <Link href="/" style={{ textDecoration: "none", color: "black" }}>
              💎 PAONIA TRUTH NUGGETS
            </Link>
          </h1>
          <div style={{ fontSize: "0.85rem" }}>
            <SignedIn>
              <div style={{ position: "relative", display: "inline-block", cursor: "pointer" }}>
                <span style={{ fontFamily: "inherit", fontSize: "0.85rem", textDecoration: "underline" }}>
                  account
                </span>
                <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", opacity: 0, width: "100%", height: "100%", overflow: "hidden" }}>
                  <div style={{ transform: "scale(10)", transformOrigin: "center center" }}>
                    <UserButton />
                  </div>
                </div>
              </div>
            </SignedIn>
            <SignedOut>
              <SignInButton mode="modal">
                <button style={{ background: "none", border: "none", cursor: "pointer", fontFamily: "inherit", fontSize: "0.85rem", textDecoration: "underline", padding: 0 }}>
                  sign in
                </button>
              </SignInButton>
              {" / "}
              <SignUpButton mode="modal">
                <button style={{ background: "none", border: "none", cursor: "pointer", fontFamily: "inherit", fontSize: "0.85rem", textDecoration: "underline", padding: 0 }}>
                  register
                </button>
              </SignUpButton>
            </SignedOut>
          </div>
        </div>
        <nav style={{ marginTop: "0.5rem" }}>
          <Link href="/stories">stories</Link>
          <Link href="/initiatives">initiatives</Link>
          <Link href="/actions">actions</Link>
          <Link href="/timeline">timeline</Link>
          <Link href="/wiki">wiki</Link>
          <Link href="/about">about</Link>
        </nav>
      </div>
    </header>
  );
}
