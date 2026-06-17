# ADR-022 — Voice Style Studio

## What it is

Singleton **tone/voice notes** for AI generation — separate from work history (Projects) and technical skills.

| Layer | Detail |
|---|---|
| Table | `voice_style` — single row `id = 'default'`, `body` text |
| API | `GET/PATCH /api/voice-style` (Express studio router) |
| Redux | `currentVoiceStyle`, `voiceStyleBuilder` |
| UI | `/experience/voice` — single textarea studio |
| AI | `loadJobGenerationContext` → `voiceStyle` string; `assertHasNarrativeContext` requires projects **or** voice |

Replaces the old `voice_style` segment from Professional Background (removed in favor of this table + Projects).

---

## Where the code lives

### Frontend

| Path | Role |
|---|---|
| `src/packages/voice-style-studio/` | Studio UI |
| `src/api/voice-style.ts` | GET/PATCH client |
| `src/model/voice-style/` | Types |
| `src/store/current/currentVoiceStyle.ts` | Draft body + fingerprint |
| `src/store/builders/voiceStyleBuilder.ts` | Load/save status |
| `src/store/thunks/voice-style/` | Load/save thunks |
| `src/app/(app)/experience/voice/page.tsx` | Route |
| `src/app/api/voice-style/[[...path]]/route.ts` | BFF proxy |

### Express

| Path | Role |
|---|---|
| `src/api/voice-style/` | Router + handlers |
| `src/data/voice-style/` | `getVoiceStyle`, `upsertVoiceStyle` |
| `docs/supabase-voice-style-schema.sql` | DDL |

---

## Generation gating

Letter-style flows (cover letter, company interest, team conversation) call `assertHasNarrativeContext`:

- Pass if `projectsBlock` is non-empty **or** `voiceStyle.trim()` is non-empty
- Client mirrors via `hasNarrativeContextForGeneration` in job detail generate panels

Resume generation still requires active technical skills only; voice/projects are optional context in prompts.

---

## Setup

1. Run `docs/supabase-voice-style-schema.sql` in Supabase.
2. Optional migration from legacy `professional_background.segments->>'voice_style'` before running `docs/supabase-drop-professional-background.sql`.
3. Apply prompt v4 SQL files for cover letter, company interest, and team conversation.
