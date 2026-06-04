# 018 – Marketing landing package

## Status

Accepted

## Context

Public visitors need a marketing home that explains the OSS job-application studio. The Lovable prototype lives in `tailored-career-studio`; production UI belongs in this Next app following Luckee/Roads landing package conventions.

## Decision

### Routes and shell

| Path | Layout | Content |
|------|--------|---------|
| `/` | Root only (no `AppShell`) | `MarketingLanding` in `src/packages/landing/` |
| `/dashboard` | `(app)/layout.tsx` + `AppShell` | Graphics list (former root home) |
| All other app routes | `(app)/` route group | Unchanged URLs, inherit `AppShell` |

`src/app/api/**` stays at the app root (no shell; not affected).

### Package layout

Mirror [luckee-marketing `src/packages/landing/`](../../../luckee/luckee-marketing/src/packages/landing/):

- `marketing-landing.tsx` — composer only
- One folder per section (`hero/`, `feature-crm/`, …)
- Shared `components/` (`LandingKicker`, `LandingSectionLabel`)
- `constants/` for CLI snippet, GitHub URL, CTA paths

Thin route: `src/app/(marketing)/page.tsx` exports metadata and renders `<MarketingLanding />`.

### Brand tokens

Landing uses CSS variables in `src/app/globals.css`: primary `#FF7C1E`, muted `#71717A`, utilities `kicker`, `hero-grid-bg`, `hero-orb-*`. In-app CRM chrome may still use legacy `orange-600` until unified.

### Links

- **Get started** → `DASHBOARD_PATH` (`/dashboard`)
- **Docs** → `DOCS_GETTING_STARTED_PATH`
- **GitHub** → `NEXT_PUBLIC_LANDING_GITHUB_URL` or default repo URL in `landing-links.ts`

### Styling

Per [003 – Styling rules](./003-styling-rules.md): `styles` object after each component; no per-section CSS files. Decorative hero orbs use `@utility` in `globals.css`, not inline `style={{}}`.

## References

- Luckee marketing landing composer and section folders
- Roads marketing `welcome-page.tsx` (header / main / footer composition)

## PR checklist

- [ ] New sections live under `src/packages/landing/`, not inline in `page.tsx`
- [ ] `/` has no sidebar; `/dashboard` is the app entry in sidebar nav
- [ ] CTAs use `config/routes` constants, not hard-coded paths
