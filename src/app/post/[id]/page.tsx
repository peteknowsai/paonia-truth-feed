'use client'

import { use } from 'react'
import { useQuery } from 'convex/react'
import { api } from '../../../../convex/_generated/api'
import { Id } from '../../../../convex/_generated/dataModel'
import PostDetail from '@/components/PostDetail'
import { notFound } from 'next/navigation'

export default function PostPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params)
  const post = useQuery(api.posts.get, { id: resolvedParams.id as Id<"posts"> })
  
  if (post === undefined) {
    return <div className="min-h-screen bg-white flex items-center justify-center">Loading...</div>
  }
  
  if (!post) {
    notFound()
  }

  return <PostDetail post={post} />
}