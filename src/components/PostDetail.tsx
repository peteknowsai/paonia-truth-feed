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
  
  const isAdmin = isAdminEmail(user?.primaryEmailAddress?.emailAddress)
  
  const postId = (post as any)._id || post.id
  const userVote = votes[postId]
  const voteCount = getVoteCount(postId, post.points, 0)
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
  
  const formatDistanceToNow = (date: Date | string | number) => {
    const d = new Date(date)
    const now = new Date()
    const diff = now.getTime() - d.getTime()
    const hours = Math.floor(diff / (1000 * 60 * 60))
    const days = Math.floor(hours / 24)
    
    if (days > 0) return `${days} DAY${days > 1 ? 'S' : ''} AGO`
    if (hours > 0) return `${hours} HOUR${hours > 1 ? 'S' : ''} AGO`
    return 'JUST NOW'
  }
  
  const handleShare = () => {
    const url = `${window.location.origin}/post/${postId}`
    const text = `"${post.title}"`
    const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}&quote=${encodeURIComponent(text)}`
    window.open(facebookUrl, '_blank', 'width=600,height=400')
  }
  
  const handleDelete = async () => {
    if (confirm('Delete this post? This cannot be undone.')) {
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
    <div className="min-h-screen bg-white text-black">
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
      
      <main className="max-w-3xl mx-auto px-4 py-8">
        {/* Article Header */}
        <header className="mb-8 pb-4 border-b-2 border-black">
          <h1 className="text-2xl font-bold mb-4 uppercase">
            {post.title}
          </h1>
          
          <div className="text-xs uppercase">
            <span>BY THE PAONIA TRUTH BOT</span>
            <span className="mx-2">•</span>
            <span>{formatDistanceToNow(post.createdAt || post._creationTime || new Date())}</span>
            {post.url && (
              <>
                <span className="mx-2">•</span>
                <a 
                  href={post.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="underline"
                >
                  SOURCE
                </a>
              </>
            )}
          </div>
          
          {/* Admin controls */}
          {isAdmin && (
            <div className="flex gap-2 mt-4">
              <button
                onClick={() => setShowEditModal(true)}
                className="px-3 py-1 border border-black text-xs"
              >
                EDIT
              </button>
              <button
                onClick={handleDelete}
                className="px-3 py-1 border border-black text-xs"
              >
                DELETE
              </button>
            </div>
          )}
        </header>
        
        {/* Main Article Content */}
        <article className="mb-12">
          <div className="prose prose-sm max-w-none">
            {storyContent ? (
              <ReactMarkdown 
                remarkPlugins={[remarkGfm]}
                components={{
                  h1: ({children}) => (
                    <h1 className="text-xl font-bold mt-8 mb-4 uppercase border-b border-black pb-2">
                      {children}
                    </h1>
                  ),
                  h2: ({children}) => (
                    <h2 className="text-lg font-bold mt-6 mb-3 uppercase">
                      {children}
                    </h2>
                  ),
                  h3: ({children}) => (
                    <h3 className="text-base font-bold mt-4 mb-2 uppercase">
                      {children}
                    </h3>
                  ),
                  p: ({children}) => (
                    <p className="mb-4 leading-relaxed">
                      {children}
                    </p>
                  ),
                  ul: ({children}) => (
                    <ul className="list-disc pl-6 mb-4 space-y-1">
                      {children}
                    </ul>
                  ),
                  li: ({children}) => (
                    <li className="leading-relaxed">
                      {children}
                    </li>
                  ),
                  blockquote: ({children}) => (
                    <blockquote className="border-l-2 border-black pl-4 my-4">
                      {children}
                    </blockquote>
                  ),
                  strong: ({children}) => (
                    <strong className="font-bold underline">
                      {children}
                    </strong>
                  ),
                  em: ({children}) => (
                    <em className="italic">
                      {children}
                    </em>
                  ),
                  code: ({children}) => (
                    <code className="px-1 font-mono text-sm">
                      {children}
                    </code>
                  ),
                  a: ({href, children}) => (
                    <a 
                      href={href} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="underline"
                    >
                      {children}
                    </a>
                  ),
                }}
              >
                {storyContent}
              </ReactMarkdown>
            ) : (
              <div className="text-base leading-relaxed">
                <p>{post.content}</p>
              </div>
            )}
          </div>
        </article>
        
        {/* Voting Section */}
        <div className="border-t-2 border-b-2 border-black py-4 mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <span className="text-sm font-bold">RATE THIS TRUTH BOMB:</span>
              <div className="flex items-center gap-2">
                <button
                  onClick={handleUpvote}
                  className={`px-3 py-1 border border-black text-xs ${
                    userVote === 'up' ? 'bg-black text-white' : ''
                  }`}
                >
                  UP
                </button>
                <span className="font-bold text-lg">[{voteCount}]</span>
                <button
                  onClick={handleDownvote}
                  className={`px-3 py-1 border border-black text-xs ${
                    userVote === 'down' ? 'bg-black text-white' : ''
                  }`}
                >
                  DOWN
                </button>
              </div>
            </div>
            
            <button
              onClick={handleShare}
              className="px-3 py-1 border border-black text-xs"
            >
              SHARE ON FACEBOOK
            </button>
          </div>
        </div>
        
        {/* Comments Section */}
        <div className="mb-12">
          <h3 className="text-lg font-bold mb-4 uppercase">Discussion</h3>
          <CommentForm postId={postId as any} />
          <CommentList postId={postId as any} />
        </div>
        
        {/* Back Link */}
        <div className="text-center pt-8 border-t border-black">
          <a 
            href="/" 
            className="text-sm underline uppercase"
          >
            ← Back to Feed
          </a>
        </div>
      </main>
    </div>
  )
}