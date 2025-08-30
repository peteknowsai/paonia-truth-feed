'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useSignUp } from '@clerk/nextjs'
import Link from 'next/link'

export default function VerifyEmailPage() {
  const { isLoaded, signUp, setActive } = useSignUp()
  const [verificationCode, setVerificationCode] = useState('')
  const [error, setError] = useState('')
  const [isVerifying, setIsVerifying] = useState(false)
  const router = useRouter()

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!isLoaded || !signUp) return

    setIsVerifying(true)
    setError('')

    try {
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code: verificationCode,
      })

      if (completeSignUp.status === 'complete') {
        await setActive({ session: completeSignUp.createdSessionId })
        router.push('/')
      } else {
        setError('Verification failed. Please try again.')
      }
    } catch (err: any) {
      setError(err.errors?.[0]?.message || 'Verification failed. Please check your code.')
    } finally {
      setIsVerifying(false)
    }
  }

  const resendCode = async () => {
    if (!isLoaded || !signUp) return

    try {
      await signUp.prepareEmailAddressVerification({ strategy: 'email_code' })
      setError('')
      alert('Verification code resent! Check your email.')
    } catch (err: any) {
      setError('Failed to resend code. Please try again.')
    }
  }

  return (
    <div className="min-h-screen bg-white text-black font-mono p-8 max-w-md mx-auto">
      <header className="mb-12">
        <h1 className="text-lg font-normal mb-2">Verify Your Email</h1>
        <p className="text-sm text-gray-600">
          Enter the verification code sent to your email
        </p>
      </header>

      <form onSubmit={handleVerify} className="space-y-6">
        <div>
          <label htmlFor="code" className="block text-sm mb-2">
            Verification Code
          </label>
          <input
            id="code"
            type="text"
            value={verificationCode}
            onChange={(e) => setVerificationCode(e.target.value)}
            placeholder="Enter 6-digit code"
            className="w-full p-3 border border-gray-300 text-sm font-mono focus:outline-none focus:border-black"
            maxLength={6}
            required
          />
        </div>

        {error && (
          <p className="text-sm text-red-600">{error}</p>
        )}

        <button
          type="submit"
          disabled={isVerifying || !verificationCode}
          className="w-full px-4 py-3 bg-black text-white text-sm hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isVerifying ? 'Verifying...' : 'Verify Email'}
        </button>
      </form>

      <div className="mt-8 pt-8 border-t border-gray-200 space-y-4">
        <button
          onClick={resendCode}
          className="text-sm underline"
        >
          Resend verification code
        </button>

        <p className="text-sm text-gray-600">
          Having trouble? Try{' '}
          <Link href="/sign-up" className="underline">
            signing up again
          </Link>{' '}
          or{' '}
          <Link href="/" className="underline">
            return home
          </Link>
        </p>
      </div>

      <div className="mt-12 p-4 bg-gray-50 border border-gray-200">
        <h2 className="text-sm font-bold mb-2">Verification Issues?</h2>
        <ul className="text-xs text-gray-600 space-y-1">
          <li>• Check your spam/junk folder</li>
          <li>• Make sure you're using the same browser</li>
          <li>• Try clearing your browser cookies</li>
          <li>• Use the verification code within 15 minutes</li>
        </ul>
      </div>
    </div>
  )
}