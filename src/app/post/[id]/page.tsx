import { mockPosts } from '@/lib/mockData'
import PostDetail from '@/components/PostDetail'
import { notFound } from 'next/navigation'

export default function PostPage({ params }: { params: { id: string } }) {
  const post = mockPosts.find(p => p.id === params.id)
  
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