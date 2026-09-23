'use client'
import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'

export default function SettingsPage() {
  const supabase = createClient()
  const [profile, setProfile] = useState<any>(null)

  useEffect(() => {
    (async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return
      const { data } = await supabase.from('profiles').select('*').eq('id', user.id).single()
      setProfile(data)
    })()
  }, [])

  const update = async (field: string, value: any) => {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return
    setProfile({...profile, [field]: value })
    await supabase.from('profiles').update({ [field]: value }).eq('id', user.id)
  }

  if (!profile) return <div className="p-6">Loading settings...</div>

  return (
    <div className="max-w-md mx-auto bg-white min-h-screen pb-20">
      <div className="p-4 border-b flex items-center gap-2">
        <a href="/" className="text-xl">←</a>
        <h1 className="font-bold text-xl">Settings</h1>
      </div>

      <div className="p-4 space-y-6">
        <div>
          <h3 className="font-semibold">Type of connection</h3>
          <div className="flex justify-between items-center mt-2">
            <span>{profile.connection_type?.toUpperCase() || 'DATE'}</span>
            <span className="text-gray-400">›</span>
          </div>
        </div>

        <div className="space-y-4">
          <ToggleRow label="Date mode" desc="Hide your profile in Date and just use BFF. If you do this, you'll lose your connections and chats in Date." value={profile.date_mode} onChange={(v:any)=>update('date_mode', v)} />
          <ToggleRow label="Snooze mode" desc="Hide your profile temporarily, in all modes. You won't lose any connections or chats." value={profile.snooze_mode} onChange={(v:any)=>update('snooze_mode', v)} />
          <ToggleRow label="Incognito Mode for Date" desc="Only people you've liked already, or like later, will see your profile. If you turn on Incognito Mode for Date, this won't apply across Bizz or BFF." value={profile.incognito_mode} onChange={(v:any)=>update('incognito_mode', v)} />
          <ToggleRow label="Auto-Spotlight" desc="We'll use Spotlight automatically to boost your profile when most people will see it" value={profile.auto_spotlight} onChange={(v:any)=>update('auto_spotlight', v)} />
        </div>

        <div className="space-y-3 pt-4 border-t">
          <div className="flex justify-between"><span className="font-semibold">Location</span></div>
          <div className="flex justify-between text-sm"><span>Current location</span><span>{profile.current_location || 'Katabi, UG'} ›</span></div>
          <div className="flex justify-between text-sm"><span>Travel</span><span>{profile.travel_location? profile.travel_location : 'Change location'} ›</span></div>
        </div>

        <div className="space-y-2 pt-4">
          <div className="flex justify-between py-3 border-b">Video autoplay settings <span>›</span></div>
          <div className="flex justify-between py-3 border-b">Notification settings <span>›</span></div>
          <div className="flex justify-between py-3 border-b">Legal information <span>›</span></div>
          <div className="flex justify-between py-3 border-b">Get help <span>›</span></div>
          <div className="flex justify-between py-3 border-b">Security and Privacy <span>›</span></div>
        </div>

        <button onClick={async()=>{ await supabase.auth.signOut(); window.location.href='/login'}} className="w-full border rounded-full py-3 mt-6">Log out</button>
        <button className="w-full text-red-500 py-2">Delete account</button>

        <p className="text-center text-xs text-gray-400 mt-6">KLA Meet Version 1.0<br/>Created with love.</p>
      </div>
    </div>
  )
}

function ToggleRow({label, desc, value, onChange}: any){
  return (
    <div>
      <div className="flex justify-between items-center">
        <span className="font-semibold text-sm">{label}</span>
        <button onClick={()=>onChange(!value)} className={`w-12 h-6 rounded-full p-1 transition ${value? 'bg-black' : 'bg-gray-300'}`}>
          <div className={`w-4 h-4 bg-white rounded-full transition ${value? 'translate-x-6' : ''}`}></div>
        </button>
      </div>
      <p className="text-xs text-gray-500 mt-1">{desc}</p>
    </div>
  )
}
