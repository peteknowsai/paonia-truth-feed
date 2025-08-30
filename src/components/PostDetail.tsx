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
import { isAdminEmail } from '@/lib/config'

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
  const isAdmin = isAdminEmail(user?.primaryEmailAddress?.emailAddress)
  
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
  
  const formatDistanceToNow = (date: Date | string) => {
    const d = new Date(date)
    const now = new Date()
    const diff = now.getTime() - d.getTime()
    const hours = Math.floor(diff / (1000 * 60 * 60))
    const days = Math.floor(hours / 24)
    
    if (days > 0) return `${days} day${days > 1 ? 's' : ''} ago`
    if (hours > 0) return `${hours} hour${hours > 1 ? 's' : ''} ago`
    return 'just now'
  }
  
  const handleShare = () => {
    const url = `${window.location.origin}/post/${postId}`
    const text = `Check out "${post.title}" on Paonia Truth Feed - AI Truth Bombs 💣`
    const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}&quote=${encodeURIComponent(text)}`
    window.open(facebookUrl, '_blank', 'width=600,height=400')
  }
  
  const handleDelete = async () => {
    if (confirm('Are you sure you want to delete this post? This action cannot be undone.')) {
      try {
        await deletePost({ postId: postId as any })
        router.push('/')
      } catch (error) {
        console.error('Failed to delete post:', error)
        alert('Failed to delete post')
      }
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900">
      <Header />
      
      {/* Edit Modal */}
      {showEditModal && (
        <PostEditModal
          postId={postId as any}
          currentTitle={post.title}
          currentContent={post.content}
          currentAnalysis={(post as any).storyAnalysis || ''}
          onClose={() => setShowEditModal(false)}
          onUpdate={() => {
            setRefreshKey(prev => prev + 1)
            window.location.reload()
          }}
        />
      )}
      
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Article Header */}
        <header className="mb-12 text-center">
          {/* Truth Bomb Badge */}
          <div className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 rounded-full text-white font-black text-lg mb-8 shadow-2xl animate-pulse">
            <span className="text-2xl">💣</span>
            <span className="tracking-wider">AI TRUTH BOMB INCOMING</span>
            <span className="text-2xl">💣</span>
          </div>
          
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black mb-6 leading-tight bg-gradient-to-r from-white via-gray-100 to-gray-300 bg-clip-text text-transparent">
            {post.title}
          </h1>
          
          <div className="flex items-center justify-center gap-4 text-gray-400 text-sm mb-8">
            <span className="font-medium text-orange-400">The Paonia Truth Bot</span>
            <span className="text-gray-600">•</span>
            <time className="text-gray-500">{formatDistanceToNow(post.createdAt || post._creationTime || new Date())}</time>
            {post.url && (
              <>
                <span className="text-gray-600">•</span>
                <a 
                  href={post.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:text-blue-300 transition-colors"
                >
                  Source Material
                </a>
              </>
            )}
          </div>
          
          {/* Admin controls */}
          {isAdmin && (
            <div className="flex justify-center gap-2 mb-6">
              <button
                onClick={() => setShowEditModal(true)}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-colors"
              >
                Edit Truth Bomb
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg text-sm font-medium transition-colors"
              >
                Defuse Bomb
              </button>
            </div>
          )}
        </header>
        
        {/* Main Article - The Truth Bomb */}
        <article className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 sm:p-12 shadow-2xl border border-gray-700/50 mb-12">
          <div className="prose prose-xl prose-invert max-w-none">
            {storyContent ? (
              <ReactMarkdown 
                remarkPlugins={[remarkGfm]}
                components={{
                  h1: ({children}) => (
                    <h1 className="text-4xl sm:text-5xl font-black mt-10 mb-6 text-transparent bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text">
                      {children}
                    </h1>
                  ),
                  h2: ({children}) => (
                    <h2 className="text-3xl sm:text-4xl font-bold mt-10 mb-5 text-gray-100">
                      {children}
                    </h2>
                  ),
                  h3: ({children}) => (
                    <h3 className="text-2xl sm:text-3xl font-semibold mt-8 mb-4 text-gray-200">
                      {children}
                    </h3>
                  ),
                  p: ({children}) => (
                    <p className="mb-6 text-gray-300 leading-relaxed text-lg sm:text-xl font-light">
                      {children}
                    </p>
                  ),
                  ul: ({children}) => (
                    <ul className="list-none mb-6 space-y-3">
                      {children}
                    </ul>
                  ),
                  li: ({children}) => (
                    <li className="flex items-start gap-3 text-gray-300 text-lg">
                      <span className="text-orange-400 mt-1">💥</span>
                      <span className="leading-relaxed">{children}</span>
                    </li>
                  ),
                  blockquote: ({children}) => (
                    <blockquote className="border-l-4 border-orange-500 bg-orange-500/10 pl-6 pr-4 py-4 my-8 italic text-xl text-orange-200 rounded-r-lg">
                      {children}
                    </blockquote>
                  ),
                  strong: ({children}) => (
                    <strong className="font-black text-orange-400 text-xl">
                      {children}
                    </strong>
                  ),
                  em: ({children}) => (
                    <em className="italic text-yellow-300 font-medium">
                      {children}
                    </em>
                  ),
                  code: ({children}) => (
                    <code className="bg-gray-900 px-3 py-1 rounded text-sm text-orange-400 font-mono">
                      {children}
                    </code>
                  ),
                  a: ({href, children}) => (
                    <a 
                      href={href} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="text-blue-400 hover:text-blue-300 underline decoration-2 underline-offset-4 transition-colors font-medium"
                    >
                      {children}
                    </a>
                  ),
                }}
              >
                {storyContent}
              </ReactMarkdown>
            ) : (
              <div className="text-xl leading-relaxed text-gray-300 font-light">
                <p>{post.content}</p>
              </div>
            )}
          </div>
        </article>
        
        {/* Engagement Section */}
        <div className="bg-gray-800/30 backdrop-blur-sm rounded-2xl p-8 mb-12 border border-gray-700/50">
          <h3 className="text-2xl font-bold text-center mb-6 text-gray-100">
            Did this truth bomb hit the target? 🎯
          </h3>
          
          <div className="flex items-center justify-center gap-8">
            <button
              onClick={handleUpvote}
              className={`group flex flex-col items-center gap-2 p-4 rounded-xl transition-all transform hover:scale-110 ${
                userVote === 'up' 
                  ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg' 
                  : 'bg-gray-700/50 text-gray-400 hover:bg-gray-700'
              }`}
            >
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 15l7-7 7 7" />
              </svg>
              <span className="text-sm font-bold">BOOM!</span>
            </button>
            
            <div className="text-center">
              <div className="text-4xl font-black text-white">{voteCount}</div>
              <div className="text-sm text-gray-400 mt-1">impact score</div>
            </div>
            
            <button
              onClick={handleDownvote}
              className={`group flex flex-col items-center gap-2 p-4 rounded-xl transition-all transform hover:scale-110 ${
                userVote === 'down' 
                  ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg' 
                  : 'bg-gray-700/50 text-gray-400 hover:bg-gray-700'
              }`}
            >
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M19 9l-7 7-7-7" />
              </svg>
              <span className="text-sm font-bold">DUD</span>
            </button>
          </div>
          
          <div className="flex justify-center mt-6">
            <button
              onClick={handleShare}
              className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-full font-bold transition-all transform hover:scale-105 shadow-lg"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
              Share this Truth Bomb
            </button>
          </div>
        </div>
        
        {/* Comments Section */}
        <div className="bg-gray-800/30 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/50">
          <h3 className="text-2xl font-bold mb-6 text-gray-100 flex items-center gap-3">
            <span>💭</span>
            <span>Drop Your Own Truth Bombs</span>
          </h3>
          <CommentForm postId={postId as any} />
          <CommentList postId={postId as any} />
        </div>
        
        {/* Back to Feed */}
        <div className="mt-12 text-center">
          <a 
            href="/" 
            className="inline-flex items-center gap-2 text-lg text-orange-400 hover:text-orange-300 font-bold transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to the Truth Feed
          </a>
        </div>
      </main>
    </div>
  )
}