# Architecture Documentation

This folder contains Architecture Decision Records (ADRs) for the **code-your-resume-open-source** Next.js codebase.

## ADR index (on-disk)

### Shared conventions (001–006, 010-public)

1. [001 – Redux patterns](./001-redux-patterns.md) — Flat `dumps/` / `current/` / `builders/` layers, manual thunks.
2. [002 – Component composition](./002-component-composition.md) — Thin app routes, `src/packages/`.
3. [003 – Styling rules](./003-styling-rules.md) — Styles object + template literals.
4. [004 – API integration](./004-api-integration.md) — `src/api/` clients, thunks only.
5. [005 – File organization](./005-file-organization.md) — kebab-case, barrel exports.
6. [006 – Constants and utilities](./006-constants-utilities.md) — Pure utilities.
7. [010 – Public content reads from Express](./010-public-blog-express-fetch.md) — Server Component reads + Redux list hydration.

### Product-specific (007–019)

8. [007 – Studio preview PNG export](./007-studio-preview-png-export.md)
9. [008 – Job-search CRM](./008-job-search-crm.md)
10. [009 – CRM detail UI parity](./009-crm-detail-ui-parity.md)
11. [011 – Technical Skills Studio](./011-technical-skills-studio.md)
12. [012 – Professional Background Studio](./012-professional-background-studio.md)
13. [013 – Job Studio](./013-job-studio.md)
14. [014 – Cover letter generation](./014-cover-letter-generation.md)
15. [015 – Error event logging](./015-error-event-logging.md) — Supabase `reportThunkError` / prod persistence
16. [016 – Client API error handling](./016-client-api-error-handling.md) — `requestApi`, never throw
17. [017 – Job application questions](./017-job-application-questions.md) — reusable prompts + per-job answers
18. [018 – Marketing landing package](./018-marketing-landing-package.md) — `/` marketing, `/dashboard` app home
19. [019 – App shell breadcrumbs](./019-app-shell-breadcrumbs.md)

> **Pair ADR note:** Express server ADR **009** covers `/api/data` entity routers ([009-api-data-entity-routers.md](https://github.com/Luckee-Core/code-your-resume-open-source-express-server/blob/main/.cursor/architecture/009-api-data-entity-routers.md)). Next **009** here is CRM detail UI parity — different topic.

### Review checklists

- [Audit: Job Studio layout & builder expectations](./audit-studio-and-expectations.md)

## How to use

1. Open the ADR most relevant to your feature.
2. Follow the approved patterns in implementation.
3. Add new ADRs here whenever architectural decisions change—and **update this index** when you do.
