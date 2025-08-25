'use client'

import { useQuery, useMutation } from 'convex/react'
import { api } from '../../convex/_generated/api'
import { Id } from '../../convex/_generated/dataModel'
import { useUser } from '@clerk/nextjs'
import { formatDistanceToNow } from '@/lib/utils'

interface CommentListProps {
  postId: Id<"posts">
}

export default function CommentList({ postId }: CommentListProps) {
  const comments = useQuery(api.comments.getByPost, { postId })
  const deleteComment = useMutation(api.comments.deleteComment)
  const { user } = useUser()
  
  const isAdmin = user?.primaryEmailAddress?.emailAddress && 
    process.env.NEXT_PUBLIC_ADMIN_EMAILS?.split(',').includes(user.primaryEmailAddress.emailAddress)

  const handleDelete = async (commentId: Id<"comments">) => {
    if (!user) return
    
    if (confirm('Are you sure you want to delete this comment?')) {
      try {
        await deleteComment({
          commentId,
          userId: user.id,
          isAdmin: isAdmin || false
        })
      } catch (error) {
        console.error('Failed to delete comment:', error)
      }
    }
  }

  if (!comments) {
    return <div className="text-gray-500 text-sm">Loading comments...</div>
  }

  if (comments.length === 0) {
    return (
      <div className="text-gray-500 text-sm text-center py-8">
        No comments yet. Be the first to share your thoughts!
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {comments.map((comment) => {
        const isOwner = user?.id === comment.userId
        const canDelete = isOwner || isAdmin
        const timeAgo = formatDistanceToNow(new Date(comment.createdAt))

        return (
          <div key={comment._id} className="bg-white rounded-lg border border-gray-200 p-4">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <span className="font-medium text-sm text-gray-900">
                    {comment.username}
                  </span>
                  <span className="text-xs text-gray-500">
                    {timeAgo}
                  </span>
                  {isOwner && (
                    <span className="text-xs bg-blue-100 text-blue-700 px-1.5 py-0.5 rounded">
                      You
                    </span>
                  )}
                </div>
                <p className="text-gray-700 text-sm whitespace-pre-wrap">
                  {comment.content}
                </p>
              </div>
              {canDelete && (
                <button
                  onClick={() => handleDelete(comment._id)}
                  className="ml-4 text-xs text-red-600 hover:text-red-700 hover:bg-red-50 px-2 py-1 rounded transition-colors"
                  title="Delete comment"
                >
                  Delete
                </button>
              )}
            </div>
          </div>
        )
      })}
    </div>
  )
}