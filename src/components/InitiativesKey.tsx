'use client'

import { initiatives, type InitiativeId } from '@/types/initiatives'

interface InitiativesKeyProps {
  activeInitiative?: InitiativeId | null
  onInitiativeClick?: (id: InitiativeId | null) => void
}

export default function InitiativesKey({ activeInitiative, onInitiativeClick }: InitiativesKeyProps) {
  return (
    <aside className="space-y-4">
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
                      href={`/paonia-town${initiative.pdfPath}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[10px] font-medium text-blue-600 hover:text-blue-700 hover:underline"
                      onClick={(e) => e.stopPropagation()}
                    >
                      PDF ↗
                    </a>
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