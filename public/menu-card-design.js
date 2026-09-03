(() => {
  const css = `
  .menu-grid{grid-template-columns:repeat(4,minmax(0,1fr));gap:22px;align-items:stretch}
  .menu-card{position:relative;min-height:355px;padding:0 15px 16px;overflow:hidden;background:linear-gradient(160deg,#171918 0%,#0c0e0d 72%);border:1px solid #363936;border-radius:18px;box-shadow:0 10px 0 #000,0 0 22px #0007;transition:transform .22s ease,box-shadow .22s ease,border-color .22s ease}
  .menu-card:before{content:'';position:absolute;left:0;right:0;top:0;height:4px;background:#ffc400;opacity:.9}
  .menu-card:hover{transform:translateY(-7px);border-color:#ffc400;box-shadow:0 15px 0 #000,0 0 28px #ffc40022}
  .menu-card .food-wrap{height:190px;margin:0 -15px 12px;display:flex;align-items:center;justify-content:center;overflow:hidden;background:radial-gradient(circle at 50% 45%,#2a2d2a 0%,#111312 58%,#0a0b0b 100%);border-bottom:1px solid #343634;position:relative}
  .menu-card .food-wrap:after{content:'';position:absolute;inset:auto 16% 10px;height:18px;border-radius:50%;background:#0008;filter:blur(8px)}
  .menu-card .food-img{position:relative;z-index:1;width:88%;height:175px;object-fit:contain;filter:drop-shadow(0 12px 9px #000);order:initial;transition:transform .25s ease}
  .menu-card:hover .food-img{transform:scale(1.06)}
  .menu-card .tag{display:inline-block;align-self:center;padding:4px 9px;border:1px solid #6e5c00;border-radius:99px;background:#171714;color:#ffc400;font:700 10px Oswald;letter-spacing:1.5px;text-transform:uppercase}
  .menu-card h3{font:700 21px Oswald;margin:10px 0 5px;line-height:1.15;text-transform:uppercase;letter-spacing:.3px}
  .menu-card p{display:block;color:#8f9490;font-size:11px;line-height:1.35;min-height:30px;margin:0 0 8px}
  .price-row{margin-top:auto;display:grid;grid-template-columns:auto 1fr;grid-template-areas:'price veg' 'add add';align-items:center;gap:8px}
  .price{grid-area:price;width:auto;font:800 24px Oswald;color:#ffc400;text-align:left}
  .veg{grid-area:veg;justify-self:end;font-size:9px;border-radius:99px;padding:4px 7px}
  .add{grid-area:add;width:100%;padding:10px 12px;border:1px solid #ffc400;border-radius:7px;background:#ffc400;color:#111;font:800 13px Oswald;letter-spacing:.3px;transition:.18s}
  .add:hover{background:#111;color:#ffc400}
  @media(max-width:1100px){.menu-grid{grid-template-columns:repeat(3,minmax(0,1fr))}}
  @media(max-width:760px){.menu-grid{grid-template-columns:repeat(2,minmax(0,1fr));gap:12px}.menu-card{min-height:310px;padding:0 10px 11px;border-radius:14px}.menu-card .food-wrap{height:135px;margin:0 -10px 9px}.menu-card .food-img{height:125px;width:92%}.menu-card h3{font-size:16px;margin:8px 0 4px}.menu-card p{font-size:9px;min-height:25px}.menu-card .tag{font-size:8px;padding:3px 6px}.price{font-size:20px}.add{font-size:10px;padding:8px 5px}.veg{font-size:8px;padding:3px 5px}}
  `;
  const s=document.createElement('style');s.id='menu-card-design';s.textContent=css;document.head.appendChild(s);
})();
