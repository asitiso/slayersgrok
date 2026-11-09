/* Supabase public client config (anon key is public by design; row access is enforced by RLS on public.game_states).
   Boot (runs BEFORE game.js): if this device was last signed in, game.js uses that account's local slot slayers_save_v2_<uid>. */
window.SLAYERS_SB={url:'https://gcwzinknuypollovcjsf.supabase.co',key:'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imdjd3ppbmtudXlwb2xsb3ZjanNmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTIyNzg4MTksImV4cCI6MjEwNzg1NDgxOX0.fT0YcCGfRSkBlmqw1t1ogPIptylywTdL1VisRR7wOoY'};
(()=>{if(window.__slayersUid)return;try{const u=localStorage.getItem('slayers_auth_uid');if(u&&/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(u))window.__slayersUid=u.toLowerCase()}catch(_){}})();
