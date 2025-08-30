'use client'

import { useState } from 'react'
import { Post } from '@/types'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { getStoryContent } from '@/lib/storyContentMarkdown'
import Link from 'next/link'
import { useQuery, useMutation } from 'convex/react'
import { api } from '../../convex/_generated/api'
import { useAuth, useUser, useClerk } from '@clerk/nextjs'
import { isAdminEmail } from '@/lib/config'

interface PostDetailProps {
  post: Post
}

export default function PostDetail({ post }: PostDetailProps) {
  const { isSignedIn } = useAuth()
  const { user } = useUser()
  const { signOut } = useClerk()
  const [commentText, setCommentText] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  
  const comments = useQuery(api.comments.getByPost, { 
    postId: (post as any)._id || post.id 
  })
  
  const addComment = useMutation(api.comments.create)
  const deleteComment = useMutation(api.comments.deleteComment)
  
  const isAdmin = isAdminEmail(user?.primaryEmailAddress?.emailAddress)
  
  const storyContent = (post as any).storyAnalysis || getStoryContent((post as any)._id || post.id)
  const factsContent = (post as any).facts
  const storySection = (post as any).story || (post as any).storyAnalysis
  
  const handleSubmitComment = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!isSignedIn || !user || !commentText.trim()) return
    
    setIsSubmitting(true)
    try {
      await addComment({
        postId: (post as any)._id || post.id,
        userId: user.id,
        username: user.username || user.firstName || 'Anonymous',
        content: commentText,
      })
      setCommentText('')
    } catch (error) {
      console.error('Failed to add comment:', error)
    } finally {
      setIsSubmitting(false)
    }
  }
  
  const handleDeleteComment = async (commentId: string) => {
    if (!user) return
    
    try {
      await deleteComment({
        commentId: commentId as any,
        userId: user.id,
        isAdmin,
      })
    } catch (error) {
      console.error('Failed to delete comment:', error)
    }
  }

  return (
    <div className="min-h-screen bg-white text-black font-mono p-8 max-w-2xl mx-auto">
      {/* Minimal Header */}
      <header className="mb-12">
        <div className="mb-6">
          <Link href="/" className="no-underline">
            <h1 className="text-lg font-normal mb-4 hover:underline">PAONIA TRUTH NUGGETS</h1>
          </Link>
          <div className="flex justify-between items-start">
            <Link href="/" className="text-sm underline">← back</Link>
            {isSignedIn && user && (
              <div className="text-sm">
                <span>{user.username || user.firstName || 'User'}</span>
                {' | '}
                <button onClick={() => signOut()} className="underline">
                  logout
                </button>
              </div>
            )}
          </div>
        </div>
        <h1 className="text-lg font-normal">{post.title}</h1>
      </header>

      {/* Article Content */}
      <article className="text-sm leading-relaxed">
        {/* Story Section */}
        {storySection && (
          <section className="mb-12">
            <h2 className="text-base font-bold mb-4">STORY <span className="text-xs font-normal">(AI GENERATED)</span></h2>
            <ReactMarkdown 
              remarkPlugins={[remarkGfm]}
              components={{
                h1: ({children}) => (
                  <h2 className="text-base font-bold mt-8 mb-4">{children}</h2>
                ),
                h2: ({children}) => (
                  <h3 className="text-sm font-bold mt-6 mb-3">{children}</h3>
                ),
                h3: ({children}) => (
                  <h4 className="text-sm font-bold mt-4 mb-2">{children}</h4>
                ),
                p: ({children}) => (
                  <p className="mb-4">{children}</p>
                ),
                ul: ({children}) => (
                  <ul className="list-disc pl-5 mb-4 space-y-1">{children}</ul>
                ),
                ol: ({children}) => (
                  <ol className="list-decimal pl-5 mb-4 space-y-1">{children}</ol>
                ),
                li: ({children}) => (
                  <li>{children}</li>
                ),
                blockquote: ({children}) => (
                  <blockquote className="pl-4 border-l-2 border-black my-4">
                    {children}
                  </blockquote>
                ),
                strong: ({children}) => (
                  <strong className="font-bold">{children}</strong>
                ),
                em: ({children}) => (
                  <em className="italic">{children}</em>
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
              {storySection}
            </ReactMarkdown>
          </section>
        )}
        
        {/* Legacy content fallback - show old storyAnalysis or content if no new sections */}
        {!factsContent && !storySection && storyContent && (
          <ReactMarkdown 
            remarkPlugins={[remarkGfm]}
            components={{
              h1: ({children}) => (
                <h2 className="text-base font-bold mt-8 mb-4">{children}</h2>
              ),
              h2: ({children}) => (
                <h3 className="text-sm font-bold mt-6 mb-3">{children}</h3>
              ),
              h3: ({children}) => (
                <h4 className="text-sm font-bold mt-4 mb-2">{children}</h4>
              ),
              p: ({children}) => (
                <p className="mb-4">{children}</p>
              ),
              ul: ({children}) => (
                <ul className="list-disc pl-5 mb-4 space-y-1">{children}</ul>
              ),
              ol: ({children}) => (
                <ol className="list-decimal pl-5 mb-4 space-y-1">{children}</ol>
              ),
              li: ({children}) => (
                <li>{children}</li>
              ),
              blockquote: ({children}) => (
                <blockquote className="pl-4 border-l-2 border-black my-4">
                  {children}
                </blockquote>
              ),
              strong: ({children}) => (
                <strong className="font-bold">{children}</strong>
              ),
              em: ({children}) => (
                <em className="italic">{children}</em>
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
              code: ({children}) => (
                <code className="font-mono text-xs bg-gray-100 px-1">
                  {children}
                </code>
              ),
            }}
          >
            {storyContent}
          </ReactMarkdown>
        )}
        
        {!factsContent && !storySection && !storyContent && (
          <div>
            <p>{post.content}</p>
          </div>
        )}
        
        {/* Facts Section - at the bottom */}
        {factsContent && (
          <section className="mt-12 pt-8 border-t border-gray-300">
            <h2 className="text-sm font-bold mb-4">FACTS</h2>
            <ReactMarkdown 
              remarkPlugins={[remarkGfm]}
              components={{
                ul: ({children}) => (
                  <ul className="list-disc pl-5 space-y-1">{children}</ul>
                ),
                li: ({children}) => (
                  <li className="text-xs">{children}</li>
                ),
                a: ({href, children}) => (
                  <a 
                    href={href} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="underline text-blue-700 hover:text-blue-900"
                  >
                    {children}
                  </a>
                ),
              }}
            >
              {factsContent}
            </ReactMarkdown>
          </section>
        )}
      </article>
      
      {/* Comments Section */}
      <section className="mt-16 pt-8 border-t border-gray-300">
        <h2 className="text-sm font-bold mb-6">COMMENTS</h2>
        
        {/* Comment Form */}
        {isSignedIn ? (
          <form onSubmit={handleSubmitComment} className="mb-8">
            <textarea
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              placeholder="Add your comment..."
              className="w-full p-3 border border-gray-300 text-sm font-mono resize-none focus:outline-none focus:border-black"
              rows={3}
              disabled={isSubmitting}
            />
            <button
              type="submit"
              disabled={isSubmitting || !commentText.trim()}
              className="mt-2 px-4 py-2 bg-black text-white text-sm hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Posting...' : 'Post Comment'}
            </button>
          </form>
        ) : (
          <p className="text-sm text-gray-600 mb-8">
            <Link href="/sign-in" className="underline">Sign in</Link> to comment
          </p>
        )}
        
        {/* Comments List */}
        {comments === undefined ? (
          <p className="text-sm text-gray-500">Loading comments...</p>
        ) : comments.length === 0 ? (
          <p className="text-sm text-gray-500">No comments yet.</p>
        ) : (
          <ul className="space-y-4">
            {comments.map((comment: any) => (
              <li key={comment._id} className="text-sm">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <span className="font-bold">{comment.username}</span>
                    <span className="text-gray-500 ml-2">
                      {new Date(comment.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  {(user?.id === comment.userId || isAdmin) && (
                    <button
                      onClick={() => handleDeleteComment(comment._id)}
                      className="text-gray-500 hover:text-black text-xs underline"
                    >
                      delete
                    </button>
                  )}
                </div>
                <p className="mt-1 whitespace-pre-wrap">{comment.content}</p>
              </li>
            ))}
          </ul>
        )}
      </section>
      
      {/* Minimal footer */}
      <footer className="mt-16 pt-8 border-t border-gray-200">
        <p className="text-xs text-gray-500">
          {new Date().toLocaleDateString()}
        </p>
      </footer>
    </div>
  )
}