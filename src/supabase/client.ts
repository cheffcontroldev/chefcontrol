import { createClient } from '@supabase/supabase-js';

/** Supabase URL from environment variables. */
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
/** Supabase anonymous/publishable key from environment variables. */
const supabaseKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

/** Pre-configured Supabase client instance for database and auth operations. */
export const supabase = createClient(supabaseUrl, supabaseKey);
