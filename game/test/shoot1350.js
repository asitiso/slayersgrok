// r273: v224 quick icons. 1350 territory (영지) timers/harvest/locks; extras: 1350b shop, 1350c dungeon, 1350d enhance, 1350e party preset number, 1350f fish, gallery/explore/map checked by log.
const puppeteer=require('puppeteer-core');const sl=ms=>new Promise(r=>setTimeout(r,ms));const fs=require('fs');
(async()=>{const b=await puppeteer.launch({executablePath:'/usr/bin/google-chrome',args:['--no-sandbox'],headless:'new'});const p=await b.newPage();await p.setViewport({width:390,height:844,deviceScaleFactor:2});const errs=[];p.on('pageerror',e=>errs.push(e.message));
const U='http://127.0.0.1:18791/index.html';await p.goto(U);await p.evaluate(s=>{G.noSave=1;localStorage.clear();localStorage.setItem('slayers_save_v2',s);localStorage.setItem('slayers_set',JSON.stringify({gq:'high',story:0}))},fs.readFileSync('/tmp/bigsave.json','utf8'));
await p.goto(U);await sl(4000);
await p.evaluate(()=>{document.querySelectorAll('.modal,.tut,#notice,.sty').forEach(x=>x.remove());G.storyOn=0;G.noticeOpen=()=>{};C.S().autoBoss=false});
const go=async(s,shot,scroll)=>{await p.evaluate(s=>{try{closeScreen()}catch(_){}openScreen(s)},s);await sl(800);if(scroll)await p.evaluate(q=>{const e=document.querySelector(q);e&&e.scrollIntoView({block:'center'})},scroll);await sl(300);
 const r=await p.evaluate(()=>{const sc=document.getElementById('screen'),t=sc.innerText;const im=[...sc.querySelectorAll('img.qic')];return {left:(t.match(/[⏱🧺⚡🔒💎🗺🎣🔄]/gu)||[]).join(''),qic:im.length,kinds:[...new Set(im.map(i=>i.className.split('q_')[1]))].join(','),broken:im.filter(i=>!(i.complete&&i.naturalWidth)).length}});console.log(s.padEnd(8),JSON.stringify(r));if(shot)await p.screenshot({path:'../screenshots/'+shot+'.jpg',type:'jpeg',quality:86})};
await go('base','1350_territory_icons');
await go('shop','1350b_shop_icons');await go('dungeon','1350c_dungeon_icons');await go('enhance','1350d_enhance_bolt','#enAll');
await go('party','1350e_preset_number','#screen .pset');await go('fish','1350f_fish_bobber');await go('gallery');await go('explore');await go('map');await go('arena');
await sl(1500);await p.evaluate(()=>{closeScreen();openScreen('shop')});await sl(1600);console.log('shop after timer ticks',await p.evaluate(()=>document.querySelector('#screen .dtim').innerHTML.slice(0,120)));
console.log('ERRS',JSON.stringify(errs));await b.close()})();
