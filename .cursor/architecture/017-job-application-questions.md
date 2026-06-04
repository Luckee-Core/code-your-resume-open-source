# 017 – Job application questions

## Objective

Reusable application-form questions (`JobQuestion`) and per-job answers (`JobQuestionAnswer`) for job search CRM. Questions stand alone; jobs link via answer rows.

## Data model

| Table | TypeScript | Purpose |
|-------|------------|---------|
| `job_questions` | `JobQuestion` | Standalone prompt catalog (`id`, `prompt`, timestamps) |
| `job_question_answers` | `JobQuestionAnswer` | Links `jobId` + `jobQuestionId` + `answer`; `UNIQUE (job_id, job_question_id)` |

No `defaultAnswer` on questions — answers live only on `JobQuestionAnswer`.

## Express

- Data: `src/data/job-questions/`, `src/data/job-question-answers/` — **one CRUD function per file**
- Routes (flat siblings under `/api/data`):
  - `/api/data/job-questions/*`
  - `/api/data/job-question-answers/*` (`GET /list?jobId=` for per-job answers)
- Supabase via `requireCrmSupabaseClient()`; DDL in express-server `docs/crm-postgres-schema.sql`

## Next.js

- Models: `src/model/job-question.ts`, `src/model/job-question-answer.ts`
- API: `src/api/job-questions/`, `src/api/job-question-answers/`
- Redux dumps: `jobQuestions`, `jobQuestionAnswers` — no `current*` slice
- Thunks: `src/store/thunks/job-questions/`, `src/store/thunks/job-question-answers/`
- UI:
  - `/job-questions` list page (sidebar) — manage question catalog
  - Job detail right column — link questions, edit per-job answers

## Load strategy

- `loadJobQuestionsThunk()` — full catalog on list page and job detail
- `loadJobQuestionAnswersForJobThunk(jobId)` — per job on job detail only
- Not part of `loadCrmVaultThunk`

## References

- [008 – Job-search CRM](./008-job-search-crm.md)
- [013 – Job Studio](./013-job-studio.md)
