import { createClient } from '@supabase/supabase-js';

// const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
// const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY;

const supabase = createClient('https://ivcpnrxjmraumohevpck.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml2Y3BucnhqbXJhdW1vaGV2cGNrIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NDc4MTk0MzMsImV4cCI6MTk2MzM5NTQzM30.Fh5fSojGSGeBw4fb_FEdYMhYHb0nkHnonwsHVZZJ3zI');

export default supabase;
