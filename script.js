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
 let good=false;
 const setMood=()=>{good=!good;page4.classList.toggle('mood-good',good)};
 moodToggle.addEventListener('click',setMood);
 setInterval(setMood,2600);
}
