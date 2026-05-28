# ADR-013 — Job Studio

## What it is

The Job Detail experience is a **Job Studio**: left column = listing bullets (responsibilities, requirements, nice-to-haves), right column = job-scoped graphics (generate actions + table) and applications log. AI coach chat lives in a **floating FAB** (Luckee tickets pattern). CRM job rows and bullet edits stay on existing `/api/data` flows; the coach is **chat-only** (no structured suggestions that mutate bullets).

## Layout

- **Header** (`JobHeader`): title, company, status, actions, **At a glance** (job description summary), **job posting link** when `url` is set. **Paste job description** opens a modal (textarea + extract) from the ⋯ menu — not an inline builder section.
- **Shell**: Match Luckee ICP Studio breakpoints — listing pane (~55% on `lg`), graphics pane (~45%), stacked on small screens.
- **Coach FAB** (`JobDetailChatFab`): fixed bottom-right; collapsed = orange `MessageCircle` button; expanded = floating panel with `JobDetailChatColumn`.
- **Packages**: `src/packages/job-detail-page/` — **`header/`** (incl. `edit-modal`, `description-modal`), **`listing-column/`**, **`graphics-column/`**, **`chat-fab/`**, **`chat-column/`**, **`builder-column/`** (shared section components + applications). Root **`index.tsx`** wires loading + shell.
- **Builder metadata**: `src/model/job-detail-builder/` — `JobDetailBuilderSectionKey`, `JOB_DETAIL_BUILDER_SECTION_TITLE`, `JOB_DETAIL_BUILDER_SECTION_ORDER` (Luckee ICP–style `key` / `title` for the rail; row data stays in Redux dumps).

## Data boundaries

| Concern | Storage |
|--------|---------|
| Jobs, companies, applications | CRM JSON vault via `/api/data` |
| Job bullets | Supabase mirror (`job_responsibilities`, etc.) via existing list endpoints |
| Job Studio coach transcript | Supabase **`job_studio_*`** tables only |
| Graphics (resume, cover letter, layouts) | Supabase via Express; **`jobId`** column tags job-scoped rows |

Distinct from **`job_listing_ai_*`** (listing import / scrape ledger).

## Supabase tables (three-table pattern)

- `job_studio_requests` — user message; `job_id`, `user_id`, `content`, `status`
- `job_studio_responses` — `structured` JSONB (`content`, optional `coachSections`)
- `job_studio_exchanges` — request ↔ response + token meter; **`job_id`** for scoped queries

No suggestions table.

## Express

- Mount: `/api/job-studio`
- `GET /api/job-studio?jobId=` — chat payload for one job (validates job exists in CRM vault)
- `POST /api/job-studio/messages` — body `{ jobId, userId, content }`; runs coach; returns refreshed messages

Proxied from Next.js via `next.config.ts` rewrites (same pattern as technical-skills).

## Redux

- `jobStudioBuilder` — load/post UI flags
- `jobDetailChatFab` — FAB expand/collapse (`resetForJobChange` on job switch)
- `currentJobStudio` — `loadedJobId`, `messages[]`

Thunks: `loadJobStudioChatThunk(jobId)`, `sendJobStudioMessageThunk(jobId, content)` — reset/sync when `currentJob.id` changes on the job detail route.

Generate resume/cover letter thunks set `jobId` on create; job detail filters graphics via `filterImageGraphicsByJobId`.

## References

- [011 – Technical Skills Studio](./011-technical-skills-studio.md) — parallel Express + Redux patterns (without suggestions).
- [014 – Cover letter generation](./014-cover-letter-generation.md) — cover letter TSX → graphic with `jobId`.
