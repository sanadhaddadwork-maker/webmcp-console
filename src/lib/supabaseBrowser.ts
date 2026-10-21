import { createBrowserClient } from '@supabase/ssr';

export function createClient() {
  const rawUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const rawKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  // Ensure it's a valid HTTP/HTTPS URL, otherwise use a safe placeholder for static pre-rendering
  const supabaseUrl = (rawUrl && rawUrl.startsWith('http')) ? rawUrl : 'https://placeholder.supabase.co';
  const supabaseAnonKey = (rawKey && rawKey.length > 5) ? rawKey : 'placeholder-key';

  return createBrowserClient(supabaseUrl, supabaseAnonKey);
}
