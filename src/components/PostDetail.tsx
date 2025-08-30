'use client'

import { Post } from '@/types'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { getStoryContent } from '@/lib/storyContentMarkdown'
import Link from 'next/link'

interface PostDetailProps {
  post: Post
}

export default function PostDetail({ post }: PostDetailProps) {
  const storyContent = (post as any).storyAnalysis || getStoryContent((post as any)._id || post.id)

  return (
    <div className="min-h-screen bg-white text-black font-mono p-8 max-w-2xl mx-auto">
      {/* Minimal Header */}
      <header className="mb-12">
        <Link href="/" className="text-sm underline">← back</Link>
        <h1 className="mt-6 text-lg font-normal">{post.title}</h1>
      </header>

      {/* Article Content */}
      <article className="text-sm leading-relaxed">
        {storyContent ? (
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
        ) : (
          <div>
            <p>{post.content}</p>
          </div>
        )}
      </article>
      
      {/* Minimal footer */}
      <footer className="mt-16 pt-8 border-t border-gray-200">
        <p className="text-xs text-gray-500">
          {new Date().toLocaleDateString()}
        </p>
      </footer>
    </div>
  )
}