'use client'

import { createContext, useContext, useEffect, useState, ReactNode } from 'react'
import { useMutation, useQuery } from 'convex/react'
import { api } from '../../convex/_generated/api'
import { Id } from '../../convex/_generated/dataModel'

type VoteType = 'up' | 'down' | null

interface VotingContextType {
  votes: Record<string, VoteType>
  getVoteCount: (postId: string, initialCount: number, adjustment: number) => number
  vote: (postId: string, voteType: 'up' | 'down') => void
  isVoting: Record<string, boolean>
}

const VotingContext = createContext<VotingContextType | undefined>(undefined)

function getUserId(): string {
  if (typeof window === 'undefined') return ''
  
  let userId = localStorage.getItem('userId')
  if (!userId) {
    userId = `user_${Math.random().toString(36).substr(2, 9)}`
    localStorage.setItem('userId', userId)
  }
  return userId
}

export function VotingProvider({ children }: { children: ReactNode }) {
  const [userId] = useState(() => getUserId())
  const [localVotes, setLocalVotes] = useState<Record<string, VoteType>>({})
  const [isVoting, setIsVoting] = useState<Record<string, boolean>>({})
  
  // Fetch user's votes from Convex
  const convexVotes = useQuery(api.votes.getUserVotes, userId ? { userId } : 'skip')
  const voteMutation = useMutation(api.votes.vote)
  
  // Sync Convex votes with local state
  useEffect(() => {
    if (convexVotes) {
      setLocalVotes(convexVotes as Record<string, VoteType>)
    }
  }, [convexVotes])
  
  const vote = async (postId: string, voteType: 'up' | 'down') => {
    if (!userId || isVoting[postId]) return
    
    const currentVote = localVotes[postId]
    
    // Set voting state for visual feedback
    setIsVoting(prev => ({ ...prev, [postId]: true }))
    
    // Optimistic update with haptic-like visual feedback
    if (currentVote === voteType) {
      // Toggle off
      setLocalVotes(prev => {
        const next = { ...prev }
        delete next[postId]
        return next
      })
    } else {
      // Set new vote
      setLocalVotes(prev => ({ ...prev, [postId]: voteType }))
    }
    
    // Send to Convex
    try {
      await voteMutation({
        postId: postId as Id<"posts">,
        userId,
        vote: voteType,
      })
    } catch (error) {
      console.error('Failed to vote:', error)
      // Revert optimistic update on error
      setLocalVotes(prev => ({ ...prev, [postId]: currentVote || null }))
    } finally {
      // Clear voting state
      setTimeout(() => {
        setIsVoting(prev => ({ ...prev, [postId]: false }))
      }, 300)
    }
  }
  
  const getVoteCount = (postId: string, initialCount: number, adjustment: number) => {
    // This is now handled by Convex queries, so we just return the initial count
    // The actual vote count comes from the posts query
    return initialCount
  }
  
  return (
    <VotingContext.Provider value={{ votes: localVotes, getVoteCount, vote, isVoting }}>
      {children}
    </VotingContext.Provider>
  )
}

export function useVoting() {
  const context = useContext(VotingContext)
  if (context === undefined) {
    throw new Error('useVoting must be used within a VotingProvider')
  }
  return context
}