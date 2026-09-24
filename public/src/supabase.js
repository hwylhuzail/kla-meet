import { createClient } from '@supabase/supabase-js'
export const supabase = createClient(
  'https://YOUR_PROJECT.supabase.co', // <-- replace with your URL
  'YOUR_ANON_KEY' // <-- replace with your anon key
)