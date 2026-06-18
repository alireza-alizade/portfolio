# AGENTS.md

DevOps portfolio — Django (DRF) backend + Next.js frontend, Docker Compose.

## Quick start

```bash
docker compose up --build
```

Frontend `:3000`, backend API `:8000`, admin `/admin/`.

## Backend (`backend/`)

- Python 3.12, Django 5.1, DRF, SQLite
- Apps in `portfolio/apps/`: `projects`, `skills`, `blog`, `contact`
- All viewsets read-only except contact (create-only)
- Blog posts store markdown in `content_markdown` field
- API: `/api/projects/`, `/api/skills/`, `/api/blog/`, `/api/blog/tags/`, `/api/contact/`
- **Migrations use `--run-syncdb`** — no `migrations/` dirs exist. `manage.py migrate --run-syncdb` creates tables directly from models.
- Dockerfile CMD is `gunicorn`, but `docker-compose.yml` overrides it to `runserver 0.0.0.0:8000`
- Compose runs `migrate --run-syncdb` as part of the startup command

## Frontend (`frontend/`)

- Next.js 15 App Router, React 19, TypeScript
- Tailwind CSS v4 via `@tailwindcss/postcss` — no `tailwind.config.*`
- Custom `@theme` colors in `globals.css` used as Tailwind utilities: `bg-bg`, `text-fg-secondary`, `border-accent`, etc.
- Clean minimal dark theme: bg `#09090b`, accent blue `#3b82f6`, font Inter
- `<NavBar>` + `<Footer>` in root layout — pages do NOT import them
- Pages are server components; only `NavBar`, `ContactForm`, `MarkdownContent` are `"use client"`
- API client in `src/lib/api.ts` — all calls typed, uses `cache: "no-store"` to prevent Next.js from caching fetch results at build time (which would bake error states into static pages)
- `NEXT_PUBLIC_API_URL` is a compose runtime env (not a build-arg) — unreachable during Docker build
- `next.config.ts` rewrites `/api/*` → backend
- `output: "standalone"` — Dockerfile copies `.next/standalone`
- No `package-lock.json` — `npm ci` in CI will fail; use `npm install`

## Commands

```bash
# Backend (dev)
cd backend && python manage.py runserver

# Frontend (dev)
cd frontend && npm run dev

# Build for prod
docker compose build

# Full stack
docker compose up --build
```

## CI (`.github/workflows/ci.yml`)

- `backend`: setup python → pip install → migrate --run-syncdb → import sanity check
- `frontend`: setup node → npm ci → build (with `NEXT_PUBLIC_API_URL`)
- `docker`: `docker compose build` (depends on both passing)

## Testing

- No test runner configured — CI only checks imports + build
