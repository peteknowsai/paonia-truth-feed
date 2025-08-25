import { mockPosts } from '@/lib/mockData'
import PostDetail from '@/components/PostDetail'
import { notFound } from 'next/navigation'
import { use } from 'react'

export default function PostPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params)
  const post = mockPosts.find(p => p.id === resolvedParams.id)
  
  if (!post) {
    notFound()
  }

  return <PostDetail post={post} />
}

export async function generateStaticParams() {
  return mockPosts.map((post) => ({
    id: post.id,
  }))
}