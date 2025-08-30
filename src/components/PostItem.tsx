'use client'

import { Post } from '@/types'
import { useVoting } from '@/contexts/VotingContext'
import { initiatives } from '@/types/initiatives'
import { useAuth } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'

interface PostItemProps {
  post: Post
  rank: number
}

export default function PostItem({ post, rank }: PostItemProps) {
  const { votes, getVoteCount, vote, isVoting } = useVoting()
  const { isSignedIn } = useAuth()
  const router = useRouter()
  const postId = (post as any)._id || post.id
  const userVote = votes[postId]
  const voteCount = getVoteCount(postId, post.points, 0)
  const isVotingThis = isVoting[postId]
  
  const handleUpvote = () => {
    if (!isSignedIn) {
      router.push('/sign-in')
      return
    }
    vote(postId, 'up')
  }
  
  const handleDownvote = () => {
    if (!isSignedIn) {
      router.push('/sign-in')
      return
    }
    vote(postId, 'down')
  }

  // Fun impact levels based on vote count
  const getImpactLevel = () => {
    if (voteCount >= 100) return { text: '🔥 NUCLEAR', color: 'text-red-500' }
    if (voteCount >= 50) return { text: '💥 EXPLOSIVE', color: 'text-orange-500' }
    if (voteCount >= 25) return { text: '💣 BOOM', color: 'text-yellow-500' }
    if (voteCount >= 10) return { text: '✨ POP', color: 'text-blue-400' }
    return { text: '🎯 NEW', color: 'text-gray-400' }
  }

  const impact = getImpactLevel()

  return (
    <li className="group relative bg-gray-800/50 backdrop-blur-sm rounded-xl p-4 mb-4 border border-gray-700/50 hover:border-orange-500/50 transition-all duration-300 hover:shadow-2xl hover:shadow-orange-500/10">
      <div className="flex gap-4">
        {/* Vote Column */}
        <div className="flex flex-col items-center gap-2">
          <button 
            onClick={handleUpvote}
            className={`p-2 rounded-lg transition-all transform hover:scale-110 ${
              userVote === 'up' 
                ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg' 
                : 'bg-gray-700/50 text-gray-400 hover:bg-gray-700 hover:text-orange-400'
            }`}
            aria-label="Upvote"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
            </svg>
          </button>
          
          <div className="text-center">
            <div className={`text-2xl font-black ${impact.color} transition-all duration-300 ${isVotingThis ? 'scale-110' : ''}`}>
              {voteCount}
            </div>
            <div className={`text-xs font-bold ${impact.color}`}>
              {impact.text}
            </div>
          </div>
          
          <button 
            onClick={handleDownvote}
            className={`p-2 rounded-lg transition-all transform hover:scale-110 ${
              userVote === 'down' 
                ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg' 
                : 'bg-gray-700/50 text-gray-400 hover:bg-gray-700 hover:text-blue-400'
            }`}
            aria-label="Downvote"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        </div>
        
        {/* Content Column */}
        <div className="flex-1 min-w-0">
          {/* Rank Badge */}
          {rank <= 3 && (
            <span className="inline-flex items-center gap-1 px-2 py-1 bg-gradient-to-r from-yellow-500 to-orange-500 text-white text-xs font-black rounded-full mb-2">
              {rank === 1 && '🏆 TOP BOMB'}
              {rank === 2 && '🥈 RUNNER UP'}
              {rank === 3 && '🥉 THIRD PLACE'}
            </span>
          )}
          
          {/* Title */}
          <a 
            href={`/post/${postId}`}
            className="group/link block mb-2"
          >
            <h2 className="text-lg sm:text-xl font-bold text-gray-100 group-hover/link:text-orange-400 transition-colors duration-200 leading-tight">
              {post.title}
            </h2>
          </a>
          
          {/* Truth Bomb Preview */}
          <p className="text-gray-400 text-sm mb-3 line-clamp-2 italic">
            "{post.content}"
          </p>
          
          {/* Metadata Row */}
          <div className="flex flex-wrap items-center gap-3 text-xs">
            <a 
              href={`/post/${postId}`} 
              className="text-gray-500 hover:text-orange-400 transition-colors font-medium"
            >
              💬 {post.comments} reactions
            </a>
            
            <button
              onClick={(e) => {
                e.preventDefault()
                const url = `${window.location.origin}/post/${postId}`
                const text = `Check out this truth bomb: "${post.title}" 💣`
                const shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}&quote=${encodeURIComponent(text)}`
                window.open(shareUrl, '_blank', 'width=600,height=400')
              }}
              className="text-gray-500 hover:text-blue-400 transition-colors flex items-center gap-1 font-medium"
            >
              <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
              Spread the truth
            </button>
            
            <span className="text-gray-600">•</span>
            
            <span className="text-orange-400 font-bold">
              💣 Truth Bomb #{rank}
            </span>
          </div>
          
          {/* Initiative Badges */}
          {post.relatedInitiatives && post.relatedInitiatives.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-1.5">
              {post.relatedInitiatives.slice(0, 2).map(initiativeId => {
                const initiative = initiatives[initiativeId]
                return initiative ? (
                  <span 
                    key={initiativeId}
                    className="inline-flex items-center gap-1 px-2 py-1 text-xs font-bold rounded-full bg-gray-700/50 text-gray-300 border border-gray-600"
                    title={initiative.title}
                  >
                    <span>{initiative.icon}</span>
                    <span>{initiative.shortTitle}</span>
                  </span>
                ) : null
              })}
              {post.relatedInitiatives.length > 2 && (
                <span className="px-2 py-1 text-xs font-bold text-gray-400 bg-gray-700/50 rounded-full">
                  +{post.relatedInitiatives.length - 2} more
                </span>
              )}
            </div>
          )}
        </div>
      </div>
      
      {/* Hover Effect Glow */}
      <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-orange-500/0 via-red-500/0 to-pink-500/0 group-hover:from-orange-500/10 group-hover:via-red-500/10 group-hover:to-pink-500/10 transition-all duration-300 pointer-events-none"></div>
    </li>
  )
}