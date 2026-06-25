# 023 – Quick apply pipeline

## Status

Accepted

## Context

Users want a single dashboard entry point: paste a **company website URL** and a **job listing URL**, then have the app scrape both, create CRM rows as needed, and **always queue resume generation** when prerequisites are met.

## Decision

### Dashboard placement

- **`/dashboard`** (`ImageGraphicsListPage`) renders a **Quick apply** section **above** the graphics table.
- Package: `src/packages/quick-apply/` (form + status).

### Server orchestration

One Express action — **`POST /api/data/quick-apply/run`** — runs the full pipeline in `src/services/quick-apply/run-quick-apply-pipeline.ts`:

1. Validate and normalize both URLs.
2. **Resolve company** — find by normalized website hostname; else create with name derived from domain.
3. **Parallel** (after company id is known):
   - Company: discover site pages (if not yet attempted) + website research (best-effort; warnings only).
   - Job: find by posting URL or `createJobFromListingUrlAndImport`.
4. **Resume** — if job scrape succeeded, attempt `scheduleBackgroundJobGraphicGeneration` (same path as skills-component generate). Skip with `resumeSkipReason` when active skills or LinkedIn name are missing.

### Dedup rules

- **Company:** reuse when `extractCompanyWebsiteHostname` matches an existing `companies.website` row.
- **Job:** reuse when `jobs.url` matches exactly; re-run listing import on the existing row.

### Client

- `runQuickApplyPipelineThunk` → `requestApi` → extended-timeout Next proxy at `src/app/api/data/quick-apply/run/route.ts`.
- `quickApplyBuilder` slice tracks `phase`, `lastResult`, `lastError`.
- On success: upsert company/job, set `currentJob`, load bullets, navigate to `/job-detail-page`.

## References

- Job listing import: [008 – Job-search CRM](./008-job-search-crm.md) §7
- Resume generation: skills-component `/api/data/skills-component/generate`
- Newsletter ingest precedent (find-or-create): Express `processJobNewsletterIngest`

## PR checklist

- [ ] Orchestration lives in Express `services/quick-apply/`, not inline in components.
- [ ] Dashboard form uses styles object (ADR 003); thunks only for side effects.
- [ ] Next proxy uses `maxDuration = 300` for long scrape runs.
