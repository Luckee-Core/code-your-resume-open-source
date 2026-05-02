# 008 – Job-search CRM (local vault + Express `/api/data`)

## Objective

Document how **Companies → Employees / Jobs → Job applications → Employment** are implemented: **browser** persistence for graphics only; **CRM entity data** on disk as **gitignored JSON** under `.data/crm/` (or `CRM_DATA_DIR` on Express), accessed through **`code-your-resume-open-source-express-server`** at **`/api/data/{entity}/{action}`** (same contract as the former Next Route Handlers).

**Employment** rows (`employments.json`) link an existing **company** and **job** with tenure dates; create/update handlers enforce `job.companyId === employment.companyId`.

**User Background Studio** is **not** CRM data: the Next app calls **`mentorai-server`** at **`/api/user-background-studio/**`** via a separate Next rewrite (`MENTORAI_INTERNAL_URL`, default dev `http://127.0.0.1:3005`). Redux uses split slices (`userBackgroundProfiles`, `userBackgroundStudioBuilder`, `currentUserBackground`). The browser sends `NEXT_PUBLIC_MENTORAI_USER_ID` for local/dev parity with mentorai’s expected `userId`.

## Decisions

### 1) Persistence boundary

- **Graphics** (`ImageGraphic`): remain in **browser `localStorage`**. Keys live in [`src/config/local-storage-keys.ts`](../../src/config/local-storage-keys.ts).
- **CRM** (companies, employees, jobs, job applications): **never** in `localStorage`. JSON files on disk; Express implements read/write (ported from [`src/lib/crm-store/`](../../src/lib/crm-store/) logic). Next **does not** ship Route Handlers for CRM anymore.

### 2) API surface

- **Per-entity action paths**: `/api/data/company/list`, `/api/data/employee/create`, etc.
- Client modules (e.g. [`src/api/company/list.ts`](../../src/api/company/list.ts)) call **relative** URLs such as `fetch("/api/data/company/list")` — no shared CRM URL helper.
- **Next config:** `CRM_EXPRESS_INTERNAL_URL` overrides the CRM rewrite target. In **`next dev`**, if unset, Next defaults CRM rewrites to **`http://127.0.0.1:3053`** (same as Express default `PORT`). **`MENTORAI_INTERNAL_URL`** overrides the User Background Studio rewrite; in **`next dev`**, if unset, defaults to **`http://127.0.0.1:3005`**. For production, set both explicitly when proxying.

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
- [ ] New keys for browser vaults go through `local-storage-keys.ts`.
- [ ] `.data/` remains gitignored; document first-run behavior if empty.
