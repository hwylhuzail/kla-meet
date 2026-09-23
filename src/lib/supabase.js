import { createClient } from '@supabase/supabase-js'
const url = import.meta.env.VITE_SUPABASE_URL || 'https://YOUR_PROJECT.supabase.co'
const anon = import.meta.env.VITE_SUPABASE_ANON || 'YOUR_ANON_KEY'
export const supabase = createClient(url, anon)
