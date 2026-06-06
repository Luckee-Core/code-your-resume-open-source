# ADR 019 — App shell breadcrumbs

## Context

CRM and studio routes sit under a shared `AppShell` with a sidebar. Users need a consistent place to see where they are and jump back to list routes — following the dashboard breadcrumb pattern used in TroutHouse OSS apps (Redux `breadcrumbBuilder` + shell header).

## Decision

1. **Redux** — Add `breadcrumbBuilder` with `items: BreadcrumbItem[]` and actions `setItems`, `clearItems`, `reset` (`src/store/builders/breadcrumbBuilder.ts`).
2. **Model** — `BreadcrumbItem` supports `label`, optional `href` (Next `Link`), and optional `onSelect` for in-app navigation that must update `current*` slices before pushing a fixed detail route (`src/model/breadcrumb.ts`).
3. **Registration** — Client screens call `useRegisterBreadcrumbTrail(factory, deps)` from `src/utils/navigation/`. The hook uses **`useEffect`** (passive) so it runs **after** the shell header’s **`useLayoutEffect` pathname reset**, avoiding the trail being cleared immediately after registration.
4. **Fallback** — When `items` is empty after reset, `AppShellBreadcrumbHeader` shows `resolveDefaultDashboardBreadcrumbForPathname(pathname)` so server-only or slow-mounting routes still get a sensible first crumb.
5. **UI** — `AppShellBreadcrumbHeader` renders a compact row: `border-b`, small gray type, `/` separators, `aria-label="Breadcrumb"`.

## Application

- Detail packages register multi-segment trails (e.g. Companies → company name; Jobs → company → job title with `onSelect` to open company detail).
- Do not duplicate back-link rows in page bodies for the same information; the shell trail is canonical.

## References

- Implementation: `src/components/AppShell.tsx`, `src/components/app-shell-breadcrumb-header.tsx`, `src/utils/navigation/use-register-breadcrumb-trail.ts`
