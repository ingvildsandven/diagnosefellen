import { createClient } from "@supabase/supabase-js";

const supabaseUrl = 'https://phedjojrftcuvdkzavqg.supabase.co';
const supabaseKey = import.meta.env.VITE_SUPABASE_PUBLISH_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;