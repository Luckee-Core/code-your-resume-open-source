# 009 – CRM detail UI parity (Lead Studio)

## Purpose

CRM detail packages (`company-detail-page`, `job-detail-page`, `company-employee-detail-page`, `job-application-detail-page`) follow the **same layout and surface patterns** as Lead Studio’s **`lead-detail-page`** package (structural reference in the `lead-studio-web-open-source` repo), so multi-product work stays predictable.

## Palette decision (Option A)

We use **Option A**: Tailwind **gray** scale, **blue-600** primary actions (Add / Save application), **#FF7C1E** accent on research icons and chip hovers where Lead does, **red** outline for destructive actions. This matches Lead Studio’s detail chrome; it replaces earlier CRM-only **zinc + orange** primary buttons on these surfaces.

## Layout contract

| Token / area | Classes (see `crm-detail-ui/detail-page-tokens.ts`) |
|--------------|------------------------------------------------------|
| Page wrap | `w-full max-w-6xl mx-auto space-y-6 px-4 py-4` — centered max width for readability on wide monitors (documented deviation from Lead’s unconstrained `w-full` only). |
| Research grid | `grid grid-cols-1 gap-5 lg:grid-cols-2` |
| Two column | `grid grid-cols-1 gap-6 lg:grid-cols-2` |
| Detail header | Card: `bg-white rounded border border-gray-300 py-2 px-3 mb-3 space-y-2`; title row + actions; secondary line for meta / website. |
| Research cards | `rounded-lg border border-gray-200 bg-white p-5 space-y-4`; online profiles row: icon + title. |
| List sections | Outer `section` `space-y-3` only (no outer card); **section title** uppercase `tracking-wider`; table wrapped in `tableShell` with border. |
| Empty states | Dashed border, centered icon + title + hint. |
| Tables | `thead` `bg-gray-50`; header cells `text-xs font-semibold uppercase tracking-wider text-gray-600`; body rows `hover:bg-gray-50` + `cursor-pointer` when row navigates. |
| Accessibility | `aria-labelledby` on sections; visible headings use stable `id`s. |

## Redux / props

Unchanged from [008](./008-job-search-crm.md): sections read **`current*`** and dumps; **row components** take entity props and own navigation/actions.

## Related

- [008 – Job-search CRM](./008-job-search-crm.md) — data and route contract.
- [003 – Styling rules](./003-styling-rules.md) — `styles` object + template literals per file.
