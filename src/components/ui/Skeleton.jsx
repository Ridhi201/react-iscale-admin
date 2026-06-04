export default function Skeleton({ className = '' }) {
  return (
    <div className={`shimmer-wrapper ${className}`}></div>
  )
}

export function DashboardSkeleton() {
  return (
    <div className="space-y-6 w-full">
      {/* Title */}
      <Skeleton className="h-20 w-full rounded-xl" />
      
      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
        {[1, 2, 3, 4].map(i => <Skeleton key={i} className="h-32 rounded-2xl" />)}
      </div>

      {/* Chart & Side Stats */}
      <div className="grid grid-cols-1 xl:grid-cols-4 gap-5">
        <div className="xl:col-span-3">
          <Skeleton className="h-[400px] rounded-2xl" />
        </div>
        <div className="flex flex-col gap-6">
          {[1, 2, 3].map(i => <Skeleton key={i} className="h-32 rounded-2xl" />)}
        </div>
      </div>
    </div>
  )
}
