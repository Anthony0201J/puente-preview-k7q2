(function(){
var $=function(s,r){return (r||document).querySelector(s)},$$=function(s,r){return [].slice.call((r||document).querySelectorAll(s))};
// loader counter
var ct=$('#ct'),n=0,ld=$('#load');
var tm=setInterval(function(){n=Math.min(100,n+Math.ceil(Math.random()*14));ct.textContent=('0'+n).slice(-3).replace(/^0/,'');if(n>=100){clearInterval(tm)}},90);
function hideLoad(){setTimeout(function(){ld.style.opacity='0';ld.style.pointerEvents='none';setTimeout(function(){ld.classList.add('off')},850);document.documentElement.classList.add('ready');window.__go&&window.__go()},650)}
var done=false;function fin(){if(done)return;done=true;n=100;ct.textContent='100';hideLoad()}
addEventListener('load',function(){setTimeout(fin,500)});setTimeout(fin,4500);
// reveals
var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in')}})},{threshold:.15,rootMargin:'0px 0px -6% 0px'});
$$('.rise').forEach(function(el){io.observe(el)});
// cursor
var cur=$('#cur'),cx=0,cy=0,tx=0,ty=0;
addEventListener('mousemove',function(e){tx=e.clientX;ty=e.clientY;window.__mx=e.clientX/innerWidth*2-1;window.__my=e.clientY/innerHeight*2-1});
(function lp(){cx+=(tx-cx)*.2;cy+=(ty-cy)*.2;cur.style.transform='translate('+cx+'px,'+cy+'px)';requestAnimationFrame(lp)})();
document.addEventListener('mouseover',function(e){cur.classList.toggle('big',!!e.target.closest('a,button,summary,input'))});
// anchors
$$('a[href^="#"]').forEach(function(a){a.addEventListener('click',function(ev){var t=$(a.getAttribute('href'));if(!t)return;ev.preventDefault();document.documentElement.style.scrollBehavior='auto';scrollTo(0,t.getBoundingClientRect().top+scrollY);history.replaceState(null,'',a.getAttribute('href'))})});
// form (preview only)
$('#form').addEventListener('submit',function(e){e.preventDefault();var v=$('#em').value.trim(),m=$('#msg');
 m.textContent=/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(v)?'Preview only — nothing was sent. Thank you for looking.':'Please enter a valid email address.'});
// demo
var S={
 en:{bike:{name:'the bike shop',c:['Hi, can I book a tune-up this week?','Thursday works. Afternoon is best.','Yes, that works.'],p:["Hi, I'm an AI assistant for the bike shop. How can I help?",'Yes. I have Thursday at 2:30 PM or 4:00 PM. Which do you prefer?','Booked: Thursday at 2:30 PM. You will get a confirmation.'],r:'Tune-up · Thursday 2:30 PM'},
 dent:{name:'the dental office',c:['I need a cleaning appointment.','Thursday morning if possible.','Perfect, thank you.'],p:["Hi, I'm an AI assistant for the dental office. How can I help?",'I can offer Thursday at 9:00 AM or 10:30 AM. Which one works?','Booked: Thursday at 9:00 AM. A reminder will follow.'],r:'Cleaning · Thursday 9:00 AM'},
 rest:{name:'the restaurant',c:['A table for four on Friday, please.','Around seven.','Great.'],p:["Hi, I'm an AI assistant for the restaurant. How can I help?",'Friday for four. I have 6:45 PM or 7:30 PM. Which do you prefer?','Booked: Friday at 6:45 PM for four people.'],r:'Table for 4 · Friday 6:45 PM'}},
 es:{bike:{c:['Hola, ¿puedo agendar un servicio para mi bicicleta esta semana?','El jueves por la tarde está bien.','Sí, me funciona.'],p:['Hola, soy un asistente de IA de la tienda de bicicletas. ¿En qué puedo ayudarle?','Sí. Tengo el jueves a las 2:30 p. m. o a las 4:00 p. m. ¿Cuál prefiere?','Listo: jueves a las 2:30 p. m. Recibirá una confirmación.'],r:'Servicio · jueves 2:30 p. m.'},
 dent:{c:['Necesito una cita para una limpieza.','El jueves por la mañana, si es posible.','Perfecto, gracias.'],p:['Hola, soy un asistente de IA del consultorio dental. ¿En qué puedo ayudarle?','Puedo ofrecerle el jueves a las 9:00 a. m. o a las 10:30 a. m. ¿Cuál le conviene?','Listo: jueves a las 9:00 a. m. Le llegará un recordatorio.'],r:'Limpieza · jueves 9:00 a. m.'},
 rest:{c:['Una mesa para cuatro el viernes, por favor.','Como a las siete.','Muy bien.'],p:['Hola, soy un asistente de IA del restaurante. ¿En qué puedo ayudarle?','Viernes para cuatro. Tengo a las 6:45 p. m. o a las 7:30 p. m. ¿Cuál prefiere?','Listo: viernes a las 6:45 p. m. para cuatro personas.'],r:'Mesa para 4 · viernes 6:45 p. m.'}}};
var lang='en',biz='bike',run=0,timers=[];
function sel(id,cb){$$('#'+id+' button').forEach(function(b){b.addEventListener('click',function(){$$('#'+id+' button').forEach(function(x){x.classList.remove('on')});b.classList.add('on');cb(b.dataset.v);stop()})})}
sel('lang',function(v){lang=v});sel('biz',function(v){biz=v});
var call=$('#call'),go=$('#go'),end=$('#end');
function clr(){timers.forEach(clearTimeout);timers=[]}
function idle(){call.innerHTML='<div class="idle" id="idle"><div class="ring"></div>'+(lang==='es'?'Pulse iniciar para simular una llamada entrante.':'Press start to simulate an incoming call.')+'</div>';go.textContent=lang==='es'?'Iniciar llamada':'Start call';end.textContent=lang==='es'?'Terminar':'End call';end.disabled=true;go.disabled=false;window.__speak&&window.__speak(0)}
function stop(){run++;clr();idle()}
function bubble(cls,who,txt){var d=document.createElement('div');d.className='bub '+cls;d.innerHTML='<small></small>';d.firstChild.textContent=who;d.appendChild(document.createTextNode(txt));call.appendChild(d);call.scrollTop=call.scrollHeight}
go.addEventListener('click',function(){
 var my=++run;clr();go.disabled=true;end.disabled=false;
 var sc=S[lang][biz],es=lang==='es';
 call.innerHTML='<div class="stat"><span>'+(es?'Llamada entrante…':'Incoming call…')+'</span><span class="bars" id="bars"><b></b><b></b><b></b><b></b><b></b></span></div>';
 var bars=$$('#bars b'),bt=setInterval(function(){var l=window.__lv||0;bars.forEach(function(b){b.style.height=(5+Math.random()*13*l)+'px'})},120);
 timers.push(setInterval(function(){},9e9));
 function at(ms,fn){timers.push(setTimeout(function(){if(run===my)fn()},ms))}
 var seq=[],t=1400;
 for(var i=0;i<3;i++){(function(i){
   at(t,function(){window.__speak&&window.__speak(1);bubble('p',es?'Puente (IA)':'Puente (AI)',sc.p[i])});t+=2100;
   if(i<2){at(t-700,function(){window.__speak&&window.__speak(0)});at(t,function(){window.__speak&&window.__speak(.35);bubble('c',es?'Cliente (ejemplo)':'Caller (example)',sc.c[i])});t+=1600}
 })(i)}
 at(t+300,function(){window.__speak&&window.__speak(0);var d=document.createElement('div');d.className='bub p';d.style.alignSelf='stretch';d.style.maxWidth='100%';d.innerHTML='<small>'+(es?'Cita agendada':'Appointment booked')+'</small>';d.appendChild(document.createTextNode(sc.r));call.appendChild(d);call.scrollTop=call.scrollHeight;go.disabled=false;go.textContent=es?'Repetir':'Replay';end.disabled=true;clearInterval(bt)});
 timers.push({_i:bt});
});
end.addEventListener('click',stop);
idle();
})();
