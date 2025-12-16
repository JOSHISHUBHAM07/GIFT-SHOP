import { createClient } from "@supabase/supabase-js";

// ⚠️ REPLACE THESE WITH YOUR REAL KEYS FROM SUPABASE ⚠️
const supabaseUrl = "https://dhnbdnoiyhunxaumzhwq.supabase.co";
const supabaseKey = "sb_publishable_dIgc0dvn0Co3QEM4rwOqvg_eKGKiJUj";

export const supabase = createClient(supabaseUrl, supabaseKey);
