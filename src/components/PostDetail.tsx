'use client'

import { Post } from '@/types'
import { useVoting } from '@/contexts/VotingContext'
import Header from './Header'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { getStoryContent } from '@/lib/storyContentMarkdown'
import { useAuth } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'
import CommentForm from './CommentForm'
import CommentList from './CommentList'

interface PostDetailProps {
  post: Post
}

export default function PostDetail({ post }: PostDetailProps) {
  const { votes, getVoteCount, vote } = useVoting()
  const { isSignedIn } = useAuth()
  const router = useRouter()
  const postId = (post as any)._id || post.id
  const userVote = votes[postId]
  const voteCount = getVoteCount(postId, post.points, 0)
  // Use storyAnalysis from database if available, otherwise fall back to getStoryContent
  const storyContent = (post as any).storyAnalysis || getStoryContent(postId)
  
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
  
  const handleShare = () => {
    const url = window.location.href
    const shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`
    window.open(shareUrl, '_blank', 'width=600,height=400')
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Post Header */}
        <div className="mb-6">
          <div className="flex items-start space-x-3 mb-4">
            {/* Voting */}
            <div className="flex flex-col items-center space-y-1 pt-1">
              <button 
                onClick={handleUpvote}
                className={`${
                  userVote === 'up' ? 'text-[#ff6600]' : 'text-gray-400'
                } hover:text-[#ff6600] transition-colors`}
                aria-label="Upvote"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 3l7 7h-5v7h-4v-7H3l7-7z"/>
                </svg>
              </button>
              <span className="text-sm font-bold text-gray-700">{voteCount}</span>
              <button 
                onClick={handleDownvote}
                className={`${
                  userVote === 'down' ? 'text-blue-600' : 'text-gray-400'
                } hover:text-blue-600 transition-colors`}
                aria-label="Downvote"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 17l-7-7h5V3h4v7h5l-7 7z"/>
                </svg>
              </button>
            </div>
            
            {/* Title and Share */}
            <div className="flex-1">
              <h1 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 leading-tight">
                {post.title}
              </h1>
              <button
                onClick={handleShare}
                className="inline-flex items-center gap-2 px-3 py-1.5 text-sm bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors"
                aria-label="Share on Facebook"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
                Share on Facebook
              </button>
            </div>
          </div>

          {/* AI Summary Box - Brief Overview */}
          <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded-r mb-6">
            <h3 className="text-sm font-semibold text-blue-900 mb-2">📊 AI Summary</h3>
            <p className="text-sm text-gray-700 leading-relaxed">
              {post.content}
            </p>
          </div>
        </div>

        {/* AI Story - Full Analysis */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <span>🤖</span>
            <span>AI Story Analysis</span>
          </h2>
          <article className="prose prose-sm max-w-none prose-headings:text-gray-900 prose-p:text-gray-700 prose-strong:text-gray-900 prose-ul:text-gray-700 prose-ol:text-gray-700 prose-blockquote:border-l-4 prose-blockquote:border-blue-400 prose-blockquote:bg-blue-50 prose-blockquote:pl-4 prose-blockquote:py-2 prose-blockquote:text-gray-700">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {storyContent}
            </ReactMarkdown>
          </article>
        </div>

        {/* Comments Section */}
        <div className="mt-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <span>💬</span>
            <span>Community Discussion</span>
          </h3>
          <CommentForm postId={postId} />
          <CommentList postId={postId} />
        </div>

        {/* Back to Feed */}
        <div className="mt-10 text-center">
          <a 
            href="/" 
            className="inline-flex items-center text-sm text-blue-600 hover:text-blue-800 font-medium"
          >
            <svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Feed
          </a>
        </div>
      </main>
    </div>
  )
}