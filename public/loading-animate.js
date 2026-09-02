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
    @media(max-width:760px){
      html,body{width:100%;max-width:100%;overflow-x:hidden}
      .topbar{width:100%;box-sizing:border-box;padding:8px 12px;gap:8px;display:flex;align-items:center;overflow:hidden}
      .brand-wrap{flex:1 1 auto!important;min-width:0!important;width:auto!important;gap:6px!important;overflow:hidden}
      .nav-chef{width:42px!important;height:52px!important;flex:0 0 42px!important;object-fit:contain!important;border-radius:6px!important}
      .brand-logo{width:125px!important;height:50px!important;flex:0 0 125px!important}
      .topbar nav{display:none!important}
      .header-actions{display:flex!important;flex:0 0 auto!important;gap:6px!important;align-items:center}
      .phone-btn,.admin-link{display:none!important}
      .cart-btn{white-space:nowrap!important;padding:10px 12px!important;font-size:14px!important;min-width:0!important}
      .cart-btn span{display:inline-flex!important}
      .hero{width:100%!important;box-sizing:border-box!important;overflow:hidden!important;padding-left:18px!important;padding-right:18px!important}
      .hero-copy{width:100%!important;max-width:100%!important;box-sizing:border-box!important;overflow:hidden!important}
      .hero h1{font-size:clamp(56px,17vw,100px)!important;line-height:.88!important;word-break:normal!important}
      .hero-subtitle{font-size:clamp(28px,8vw,54px)!important;white-space:normal!important}
      .hero-actions{width:100%!important;box-sizing:border-box!important}
      .hero-actions>*{max-width:100%!important;box-sizing:border-box!important}
      .menu-section,.benefits,.contact,.combo-banner{max-width:100%!important;box-sizing:border-box!important;overflow:hidden!important}
      .menu-grid{grid-template-columns:repeat(2,minmax(0,1fr))!important}
      .section-title h2{font-size:clamp(30px,9vw,52px)!important}
    }
  `;
  document.head.appendChild(css);

  // Use the valid JPEG chef asset; the old WebP asset was visibly corrupted on mobile.
  const fixChef = () => {
    document.querySelectorAll('img.nav-chef').forEach(img => {
      const good='/assets/hungry-buddy-chef.jpg?v=4';
      if (!img.src.includes('hungry-buddy-chef.jpg')) img.src=good;
    });
  };
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',fixChef,{once:true});
  else fixChef();

  const loader=document.createElement('div');
  loader.id='hb-loader';
  loader.innerHTML='<div class="hb-loader-inner"><div class="hb-loader-brand"><span>HUNGRY</span><span>BUDDY</span></div><div class="hb-loader-sub">The Cloud Kitchen</div><div class="hb-loader-line"></div></div>';
  document.body.prepend(loader);
  window.addEventListener('load',()=>setTimeout(()=>loader.classList.add('hide'),1400),{once:true});
  setTimeout(()=>loader.classList.add('hide'),3200);
})();
