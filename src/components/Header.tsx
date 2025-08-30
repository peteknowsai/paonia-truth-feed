"use client";

import { UserButton, useAuth, useUser } from "@clerk/nextjs";
import Link from "next/link";
import { isAdminEmail } from "@/lib/config";

export default function Header() {
  const { isSignedIn } = useAuth();
  const { user } = useUser();
  
  const isAdmin = isAdminEmail(user?.primaryEmailAddress?.emailAddress);

  return (
    <header className="border-b-2 border-black bg-white">
      <div className="max-w-6xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a href="/" className="text-lg font-bold uppercase tracking-wider hover:bg-black hover:text-white px-2">
            PTF
          </a>
          
          {/* Navigation */}
          <nav className="flex items-center gap-4 text-xs uppercase">
            {isSignedIn ? (
              <>
                {isAdmin && (
                  <Link
                    href="/admin/submit"
                    className="underline hover:bg-black hover:text-white px-1"
                  >
                    Submit
                  </Link>
                )}
                <UserButton 
                  appearance={{
                    elements: {
                      avatarBox: "w-8 h-8 border border-black",
                      userButtonPopoverCard: "border border-black shadow-none",
                    }
                  }}
                />
              </>
            ) : (
              <>
                <Link 
                  href="/sign-in" 
                  className="underline hover:bg-black hover:text-white px-1"
                >
                  Sign In
                </Link>
                <span>|</span>
                <Link 
                  href="/sign-up" 
                  className="underline hover:bg-black hover:text-white px-1"
                >
                  Sign Up
                </Link>
              </>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
}