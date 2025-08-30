"use client";

import { UserButton, useAuth, useUser } from "@clerk/nextjs";
import Link from "next/link";
import { isAdminEmail } from "@/lib/config";

export default function Header() {
  const { isSignedIn } = useAuth();
  const { user } = useUser();
  
  // Check if user is admin
  const isAdmin = isAdminEmail(user?.primaryEmailAddress?.emailAddress);

  return (
    <header className="bg-[#ff6600] shadow-sm sticky top-0 z-50">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo and Title */}
          <a href="/" className="flex items-center gap-3 hover:opacity-90 transition-opacity">
            <div className="h-10 w-10 grid place-items-center rounded-xl bg-white text-[#ff6600] font-serif font-bold text-lg shadow-sm">
              PTF
            </div>
            <span className="text-white text-xl font-serif font-semibold">
              Paonia Truth Feed
            </span>
          </a>
          
          {/* Auth Navigation */}
          <div className="flex items-center gap-4">
            {isSignedIn ? (
              <>
                {isAdmin && (
                  <Link
                    href="/admin/submit"
                    className="px-4 py-2 bg-white/10 text-white rounded-lg font-medium hover:bg-white/20 transition-colors"
                  >
                    Submit Story
                  </Link>
                )}
                <UserButton 
                  afterSignOutUrl="/"
                  appearance={{
                    elements: {
                      avatarBox: "h-9 w-9",
                    },
                  }}
                />
              </>
            ) : (
              <div className="flex items-center gap-2">
                <Link
                  href="/sign-in"
                  className="px-4 py-2 bg-white text-[#ff6600] rounded-lg font-medium hover:bg-gray-100 transition-colors"
                >
                  Sign In
                </Link>
                <span className="text-white">|</span>
                <Link
                  href="/sign-up"
                  className="px-4 py-2 bg-white text-[#ff6600] rounded-lg font-medium hover:bg-gray-100 transition-colors"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}