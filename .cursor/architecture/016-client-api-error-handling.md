# 016 – Client API error handling (`requestApi`)

## Status

Accepted

## Context

Outbound HTTP from `src/api/**` was inconsistent: most CRM modules used `parseApiJson` (no network try/catch), generation/studio modules threw `Error`, and two company helpers returned raw `Response`. Thunks could receive unhandled rejections when `fetch` failed.

[015 – Error event logging](./015-error-event-logging.md) covers **prod persistence** of unexpected thunk failures (`reportThunkError`). This ADR covers the **transport boundary** — normalizing fetch + parse so API functions never throw.

## Decision

### 1) Single transport wrapper

All outbound browser `fetch` calls in `src/api/**` (except fire-and-forget error reporters in `thunk-errors/`, `api-errors/`, `ui-errors/`) go through **`requestApi`** in [`src/api/_shared/request-api.ts`](../../src/api/_shared/request-api.ts).

Shared primitives live under **`src/api/_shared/`**:

| File | Role |
|------|------|
| `types.ts` | `ApiResponse<T>`, `ApiResult<T>` |
| `parse-api-json.ts` | Response body → `{ success, data?, error? }` |
| `request-api.ts` | `fetch` + `parseApiJson`; never throws |
| `normalize-tsx-api-result.ts` | Maps Express `{ success, tsx }` → `ApiResult<{ tsx: string }>` (generation routes) |

Root [`src/api/types.ts`](../../src/api/types.ts) and [`src/api/parse-api-json.ts`](../../src/api/parse-api-json.ts) re-export from `_shared/` for backward-compatible imports.

### 2) Contract

```ts
export type ApiResponse<T> = {
  success: boolean;
  data?: T;
  error?: string;
};

export type ApiResult<T> = ApiResponse<T> & { httpStatus: number };
```

| `httpStatus` | Meaning |
|--------------|---------|
| `200`–`599` | HTTP status from the response |
| `0` | Client-side network failure (`fetch` threw) |

**Live Express JSON** uses `{ success, data?, error? }` (and sometimes top-level fields like `tsx`, `segments`, `skills`). This ADR does **not** adopt the aspirational `ok`/error-code union shown in [004 – API integration](./004-api-integration.md) examples.

### 3) API modules never throw

- Return `ApiResult<T>` (or a widened type with extra top-level fields preserved at runtime).
- Do **not** call `reportThunkError` or `reportApiError` from transport code.

### 4) Thunk handling

Per [001 – Redux patterns](./001-redux-patterns.md):

```ts
const result = await listJobsApi();
if (!result.success || !result.data) {
  return result.httpStatus === 400 ? 400 : 500;
}
```

Per [015 – Error event logging](./015-error-event-logging.md):

- **`!result.success`** → control flow (`return 400/500`); **no** `reportThunkError`.
- **`catch`** → unexpected throws (dispatch bugs, non-API failures); **`reportThunkError`** in prod.

Generation thunks check `result.success` for the API step; outer `try/catch` + `reportThunkError` remains for persistence/dispatch failures.

### 5) Server Component reads

[010 – Public content reads from Express](./010-public-blog-express-fetch.md) allows Server Components to call `src/api/**` directly for published content. Those modules still use `requestApi` when added.

## Examples

### Standard CRM

```ts
export const createCompanyApi = async (body: CreateCompanyBody): Promise<ApiResult<Company>> =>
  requestApi<Company>("/api/data/company/create", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
```

### Generation (top-level `tsx`)

```ts
const result = await requestApi<{ tsx: string }>("/api/data/cover-letter/generate", { ... });
return normalizeTsxApiResult(result);
```

### Discover (extra top-level fields)

```ts
export type DiscoverSitePageUrlsResult = ApiResult<Company> & {
  companyUpdated?: boolean;
  linkCount?: number;
  message?: string;
};
```

## Anti-patterns

- Bare `fetch()` in domain API files
- `throw new Error(...)` from `src/api/**` client modules
- `reportThunkError` on routine `!result.success` (400/500 control flow)
- Putting I/O transport in `src/utils/` (belongs in `src/api/_shared/`)

## Related

- [004 – API integration](./004-api-integration.md) — placement, thunk-only access
- [001 – Redux patterns](./001-redux-patterns.md) — `httpStatus` → `200 | 400 | 500`
- [015 – Error event logging](./015-error-event-logging.md) — prod Supabase reporting
- BFF proxy logging: [`src/lib/crm-proxy/proxy-to-crm-express.ts`](../../src/lib/crm-proxy/proxy-to-crm-express.ts)

## PR checklist

- [ ] New/changed API call uses `requestApi` (not bare `fetch`)
- [ ] Returns `ApiResult<T>`; never throws
- [ ] Thunk checks `result.success`; maps `httpStatus` to status union
- [ ] Unexpected failures use `reportThunkError` in **catch** only (ADR 015)
- [ ] JSDoc on new exported API functions
