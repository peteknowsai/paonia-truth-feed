'use client'

import { useState } from 'react'
import { useMutation } from 'convex/react'
import { api } from '../../convex/_generated/api'
import { useUser } from '@clerk/nextjs'

interface FeedbackFormProps {
  onClose: () => void
}

export default function FeedbackForm({ onClose }: FeedbackFormProps) {
  const { user } = useUser()
  const [type, setType] = useState<'feedback' | 'question' | 'story'>('feedback')
  const [message, setMessage] = useState('')
  const [contactInfo, setContactInfo] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  
  const submitFeedback = useMutation(api.feedback.submit)
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!user || !message.trim()) return
    
    setIsSubmitting(true)
    try {
      await submitFeedback({
        type,
        message,
        contactInfo: contactInfo.trim() || undefined,
        userId: user.id,
        username: user.username || user.firstName || 'Anonymous',
      })
      setSubmitted(true)
      setTimeout(() => {
        onClose()
      }, 2000)
    } catch (error) {
      console.error('Failed to submit feedback:', error)
    } finally {
      setIsSubmitting(false)
    }
  }
  
  if (submitted) {
    return (
      <div className="fixed inset-0 bg-white bg-opacity-90 z-50 flex items-center justify-center font-mono">
        <div className="bg-white border border-black p-8 max-w-md">
          <p className="text-sm">Thank you. Your {type} has been received.</p>
        </div>
      </div>
    )
  }
  
  return (
    <div className="fixed inset-0 bg-white bg-opacity-90 z-50 flex items-center justify-center font-mono">
      <div className="bg-white border border-black p-8 max-w-md w-full mx-4">
        <div className="flex justify-between items-start mb-6">
          <h2 className="text-sm font-bold">SUBMIT FEEDBACK</h2>
          <button
            onClick={onClose}
            className="text-sm hover:underline"
          >
            close
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-xs font-bold block mb-2">TYPE</label>
            <select
              value={type}
              onChange={(e) => setType(e.target.value as typeof type)}
              className="w-full p-2 border border-gray-300 text-sm font-mono focus:outline-none focus:border-black"
            >
              <option value="feedback">Feedback</option>
              <option value="question">Question</option>
              <option value="story">Story Idea</option>
            </select>
          </div>
          
          <div>
            <label className="text-xs font-bold block mb-2">MESSAGE</label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder={
                type === 'feedback' ? 'Share your thoughts...' :
                type === 'question' ? 'What would you like to know?' :
                'Describe the story idea...'
              }
              className="w-full p-2 border border-gray-300 text-sm font-mono resize-none focus:outline-none focus:border-black"
              rows={6}
              required
            />
          </div>
          
          <div>
            <label className="text-xs font-bold block mb-2">
              CONTACT INFO (OPTIONAL)
            </label>
            <input
              type="text"
              value={contactInfo}
              onChange={(e) => setContactInfo(e.target.value)}
              placeholder="Email or phone (if you want a response)"
              className="w-full p-2 border border-gray-300 text-sm font-mono focus:outline-none focus:border-black"
            />
          </div>
          
          <div className="flex gap-4 pt-4">
            <button
              type="submit"
              disabled={isSubmitting || !message.trim()}
              className="px-4 py-2 bg-black text-white text-sm hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Sending...' : 'Send'}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-black text-sm hover:bg-gray-100"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}