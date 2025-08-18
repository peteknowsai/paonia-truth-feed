import PostItem from './PostItem'
import { Post } from '@/types'

interface PostListProps {
  posts: Post[]
}

export default function PostList({ posts }: PostListProps) {
  return (
    <div className="divide-y divide-gray-100">
      {posts.map((post, index) => (
        <PostItem key={post.id} post={post} rank={index + 1} />
      ))}
    </div>
  )
}