'use client'

import { useState } from 'react'
import { useMutation } from 'convex/react'
import { api } from '../../convex/_generated/api'
import { Id } from '../../convex/_generated/dataModel'

interface PostEditModalProps {
  postId: Id<"posts">
  currentTitle: string
  currentContent: string
  currentAnalysis: string
  onClose: () => void
  onUpdate: () => void
}

export default function PostEditModal({
  postId,
  currentTitle,
  currentContent,
  currentAnalysis,
  onClose,
  onUpdate
}: PostEditModalProps) {
  const [title, setTitle] = useState(currentTitle)
  const [content, setContent] = useState(currentContent)
  const [storyAnalysis, setStoryAnalysis] = useState(currentAnalysis)
  const [isSubmitting, setIsSubmitting] = useState(false)
  
  const updatePost = useMutation(api.updatePost.updatePost)
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    try {
      await updatePost({
        postId,
        title,
        content,
        storyAnalysis
      })
      onUpdate()
      onClose()
    } catch (error) {
      console.error('Failed to update post:', error)
      alert('Failed to update post')
    } finally {
      setIsSubmitting(false)
    }
  }
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-gray-800 rounded-lg p-6 max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <h2 className="text-2xl font-bold text-gray-100 mb-4">Edit Post</h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3 py-2 bg-gray-700 text-gray-100 rounded-lg border border-gray-600 focus:border-blue-500 focus:outline-none"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              AI Summary (Brief description)
            </label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={4}
              className="w-full px-3 py-2 bg-gray-700 text-gray-100 rounded-lg border border-gray-600 focus:border-blue-500 focus:outline-none"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Full AI Analysis (Markdown supported)
            </label>
            <textarea
              value={storyAnalysis}
              onChange={(e) => setStoryAnalysis(e.target.value)}
              rows={12}
              className="w-full px-3 py-2 bg-gray-700 text-gray-100 rounded-lg border border-gray-600 focus:border-blue-500 focus:outline-none font-mono text-sm"
              placeholder="## Headline&#10;&#10;Full analysis in markdown..."
            />
          </div>
          
          <div className="flex gap-3 pt-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors disabled:opacity-50"
            >
              {isSubmitting ? 'Saving...' : 'Save Changes'}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 bg-gray-600 text-white rounded-lg font-medium hover:bg-gray-700 transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}