# 020 – Documentation site API reference (`/docs/api`)

## Status
Accepted

## Context
**code-your-resume-open-source** calls Express for CRM and studio data (ADR 008). Documentation includes prose guides under `/docs/**` and a live API reference catalog from Express at `GET /api-docs.json` (Express ADR 011). This ADR defines how the web app renders the API reference.

## Decision

### 1) Docs shell and routes
- Shared layout: `src/app/docs/layout.tsx` wraps all docs routes in `DocsShell` from `src/packages/docs/`.
- Docs live **outside** `(app)/` — no `AppShell`, no dashboard breadcrumbs (ADR 018).
- Prose pages are Server Components under `src/app/docs/**/page.tsx`.
- API reference: `src/app/docs/api/page.tsx` → `ApiDocsView` (client) from `src/packages/api-docs/`.

### 2) Package layout
| Package | Role |
| --- | --- |
| `src/packages/docs/` | Shell, sidebar, nav tree, `DocsCatalogProvider` |
| `src/packages/api-docs/` | API catalog UI (`ApiDocsView`, `ApiDocsContent`, `EndpointCard`) |

### 3) Sidebar navigation
- Two sections in `DocsSidebar`: **Guides** (`DOCS_NAV_ENTRIES`) and **API** (catalog groups).
- API entities are injected from the Express catalog in `src/app/docs/layout.tsx` via `buildApiGroupSidebarChildren()`.
- Path constants in `src/config/routes.ts` (`DOCS_API_PATH`, `DOCS_*`).
- `DocsSidebar` is a client component using `usePathname()` and `hashchange` for active states on `#group-*` anchors.

### 4) Data fetching (single layout fetch)
- `src/app/docs/layout.tsx` calls `getApiDocsCatalogCached()` once and passes the snapshot to `DocsCatalogProvider`.
- `ApiDocsView` reads that context — **no second fetch** on `/docs/api`.
- **No Redux slice or thunk** — catalog is ephemeral page data (extends ADR 010 server-read exception; not domain dashboard state).
- Do **not** add `src/app/api/**` route handlers for the catalog.

### 5) API client
- `getApiDocsCatalog()` returns `Promise<ApiResult<ApiDocsCatalog>>` via `requestApi` (ADR 016).
- Server-side fetch uses absolute URL `${resolveCrmExpressBaseUrl()}/api-docs.json` (not browser rewrites).
- Catalog types duplicated in `src/api/api-docs/types.ts` (no shared npm package).

### 6) UI rules
- Named exports only; default export only on `app/docs/**/page.tsx`.
- Styles object pattern (ADR 003); one primary component per file (ADR 005).
- Overview group renders as **h1** with version, baseUrl, envelope; descriptions split on `\n\n`.
- Docs sidebar includes brand link back to landing (`/`).

## Consequences
- Express must be running for `/docs/api` and the API sidebar section to populate; prose guide pages work without Express.
- Catalog shape changes require updates in both repos.
- New prose docs pages require an entry in `DOCS_NAV_ENTRIES` and a route constant in `src/config/routes.ts`.

## Related
- [008 – Job-search CRM](./008-job-search-crm.md)
- [010 – Public content reads from Express](./010-public-blog-express-fetch.md)
- [016 – Client API error handling](./016-client-api-error-handling.md)
- Express [011 – API docs catalog](../../code-your-resume-open-source-express-server/.cursor/architecture/011-api-docs-catalog.md)
