# ADR-012 — Professional Background Studio

## What it is

A single-page editor for **four long-form text segments** that complement **Technical Skills**:

| Segment key | Purpose |
|---|---|
| `education` | Degrees, schools, years |
| `credibility_bio` | Ground-truth credibility — stack, products, location (voice-guide §1 style) |
| `voice_style` | Condensed rules from unified voice doc — channels, modes, CTAs |
| `portfolio_github` | Portfolio / README narrative — projects and tools |

Data is **single-tenant**, stored in Supabase table **`professional_background`** (one row `id = default`, **`segments` JSONB**). Same Supabase project as `technical_skills` and resume TSX ledger.

---

## API (Express)

Mounted at **`/api/professional-background`** (same auth middleware as CRM when `CRM_API_SECRET` is set).

| Method | Path | Body | Response |
|---|---|---|---|
| `GET` | `/api/professional-background` | — | `{ success, segments, updatedAt }` |
| `PATCH` | `/api/professional-background` | `{ segments: Record<4 keys, string> }` | `{ success, segments, updatedAt }` |

Next.js **`next.config.ts`** rewrites `/api/professional-background` to Express.

---

## Frontend

| Path | Role |
|---|---|
| `src/model/professional-background/` | Types + segment keys |
| `src/api/professional-background.ts` | `fetch` clients |
| `src/store/current/currentProfessionalBackground.ts` | Draft segments + fingerprint |
| `src/store/builders/professionalBackgroundBuilder.ts` | Load/save status |
| `src/store/thunks/professional-background/` | `loadProfessionalBackgroundThunk`, `saveProfessionalBackgroundThunk` |
| `src/utils/professional-background/` | Fingerprint for dirty detection |
| `src/packages/professional-background-studio/` | UI |
| `src/app/experience/background/page.tsx` | Route (**`/experience/background`**) |

Sidebar: **Job search → Professional background** (before Technical skills).

---

## Setup

1. Run **`docs/supabase-professional-background-schema.sql`** in Supabase.
2. Ensure Express has **`SUPABASE_URL`** and **`SUPABASE_SERVICE_ROLE_KEY`** (same as Technical Skills).

DDL: `code-your-resume-open-source-express-server/docs/supabase-professional-background-schema.sql`.
