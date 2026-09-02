(() => {
  const originalFetch = window.fetch.bind(window);
  const images = {
    vegSandwich:'https://commons.wikimedia.org/wiki/Special:FilePath/Veg%20sandwich.jpg?width=900',
    eggSandwich:'https://commons.wikimedia.org/wiki/Special:FilePath/Boiled%20Egg%20sandwich.jpg?width=900',
    cornSandwich:'https://cms.disway.id/uploads/999e96e992252c1474dfdd623b2e003b.png',
    vegMaggi:'https://b.zmtcdn.com/data/dish_photos/86b/5421658dc5d801c16594d38ee404d86b.png',
    eggMaggi:'https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/FOOD_CATALOG/IMAGES/CMS/2024/11/16/1640c61c-1fcc-4dbf-b136-6fea4b38d1e7_eda00005-0e21-4e02-ac3e-29695d265057.jpg',
    luchi:'https://indiacuisine.net/cdn/shop/articles/9a867dfbfd39e5bdc9f1211a5cf16d47.jpg?v=1695042968',
    coke:'https://cookinglife.eu/cdn/shop/collections/coca_cola_glazen_transparant.png?v=1765549739',
    masalaCoke:'https://img-global.cpcdn.com/recipes/14d264702dd0090d/680x781cq80/%E0%A4%AE%E0%A4%B8%E0%A4%BE%E0%A4%B2%E0%A4%BE-%E0%A4%95%E0%A5%8B%E0%A4%95-%E0%A4%AA%E0%A5%87%E0%A4%AA%E0%A5%8D%E0%A4%B8%E0%A5%80-masala-cokepepsi-recipe-in-hindi-%E0%A4%B0%E0%A4%BF%E0%A4%B8%E0%A4%BF%E0%A4%AA%E0%A5%80-%E0%A4%AE%E0%A5%81%E0%A4%96%E0%A5%8D%E0%A4%AF-%E0%A4%A4%E0%A4%B8%E0%A5%8D%E0%A4%B5%E0%A5%80%E0%A4%B0.jpg',
    mojito:'https://img-global.cpcdn.com/recipes/1a80d4c06bcc1d47/680x781cq80/%E0%A4%B9%E0%A4%BE%E0%A4%9C%E0%A4%AE%E0%A5%8B%E0%A4%B2%E0%A4%BE-%E0%A4%AE%E0%A5%8B%E0%A4%9C%E0%A4%BF%E0%A4%9F%E0%A5%8B-hajmola-mojito-%E0%A4%B0%E0%A4%B8%E0%A4%BF%E0%A4%AA%E0%A5%80-%E0%A4%AE%E0%A5%81%E0%A4%96%E0%A5%8D%E0%A4%AF-%E0%A4%A4%E0%A4%B8%E0%A5%8D%E0%A4%B5%E0%A5%80%E0%A4%B0.jpg',
    chickenMomo:'https://backoffice.thenews24.com/media/imgAll/2024December/chicken-momo-1733728776.jpg',
    vegMomo:'https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_300,h_300,c_fit/iddsrspf3kzqxzaelkgt',
    friedChickenMomo:'https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/FOOD_CATALOG/IMAGES/CMS/2025/12/18/7bb4d428-0b99-44b7-9f7e-72a663107e98_6f4e3a18-885f-409c-b9be-41c501fe4e65.jpg',
    friedVegMomo:'https://cdn.dotpe.in/longtail/store-items/8635073/AbttIRAW.webp',
    chilliChicken:'https://theyummydelights.com/wp-content/uploads/2025/06/chilli-chicken-gravy-recipe.jpg',
    chilliPaneer:'https://coox-new.s3.ap-south-1.amazonaws.com/images/d/dishes/Chilli%20Paneer%20%28Gravy%29-2-dish-img.jpeg?v=1734069007793',
    chickenKosha:'https://rumkisgoldenspoon.com/wp-content/uploads/2023/05/Chicken-kosha-recipe.jpg',
    paneerButter:'https://media-assets.swiggy.com/swiggy/image/upload/f_auto,q_auto,fl_lossy/fkcqxpenrn2uz9trgqgj',
    dumAloo:'https://rshop.rweb-images.com/270d1xhO1j2WaVhL8Dc0LCZoHx0%3D/0f5ca6fc8fd64574aba92c65d598af85',
    vegRice:'https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_300,h_300,c_fit/ly6vqjwnjrd3dxbqmdlf',
    eggRice:'https://www.cookerru.com/wp-content/uploads/2022/07/egg-fried-rice-main-preview.jpg',
    pulao:'https://img-global.cpcdn.com/recipes/0befdd14798c9d51/680x781cq80/%E0%A6%AC%E0%A6%BE%E0%A6%B8%E0%A6%A8%E0%A7%8D%E0%A6%A4%E0%A6%BF-%E0%A6%AA%E0%A7%8B%E0%A6%B2%E0%A6%BE%E0%A6%93-basanti-pulao-recipe-in-bengali-%E0%A6%B0%E0%A6%BF%E0%A6%B8%E0%A6%BF%E0%A6%AA%E0%A6%BF%E0%A6%B0-%E0%A6%AA%E0%A6%B0%E0%A6%BF%E0%A6%A7%E0%A6%BE%E0%A6%A8-%E0%A6%9B%E0%A6%AC%E0%A6%BF.jpg',
    vegNoodles:'https://images.unsplash.com/photo-1612929633738-8fe44f7ec841?auto=format&fit=crop&w=900&q=85',
    eggNoodles:'https://146900373.cdn6.editmysite.com/uploads/1/4/6/9/146900373/BZEH6G2D763JP3PHCJ24SAJP.jpeg',
    chickenRiceCombo:'https://bint.com.au/wp-content/uploads/2021/11/DSC_0981-1-scaled.jpg',
    paneerRiceCombo:'https://dukaan.b-cdn.net/1000x1000/webp/132849/a2f47377-d173-4b5e-95cc-677cbe1164a6.png'
  };
  const choose = m => {
    const s=String(m.name||'').toLowerCase();
    if(s==='veg sandwich')return images.vegSandwich;
    if(s==='egg sandwich')return images.eggSandwich;
    if(s==='corn sandwich')return images.cornSandwich;
    if(s==='veggies maggi')return images.vegMaggi;
    if(s==='egg fried maggi')return images.eggMaggi;
    if(s==='luchi and dum aloo')return images.luchi;
    if(s==='coke')return images.coke;
    if(s==='masala coke')return images.masalaCoke;
    if(s==='hajmola mojito')return images.mojito;
    if(/chicken momo.*steamed/.test(s))return images.chickenMomo;
    if(/chicken momo.*fried/.test(s))return images.friedChickenMomo;
    if(/veg momo.*steamed/.test(s))return images.vegMomo;
    if(/veg momo.*fried/.test(s))return images.friedVegMomo;
    if(/chilli chicken/.test(s))return images.chilliChicken;
    if(/chilli paneer/.test(s))return images.chilliPaneer;
    if(/chicken kosha/.test(s))return images.chickenKosha;
    if(/paneer butter masala/.test(s))return images.paneerButter;
    if(/dum aloo/.test(s))return images.dumAloo;
    if(/egg fried rice/.test(s))return images.eggRice;
    if(/veg fried rice/.test(s))return images.vegRice;
    if(/basanti pulao/.test(s))return images.pulao;
    if(/egg noodles/.test(s))return images.eggNoodles;
    if(/veg noodles/.test(s))return images.vegNoodles;
    if(/chinese combo 1|chinese combo 3/.test(s))return images.chickenRiceCombo;
    if(/chinese combo 2/.test(s))return images.paneerRiceCombo;
    if(/mini combo 1|mini combo 3/.test(s))return images.chickenRiceCombo;
    if(/mini combo 2/.test(s))return images.paneerRiceCombo;
    if(/mini combo 4/.test(s))return images.dumAloo;
    if(/mini combo 5/.test(s))return images.chickenKosha;
    if(/mini combo 6/.test(s))return images.chickenKosha;
    if(/indian combo 1/.test(s))return images.chickenKosha;
    if(/indian combo 2/.test(s))return images.dumAloo;
    if(/indian combo 3/.test(s))return images.paneerButter;
    if(/platter/.test(s))return /noodle/.test(s)?images.eggNoodles:images.chickenRiceCombo;
    return images.vegRice;
  };
  window.fetch=async(...args)=>{
    const response=await originalFetch(...args);
    const url=typeof args[0]==='string'?args[0]:(args[0]?.url||'');
    if(!url.includes('/api/menu'))return response;
    try{
      const data=await response.clone().json();
      data.forEach(m=>{m.image=choose(m);});
      return new Response(JSON.stringify(data),{status:response.status,statusText:response.statusText,headers:{'Content-Type':'application/json','Cache-Control':'no-store'}});
    }catch(_){return response;}
  };
})();