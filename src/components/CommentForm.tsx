'use client'

import { useState } from 'react'
import { useMutation } from 'convex/react'
import { api } from '../../convex/_generated/api'
import { Id } from '../../convex/_generated/dataModel'
import { useAuth, useUser } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'

interface CommentFormProps {
  postId: Id<"posts">
}

export default function CommentForm({ postId }: CommentFormProps) {
  const [content, setContent] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { isSignedIn } = useAuth()
  const { user } = useUser()
  const router = useRouter()
  const createComment = useMutation(api.comments.create)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!isSignedIn) {
      router.push('/sign-in')
      return
    }

    if (!content.trim() || !user) return

    setIsSubmitting(true)
    try {
      await createComment({
        postId,
        userId: user.id,
        username: user.fullName || user.primaryEmailAddress?.emailAddress || 'Anonymous',
        content: content.trim()
      })
      setContent('')
    } catch (error) {
      console.error('Failed to create comment:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mb-6">
      <div className="flex flex-col gap-3">
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder={isSignedIn ? "Share your thoughts..." : "Sign in to comment"}
          disabled={!isSignedIn || isSubmitting}
          className="w-full px-3 py-2 border border-gray-300 rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-50 disabled:text-gray-500"
          rows={3}
        />
        <div className="flex justify-end">
          {isSignedIn ? (
            <button
              type="submit"
              disabled={!content.trim() || isSubmitting}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
            >
              {isSubmitting ? 'Posting...' : 'Post Comment'}
            </button>
          ) : (
            <button
              type="button"
              onClick={() => router.push('/sign-in')}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              Sign in to comment
            </button>
          )}
        </div>
      </div>
    </form>
  )
}