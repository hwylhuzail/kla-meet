export function EmptyState({title,desc}:{title:string,desc:string}){
  return <div className="text-center p-10 bg-zinc-50 dark:bg-zinc-900 rounded-2xl"><p className="font-bold dark:text-white">{title}</p><p className="text-zinc-500 text-sm mt-1">{desc}</p></div>
}