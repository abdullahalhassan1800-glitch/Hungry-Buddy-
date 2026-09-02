const express = require("express");
const Database = require("better-sqlite3");
const crypto = require("crypto");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "admin123";
const db = new Database(process.env.DB_FILE || path.join(__dirname, "hungry-buddy.db"));

db.pragma("journal_mode = WAL");
db.exec(`
CREATE TABLE IF NOT EXISTS menu (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  category TEXT NOT NULL,
  description TEXT DEFAULT '',
  price INTEGER NOT NULL,
  veg INTEGER DEFAULT 1,
  available INTEGER DEFAULT 1,
  image TEXT DEFAULT '',
  created_at TEXT DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE IF NOT EXISTS orders (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  customer_name TEXT NOT NULL,
  phone TEXT NOT NULL,
  address TEXT NOT NULL,
  notes TEXT DEFAULT '',
  payment_method TEXT NOT NULL,
  subtotal INTEGER NOT NULL,
  delivery_charge INTEGER NOT NULL,
  total INTEGER NOT NULL,
  status TEXT NOT NULL DEFAULT 'NEW',
  items_json TEXT NOT NULL,
  created_at TEXT DEFAULT CURRENT_TIMESTAMP
);
`);

const count = db.prepare("SELECT COUNT(*) AS c FROM menu").get().c;
if (!count) {
  const seed = [
    ["Veg Sandwich","Breakfast","Fresh veg sandwich",69,1],
    ["Egg Sandwich","Breakfast","Egg sandwich",79,0],
    ["Corn Sandwich","Breakfast","Corn sandwich",99,1],
    ["Veggies Maggi","Breakfast","Classic veggie Maggi",59,1],
    ["Egg Fried Maggi","Breakfast","Egg tossed Maggi",69,0],
    ["Luchi & Dum Aloo","Breakfast","Soft luchi with dum aloo",79,1],
    ["Coke","Drinks","Chilled soft drink",25,1],
    ["Masala Coke","Drinks","Masala Coke",50,1],
    ["Hajmola Mojito","Drinks","Refreshing mojito",60,1],
    ["Rice Platter 1","Rice Platters","Veg fried rice + chilli chicken (2pc) + chicken momo (2pc) + soft drink",169,0],
    ["Rice Platter 2","Rice Platters","Veg fried rice + chilli paneer (2pc) + veg momo (2pc) + soft drink",169,1],
    ["Rice Platter 3","Rice Platters","Egg fried rice + chilli paneer (2pc) + veg momo (2pc) + soft drink",179,0],
    ["Rice Platter 4","Rice Platters","Egg fried rice + chilli chicken (2pc) + chicken momo (2pc) + soft drink",179,0],
    ["Noodles Platter 1","Noodles Platters","Veg noodles + chilli chicken (2pc) + chicken momo (2pc) + soft drink",149,0],
    ["Noodles Platter 2","Noodles Platters","Egg noodles + chilli chicken (2pc) + chicken momo (2pc) + soft drink",159,0],
    ["Noodles Platter 3","Noodles Platters","Veg noodles + chilli paneer (2pc) + veg momo (2pc) + soft drink",149,1],
    ["Noodles Platter 4","Noodles Platters","Egg noodles + chilli paneer (2pc) + veg momo (2pc) + soft drink",159,0],
    ["Chicken Momo - Steamed (6pc)","Momos","Steamed chicken momo",89,0],
    ["Chicken Momo - Fried (5pc)","Momos","Fried chicken momo",99,0],
    ["Veg Momo - Steamed (6pc)","Momos","Steamed veg momo",79,1],
    ["Veg Momo - Fried (5pc)","Momos","Fried veg momo",89,1],
    ["Chinese Combo 1","Large Combos","Veg fried rice + chilli chicken (4pc) with soft drink",149,0],
    ["Chinese Combo 2","Large Combos","Veg fried rice + chilli paneer (4pc) with soft drink",149,1],
    ["Chinese Combo 3","Large Combos","Egg fried rice + chilli chicken (4pc) with soft drink",169,0],
    ["Indian Combo 1","Large Combos","Basanti pulao + chicken kosha (2pcs) with soft drink",219,0],
    ["Indian Combo 2","Large Combos","Basanti pulao + dum aloo with soft drink",129,1],
    ["Indian Combo 3","Large Combos","Basanti pulao + paneer butter masala with soft drink",199,1],
    ["Mini Combo 1","Mini Combos","Veg fried rice + chilli chicken (2pc)",119,0],
    ["Mini Combo 2","Mini Combos","Veg fried rice + chilli paneer (2pc)",119,1],
    ["Mini Combo 3","Mini Combos","Egg fried rice + chilli chicken (2pc)",129,0],
    ["Mini Combo 4","Mini Combos","Basanti pulao + dum aloo",119,1],
    ["Mini Combo 5","Mini Combos","Basanti pulao + chicken kosha (2pc)",149,0],
    ["Mini Combo 6","Mini Combos","Veg fried rice + chicken kosha (2pc)",139,0],
    ["Chilli Chicken - Gravy (8pc)","Main Course","Spicy chilli chicken",199,0],
    ["Chilli Paneer - Gravy (6pc)","Main Course","Chilli paneer in gravy",179,1],
    ["Chicken Kosha (4pc)","Main Course","Bengali-style chicken kosha",179,0],
    ["Paneer Butter Masala","Main Course","Creamy paneer curry",169,1],
    ["Dum Aloo","Main Course","Spiced potato curry",69,1],
    ["Veg Fried Rice","Rice & Noodles","Classic veg fried rice",149,1],
    ["Egg Fried Rice","Rice & Noodles","Egg fried rice",169,0],
    ["Basanti Pulao","Rice & Noodles","Aromatic basanti pulao",199,1],
    ["Veg Noodles","Rice & Noodles","Stir-fried veg noodles",89,1],
    ["Egg Noodles","Rice & Noodles","Egg noodles",109,0]
  ];
  const ins = db.prepare("INSERT INTO menu (name,category,description,price,veg) VALUES (?,?,?,?,?)");
  const tx = db.transaction(rows => rows.forEach(r => ins.run(...r)));
  tx(seed);
}

app.use(express.json({limit: "1mb"}));
app.use(express.static(path.join(__dirname, "public")));

const sessions = new Set();
const requireAdmin = (req,res,next) => {
  const token = req.headers.authorization?.replace("Bearer ","");
  if (!token || !sessions.has(token)) return res.status(401).json({error:"Admin login required"});
  next();
};

app.get("/api/menu", (req,res) => {
  const rows = db.prepare("SELECT * FROM menu WHERE available=1 ORDER BY category, id").all();
  res.json(rows);
});

app.post("/api/admin/login", (req,res) => {
  if (req.body?.password !== ADMIN_PASSWORD) return res.status(401).json({error:"Invalid password"});
  const token = crypto.randomBytes(24).toString("hex");
  sessions.add(token);
  res.json({token});
});

app.get("/api/admin/menu", requireAdmin, (req,res) => {
  res.json(db.prepare("SELECT * FROM menu ORDER BY category, id").all());
});

app.post("/api/admin/menu", requireAdmin, (req,res) => {
  const {name, category, description="", price, veg=1, available=1, image=""} = req.body || {};
  if (!name || !category || !Number.isFinite(Number(price))) return res.status(400).json({error:"Name, category and price are required"});
  const info = db.prepare("INSERT INTO menu (name,category,description,price,veg,available,image) VALUES (?,?,?,?,?,?,?)")
    .run(name.trim(), category.trim(), description.trim(), Math.round(Number(price)), veg?1:0, available?1:0, image.trim());
  res.json(db.prepare("SELECT * FROM menu WHERE id=?").get(info.lastInsertRowid));
});

app.put("/api/admin/menu/:id", requireAdmin, (req,res) => {
  const {name, category, description="", price, veg=1, available=1, image=""} = req.body || {};
  if (!name || !category || !Number.isFinite(Number(price))) return res.status(400).json({error:"Name, category and price are required"});
  db.prepare("UPDATE menu SET name=?,category=?,description=?,price=?,veg=?,available=?,image=? WHERE id=?")
    .run(name.trim(), category.trim(), description.trim(), Math.round(Number(price)), veg?1:0, available?1:0, image.trim(), req.params.id);
  res.json(db.prepare("SELECT * FROM menu WHERE id=?").get(req.params.id));
});

app.delete("/api/admin/menu/:id", requireAdmin, (req,res) => {
  db.prepare("DELETE FROM menu WHERE id=?").run(req.params.id);
  res.json({ok:true});
});

app.post("/api/orders", (req,res) => {
  const {customer_name, phone, address, notes="", payment_method="COD", items=[]} = req.body || {};
  if (!customer_name || !phone || !address || !Array.isArray(items) || !items.length) {
    return res.status(400).json({error:"Please provide name, phone, address and at least one item"});
  }
  const ids = items.map(x => Number(x.id)).filter(Boolean);
  const menuRows = db.prepare(`SELECT * FROM menu WHERE id IN (${ids.map(()=>"?").join(",")}) AND available=1`).all(...ids);
  const map = new Map(menuRows.map(x => [x.id,x]));
  let subtotal = 0;
  const normalized = [];
  for (const item of items) {
    const m = map.get(Number(item.id));
    const qty = Math.max(1, Math.min(50, Number(item.qty)||1));
    if (!m) continue;
    subtotal += m.price * qty;
    normalized.push({id:m.id,name:m.name,price:m.price,qty});
  }
  if (!normalized.length) return res.status(400).json({error:"No valid menu items"});
  const delivery = subtotal >= 199 ? 0 : 30;
  const total = subtotal + delivery;
  const info = db.prepare(`
    INSERT INTO orders (customer_name,phone,address,notes,payment_method,subtotal,delivery_charge,total,items_json)
    VALUES (?,?,?,?,?,?,?,?,?)
  `).run(customer_name.trim(), phone.trim(), address.trim(), notes.trim(), payment_method, subtotal, delivery, total, JSON.stringify(normalized));
  res.json({orderId: info.lastInsertRowid, subtotal, delivery_charge:delivery, total});
});

app.get("/api/admin/orders", requireAdmin, (req,res) => {
  const rows = db.prepare("SELECT * FROM orders ORDER BY id DESC").all();
  res.json(rows.map(r => ({...r, items: JSON.parse(r.items_json)})));
});

app.patch("/api/admin/orders/:id", requireAdmin, (req,res) => {
  const allowed = ["NEW","CONFIRMED","PREPARING","OUT_FOR_DELIVERY","DELIVERED","CANCELLED"];
  const status = String(req.body?.status||"");
  if (!allowed.includes(status)) return res.status(400).json({error:"Invalid status"});
  db.prepare("UPDATE orders SET status=? WHERE id=?").run(status, req.params.id);
  res.json({ok:true});
});

app.get("/api/admin/stats", requireAdmin, (req,res) => {
  const today = db.prepare("SELECT COUNT(*) c, COALESCE(SUM(total),0) revenue FROM orders WHERE date(created_at)=date('now','localtime') AND status!='CANCELLED'").get();
  const all = db.prepare("SELECT COUNT(*) c, COALESCE(SUM(total),0) revenue FROM orders WHERE status!='CANCELLED'").get();
  const pending = db.prepare("SELECT COUNT(*) c FROM orders WHERE status IN ('NEW','CONFIRMED','PREPARING','OUT_FOR_DELIVERY')").get();
  res.json({today, all, pending});
});

app.use((req,res) => res.sendFile(path.join(__dirname,"public","index.html")));

app.listen(PORT, () => console.log(`Hungry Buddy running at http://localhost:${PORT}`));
