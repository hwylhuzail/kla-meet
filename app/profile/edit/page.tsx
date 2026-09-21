'use client';






import { Suspense } from 'react'
import ProfileEditor from '../ProfileEditor'

export default function EditProfilePage() {
	return <Suspense fallback={<div className="min-h-screen bg-[#f8f8f8]" />}><ProfileEditor /></Suspense>
}
