# 014 – Cover letter generation (Cursor → TSX → Graphics Studio)

## Objective

Document how **Generate cover letter** on the job detail Applications section produces a **US Letter–sized TSX cover letter**, persists it as a Supabase **image graphic** tagged with `jobId`, and opens **Graphics Studio** for edit/export — mirroring the skills/resume TSX pipeline (ADR 007, skills-component flow) without extending `JobApplication`.

## Decisions

### 1) Output format

- **TSX graphic** via Cursor agent on `CURSOR_TARGET_REPO` (same repo as skills generation).
- Component contract: `export default function GeneratedCoverLetterPreview()` with `"use client";`, Tailwind-only, no external imports.
- Default canvas: **816×1056 px** (US Letter @ 96dpi). Canvas defaults live in Express `run-cover-letter-generation`; the client thunk uses the same dimensions when creating the graphic.

### 2) API surface

| Layer | Path |
|-------|------|
| Next client | `POST /api/data/cover-letter/generate` |
| Next proxy | [`src/app/api/data/cover-letter/generate/route.ts`](../../src/app/api/data/cover-letter/generate/route.ts) — `maxDuration = 300` |
| Express | `POST /api/data/cover-letter/generate` |

**Request body:** `{ jobId: string }` only. Express loads job, company, bullets, professional background, and active technical skills from Supabase via `loadJobGenerationContext` before calling `runCoverLetterGeneration`.

**Response:** `202 { success: true, accepted: true, jobId }` — generation and graphic persistence run on Express in the background; the client does not receive TSX.

The same `{ jobId }` contract applies to **company interest** (`POST /api/data/company-interest/generate`, canvas 816×480) and **skills/resume** (`POST /api/data/skills-component/generate`, canvas 816×1150). Shared types: `GenerateByJobIdInput` in `src/api/generation/types.ts`.

### 3) Inputs

- **Server-loaded from `jobId`** — job title, company name, responsibility/requirement/nice-to-have bullets, active technical skill prompt lines, and professional background segments.
- **Client pre-flight (UI only)** — job detail Applications sections still read Redux for friendly disable states (e.g. missing bio/voice or no active skills). The server returns **400** if required data is missing at generation time (source of truth is Supabase, not stale client state).

Job detail page dispatches `loadProfessionalBackgroundThunk` and `loadTechnicalSkillsThunk` on mount so UI hints stay accurate.

### 4) Persistence

Express persists graphics after the Cursor agent finishes (`persistGeneratedJobGraphic` in express-server `src/services/job-graphic-generation/`). The browser only queues generation and refreshes `imageGraphics` periodically.

Graphics persist in Supabase `image_graphics` (ADR 008). No CRM `JobApplication` field for cover letters in MVP.

### 5) Ledger

Each Cursor generation flow has its own Supabase ledger (requests / exchanges / responses):

| Flow | Tables |
|------|--------|
| Cover letter | `cover_letter_generation_requests`, `cover_letter_generation_exchanges`, `cover_letter_generation_responses` |
| Company interest | `company_interest_generation_requests`, `company_interest_generation_exchanges`, `company_interest_generation_responses` |
| Skills / resume TSX | `skills_component_generation_requests`, `skills_component_generation_exchanges`, `skills_component_generation_responses` |

Express CRUD lives in `src/data/cover-letter-generation/`, `src/data/company-interest-generation/`, and `src/data/skills-component-generation/`. Each request and exchange row includes `job_id` for per-job cost filtering. The `skills` column stores optional technical-skill prompt lines for audit; full prompts are stored in `prompt_text`. Cursor runs record `cost_estimate` on the exchange row (not Anthropic token columns).

DDL and registry seeds: express-server `docs/supabase-exchange-registry-update.sql`.

### 6) TSX extraction

[`extract-tsx-from-conversation.ts`](../../code-your-resume-open-source-express-server/src/services/cursor/extract-tsx-from-conversation.ts) accepts `expectedComponentName` (default `GeneratedSkillsPreview`; cover letter passes `GeneratedCoverLetterPreview`).

## UI

- Package: [`src/packages/job-detail-page/builder-column/applications/generate-cover-letter/`](../../src/packages/job-detail-page/builder-column/applications/generate-cover-letter/).
- Rendered in Applications section below **Generate skills component**.
- Thunk: `generateCoverLetterThunk` in `src/store/thunks/cover-letter/`.

## PR checklist

- [ ] New generation uses Express `/api/data/cover-letter/generate`, not ad-hoc fetch from components.
- [ ] Prompt outputs `GeneratedCoverLetterPreview`, not `GeneratedSkillsPreview`.
- [ ] US Letter canvas defaults (816×1056) on server and graphic creation.
- [ ] Graphic metadata includes `jobId` and `coverLetterSource: "cursor"`.
