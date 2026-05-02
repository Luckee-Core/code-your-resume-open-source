# ADR-011 — Technical Skills Studio

## What it is

The Technical Skills Studio is a two-column AI-powered editor that lets users build and refine a technical skills list with help from a coach chatbot. The left column is a chat thread; the right column is a live editable table of skill rows.

It replaced the old "User Background Studio" / "ICP Studio" module. All code, types, routes, and table names now use the `technical-skills` / `technicalSkills` identifier.

---

## Where the code lives

### Frontend (`code-your-resume-open-source`)

| Path | What it is |
|---|---|
| `src/packages/technical-skills-studio/` | Root UI package (studio shell, builder column, chat column) |
| `src/packages/technical-skills-studio/index.tsx` | Studio root — mounts on load, shows error/loading states |
| `src/packages/technical-skills-studio/builder-column/` | Right-side skill row editor |
| `src/packages/technical-skills-studio/builder-column/header/` | Save bar |
| `src/packages/technical-skills-studio/builder-column/job-bullets-panel/` | Collapsible reference panel — bullets from past jobs |
| `src/packages/technical-skills-studio/chat-column/` | Left-side coach chat thread |
| `src/packages/technical-skills-studio/chat-column/CoachStructuredMessage.tsx` | Renders a coach message + accept suggestion cards |
| `src/packages/technical-skills-studio/constants.ts` | Starter prompt pills shown on empty state |
| `src/api/technical-skills.ts` | Frontend API client (`fetch` calls to Express) |
| `src/model/technical-skills/TechnicalSkills.ts` | TypeScript types for skills, suggestions, messages, payload |
| `src/model/technical-skills/index.ts` | Barrel export |
| `src/store/builders/technicalSkillsBuilder.ts` | Redux slice — UI status (loadStatus, isSaving, isPostingMessage) |
| `src/store/current/currentTechnicalSkills.ts` | Redux slice — draft skills, messages, committedFingerprint |
| `src/store/thunks/technical-skills/` | All async thunks |
| `src/utils/technical-skills/` | Pure utility functions |
| `src/app/experience/studio/page.tsx` | Next.js route that renders `<TechnicalSkillsStudio />` |

### Express server (`code-your-resume-open-source-express-server`)

| Path | What it is |
|---|---|
| `src/api/technical-skills/router.ts` | Express router factory — mounted at `/api/technical-skills` |
| `src/api/technical-skills/routes/` | One handler file per route |
| `src/api/technical-skills/loadTechnicalSkillsPayload.ts` | Assembles the full studio payload (skills + chat history) |
| `src/api/technical-skills/processTechnicalSkillsChat.ts` | Runs one coach turn (AI call + DB writes) |
| `src/api/technical-skills/buildTechnicalSkillsCoachPrompt.ts` | Builds the Anthropic system + user prompt |
| `src/api/technical-skills/parseTechnicalSkillsCoachJson.ts` | Parses + validates the AI JSON response |
| `src/data/technical-skills/` | All Supabase CRUD functions |
| `docs/supabase-technical-skills-schema.sql` | Full DDL for all 5 tables |
| `docs/technical-skills-studio-tables.md` | Human-readable table reference |

---

## Data model

### Frontend types (`src/model/technical-skills/TechnicalSkills.ts`)

```typescript
TechnicalSkillItem {
  id: string
  sortOrder: number
  title: string          // tool / technology name
  body: string | null    // 1-2 sentence usage description
  status: 'active' | 'archived'
  sourceExchangeId?: string | null
}

TechnicalSkillSuggestion {
  id: string
  title: string
  body: string | null
  op: 'add' | 'update'
  targetSkillId: string | null
  exchangeId: string
}

TechnicalSkillsChatMessage {
  id: string
  role: 'user' | 'coach'
  content: string
  sections?: { heading: string; bullets: string[] }[]
  suggestedSkills?: TechnicalSkillSuggestion[]
  timestamp: string   // formatted clock (e.g. "2:14 PM")
  rawTime: string     // ISO string — used for rolling-window filter
}

TechnicalSkillsStudioPayload {
  skills: TechnicalSkillItem[]
  messages: TechnicalSkillsChatMessage[]
}
```

### Supabase tables

Five tables, all prefixed `technical_skills_`:

| Table | Purpose |
|---|---|
| `technical_skills` | The live skill rows the user edits |
| `technical_skills_requests` | One row per user chat message |
| `technical_skills_responses` | One row per AI coach reply (stores structured JSONB) |
| `technical_skills_exchanges` | Links one request to one response; holds token/credit ledger |
| `technical_skills_suggestions` | AI-proposed skill additions/updates — `pending → accepted/rejected` |

No `profile_id`, no `user_id`, no `segment_key`. The system is single-tenant — one set of rows per deployment.

Full DDL: `docs/supabase-technical-skills-schema.sql`
Table docs: `docs/technical-skills-studio-tables.md`

---

## API routes

All routes are proxied by Next.js rewrites (`next.config.ts`) from `/api/technical-skills/*` to the Express server on port 3053.

| Method | Path | Handler | What it does |
|---|---|---|---|
| `GET` | `/api/technical-skills` | `getSkillsHandler` | Returns full payload (skills + chat history) |
| `PATCH` | `/api/technical-skills/skills` | `patchSkillsHandler` | Full-replace all skill rows |
| `POST` | `/api/technical-skills/messages` | `postMessageHandler` | Send a user message, get AI coach reply |
| `POST` | `/api/technical-skills/suggestions/:id/accept` | `acceptSkillSuggestionHandler` | Accept one pending suggestion → writes skill row |

All responses return `{ success: true, skills: [...], messages: [...] }` on success or `{ success: false, error: "..." }` on failure.

---

## Redux state

### `technicalSkillsBuilder` slice (`src/store/builders/technicalSkillsBuilder.ts`)

UI status flags only — no data.

```
loadStatus: 'idle' | 'loading' | 'loaded' | 'error'
error: string | null
isSaving: boolean
isPostingMessage: boolean
```

### `currentTechnicalSkills` slice (`src/store/current/currentTechnicalSkills.ts`)

The actual data the UI reads and edits.

```
draftTechnicalSkills: TechnicalSkillItem[]
messages: TechnicalSkillsChatMessage[]
committedFingerprint: string   // JSON fingerprint of last server-saved skills list
```

The `committedFingerprint` is set after every load and save. The builder column computes a live fingerprint of `draftTechnicalSkills` and compares it — if they differ, the Save button is enabled (dirty state).

---

## Thunks (`src/store/thunks/technical-skills/`)

| Thunk | What it does |
|---|---|
| `loadTechnicalSkillsThunk` | GET `/api/technical-skills` → syncs skills, messages, commits fingerprint |
| `saveTechnicalSkillsThunk` | PATCH `/api/technical-skills/skills` → syncs skills, commits fingerprint |
| `sendTechnicalSkillsMessageThunk(content)` | POST `/api/technical-skills/messages` → syncs skills + messages |
| `acceptTechnicalSkillSuggestionThunk(id)` | POST `/api/technical-skills/suggestions/:id/accept` → syncs skills + messages |

All thunks return `Promise<200 | 400 | 500>` and use the `AppThunk` pattern (no `createAsyncThunk`).

---

## Full data flow

### On page load

```
TechnicalSkillsStudio mounts
  → dispatch(loadTechnicalSkillsThunk())
    → GET /api/technical-skills
      → loadTechnicalSkillsPayload(supabase)
        → listTechnicalSkills()          → SELECT from technical_skills
        → listTechnicalSkillsExchanges() → SELECT from technical_skills_exchanges
        → listTechnicalSkillsRequests()  → SELECT from technical_skills_requests
        → listTechnicalSkillsResponses() → SELECT from technical_skills_responses
        → listTechnicalSkillsSuggestions() → filters to pending only
      ← returns { skills, messages }
    ← dispatch(syncDraftTechnicalSkills(skills))
    ← dispatch(commitSkillsFingerprint())
    ← dispatch(syncMessages(messages))
```

### When the user saves

```
User clicks Save
  → dispatch(saveTechnicalSkillsThunk())
    → reads draftTechnicalSkills from store
    → PATCH /api/technical-skills/skills  { technicalSkills: [...] }
      → replaceTechnicalSkills(supabase, items)
        → DELETE all rows from technical_skills
        → INSERT new rows
      ← returns updated payload
    ← dispatch(syncDraftTechnicalSkills(skills))
    ← dispatch(commitSkillsFingerprint())
```

### When the user sends a message

```
User types + hits Enter
  → dispatch(sendTechnicalSkillsMessageThunk(content))
    → POST /api/technical-skills/messages  { content }
      → processTechnicalSkillsChat(supabase, content)
        → INSERT technical_skills_requests  (status: pending)
        → buildTechnicalSkillsCoachPrompt() with current skills as context
        → Anthropic API call
        → INSERT technical_skills_responses (structured JSONB)
        → INSERT technical_skills_exchanges (token ledger)
        → UPDATE technical_skills_requests  (status: completed)
        → INSERT technical_skills_suggestions (status: pending) for each suggestion
      ← returns updated payload
    ← dispatch(syncDraftTechnicalSkills(skills))
    ← dispatch(syncMessages(messages))
```

### When the user accepts a suggestion

```
User clicks Accept on a suggestion card
  → dispatch(acceptTechnicalSkillSuggestionThunk(suggestionId))
    → POST /api/technical-skills/suggestions/:id/accept
      → UPDATE technical_skills_suggestions SET status = 'accepted'
      → INSERT (or UPDATE) technical_skills row
      ← returns updated payload
    ← dispatch(syncDraftTechnicalSkills(skills))
    ← dispatch(syncMessages(messages))
```

---

## UI layout

```
/experience/studio
└── TechnicalSkillsStudio
    ├── TechnicalSkillsStudioChatColumn   (left, flex-1)
    │   ├── Empty state + starter prompts  (shown when no messages)
    │   ├── Message thread                 (user bubbles + CoachStructuredMessage)
    │   └── Composer textarea + Send button
    └── TechnicalSkillsBuilderColumn      (right, ~45% width)
        ├── TechnicalSkillsBuilderColumnHeader  (title + Save button)
        ├── Skill rows table               (title input + body textarea + Remove)
        └── JobBulletsPanel                (collapsible — bullets from past jobs)
```

---

## Utility functions (`src/utils/technical-skills/`)

| Function | Purpose |
|---|---|
| `getTechnicalSkillsFingerprint(items)` | Stable JSON string of sorted skill rows — used for dirty detection |
| `filterTechnicalSkillsMessagesRollingWindow(messages)` | Keeps only messages within the last 7 days |

---

## Next.js proxy config

`next.config.ts` rewrites these paths to `http://127.0.0.1:3053` in development:

```
/api/data/:path*             → Express /api/data/:path*
/api/technical-skills/:path* → Express /api/technical-skills/:path*
/api/technical-skills        → Express /api/technical-skills
```

In production, set `CRM_EXPRESS_INTERNAL_URL` env var to point to the deployed Express server.

---

## Setup checklist

1. Run `docs/supabase-technical-skills-schema.sql` in the correct Supabase project
2. Seed existing skills if migrating from the old `user_background_segment_items` table
3. Confirm `SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY` are set in the Express server `.env`
4. Start the Express server (`npm run dev` in `code-your-resume-open-source-express-server`)
5. Start Next.js (`npm run dev` in `code-your-resume-open-source`)
6. Navigate to `/experience/studio`
