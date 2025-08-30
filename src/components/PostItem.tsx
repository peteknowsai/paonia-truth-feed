'use client'

import { Post } from '@/types'
import { useVoting } from '@/contexts/VotingContext'
import { useAuth } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'

interface PostItemProps {
  post: Post
  rank: number
}

export default function PostItem({ post, rank }: PostItemProps) {
  const { votes, getVoteCount, vote } = useVoting()
  const { isSignedIn } = useAuth()
  const router = useRouter()
  const postId = (post as any)._id || post.id
  const userVote = votes[postId]
  const voteCount = getVoteCount(postId, post.points, 0)
  
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
    <article className="border-b border-black pb-6 mb-6">
      {/* Post Number */}
      <div className="mb-2">
        <span className="text-xs">[{String(rank).padStart(3, '0')}]</span>
      </div>
      
      {/* Title */}
      <h2 className="text-lg font-bold mb-2 uppercase">
        <a 
          href={`/post/${postId}`}
          className="hover:bg-black hover:text-white"
        >
          {post.title}
        </a>
      </h2>
      
      {/* Content Preview */}
      <p className="text-sm mb-4 line-clamp-2">
        {post.content}
      </p>
      
      {/* Metadata and Actions */}
      <div className="flex items-center gap-4 text-xs">
        {/* Voting */}
        <div className="flex items-center gap-2">
          <button 
            onClick={handleUpvote}
            className={`px-2 py-1 border border-black ${
              userVote === 'up' ? 'bg-black text-white' : ''
            }`}
          >
            UP
          </button>
          <span className="font-bold">[{voteCount}]</span>
          <button 
            onClick={handleDownvote}
            className={`px-2 py-1 border border-black ${
              userVote === 'down' ? 'bg-black text-white' : ''
            }`}
          >
            DOWN
          </button>
        </div>
        
        <span>•</span>
        
        {/* Comments */}
        <a 
          href={`/post/${postId}`} 
          className="underline hover:bg-black hover:text-white"
        >
          {post.comments} COMMENTS
        </a>
        
        <span>•</span>
        
        {/* Share */}
        <button
          onClick={(e) => {
            e.preventDefault()
            const url = `${window.location.origin}/post/${postId}`
            const text = `"${post.title}"`
            const shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}&quote=${encodeURIComponent(text)}`
            window.open(shareUrl, '_blank', 'width=600,height=400')
          }}
          className="underline hover:bg-black hover:text-white"
        >
          SHARE
        </button>
      </div>
    </article>
  )
}