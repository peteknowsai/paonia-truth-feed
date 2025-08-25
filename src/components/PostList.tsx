import PostItem from './PostItem'
import PostSkeleton from './PostSkeleton'
import { Post } from '@/types'

interface PostListProps {
  posts: Post[]
  isLoading?: boolean
}

export default function PostList({ posts, isLoading = false }: PostListProps) {
  if (isLoading) {
    return (
      <ul className="list-none space-y-0">
        {[...Array(5)].map((_, index) => (
          <PostSkeleton key={index} />
        ))}
      </ul>
    )
  }

  return (
    <ul className="list-none space-y-0">
      {posts.map((post: any, index) => (
        <PostItem key={post._id || post.id} post={post} rank={index + 1} />
      ))}
    </ul>
  )
}