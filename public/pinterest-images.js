(() => {
  const originalFetch = window.fetch.bind(window);
  const pin = p => `https://i.pinimg.com/736x/${p}.jpg`;
  const pinterestPhotos = {
    burger: pin('46/3b/06/463b063a9b49ab64371bcb56893dc145'),
    food: pin('60/8e/a9/608ea9105ce38e4a7fa87cea58509434'),
    chicken: pin('83/fe/4f/83fe4fb43c158ba1af17ba351c06fe22'),
    rice: pin('98/b5/7d/98b57d22a34149bbccc03e2a230ca12c'),
    fries: pin('e9/ae/21/e9ae21285ac95d27ce75fba26c5e6c7d'),
    food2: pin('9e/1e/a1/9e1ea13824cf132a3582ef2982d8860f')
  };
  const choose = m => {
    const s = `${m.name || ''} ${m.category || ''}`.toLowerCase();
    if (/burger/.test(s)) return pinterestPhotos.burger;
    if (/momo|dumpling/.test(s)) return pinterestPhotos.food;
    if (/chicken|kosha/.test(s)) return pinterestPhotos.chicken;
    if (/rice|pulao|platter/.test(s)) return pinterestPhotos.rice;
    if (/maggi|noodle/.test(s)) return pinterestPhotos.food2;
    if (/sandwich/.test(s)) return pinterestPhotos.food;
    if (/pizza/.test(s)) return pinterestPhotos.food2;
    if (/coke|drink|beverage|mojito|juice/.test(s)) return pinterestPhotos.food;
    return pinterestPhotos.food;
  };
  window.fetch = async (...args) => {
    const response = await originalFetch(...args);
    const url = typeof args[0] === 'string' ? args[0] : (args[0]?.url || '');
    if (!url.includes('/api/menu')) return response;
    try {
      const data = await response.clone().json();
      data.forEach(m => { if (!m.image) m.image = choose(m); });
      return new Response(JSON.stringify(data), {
        status: response.status,
        statusText: response.statusText,
        headers: {'Content-Type': 'application/json'}
      });
    } catch (_) { return response; }
  };
})();
