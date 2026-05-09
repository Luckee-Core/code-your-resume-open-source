# Architecture Documentation

This folder contains Architecture Decision Records (ADRs) for the **google-maps-scraper-web** Next.js codebase. Each ADR documents a decision, why it was made, and how to apply it consistently.

## Why ADRs?

ADRs keep implementation consistent across the project by documenting:

- **What** standard we follow
- **Why** we chose it
- **How** to apply it in everyday development

## ADR index (on-disk)

1. [001 – Redux patterns](./001-redux-patterns.md) — Redux Toolkit slices, store wiring, and usage in the app.
2. [002 – Component composition](./002-component-composition.md) — Component boundaries and composition rules.
3. [003 – Styling rules](./003-styling-rules.md) — Tailwind and global CSS conventions.
4. [004 – API integration](./004-api-integration.md) — API clients, typing, and separation from UI.
5. [005 – File organization](./005-file-organization.md) — Canonical `src/` layout (`packages/`, `api/`, etc.).
6. [006 – Constants and utilities](./006-constants-utilities.md) — Shared constants and pure utilities.
7. [007 – Studio preview PNG export](./007-studio-preview-png-export.md) — **html2canvas** capture of the TSX iframe (`#root`, `foreignObjectRendering`, clone tuning).
8. [008 – Job-search CRM](./008-job-search-crm.md) — local JSON vault, **Express `/api/data`**, employment rows, **mentorai** User Background Studio rewrite, Redux maps + `current*` detail packages, flat CRM `src/model` files.
9. [009 – CRM detail UI parity](./009-crm-detail-ui-parity.md) — Lead Studio–aligned layout, gray/blue chrome, tables, empty states, shared `crm-detail-ui` tokens.
10. [010 – App shell breadcrumbs](./010-app-shell-breadcrumbs.md) — Redux `breadcrumbBuilder`, `useRegisterBreadcrumbTrail`, fallback resolver, `AppShellBreadcrumbHeader`.
11. [011 – Technical Skills Studio](./011-technical-skills-studio.md) — AI coach chat + skill row editor; flat Supabase schema, Express `/api/technical-skills`, Redux `currentTechnicalSkills` + `technicalSkillsBuilder`, full data-flow diagrams.
12. [012 – Professional Background Studio](./012-professional-background-studio.md) — four narrative segments (education, credibility, voice, portfolio); Supabase `professional_background`, Express `/api/professional-background`, Redux `currentProfessionalBackground`, route `/experience/background`.
13. [013 – Job Studio](./013-job-studio.md) — job detail as two-pane studio (coach chat + builder); Supabase `job_studio_*` ledger (no suggestions); Express `/api/job-studio`; header holds at-a-glance + posting link.

## How to use

1. Open the ADR most relevant to your feature.
2. Follow the approved patterns in implementation.
3. Add new ADRs here whenever architectural decisions change—and **update this index** when you do.
