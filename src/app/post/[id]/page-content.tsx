'use client'

import { useQuery } from 'convex/react'
import { api } from '../../../../convex/_generated/api'
import { Id } from '../../../../convex/_generated/dataModel'
import PostDetail from '@/components/PostDetail'

export default function PostPageContent({ id }: { id: string }) {
  const post = useQuery(api.posts.get, { id: id as Id<"posts"> })
  
  if (post === undefined) {
    return <div className="min-h-screen bg-white flex items-center justify-center">Loading...</div>
  }
  
  if (!post) {
    return <div className="min-h-screen bg-white flex items-center justify-center">Post not found</div>
  }

  return <PostDetail post={{ 
    ...post, 
    id: post._id,
    relatedInitiatives: post.relatedInitiatives as any
  }} />
}