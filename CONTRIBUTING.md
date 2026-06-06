# Contributing

Thanks for helping improve Code Your Resume.

## Before you code

1. Read [`.cursor/architecture/README.md`](.cursor/architecture/README.md) and [`.cursor/rules/AGENTS.md`](.cursor/rules/AGENTS.md).
2. Companion API repo: [code-your-resume-open-source-express-server](https://github.com/Luckee-Core/code-your-resume-open-source-express-server).
3. Wire contract: [`docs/wire-contract.md`](docs/wire-contract.md).
4. OSS standards: [mentorai-server `data/open-source/`](https://github.com/luckee/mentorai-server/tree/main/data/open-source).

## Patterns (short)

- Routes in `src/app/` stay thin; feature UI in `src/packages/`.
- Redux in `src/store/`; manual thunks only (no `createAsyncThunk`).
- CRM HTTP clients in `src/api/` — browser calls Express via Next rewrites to `/api/data/*`.
- Never put server secrets in `NEXT_PUBLIC_*`.
- Follow ADRs for styling, file organization, and API integration.

## Pull requests

1. Run `npm run build` and `npm run lint` when touching TypeScript.
2. Update README or `docs/` for new routes, env vars, or trust-boundary changes.
3. Keep PRs focused; match style in touched files.

## Security

Report vulnerabilities per [`SECURITY.md`](SECURITY.md).
