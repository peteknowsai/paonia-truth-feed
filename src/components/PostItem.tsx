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

  return (
    <li className="grid grid-cols-[48px_1fr] gap-3 sm:gap-4 lg:gap-6 py-4 hover:bg-gray-50/50 transition-colors duration-150 rounded-lg px-3 sm:px-4 -mx-3 sm:-mx-4">
      {/* Vote Column - Fixed 56px */}
      <div className="flex flex-col items-center gap-1 pt-1">
        <button 
          onClick={handleUpvote}
          className={`w-10 h-10 flex items-center justify-center rounded transition-all duration-150 ${
            userVote === 'up' 
              ? 'text-orange-500 bg-orange-50 hover:bg-orange-100' 
              : 'text-gray-400 hover:text-orange-500 hover:bg-gray-100'
          }`}
          aria-label="Upvote"
          aria-pressed={userVote === 'up'}
        >
          <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10 3l7 7h-5v7h-4v-7H3l7-7z"/>
          </svg>
        </button>
        
        <div className={`text-sm font-semibold tabular-nums ${
          userVote === 'up' ? 'text-orange-500' : userVote === 'down' ? 'text-blue-500' : 'text-gray-700'
        } transition-all duration-150 ${isVotingThis ? 'scale-105' : ''}`}>
          {voteCount}
        </div>
        
        <button 
          onClick={handleDownvote}
          className={`w-10 h-10 flex items-center justify-center rounded transition-all duration-150 ${
            userVote === 'down' 
              ? 'text-blue-500 bg-blue-50 hover:bg-blue-100' 
              : 'text-gray-400 hover:text-blue-500 hover:bg-gray-100'
          }`}
          aria-label="Downvote"
          aria-pressed={userVote === 'down'}
        >
          <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10 17l-7-7h5V3h4v7h5l-7 7z"/>
          </svg>
        </button>
      </div>
      
      {/* Content Column - Flexible width */}
      <div className="min-w-0 pt-0.5">
        {/* Title - Primary Action */}
        <a 
          href={`/post/${postId}`}
          className="group block mb-1"
        >
          <h2 className="text-sm md:text-base leading-snug font-medium text-gray-900 group-hover:text-blue-600 transition-colors duration-150 line-clamp-2">
            {post.title}
          </h2>
        </a>
        
        {/* Metadata Row - Secondary Info */}
        <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-gray-500">
          <a 
            href={`/post/${postId}`} 
            className="hover:text-gray-700 transition-colors"
          >
            {post.comments} comments
          </a>
          <span className="text-gray-300">•</span>
          <button
            onClick={(e) => {
              e.preventDefault()
              const url = `${window.location.origin}/post/${postId}`
              const shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`
              window.open(shareUrl, '_blank', 'width=600,height=400')
            }}
            className="hover:text-blue-600 transition-colors flex items-center gap-1"
            aria-label="Share on Facebook"
          >
            <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
            </svg>
            Share
          </button>
        </div>
        
        {/* Initiative Badges - Color Coded Chips */}
        {post.relatedInitiatives && post.relatedInitiatives.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-1.5">
            {post.relatedInitiatives.slice(0, 2).map(initiativeId => {
              const initiative = initiatives[initiativeId]
              return initiative ? (
                <span 
                  key={initiativeId}
                  className={`inline-flex items-center gap-1 px-2 py-1 text-xs font-medium rounded ${initiative.bgColor} ${initiative.color} border ${initiative.borderColor} transition-colors cursor-default`}
                  title={initiative.title}
                >
                  <span>{initiative.icon}</span>
                  <span>{initiative.shortTitle}</span>
                </span>
              ) : null
            })}
            {post.relatedInitiatives.length > 2 && (
              <span className="px-2 py-1 text-xs font-medium text-gray-500 bg-gray-100 rounded">
                +{post.relatedInitiatives.length - 2}
              </span>
            )}
          </div>
        )}
        
      </div>
    </li>
  )
}