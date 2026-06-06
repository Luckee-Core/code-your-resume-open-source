# code-your-resume-open-source Next.js Rules

BEFORE implementing ANY feature, you MUST:
1. Read `.cursor/architecture/README.md`.
2. Read the relevant ADRs in `.cursor/architecture/`.
3. Follow documented patterns EXACTLY; if no pattern exists, you MUST add an ADR first.

## Non-Negotiable Rules

### Redux
1. You MUST keep Redux logic in `src/store/` with flat layers: `dumps/`, `current/`, `builders/`, `config/` per [001 – Redux patterns](../architecture/001-redux-patterns.md).
2. You MUST use Redux Toolkit slice patterns; NEVER write ad-hoc mutable global state.
3. You MUST use manual thunks only (`AppThunk<Promise<200 | 400 | 500>>`); NEVER use `createAsyncThunk`.
4. You MUST keep async side effects out of components; ALWAYS place them in thunks/services.

### Components
1. You MUST keep route segments in `src/app/`; feature UI MUST live in `src/packages/<feature>/`; cross-feature shared UI MUST live in `src/components/`.
2. You MUST keep components focused and composable; NEVER mix data orchestration with presentational markup.
3. You MUST default to Server Components and ONLY use `"use client"` when browser APIs/state are required.
4. You MUST use `export const` for components and explicit typed props; NEVER use `any` in component public interfaces.

### Styling
1. You MUST follow the **styles object pattern** in [003 – Styling rules](../architecture/003-styling-rules.md): `const styles = { ... }` with template literals after the component.
2. You MUST keep design tokens and global rules in `src/app/globals.css`.
3. You MUST NOT use inline `style={{ ... }}` or per-component `.css` / `.module.css` files.
4. You MUST NOT put raw Tailwind class strings directly on JSX `className` without the styles object indirection.

### API
1. You MUST place HTTP handlers in `src/app/api/**/route.ts` for **non-CRM** features.
2. **CRM** (companies, employees, jobs, job applications) uses `src/api/**` → Express `/api/data/**` per [008 – Job-search CRM](../architecture/008-job-search-crm.md); do not add Next Route Handlers for those entities.
3. You MUST add JSDoc to every router factory, each exported handler (`GET`, `POST`, etc.), and all business-logic functions they call.
4. You MUST keep handlers thin: validate input, delegate business logic, map errors to HTTP responses.
5. You MUST NEVER access request bodies/query params directly in business logic; pass typed DTOs.

### Files
1. You MUST colocate files by feature/domain; one function or component per file; kebab-case filenames per [005 – File organization](../architecture/005-file-organization.md).
2. You MUST use `type`, not `interface`.
3. You MUST use barrel exports (`index.ts`) in every folder.
4. You MUST keep import boundaries clean; NEVER create circular dependencies.

## Quick Reference (Architecture ADRs)

### Shared (001–006, 010)
- Architecture entrypoint → `.cursor/architecture/README.md`
- Redux → `.cursor/architecture/001-redux-patterns.md`
- Components → `.cursor/architecture/002-component-composition.md`
- Styling → `.cursor/architecture/003-styling-rules.md`
- API integration → `.cursor/architecture/004-api-integration.md`
- File organization → `.cursor/architecture/005-file-organization.md`
- Constants / utilities → `.cursor/architecture/006-constants-utilities.md`
- Public content reads from Express → `.cursor/architecture/010-public-blog-express-fetch.md`

### Product-specific (this repo)
- Studio PNG export → `.cursor/architecture/007-studio-preview-png-export.md`
- Job-search CRM → `.cursor/architecture/008-job-search-crm.md`
- CRM detail UI → `.cursor/architecture/009-crm-detail-ui-parity.md`
- Breadcrumbs → `.cursor/architecture/019-app-shell-breadcrumbs.md`
- Technical Skills Studio → `.cursor/architecture/011-technical-skills-studio.md`
- Professional Background Studio → `.cursor/architecture/012-professional-background-studio.md`
- Job Studio → `.cursor/architecture/013-job-studio.md`
- Cover letter generation → `.cursor/architecture/014-cover-letter-generation.md`
- Error event logging → `.cursor/architecture/015-error-event-logging.md`
- Client API error handling → `.cursor/architecture/016-client-api-error-handling.md`
- Job application questions → `.cursor/architecture/017-job-application-questions.md`
- Marketing landing → `.cursor/architecture/018-marketing-landing-package.md`
