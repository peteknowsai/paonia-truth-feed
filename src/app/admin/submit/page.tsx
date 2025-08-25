'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useMutation } from 'convex/react'
import { api } from '../../../../convex/_generated/api'
import Header from '@/components/Header'
import { initiatives } from '@/types/initiatives'
import { useAuth, useUser } from '@clerk/nextjs'

const AI_PERSONAS = [
  'Democracy Defender',
  'Constitutional Judge',
  'Transparency Guardian',
  'Electoral Analyst',
  'Process Defender',
  'Legal Compliance Bot',
  'Transparency Watchdog',
  'Data Analyst',
  'Citizen Advocate',
  'Democratic Impact Analyzer',
  'Pattern Detector',
  'Financial Forensics Bot',
  'Privacy Advocate',
  'Legal Watchdog'
]

export default function SubmitStory() {
  const router = useRouter()
  const addStory = useMutation(api.addStory.addStory)
  const { isSignedIn, isLoaded } = useAuth()
  const { user } = useUser()
  
  // Check if user is admin
  const isAdmin = user?.primaryEmailAddress?.emailAddress && 
    process.env.NEXT_PUBLIC_ADMIN_EMAILS?.split(',').includes(user.primaryEmailAddress.emailAddress)
  
  useEffect(() => {
    if (isLoaded && (!isSignedIn || !isAdmin)) {
      router.push('/')
    }
  }, [isLoaded, isSignedIn, isAdmin, router])
  
  const [formData, setFormData] = useState({
    title: '',
    content: '', // AI Summary
    storyAnalysis: '', // Full AI Story Analysis
    ai_persona: AI_PERSONAS[0],
    relatedInitiatives: [] as string[],
  })
  
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [message, setMessage] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setMessage('')
    
    try {
      const result = await addStory({
        title: formData.title,
        content: formData.content,
        storyAnalysis: formData.storyAnalysis,
        ai_persona: formData.ai_persona,
        relatedInitiatives: formData.relatedInitiatives.length > 0 ? formData.relatedInitiatives : undefined,
        submittedBy: user?.id,
        submittedByEmail: user?.primaryEmailAddress?.emailAddress,
      })
      
      setMessage('Story submitted successfully!')
      setTimeout(() => {
        router.push('/')
      }, 1500)
    } catch (error) {
      setMessage('Error submitting story: ' + (error as Error).message)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleInitiativeToggle = (initiativeId: string) => {
    setFormData(prev => ({
      ...prev,
      relatedInitiatives: prev.relatedInitiatives.includes(initiativeId)
        ? prev.relatedInitiatives.filter(id => id !== initiativeId)
        : [...prev.relatedInitiatives, initiativeId]
    }))
  }

  // Show loading state while checking auth
  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-gray-600">Loading...</div>
      </div>
    )
  }
  
  // Show nothing while redirecting
  if (!isSignedIn || !isAdmin) {
    return null
  }
  
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-8">Submit New Story</h1>
        
        <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-lg shadow">
          {/* Title */}
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
              Story Title <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="title"
              required
              value={formData.title}
              onChange={(e) => setFormData({...formData, title: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter a compelling headline..."
            />
          </div>

          {/* AI Summary */}
          <div>
            <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-2">
              AI Summary (Brief Overview) <span className="text-red-500">*</span>
            </label>
            <p className="text-xs text-gray-500 mb-2">
              One paragraph synopsis that will appear at the top of the story
            </p>
            <textarea
              id="content"
              required
              rows={3}
              value={formData.content}
              onChange={(e) => setFormData({...formData, content: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="Write a concise summary..."
            />
          </div>

          {/* AI Story Analysis */}
          <div>
            <label htmlFor="storyAnalysis" className="block text-sm font-medium text-gray-700 mb-2">
              AI Story Analysis (Full Story)
            </label>
            <p className="text-xs text-gray-500 mb-2">
              Full story in Markdown format. Use ## for headers, **bold**, *italic*, - for lists, etc.
            </p>
            <textarea
              id="storyAnalysis"
              rows={12}
              value={formData.storyAnalysis}
              onChange={(e) => setFormData({...formData, storyAnalysis: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 font-mono text-sm"
              placeholder="## Story Title&#10;&#10;Write the full story analysis here in markdown...&#10;&#10;### Section Header&#10;&#10;Story content with **bold** and *italic* text..."
            />
          </div>

          {/* AI Persona */}
          <div>
            <label htmlFor="ai_persona" className="block text-sm font-medium text-gray-700 mb-2">
              AI Persona <span className="text-red-500">*</span>
            </label>
            <select
              id="ai_persona"
              required
              value={formData.ai_persona}
              onChange={(e) => setFormData({...formData, ai_persona: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            >
              {AI_PERSONAS.map(persona => (
                <option key={persona} value={persona}>{persona}</option>
              ))}
            </select>
          </div>

          {/* Related Initiatives */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Related Initiatives
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {Object.entries(initiatives).map(([id, initiative]) => (
                <label 
                  key={id} 
                  className="flex items-center space-x-2 cursor-pointer hover:bg-gray-50 p-2 rounded"
                >
                  <input
                    type="checkbox"
                    checked={formData.relatedInitiatives.includes(id)}
                    onChange={() => handleInitiativeToggle(id)}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-sm">
                    <span className="mr-1">{initiative.icon}</span>
                    {initiative.shortTitle}
                  </span>
                </label>
              ))}
            </div>
          </div>


          {/* Message */}
          {message && (
            <div className={`p-3 rounded ${message.includes('Error') ? 'bg-red-50 text-red-700' : 'bg-green-50 text-green-700'}`}>
              {message}
            </div>
          )}

          {/* Submit Button */}
          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={() => router.push('/')}
              className="px-4 py-2 text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Submitting...' : 'Submit Story'}
            </button>
          </div>
        </form>
      </main>
    </div>
  )
}