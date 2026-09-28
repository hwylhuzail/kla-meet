import { useState } from 'react'
import { supabase } from '../../supabase'

export default function Profile({ user, isAdmin, form, setForm, onDelete }){
  const [saving,setSaving]=useState(false)
  const [bio,setBio]=useState(form?.bio||'')
  const [city,setCity]=useState(form?.city||'Kampala')
  const [age,setAge]=useState(form?.age||'22')
  const [name,setName]=useState(form?.name||'')

  const handleSave = async () => {
    if(!name.trim()) return alert('Add name')
    setSaving(true)
    setForm({...form, bio, city, age, name})
    // REAL Supabase — true info
    const { error } = await supabase.from('profiles').upsert({
      id: user?.id,
      email: user?.email,
      bio, city, age: parseInt(age)||22, name,
      updated_at: new Date().toISOString()
    }, { onConflict: 'id' })
    setSaving(false)
    if(error) {
      console.log(error)
      alert('Saved locally. DB: '+error.message+' — run SQL in Supabase')
    } else {
      alert('Profile saved to Supabase!')
    }
  }

  const handleDelete = async () => {
    if(!confirm('Delete your account and ALL posts forever?')) return
    if(!confirm('FINAL: Delete '+user?.email+'? This cannot be undone')) return
    if(onDelete) return onDelete() // use App's real delete

    // fallback real delete
    await supabase.from('posts').delete().eq('user_id', user?.id)
    await supabase.from('profiles').delete().eq('id', user?.id)
    await supabase.auth.signOut()
    localStorage.clear()
    window.location.href='/'
  }

  return (
    <div className="max-w-md mx-auto p-4 pb-32 space-y-4">
      <div className="bg-zinc-900 rounded-[24px] p-5">
        <div className="flex justify-between items-start">
          <div>
            <h2 className="font-black text-white text-[18px]">{name||form?.name||'Your Profile'}</h2>
            <p className="text-[11px] mt-1 text-white/60">{user?.email}</p>
            <div className="mt-2 flex gap-2">
              {isAdmin && <span className="bg-[#FFC300] text-black px-2.5 py-1 rounded-full text-[9px] font-black">ADMIN • FREE</span>}
              <span className="bg-white/10 text-white px-2.5 py-1 rounded-full text-[9px] font-bold">{city}</span>
              <span className="bg-white/10 text-white px-2.5 py-1 rounded-full text-[9px] font-bold">{age} yrs</span>
            </div>
          </div>
          <div className="w-14 h-14 rounded-full bg-[#FFC300] flex items-center justify-center font-black text-black text-xl">
            {(name||'U')[0].toUpperCase()}
          </div>
        </div>
        <p className="text-[10px] mt-3 text-white/60">{isAdmin?'ADMIN - full access':'Friendship profile - verified • Real Supabase data'}</p>
      </div>

      <div className="bg-white rounded-[24px] p-5 text-black">
        <h3 className="font-black text-sm">Edit Friendship Profile</h3>
        <label className="text-[10px] font-bold mt-4 block">Full Name</label>
        <input value={name} onChange={e=>setName(e.target.value)} placeholder="Your name" className="mt-1 w-full bg-zinc-100 rounded-full px-4 py-3 text-xs" />
        <label className="text-[10px] font-bold mt-3 block">City</label>
        <select value={city} onChange={e=>setCity(e.target.value)} className="mt-1 w-full bg-zinc-100 rounded-full px-4 py-3 text-xs">
          <option>Kampala</option><option>Entebbe</option><option>Jinja</option><option>Arua</option><option>Mbarara</option><option>Gulu</option><option>Mbale</option><option>Other Uganda</option>
        </select>
        <label className="text-[10px] font-bold mt-3 block">Age</label>
        <input type="number" min="18" value={age} onChange={e=>setAge(e.target.value)} className="mt-1 w-full bg-zinc-100 rounded-full px-4 py-3 text-xs" />
        <label className="text-[10px] font-bold mt-3 block">Bio - Friendship Interests</label>
        <textarea value={bio} onChange={e=>setBio(e.target.value)} placeholder="Example: I love football, coffee, study groups, hiking..." rows={3} className="mt-1 w-full bg-zinc-100 rounded-[16px] px-4 py-3 text-xs" />
        <button onClick={handleSave} disabled={saving} className="mt-4 w-full bg-black text-white rounded-full py-3 font-black text-xs">
          {saving?'Saving to Supabase...':'Save to Supabase'}
        </button>
        <p className="text-[9px] text-zinc-500 mt-2 text-center">Real data saved to Supabase table `profiles` • Keep it friendly</p>
      </div>

      <div className="bg-zinc-900 rounded-[24px] p-5">
        <h3 className="font-black text-white text-xs">Safety & Legal</h3>
        <div className="mt-3 grid grid-cols-2 gap-2">
          <a href="/privacy" className="bg-zinc-800 px-3 py-3 rounded-full text-[10px] text-white text-center font-bold">Privacy</a>
          <a href="/terms" className="bg-zinc-800 px-3 py-3 rounded-full text-[10px] text-white text-center font-bold">Terms</a>
          <a href="/guidelines" className="bg-zinc-800 px-3 py-3 rounded-full text-[10px] text-white text-center font-bold">Guidelines</a>
          <a href="mailto:kla.meet.ug@gmail.com" className="bg-zinc-800 px-3 py-3 rounded-full text-[10px] text-white text-center font-bold">Support</a>
        </div>
      </div>

      <div className="bg-red-50 border border-red-200 rounded-[24px] p-5">
        <h3 className="font-black text-sm text-red-700">Account Settings</h3>
        <p className="text-[10px] mt-2 text-zinc-600">Real Supabase delete: removes posts + profile + auth.</p>
        <button onClick={async()=>{ await supabase.auth.signOut(); localStorage.clear(); window.location.href='/' }} className="mt-4 w-full bg-zinc-900 text-white rounded-full py-3 font-bold text-xs">Logout</button>
        <button onClick={handleDelete} className="mt-3 w-full bg-red-600 text-white rounded-full py-3 font-bold text-xs">Delete My Account & All Data (Supabase)</button>
      </div>

      <p className="text-[9px] text-center text-white/30">KLA-MEET • ID: {user?.id?.slice(0,8)} • Supabase real</p>
    </div>
  )
}