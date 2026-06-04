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

### Product-specific (007–017)

8. [007 – Studio preview PNG export](./007-studio-preview-png-export.md)
9. [008 – Job-search CRM](./008-job-search-crm.md)
10. [009 – CRM detail UI parity](./009-crm-detail-ui-parity.md)
11. [010 – App shell breadcrumbs](./010-app-shell-breadcrumbs.md)
12. [011 – Technical Skills Studio](./011-technical-skills-studio.md)
13. [012 – Professional Background Studio](./012-professional-background-studio.md)
14. [013 – Job Studio](./013-job-studio.md)
15. [014 – Cover letter generation](./014-cover-letter-generation.md)
16. [015 – Error event logging](./015-error-event-logging.md) — Supabase `reportThunkError` / prod persistence
17. [016 – Client API error handling](./016-client-api-error-handling.md) — `requestApi`, never throw
18. [017 – Job application questions](./017-job-application-questions.md) — reusable prompts + per-job answers
19. [018 – Marketing landing package](./018-marketing-landing-package.md) — `/` marketing, `/dashboard` app home

> **Note:** Express server CRM ADRs use a different index ([009 – `/api/data`](../../code-your-resume-open-source-express-server/.cursor/architecture/009-crm-file-vault-api-data.md) there). Do not confuse with Next **009 – CRM detail UI parity** above.

### Review checklists

- [Audit: Job Studio layout & builder expectations](./audit-studio-and-expectations.md)

## How to use

1. Open the ADR most relevant to your feature.
2. Follow the approved patterns in implementation.
3. Add new ADRs here whenever architectural decisions change—and **update this index** when you do.
