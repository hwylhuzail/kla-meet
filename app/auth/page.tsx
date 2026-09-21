'use client';

import { useState } from 'react'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function Auth() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [mode, setMode] = useState<'login' | 'signup'>('login')
  const [status, setStatus] = useState('')
  const [loading, setLoading] = useState(false)

  const submit = async () => {
    if(!email ||!password) return setStatus('Enter email and password')
    setLoading(true); setStatus('Working...')
    try {
      const result = mode === 'login'
      ? await supabase.auth.signInWithPassword({ email, password })
        : await supabase.auth.signUp({
            email,
            password,
            options: { emailRedirectTo: `${window.location.origin}/auth` }
          })

      if (result.error) {
        setStatus(result.error.message)
        setLoading(false)
        return
      }

      if (mode === 'signup' &&!result.data.session) {
        setStatus('Check your email to confirm, then Sign In. (Check spam folder)')
        setLoading(false)
        return
      }

      setStatus('Success! Loading...')
      router.push('/discover')

    } catch(e:any) {
      setStatus(e.message || 'Network error - check internet')
      setLoading(false)
    }
  }

  const reset = async () => {
    if (!email) return setStatus('Enter your email first.')
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/auth`
    })
    setStatus(error? error.message : 'Password reset email sent - check inbox')
  }

  return (
    <main className="min-h-screen bg-[#0a0a0a] p-4 md:flex md:items-center md:justify-center">
      <section className="mx-auto w-full max-w-[380px] rounded-[24px] bg-white p-6 shadow-2xl">
        <Link href="/" className="text-[20px] font-black tracking-[-1px] text-black">KLA<span className="text-[#FFC629]">•</span>MEET</Link>

        <p className="mt-6 text-[11px] font-bold tracking-[2px] text-violet-600 uppercase">{mode === 'login'? 'Welcome back' : 'Join the world'}</p>
        <h1 className="mt-2 text-[26px] font-bold leading-[28px] tracking-[-1px] text-black">{mode === 'login'? 'Your next hello is waiting.' : 'Meet someone anywhere.'}</h1>

        <div className="mt-6 space-y-3">
          <input
            className="w-full rounded-full border border-zinc-200 bg-zinc-50 px-5 py-3 text-sm text-black outline-none focus:border-[#FFC629]"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="Email address"
            type="email"
          />
          <input
            className="w-full rounded-full border border-zinc-200 bg-zinc-50 px-5 py-3 text-sm text-black outline-none focus:border-[#FFC629]"
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder="Password (6+ chars)"
            type="password"
          />
          <button
            onClick={submit}
            disabled={loading}
            className="w-full rounded-full bg-[#FFC629] py-3.5 text-sm font-bold text-black disabled:opacity-50"
          >
            {loading? 'Wait...' : mode === 'login'? 'Sign in' : 'Create account'}
          </button>
        </div>

        <button onClick={reset} className="mt-3 w-full text-xs font-bold text-violet-600">Forgot password?</button>

        {status && <p className="mt-3 rounded-xl bg-zinc-100 p-3 text-center text-xs text-zinc-600 break-words">{status}</p>}

        <p className="mt-6 text-center text-sm text-zinc-500">
          {mode === 'login'? 'New to KLA Meet?' : 'Already have an account?'}
          <button onClick={() => { setMode(mode === 'login'? 'signup' : 'login'); setStatus('') }} className="ml-1 font-bold text-violet-600">
            {mode === 'login'? 'Create account' : 'Sign in'}
          </button>
        </p>
        <p className="mt-3 text-center text-[10px] text-zinc-400">18+ only · Protected by Supabase Auth</p>
      </section>
    </main>
  )
}