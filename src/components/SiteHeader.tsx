import Link from "next/link";
import { SignedIn, SignedOut, UserButton, SignInButton, SignUpButton } from "@clerk/nextjs";

export default function SiteHeader() {
  return (
    <header style={{ padding: "0.75rem 1rem", marginBottom: "1.5rem" }}>
      <div style={{ maxWidth: "960px", margin: "0 auto" }}>
        <h1 style={{ fontSize: "1.25rem", fontWeight: "normal", marginBottom: "0.5rem" }}>
          <Link href="/" style={{ textDecoration: "none", color: "black" }}>
            PAONIA TRUTH NUGGETS
          </Link>
        </h1>
        <div style={{ fontSize: "1rem" }}>
          <SignedIn>
            <UserButton />
          </SignedIn>
          <SignedOut>
            <SignInButton mode="modal">
              <button style={{ background: "none", border: "none", cursor: "pointer", fontFamily: "inherit", fontSize: "1rem", textDecoration: "underline", padding: 0 }}>
                sign in
              </button>
            </SignInButton>
            {" / "}
            <SignUpButton mode="modal">
              <button style={{ background: "none", border: "none", cursor: "pointer", fontFamily: "inherit", fontSize: "1rem", textDecoration: "underline", padding: 0 }}>
                register
              </button>
            </SignUpButton>
          </SignedOut>
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
