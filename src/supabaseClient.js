import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = 'https://pwzdggunxvapaowvbkjy.supabase.co'
const SUPABASE_KEY = 'sb_publishable_cRIFeKSI2eCXE8b8Bw_Y2Q_vG2oNJ7V'

export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY)
