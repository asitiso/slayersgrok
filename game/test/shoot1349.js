// r272: v223 편성 프리셋 slot plates + pp_save/pp_load; extras: relic 📜→rl_fragment (1349b), friend ⚔→ic3_arena (1349c).
const puppeteer=require('puppeteer-core');const sl=ms=>new Promise(r=>setTimeout(r,ms));const fs=require('fs');
(async()=>{const b=await puppeteer.launch({executablePath:'/usr/bin/google-chrome',args:['--no-sandbox'],headless:'new'});const p=await b.newPage();await p.setViewport({width:390,height:844,deviceScaleFactor:2});const errs=[];p.on('pageerror',e=>errs.push(e.message));
const U='http://127.0.0.1:18791/index.html';await p.goto(U);await p.evaluate(s=>{G.noSave=1;localStorage.clear();localStorage.setItem('slayers_save_v2',s);localStorage.setItem('slayers_set',JSON.stringify({gq:'high',story:0}))},fs.readFileSync('/tmp/bigsave.json','utf8'));
await p.goto(U);await sl(4000);
await p.evaluate(()=>{document.querySelectorAll('.modal,.tut,#notice,.sty').forEach(x=>x.remove());G.storyOn=0;G.noticeOpen=()=>{};C.S().autoBoss=false;openScreen('party')});await sl(900);
const em=s=>p.evaluate(s=>{const t=document.querySelector(s).innerText;return (t.match(/[💾📜⚔]/gu)||[]).join('')},s);
const chk=()=>p.evaluate(()=>[...document.querySelectorAll('#screen img')].filter(i=>/pp_|rl_fragment|ic3_arena/.test(i.src)&&!(i.complete&&i.naturalWidth)).map(i=>i.src));
console.log('party left',await em('#screen .pset'),'broken',JSON.stringify(await chk()),'slots',JSON.stringify(await p.evaluate(()=>[...document.querySelectorAll('#screen .psl')].map(e=>e.className+' '+e.innerText.replace(/\n/g,' ')))));
await p.evaluate(()=>document.querySelector('#screen .pset').scrollIntoView({block:'center'}));await sl(300);
await p.screenshot({path:'../screenshots/1349_party_presets.jpg',type:'jpeg',quality:86});
await p.evaluate(()=>{closeScreen();openScreen('relic')});await sl(700);console.log('relic left',await em('#screen'),'broken',JSON.stringify(await chk()));
await p.screenshot({path:'../screenshots/1349b_relic_frag.jpg',type:'jpeg',quality:86});
await p.evaluate(()=>{closeScreen();openScreen('friend')});await sl(700);console.log('friend list left',await p.evaluate(()=>{const c=[...document.querySelectorAll('#screen .card')].find(c=>/친구 목록/.test(c.innerText));c&&c.scrollIntoView({block:'start'});return (c.innerText.match(/⚔/g)||[]).length}),'broken',JSON.stringify(await chk()));await sl(300);
await p.screenshot({path:'../screenshots/1349c_friend_power.jpg',type:'jpeg',quality:86});
console.log('ERRS',JSON.stringify(errs));await b.close()})();
