import Header from '@/components/Header'
import PostList from '@/components/PostList'
import { mockPosts } from '@/lib/mockData'

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="bg-white rounded-lg shadow-sm">
            <div className="px-4 py-3 border-b border-gray-200">
              <h1 className="text-base font-semibold text-gray-900">
                AI-Generated Government Analysis
              </h1>
              <p className="mt-0.5 text-xs text-gray-600">
                Neutral analysis of Paonia government documents and actions
              </p>
            </div>
            <PostList posts={mockPosts} />
          </div>
        </div>
      </main>
    </div>
  )
}