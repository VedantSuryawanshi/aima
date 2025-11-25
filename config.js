// Supabase Configuration
// Replace these values with your Supabase project credentials
// Get them from: https://app.supabase.com -> Your Project -> Settings -> API

const SUPABASE_CONFIG = {
    url: 'https://quvbckxmdhuaylcipdfo.supabase.co', // e.g., 'https://xxxxx.supabase.co'
    anonKey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InF1dmJja3htZGh1YXlsY2lwZGZvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjEyMTQyMTksImV4cCI6MjA3Njc5MDIxOX0.GyItsy_VKybEGbFop9L7f6kYnLYdyMghJViExqWeIq0' // Your anon/public key
};

// Initialize Supabase client (will be initialized after supabase library loads)
let supabaseClient = null;

function initSupabase() {
    if (typeof supabase !== 'undefined') {
        const { createClient } = supabase;
        supabaseClient = createClient(SUPABASE_CONFIG.url, SUPABASE_CONFIG.anonKey);
        return true;
    }
    return false;
}

