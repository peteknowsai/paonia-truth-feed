import { notFound } from 'next/navigation'
import { initiatives, type InitiativeId } from '@/types/initiatives'
import { getInitiativeExplanation } from '@/lib/initiativeExplanations'
import Header from '@/components/Header'
import Link from 'next/link'

export default async function InitiativeExplainerPage({ 
  params 
}: { 
  params: Promise<{ id: string }> 
}) {
  const resolvedParams = await params
  const id = resolvedParams.id as InitiativeId
  
  const initiative = initiatives[id]
  if (!initiative) {
    notFound()
  }
  
  const explanation = getInitiativeExplanation(id)
  if (!explanation) {
    notFound()
  }
  
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Link */}
        <Link 
          href="/"
          className="inline-flex items-center text-sm text-blue-600 hover:text-blue-700 mb-6"
        >
          ← Back to Truth Feed
        </Link>
        
        {/* Initiative Header */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex items-start gap-3 mb-4">
            <span className="text-3xl">{initiative.icon}</span>
            <div className="flex-1">
              <h1 className="text-2xl font-bold text-gray-900 mb-2">
                {initiative.title}
              </h1>
              <p className="text-gray-600">
                {initiative.description}
              </p>
            </div>
          </div>
          
          <div className="flex gap-4 mt-4">
            <a
              href={`/paonia-town${initiative.mdPath}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium text-blue-600 hover:text-blue-700 hover:underline"
            >
              Read Full Legal Text ↗
            </a>
          </div>
        </div>
        
        {/* What This Initiative Does */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <span>📋</span>
            What This Initiative Does
          </h2>
          <div className="space-y-3">
            {explanation.whatItDoes.map((paragraph, index) => (
              <p key={index} className="text-gray-700 leading-relaxed">
                {paragraph}
              </p>
            ))}
          </div>
        </div>
        
        {/* Why Paonia Needs This */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <span>🎯</span>
            Why Paonia Needs This
          </h2>
          <div className="space-y-4">
            {explanation.whyNeeded.map((reason, index) => (
              <div key={index} className="border-l-4 border-blue-400 pl-4">
                <h3 className="font-semibold text-gray-900 mb-2">
                  {reason.title}
                </h3>
                <p className="text-gray-700 leading-relaxed text-sm">
                  {reason.description}
                </p>
              </div>
            ))}
          </div>
        </div>
        
        {/* Call to Action */}
        <div className="bg-yellow-100 rounded-lg border-2 border-yellow-300 p-6">
          <h3 className="font-bold text-gray-900 text-lg mb-3">
            Support Democracy in Paonia
          </h3>
          <p className="text-gray-700 mb-4">
            Join me on <strong>September 3rd at 10am</strong> when I submit these initiatives to the Town Clerk. 
            Your presence shows the Town that citizens care about their right to petition and vote.
          </p>
          <a
            href="https://calendar.app.google/JfEjg284wKuGxzDd6"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-yellow-200 hover:bg-yellow-300 text-gray-900 border-2 border-yellow-400 rounded-md text-sm font-semibold transition-colors"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
            </svg>
            Add to Calendar
          </a>
          <p className="text-sm text-gray-600 mt-4 font-medium">
            ~ Pete McCarthy
          </p>
        </div>
      </main>
    </div>
  )
}