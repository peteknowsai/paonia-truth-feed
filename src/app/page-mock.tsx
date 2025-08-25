'use client'

import { useState } from 'react'
import Header from '@/components/Header'
import PostList from '@/components/PostList'
import InitiativesKey from '@/components/InitiativesKey'
import { mockPosts } from '@/lib/mockData'
import { type InitiativeId } from '@/types/initiatives'

export default function Home() {
  const [activeInitiative, setActiveInitiative] = useState<InitiativeId | null>(null)
  
  const filteredPosts = activeInitiative 
    ? mockPosts.filter(post => post.relatedInitiatives?.includes(activeInitiative))
    : mockPosts

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Main Content with proper spacing from header */}
      <main className="w-full mt-8">
        <div className="max-w-[1180px] mx-auto px-6">
          {/* Section Header Card aligned with vote gutter */}
          <div className="grid grid-cols-1 lg:grid-cols-[56px_1fr] gap-4 mb-6">
            <div className="hidden lg:block" /> {/* Vote gutter spacer */}
            <div className="rounded-2xl border border-gray-200 bg-white shadow-sm">
              <div className="p-6">
                <div className="flex items-baseline justify-between gap-3">
                  <h1 className="text-3xl font-serif font-bold leading-tight text-gray-900">
                    AI-Generated Government Analysis
                  </h1>
                  {/* Info Icon with Tooltip */}
                  <div className="relative group">
                    <button
                      className="h-7 w-7 shrink-0 grid place-items-center rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 transition-colors"
                      aria-label="About AI-Generated Analysis"
                    >
                      <span className="text-sm font-sans font-medium">i</span>
                    </button>
                    
                    {/* Tooltip - shows on hover */}
                    <div className="absolute right-0 top-full mt-2 w-80 p-5 bg-gray-900 text-white text-sm rounded-lg shadow-xl z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                      <div className="font-semibold mb-2 text-base">About AI-Generated Analysis</div>
                      <p className="text-sm leading-relaxed text-gray-200">
                        The Paonia Truth Feed provides AI-generated analysis of government documents and actions. 
                        These are neutral, fact-based assessments created by artificial intelligence, not human opinion. 
                        Each analysis represents an AI's interpretation of public records and should be considered 
                        as one perspective among many in civic discourse.
                      </p>
                      <div className="absolute -top-1 right-3 w-2 h-2 bg-gray-900 transform rotate-45"></div>
                    </div>
                  </div>
                </div>
                <p className="mt-2 text-gray-600">
                  {activeInitiative 
                    ? `Showing ${filteredPosts.length} stories related to selected initiative`
                    : 'Neutral analysis of Paonia government documents and actions'
                  }
                </p>
              </div>
            </div>
          </div>

          {/* Two column layout for Feed and Initiatives */}
          <div className="grid grid-cols-1 lg:grid-cols-[2.2fr_1fr] gap-8">
            {/* Story Feed - Left Side */}
            <div className="min-w-0">
              <div className="bg-white">
                <ul className="divide-y divide-gray-200">
                  <PostList posts={filteredPosts} />
                </ul>
              </div>
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