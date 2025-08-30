'use client'

import { Post } from '@/types'
import { useVoting } from '@/contexts/VotingContext'
import Header from './Header'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { getStoryContent } from '@/lib/storyContentMarkdown'
import { useAuth, useUser } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'
import CommentForm from './CommentForm'
import CommentList from './CommentList'
import PostEditModal from './PostEditModal'
import { useState } from 'react'
import { useMutation } from 'convex/react'
import { api } from '../../convex/_generated/api'

interface PostDetailProps {
  post: Post
}

export default function PostDetail({ post }: PostDetailProps) {
  const { votes, getVoteCount, vote } = useVoting()
  const { isSignedIn } = useAuth()
  const { user } = useUser()
  const router = useRouter()
  const [showEditModal, setShowEditModal] = useState(false)
  const [refreshKey, setRefreshKey] = useState(0)
  
  const deletePost = useMutation(api.updatePost.deletePost)
  
  // Check if user is admin
  const isAdmin = user?.primaryEmailAddress?.emailAddress && 
    process.env.NEXT_PUBLIC_ADMIN_EMAILS?.split(',').includes(user.primaryEmailAddress.emailAddress)
  
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
  
  const handleDelete = async () => {
    if (confirm('Are you sure you want to delete this post? This action cannot be undone.')) {
      try {
        await deletePost({ postId })
        router.push('/')
      } catch (error) {
        console.error('Failed to delete post:', error)
        alert('Failed to delete post')
      }
    }
  }
  
  const handleUpdate = () => {
    setRefreshKey(prev => prev + 1)
    window.location.reload()
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
              <div className="flex items-center gap-2">
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
                
                {isAdmin && (
                  <>
                    <button
                      onClick={() => setShowEditModal(true)}
                      className="inline-flex items-center gap-2 px-3 py-1.5 text-sm bg-green-600 hover:bg-green-700 text-white rounded-md transition-colors"
                      aria-label="Edit Post"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                      Edit
                    </button>
                    
                    <button
                      onClick={handleDelete}
                      className="inline-flex items-center gap-2 px-3 py-1.5 text-sm bg-red-600 hover:bg-red-700 text-white rounded-md transition-colors"
                      aria-label="Delete Post"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                      Delete
                    </button>
                  </>
                )}
              </div>
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
      
      {/* Edit Modal */}
      {showEditModal && (
        <PostEditModal
          postId={postId}
          currentTitle={post.title}
          currentContent={post.content}
          currentAnalysis={storyContent}
          onClose={() => setShowEditModal(false)}
          onUpdate={handleUpdate}
        />
      )}
    </div>
  )
}