'use client';






import { Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import ProfileEditor from './ProfileEditor'
import ProfileView from './view'

function ProfileRoute() {
  const params = useSearchParams()
  return params.get('id') ? <ProfileView /> : <ProfileEditor />
}

export default function ProfilePage() {
  return <Suspense fallback={<div className="min-h-screen bg-[#fbf9ff]" />}><ProfileRoute /></Suspense>
}
