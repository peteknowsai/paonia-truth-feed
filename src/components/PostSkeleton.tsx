export default function PostSkeleton() {
  return (
    <li className="grid grid-cols-[56px_1fr] gap-4 py-5 border-b border-gray-200 last:border-0 animate-pulse">
      {/* Vote Column Skeleton */}
      <div className="grid grid-rows-[44px_auto_44px] place-items-center gap-1.5 pt-1">
        <div className="h-11 w-11 rounded-lg bg-gray-200"></div>
        <div className="h-5 w-8 bg-gray-200 rounded"></div>
        <div className="h-11 w-11 rounded-lg bg-gray-200"></div>
      </div>
      
      {/* Content Column Skeleton */}
      <div className="min-w-0 max-w-[76ch] pt-1">
        {/* Title Skeleton */}
        <div className="h-7 bg-gray-200 rounded w-3/4 mb-3"></div>
        
        {/* Metadata Skeleton */}
        <div className="flex items-center gap-3 mb-3">
          <div className="h-4 w-24 bg-gray-200 rounded"></div>
          <div className="h-4 w-16 bg-gray-200 rounded"></div>
          <div className="h-4 w-20 bg-gray-200 rounded"></div>
        </div>
        
        {/* Initiative Badges Skeleton */}
        <div className="flex gap-2">
          <div className="h-7 w-28 bg-gray-200 rounded-full"></div>
          <div className="h-7 w-32 bg-gray-200 rounded-full"></div>
        </div>
      </div>
    </li>
  )
}