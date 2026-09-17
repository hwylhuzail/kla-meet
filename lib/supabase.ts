import { createClient } from '@supabase/supabase-js'

const url = process.env.NEXT_PUBLIC_SUPABASE_URL
const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

// This will CRASH build if env missing - so you know it's broken
if (!url || !key || url.includes('placeholder')) {
  console.error("❌ MISSING SUPABASE ENV!", { url, hasKey: !!key })
  throw new Error("Missing NEXT_PUBLIC_SUPABASE_URL / ANON_KEY - Add them to GitHub Secrets!")
}

export const supabase = createClient(url, key, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: false, // MUST for Capacitor APK
  },
  global: {
    fetch: fetch.bind(globalThis), // MUST for Android WebView
  }
})