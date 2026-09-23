'use client'
import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'

export default function DiscoverClient({ initialProfiles }: any) {
  const supabase = createClient()
  const [profiles, setProfiles] = useState(initialProfiles || [])
  const [filter, setFilter] = useState({ advanced: false, worldwide: false })

  useEffect(() => {
    (async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return
      const { data: me } = await supabase.from('profiles').select('*').eq('id', user.id).single()

      // If I am in snooze mode, don't show me to others (handled server side)
      // If I have travel_mode, use travel_location
      // If I don't have premium, limit advanced filters
      let query = supabase.from('profiles').select('*').neq('id', user.id).eq('snooze_mode', false)

      if (me?.travel_mode && me?.travel_location) {
        query = query.ilike('current_location', `%${me.travel_location}%`)
      } else if (!me?.is_premium &&!filter.worldwide) {
        // Free users: only nearby (Katabi, UG) - premium gets worldwide
        query = query.ilike('current_location', '%UG%')
      }

      if (filter.advanced &&!me?.is_premium) {
        alert('Advanced filters require Premium - upgrade!')
        return
      }

      const { data } = await query.limit(50)
      if (data) setProfiles(data)
    })()
  }, [filter])

  return (
    <div>
      <div className="p-4 flex gap-2">
        <button onClick={()=>setFilter({...filter, worldwide:!filter.worldwide})} className={`px-3 py-1 rounded-full border text-sm ${filter.worldwide? 'bg-black text-white' : ''}`}>🌍 Worldwide {filter.worldwide? 'ON' : ''}</button>
        <button onClick={()=>setFilter({...filter, advanced:!filter.advanced})} className={`px-3 py-1 rounded-full border text-sm ${filter.advanced? 'bg-black text-white' : ''}`}>🎯 Advanced Filters</button>
      </div>

      {profiles.length === 0? (
        <div className="text-center p-10">
          <div className="text-4xl mb-4">🏳️</div>
          <h2 className="font-bold">Why not adjust those filters?</h2>
          <p className="text-sm text-gray-500 mt-2">You've seen everyone nearby. But, never fear, someone great could be just outside your filters.</p>
          <button onClick={()=>setFilter({advanced:false, worldwide:true})} className="bg-black text-white rounded-full px-6 py-3 mt-4">Adjust your filters</button>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-2 p-2">
          {profiles.map((p:any) => (
            <div key={p.id} className="rounded-xl overflow-hidden border">
              <img src={p.avatar_url || '/placeholder.jpg'} className="w-full h-48 object-cover" />
              <div className="p-2">
                <p className="font-bold">{p.full_name || 'User'}, {p.age || 25}</p>
                <p className="text-xs text-gray-500">{p.current_location || 'Katabi, UG'}</p>
                {p.incognito_mode && <span className="text-xs bg-gray-100 px-2 rounded">Incognito</span>}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
