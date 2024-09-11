import { createClient } from '@supabase/supabase-js'
import config from './config.js'

// Se crea una instancia de Supabase.
const supabase = createClient(config.supabase.url, config.supabase.key)

export default supabase;