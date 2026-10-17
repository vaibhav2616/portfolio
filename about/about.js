/* About: a 3D Kobo. Add after the page scripts; talks to Semi through the semi:say event. */
(function(){
  var root=document.getElementById('inside'); if(!root||!root.classList.contains('ab2')) return;
  var FIND=root.getAttribute('data-find-url')||'';
  var $=function(s){return root.querySelector(s);};
  var page=$('#ab2Page'), screen=$('#ab2Screen'), kobo=$('#ab2Kobo'), scene=$('#ab2Scene');
  var front=$('#ab2Front'), back=$('#ab2Back'), sheen=$('#ab2Sheen'), flipBtn=$('#ab2Flip');
  var books=[].slice.call(root.querySelectorAll('.ab2-bk'));
  var RM=window.matchMedia&&matchMedia('(prefers-reduced-motion: reduce)').matches;

    var PAGES=[
    {ch:'Chapter 1 · Distributed Systems',h:'My gut says the network is reliable. The math says otherwise.',cov:['about/covers/kahneman.jpg','Designing Data-Intensive Applications'],
     p:'Kleppmann dissects distributed systems: the fast local call and the messy network check. Networks partition, clocks drift, and System 1 says the message arrived. System 2 verifies the Kafka offset. In distributed computing, assuming reliability without consensus is an illusion.',
     foot:'CAP THEOREM · PARTITION TOLERANCE IS NOT OPTIONAL',link:['View Vaibhav\'s GitHub →','https://github.com/vaibhav2616'],
     say:'System 2 is verifying the Kafka commit log. System 1 is ordering more coffee.'},
    {ch:'Chapter 2 · Clean Architecture',h:'Boundaries protect you from your own database.',cov:['about/covers/silent-patient.jpg','Clean Architecture'],
     p:'Frameworks come and go, but business logic is eternal. I design backend services where core business entities don\'t know whether they\'re talking to PostgreSQL, Kafka, or a CLI harness. Decoupled and testable by design.',
     say:'No framework coupling. Clean Architecture through and through.'},
    {ch:'Chapter 3 · Site Reliability',h:'Hope is not an engineering strategy.',cov:['about/covers/graveyard-shift.jpg','Site Reliability Engineering'],
     p:'Monitoring symptoms over causes, establishing error budgets, and automating alert triage. If an incident requires manual intervention more than twice, you haven\'t fixed the problem—you\'ve created an operational chore.',
     say:'Automate triage with MCP, or get paged at 3 AM. Easy choice.'},
    {ch:'Chapter 4 · Computer Systems',h:'Down into the metal and memory caches.',cov:['about/covers/lightning-thief.jpg','Computer Systems: A Programmer\'s Perspective'],
     p:'From high-level Python and FastAPI down to cache hierarchies, virtual memory, and kernel network sockets. Understanding what happens when bytes hit the NIC card makes every query faster and every service more resilient.',
     say:'L1 cache miss: the ultimate indignity.'},
    {ch:'Chapter 5 · Saarthi (Patent Filed)',h:'<span class="bars">██████ ███ ███ ████</span>',
     p:'Collaborated and led a 4-member team to design and develop an AR/VR-based cultural heritage platform. Showcased at Innotech 2024. Proprietary spatial mapping specs. Ask me in person and I might tell you.',
     say:'Patent filed. Architectural specs classified. Ask him on LinkedIn.'}
  ];

  /* stickers on the back: [picture, x%, y%, width px, rotation, Semi's line] */
    var STICK=[
    ['painting',4,6,118,-7,'reading Kleppmann. respect.'],
    ['service',27,4,104,6,'Kafka events streaming: 0 lag.'],
    ['opossum',50,7,112,-4,"I'm back. Microservices healthy."],
    ['horse',73,4,118,8,"Dockerized, tested, and deployed."],
    ['satan',6,46,110,5,"he'll reply today. usually within an hour."],
    ['cat',29,42,100,-8,"social battery: powered by caffeine."],
    ['misteak',52,46,112,4,'404 caught. Handled via RFC 7807.'],
    ['noai',75,44,106,-6,'he built the CrewAI agents. he still writes clean code.'],
    ['humerus',18,72,98,-3,'Transactional Outbox: zero dual-writes.'],
    ['wtfcat',62,72,104,7,'GATE 2026 Qualified. Computer Science verified.']
  ];

  var sayTimer;
  function semi(text,img){
    if(!text) return;
    var ev=new CustomEvent('semi:say',{detail:{text:text,img:img||''},cancelable:true});
    document.dispatchEvent(ev); if(ev.defaultPrevented) return;
    var b=document.getElementById('semi-say'); if(!b) return;
    b.innerHTML='<small>Semi</small>'+(img?'<img src="'+img+'" alt="">':''); b.append(text);
    b.classList.add('on'); clearTimeout(sayTimer);
    sayTimer=setTimeout(function(){ b.classList.remove('on'); },Math.max(2600,text.length*55));
  }

  /* ---------- pages ---------- */
  var cur=0;
  function render(i){
    var d=PAGES[i];
    var html='<div class="ch"></div><h3>'+d.h+'</h3><p></p>';
    if(d.foot) html+='<div class="foot"><span></span></div>';
    page.innerHTML=html;
    if(d.cov){ var im=new Image(); im.className='pcov'; im.src=d.cov[0]; im.alt='Cover of '+d.cov[1]; page.prepend(im); }
    page.querySelector('.ch').textContent=d.ch;
    page.querySelector('p').textContent=d.p;
    if(d.foot){
      var f=page.querySelector('.foot'); f.querySelector('span').textContent=d.foot;
      if(d.link){ var a=document.createElement('a'); a.href=d.link[1]; a.textContent=d.link[0]; f.appendChild(a); }
    }
    $('#ab2Ch').textContent=d.ch.split(' · ')[1]||'My books';
    $('#ab2No').textContent=(i+1)+' of '+PAGES.length;
  }
  function show(i,fromUser){
    i=(i+PAGES.length)%PAGES.length; cur=i;
    books.forEach(function(b,k){ b.setAttribute('aria-selected',k===i?'true':'false'); b.tabIndex=k===i?0:-1; });
    if(fromUser&&!RM){ screen.classList.remove('flash'); void screen.offsetWidth; screen.classList.add('flash'); setTimeout(function(){ render(i); },110); }
    else render(i);
    if(fromUser&&!heard[i]){ heard[i]=1; semi(PAGES[i].say); }
  }
  var heard={};
  books.forEach(function(b,i){
    b.addEventListener('click',function(){ if(dragged) return; show(i,true); });
    b.addEventListener('keydown',function(e){
      var k=e.key; if(k!=='ArrowDown'&&k!=='ArrowUp'&&k!=='ArrowRight'&&k!=='ArrowLeft') return;
      e.preventDefault(); var n=(i+((k==='ArrowDown'||k==='ArrowRight')?1:-1)+books.length)%books.length; books[n].focus(); show(n,true);
    });
  });
  $('#ab2Up').addEventListener('click',function(){ show(cur-1,true); });
  $('#ab2Down').addEventListener('click',function(){ show(cur+1,true); });

  /* ---------- back stickers ---------- */
  back.insertAdjacentHTML('beforeend',STICK.map(function(s){
    return '<button type="button" class="ab2-pst" data-pic="'+s[0]+'" aria-label="Sticker: '+s[5].replace(/"/g,'&quot;')+'" style="left:'+s[1]+'%;top:'+s[2]+'%;--w:'+s[3]+'px;--rot:'+s[4]+'deg"><img src="img/'+s[0]+'.webp" alt="" loading="lazy"></button>';
  }).join(''));
  back.addEventListener('click',function(e){
    var b=e.target.closest('.ab2-pst'); if(!b||dragged) return;
    var s=STICK.filter(function(x){ return x[0]===b.getAttribute('data-pic'); })[0];
    semi(s[5],'img/'+s[0]+'.webp');
  });

  /* ---------- rotation: moves only while you drag or flip, then rests ---------- */
  var RX=-3, RY=-6;
  var rx=RX, ry=RY, drag=false, dragged=false, x0=0, y0=0, flipped=false, anim=0;
  function apply(){
    kobo.style.setProperty('--rx',rx+'deg'); kobo.style.setProperty('--ry',ry+'deg');
    sheen.style.setProperty('--sheen',(120+ry*1.4)+'deg');
    var away=Math.cos(ry*Math.PI/180)*Math.cos(rx*Math.PI/180)<0;
    front.style.visibility=away?'hidden':'visible'; back.style.visibility=away?'visible':'hidden';
    var b=back.querySelectorAll('.ab2-pst'); for(var i=0;i<b.length;i++) b[i].tabIndex=away?0:-1;
    books.forEach(function(x,k){ x.tabIndex=away?-1:(k===cur?0:-1); });
  }
  function rest(){ return Math.round((ry-RY)/180)*180+RY; }
  function settle(toY,dur){
    cancelAnimationFrame(anim);
    var fy=ry, fx=rx, t0=performance.now(); dur=RM?1:dur;
    (function step(t){
      var p=Math.min(1,(t-t0)/dur), k=1-Math.pow(1-p,3);
      ry=fy+(toY-fy)*k; rx=fx+(RX-fx)*k; apply();
      if(p<1) anim=requestAnimationFrame(step);
    })(t0);
    flipped=Math.cos((toY-RY)*Math.PI/180)<0;
    flipBtn.textContent=flipped?'Back to my books':'Flip it over';
  }
  scene.addEventListener('pointerdown',function(e){
    if(e.target.closest('.ab2-grip button,.ab2-flip,.ab2-page a')) return;
    drag=true; dragged=false; x0=e.clientX; y0=e.clientY;
  });
  addEventListener('pointermove',function(e){
    if(!drag) return;
    var dx=e.clientX-x0, dy=e.clientY-y0;
    if(!dragged&&Math.abs(dx)+Math.abs(dy)>6){ dragged=true; cancelAnimationFrame(anim); scene.classList.add('drag'); }
    if(!dragged) return;
    ry+=dx*.4; rx=Math.max(-35,Math.min(35,rx-dy*.25));
    x0=e.clientX; y0=e.clientY; apply();
  });
  function end(){
    if(!drag) return; drag=false; scene.classList.remove('drag');
    if(dragged){ settle(rest(),450); setTimeout(function(){ dragged=false; },30); }
  }
  addEventListener('pointerup',end); addEventListener('pointercancel',end);

  flipBtn.addEventListener('click',function(){
    var wasFlipped=flipped;
    settle(rest()+180,700);
    if(!wasFlipped) setTimeout(function(){ semi('Every sticker is a reaction. Tap one.'); },RM?0:750);
  });

  apply();
  show(0,false);
})();
