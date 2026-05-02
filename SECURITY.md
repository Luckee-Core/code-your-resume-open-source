# Security

## Supported use

This open-source app targets **local / trusted development**: Next.js plus an Express CRM API on your machine or a controlled network. It is **not** a hardened multi-tenant SaaS by default.

## Reporting a vulnerability

Do **not** post exploit details in public issues before a fix is coordinated.

1. Use GitHub **Security → Report a vulnerability** if enabled on your fork.
2. Or coordinate privately with repository maintainers.

## Scope and limitations

- This document does **not** replace a professional security assessment for production.
- **TSX live preview** runs arbitrary code in the browser; see `/docs/security/tsx-preview` and in-app notes on the graphics studio.
- **`NEXT_PUBLIC_*`** variables are visible in the client bundle.
- **CRM Express** has **no per-user authentication**. Optional **`CRM_API_SECRET`** gates `/api/data/*` and `/api/technical-skills/*` when Express is reachable beyond localhost; pair it with the same **`CRM_API_SECRET`** in Next (middleware injects `X-CRM-API-Key` on rewrites). This protects **network access to Express**, not malicious use of the Next UI.

## Versions

Security fixes land on the **default branch**. Disclosure timeline is **best-effort** unless maintainers publish otherwise.
