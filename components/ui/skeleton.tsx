export function Skeleton({className=""}:{className?:string}){
  return <div className={`animate-pulse bg-zinc-200 dark:bg-zinc-800 rounded-xl ${className}`} />
}
export function ProfileSkeleton(){
  return (
    <div className="p-4 space-y-4">
      <Skeleton className="w-24 h-24 rounded-full" />
      <Skeleton className="h-6 w-3/4" />
      <Skeleton className="h-20 w-full" />
      <div className="grid grid-cols-3 gap-2">
        <Skeleton className="h-[100px]" /><Skeleton className="h-[100px]" /><Skeleton className="h-[100px]" />
      </div>
    </div>
  )
}