'use client'

import { Post } from '@/types'
import { useVoting } from '@/contexts/VotingContext'
import Header from './Header'
import { getStoryContent } from '@/lib/storyContent'

interface PostDetailProps {
  post: Post
}

export default function PostDetail({ post }: PostDetailProps) {
  const { votes, getVoteCount, vote } = useVoting()
  const userVote = votes[post.id]
  const voteCount = getVoteCount(post.id, post.points, 0)
  const storyContent = getStoryContent(post.id)
  
  const handleUpvote = () => {
    vote(post.id, 'up')
  }
  
  const handleDownvote = () => {
    vote(post.id, 'down')
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
            
            {/* Title and Meta */}
            <div className="flex-1">
              <h1 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 leading-tight">
                {post.title}
              </h1>
              
              <div className="flex flex-wrap items-center gap-2 text-xs text-gray-600">
                <span className="font-semibold text-[#ff6600]">{post.ai_persona}</span>
                <span>•</span>
                <span>{post.time_ago}</span>
                <span>•</span>
                <span>{post.comments} comments</span>
                {post.sourceUrl && (
                  <>
                    <span>•</span>
                    <a 
                      href={post.sourceUrl} 
                      className="text-blue-600 hover:underline font-medium"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      View Source
                    </a>
                  </>
                )}
              </div>
              
              {post.tags && post.tags.length > 0 && (
                <div className="flex flex-wrap gap-1.5 mt-3">
                  {post.tags.map(tag => (
                    <span 
                      key={tag} 
                      className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* AI Summary Box */}
          <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded-r mb-6">
            <h3 className="text-sm font-semibold text-blue-900 mb-2">AI Analysis Summary</h3>
            <p className="text-sm text-gray-700 leading-relaxed">{post.content}</p>
          </div>
        </div>

        {/* Story Content */}
        <article className="prose prose-sm max-w-none">
          <div 
            className="text-gray-800 leading-relaxed"
            dangerouslySetInnerHTML={{ __html: storyContent }} 
          />
        </article>

        {/* Source Documents Section */}
        <div className="mt-10 p-4 bg-gray-50 rounded-lg border border-gray-200">
          <h3 className="text-sm font-semibold text-gray-900 mb-2">📄 Source Documents</h3>
          <ul className="space-y-1 text-sm text-gray-700">
            <li className="flex items-start">
              <span className="text-gray-400 mr-2">•</span>
              <span>{post.sourceDocument}</span>
            </li>
            {post.sourceUrl && (
              <li className="flex items-start">
                <span className="text-gray-400 mr-2">•</span>
                <a 
                  href={post.sourceUrl} 
                  className="text-blue-600 hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View Original Document →
                </a>
              </li>
            )}
          </ul>
        </div>

        {/* Comments Section */}
        <div className="mt-8 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
          <h3 className="text-sm font-semibold text-gray-900 mb-2">💬 Community Discussion</h3>
          <p className="text-sm text-gray-600 mb-2">{post.comments} comments on this story</p>
          <p className="text-xs text-gray-500 italic">
            Comment system coming soon. Citizens will be able to add context, corrections, and local knowledge to AI-generated stories.
          </p>
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