# Guruprasath — Portfolio (React + Node)

A two-part project:

- `frontend/` — React (Vite) site: hero, experience timeline, skills, projects, contact form
- `backend/` — Node/Express API that receives the contact form and emails it to you

## Run it locally

**Backend**
```bash
cd backend
npm install
cp .env.example .env    # then fill in your SMTP details (optional — form still works without it, messages just won't email)
npm run dev              # http://localhost:5000
```

**Frontend** (new terminal)
```bash
cd frontend
npm install
npm run dev               # http://localhost:5173
```

The frontend proxies `/api/*` requests to `localhost:5000` in dev (see `vite.config.js`).

## Customize your content

Everything text-based — name, tagline, skills, projects, experience — lives in one file:
`frontend/src/data/portfolio.js`

Edit that file and the whole site updates. I've already filled in your real projects, skills, and contact info from your existing site. Two experience entries (Zoho Corp, Visual Media Tech) only had a title — add dates/bullets there.

## Deploy

- **Frontend:** `npm run build` in `frontend/` → deploy the `dist/` folder to Vercel/Netlify (same as your current site).
- **Backend:** deploy `backend/` to Render/Railway/Fly.io, set the env vars from `.env.example`, then update `CLIENT_ORIGIN` to your live frontend URL and point the frontend's fetch calls (or a `VITE_API_URL` env var) at the live backend URL instead of the dev proxy.

## Contact form email setup (optional)

If you want form submissions emailed to you, in `backend/.env`:
1. Use a Gmail address, generate an **App Password** at https://myaccount.google.com/apppasswords
2. Set `SMTP_USER` to your Gmail address and `SMTP_PASS` to the app password
3. Restart the backend

Without this configured, the form still works — submissions are just logged in memory (visible at `GET /api/contact/log` during dev) instead of emailed.
