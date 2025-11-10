# Healthy Recipes Blog

Simple Next.js project to manage healthy recipes with English and Spanish translations.

Features:
- List recipes (home page)
- Admin page to add/edit/delete recipes and ingredients
- API routes that read/write a local JSON file (`/data/db.json`)
- i18n support (`en`, `es`)

Notes:
- Using a local JSON file works for development. Deploying to Vercel with this approach means data will not persist across serverless function invocations. For production, use a real database (Supabase, MongoDB Atlas, PlanetScale, etc.).

How to run locally:

1. Install dependencies

```bash
npm install
```

2. Run dev server

```bash
npm run dev
```

Open http://localhost:3000

How to deploy to Vercel:

- Connect the repository to Vercel and deploy. Use an external database for persistence.
