# Code Your Resume (open source)

Next.js app with Redux: job-search CRM UI, graphics studio (TSX live preview), technical skills studio, and docs.

Run Next locally (`npm run dev`, default [http://localhost:3000](http://localhost:3000)) with the companion **CRM Express server** (sibling repo `code-your-resume-open-source-express-server`) on **port 3053** for `/api/data/*` and `/api/technical-skills/*`. Rewrites are configured in `next.config.ts` (`CRM_EXPRESS_INTERNAL_URL`).

## Threat model and trust boundaries

- **Operators are trusted.** There is no multi-user auth on the CRM API by default.
- **TSX preview** compiles and runs code in your browser (see `/docs/security/tsx-preview`). Treat editor content as trusted.
- **Graphics** persist in tenant **Supabase** (`image_graphics`) via Express `/api/data/image-graphic/*`. Configure `SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY` on the Express server (not in Next).
- **`CRM_API_SECRET`:** If you set this on Express **and** on Next (same value), Express rejects requests without `X-CRM-API-Key`. Next BFF route handlers add that header server-side. This limits **direct** access to Express when it listens beyond loopback; it does **not** stop someone who can already use your Next app from calling the CRM through Next.

Never put secrets in `NEXT_PUBLIC_*` vars unless you intend them to ship to the browser.

See **`SECURITY.md`** for reporting and scope.

## Environment

Copy `.env.example` to `.env.local`. Important variables:

| Variable | Purpose |
| -------- | ------- |
| `EXPRESS_API_URL` | Railway (or other) public URL for Express — **required on Vercel** (no trailing slash). |
| `CRM_API_SECRET` | Optional; only if you set the same secret on Express. |

## Scripts

```bash
npm install
npm run dev
```

```bash
npm run build
npm start
```

## Docs

In-app documentation starts at `/docs`. Architecture decisions live under `.cursor/architecture/`.
