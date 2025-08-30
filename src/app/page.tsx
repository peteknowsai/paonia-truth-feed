'use client'

import { useQuery } from 'convex/react'
import { api } from '../../convex/_generated/api'
import { useAuth } from '@clerk/nextjs'
import Link from 'next/link'

export default function Home() {
  const { isSignedIn } = useAuth()
  const posts = useQuery(api.posts.list)
  const isLoading = posts === undefined

  return (
    <div className="min-h-screen bg-white text-black font-mono p-8 max-w-2xl mx-auto">
      {/* Minimal Header */}
      <header className="mb-12">
        <h1 className="text-base font-normal">Paonia Truth Feed</h1>
        <div className="mt-2 text-sm">
          {!isSignedIn && (
            <>
              <Link href="/sign-in" className="underline">sign in</Link>
              {' / '}
              <Link href="/sign-up" className="underline">register</Link>
            </>
          )}
        </div>
      </header>

      {/* Posts */}
      <main>
        {isLoading ? (
          <p className="text-sm">Loading...</p>
        ) : (
          <ul className="space-y-6">
            {(posts || []).map((post: any, index: number) => (
              <li key={post._id} className="text-sm">
                <Link 
                  href={`/post/${post._id}`}
                  className="block hover:underline"
                >
                  <span className="text-gray-500">{String(index + 1).padStart(2, '0')}.</span>
                  {' '}
                  <span>{post.title}</span>
                </Link>
              </li>
            ))}
          </ul>
        )}
        
        {posts && posts.length === 0 && (
          <p className="text-sm text-gray-500">No posts yet.</p>
        )}
      </main>
    </div>
  )
}