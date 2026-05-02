# ADR 010 — App shell breadcrumbs

## Context

CRM and studio routes sit under a shared `AppShell` with a sidebar. Users need a consistent place to see where they are and jump back to list routes—aligned with luckee-web (`AppLayoutHeader` + `breadcrumbBuilder`) and roads-seller-web (`Breadcrumbs` + `breadcrumbBuilder`).

## Decision

1. **Redux** — Add `breadcrumbBuilder` with `items: BreadcrumbItem[]` and actions `setItems`, `clearItems`, `reset` (`src/store/builders/breadcrumbBuilder.ts`).
2. **Model** — `BreadcrumbItem` supports `label`, optional `href` (Next `Link`), and optional `onSelect` for in-app navigation that must update `current*` slices before pushing a fixed detail route (`src/model/breadcrumb.ts`).
3. **Registration** — Client screens call `useRegisterBreadcrumbTrail(factory, deps)` from `src/utils/navigation/`. The hook uses **`useEffect`** (passive) so it runs **after** the shell header’s **`useLayoutEffect` pathname reset**, avoiding the trail being cleared immediately after registration (same ordering idea as luckee-web’s `useRegisterStaticDashboardBreadcrumbs`).
4. **Fallback** — When `items` is empty after reset, `AppShellBreadcrumbHeader` shows `resolveDefaultDashboardBreadcrumbForPathname(pathname)` so server-only or slow-mounting routes still get a sensible first crumb.
5. **UI** — `AppShellBreadcrumbHeader` renders a Luckee-like row: `border-b`, small gray type, `/` separators, `aria-label="Breadcrumb"`.

## Application

- Detail packages register multi-segment trails (e.g. Companies → company name; Jobs → company → job title with `onSelect` to open company detail).
- Do not duplicate back-link rows in page bodies for the same information; the shell trail is canonical.

## References

- luckee-web: `src/components/AppLayout.tsx`, `src/components/app-layout-header/`, `src/store/builders/breadcrumbBuilder.ts`, `src/utils/dashboard-breadcrumbs/use-register-static-dashboard-breadcrumbs.ts`
- roads-seller-web: `src/components/AppLayout.tsx`, `src/components/breadcrumbs/`, `src/utils/navigation/useRegisterBreadcrumbs.ts`
