const puppeteer=require('puppeteer-core');const sl=ms=>new Promise(r=>setTimeout(r,ms));
(async()=>{const b=await puppeteer.launch({executablePath:'/usr/bin/google-chrome',args:['--no-sandbox'],headless:'new',timeout:180000});const p=await b.newPage();await p.setViewport({width:390,height:844});
const U='http://127.0.0.1:18791/index.html';await p.goto(U,{timeout:200000});await p.evaluate(()=>localStorage.clear());await p.goto(U,{timeout:200000});await sl(2000);
const vis=()=>p.evaluate(()=>[...document.querySelectorAll('.dot,.rd,.badge')].filter(d=>d.offsetParent&&getComputedStyle(d).display!='none').map(d=>(d.parentElement.id||d.parentElement.dataset.s||d.parentElement.className)+':'+d.className));
console.log(await vis());await p.evaluate(()=>{const d=G.C.dunDaily();for(const k in d.t)while(d.t[k]>0)G.C.dunRun(k)});await sl(500);console.log(await vis(),await p.evaluate(()=>G.BD.menu));await b.close()})();
