/** Hero stat chips below primary CTAs. */
export const LANDING_HERO_STAT_CHIPS = [
  "CRM → Job → Application",
  "TSX live preview",
  "Self-host your stack",
] as const;

/** Two-terminal dev setup shown in open-source section. */
export const LANDING_CLI_SNIPPET = `# terminal 1 — Next (port 3000)
git clone https://github.com/matthewruiz/code-your-resume-open-source
cd code-your-resume-open-source
npm install && npm run dev

# terminal 2 — Express (port 3053)
cd ../code-your-resume-open-source-express-server
npm install && npm run dev

# open http://localhost:3000`;
