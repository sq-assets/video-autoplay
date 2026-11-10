(()=>{
  const VISIBLE=.6;
  const sections=()=>[...document.querySelectorAll('section.page-section')]
    .filter(s=>getComputedStyle(s).getPropertyValue('--video-autoplay').trim()==='1');
  const seen=new WeakSet(),inView=new Set();
  const prep=v=>{
    v.muted=true;v.defaultMuted=true;v.playsInline=true;v.loop=true;v.autoplay=false;
    v.setAttribute('muted','');v.setAttribute('playsinline','');v.setAttribute('webkit-playsinline','');
    v.removeAttribute('autoplay');v.setAttribute('loop','');
    if(v.preload==='none')v.preload='metadata';
  };
  const play=v=>{prep(v);const p=v.play();if(p&&p.catch)p.catch(()=>{});};
  const io=new IntersectionObserver(entries=>entries.forEach(en=>{
    const v=en.target;
    if(en.isIntersecting){
      if(!inView.has(v)){try{v.currentTime=0}catch(e){}}
      inView.add(v);play(v);
    }else{inView.delete(v);v.pause();}
  }),{threshold:VISIBLE});
  const scan=()=>sections().forEach(s=>s.querySelectorAll('video').forEach(v=>{
    if(seen.has(v))return;
    seen.add(v);prep(v);v.pause();io.observe(v);
    v.addEventListener('pause',()=>{if(inView.has(v)&&!document.hidden)setTimeout(()=>play(v),300)});
  }));
  const kick=()=>inView.forEach(play);
  ['touchend','click','keydown'].forEach(ev=>addEventListener(ev,kick,{passive:true}));
  document.addEventListener('visibilitychange',()=>{if(!document.hidden)kick()});
  scan();
  addEventListener('load',scan);
  let t;
  new MutationObserver(()=>{clearTimeout(t);t=setTimeout(scan,250)}).observe(document.body,{childList:true,subtree:true});
})();
