'use client'
import { useRef, useState } from 'react'

export default function PhotoGallery({photos=[], onUpdate}:{photos:string[], onUpdate:(p:string[])=>void}){
  const fileRef = useRef<HTMLInputElement>(null)
  const [uploading,setUploading]=useState(false)

  const handleFiles = (e:any)=>{
    const files = Array.from(e.target.files) as File[]
    if(photos.length + files.length > 6){
      alert('Max 6 photos')
      return
    }
    setUploading(true)
    const newUrls:string[] = []
    files.forEach(f=>{
      newUrls.push(URL.createObjectURL(f))
    })
    // For now preview - you will connect Supabase later
    onUpdate([...photos,...newUrls].slice(0,6))
    setUploading(false)
  }

  const setMain = (idx:number)=>{
    const reordered=[photos[idx],...photos.filter((_,i)=>i!==idx)]
    onUpdate(reordered)
  }

  const remove = (idx:number)=>{
    if(!confirm('Delete this photo?')) return
    onUpdate(photos.filter((_,i)=>i!==idx))
  }

  return (
    <div className="w-full">
      <p className="text-xs text-zinc-500 mb-2">Tap + to add - Main photo has yellow border #FFC629 - Up to 6</p>
      <div className="grid grid-cols-3 gap-2">
        {photos.map((url,i)=>(
          <div key={i} className={`relative rounded-xl overflow-hidden h-[120px] ${i===0?'border-[3px] border-[#FFC629]':'border border-zinc-200 dark:border-zinc-800'}`}>
            <img src={url} className="w-full h-full object-cover" />
            <button onClick={()=>setMain(i)} className="absolute top-1 left-1 bg-black/60 text-white text-[9px] px-1.5 py-0.5 rounded-full">★ MAIN</button>
            <button onClick={()=>remove(i)} className="absolute top-1 right-1 bg-red-500 text-white w-5 h-5 rounded-full text-xs flex items-center justify-center">×</button>
          </div>
        ))}
        {Array.from({length:6-photos.length}).map((_,i)=>(
          <button key={i} onClick={()=>fileRef.current?.click()} className="border-2 border-dashed border-zinc-300 dark:border-zinc-700 rounded-xl h-[120px] flex flex-col items-center justify-center">
            <span className="text-2xl">+</span>
            <span className="text-[10px]">Add</span>
          </button>
        ))}
      </div>
      <input ref={fileRef} type="file" accept="image/*" multiple className="hidden" onChange={handleFiles} />
      <div className="flex gap-2 mt-3">
        <button onClick={()=>fileRef.current?.click()} className="flex-1 border border-zinc-300 dark:border-zinc-700 py-2.5 rounded-full text-sm font-medium">From Gallery</button>
        <label className="flex-1 bg-black dark:bg-white text-white dark:text-black text-center py-2.5 rounded-full text-sm font-bold">
          Take Photo
          <input type="file" accept="image/*" capture="user" className="hidden" onChange={handleFiles} />
        </label>
      </div>
      {uploading && <p className="text-xs mt-2 text-[#FFC629]">Uploading...</p>}
    </div>
  )
}