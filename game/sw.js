/* r817 service worker: makes the game installable and fast to reopen, but never serves old game code after a deploy.
   - HTML / JS / CSS / manifest (same origin): network-first, cache is only the offline / slow-network fallback.
   - Images, fonts, audio (same origin): cached copy first, refreshed in the background (versioned cache name).
   - Everything cross-origin (Supabase, Google sign-in, CDN) and any /auth /api path or OAuth callback URL: not touched at all. */
const V = 'v844';
const CODE = 'slayers-code-' + V;
const STATIC = 'slayers-static-' + V;
const MAX_STATIC = 500;
const NET_TIMEOUT = 4000;
const ASSET = /\.(?:png|jpe?g|webp|gif|svg|ico|woff2?|ttf|otf|mp3|ogg|wav|m4a)$/i;
const CODEX = /\.(?:html?|js|css|json|webmanifest)$/i;
const SKIP_PATH = /^\/(?:auth|api|rest|realtime|functions|storage|_vercel|~oauth)(?:\/|$)/i;
const OAUTH_QS = /[?&#](?:code|access_token|refresh_token|id_token|error|error_description|state|provider_token|token_hash)=/i;

const PRE827=['assets/sumfx/circle_n.webp','assets/sumfx/circle_r.webp','assets/sumfx/circle_e.webp','assets/sumfx/circle_l.webp','assets/sumfx/pillar_n.webp','assets/sumfx/pillar_r.webp','assets/sumfx/pillar_e.webp','assets/sumfx/pillar_l.webp','assets/sumfx/burst_n.webp','assets/sumfx/burst_r.webp','assets/sumfx/burst_e.webp','assets/sumfx/burst_l.webp','assets/sumfx/orb_n.webp','assets/sumfx/orb_r.webp','assets/sumfx/orb_e.webp','assets/sumfx/orb_l.webp','assets/sumfx/glow_n.webp','assets/sumfx/glow_r.webp','assets/sumfx/glow_e.webp','assets/sumfx/glow_l.webp','assets/sumfx/spark.webp','assets/sumfx/spark_sheet.webp','assets/sumfx/burst_x.webp','assets/sumfx/glow_x.webp','assets/sumfx/badge_x.webp'];
self.addEventListener('install', e => {
  e.waitUntil((async () => {
    try {
      const base=(self.registration&&self.registration.scope)||self.location.href;
      const c=await caches.open(STATIC);
      await c.addAll(PRE827.map(p=>new URL(p,base).href));
    } catch (_) {}
    await self.skipWaiting();
  })());
});
/* r819: the page may also ask a waiting worker to take over (normally install already did) */
self.addEventListener('message', e => { if (e.data === 'skipWaiting' || (e.data && e.data.type === 'SKIP_WAITING')) self.skipWaiting(); });
self.addEventListener('activate', e => {
  e.waitUntil((async () => {
    const keep = [CODE, STATIC];
    for (const k of await caches.keys()) if (k.indexOf('slayers-') === 0 && keep.indexOf(k) < 0) await caches.delete(k);
    await self.clients.claim();
  })());
});

function norm(url) { const u = new URL(url); u.search = ''; u.hash = ''; return u.href; }
function handled(req) {
  if (req.method !== 'GET') return false;
  let u; try { u = new URL(req.url); } catch (_) { return false; }
  if (u.origin !== self.location.origin) return false;
  if (SKIP_PATH.test(u.pathname)) return false;
  if (OAUTH_QS.test(u.search + (u.hash || ''))) return false;
  if (req.headers.has('range')) return false;
  return true;
}
async function put(name, key, res) {
  if (!res || res.status !== 200 || res.type !== 'basic') return;
  const c = await caches.open(name);
  await c.put(key, res);
  if (name === STATIC) { const ks = await c.keys(); for (let i = 0; i < ks.length - MAX_STATIC; i++) await c.delete(ks[i]); }
}
function networkFirst(e, req, key) {
  const net = fetch(req, { cache: 'no-cache' }).then(res => { e.waitUntil(put(CODE, key, res.clone())); return res; });
  return (async () => {
    const hit = await caches.match(key, { cacheName: CODE });
    if (!hit) return net;
    net.catch(() => {});
    const timer = new Promise(r => setTimeout(() => r(null), NET_TIMEOUT));
    try { const res = await Promise.race([net, timer]); return res || hit; }
    catch (_) { return hit; }
  })();
}
function staleWhileRevalidate(e, req, key) {
  return (async () => {
    const hit = await caches.match(key, { cacheName: STATIC });
    const net = fetch(req).then(res => { e.waitUntil(put(STATIC, key, res.clone())); return res; });
    if (hit) { net.catch(() => {}); return hit; }
    return net;
  })();
}
self.addEventListener('fetch', e => {
  const req = e.request;
  if (!handled(req)) return;
  const u = new URL(req.url);
  if (req.mode === 'navigate') {
    e.respondWith(networkFirst(e, req, norm(u.origin + u.pathname.replace(/\/$/, '/index.html'))).catch(async () => (await caches.match(norm(u.origin + '/index.html'), { cacheName: CODE })) || Response.error()));
    return;
  }
  if (ASSET.test(u.pathname)) { e.respondWith(staleWhileRevalidate(e, req, norm(req.url))); return; }
  if (CODEX.test(u.pathname)) { e.respondWith(networkFirst(e, req, norm(req.url))); return; }
});
