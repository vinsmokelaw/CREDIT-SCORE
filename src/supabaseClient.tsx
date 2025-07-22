import { createClient } from "@supabase/supabase-js";

// ✅ Use Vite-style env vars
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// ✅ Optional check for undefined
if (!supabaseUrl || !supabaseKey) {
  throw new Error("Supabase URL or Anon Key is missing.");
}

export const supabase = createClient(supabaseUrl, supabaseKey);
