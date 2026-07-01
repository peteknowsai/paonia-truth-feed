import Link from "next/link";
import { SignedIn, SignedOut, UserButton, SignInButton, SignUpButton } from "@clerk/nextjs";
import { channels } from "@/content/story";

export default function SiteHeader() {
  return (
    <header className="mast">
      <div className="shell">
        <div className="mast-top">
          <Link href="/" className="mast-mark">
            <span className="gem" aria-hidden>◆</span> Paonia&nbsp;Truth
          </Link>
          <div className="mast-account">
            <Link href="/about" style={{ marginRight: "1.1rem" }}>About</Link>
            <SignedIn>
              <span style={{ position: "relative", display: "inline-block", top: "0.35rem" }}>
                <UserButton afterSignOutUrl="/" />
              </span>
            </SignedIn>
            <SignedOut>
              <SignInButton mode="modal">
                <button style={{ background: "none", border: "none", cursor: "pointer", fontFamily: "inherit", fontSize: "0.85rem", color: "var(--civic)", padding: 0 }}>
                  Sign in
                </button>
              </SignInButton>
              {" · "}
              <SignUpButton mode="modal">
                <button style={{ background: "none", border: "none", cursor: "pointer", fontFamily: "inherit", fontSize: "0.85rem", color: "var(--civic)", padding: 0 }}>
                  Register
                </button>
              </SignUpButton>
            </SignedOut>
          </div>
        </div>
      </div>
      <nav className="channel-nav" aria-label="Topics">
        <div className="shell channel-nav-inner">
          {channels.map((c) => (
            <Link key={c.href} href={c.href}>{c.label}</Link>
          ))}
          <a href="/encyclopedia/" style={{ marginLeft: "auto", color: "#a9d0b3" }}>The Full Record</a>
        </div>
      </nav>
    </header>
  );
}
