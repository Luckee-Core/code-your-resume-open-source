# 014 – Cover letter generation (Cursor → TSX → Graphics Studio)

## Objective

Document how **Generate cover letter** on the job detail Applications section produces a **US Letter–sized TSX cover letter**, persists it as a Supabase **image graphic** tagged with `jobId`, and opens **Graphics Studio** for edit/export — mirroring the skills/resume TSX pipeline (ADR 007, skills-component flow) without extending `JobApplication`.

## Decisions

### 1) Output format

- **TSX graphic** via Cursor agent on `CURSOR_TARGET_REPO` (same repo as skills generation).
- Component contract: `export default function GeneratedCoverLetterPreview()` with `"use client";`, Tailwind-only, no external imports.
- Default canvas: **816×1056 px** (US Letter @ 96dpi). The thunk does **not** read `currentImageGraphic` dimensions.

### 2) API surface

| Layer | Path |
|-------|------|
| Next client | `POST /api/data/cover-letter/generate` |
| Next proxy | [`src/app/api/data/cover-letter/generate/route.ts`](../../src/app/api/data/cover-letter/generate/route.ts) — `maxDuration = 300` |
| Express | `POST /api/data/cover-letter/generate` |

Request body includes job context (`jobId`, `jobTitle`, `companyName`, `responsibilities`, `requirements`, `niceToHaves`), `professionalBackgroundSegments`, optional `skills` prompt lines, and optional canvas dimensions.

Response: `{ success: true, tsx: string }`.

### 3) Inputs

- **Job** — `currentJob` (title, bullets, companyId).
- **Company** — name from `companies[job.companyId]`.
- **Professional background** — `currentProfessionalBackground.draftSegments` (required: at least `credibility_bio` or `voice_style` non-empty before generate).
- **Technical skills** — optional active skill prompt lines (`title — body`), same format as skills generation.

Job detail page already dispatches `loadProfessionalBackgroundThunk` and `loadTechnicalSkillsThunk` on mount.

### 4) Persistence

After generation:

1. `createImageGraphicThunk` — title `Cover letter — {jobTitle}`, metadata `{ jobId, coverLetterSource: "cursor" }`.
2. `patchImageGraphicStudioDraft` — TSX in `metadata.studioDraft.tsx`.
3. `loadImageGraphicsThunk`, `openImageGraphicStudioByIdThunk`, `hydrateStudioForGraphic`.

Graphics persist in Supabase `image_graphics` (ADR 008). No CRM `JobApplication` field for cover letters in MVP.

### 5) Ledger

Reuse Supabase `resume_tsx_code_generation_*` tables and CRUD in Express `src/data/resume-tsx-code-generation/`. The `skills` column stores optional technical-skill prompt lines for audit; cover letter prompts are stored in `prompt_text`.

### 6) TSX extraction

[`extract-tsx-from-conversation.ts`](../../code-your-resume-open-source-express-server/src/services/cursor/extract-tsx-from-conversation.ts) accepts `expectedComponentName` (default `GeneratedSkillsPreview`; cover letter passes `GeneratedCoverLetterPreview`).

## UI

- Package: [`src/packages/job-detail-page/builder-column/applications/generate-cover-letter/`](../../src/packages/job-detail-page/builder-column/applications/generate-cover-letter/).
- Rendered in Applications section below **Generate skills component**.
- Thunk: `generateCoverLetterThunk` in `src/store/thunks/cover-letter/`.

## PR checklist

- [ ] New generation uses Express `/api/data/cover-letter/generate`, not ad-hoc fetch from components.
- [ ] Prompt outputs `GeneratedCoverLetterPreview`, not `GeneratedSkillsPreview`.
- [ ] US Letter canvas defaults (816×1056) unless body overrides.
- [ ] Graphic metadata includes `jobId` and `coverLetterSource: "cursor"`.
