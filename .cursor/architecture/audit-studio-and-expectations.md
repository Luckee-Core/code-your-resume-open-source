# Audit: Job Studio layout, folders, builder column

This document is the **source of truth for reviewers** when auditing the Job Detail / Job Studio UI: where files live, how the shell is composed, and **explicit expectations** for the builder rail (structure, spacing, styling). Normative ADR for product behavior remains [013 – Job Studio](./013-job-studio.md).

---

## Scope

- **In scope**: `src/packages/job-detail-page/` (page shell, header, chat column, builder column), builder spacing/style tokens, related **display** metadata in `src/model/job-detail-builder/`.
- **Out of scope here**: Express `/api/job-studio`, Supabase DDL, Redux thunk internals (only **where** they live).

---

## Route and entry

| Item | Location |
|------|----------|
| App route | `src/app/job-detail-page/page.tsx` → renders `JobDetailPage` from `@/packages/job-detail-page` |
| Package surface | `src/packages/job-detail-page/index.tsx` exports **`JobDetailPage`** |

---

## Folder structure (package)

Everything for this screen lives under **`src/packages/job-detail-page/`**. There is **no** separate `job-studio` package.

```
job-detail-page/
  index.tsx                 # JobDetailPage: data effects, breadcrumbs, shell layout
  header/
    index.tsx               # JobHeader (at-a-glance, posting link, actions)
    edit-modal/
      index.tsx             # JobEditModal
  chat-column/
    index.tsx               # JobDetailChatColumn (coach thread + composer)
    coach-message.tsx       # JobCoachMessage
    constants.ts            # starter prompts
  builder-column/
    index.tsx               # JobDetailBuilderColumn (scroll + list orchestration)
    icp-aligned-styles.ts   # Tailwind strings: draft rail + section card tokens
    section-card.tsx        # JobDetailSectionCard (title outside, card inside)
    responsibilities/index.tsx
    requirements/index.tsx
    nice-to-haves/index.tsx
    applications/
      index.tsx
      ApplicationRow.tsx
      generate-resume/index.tsx
```

**Expectations**

- New UI for this route belongs in **`job-detail-page/`** under **`header/`**, **`chat-column/`**, or **`builder-column/`** — not a new top-level package unless ADR says otherwise.
- CRM subsection widgets for the rail stay **under `builder-column/`** next to their siblings.

---

## Page shell (`index.tsx`)

DOM shape when `currentJob.id` is set:

```text
wrap
  JobHeader
  shell
    chatPane → JobDetailChatColumn
    divider
    builderPane → JobDetailBuilderColumn
```

### Tokens (current)

| Token | Role | Classes (summary) |
|-------|------|---------------------|
| `wrap` | Page padding + vertical stack | `gap-4 px-4 py-4`, full width, column flex |
| `shell` | Two-pane host | `gap-4`; `lg:flex-row lg:gap-5 lg:overflow-hidden lg:min-h-[min(70vh,720px)] lg:flex-1` |
| `chatPane` | Left column host | `flex` column; `lg:max-w-[55%] lg:flex-1 lg:min-h-0` |
| `divider` | Vertical rule | `hidden lg:block`, `w-px bg-gray-300` |
| `builderPane` | Right column host | `flex-1 min-h-0 min-w-0`; `lg:w-[45%] lg:max-w-[45%] lg:h-full` |

**Expectations**

- **Do not** put extra outer padding on the **builder list** inside `JobDetailBuilderColumn`; page-level padding stays on **`wrap`** only unless ADR updates this doc.
- Shell **does not** currently set `bg-zinc-50` (Luckee ICP root does); changing studio chrome should be intentional and reflected here.

---

## Chat column (left)

| Component | File | Outer chrome |
|-----------|------|--------------|
| `JobDetailChatColumn` | `chat-column/index.tsx` | `border border-gray-200 bg-white`; thread area scrolls on `lg` |

Coach-only UX; ledger wiring via Redux/API is described in ADR-013.

---

## Builder column (right)

### DOM shape

```text
JobDetailBuilderColumn
  column          (overflow-hidden flex stack — matches ICP builder outer)
    scroll        (flex-1 overflow-y-auto)
      section[aria-label="Listing bullets and applications"]
        draftColumn
          draftBody       (scroll container on lg)
            ul.draftList
              li × N      (each section component)
```

Section components (`ResponsibilitiesSection`, etc.) each render **`JobDetailSectionCard`**, which produces:

```text
li.sectionItem
  h2.rowSectionTitle      ← label OUTSIDE the card
  div.rowCard             ← bordered panel; children only
```

### Files and responsibilities

| File | Responsibility |
|------|----------------|
| `builder-column/index.tsx` | Composes **`column` → `scroll` → `section` → `draftBody` → `ul`**; imports section widgets in fixed order. |
| `icp-aligned-styles.ts` | Single export **`jobDetailBuilderIcpStyles`**: rail + list + card typography tokens (named after Luckee ICP references for mental mapping only). |
| `section-card.tsx` | **`JobDetailSectionCard`**: enforces **title outside / card inside**; `data-section` matches `JobDetailBuilderSectionKey`. |
| `…/responsibilities` etc. | Redux-backed presentational sections; pass body into **`JobDetailSectionCard`**. |

### Spacing and padding **expectations**

| Token | Intent |
|-------|--------|
| **`draftBody`** | **No** `px-*` / `py-*` / `pb-*` around the list — list is flush to the builder pane content box (only overflow + `lg` scroll behavior). |
| **`draftList`** | `space-y-2` between `<li>` blocks only — tight vertical rhythm; **no** extra `pt-*` on the list. |
| **`sectionItem`** | `gap-2` between **heading** and **card** for each section only. |
| **`rowCard`** | Inner padding `px-3 py-3` **inside** the border — this is the **only** intentional “inset” for section bodies. |

**Anti-patterns**

- Adding a rail-wide **“Sections”** heading or explanatory strip above the list (removed by design).
- Putting section **titles inside** `rowCard` (violates current contract).
- Re-introducing **`px-3 pb-3`** on `draftBody` without updating this audit (creates double gutter with page `wrap`).

### Typography tokens (`jobDetailBuilderIcpStyles`)

| Key | Use |
|-----|-----|
| `rowSectionTitle` | `<h2>` above each card (`text-[13px] font-medium …`). |
| `rowCard` | Bordered white panel for section content. |
| `rowBodyText` / `rowMuted` | Available for table cells / empty states (sections may compose locally). |

---

## Model metadata (builder labels only)

| Item | Location |
|------|----------|
| `JobDetailBuilderSectionKey`, titles, order | `src/model/job-detail-builder/` |

Titles are **not** duplicated as string literals in section files where possible — use **`JOB_DETAIL_BUILDER_SECTION_TITLE`**.

---

## Redux / API pointers (locations only)

| Concern | Location |
|---------|----------|
| Coach transcript slice | `src/store/current/currentJobStudio.ts` |
| Coach UI flags | `src/store/builders/jobStudioBuilder.ts` |
| Load / send thunks | `src/store/thunks/job-studio/` |
| HTTP client | `src/api/job-studio.ts` |
| Next rewrite to Express | `next.config.ts` → `/api/job-studio` |

---

## Expectations summary (audit checklist)

1. **Folders**: Job Studio UI = **`job-detail-page`** only; builder widgets live under **`builder-column/`**.
2. **Shell**: `wrap` → `shell` → `chatPane` | `builderPane`; widths ~55% / 45% on `lg`.
3. **Builder list**: No outer padding on **`draftBody`**; **`draftList`** uses **`space-y-2`** only.
4. **Section pattern**: **`h2` outside**, **`rowCard`** inside; titles from **`job-detail-builder`** model.
5. **Tokens**: Prefer **`icp-aligned-styles.ts`** for rail/card consistency instead of one-off Tailwind on wrappers.

When changing layout or spacing, **update this file** in the same PR so audits stay aligned with code.
