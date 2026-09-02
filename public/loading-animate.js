(() => {
  const css = document.createElement('style');
  css.textContent = `
    #hb-loader{position:fixed;inset:0;z-index:99999;background:#070808;display:grid;place-items:center;transition:opacity .6s ease,visibility .6s ease}
    #hb-loader.hide{opacity:0;visibility:hidden}
    .hb-loader-inner{text-align:center;padding:24px}
    .hb-loader-brand{font:800 clamp(56px,11vw,118px)/.82 Oswald,sans-serif;letter-spacing:2px;color:#f7f5ee;text-transform:uppercase;overflow:hidden}
    .hb-loader-brand span{display:block;opacity:0;transform:translateY(100%);animation:hbTextIn .75s cubic-bezier(.2,.8,.2,1) forwards}
    .hb-loader-brand span:nth-child(2){color:#ffc400;animation-delay:.16s}
    .hb-loader-sub{margin-top:18px;color:#ffc400;font:30px 'Permanent Marker',cursive;opacity:0;animation:hbFade .7s ease .48s forwards}
    .hb-loader-line{width:150px;height:3px;background:#ffc400;margin:22px auto 0;transform:scaleX(0);transform-origin:center;animation:hbLine .65s ease .62s forwards}
    @keyframes hbTextIn{to{opacity:1;transform:translateY(0)}}
    @keyframes hbFade{to{opacity:1}}
    @keyframes hbLine{to{transform:scaleX(1)}}
    @media(prefers-reduced-motion:reduce){.hb-loader-brand span,.hb-loader-sub,.hb-loader-line{animation:none;opacity:1;transform:none}}
  `;
  document.head.appendChild(css);
  const loader=document.createElement('div');
  loader.id='hb-loader';
  loader.innerHTML='<div class="hb-loader-inner"><div class="hb-loader-brand"><span>HUNGRY</span><span>BUDDY</span></div><div class="hb-loader-sub">The Cloud Kitchen</div><div class="hb-loader-line"></div></div>';
  document.body.prepend(loader);
  window.addEventListener('load',()=>setTimeout(()=>loader.classList.add('hide'),1400),{once:true});
  setTimeout(()=>loader.classList.add('hide'),3200);
})();
