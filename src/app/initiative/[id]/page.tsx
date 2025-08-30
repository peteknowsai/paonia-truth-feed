'use client'

import { useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { initiatives, type InitiativeId } from '@/types/initiatives'
import { useQuery, useMutation } from 'convex/react'
import { api } from '../../../../convex/_generated/api'
import { useAuth, useUser, useClerk } from '@clerk/nextjs'
import { isAdminEmail } from '@/lib/config'

export default function InitiativePage() {
  const params = useParams()
  const router = useRouter()
  const id = params.id as InitiativeId
  const initiative = initiatives[id]
  const { isSignedIn } = useAuth()
  const { user } = useUser()
  const { signOut } = useClerk()
  const [commentText, setCommentText] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  
  const voters = useQuery(api.initiativeVotes.getVoters, { 
    initiativeId: id 
  })
  
  const userVotes = useQuery(api.initiativeVotes.getUserVotes, {
    userId: user?.id || ''
  })
  
  const voteCounts = useQuery(api.initiativeVotes.getAllCounts)
  const voteOnInitiative = useMutation(api.initiativeVotes.vote)
  
  const comments = useQuery(api.initiativeComments.list, { 
    initiativeId: id 
  })
  
  const addComment = useMutation(api.initiativeComments.create)
  const deleteComment = useMutation(api.initiativeComments.deleteComment)
  
  const isAdmin = isAdminEmail(user?.primaryEmailAddress?.emailAddress)
  
  const handleSubmitComment = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!isSignedIn || !user || !commentText.trim()) return
    
    setIsSubmitting(true)
    try {
      await addComment({
        initiativeId: id,
        userId: user.id,
        username: user.username || user.firstName || 'Anonymous',
        content: commentText,
      })
      setCommentText('')
    } catch (error) {
      console.error('Failed to add comment:', error)
    } finally {
      setIsSubmitting(false)
    }
  }
  
  const handleDeleteComment = async (commentId: string) => {
    if (!user) return
    
    try {
      await deleteComment({
        commentId: commentId as any,
        userId: user.id,
        isAdmin,
      })
    } catch (error) {
      console.error('Failed to delete comment:', error)
    }
  }
  
  const handleInitiativeVote = async (voteType: 'support' | 'oppose') => {
    if (!isSignedIn || !user) {
      router.push('/sign-up')
      return
    }
    
    await voteOnInitiative({
      initiativeId: id,
      userId: user.id,
      username: user.username || user.firstName || 'Anonymous',
      vote: voteType,
    })
  }

  if (!initiative) {
    return (
      <div className="min-h-screen bg-white text-black font-mono p-8 max-w-2xl mx-auto">
        <Link href="/" className="no-underline">
          <h1 className="text-lg font-normal mb-4 hover:underline">PAONIA TRUTH NUGGETS</h1>
        </Link>
        <Link href="/" className="text-sm underline">← back</Link>
        <p className="mt-8 text-sm">Initiative not found.</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white text-black font-mono p-8 max-w-2xl mx-auto">
      {/* Header */}
      <header className="mb-12">
        <div className="mb-6">
          <Link href="/" className="no-underline">
            <h1 className="text-lg font-normal mb-4 hover:underline">PAONIA TRUTH NUGGETS</h1>
          </Link>
          <div className="flex justify-between items-start">
            <Link href="/" className="text-sm underline">← back</Link>
            {isSignedIn && user && (
              <div className="text-sm">
                <span>{user.username || user.firstName || 'User'}</span>
                {' | '}
                <button onClick={() => signOut()} className="underline">
                  logout
                </button>
              </div>
            )}
          </div>
        </div>
        <h1 className="text-lg font-normal">
          {initiative.icon} {initiative.title}
        </h1>
      </header>

      {/* Initiative Content */}
      <article className="text-sm leading-relaxed space-y-6">
        <section>
          <h2 className="font-bold mb-3">WHAT IS THIS?</h2>
          <p>
            {id === 'str' && 
              "An ordinance that protects residents' rights to host guests in their own homes while prohibiting new investor-owned short-term rentals. Residents living in their principal residence can host guests without any fees, licenses, or permits. Non-resident rentals in single-family homes must cease by June 2026."}
            {id === 'email-transparency' && 
              "A mandate requiring the Town to preserve and provide access to Microsoft 365 audit logs that track all email access, modifications, and system changes. These logs already exist and are automatically generated - this initiative simply ensures public access to them under CORA."}
            {id === 'executive-session' && 
              "Requires all executive sessions to be recorded with automatic public release after 90 days unless extended by court order. Ensures transparency in closed-door meetings while protecting legitimate legal discussions when necessary."}
            {id === 'robot-moratorium' && 
              "A two-year ban on autonomous robots operating in public spaces without explicit voter approval. Responds to the June 2025 deployment of surveillance-capable robots that recorded residents without proper notice or consent."}
            {id === 'camera-ban' && 
              "Prohibits the Town from installing or operating surveillance cameras on public property, including parks and buildings. Protects privacy rights and prevents the creation of a surveillance state in our small community."}
            {id === 'trustee-protection' && 
              "Requires unanimous vote of all other trustees to remove an elected board member. Prevents political retaliation and ensures elected officials can represent their constituents without fear of removal by a simple majority."}
          </p>
        </section>

        <section>
          <h2 className="font-bold mb-3">WHY IT MATTERS</h2>
          <p>
            {id === 'str' && 
              "Investor-owned STRs have removed long-term housing from the market, driving up rents and home prices. This initiative protects property rights for actual residents while preventing outside investors from turning our neighborhoods into hotel zones. The April 2025 election showed overwhelming voter rejection of restrictive regulations - this respects that vote while addressing the real problem: investor rentals, not resident hosting."}
            {id === 'email-transparency' && 
              "The Town claims Microsoft 365 audit logs don't exist, but Microsoft says they're automatically generated and retained for 180 days. These logs would prove or disprove claims about email notifications, meeting notices, and public records requests. Without access to these logs, officials can lie about receiving emails with no accountability."}
            {id === 'executive-session' && 
              "The Board held an illegal executive session about citizen initiatives in June 2025, violating Colorado Open Meetings Law. Secret meetings destroy public trust and enable corruption. Recording and releasing these sessions ensures legal compliance and prevents backroom deals that harm residents."}
            {id === 'robot-moratorium' && 
              "In June 2025, the Town deployed $33,500 worth of robots from a company that makes both ADA assessment and security surveillance models - using the same hardware and software. Residents were recorded without consent or proper notice. This moratorium prevents future deployments without explicit voter approval."}
            {id === 'camera-ban' && 
              "The Town spent $50,000 on Verkada surveillance cameras pointed at the playground and Town Hall. Verkada was hacked in 2021, exposing 150,000 cameras worldwide, and paid $2.95 million in FTC fines for security failures. Our children shouldn't be recorded by compromised systems."}
            {id === 'trustee-protection' && 
              "Political majorities shouldn't silence minority voices. When trustees can be removed by simple majority, it creates a chilling effect on dissent and debate. This protection ensures all elected officials can represent their constituents without fear of retaliation."}
          </p>
        </section>

        <section>
          <h2 className="font-bold mb-3">PROPOSED ACTIONS</h2>
          <ul className="list-disc pl-5 space-y-1">
            {id === 'str' && (
              <>
                <li>Protect unlimited resident hosting rights in principal residences</li>
                <li>Eliminate all fees, licenses, and permits for resident hosts</li>
                <li>Prohibit all new non-resident short-term rentals immediately</li>
                <li>Phase out existing single-family investor STRs by June 2026</li>
                <li>Grandfather multi-family and commercial STRs indefinitely</li>
                <li>Require voter approval for any future fees or regulations</li>
              </>
            )}
            {id === 'email-transparency' && (
              <>
                <li>Mandate preservation of all Microsoft 365 audit logs</li>
                <li>Require monthly exports of audit data to permanent storage</li>
                <li>Provide public access to logs under CORA within 3 business days</li>
                <li>Prohibit deletion or modification of audit records</li>
                <li>Establish penalties for non-compliance</li>
                <li>Create public portal for audit log requests</li>
              </>
            )}
            {id === 'executive-session' && (
              <>
                <li>Record all executive sessions with audio and video</li>
                <li>Store recordings securely with tamper-proof timestamps</li>
                <li>Automatically release recordings after 90 days</li>
                <li>Allow court-ordered extensions only for active litigation</li>
                <li>Require detailed agendas before entering executive session</li>
                <li>Post public notice of topics discussed after each session</li>
              </>
            )}
            {id === 'robot-moratorium' && (
              <>
                <li>Ban all autonomous robots in public spaces for 2 years</li>
                <li>Require voter approval for any future robot deployments</li>
                <li>Mandate public hearings before any surveillance technology</li>
                <li>Establish privacy impact assessments for new tech</li>
                <li>Create citizen oversight committee for technology decisions</li>
                <li>Prioritize human workers over automation</li>
              </>
            )}
            {id === 'camera-ban' && (
              <>
                <li>Prohibit all government surveillance cameras on public property</li>
                <li>Remove existing cameras within 30 days of passage</li>
                <li>Ban facial recognition and AI analysis of public spaces</li>
                <li>Prohibit data sharing with state and federal agencies</li>
                <li>Require voter approval for any future surveillance systems</li>
                <li>Establish $1000/day penalties for violations</li>
              </>
            )}
            {id === 'trustee-protection' && (
              <>
                <li>Require unanimous vote of other trustees for removal</li>
                <li>Prohibit removal for political disagreements or voting record</li>
                <li>Allow removal only for criminal conviction or ethics violations</li>
                <li>Guarantee due process with public hearing rights</li>
                <li>Protect trustee access to legal counsel</li>
                <li>Ensure minority voices remain on the Board</li>
              </>
            )}
          </ul>
        </section>

        {/* Full Text Link */}
        <section className="mt-8 pt-8 border-t border-gray-200">
          <h2 className="font-bold mb-3">FULL TEXT</h2>
          <p className="text-sm">
            <a 
              href={`/initiatives/${id}-full-text`}
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-gray-600"
            >
              Read the complete ordinance text →
            </a>
          </p>
        </section>

        {/* Vote Section */}
        <section className="mt-8 pt-8 border-t border-gray-200">
          <h2 className="font-bold mb-4">YOUR POSITION</h2>
          <div className="flex items-center gap-6 text-sm">
            {(() => {
              const userVote = userVotes?.[id]
              const counts = voteCounts?.[id] || { support: 0, oppose: 0 }
              
              return (
                <>
                  <button
                    onClick={() => handleInitiativeVote('support')}
                    className={`${userVote === 'support' ? 'font-bold underline' : ''} hover:underline cursor-pointer`}
                    title={!isSignedIn ? 'Sign up to vote' : 'Support this initiative'}
                  >
                    SUPPORT ({counts.support})
                  </button>
                  <span className="text-gray-500">|</span>
                  <button
                    onClick={() => handleInitiativeVote('oppose')}
                    className={`${userVote === 'oppose' ? 'font-bold underline' : ''} hover:underline cursor-pointer`}
                    title={!isSignedIn ? 'Sign up to vote' : 'Oppose this initiative'}
                  >
                    OPPOSE ({counts.oppose})
                  </button>
                </>
              )
            })()}
          </div>
        </section>

        {/* Voters Section */}
        {voters && (
          <section className="mt-8 pt-8 border-t border-gray-200">
            <h2 className="font-bold mb-4">COMMUNITY SUPPORT</h2>
            
            <div className="space-y-4">
              <div>
                <h3 className="font-bold text-xs mb-2">
                  SUPPORTERS ({voters.supportCount})
                </h3>
                {voters.supporters.length > 0 ? (
                  <p className="text-xs text-gray-700">
                    {voters.supporters.join(', ')}
                  </p>
                ) : (
                  <p className="text-xs text-gray-500">No supporters yet</p>
                )}
              </div>
              
              <div>
                <h3 className="font-bold text-xs mb-2">
                  OPPOSERS ({voters.opposeCount})
                </h3>
                {voters.opposers.length > 0 ? (
                  <p className="text-xs text-gray-700">
                    {voters.opposers.join(', ')}
                  </p>
                ) : (
                  <p className="text-xs text-gray-500">No opposers yet</p>
                )}
              </div>
            </div>
          </section>
        )}
      </article>

      {/* Comments Section */}
      <section className="mt-16 pt-8 border-t border-gray-300">
        <h2 className="text-sm font-bold mb-6">DISCUSSION</h2>
        
        {/* Comment Form */}
        {isSignedIn ? (
          <form onSubmit={handleSubmitComment} className="mb-8">
            <textarea
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              placeholder="Share your thoughts on this initiative..."
              className="w-full p-3 border border-gray-300 text-sm font-mono resize-none focus:outline-none focus:border-black"
              rows={3}
              disabled={isSubmitting}
            />
            <button
              type="submit"
              disabled={isSubmitting || !commentText.trim()}
              className="mt-2 px-4 py-2 bg-black text-white text-sm hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Posting...' : 'Post Comment'}
            </button>
          </form>
        ) : (
          <p className="text-sm text-gray-600 mb-8">
            <Link href="/sign-in" className="underline">Sign in</Link> to join the discussion
          </p>
        )}
        
        {/* Comments List */}
        {comments === undefined ? (
          <p className="text-sm text-gray-500">Loading comments...</p>
        ) : comments.length === 0 ? (
          <p className="text-sm text-gray-500">No comments yet. Be the first to share your thoughts!</p>
        ) : (
          <ul className="space-y-4">
            {comments.map((comment: any) => (
              <li key={comment._id} className="text-sm">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <span className="font-bold">{comment.username}</span>
                    <span className="text-gray-500 ml-2">
                      {new Date(comment.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  {(user?.id === comment.userId || isAdmin) && (
                    <button
                      onClick={() => handleDeleteComment(comment._id)}
                      className="text-gray-500 hover:text-black text-xs underline"
                    >
                      delete
                    </button>
                  )}
                </div>
                <p className="mt-1 whitespace-pre-wrap">{comment.content}</p>
              </li>
            ))}
          </ul>
        )}
      </section>

      {/* Footer */}
      <footer className="mt-16 pt-8 border-t border-gray-200">
        <p className="text-xs text-gray-500">
          Community initiative proposal
        </p>
      </footer>
    </div>
  )
}