# Code Your Resume (open source)

Next.js app with Redux: job-search CRM UI, graphics studio (TSX live preview), technical skills studio, professional background studio, job studio, and in-app docs.

**Companion API:** [code-your-resume-open-source-express-server](https://github.com/Luckee-Core/code-your-resume-open-source-express-server) (Express + Supabase, port **3053**).

**Studio map:** [Luckee-Core/getting-started](https://github.com/Luckee-Core/getting-started)  
**Wire contract:** [`docs/wire-contract.md`](docs/wire-contract.md)  
**OSS governance:** [mentorai-server `data/open-source/`](https://github.com/luckee/mentorai-server/tree/main/data/open-source)

## Quick start

```bash
# Terminal 1 — Express (requires Supabase; see express-server docs/)
cd ../code-your-resume-open-source-express-server
cp .env.example .env   # set SUPABASE_URL + SUPABASE_SERVICE_ROLE_KEY
npm install && npm run dev

# Terminal 2 — Next.js
cp .env.example .env.local
npm install && npm run dev
```

Open [http://localhost:3000](http://localhost:3000) (marketing) or [http://localhost:3000/dashboard](http://localhost:3000/dashboard) (app).

Next rewrites `/api/data/*`, `/api/technical-skills/*`, `/api/professional-background/*`, and `/api/job-studio/*` to Express (`EXPRESS_API_URL` or default `http://127.0.0.1:3053` in dev). See `next.config.ts`.

## Architecture

| Layer | Location |
|-------|----------|
| Routes | `src/app/` — thin pages only |
| Feature UI | `src/packages/{feature}/` |
| Redux | `src/store/` — dumps, current, builders, thunks |
| HTTP clients | `src/api/` → same-origin `/api/data/*` (proxied to Express) |
| ADRs | `.cursor/architecture/` + `.cursor/rules/AGENTS.md` |

Express ADR **009** (entity routers) differs from Next ADR **009** (CRM detail UI parity) — see wire contract.

## Threat model and trust boundaries

- **Operators are trusted.** No multi-user auth on the CRM API by default.
- **TSX preview** compiles and runs code in your browser (see `/docs/security/tsx-preview`). Treat editor content as trusted.
- **Graphics and CRM** persist in tenant **Supabase** via Express. Configure `SUPABASE_*` on Express only — never in Next `NEXT_PUBLIC_*`.
- **`CRM_API_SECRET`:** Optional shared secret; Next BFF route handlers attach the header server-side when configured.

See [`SECURITY.md`](SECURITY.md) for reporting and scope.

## Environment

Copy `.env.example` to `.env.local`:

| Variable | Purpose |
| -------- | ------- |
| `EXPRESS_API_URL` | Railway public URL for Express — **required on Vercel** (no trailing slash) |
| `CRM_API_SECRET` | Optional; must match Express when set |

## Scripts

```bash
npm run dev      # development server (port 3000)
npm run build    # production build
npm run lint     # ESLint
npm test         # Vitest
```

## Docs

- In-app: `/docs`
- Architecture: `.cursor/architecture/`
- Contributing: [`CONTRIBUTING.md`](CONTRIBUTING.md)

## License

MIT — see [`LICENSE`](LICENSE).
