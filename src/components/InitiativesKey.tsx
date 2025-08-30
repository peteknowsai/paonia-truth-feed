'use client'

import { initiatives, type InitiativeId } from '@/types/initiatives'
import { useQuery, useMutation } from 'convex/react'
import { api } from '../../convex/_generated/api'
import { useAuth, useUser } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'

interface InitiativesKeyProps {
  activeInitiative?: InitiativeId | null
  onInitiativeClick?: (id: InitiativeId | null) => void
}

export default function InitiativesKey({ activeInitiative, onInitiativeClick }: InitiativesKeyProps) {
  const { isSignedIn } = useAuth()
  const { user } = useUser()
  const router = useRouter()
  
  const voteOnInitiative = useMutation(api.initiativeVotes.vote)
  const allVoteCounts = useQuery(api.initiativeVotes.getAllCounts)
  const userVotes = useQuery(api.initiativeVotes.getUserVotes, 
    user?.id ? { userId: user.id } : 'skip'
  )

  const handleVote = async (initiativeId: InitiativeId, voteType: 'support' | 'oppose', e: React.MouseEvent) => {
    e.stopPropagation() // Prevent triggering the card click
    
    if (!isSignedIn) {
      router.push('/sign-in')
      return
    }

    if (!user) return

    try {
      await voteOnInitiative({
        initiativeId,
        userId: user.id,
        username: user.username || user.firstName || 'Anonymous',
        vote: voteType,
      })
    } catch (error) {
      console.error('Failed to vote:', error)
    }
  }

  return (
    <aside className="space-y-4">
      {/* Community Support Announcement */}
      <div className="bg-yellow-100 rounded-lg border-2 border-yellow-300 shadow-md transform rotate-1 hover:rotate-0 transition-transform">
        <div className="p-6 space-y-3">
          <div className="flex-1">
            <h3 className="font-bold text-gray-900 text-sm mb-2">
              Community Support Needed - September 3rd, 10am
            </h3>
            <p className="text-xs text-gray-700 leading-relaxed mb-3">
              I will be submitting these initiatives to the Town Clerk on <strong>September 3rd at 10am</strong>. 
              I need the community's presence. I'm not doing this alone—there are many who support either 
              these initiatives or my fundamental right to have them on the ballot. Your presence matters.
            </p>
            <p className="text-xs text-gray-700 font-semibold mb-3">
              Stand with me for democracy on September 3rd. Show the Town that citizens care about their 
              right to petition and vote.
            </p>
            <a
              href="https://calendar.app.google/JfEjg284wKuGxzDd6"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-yellow-200 hover:bg-yellow-300 text-gray-900 border-2 border-yellow-400 rounded-md text-sm font-semibold transition-colors shadow-sm"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
              </svg>
              Add to Calendar
            </a>
            <p className="text-xs text-gray-600 mt-3 font-medium">
              ~ Pete McCarthy
            </p>
          </div>
        </div>
      </div>

      {/* Header Card */}
      <div className="bg-blue-50/30 backdrop-blur-sm rounded-lg border border-blue-100/50 overflow-hidden">
        <div className="px-3 py-2 border-b border-blue-100/30 bg-blue-50/20">
          <h2 className="text-xs font-bold text-gray-700 uppercase tracking-wider">
            Citizen Initiatives
          </h2>
        </div>
        
        {/* Initiative Cards */}
        <div className="divide-y divide-blue-100/20">
          {Object.values(initiatives)
            .sort((a, b) => {
              // Sort by support count (highest first), then by total engagement
              const aVotes = allVoteCounts?.[a.id] || { support: 0, oppose: 0, total: 0 }
              const bVotes = allVoteCounts?.[b.id] || { support: 0, oppose: 0, total: 0 }
              
              // First sort by support count
              if (bVotes.support !== aVotes.support) {
                return bVotes.support - aVotes.support
              }
              
              // Then by total engagement (support + oppose)
              return bVotes.total - aVotes.total
            })
            .map((initiative) => (
            <div
              key={initiative.id}
              className={`
                group relative transition-all duration-150 cursor-pointer
                ${activeInitiative === initiative.id 
                  ? `bg-orange-50/70 border-l-3 border-l-orange-500` 
                  : 'hover:bg-white/40 border-l-3 border-l-transparent'
                }
              `}
              onClick={() => onInitiativeClick?.(activeInitiative === initiative.id ? null : initiative.id)}
            >
              <div className="px-3 py-2">
                {/* Content */}
                <div className="flex-1">
                  <h3 className={`
                    font-medium text-xs leading-tight mb-0.5 flex items-center gap-1
                    ${activeInitiative === initiative.id ? 'text-orange-900' : 'text-gray-900'}
                  `}>
                    <span className="text-sm">{initiative.icon}</span>
                    {initiative.shortTitle}
                  </h3>
                    
                  {/* Description */}
                  <p className="text-[11px] text-gray-600 leading-tight mb-1.5 ml-5">
                    {initiative.description}
                  </p>
                  
                  {/* Links and Voting */}
                  <div className="flex items-center justify-between ml-5 mr-2">
                    <div className="flex items-center gap-2.5">
                      <a
                        href={`/initiative/${initiative.id}`}
                        className="text-[10px] font-medium text-blue-600 hover:text-blue-700 hover:underline"
                        onClick={(e) => e.stopPropagation()}
                      >
                        Explainer
                      </a>
                      <span className="text-[10px] text-gray-400">•</span>
                      <a
                        href={`/paonia-town${initiative.mdPath}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[10px] font-medium text-blue-600 hover:text-blue-700 hover:underline"
                        onClick={(e) => e.stopPropagation()}
                      >
                        Full Text ↗
                      </a>
                    </div>
                    
                    {/* Voting Controls */}
                    <div className="flex items-center gap-1">
                      <button
                        onClick={(e) => handleVote(initiative.id, 'support', e)}
                        className={`p-1 rounded transition-all ${
                          userVotes?.[initiative.id] === 'support' 
                            ? 'bg-green-100 text-green-700' 
                            : 'text-gray-400 hover:text-green-600 hover:bg-green-50'
                        }`}
                        title="Support this initiative"
                      >
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z"/>
                        </svg>
                      </button>
                      <span className="text-[10px] tabular-nums font-medium text-green-700 min-w-[20px] text-center">
                        {allVoteCounts?.[initiative.id]?.support || 0}
                      </span>
                      
                      <button
                        onClick={(e) => handleVote(initiative.id, 'oppose', e)}
                        className={`p-1 rounded transition-all ${
                          userVotes?.[initiative.id] === 'oppose' 
                            ? 'bg-red-100 text-red-700' 
                            : 'text-gray-400 hover:text-red-600 hover:bg-red-50'
                        }`}
                        title="Oppose this initiative"
                      >
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M18 9.5a1.5 1.5 0 11-3 0v-6a1.5 1.5 0 013 0v6zM14 9.667v-5.43a2 2 0 00-1.105-1.79l-.05-.025A4 4 0 0011.055 2H5.64a2 2 0 00-1.962 1.608l-1.2 6A2 2 0 004.44 12H8v4a2 2 0 002 2 1 1 0 001-1v-.667a4 4 0 01.8-2.4l1.4-1.866a4 4 0 00.8-2.4z"/>
                        </svg>
                      </button>
                      <span className="text-[10px] tabular-nums font-medium text-red-700 min-w-[20px] text-center">
                        {allVoteCounts?.[initiative.id]?.oppose || 0}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Clear Filter */}
        {activeInitiative && (
          <div className="px-3 py-1.5 border-t border-blue-100/20 bg-blue-50/10">
            <button
              onClick={() => onInitiativeClick?.(null)}
              className="w-full text-[10px] font-medium text-gray-600 hover:text-gray-900 transition-colors"
            >
              ✕ Clear Filter
            </button>
          </div>
        )}
        
        {/* Footer */}
        <div className="px-3 py-1.5 border-t border-blue-100/20 bg-blue-50/10">
          <p className="text-[10px] text-gray-500">
            Filed September 3, 2025
          </p>
        </div>
      </div>
    </aside>
  )
}