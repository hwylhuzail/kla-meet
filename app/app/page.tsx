'use client';

export const dynamic = 'force-dynamic';





import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Discover from '../discover/page'
import { supabase } from '@/lib/supabase'

export default function AppPage() {
  const router = useRouter()

  useEffect(() => {
    let active = true
    supabase.auth.getSession().then(({ data }) => {
      if (active && !data.session) router.replace('/auth')
    })
    return () => {
      active = false
    }
  }, [router])

  return (
    <div style={{ backgroundColor: 'white', color: 'black', minHeight: '100vh' }}>
      <Discover />
    </div>
  )
}

