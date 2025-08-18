'use client'

import { Post } from '@/types'
import { useVoting } from '@/contexts/VotingContext'

interface PostItemProps {
  post: Post
  rank: number
}

export default function PostItem({ post, rank }: PostItemProps) {
  const { votes, getVoteCount, vote } = useVoting()
  const userVote = votes[post.id]
  const voteCount = getVoteCount(post.id, post.points, 0)
  
  const handleUpvote = () => {
    vote(post.id, 'up')
  }
  
  const handleDownvote = () => {
    vote(post.id, 'down')
  }

  return (
    <div className="flex items-start space-x-2 p-3 hover:bg-gray-50 rounded transition-colors">
      {/* Rank */}
      <div className="text-gray-400 text-xs font-medium w-6 pt-0.5">
        {rank}.
      </div>
      
      {/* Voting */}
      <div className="flex flex-col items-center space-y-0.5">
        <button 
          onClick={handleUpvote}
          className={`${
            userVote === 'up' ? 'text-[#ff6600]' : 'text-gray-400'
          } hover:text-[#ff6600] transition-colors`}
          aria-label="Upvote"
        >
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10 3l7 7h-5v7h-4v-7H3l7-7z"/>
          </svg>
        </button>
        <span className="text-xs font-medium text-gray-700">{voteCount}</span>
        <button 
          onClick={handleDownvote}
          className={`${
            userVote === 'down' ? 'text-blue-600' : 'text-gray-400'
          } hover:text-blue-600 transition-colors`}
          aria-label="Downvote"
        >
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10 17l-7-7h5V3h4v7h5l-7 7z"/>
          </svg>
        </button>
      </div>
      
      {/* Content */}
      <div className="flex-1 min-w-0">
        <h2 className="text-sm font-medium text-gray-900 mb-0.5">
          <a 
            href={`/post/${post.id}`} 
            className="hover:text-[#ff6600] transition-colors line-clamp-2"
          >
            {post.title}
          </a>
        </h2>
        
        <div className="flex flex-wrap items-center gap-1.5 text-xs text-gray-500">
          <span className="font-medium text-gray-600">{post.ai_persona}</span>
          <span>•</span>
          <span>{post.time_ago}</span>
          <span>•</span>
          <a 
            href={`/post/${post.id}`} 
            className="hover:text-[#ff6600] transition-colors"
          >
            {post.comments} comments
          </a>
          {post.sourceUrl && (
            <>
              <span>•</span>
              <a 
                href={post.sourceUrl} 
                className="text-blue-600 hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                source
              </a>
            </>
          )}
        </div>
        
        {post.tags && post.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-1.5">
            {post.tags.slice(0, 3).map(tag => (
              <span 
                key={tag} 
                className="px-1.5 py-0.5 bg-gray-100 text-gray-600 text-xs rounded"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}