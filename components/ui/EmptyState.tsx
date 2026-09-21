export function EmptyState({icon="✨", title, desc}:{icon?:string,title:string,desc:string}){
  return <div className="text-center py-16 px-8 animate-fadeIn"><div className="text-5xl mb-4">{icon}</div><h3 className="text-lg font-semibold mb-2">{title}</h3><p className="text-sm text-gray-500 max-w-sm mx-auto">{desc}</p></div>
}
