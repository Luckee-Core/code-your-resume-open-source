# Architecture Documentation

This folder contains Architecture Decision Records (ADRs) for the **code-your-resume-open-source** Next.js codebase. Each ADR documents a decision, why it was made, and how to apply it consistently.

## Why ADRs?

ADRs keep implementation consistent across the project by documenting:

- **What** standard we follow
- **Why** we chose it
- **How** to apply it in everyday development

## ADR index (on-disk)

### Shared conventions (001–006)

1. [001 – Redux patterns](./001-redux-patterns.md) — Flat `dumps/` / `current/` / `builders/` layers, manual thunks, logic-free reducers.
2. [002 – Component composition](./002-component-composition.md) — Thin app routes, `src/packages/`, `export const` components.
3. [003 – Styling rules](./003-styling-rules.md) — Styles object + template literals; no inline `style={{}}`.
4. [004 – API integration](./004-api-integration.md) — `src/api/` clients, `ApiResponse<T>`, thunks only; CRM Express exception.
5. [005 – File organization](./005-file-organization.md) — kebab-case, one export per file, barrel `index.ts`, `type` not `interface`.
6. [006 – Constants and utilities](./006-constants-utilities.md) — Shared constants and pure utilities.

### Product-specific (007–014)

7. [007 – Studio preview PNG export](./007-studio-preview-png-export.md) — **html2canvas** capture of the TSX iframe.
8. [008 – Job-search CRM](./008-job-search-crm.md) — Express `/api/data`, employment rows, mentorai User Background rewrite, Redux maps + `current*` detail packages.
9. [009 – CRM detail UI parity](./009-crm-detail-ui-parity.md) — Lead Studio–aligned layout, shared `crm-detail-ui` tokens.
10. [010 – App shell breadcrumbs](./010-app-shell-breadcrumbs.md) — Redux `breadcrumbBuilder`, `useRegisterBreadcrumbTrail`.
11. [011 – Technical Skills Studio](./011-technical-skills-studio.md) — AI coach chat + skill row editor; Express `/api/technical-skills`.
12. [012 – Professional Background Studio](./012-professional-background-studio.md) — Four narrative segments; Express `/api/professional-background`.
13. [013 – Job Studio](./013-job-studio.md) — Job detail two-pane studio; Express `/api/job-studio`.
14. [014 – Cover letter generation](./014-cover-letter-generation.md) — Cursor → cover letter TSX; Graphics Studio persistence.

### Review checklists

- [Audit: Job Studio layout & builder expectations](./audit-studio-and-expectations.md)

## How to use

1. Open the ADR most relevant to your feature.
2. Follow the approved patterns in implementation.
3. Add new ADRs here whenever architectural decisions change—and **update this index** when you do.
