const puppeteer=require('puppeteer-core');const sl=ms=>new Promise(r=>setTimeout(r,ms));const fs=require('fs');
(async()=>{const b=await puppeteer.launch({executablePath:'/usr/bin/google-chrome',args:['--no-sandbox'],headless:'new'});const p=await b.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message));
const U='http://127.0.0.1:18791/index.html',K='slayers_save_v2',OLD=fs.readFileSync('/tmp/bigsave.json','utf8');const ev=(f,a)=>p.evaluate(f,a);
const put=async o=>{await ev(o=>{G.noSave=1;localStorage.clear();for(const k in o)localStorage.setItem(k,o[k])},o);await p.goto(U);await sl(1500)};
const strip=j=>{const o=JSON.parse(j);delete o.last;return o};const diff=(a,b)=>Object.keys({...a,...b}).filter(k=>JSON.stringify(a[k])!==JSON.stringify(b[k]));
await p.goto(U);await sl(800);
// 1 old-format save written by previous version loads, flush, reload, flush again: identical
await put({[K]:OLD});const A=await ev(()=>{G.saveNow('t');return localStorage.getItem('slayers_save_v2')});
const o=JSON.parse(OLD),a=JSON.parse(A);console.log('old->new changed keys (init-time):',diff(strip(OLD),strip(A)).join(',')||'none','| lv',o.lv,a.lv,'maxSi',o.maxSi,a.maxSi,'gold',o.gold,a.gold);
await p.reload();await sl(1500);const B=await ev(()=>{G.saveNow('t');return localStorage.getItem('slayers_save_v2')});
console.log('roundtrip reload diff:',diff(strip(A),strip(B)).join(',')||'IDENTICAL',A.length,B.length);
const eq=await ev(()=>{G.saveNow('t');const st=localStorage.getItem('slayers_save_v2');return [st===JSON.stringify(G.S()),JSON.stringify(JSON.parse(st))===st]});console.log('stored bytes == JSON.stringify(live state):',eq[0],'| parse->stringify lossless:',eq[1]);
const ld=await ev(o=>{const q=JSON.parse(o);const L=G.C.fresh?Object.keys(G.C.fresh()):[];return Object.keys(q).filter(k=>!(k in G.S())).join(',')||'all old keys kept'},OLD);console.log('old keys missing after load:',ld);
// 2 corrupt main -> falls back to tmp, then bak
await put({[K]:'{broken',[K+'_tmp']:OLD});console.log('corrupt main, tmp ok ->',await ev(()=>[window.__loadFrom,G.S().maxSi]));
await put({[K]:'{bro',[K+'_bak']:OLD});console.log('corrupt main, bak ok ->',await ev(()=>[window.__loadFrom,G.S().maxSi]));
// 3 burst of 50 event saves -> debounced to 1 write
await put({[K]:OLD});const n=await ev(async()=>{const n0=G._SV.n;for(let i=0;i<50;i++)G.save();await new Promise(r=>setTimeout(r,2500));return G._SV.n-n0});console.log('50 event saves ->',n,'write(s)');
// 4 hide flushes immediately
const h=await ev(()=>{const n0=G._SV.n;G.save();Object.defineProperty(document,'hidden',{configurable:true,get:()=>true});document.dispatchEvent(new Event('visibilitychange'));return [G._SV.n-n0,G._SV.ms.slice(-1)[0][0]]});console.log('hide flush',h);
// 5 reset clears all keys
await ev(()=>{G.reset()});await sl(1500);console.log('after reset keys',await ev(()=>Object.keys(localStorage).filter(k=>k.startsWith('slayers_save')).join(',')),'maxSi',await ev(()=>G.S().maxSi));
console.log('ERRS',errs.slice(0,3));await b.close()})();
