const puppeteer=require('puppeteer-core');const sl=ms=>new Promise(r=>setTimeout(r,ms));
(async()=>{const b=await puppeteer.launch({executablePath:'/usr/bin/google-chrome',args:['--no-sandbox'],headless:'new'});const p=await b.newPage();await p.setViewport({width:390,height:844,deviceScaleFactor:2});const errs=[];p.on('pageerror',e=>errs.push(e.message));
const cdp=await p.target().createCDPSession();await cdp.send('Network.enable');await cdp.send('Network.setCacheDisabled',{cacheDisabled:true});await cdp.send('Network.emulateNetworkConditions',{offline:false,latency:40,downloadThroughput:9e6/8,uploadThroughput:3e6/8});
const pre=process.env.PRE||'1281';p.goto('http://127.0.0.1:18791/index.html',{timeout:120000}).catch(()=>{});
for(const [t,n] of [[1200,'a_1s'],[2600,'b_2_6s'],[4500,'c_4_5s'],[7000,'e_7s'],[9500,'f_9_5s']]){await sl(t-(p._lt||0));p._lt=t;await p.screenshot({path:`screenshots/${pre}_load_${n}.jpg`,type:'jpeg',quality:85})}
console.log('ERRS',errs);await b.close()})();
