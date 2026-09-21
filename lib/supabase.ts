import { createClient } from '@supabase/supabase-js'

const url = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''

// Don't crash build - just warn in console
if (!url || !key || url.includes('placeholder')) {
  console.warn("⚠️ SUPABASE ENV MISSING - Add to Vercel Env Vars")
}

export const supabase = createClient(url || 'https://placeholder.supabase.co', key || 'placeholder-key', {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true, // CHANGE to true for web - false blocks email confirm redirect = your Redirect Notice
  },
  global: {
    fetch: fetch.bind(globalThis),
  }
})