# 015 – Error event logging (Supabase)

## Status

Accepted

## Context

Production failures in Redux thunks need durable storage without Sentry per app. Each error category maps to its own Supabase table with typed columns (no JSONB). Persistence uses the same boundaries as CRM/graphics: Next `src/api/{table}/` → Express `src/data/{table}/` → Supabase.

## Tables ↔ routes ↔ Next API

| Table | Express folder | POST route | Next client |
|-------|----------------|------------|-------------|
| `thunk_errors` | `src/data/thunk-errors/` | `/api/data/thunk-errors/report` | `reportThunkError` in `src/api/thunk-errors/` |
| `ui_errors` | `src/data/ui-errors/` | `/api/data/ui-errors/report` | `reportUiError` in `src/api/ui-errors/` |
| `api_errors` | `src/data/api-errors/` | `/api/data/api-errors/report` | `reportApiError` in `src/api/api-errors/` |

DDL: Express repo `docs/supabase-error-log-schema.sql` (run in tenant Supabase).

## Thunk reporting rules

1. **One stable `event` per thunk file** — becomes the grouping key (e.g. `failedToGenerateCoverLetter`).
2. **Naming** — `failedTo` + PascalCase action from the thunk export.
3. **Prod only** — `reportThunkError` no-ops when `NODE_ENV === 'development'`.
4. **Catch only** — do not report expected control flow (`return 400`, etc.).
5. **Thunks call `src/api/thunk-errors` only** — no `src/utils/error-log/`, no `void` prefix (API returns sync `void`).
6. **Never throw from reporters** — fire-and-forget `fetch` inside `reportThunkError`.

## Example

```typescript
import { coerceErrorFields, reportThunkError } from "@/api/thunk-errors";

} catch (error) {
  const { message, stack } = coerceErrorFields(error);
  reportThunkError({
    event: "failedToGenerateCoverLetter",
    message,
    stack,
    thunkName: "generateCoverLetterThunk",
    collection: "job",
    entityId: jobId,
    severity: "error",
  });
  return 500;
}
```

## Copy to another Next + Express project

1. Run `docs/supabase-error-log-schema.sql` in that app’s Supabase.
2. Copy Express `src/data/thunk-errors/` (and `ui-errors/`, `api-errors/` as needed); mount on `/api/data` aggregator.
3. Set Express `SUPABASE_*`, optional `APP_SLUG`, `GIT_COMMIT_SHA`.
4. Copy Next `src/api/thunk-errors/` (and siblings).
5. Add `reportThunkError` in thunk `catch` blocks.
6. Optional audit: `docs/error-log-thunk-events.md`.

## Anti-patterns

- Umbrella `error-log` meta-folder spanning multiple tables
- `src/services/error-log` validators-only layer
- `void reportThunkError(...)` at call sites (use sync API instead)
- JSONB on error tables

## Related

- Express [010 – Error log persistence](../../code-your-resume-open-source-express-server/.cursor/architecture/010-error-log-persistence.md)
- [004 – API integration](./004-api-integration.md)
- [016 – Client API error handling](./016-client-api-error-handling.md) — `requestApi` transport; this ADR covers reporting only
- wh-expo `docs/architecture/008-sentry-thunk-logging.md` (event-id rules; sink is Supabase here)
