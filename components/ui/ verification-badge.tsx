export function VerifiedBadge(){
  return (
    <span className="group relative inline-flex">
      <span className="bg-[#1DA1F2] text-white rounded-full w-5 h-5 flex items-center justify-center text-[12px]">✓</span>
      <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 whitespace-nowrap">Verified in Kla</span>
    </span>
  )
}