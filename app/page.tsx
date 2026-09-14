'use client'
import { useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'
export default function Home(){const r=useRouter();useEffect(()=>{supabase.auth.getSession().then(({data})=>{if(data.session) r.push('/discover'); else r.push('/auth')})},[]);return <div className="p-10 text-center">KLA MEET Loading...</div>}