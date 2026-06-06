# Security

## Supported use

This open-source app targets **local / trusted development**: Next.js plus an Express CRM API on your machine or a controlled network. It is **not** a hardened multi-tenant SaaS by default.

## Reporting a vulnerability

Do **not** post exploit details in public issues before a fix is coordinated.

1. Use GitHub **Security → Report a vulnerability** if enabled on your fork.
2. Or coordinate privately with repository maintainers.

## Scope and limitations

- This document does **not** replace a professional security assessment for production.
- **TSX live preview** runs arbitrary code in the browser via `@babel/standalone`; treat editor content as trusted operator input. See `/docs/security/tsx-preview` and in-app notes on the graphics studio.
- **`NEXT_PUBLIC_*`** variables are visible in the client bundle — never put Supabase service keys, Anthropic keys, or Cursor API keys here.
- **CRM Express** has **no per-user authentication**. Optional **`CRM_API_SECRET`** gates `/api/data/*` when Express is reachable beyond localhost; Next BFF route handlers inject `X-CRM-API-Key` server-side when configured.
- **HTML / user content:** Resume and studio content is rendered through React; do not paste untrusted HTML expecting sanitization beyond default React escaping.

## OSS security audit notes (2026-06-05)

| Area | Status | Notes |
|------|--------|-------|
| Env split | Pass | Supabase keys Express-only; web uses rewrites |
| Live code preview | Documented | Babel standalone in graphics studio — trusted operator model |
| CDN scripts | N/A | No third-party CDN scripts in core app path |
| README honesty | Pass | Threat model matches behavior |

## Versions

Security fixes land on the **default branch**. Disclosure timeline is **best-effort** unless maintainers publish otherwise.
