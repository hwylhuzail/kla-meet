'use client'
import { useState } from 'react'

export default function ProfilePhotos() {
  const [uploading, setUploading] = useState(false)
  
  const uploadFile = async (file: File) => {
    setUploading(true)
    const form = new FormData()
    form.append('file', file)
    
    // get token from supabase auth
    const supabaseToken = localStorage.getItem('sb-access-token') || '' 
    // or if you use supabase client: const {data} = await supabase.auth.getSession()
    
    const res = await fetch('/api/upload', {
      method: 'POST',
      headers: { Authorization: `Bearer ${supabaseToken}` },
      body: form
    })
    const data = await res.json()
    setUploading(false)
    if(data.url){
      // add to your photos array here
      console.log('uploaded:', data.url)
    } else {
      alert(data.error)
    }
  }

  const onFiles = (files: FileList | null) => {
    if(!files) return
    Array.from(files).forEach(uploadFile)
  }

  return (
    <div>
      {/* HIDDEN INPUTS */}
      <input
        id="gallery-input"
        type="file"
        accept="image/*,image/heic,image/heif"
        multiple
        hidden
        onChange={e => onFiles(e.target.files)}
      />
      <input
        id="camera-input"
        type="file"
        accept="image/*"
        capture="environment"
        hidden
        onChange={e => onFiles(e.target.files)}
      />

      {/* VISIBLE BUTTONS */}
      <div className="flex gap-2 flex-wrap mt-3">
        <button
          type="button"
          onClick={()=>document.getElementById('gallery-input')?.click()}
          className="bg-white border border-black px-4 py-2 rounded-full"
        >
          🖼️ Gallery
        </button>

        <button
          type="button"
          onClick={()=>document.getElementById('camera-input')?.click()}
          className="bg-yellow-400 px-4 py-2 rounded-full font-bold"
        >
          📷 Camera
        </button>

        <button
          type="button"
          onClick={()=>{
            // For APK / Chrome: shows system chooser with both
            document.getElementById('gallery-input')?.click()
          }}
          className="border px-3 py-2 rounded"
        >
          Choose Files
        </button>
      </div>

      {uploading && <p className="mt-2">Uploading...</p>}
    </div>
  )
}