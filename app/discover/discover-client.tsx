'use client'
import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'

export default function DiscoverClient({ initialProfiles }: any) {
  const supabase = createClient()
  const [profiles, setProfiles] = useState(initialProfiles || [])

  return (
    <div className="max-w-md mx-auto">
      <div className="p-4 border-b flex justify-between">
        <h1 className="font-bold">Discover</h1>
        <a href="/settings" className="text-sm border px-3 py-1 rounded-full">Settings</a>
      </div>

      {profiles.length === 0 ? (
        <div className="text-center p-10">
          <div className="text-4xl mb-4">💫</div>
          <h2 className="font-bold">Adjust your filters</h2>
          <p className="text-sm text-gray-500 mt-2">You've seen everyone nearby. Try worldwide in settings.</p>
          <a href="/premium" className="inline-block bg-black text-white rounded-full px-6 py-3 mt-4 text-sm">Get Premium for Worldwide</a>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-3 p-3">
          {profiles.map((p:any) => (
            <div key={p.id} className="rounded-xl overflow-hidden border bg-white">
              {/* SINGLE PHOTO ONLY - NO GALLERY ON TAP */}
              <div className="w-full h-96 bg-gray-100 overflow-hidden">
                <img 
                  src={p.avatar_url || p.photo_url || 'https://via.placeholder.com/400x600?text=KLA'} 
                  alt={p.full_name}
                  className="w-full h-full object-cover"
                  onError={(e:any)=>e.target.src='https://via.placeholder.com/400x600?text=KLA'}
                />
              </div>
              <div className="p-3">
                <p className="font-bold">{p.full_name || 'User'} {p.age? `, ${p.age}` : ''}</p>
                <p className="text-xs text-gray-500">{p.current_location || 'Katabi, UG'}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
