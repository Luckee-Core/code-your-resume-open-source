# Web + Express wire contract — Code Your Resume

Documented seam between the **Next.js web app** and the **companion Express API**. Template from [mentorai-server oss-web-express-wire-contract.md](https://github.com/luckee/mentorai-server/blob/main/data/open-source/oss-web-express-wire-contract.md).

## Contract summary

| Field | Value |
|-------|-------|
| **Product name** | Code Your Resume |
| **Web repo** | https://github.com/Luckee-Core/code-your-resume-open-source |
| **Express repo** | https://github.com/Luckee-Core/code-your-resume-open-source-express-server |
| **Default web port** | 3000 |
| **Default API port** | 3053 |
| **API base env (web)** | `EXPRESS_API_URL` or `CRM_EXPRESS_INTERNAL_URL` (not `NEXT_PUBLIC_SERVER_URL`) |
| **Proxy mechanism** | Next.js `rewrites()` in `next.config.ts` — browser calls same-origin `/api/data/*`, Next forwards to Express |
| **Health endpoint** | `GET /api/health` (also `GET /`) |
| **API docs catalog** | `GET /api-docs.json` on Express; web renders at `/docs/api` |
| **Success JSON** | `{ success: true, data?, count?, message? }` |
| **Error JSON** | `{ success: false, error: string, message? }` |
| **Auth (OSS default)** | Local/trusted dev; optional `CRM_API_SECRET` shared between Next BFF and Express |

### Why not `NEXT_PUBLIC_SERVER_URL`?

Lead Studio calls Express directly from the browser. Code Your Resume uses **Next rewrites** so CRM traffic stays same-origin — simplifying CORS and allowing Next route handlers to attach `CRM_API_SECRET` server-side. This is a **documented fork exception**.

## Environment variables

### Web (`code-your-resume-open-source`)

| Variable | Client-visible? | Required | Purpose |
|----------|-----------------|----------|---------|
| `EXPRESS_API_URL` | No | Prod (Vercel) | Server-side rewrite target — Railway public URL, no trailing slash |
| `CRM_EXPRESS_INTERNAL_URL` | No | No | Legacy alias for `EXPRESS_API_URL` |
| `CRM_API_SECRET` | No | No | When set, Next BFF adds header; must match Express |
| `NEXT_PUBLIC_LANDING_GITHUB_URL` | Yes | No | Marketing landing GitHub CTA |
| `NEXT_PUBLIC_MENTORAI_USER_ID` | Yes | No | Optional dev stub for legacy integration config |

**Rule:** Never put `SUPABASE_SERVICE_ROLE_KEY`, `ANTHROPIC_API_KEY`, or `CURSOR_API_KEY` in `NEXT_PUBLIC_*`.

### Express (`code-your-resume-open-source-express-server`)

| Variable | Required for core | Purpose |
|----------|-------------------|---------|
| `PORT` | No (default 3053) | Listen port |
| `HOST` | No (default 127.0.0.1 dev) | Bind address |
| `SUPABASE_URL` | **Yes** | CRM, graphics, studios |
| `SUPABASE_SERVICE_ROLE_KEY` | **Yes** | Server-side Supabase client |
| `CRM_API_SECRET` | No | Optional shared secret for `/api/data/*` |
| `ANTHROPIC_API_KEY` | No | Job import extract, website research, coach chat |
| `CURSOR_API_KEY` | No | Skills component generation |
| `CORS_ORIGINS` | Deploy | Comma-separated browser origins (when not using Next rewrites) |

Full list: each repo’s `.env.example`.

## HTTP routing map

### Browser → Next (same origin)

```text
/api/data/*                  → rewrite → Express /api/data/*
/api/technical-skills/*      → rewrite → Express /api/technical-skills/*
/api/voice-style/*            → rewrite → Express /api/voice-style/*
/api/job-studio/*            → rewrite → Express /api/job-studio/*
/api/user-background-studio/* → rewrite → Express /api/user-background-studio/* (when mounted)
```

### Express mounted routes

```text
GET  /api/health
GET  /api-docs.json          → API documentation catalog (no CRM secret)
GET  /api/data/company/list
POST /api/data/company/create
…    (see Express ADR 009)
POST /api/technical-skills/*
POST /api/voice-style/*
POST /api/job-studio/*
POST /api/user-background-studio/*
```

### Web docs fetch (server-only)

The docs layout at `/docs/**` loads the catalog once via `getApiDocsCatalogCached()` in `src/api/api-docs/client.ts`, calling `${EXPRESS_API_URL or http://127.0.0.1:3053}/api-docs.json` with `requestApi`. This does **not** use Next rewrites or a BFF route.

Human-readable reference: **http://localhost:3000/docs/api** (requires Express running locally).

## Supabase runbook (Express `docs/`)

Apply SQL in this order on a fresh Supabase project:

1. `docs/crm-postgres-schema.sql` — CRM core tables
2. `docs/supabase-image-graphics-schema.sql` — graphics studio
3. `docs/supabase-error-log-schema.sql` — error persistence
4. `docs/supabase-job-listing-ai-ledger-mirror.sql` — optional job listing AI mirror
5. `docs/supabase-job-listing-sections-mirror.sql` — optional listing sections
6. `docs/supabase-job-studio-schema.sql` — job studio chat
7. `docs/supabase-user-background-studio-schema.sql` — user background studio (if used)
8. `docs/supabase-projects-schema.sql` — portfolio projects + note log
9. `docs/supabase-voice-style-schema.sql` — voice/tone notes singleton
10. `docs/supabase-project-notes-synthesis.sql` — project notes AI synthesis ledger + prompt seed
11. `docs/supabase-project-website-research.sql` — project website research summary fields
12. `docs/supabase-skills-component-point-of-emphasis-prompt-v4.sql` — resume prompt v4 (removes hardcoded Acme Labs employer)

Optional seed: `npm run seed:sql` in Express repo (generates SQL from demo JSON fixtures).

## Smoke verification

1. Express: copy `.env.example` → `.env`, set Supabase vars, `npm run dev`, then:
   ```bash
   curl http://127.0.0.1:3053/api/health
   curl -s http://127.0.0.1:3053/api-docs.json | head -c 200
   ```
2. Web: `npm run dev`, open http://localhost:3000/dashboard — CRM companies list should load.
3. API docs: with Express running, open http://localhost:3000/docs/api — sidebar should list all catalog groups.
4. Express CRM matrix:
   ```bash
   CRM_BASE=http://127.0.0.1:3053 npm run verify:crm
   ```

## Optional features

When `ANTHROPIC_API_KEY`, `CURSOR_API_KEY`, or related env vars are unset, AI routes return `{ success: false, error: "..." }` with 500/400 — they do not crash the server.
