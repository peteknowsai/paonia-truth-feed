'use client'

import { useParams } from 'next/navigation'
import Link from 'next/link'
import { initiativeFullTexts } from '@/lib/initiativeTexts'

export default function InitiativeFullTextPage() {
  const params = useParams()
  const id = params.id as string
  
  // Remove '-full-text' suffix to get the initiative ID
  const initiativeId = id.replace('-full-text', '')
  const fullText = initiativeFullTexts[initiativeId]

  if (!fullText) {
    return (
      <div className="min-h-screen bg-white text-black font-mono p-8 max-w-2xl mx-auto">
        <Link href="/" className="no-underline">
          <h1 className="text-lg font-normal mb-4 hover:underline">PAONIA TRUTH NUGGETS</h1>
        </Link>
        <Link href="/" className="text-sm underline">← back</Link>
        <p className="mt-8 text-sm">Initiative text not found.</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white text-black font-mono p-8 max-w-3xl mx-auto">
      {/* Header */}
      <header className="mb-12">
        <Link href="/" className="no-underline">
          <h1 className="text-lg font-normal mb-4 hover:underline">PAONIA TRUTH NUGGETS</h1>
        </Link>
        <Link href={`/initiative/${initiativeId}`} className="text-sm underline">
          ← back to initiative
        </Link>
      </header>

      {/* Full Text Content */}
      <article className="text-sm leading-relaxed">
        <h1 className="text-xl font-bold mb-8">{fullText.title}</h1>
        
        <div className="space-y-6 whitespace-pre-wrap font-mono text-xs">
          {fullText.content}
        </div>
      </article>

      {/* Footer */}
      <footer className="mt-16 pt-8 border-t border-gray-200">
        <p className="text-xs text-gray-500">
          Official initiative text
        </p>
      </footer>
    </div>
  )
}