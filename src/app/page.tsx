'use client'

import { useState, useEffect } from 'react'
import { useQuery, useMutation } from 'convex/react'
import { api } from '../../convex/_generated/api'
import { useAuth, useUser, useClerk } from '@clerk/nextjs'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { type InitiativeId, initiatives } from '@/types/initiatives'
import FeedbackForm from '@/components/FeedbackForm'

export default function Home() {
  const { isSignedIn } = useAuth()
  const { user } = useUser()
  const { signOut } = useClerk()
  const router = useRouter()
  const [activeInitiative, setActiveInitiative] = useState<InitiativeId | null>(null)
  const [readStories, setReadStories] = useState<Set<string>>(new Set())
  const [showFeedbackForm, setShowFeedbackForm] = useState(false)
  
  // Load read stories from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem('readStories')
    if (stored) {
      setReadStories(new Set(JSON.parse(stored)))
    }
  }, [])
  
  // Mark story as read when clicked
  const handleStoryClick = (postId: string) => {
    const newReadStories = new Set(readStories)
    newReadStories.add(postId)
    setReadStories(newReadStories)
    localStorage.setItem('readStories', JSON.stringify(Array.from(newReadStories)))
  }
  
  const posts = activeInitiative 
    ? useQuery(api.posts.listByInitiative, { initiative: activeInitiative })
    : useQuery(api.posts.list)
  
  const userBombs = useQuery(api.bombs.getUserBombs, { 
    userId: user?.id || '' 
  })
  
  const addBomb = useMutation(api.bombs.addBomb)
  const removeBomb = useMutation(api.bombs.removeBomb)
  
  const userVotes = useQuery(api.initiativeVotes.getUserVotes, {
    userId: user?.id || ''
  })
  const voteCounts = useQuery(api.initiativeVotes.getAllCounts)
  const voteOnInitiative = useMutation(api.initiativeVotes.vote)
  
  const isLoading = posts === undefined
  
  const handleBombClick = async (postId: string) => {
    if (!isSignedIn || !user) {
      router.push('/sign-up')
      return
    }
    
    const hasBombed = userBombs?.includes(postId as any)
    
    if (hasBombed) {
      await removeBomb({ postId: postId as any, userId: user.id })
    } else {
      await addBomb({ postId: postId as any, userId: user.id })
    }
  }
  
  const handleInitiativeVote = async (initiativeId: string, voteType: 'support' | 'oppose') => {
    if (!isSignedIn || !user) {
      router.push('/sign-up')
      return
    }
    
    await voteOnInitiative({
      initiativeId,
      userId: user.id,
      username: user.username || user.firstName || 'Anonymous',
      vote: voteType,
    })
  }

  return (
    <div className="min-h-screen bg-white text-black font-mono p-8 max-w-2xl mx-auto">
      {/* Minimal Header */}
      <header className="mb-12">
        <h1 className="text-xl font-normal mb-4">PAONIA TRUTH NUGGETS</h1>
        <div className="text-sm">
          {isSignedIn && user ? (
            <>
              <span>{user.username || user.firstName || 'User'}</span>
              {' | '}
              <button onClick={() => signOut()} className="underline">
                logout
              </button>
            </>
          ) : (
            <>
              <Link href="/sign-in" className="underline">sign in</Link>
              {' / '}
              <Link href="/sign-up" className="underline">register</Link>
            </>
          )}
        </div>
      </header>

      {/* Posts */}
      <main>
        {activeInitiative && (
          <div className="mb-8 text-sm">
            <p>
              Showing stories about: <strong>{initiatives[activeInitiative].title}</strong>
              {' '}
              <button 
                onClick={() => setActiveInitiative(null)}
                className="underline"
              >
                (show all)
              </button>
            </p>
          </div>
        )}
        
        {isLoading ? (
          <p className="text-sm">Loading...</p>
        ) : (
          <ul className="space-y-2">
            {(posts || []).map((post: any) => {
              const hasBombed = userBombs?.includes(post._id)
              const isRead = readStories.has(post._id)
              return (
                <li key={post._id} className="text-sm flex items-center gap-2">
                  {post.date && (
                    <span className={`text-gray-500 ${!isRead ? 'font-bold' : ''}`}>[{post.date}]</span>
                  )}
                  <Link 
                    href={`/post/${post._id}`}
                    className={`hover:underline flex-1 ${!isRead ? 'font-bold' : ''}`}
                    onClick={() => handleStoryClick(post._id)}
                  >
                    {post.title}
                  </Link>
                  <button
                    onClick={() => handleBombClick(post._id)}
                    className={`text-sm ${hasBombed ? 'opacity-100' : 'opacity-40'} hover:opacity-100 transition-opacity cursor-pointer`}
                    title={!isSignedIn ? 'Sign up to add gems' : hasBombed ? 'Remove gem' : 'Add a gem'}
                  >
                    💎 {post.bombCount || 0}
                  </button>
                </li>
              )
            })}
          </ul>
        )}
        
        {posts && posts.length === 0 && (
          <p className="text-sm text-gray-500">No posts yet.</p>
        )}
        
        {/* Initiatives Section */}
        <section className="mt-16 pt-8 border-t border-gray-300">
          <h2 className="text-sm font-bold mb-6">PROPOSED INITIATIVES</h2>
          <p className="text-sm mb-6 text-gray-600">
            Community-driven proposals for Paonia's future
          </p>
          <ul className="space-y-3">
            {Object.entries(initiatives).map(([id, initiative]) => {
              const userVote = userVotes?.[id]
              const counts = voteCounts?.[id] || { support: 0, oppose: 0 }
              
              return (
                <li key={id} className="text-sm">
                  <div className="flex items-start">
                    <span className="mr-2">{initiative.icon}</span>
                    <div className="flex-1">
                      <span className="font-bold">{initiative.title}</span>
                      {' '}
                      <Link 
                        href={`/initiative/${id}`}
                        className="underline text-gray-600"
                      >
                        [learn more]
                      </Link>
                      <div className="mt-1 flex items-center gap-3 text-xs">
                        <button
                          onClick={() => handleInitiativeVote(id, 'support')}
                          className={`${userVote === 'support' ? 'opacity-100 underline' : 'opacity-40'} hover:opacity-100 hover:underline transition-opacity cursor-pointer`}
                          title={!isSignedIn ? 'Sign up to vote' : 'Support this initiative'}
                        >
                          support ({counts.support})
                        </button>
                        <span className="text-gray-500">|</span>
                        <button
                          onClick={() => handleInitiativeVote(id, 'oppose')}
                          className={`${userVote === 'oppose' ? 'opacity-100 underline' : 'opacity-40'} hover:opacity-100 hover:underline transition-opacity cursor-pointer`}
                          title={!isSignedIn ? 'Sign up to vote' : 'Oppose this initiative'}
                        >
                          oppose ({counts.oppose})
                        </button>
                      </div>
                    </div>
                  </div>
                </li>
              )
            })}
          </ul>
        </section>
        
        {/* Call to Action */}
        <section className="mt-16 pt-8 border-t border-gray-300">
          <h2 className="text-sm font-bold mb-4">TAKE ACTION</h2>
          <p className="text-sm mb-4">
            Join me on <strong>September 3rd at 10am</strong> at Poulus Park when I submit these initiatives to the Town Clerk.
          </p>
          <p className="text-sm mb-4">
            Your presence matters. Show the Town that citizens care about their right to petition and vote. 
            Let's walk together to Town Hall and demonstrate that democracy is alive in Paonia.
          </p>
          <p className="text-sm mb-4">
            This is about showing support through your presence. The more people who attend, 
            the stronger our message that these issues deserve to be on the ballot.
          </p>
          <p className="text-sm mb-4">
            <strong>What:</strong> Community support for initiative submission<br />
            <strong>When:</strong> September 3rd, 10:00 AM<br />
            <strong>Where:</strong> Meet at Poulus Park, walk to Town Hall<br />
            <strong>Who:</strong> All community members welcome
          </p>
          <p className="text-sm text-center mt-6">
            <a 
              href="https://calendar.app.google/JfEjg284wKuGxzDd6" 
              target="_blank" 
              rel="noopener noreferrer"
              className="underline font-bold"
            >
              Add to your calendar
            </a>
          </p>
          <p className="text-sm mt-4 text-center">
            {isSignedIn ? (
              <button
                onClick={() => setShowFeedbackForm(true)}
                className="underline hover:text-gray-600"
              >
                Questions or Feedback?
              </button>
            ) : (
              <span className="text-gray-600">
                <Link href="/sign-in" className="underline">Sign in</Link> to submit feedback
              </span>
            )}
          </p>
        </section>
      </main>
      
      {/* Feedback Form Modal */}
      {showFeedbackForm && isSignedIn && (
        <FeedbackForm onClose={() => setShowFeedbackForm(false)} />
      )}
    </div>
  )
}