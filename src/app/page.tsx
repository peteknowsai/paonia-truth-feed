'use client'

import { useState } from 'react'
import { useQuery } from 'convex/react'
import { api } from '../../convex/_generated/api'
import Header from '@/components/Header'
import PostList from '@/components/PostList'
import InitiativesKey from '@/components/InitiativesKey'
import { type InitiativeId } from '@/types/initiatives'
import { type Post } from '@/types'

export default function Home() {
  const [activeInitiative, setActiveInitiative] = useState<InitiativeId | null>(null)
  
  // Use Convex to fetch posts
  const posts = activeInitiative 
    ? useQuery(api.posts.listByInitiative, { initiative: activeInitiative })
    : useQuery(api.posts.list)
  
  const isLoading = posts === undefined

  const filteredPosts = (posts || []).map((post: any) => ({
    ...post,
    id: post._id,
    relatedInitiatives: post.relatedInitiatives as InitiativeId[] | undefined,
    createdAt: post.createdAt || (post._creationTime ? new Date(post._creationTime).toISOString() : new Date().toISOString())
  } as Post))

  return (
    <div className="min-h-screen bg-white text-black">
      <Header />
      
      <main className="max-w-4xl mx-auto px-4 py-8">
        {/* Typewriter Header */}
        <div className="text-center mb-12 border-b-2 border-black pb-8">
          <h1 className="text-2xl font-bold mb-4 tracking-wider">
            PAONIA TRUTH FEED
          </h1>
          <p className="text-sm uppercase tracking-widest">
            AI Truth Bombs / Political Absurdity / Local News
          </p>
          <p className="text-xs mt-2">
            {new Date().toLocaleDateString('en-US', { 
              weekday: 'long', 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            }).toUpperCase()}
          </p>
        </div>

        {/* Simple instruction */}
        <div className="mb-8 text-center">
          <p className="text-sm">
            {activeInitiative 
              ? `[SHOWING ${filteredPosts.length} STORIES ABOUT ${activeInitiative.toUpperCase()}]`
              : `[${filteredPosts.length} TRUTH BOMBS LOADED]`
            }
          </p>
        </div>

        {/* Stories */}
        <div className="space-y-8">
          <PostList posts={filteredPosts} isLoading={isLoading} />
        </div>
        
        {/* Footer */}
        <footer className="mt-16 pt-8 border-t-2 border-black text-center">
          <p className="text-xs uppercase tracking-widest">
            End of transmission
          </p>
        </footer>
      </main>
    </div>
  )
}