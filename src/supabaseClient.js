import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || 'https://pwzdggunxvapaowvbkjy.supabase.co'
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB3emRnZ3VueHZhcGFvd3Zia2p5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDYyOTQwNzUsImV4cCI6MjA2MTg3MDA3NX0.YOUR_ACTUAL_ANON_KEY_HERE'

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)
