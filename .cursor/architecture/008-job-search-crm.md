# 008 – Job-search CRM (Supabase + Express `/api/data`)

## Objective

Document how **Companies → Employees / Jobs → Job applications → Employment** and **image graphics** are implemented: **CRM core tables** and **graphics** live in tenant **Supabase**; Express uses the service role and exposes **`/api/data/{entity}/{action}`**. The Next app uses `fetch` only — no `localStorage`, no Supabase client in the browser.

**Employment** rows link an existing **company** and **job** with tenure dates; create/update handlers enforce `job.companyId === employment.companyId`.

**User Background Studio** is **not** CRM data. The companion Express server includes a `user-background-studio` router (mount at `/api/user-background-studio` when enabled). Default `next.config.ts` rewrites CRM and studio paths to Express on port **3053** — it does **not** include a separate mentorai rewrite. Optional dev env: `NEXT_PUBLIC_MENTORAI_USER_ID` for legacy integration stubs in `src/config/mentorai-user.ts`.

## Decisions

### 1) Persistence boundary

- **Graphics** (`ImageGraphic`): Supabase **`image_graphics`** (DDL in Express `docs/supabase-image-graphics-schema.sql`); routes under `/api/data/image-graphic/*`. Client modules in [`src/api/image-creation-studio/`](../../src/api/image-creation-studio/).
- **CRM** (companies, employees, jobs, job applications, employments): Supabase tables (`docs/crm-postgres-schema.sql` in express-server). Next **does not** ship Route Handlers for CRM entity CRUD.

### 2) API surface

- **Per-entity action paths**: `/api/data/company/list`, `/api/data/employee/create`, etc.
- Client modules (e.g. [`src/api/company/list.ts`](../../src/api/company/list.ts)) call **relative** URLs such as `fetch("/api/data/company/list")` — no shared CRM URL helper.
- **Next config:** `EXPRESS_API_URL` or `CRM_EXPRESS_INTERNAL_URL` overrides the Express rewrite target. In **`next dev`**, if unset, Next defaults rewrites to **`http://127.0.0.1:3053`** (same as Express default `PORT`). Rewrites cover `/api/data/*`, `/api/technical-skills/*`, `/api/professional-background/*`, and `/api/job-studio/*`. For production (Vercel), set `EXPRESS_API_URL` to the public Railway URL.

### 3) Redux

(Unchanged.)

### 4) App routes

(Unchanged.)

### 5) Detail UI packages

(Unchanged.)

### 6) TypeScript models

(Unchanged.)

### 7) Add job from posting URL (company detail)

- **Company Jobs → Add job** collects a posting URL in the UI, then calls **`POST /api/data/job/create-from-listing-url`** with `{ "companyId", "url" }`. The Express handler runs **`createJobFromListingUrlAndImport`** in `src/services/job/create-job-from-listing-url-and-import.ts`, which writes the job row then **`runJobListingImport`** (same scrape + optional Anthropic path as **Import listing**). The older two-step sequence (`job/create` then `job/import-listing`) is still valid for other clients; the dedicated route keeps one round-trip and one place in `services/job` for the full pipeline.

## PR checklist

- [ ] CRM reads/writes go through thunks → `src/api/**` → Express `/api/data/**` (or rewrite), not components calling `fetch` ad hoc.
- [ ] Graphics require `SUPABASE_URL` + `SUPABASE_SERVICE_ROLE_KEY` on Express (tenant DB).
- [ ] Supabase schema applied per Express `docs/` runbook before first CRM load.
