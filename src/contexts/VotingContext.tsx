'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'

interface VoteState {
  [postId: string]: 'up' | 'down' | null
}

interface VotingContextType {
  votes: VoteState
  getVoteCount: (postId: string, upvotes: number, downvotes: number) => number
  vote: (postId: string, voteType: 'up' | 'down') => void
}

const VotingContext = createContext<VotingContextType | undefined>(undefined)

export function VotingProvider({ children }: { children: ReactNode }) {
  const [votes, setVotes] = useState<VoteState>({})

  useEffect(() => {
    const savedVotes = localStorage.getItem('paonia-votes')
    if (savedVotes) {
      setVotes(JSON.parse(savedVotes))
    }
  }, [])

  const vote = (postId: string, voteType: 'up' | 'down') => {
    setVotes(prevVotes => {
      const currentVote = prevVotes[postId]
      const newVotes = { ...prevVotes }
      
      if (currentVote === voteType) {
        delete newVotes[postId]
      } else {
        newVotes[postId] = voteType
      }
      
      localStorage.setItem('paonia-votes', JSON.stringify(newVotes))
      return newVotes
    })
  }

  const getVoteCount = (postId: string, upvotes: number, downvotes: number) => {
    const userVote = votes[postId]
    let adjustedUp = upvotes
    let adjustedDown = downvotes
    
    if (userVote === 'up') {
      adjustedUp += 1
    } else if (userVote === 'down') {
      adjustedDown += 1
    }
    
    return adjustedUp - adjustedDown
  }

  return (
    <VotingContext.Provider value={{ votes, getVoteCount, vote }}>
      {children}
    </VotingContext.Provider>
  )
}

export function useVoting() {
  const context = useContext(VotingContext)
  if (!context) {
    throw new Error('useVoting must be used within VotingProvider')
  }
  return context
}