import { SignUp } from "@clerk/nextjs";
import Link from 'next/link';

export default function Page() {
  return (
    <div className="min-h-screen bg-white font-mono p-8">
      <div className="max-w-2xl mx-auto">
        <div className="mb-8 text-center">
          <Link href="/" className="no-underline">
            <h1 className="text-xl font-normal hover:underline">PAONIA TRUTH NUGGETS</h1>
          </Link>
        </div>
        <div className="flex items-center justify-center">
          <SignUp 
        fallbackRedirectUrl="/"
        signInUrl="/sign-in"
        appearance={{
          elements: {
            rootBox: "mx-auto",
            card: "bg-white border border-black shadow-none",
          }
        }}
      />
        </div>
      </div>
    </div>
  );
}