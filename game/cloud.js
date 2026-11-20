/* Google login + per-account cloud save (Supabase, table public.slayers_saves: user_id, revision, state, updated_at — r824: this game's own table; public.game_states belongs to another game and is never touched).
   Runs AFTER game.js. Inert when supabase-js / config / G are missing (jsdom tests) and does no cloud I/O while G.noSave is on.
   Local slots: guest = slayers_save_v2(+_tmp/_bak); account = slayers_save_v2_<uid>(+_tmp/_bak); slayers_auth_uid = last signed-in uid (read by sb.js before game.js). */
(()=>{'use strict';
const CFG=window.SLAYERS_SB||{},G=window.G;if(!G||!CFG.url||!CFG.key)return;
const BASE='slayers_save_v2',FLAG='slayers_auth_uid',TB='slayers_saves',bootUid=window.__slayersUid||null;
/* r824: sync base key versioned with the table (old slayers_sync_<uid> could hold rev 703 from the other game's game_states row and would hide a newer slayers_saves row) */
const ukey=u=>BASE+'_'+u,syncK=u=>'slayers_sync824_'+u,rstK=u=>'slayers_reset_'+u;
const get=k=>{try{return localStorage.getItem(k)}catch(_){return null}},put=(k,v)=>{try{localStorage.setItem(k,v);return true}catch(_){return false}},del=k=>{try{localStorage.removeItem(k)}catch(_){}};
const CL={sb:null,user:null,ready:0,status:'',err:'',lastSync:0,rev:0,inited:0,reloading:0,bootUid};G.cloud=CL;
CL.reload=()=>location.reload();
/* game.js bumps state.last at boot (offline reward / saves), so compare with the timestamp of the save it loaded (game.js `saved`) */
const bootAt=Date.now(),bootLast=(()=>{try{if(typeof saved!=='undefined'&&saved&&typeof saved=='object')return +saved.last||0}catch(_){}return 0})();
const io=()=>!!(CL.sb&&CL.user&&!G.noSave);
const sleep=ms=>new Promise(r=>setTimeout(r,ms));
/* r823 guard (kept in r824 as defence): only this game's format (lv/si/maxSi/gold) is ever downloaded into a local slot. Since r824 the table is this game's own, so a malformed row there is treated as "no usable cloud save" and replaced by this device's save (no sync pause). */
const own=s=>!!s&&typeof s=='object'&&!Array.isArray(s)&&('lv' in s||'si' in s||'maxSi' in s||'gold' in s);CL.own=own;
const real=s=>!!s&&typeof s=='object'&&((s.lv||1)>1||(s.maxSi||0)>0||(s.kills||0)>=30);
const readSave=u=>{for(const k of [ukey(u),ukey(u)+'_tmp',ukey(u)+'_bak']){try{const v=JSON.parse(get(k));if(v&&typeof v=='object'&&own(v))return v}catch(_){}}return null};
const getBase=u=>{try{return JSON.parse(get(syncK(u)))||null}catch(_){return null}};
const setBase=(u,rev,last)=>put(syncK(u),JSON.stringify({rev:+rev||0,last:+last||0}));
const noLast=s=>{try{const o=Object.assign({},s);delete o.last;return JSON.stringify(o)}catch(_){return ''}};
const tip=(t)=>{try{if(typeof toast=='function')toast(t)}catch(_){}};
/* ---- cloud row I/O (own row only; RLS also enforces auth.uid() = user_id) ---- */
async function upsertState(u,state,prevRev){
 const rev=(+prevRev||0)+1,st=JSON.parse(JSON.stringify(state));
 const row={user_id:u,revision:rev,state:st,updated_at:new Date().toISOString()};
 const {error}=await CL.sb.from(TB).upsert(row,{onConflict:'user_id'});if(error)throw error;
 CL.rev=rev;setBase(u,rev,st.last||0);CL.lastSync=Date.now();CL.err='';CL.status='ok';return rev}
async function deleteRow(u){/* r824: own table, own row only (RLS) */const {error}=await CL.sb.from(TB).delete().eq('user_id',u);if(error)throw error;return true}
/* ---- debounced/throttled upload after each successful local save ---- */
let tmr=0,dirty=0,lastPush=0,pushing=null;
async function push(why){
 if(!io()||!CL.ready||CL.user.id!==bootUid)return;
 if(pushing){dirty=1;return pushing}
 const u=CL.user.id;CL.status='sync';paint();
 pushing=(async()=>{try{await upsertState(u,G.S(),Math.max(CL.rev||0,(getBase(u)||{}).rev||0))}catch(e){CL.err=String(e&&e.message||e).slice(0,120);CL.status='fail'}finally{pushing=null;paint()}})();
 return pushing}
function flush(){if(tmr){clearTimeout(tmr);tmr=0}if(!dirty)return Promise.resolve();dirty=0;lastPush=Date.now();return push('flush')}
window.__slayersSaved=()=>{if(!io()||!CL.ready||CL.user.id!==bootUid)return;dirty=1;if(tmr)return;tmr=setTimeout(()=>{tmr=0;flush()},Math.max(3000,30000-(Date.now()-lastPush)))};
CL.pending=()=>!!(tmr||dirty||pushing);CL.flushNow=()=>flush();/* r819: read-only helpers for the auto-update reload (is an upload waiting / running, upload now) */
document.addEventListener('visibilitychange',()=>{if(document.hidden)flush()});
window.addEventListener('pagehide',()=>{flush()});
/* ---- slot switching ---- */
function switchTo(u){if(CL.reloading)return;CL.reloading=1;if(u)put(FLAG,u);else del(FLAG);G.noSave=1;if(tmr){clearTimeout(tmr);tmr=0}CL.reload()}
function writeLocal(u,st){const j=JSON.stringify(st);put(ukey(u),j);del(ukey(u)+'_tmp')}
const desc=s=>{if(!s)return '없음';const t=s.last?new Date(s.last):null;return `Lv.${s.lv||1} · 스테이지 ${(s.maxSi||0)+1}${t&&!isNaN(t)?' · '+t.toLocaleString('ko-KR',{month:'numeric',day:'numeric',hour:'2-digit',minute:'2-digit'}):''}`};
function ask(local,cs){return new Promise(res=>{const m=document.createElement('div');m.className='modal cloud618';
 m.innerHTML=`<div class=card><div class=ttl style="justify-content:center">저장 데이터 선택</div><small style="display:block;line-height:1.6">이 기기와 구글 계정에 서로 다른 진행이 있어요.<br>어느 쪽으로 이어서 할까요?</small><div style="margin-top:10px;font:700 12px Maplestory,sans-serif;line-height:1.7">이 기기: ${desc(local)}<br>클라우드: ${desc(cs)}</div><div style="display:flex;gap:8px;margin-top:12px"><span class=btn data-pick=local style="flex:1">이 기기 유지</span><span class=btn data-pick=cloud style="flex:1">클라우드 사용</span></div></div>`;
 m.onclick=e=>{const b=e.target.closest&&e.target.closest('[data-pick]');if(!b)return;m.remove();res(b.dataset.pick)};(document.getElementById('app')||document.body).appendChild(m)})}
CL.ask=ask;
/* decide which save wins: 'local' | 'cloud' | 'same' | 'ask' */
function decide(local,cs,row,b){
 const lt=+(local&&local.last)||0,lMoved=!!b&&lt>(b.last||0)+90e3,cMoved=!b||(+row.revision||0)>(b.rev||0);
 if(!cMoved)return real(local)&&lMoved?'local':'same';/* cloud unchanged since this device last synced: never re-download (no reload loops) */
 if(!real(local))return 'cloud';
 if(!real(cs))return 'local';
 if(noLast(local)===noLast(cs))return 'same';
 if(b&&!lMoved)return 'cloud';/* only the cloud moved (another device played) */
 const ct=+cs.last||Date.parse(row.updated_at)||0,d=lt-ct;if(Math.abs(d)>10*60e3)return d>0?'local':'cloud';return 'ask'}
CL.decide=decide;
let syncing=null;
async function onUser(user){
 CL.user=user;CL.ready=0;put(FLAG,user.id);paint();
 if(!io()||syncing===user.id)return;syncing=user.id;const u=user.id;
 try{
  if(get(rstK(u))){try{await deleteRow(u);del(rstK(u))}catch(_){}}
  const {data:row,error}=await CL.sb.from(TB).select('revision,state,updated_at').eq('user_id',u).maybeSingle();if(error)throw error;
  if(!CL.user||CL.user.id!==u||G.noSave)return;
  const same=u===bootUid,local=same?G.S():readSave(u),guest=!same&&!bootUid?G.S():null;
  const lcmp=same&&local&&Date.now()-bootAt<60e3?Object.assign({},local,{last:bootLast}):local;
  if(row&&!own(row.state)){/* r824: never downloaded; overwrite it with this device's save (next revision) */const cand=real(local)?local:real(guest)?guest:local;CL.rev=+row.revision||0;if(cand)await upsertState(u,cand,CL.rev);if(!same){try{G.saveNow('switch')}catch(_){}if(cand&&cand!==local)writeLocal(u,cand);return switchTo(u)}CL.ready=1;CL.lastSync=Date.now();CL.status='ok';CL.err='';paint();return}
  if(!row){/* (a) account has no cloud save yet: adopt this device's progress (account cache, else guest) as its first save */
   const cand=real(local)?local:real(guest)?guest:null;if(cand)await upsertState(u,cand,0);
   if(!same){try{G.saveNow('switch')}catch(_){}if(cand&&cand!==local)writeLocal(u,cand);return switchTo(u)}
   CL.ready=1;CL.status=cand?'ok':'';paint();return}
  const cs=row.state,crev=+row.revision||0;CL.rev=crev;
  let pick=decide(lcmp,cs,row,getBase(u));if(pick==='ask')pick=await ask(lcmp,cs);
  if(!CL.user||CL.user.id!==u)return;
  if(pick==='cloud'&&cs&&typeof cs=='object'){/* (b) take cloud: write it to the account slot, then reload into it */
   if(!same){try{G.saveNow('switch')}catch(_){}}G.noSave=1;writeLocal(u,cs);setBase(u,crev,cs.last||0);return switchTo(u)}
  if(pick==='local')await upsertState(u,local,crev);else setBase(u,crev,(local||cs||{}).last||0);
  if(!same){try{G.saveNow('switch')}catch(_){}return switchTo(u)}
  CL.ready=1;CL.lastSync=Date.now();CL.status='ok';CL.err='';paint()
 }catch(e){CL.err=String(e&&e.message||e).slice(0,120);CL.status='fail';paint();setTimeout(()=>{if(CL.user&&CL.user.id===u&&!CL.ready)onUser(CL.user)},30000)}
 finally{syncing=null}}
function onNoUser(){CL.user=null;CL.ready=0;CL.status='';if(get(FLAG))del(FLAG);paint();
 if(bootUid){try{G.saveNow('logout')}catch(_){}switchTo(null)}}/* per-account cache is kept; reload into the guest slot */
CL._onUser=onUser;CL._onNoUser=onNoUser;CL._flush=flush;
/* ---- auth ---- */
function cleanUrl(){try{const q=location.search+location.hash;if(/[?&#](code|access_token|refresh_token|error|error_description|provider_token)=/.test(q)){const m=/error_description=([^&#]+)/.exec(q);if(m)tip('로그인 실패: '+decodeURIComponent(m[1].replace(/\+/g,' ')).slice(0,60));history.replaceState(null,'',location.origin+location.pathname)}}catch(_){}}
const kfetch=(u,o)=>{o=o||{};const small=typeof o.body=='string'&&o.body.length<60000;return fetch(u,small?Object.assign({},o,{keepalive:true}):o)};
function init(){if(CL.sb||!window.supabase||typeof window.supabase.createClient!='function')return;
 try{CL.sb=window.supabase.createClient(CFG.url,CFG.key,{auth:{persistSession:true,autoRefreshToken:true,detectSessionInUrl:true,flowType:'pkce'},global:{fetch:kfetch}})}catch(e){CL.status='off';return}
 CL.sb.auth.onAuthStateChange((ev,s)=>{if(!CL.inited)return;setTimeout(()=>{if(ev==='SIGNED_OUT'||!s)return onNoUser();if(s.user&&(!CL.user||CL.user.id!==s.user.id))onUser(s.user);else if(s.user){CL.user=s.user;paint()}},0)});
 CL.sb.auth.getSession().then(({data,error})=>{cleanUrl();CL.inited=1;const s=data&&data.session;if(s&&s.user)onUser(s.user);else if(!error)onNoUser();else{CL.status='fail';paint()}}).catch(()=>{cleanUrl();CL.inited=1;CL.status='fail';paint()})}
CL.init=init;
/* r820: one tap = one Google sign-in. The installed PWA used to fire 2-3 authorize calls from repeated taps and showed nothing. Now: busy guard (cleared after 10s, when the page is hidden, or on error), instant toast, skipBrowserRedirect + one explicit location.assign, visible error toast. */
let loginBusy=0,loginT=0;
const loginFree=()=>{loginBusy=0;if(loginT){clearTimeout(loginT);loginT=0}};
CL.loginBusy=()=>!!loginBusy;
CL.login=async()=>{if(loginBusy)return;
 loginBusy=1;loginT=setTimeout(()=>{loginT=0;loginBusy=0},10000);tip('구글로 이동 중…');
 try{if(!CL.sb){init();if(!CL.sb){tip('로그인 모듈을 불러오지 못했어요. 잠시 후 다시 시도해 주세요');loginFree();return}}
  try{if(!G.noSave)G.saveNow('login')}catch(_){}
  const {data,error}=await CL.sb.auth.signInWithOAuth({provider:'google',options:{redirectTo:location.origin+location.pathname,skipBrowserRedirect:true}});
  if(error||!data||!data.url){tip('로그인 실패: '+String(error&&error.message||'주소를 받지 못했어요').slice(0,60));loginFree();return}
  CL.go(data.url)}catch(e){tip('로그인 실패: '+String(e&&e.message||e).slice(0,60));loginFree()}};
CL.go=u=>location.assign(u);
document.addEventListener('visibilitychange',()=>{if(document.hidden)loginFree()});
window.addEventListener('pagehide',loginFree);
/* r820: a sign-in finished in another window / the browser (or restored from bfcache) is picked up without restarting the app. getSession() only; routed through the same onUser / onNoUser (onUser already ignores a user it is syncing, so no double cloud load). */
let rfAt=0,rfBusy=0;
CL.refresh=async()=>{if(!CL.sb||!CL.inited||rfBusy||G.noSave||CL.reloading||Date.now()-rfAt<1000)return;rfAt=Date.now();rfBusy=1;
 try{const {data,error}=await CL.sb.auth.getSession();if(error||CL.reloading)return;const se=data&&data.session;
  if(se&&se.user){if(!CL.user||CL.user.id!==se.user.id)onUser(se.user)}
  else if(CL.user&&CL.ready)onNoUser()}catch(_){}finally{rfBusy=0}};
document.addEventListener('visibilitychange',()=>{if(!document.hidden)CL.refresh()});
window.addEventListener('pageshow',()=>CL.refresh());
window.addEventListener('focus',()=>CL.refresh());
window.addEventListener('storage',e=>{if(e.key===null||/^sb-.*-auth-token/.test(e.key||''))CL.refresh()});
/* r820: 로그아웃 (설정 → 계정, shown only when signed in): confirm once, flush the normal local + cloud save, local sign-out, back to 게스트. Progress (local slots, cloud row) is never deleted. A second tap while it runs is ignored. */
let outBusy=0;
CL.logout=async()=>{if(outBusy||!CL.sb||!CL.user)return;if(!confirm('로그아웃할까요? 진행은 계정에 저장돼 있어요.'))return;outBusy=1;
 try{try{if(!G.noSave)G.saveNow('logout')}catch(_){}dirty=1;await Promise.race([flush(),sleep(3000)]);
  try{await Promise.race([CL.sb.auth.signOut({scope:'local'}),sleep(3000)])}catch(_){}onNoUser()}finally{outBusy=0}};
/* ---- reset: logged-in reset also removes this account's cloud row (guest slot untouched) ---- */
const oReset=G.reset;
G.reset=async function(){const u=CL.user&&CL.user.id;if(!u||!CL.sb||u!==bootUid)return oReset.apply(this,arguments);
 G.noSave=1;if(tmr){clearTimeout(tmr);tmr=0}dirty=0;put(rstK(u),'1');del(syncK(u));
 try{const ok=await Promise.race([deleteRow(u),sleep(4000)]);if(ok===true)del(rstK(u))}catch(_){}/* if offline, slayers_reset_<uid> makes the next login delete the row first */
 return oReset.apply(this,arguments)};
/* ---- settings 계정 card ---- */
const esc=t=>String(t==null?'':t).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'})[c]);
const hm=t=>new Date(t).toLocaleTimeString('ko-KR',{hour:'2-digit',minute:'2-digit'});
const syncLine=()=>CL.status==='fail'?'클라우드 동기화 실패 · 자동으로 다시 시도해요':CL.status==='sync'?'클라우드 동기화 중…':!CL.ready?'클라우드 확인 중…':CL.lastSync?'클라우드 저장 · 마지막 동기화 '+hm(CL.lastSync):'클라우드 저장 사용 중';
const who=u=>{const m=u.user_metadata||{},n=m.full_name||m.name||'',e=u.email||m.email||'';return n&&e?n+' · '+e:(n||e||'구글 계정')};
function decorate(){if(G.screen!=='settings')return;const sc=document.getElementById('screen'),acc=sc&&sc.querySelector('#accRow');if(!acc)return;
 const u=CL.user,sm=acc.querySelector('.f small'),chip=acc.querySelector('.chip527');
 const t1=u?who(u):'게스트 · 로컬 저장';if(sm&&sm.textContent!==t1){sm.textContent=t1;sm.style.wordBreak='break-all'}if(chip&&chip.textContent!==(u?'구글':'게스트'))chip.textContent=u?'구글':'게스트';
 let r=sc.querySelector('#gAuthRow');if(!r){acc.insertAdjacentHTML('afterend','<div class="row acc610" id=gAuthRow></div>');r=sc.querySelector('#gAuthRow')}
 const h=u?`<div class=f><b>클라우드 저장</b><small class=srd style="display:block" id=gSync>${esc(syncLine())}</small></div><span class=pill id=gLogout>로그아웃</span>`
  :`<div class=f><b>구글 계정</b><small class=srd style="display:block">로그인하면 진행이 내 구글 계정에 저장돼요</small></div><span class="pill blue" id=gLogin>구글로 로그인</span>`;
 if(r._h!==h){r._h=h;r.innerHTML=h;const a=r.querySelector('#gLogin'),b=r.querySelector('#gLogout');if(a)a.onclick=()=>CL.login();if(b)b.onclick=()=>CL.logout()}}
function paint(){try{decorate()}catch(_){}}
CL.paint=paint;
if(typeof renderScreen=='function'){const o=renderScreen;renderScreen=function(){const r=o.apply(this,arguments);paint();return r}}
{const st=document.createElement('style');st.textContent='html body #screen .stpaper #gLogin,html body #screen .stpaper #gLogout{min-width:64px!important;min-height:28px!important;height:28px!important;display:inline-flex!important;align-items:center!important;justify-content:center!important;font:900 12px/1 Maplestory,sans-serif!important;padding:0 10px!important;box-sizing:border-box!important;white-space:nowrap}#gAuthRow .f small{word-break:keep-all}';document.head.appendChild(st)}
/* ---- start: supabase-js is loaded async from the CDN (never blocks the game) ---- */
if(window.supabase)init();else{const s=document.getElementById('sbjs');if(s)s.addEventListener('load',init);let n=0;const iv=setInterval(()=>{if(CL.sb||++n>40)return clearInterval(iv);if(window.supabase)init()},500)}
})();
