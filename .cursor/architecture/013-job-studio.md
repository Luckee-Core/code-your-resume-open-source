# ADR-013 — Job Studio

## What it is

The Job Detail experience is a **Job Studio**: left column = AI coach chat (Supabase ledger), right column = scrollable builder with Responsibilities, Requirements, Nice-to-haves, and Applications. CRM job rows and bullet edits stay on existing `/api/data` flows; the coach is **chat-only** (no structured suggestions that mutate bullets).

## Layout

- **Header** (`JobHeader`): title, company, status, actions, **At a glance** (job description), **job posting link** when `url` is set.
- **Shell**: Match Luckee ICP Studio breakpoints — chat pane (~55% on `lg`), builder pane (~45%), stacked on small screens.
- **Packages**: `src/packages/job-detail-page/` — only **`header/`** (incl. `edit-modal`), **`chat-column/`**, **`builder-column/`** (incl. responsibilities / requirements / nice-to-haves / applications sections). Root **`index.tsx`** wires loading + shell.
- **Builder metadata**: `src/model/job-detail-builder/` — `JobDetailBuilderSectionKey`, `JOB_DETAIL_BUILDER_SECTION_TITLE`, `JOB_DETAIL_BUILDER_SECTION_ORDER` (Luckee ICP–style `key` / `title` for the rail; row data stays in Redux dumps).

## Data boundaries

| Concern | Storage |
|--------|---------|
| Jobs, companies, applications | CRM JSON vault via `/api/data` |
| Job bullets | Supabase mirror (`job_responsibilities`, etc.) via existing list endpoints |
| Job Studio coach transcript | Supabase **`job_studio_*`** tables only |

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
- `currentJobStudio` — `loadedJobId`, `messages[]`

Thunks: `loadJobStudioChatThunk(jobId)`, `sendJobStudioMessageThunk(jobId, content)` — reset/sync when `currentJob.id` changes on the job detail route.

## References

- [011 – Technical Skills Studio](./011-technical-skills-studio.md) — parallel Express + Redux patterns (without suggestions).
