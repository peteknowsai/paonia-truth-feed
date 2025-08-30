'use client'

import { useState } from 'react'
import { useQuery } from 'convex/react'
import { api } from '../../convex/_generated/api'
import Header from '@/components/Header'
import PostList from '@/components/PostList'
import InitiativesKey from '@/components/InitiativesKey'
import { type InitiativeId } from '@/types/initiatives'

export default function Home() {
  const [activeInitiative, setActiveInitiative] = useState<InitiativeId | null>(null)
  
  // Use Convex to fetch posts
  const posts = activeInitiative 
    ? useQuery(api.posts.listByInitiative, { initiative: activeInitiative })
    : useQuery(api.posts.list)
  
  const isLoading = posts === undefined

  const filteredPosts = (posts || []).map(post => ({
    ...post,
    id: post._id,
    relatedInitiatives: post.relatedInitiatives as InitiativeId[] | undefined
  }))

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900">
      <Header />
      
      {/* Main Content with proper spacing from header */}
      <main className="w-full mt-8">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          {/* Fun Section Header */}
          <div className="mb-8 text-center">
            <div className="py-4">
              <div className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 rounded-full text-white font-black text-lg mb-4 shadow-2xl animate-pulse">
                <span className="text-2xl">💣</span>
                <span className="tracking-wider">AI TRUTH BOMBS</span>
                <span className="text-2xl">💣</span>
              </div>
              
              <h1 className="text-4xl sm:text-5xl font-black leading-tight bg-gradient-to-r from-white via-gray-100 to-gray-300 bg-clip-text text-transparent mb-3">
                Where AI Exposes Small-Town Political Absurdity
              </h1>
              
              {/* Info Button with Fun Tooltip */}
              <div className="flex justify-center items-center gap-3 mt-4">
                <p className="text-gray-400 text-lg">
                  {activeInitiative 
                    ? `💥 ${filteredPosts.length} truth bombs about this initiative`
                    : "Today's freshest truth bombs from Paonia's political circus 🎪"
                  }
                </p>
                
                <div className="relative group">
                  <button
                    className="h-8 w-8 shrink-0 grid place-items-center rounded-full bg-orange-500 hover:bg-orange-400 text-white transition-all transform hover:scale-110"
                    aria-label="What are Truth Bombs?"
                  >
                    <span className="text-sm font-bold">?</span>
                  </button>
                  
                  {/* Fun Tooltip */}
                  <div className="absolute right-0 top-full mt-2 w-80 p-5 bg-gradient-to-br from-orange-500 to-red-500 text-white text-sm rounded-lg shadow-xl z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                    <div className="font-black mb-2 text-lg">💣 What Are AI Truth Bombs?</div>
                    <p className="text-sm leading-relaxed">
                      Our AI reads through the mind-numbing government documents so you don't have to! 
                      It then drops satirical truth bombs that expose the absurdity, contradictions, and 
                      hilarious moments in local politics. Think of it as your sarcastic friend who actually 
                      reads the meeting minutes and can't wait to tell you about the ridiculous stuff that went down.
                    </p>
                    <div className="mt-3 text-xs font-bold text-yellow-200">
                      ⚠️ Warning: May contain traces of actual facts
                    </div>
                    <div className="absolute -top-1 right-3 w-2 h-2 bg-orange-500 transform rotate-45"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Two column layout for Feed and Initiatives */}
          <div className="grid grid-cols-1 xl:grid-cols-[3fr_1fr] gap-8">
            {/* Story Feed - Left Side */}
            <div className="min-w-0">
              <PostList posts={filteredPosts} isLoading={isLoading} />
            </div>
            
            {/* Initiatives Key - Right Side */}
            <div className="lg:sticky lg:top-24 lg:self-start">
              {/* Mobile: Show at top */}
              <div className="block lg:hidden mb-6">
                <InitiativesKey 
                  activeInitiative={activeInitiative}
                  onInitiativeClick={setActiveInitiative}
                />
              </div>
              
              {/* Desktop: Sticky sidebar */}
              <div className="hidden lg:block">
                <InitiativesKey 
                  activeInitiative={activeInitiative}
                  onInitiativeClick={setActiveInitiative}
                />
              </div>
            </div>
          </div>
          
          {/* Mobile: Quick filter buttons at bottom */}
          <div className="block lg:hidden mt-6">
            {!activeInitiative && (
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
                <h2 className="text-base font-semibold text-gray-900 mb-3">
                  Filter by Initiative
                </h2>
                <div className="grid grid-cols-2 gap-3">
                  {Object.entries({
                    'str': '🏠 STR Rights',
                    'email-transparency': '📧 Email Logs',
                    'executive-session': '🔓 Exec Session',
                    'robot-moratorium': '🤖 Robot Ban',
                    'camera-ban': '📹 Camera Ban',
                    'trustee-protection': '🛡️ Trustee Rights'
                  }).map(([id, label]) => (
                    <button
                      key={id}
                      onClick={() => setActiveInitiative(id as InitiativeId)}
                      className="px-3 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors text-left"
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}