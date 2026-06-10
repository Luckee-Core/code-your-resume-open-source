# 021 – LinkedIn profile (Apify sync + CRM tables)

## Objective

Document **My LinkedIn**: tenant profile URL storage, Apify sync via `linkedin-scraper-express-server`, and normalized Supabase tables exposed through Express `/api/data/**`.

## Decisions

### 1) Persistence

- Tables: `linkedin_profiles`, `linkedin_employments`, `linkedin_educations`, `linkedin_certifications` (DDL in Express `docs/supabase-linkedin-profile-schema.sql`).
- No JSONB on profile or child rows — Apify nested objects are flattened at sync time.
- `linkedin_profiles.is_tenant` marks the signed-in user's profile; partial unique index allows one tenant row.

### 2) Scraper boundary

- **linkedin-scraper-express-server** (port 3039) holds `APIFY_API_TOKEN` and calls `harvestapi~linkedin-profile-scraper`.
- **code-your-resume-open-source-express-server** orchestrates sync via `LINKEDIN_SCRAPER_EXPRESS_URL` and persists mapped rows.

### 3) API surface

- Profile: `GET /api/data/linkedin-profile/get-tenant`, `POST /create-tenant`, `PATCH /update-tenant-url`, `POST /sync-tenant`.
- Children (read): `GET /api/data/linkedin-employment/list?profileId=`, same for education and certification.

### 4) Next.js

- Route: `/my-linkedin` → `src/packages/my-linkedin/`.
- Sidebar: **Profile** section with **My LinkedIn**.
- Redux dumps: `linkedinProfiles`, `linkedinEmployments`, `linkedinEducations`, `linkedinCertifications`.
- Thunks in `src/store/thunks/linkedin-profile/`; components dispatch thunks only.

## PR checklist

- [ ] Run `docs/supabase-linkedin-profile-schema.sql` in tenant Supabase before first load.
- [ ] Set `LINKEDIN_SCRAPER_EXPRESS_URL` on Express; run linkedin-scraper-express-server locally.
- [ ] CRM reads/writes via thunks → `src/api/**` → Express `/api/data/**`.
