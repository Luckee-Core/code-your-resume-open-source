# ADR-020 — Projects entity

## What it is

Structured **portfolio / project history** — primary narrative source for AI generation (replaces Professional Background `credibility_bio` and legacy `portfolio_github`). Each project has core fields, a technologies list, website research summary, and a freeform note log (timing and metrics live in notes).

| Layer | Detail |
|---|---|
| Tables | `projects`, `project_notes`, `project_notes_synthesis_*` (AI ledger) |
| API | `/api/data/project/*`, `/api/data/project-notes/*` |
| Redux | `projects` dump, `projectNotes` dump, `currentProject` |
| UI | `/experience/projects` list + `/project-detail-page` static detail (ADR 009 parity) |
| AI | `loadJobGenerationContext` builds `{{projects}}` block from project rows + notes |

---

## Schema

**`projects`:** `id`, `business_name`, `description`, `url`, `duration` (legacy column — UI deprecated; use notes), `technologies` (JSONB), `website_research_summary`, `website_research_completed_at`, `created_at`, `updated_at`.

**`project_notes`:** `id`, `project_id` (FK CASCADE), `body`, `created_at`.

**AI ledger (synthesis):** `project_notes_synthesis_requests`, `project_notes_synthesis_responses`, `project_notes_synthesis_exchanges`.

DDL:

- `code-your-resume-open-source-express-server/docs/supabase-projects-schema.sql`
- `code-your-resume-open-source-express-server/docs/supabase-project-notes-synthesis.sql`
- `code-your-resume-open-source-express-server/docs/supabase-project-website-research.sql`

---

## API (Express)

| Router | Routes |
|---|---|
| `/api/data/project` | `GET /list`, `GET /get?id=`, `POST /create`, `PATCH /update`, `DELETE /delete?id=`, `POST /synthesize-notes`, `POST /website-research` |
| `/api/data/project-notes` | `GET /list?projectId=`, `POST /create`, `DELETE /delete?id=` |

**`POST /api/data/project/website-research`** — body `{ id }`. Crawls `project.url`, optional Anthropic summary via `website_business_overview`, stores `websiteResearchSummary` + `websiteResearchCompletedAt`. Uses `fetchJobListingDocument` (HTTP or `WEBSITE_SCRAPER_URL` Playwright).

**`POST /api/data/project/synthesize-notes`** — body `{ id, synthesisText }`. Replaces all notes via AI (`project_notes_synthesis` flow).

Response shape: `{ success, data?, error? }` per wire contract.

---

## Frontend layout (ADR 009)

```
ProjectDetailHeader (ellipsis menu + website link in meta row)
researchGrid
  AtAGlanceSection (Sparkles + website research refresh + summary + description)
  ProjectLinksSection (Globe + website chip + technologies editor)
NotesLogSection (list section — duration/timing in freeform notes)
```

| Path | Role |
|---|---|
| `src/packages/project-detail-page/` | Detail package |
| `src/store/thunks/projects/run-project-website-research-thunk.ts` | Website crawl thunk |
| `src/store/builders/crmBuilder.ts` | `projectWebsiteResearchRunPhase`, confirm modal flag |

Header ellipsis: Edit, Synthesize notes, Delete.

---

## Duration field

- **Not edited or displayed** in UI (removed from edit modal, header, list table).
- Capture timing in **project notes** (manual, synthesis, or research summary prose).
- `projects.duration` column retained for backward compat; API may still accept it but UI never writes it.

---

## Setup

1. Run `docs/supabase-projects-schema.sql` in Supabase.
2. Run `docs/supabase-project-notes-synthesis.sql` in Supabase.
3. Run `docs/supabase-project-website-research.sql` in Supabase.
4. Set `ANTHROPIC_API_KEY` and optionally `WEBSITE_SCRAPER_URL` on Express.
5. Update tenant AI prompt templates: replace `{{portfolio_github}}` with `{{projects}}`.
