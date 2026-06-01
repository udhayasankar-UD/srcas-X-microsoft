import { createClient } from '@supabase/supabase-js';

// These environment variables will be stored in a .env file later
// For now, these are placeholders so the app doesn't crash
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://placeholder-project.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'placeholder-anon-key';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Centralized admin emails to avoid repeating them across components
export const ADMIN_EMAILS = [
  "udteam06@gmail.com",
  "udhayasankar200721@gmail.com"
];
