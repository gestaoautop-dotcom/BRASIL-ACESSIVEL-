const screens=[...document.querySelectorAll('.screen')];const order=screens.map(s=>s.id);function show(id){screens.forEach(s=>s.classList.toggle('is-active',s.id===id))}document.querySelectorAll('[data-next]').forEach(b=>b.addEventListener('click',()=>show(b.dataset.next)));document.querySelectorAll('[data-prev]').forEach(b=>b.addEventListener('click',()=>show(b.dataset.prev)));window.addEventListener('keydown',e=>{const i=screens.findIndex(s=>s.classList.contains('is-active'));if(e.key==='ArrowRight'&&i<screens.length-1)show(order[i+1]);if(e.key==='ArrowLeft'&&i>0)show(order[i-1])});
const surveillanceWords=["FILMADO","OBSERVADO","OUVIDO","RASTREADO"];
let surveillanceTimer;
function surveillanceLoop(){
 const el=document.getElementById("surveillanceWord"); if(!el)return;
 let i=0; clearInterval(surveillanceTimer); el.textContent=surveillanceWords[0];
 surveillanceTimer=setInterval(()=>{el.classList.add("swap");setTimeout(()=>{i=(i+1)%surveillanceWords.length;el.textContent=surveillanceWords[i];el.classList.remove("swap")},140)},760);
}
document.querySelectorAll('[data-next],[data-prev]').forEach(b=>b.addEventListener('click',()=>{setTimeout(()=>{if(document.getElementById("page-3").classList.contains("is-active"))surveillanceLoop();else clearInterval(surveillanceTimer)},20)}));
