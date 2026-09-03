(()=>{
 const style=document.createElement('style');
 style.textContent=`
 .topbar{height:86px!important;padding:8px 3vw!important;background:rgba(5,6,6,.97)!important;border-bottom:1px solid #383838!important;box-shadow:0 8px 24px #0008!important;gap:18px!important}
 .brand-wrap{height:68px;padding:3px 10px 3px 4px;border:1px solid #383838;border-radius:10px;background:#0c0d0d;transition:.2s}
 .brand-wrap:hover{border-color:#ffc400;transform:translateY(-1px)}
 .nav-chef{width:50px!important;height:60px!important;background:#0c0d0d!important;border-radius:7px!important}
 .brand-logo{width:190px!important;height:60px!important}
 .topbar nav{gap:8px!important;justify-content:center!important}
 .topbar nav a{padding:11px 13px;border-radius:7px;font:700 13px Oswald;letter-spacing:1px;color:#ddd;transition:.2s}
 .topbar nav a:hover,.topbar nav .nav-active{background:#ffc400;color:#111!important}
 .nav-active:after{display:none!important}
 .header-actions{align-items:center!important;gap:8px!important}
 .phone-btn,.cart-btn{height:46px!important;border-radius:9px!important;border:1px solid #ffc400!important;background:#0b0c0c!important}
 .phone-btn{font-size:13px!important;padding:0 12px!important}
 .cart-btn{font-size:13px!important;padding:0 11px!important}
 .admin-link{font:600 12px Oswald!important;color:#aaa!important;padding:8px!important}
 .mobile-menu-btn{display:none;background:#0b0c0c;color:#fff;border:1px solid #ffc400;border-radius:8px;width:43px;height:43px;font-size:23px;line-height:1}
 .mobile-nav{display:none}
 @media(max-width:1100px){.brand-logo{width:155px!important}.brand-wrap{gap:5px}.topbar nav{gap:2px!important}.topbar nav a{padding:10px 8px;font-size:12px}.phone-btn span{display:none}.phone-btn{width:42px;padding:0!important}}
 @media(max-width:760px){
  .topbar{height:68px!important;padding:6px 10px!important;gap:6px!important}
  .brand-wrap{height:54px;padding:2px 5px 2px 2px;gap:4px;border-radius:8px}
  .nav-chef{width:38px!important;height:48px!important}
  .brand-logo{width:112px!important;height:48px!important}
  .topbar nav,.phone-btn,.admin-link{display:none!important}
  .header-actions{margin-left:auto;gap:6px!important}
  .cart-btn{height:42px!important;padding:0 8px!important;font-size:12px!important}
  .mobile-menu-btn{display:block}
  .mobile-nav{position:absolute;top:68px;left:8px;right:8px;display:flex;flex-direction:column;background:#0b0c0c;border:1px solid #444;border-top:2px solid #ffc400;border-radius:0 0 10px 10px;overflow:hidden;max-height:0;opacity:0;pointer-events:none;transition:max-height .25s,opacity .2s}
  .mobile-nav.open{max-height:310px;opacity:1;pointer-events:auto}
  .mobile-nav a{padding:15px 18px;border-bottom:1px solid #292929;font:700 15px Oswald;letter-spacing:1px}
  .mobile-nav a:last-child{border-bottom:0}.mobile-nav a:hover,.mobile-nav a.nav-active{background:#ffc400;color:#111}
 }
 `;document.head.appendChild(style);
 const header=document.querySelector('.topbar'); if(!header)return;
 const actions=header.querySelector('.header-actions');
 const btn=document.createElement('button');btn.className='mobile-menu-btn';btn.id='mobileMenuBtn';btn.setAttribute('aria-label','Open menu');btn.textContent='☰';
 actions.appendChild(btn);
 const mobile=document.createElement('nav');mobile.className='mobile-nav';mobile.id='mobileNav';
 mobile.innerHTML='<a class="nav-active" href="#home">HOME</a><a href="#menu">MENU</a><a href="#combos">COMBOS</a><a href="#about">ABOUT US</a><a href="#contact">CONTACT</a>';
 header.appendChild(mobile);
 btn.onclick=()=>{mobile.classList.toggle('open');btn.textContent=mobile.classList.contains('open')?'×':'☰'};
 mobile.querySelectorAll('a').forEach(a=>a.onclick=()=>{mobile.classList.remove('open');btn.textContent='☰';mobile.querySelectorAll('a').forEach(x=>x.classList.remove('nav-active'));a.classList.add('nav-active')});
})();
