'use client'

import { initiatives, type InitiativeId } from '@/types/initiatives'

interface InitiativesKeyProps {
  activeInitiative?: InitiativeId | null
  onInitiativeClick?: (id: InitiativeId | null) => void
}

export default function InitiativesKey({ activeInitiative, onInitiativeClick }: InitiativesKeyProps) {
  return (
    <aside className="space-y-4">
      {/* Community Support Announcement */}
      <div className="bg-yellow-100 rounded-lg border-2 border-yellow-300 shadow-md transform rotate-1 hover:rotate-0 transition-transform">
        <div className="p-6 space-y-3">
          <div className="flex-1">
            <h3 className="font-bold text-gray-900 text-sm mb-2">
              Community Support Needed - September 3rd, 10am
            </h3>
            <p className="text-xs text-gray-700 leading-relaxed mb-3">
              I will be submitting these initiatives to the Town Clerk on <strong>September 3rd at 10am</strong>. 
              I need the community's presence. I'm not doing this alone—there are many who support either 
              these initiatives or my fundamental right to have them on the ballot. Your presence matters.
            </p>
            <p className="text-xs text-gray-700 font-semibold mb-3">
              Stand with me for democracy on September 3rd. Show the Town that citizens care about their 
              right to petition and vote.
            </p>
            <a
              href="https://calendar.app.google/JfEjg284wKuGxzDd6"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-yellow-200 hover:bg-yellow-300 text-gray-900 border-2 border-yellow-400 rounded-md text-sm font-semibold transition-colors shadow-sm"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
              </svg>
              Add to Calendar
            </a>
            <p className="text-xs text-gray-600 mt-3 font-medium">
              ~ Pete McCarthy
            </p>
          </div>
        </div>
      </div>

      {/* Header Card */}
      <div className="bg-blue-50/30 backdrop-blur-sm rounded-lg border border-blue-100/50 overflow-hidden">
        <div className="px-3 py-2 border-b border-blue-100/30 bg-blue-50/20">
          <h2 className="text-xs font-bold text-gray-700 uppercase tracking-wider">
            Citizen Initiatives
          </h2>
        </div>
        
        {/* Initiative Cards */}
        <div className="divide-y divide-blue-100/20">
          {Object.values(initiatives).map((initiative) => (
            <div
              key={initiative.id}
              className={`
                group relative transition-all duration-150 cursor-pointer
                ${activeInitiative === initiative.id 
                  ? `bg-orange-50/70 border-l-3 border-l-orange-500` 
                  : 'hover:bg-white/40 border-l-3 border-l-transparent'
                }
              `}
              onClick={() => onInitiativeClick?.(activeInitiative === initiative.id ? null : initiative.id)}
            >
              <div className="px-3 py-2">
                {/* Content */}
                <div className="flex-1">
                  <h3 className={`
                    font-medium text-xs leading-tight mb-0.5 flex items-center gap-1
                    ${activeInitiative === initiative.id ? 'text-orange-900' : 'text-gray-900'}
                  `}>
                    <span className="text-sm">{initiative.icon}</span>
                    {initiative.shortTitle}
                  </h3>
                    
                  {/* Description */}
                  <p className="text-[11px] text-gray-600 leading-tight mb-1.5 ml-5">
                    {initiative.description}
                  </p>
                  
                  {/* Links */}
                  <div className="flex items-center gap-2.5 ml-5">
                    <a
                      href={`/initiative/${initiative.id}`}
                      className="text-[10px] font-medium text-blue-600 hover:text-blue-700 hover:underline"
                      onClick={(e) => e.stopPropagation()}
                    >
                      Explainer
                    </a>
                    <span className="text-[10px] text-gray-400">•</span>
                    <a
                      href={`/paonia-town${initiative.mdPath}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[10px] font-medium text-blue-600 hover:text-blue-700 hover:underline"
                      onClick={(e) => e.stopPropagation()}
                    >
                      Full Text ↗
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Clear Filter */}
        {activeInitiative && (
          <div className="px-3 py-1.5 border-t border-blue-100/20 bg-blue-50/10">
            <button
              onClick={() => onInitiativeClick?.(null)}
              className="w-full text-[10px] font-medium text-gray-600 hover:text-gray-900 transition-colors"
            >
              ✕ Clear Filter
            </button>
          </div>
        )}
        
        {/* Footer */}
        <div className="px-3 py-1.5 border-t border-blue-100/20 bg-blue-50/10">
          <p className="text-[10px] text-gray-500">
            Filed September 3, 2025
          </p>
        </div>
      </div>
    </aside>
  )
}