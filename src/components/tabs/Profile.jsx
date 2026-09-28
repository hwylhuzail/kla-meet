import { useState } from 'react'
import { supabase } from '../../supabase'

export default function Profile({ user, isAdmin, form, setForm }){
  const [saving,setSaving]=useState(false)
  const [bio,setBio]=useState(form?.bio||'')
  const [city,setCity]=useState(form?.city||'Kampala')
  const [age,setAge]=useState(form?.age||'22')
  const [name,setName]=useState(form?.name||'')

  const handleSave = async () => {
    setSaving(true)
    // save to local form + supabase profile if you have table
    setForm({...form, bio, city, age, name})
    const { error } = await supabase.from('profiles').upsert({
      id: user?.id,
      email: user?.email,
      bio, city, age: parseInt(age), name,
      updated_at: new Date()
    }).select()
    setSaving(false)
    if(error) alert('Saved locally, DB error: '+error.message)
    else alert('Profile updated!')
  }

  const handleDelete = async () => {
    if(!confirm('Delete your account and all data forever? This cannot be undone.')) return
    if(!confirm('Final confirm: Delete '+user?.email+'?')) return
    // 1. Try delete from supabase
    await supabase.from('profiles').delete().eq('id', user?.id)
    await supabase.auth.signOut()
    localStorage.clear()
    window.location.href = 'mailto:kla.meet.ug@gmail.com?subject=DELETE%20MY%20DATA%20-%20'+user?.email
    setTimeout(()=>{ window.location.href='/' }, 2000)
  }

  return (
    <div className="max-w-md mx-auto p-4 pb-24 space-y-4">
      {/* Header Card */}
      <div className="bg-zinc-900 rounded-[24px] p-5">
        <div className="flex justify-between items-start">
          <div>
            <h2 className="font-black text-white text-[18px]">{name||form?.name||'Your Profile'}</h2>
            <p className="text-[11px] mt-1 text-white/60">{user?.email}</p>
            <div className="mt-2 flex gap-2">
              {isAdmin && <span className="bg-[#FFC300] text-black px-2.5 py-1 rounded-full text-[9px] font-black">ADMIN</span>}
              <span className="bg-white/10 text-white px-2.5 py-1 rounded-full text-[9px] font-bold">{city}</span>
              <span className="bg-white/10 text-white px-2.5 py-1 rounded-full text-[9px] font-bold">{age} yrs</span>
            </div>
          </div>
          <div className="w-14 h-14 rounded-full bg-[#FFC300] flex items-center justify-center font-black text-black text-xl">
            {(name||'U')[0].toUpperCase()}
          </div>
        </div>
        <p className="text-[10px] mt-3 text-white/60">{isAdmin?'ADMIN - full access to all features':'Friendship profile - verified'}</p>
      </div>

      {/* Edit Form */}
      <div className="bg-white rounded-[24px] p-5 text-black">
        <h3 className="font-black text-sm">Edit Friendship Profile</h3>

        <label className="text-[10px] font-bold mt-4 block">Full Name</label>
        <input value={name} onChange={e=>setName(e.target.value)} placeholder="Your name" className="mt-1 w-full bg-zinc-100 rounded-full px-4 py-3 text-xs" />

        <label className="text-[10px] font-bold mt-3 block">City</label>
        <select value={city} onChange={e=>setCity(e.target.value)} className="mt-1 w-full bg-zinc-100 rounded-full px-4 py-3 text-xs">
          <option>Kampala</option><option>Entebbe</option><option>Jinja</option><option>Arua</option><option>Mbarara</option><option>Gulu</option><option>Mbale</option><option>Other</option>
        </select>

        <label className="text-[10px] font-bold mt-3 block">Age</label>
        <input type="number" value={age} onChange={e=>setAge(e.target.value)} className="mt-1 w-full bg-zinc-100 rounded-full px-4 py-3 text-xs" />

        <label className="text-[10px] font-bold mt-3 block">Bio - About You (friendship interests)</label>
        <textarea value={bio} onChange={e=>setBio(e.target.value)} placeholder="Example: I love football, coffee, study groups, hiking..." rows={3} className="mt-1 w-full bg-zinc-100 rounded-[16px] px-4 py-3 text-xs" />

        <button onClick={handleSave} disabled={saving} className="mt-4 w-full bg-black text-white rounded-full py-3 font-black text-xs">
          {saving?'Saving...':'Save Profile'}
        </button>
        <p className="text-[9px] text-zinc-500 mt-2 text-center">Keep it friendly — no adult content, no phone numbers in bio.</p>
      </div>

      {/* Safety & Legal */}
      <div className="bg-zinc-900 rounded-[24px] p-5">
        <h3 className="font-black text-white text-xs">Safety & Legal</h3>
        <div className="mt-3 grid grid-cols-2 gap-2">
          <a href="/privacy" className="bg-zinc-800 px-3 py-3 rounded-full text-[10px] text-white text-center font-bold">Privacy Policy</a>
          <a href="/terms" className="bg-zinc-800 px-3 py-3 rounded-full text-[10px] text-white text-center font-bold">Terms of Service</a>
          <a href="mailto:kla.meet.ug@gmail.com" className="bg-zinc-800 px-3 py-3 rounded-full text-[10px] text-white text-center font-bold">Contact Support</a>
          <button onClick={()=>alert('Report: Every profile has Report & Block button. Use it if someone breaks rules. Admin reviews in 24h.')} className="bg-zinc-800 px-3 py-3 rounded-full text-[10px] text-white text-center font-bold">How to Report</button>
        </div>
      </div>

      {/* Account Actions */}
      <div className="bg-red-50 border border-red-200 rounded-[24px] p-5">
        <h3 className="font-black text-sm text-red-700">Account Settings</h3>
        <p className="text-[10px] mt-2 text-zinc-600">Logout, or permanently delete all your data. Deletion removes photos, messages and profile within 30 days as per Privacy Policy.</p>

        <button onClick={async()=>{ await supabase.auth.signOut(); localStorage.clear(); window.location.href='/' }} className="mt-4 w-full bg-zinc-900 text-white rounded-full py-3 font-bold text-xs">Logout</button>

        <button onClick={handleDelete} className="mt-3 w-full bg-red-600 text-white rounded-full py-3 font-bold text-xs">Delete My Account & Data</button>

        <a href="mailto:kla.meet.ug@gmail.com?subject=DELETE%20MY%20DATA" className="mt-2 block w-full text-center bg-white border border-red-300 text-red-600 rounded-full py-3 font-bold text-[11px]">Email Request: DELETE MY DATA</a>
      </div>

      <p className="text-[9px] text-center text-white/30">KLA-MEET • Friendship in Uganda • ID: {user?.id?.slice(0,8)}</p>
    </div>
  )
}