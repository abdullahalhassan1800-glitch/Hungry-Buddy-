# Hungry Buddy — The Cloud Kitchen

A full-stack restaurant ordering website for **Hungry Buddy, Asansol | Burnpur**.

## Included

- Customer-facing responsive website
- Menu categories and search/filter style navigation
- Cart with quantity controls
- Checkout form
- Order collection stored in SQLite
- Delivery charge: ₹30 below ₹199; FREE at ₹199+
- Cash on Delivery / UPI on delivery option
- Admin login
- Admin dashboard with order stats
- Order status updates
- Add / edit / hide / delete menu items
- Supplied Hungry Buddy menu posters included as website assets
- Seed menu based on the supplied posters

## Run locally

1. Install Node.js 18+.
2. Open this folder in a terminal.
3. Run:

```bash
npm install
npm start
```

4. Open `http://localhost:3000`

Default admin password is `admin123`.

For production, set a strong password:

```bash
ADMIN_PASSWORD="your-strong-password" npm start
```

The SQLite database is created automatically as `hungry-buddy.db`.

## Production notes

This is a real backend-backed order system, not just a visual mockup. To make it public, deploy the Node app on a host that supports persistent disk/SQLite (for example a VPS or a platform with persistent storage).

For a production launch, also add:
- HTTPS
- a strong admin password/secret
- automated database backups
- WhatsApp/SMS order notifications
- online payment gateway (Razorpay/UPI) if required
- delivery-area / pincode validation
- image uploads for menu items
- proper admin user accounts instead of a single password

The business phone in the site is 7003371476, matching the supplied menu artwork.
