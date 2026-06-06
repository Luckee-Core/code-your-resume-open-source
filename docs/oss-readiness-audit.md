# OSS Release Readiness Audit — Code Your Resume (Pair)

**Archetype:** Web + Express pair  
**Audited:** 2026-06-05  
**Repos:**
- Web: `code-your-resume-open-source`
- Express: `code-your-resume-open-source-express-server`

**Governance reference:** [mentorai-server/data/open-source/oss-release-readiness-checklist.md](https://github.com/luckee/mentorai-server/blob/main/data/open-source/oss-release-readiness-checklist.md)

---

## §1 Legal and community

| # | Item | Status | Evidence |
|---|------|--------|----------|
| 1.1 | LICENSE at repo root | **fail → fix** | Missing both repos; MIT planned |
| 1.2 | CONTRIBUTING.md | **fail → fix** | Missing both repos |
| 1.3 | CODE_OF_CONDUCT.md | N/A | Optional Rec |
| 1.4 | CHANGELOG.md | N/A | Optional Rec |
| 1.5 | No secrets in tracked files | **pass** | `.env.example` placeholders only; `.env` gitignored |

---

## §2 Product and documentation

| # | Item | Status | Evidence |
|---|------|--------|----------|
| 2.1 | README complete | **partial → fix** | Both have README; Express stale JSON-vault narrative |
| 2.2 | README links companion + governance | **fail → fix** | No governance pack link; companion link partial |
| 2.3 | `.env.example` | **pass** | Both repos present |
| 2.4 | SECURITY.md | **pass** | Both repos present |
| 2.5 | Threat model | **pass** | SECURITY.md + README threat sections |
| 2.6 | Wire contract filled | **fail → fix** | `docs/wire-contract.md` planned |
| 2.7 | In-app OSS onboarding | **partial** | `src/app/(app)/docs/getting-started/` exists |
| 2.8 | Supabase runbook | **partial → fix** | Express `docs/*.sql`; web README needs link |

---

## §3 Codebase shape — frontend

| # | Item | Status | Evidence |
|---|------|--------|----------|
| 3.1 | `src/packages/` + thin `src/app` | **pass** | Feature packages under `src/packages/` |
| 3.2 | Redux manual thunks | **pass** | No `createAsyncThunk` in `src/` |
| 3.3 | Styles object pattern | **partial** | Drift in `ai-skills.tsx`, company-detail At a glance |
| 3.4 | `.cursor/` ADRs + AGENTS current | **partial → fix** | Duplicate ADR 010; cross-repo links; ADR 008 drift |
| 3.5 | No dead route-only components | **pass** | Routes wired to packages |

---

## §4 Codebase shape — Express backend

| # | Item | Status | Evidence |
|---|------|--------|----------|
| 4.1 | Thin routers + handlers | **partial → fix** | 6 inline routers; most CRM handlers compliant |
| 4.2 | `/api/data` entity routers | **partial** | `createApiDataRouter()` in `index.ts`; fork exception vs Lead Studio naming |
| 4.3 | CRUD in `src/data/{entity}/` | **partial** | Mostly compliant; some inline `.from()` in services |
| 4.4 | Managed clients at startup | **pass** | `index.ts` exits if Supabase unset |
| 4.5 | Emoji logging + error JSON | **partial → fix** | Inconsistent `📥`/`📤` on some handlers |
| 4.6 | ADR 009 entity-router pattern | **fail → fix** | Was `009-crm-file-vault-api-data.md`; rename planned |
| 4.7 | Dev auth bypass documented | **pass** | CRM_API_SECRET optional; README documents local dev |

---

## §5 Security — client-heavy

| # | Area | Status | Evidence |
|---|------|--------|----------|
| 5.1 | `NEXT_PUBLIC_*` hygiene | **pass** | No service keys in client env |
| 5.2 | Storage keys versioned | N/A | Minimal localStorage use |
| 5.3 | Live code preview honesty | **partial** | Babel standalone in graphics studio — documented in SECURITY.md |
| 5.4 | HTML / Markdown injection | **partial** | User-generated resume content; mitigated by React rendering |
| 5.5 | CDN scripts pinned | N/A | No external CDN scripts in core path |
| 5.6 | README claims match behavior | **partial → fix** | Express README JSON-primary claim wrong |

---

## §6 Security — package and backend

| # | Area | Status | Evidence |
|---|------|--------|----------|
| 6.1 | Publish boundary | N/A | Not npm packages |
| 6.2 | Env split | **pass** | Supabase keys Express-only |
| 6.3 | Network disclosure | **pass** | No silent telemetry |
| 6.4 | Auth on mutating routes | **pass** | Optional `CRM_API_SECRET`; threat model documented |
| 6.5 | CORS documented | **pass** | `.env.example` CORS_ORIGINS |
| 6.6 | Rate limits on expensive routes | Rec | AI/Cursor routes — document as local-only |
| 6.7 | Dependencies audit | **partial → fix** | CI audit planned |

---

## §7 Pair contract

| # | Item | Status | Evidence |
|---|------|--------|----------|
| 7.1 | API URL env documented | **partial → fix** | Uses `EXPRESS_API_URL` + rewrites (not `NEXT_PUBLIC_SERVER_URL`) — document in wire contract |
| 7.2 | Health endpoint | **pass** | `GET /api/health` on Express |
| 7.3 | Error JSON shape | **pass** | `{ success, error }` consistent |
| 7.4 | No service keys in browser | **pass** | Supabase keys Express-only |
| 7.5 | Optional features graceful | **pass** | AI/Cursor fail when keys unset |

---

## §8 CI and release engineering

| # | Item | Status | Evidence |
|---|------|--------|----------|
| 8.1 | CI build/lint | **fail → fix** | No `.github/workflows` |
| 8.2 | CI npm audit | Rec | Planned in CI |
| 8.3 | Lockfile committed | **partial → fix** | Web has lockfile; Express `.gitignore` excluded it |
| 8.4 | Vulnerability reporting | **pass** | SECURITY.md email path |
| 8.5 | Version tag | Rec | v0.1.0 at Ship |

---

## §9 Score (final — after OSS prep)

**Ship with debt** — all required (**R**) blockers addressed; remaining debt is styling/barrel ADR drift (Rec) and full CRM smoke test requires operator Supabase credentials.

| Remediation | Status |
|-------------|--------|
| LICENSE + CONTRIBUTING + MIT | Done |
| ADR refresh both repos | Done |
| Wire contract + README | Done |
| Branding + synthetic `.data/` | Done |
| CI workflows + Express lockfile | Done |
| Handler extraction + UBS mount | Done |
| SECURITY audit notes | Done |
| `npm run build` (both repos) | Pass |

**Post-tag smoke (operator):** Configure Supabase, start Express, run `CRM_BASE=http://127.0.0.1:3053 npm run verify:crm`, then load `/dashboard` on Next.

