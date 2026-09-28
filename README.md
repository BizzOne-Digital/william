# Intense Dropz

Premium ecommerce storefront and admin portal in a **single Next.js App Router** project (TypeScript, Tailwind CSS, MongoDB Atlas, Cloudinary).

## Stack

- **Next.js** (App Router) — storefront, API routes, admin UI
- **MongoDB Atlas** + **Mongoose**
- **Auth.js (NextAuth v5)** — admin sessions, secure cookies
- **Cloudinary** — product image uploads
- **Stripe** (optional, behind env flags) — checkout + webhooks

## Local setup

1. **Install dependencies**

   ```bash
   npm install
   ```

2. **Environment**

   Copy `.env.example` to `.env.local` and fill in values:

   - `MONGODB_URI` — MongoDB Atlas connection string
   - `AUTH_SECRET` — random secret (`openssl rand -base64 32`)
   - `AUTH_URL` / `NEXT_PUBLIC_SITE_URL` — e.g. `http://localhost:3000`

3. **Create the first admin** (no public registration)

   Set `ADMIN_SEED_EMAIL` and `ADMIN_SEED_PASSWORD` (min 12 characters) in `.env.local`, then:

   ```bash
   npm run seed:admin
   ```

4. **Run dev server**

   ```bash
   npm run dev
   ```

   - Storefront: [http://localhost:3000](http://localhost:3000)
   - Admin: [http://localhost:3000/admin](http://localhost:3000/admin)

## MongoDB Atlas

1. Create a free/paid cluster at [https://www.mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
2. Create a database user and allow your IP (or `0.0.0.0/0` for Vercel)
3. Copy the connection string into `MONGODB_URI`
4. Collections are created automatically on first use

## Cloudinary

1. Create a Cloudinary account
2. Set `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET`
3. Upload product images from **Admin → Products**

## Email (contact, orders)

Configure SMTP variables in `.env.local`. If SMTP is not set, notifications are **logged to the server console** in development.

## Payment activation (do not enable until owner approval)

Live checkout stays **off** by default.

1. Confirm catalog, copy, policies, and product category with your payment provider
2. Set Stripe keys: `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET`, `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`
3. Set `PAYMENTS_ENABLED=true`
4. In **Admin → Settings**, enable **checkout**
5. Configure Stripe webhook endpoint: `https://your-domain.com/api/webhooks/stripe`  
   Listen for `checkout.session.completed` and `checkout.session.expired`

Orders are **never** marked paid from the success page alone — only from verified webhooks.

## Deploy on Vercel

1. Push this repo and import in Vercel (framework: **Next.js**, build: `npm run build`, output: default).
2. Copy every variable from `.env.example` into **Project → Settings → Environment Variables** (Production).
3. Set **`NEXT_PUBLIC_SITE_URL`** and **`AUTH_URL`** to your live URL (e.g. `https://intensedropz.ca`) — no trailing slash.
4. In MongoDB Atlas, allow **Vercel** IPs or `0.0.0.0/0` for the cluster network access list.
5. From your machine (with production `MONGODB_URI` in `.env.local`), run once: `npm run seed:admin`.
6. Redeploy after env changes. Smoke-test: home, shop, contact form, `/admin/login`.

**Production env minimum:** `MONGODB_URI`, `AUTH_SECRET`, `AUTH_URL`, `NEXT_PUBLIC_SITE_URL`, `FORM_IP_SALT`. Add Cloudinary before uploading product images; add SMTP for email; enable Stripe + admin checkout only when approved.

## Scripts

| Command           | Description        |
| ----------------- | ------------------ |
| `npm run dev`     | Development server |
| `npm run build`   | Production build   |
| `npm run lint`    | ESLint             |
| `npm run seed:admin` | Create first admin (uses `ADMIN_SEED_*` in `.env.local`) |
| `npm run seed:admin -- --reset` | Update admin password to match `ADMIN_SEED_PASSWORD` |

## Owner checklist — required before live sales

- [ ] Approved product catalog (titles, descriptions, images, SKUs, CAD prices, stock)
- [ ] Confirmation products may be sold in the target market (Canada)
- [ ] Final shipping, returns, privacy, and terms policies (replace draft text in admin)
- [ ] Payment provider approval for business and product category
- [ ] Stripe (or adapter) credentials and webhook configured
- [ ] Enable checkout in admin only after the above
- [ ] Optional: approved homepage pricing range on `/pricing`
- [ ] Optional: real testimonials (publish explicitly — none are seeded)
- [ ] SMTP for customer/business notifications
- [ ] Legal review of calculator disclaimer and 18+ acknowledgement copy

## Peptide calculator

Educational mg/mL ↔ volume converter only — no dosing recommendations or medical advice.
