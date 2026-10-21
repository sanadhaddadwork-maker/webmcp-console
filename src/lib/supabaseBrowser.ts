import { createClient as createSupabaseClient } from '@supabase/supabase-js';

export function createClient() {
  const rawUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const rawKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  const supabaseUrl = (rawUrl && rawUrl.startsWith('http')) ? rawUrl : 'https://placeholder.supabase.co';
  const supabaseAnonKey = (rawKey && rawKey.length > 5) ? rawKey : 'placeholder-key';

  return createSupabaseClient(supabaseUrl, supabaseAnonKey);
}
