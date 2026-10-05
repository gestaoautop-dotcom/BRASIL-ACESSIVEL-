const screens=[...document.querySelectorAll('.screen')];
const order=screens.map(s=>s.id);
let currentIndex=screens.findIndex(s=>s.classList.contains('is-active'));
function show(id,direction=1){
 const nextIndex=order.indexOf(id); if(nextIndex<0||nextIndex===currentIndex)return;
 const current=screens[currentIndex],next=screens[nextIndex];
 current.classList.remove('slide-out-left','slide-out-right');
 next.classList.remove('slide-out-left','slide-out-right');
 current.classList.add(direction>0?'slide-out-left':'slide-out-right');
 current.classList.remove('is-active');
 next.classList.add('is-active');
 currentIndex=nextIndex;
 setTimeout(()=>current.classList.remove('slide-out-left','slide-out-right'),650);
 if(id==='page-3')surveillanceLoop();else clearInterval(surveillanceTimer);
}
document.querySelectorAll('[data-next]').forEach(b=>b.addEventListener('click',()=>show(b.dataset.next,1)));
document.querySelectorAll('[data-prev]').forEach(b=>b.addEventListener('click',()=>show(b.dataset.prev,-1)));
function step(dir){
 let ni=(currentIndex+dir+screens.length)%screens.length;
 show(order[ni],dir);
}
window.addEventListener('keydown',e=>{if(e.key==='ArrowRight')step(1);if(e.key==='ArrowLeft')step(-1)});
let touchX=0;
window.addEventListener('touchstart',e=>touchX=e.changedTouches[0].clientX,{passive:true});
window.addEventListener('touchend',e=>{const d=e.changedTouches[0].clientX-touchX;if(Math.abs(d)>55)step(d<0?1:-1)},{passive:true});
const surveillanceWords=["FILMADO","OBSERVADO","OUVIDO","RASTREADO"];
let surveillanceTimer;
function surveillanceLoop(){const el=document.getElementById("surveillanceWord");if(!el)return;let i=0;clearInterval(surveillanceTimer);el.textContent=surveillanceWords[0];surveillanceTimer=setInterval(()=>{el.classList.add("swap");setTimeout(()=>{i=(i+1)%surveillanceWords.length;el.textContent=surveillanceWords[i];el.classList.remove("swap")},140)},760)}
const moodToggle=document.getElementById('moodToggle'),page4=document.getElementById('page-4');
if(moodToggle&&page4){
 let bad=false;
 page4.classList.remove('mood-good','mood-bad-state');
 moodToggle.addEventListener('click',()=>{
   bad=!bad;
   page4.classList.toggle('mood-bad-state',bad);
 });
}

}
document.getElementById('rouletteUp')?.addEventListener('click',()=>moveRoulette(-1));
document.getElementById('rouletteDown')?.addEventListener('click',()=>moveRoulette(1));
document.getElementById('rouletteWindow')?.addEventListener('wheel',e=>{e.preventDefault();moveRoulette(e.deltaY>0?1:-1)},{passive:false});
let rouletteTouchY=0;
document.getElementById('rouletteWindow')?.addEventListener('touchstart',e=>rouletteTouchY=e.changedTouches[0].clientY,{passive:true});
document.getElementById('rouletteWindow')?.addEventListener('touchend',e=>{const d=e.changedTouches[0].clientY-rouletteTouchY;if(Math.abs(d)>35)moveRoulette(d<0?1:-1)},{passive:true});
window.addEventListener('resize',updateRoulette);
updateRoulette();

const rouletteCards=[...document.querySelectorAll('.roulette-card')];
const rouletteTrackH=document.getElementById('rouletteTrack');
let rouletteIndexH=0;
function updateHorizontalRoulette(){
 if(!rouletteTrackH||!rouletteCards.length)return;
 const cardW=rouletteCards[0].getBoundingClientRect().width+16;
 const viewport=document.getElementById('rouletteWindow');
 const centerOffset=viewport?Math.max(0,(viewport.clientWidth-rouletteCards[0].getBoundingClientRect().width)/2):0;
 rouletteTrackH.style.transform='translateX('+(centerOffset-rouletteIndexH*cardW)+'px)';
 rouletteCards.forEach((el,i)=>{
   el.classList.toggle('is-active',i===rouletteIndexH);
   el.classList.toggle('is-near',Math.abs(i-rouletteIndexH)===1);
 });
}
function moveHorizontalRoulette(dir){
 if(!rouletteCards.length)return;
 rouletteIndexH=(rouletteIndexH+dir+rouletteCards.length)%rouletteCards.length;
 updateHorizontalRoulette();
}
document.getElementById('rouletteLeft')?.addEventListener('click',()=>moveHorizontalRoulette(-1));
document.getElementById('rouletteRight')?.addEventListener('click',()=>moveHorizontalRoulette(1));
document.getElementById('rouletteWindow')?.addEventListener('wheel',e=>{e.preventDefault();moveHorizontalRoulette(e.deltaY>0||e.deltaX>0?1:-1)},{passive:false});
let rouletteTouchX=0;
document.getElementById('rouletteWindow')?.addEventListener('touchstart',e=>rouletteTouchX=e.changedTouches[0].clientX,{passive:true});
document.getElementById('rouletteWindow')?.addEventListener('touchend',e=>{const d=e.changedTouches[0].clientX-rouletteTouchX;if(Math.abs(d)>35)moveHorizontalRoulette(d<0?1:-1)},{passive:true});
window.addEventListener('resize',updateHorizontalRoulette);
updateHorizontalRoulette();
