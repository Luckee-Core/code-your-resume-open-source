/** Hero stat chips below primary CTAs. */
export const LANDING_HERO_STAT_CHIPS = [
  "Company → job → application",
  "TSX you can edit",
  "Self-host on Supabase",
] as const;

/** Two-terminal dev setup shown in open-source section. */
export const LANDING_CLI_SNIPPET = `# terminal 1 — Next (port 3000)
git clone https://github.com/Luckee-Core/code-your-resume-open-source
cd code-your-resume-open-source
npm install && npm run dev

# terminal 2 — Express (port 3053)
cd ../code-your-resume-open-source-express-server
npm install && npm run dev

# open http://localhost:3000`;

export const LANDING_PAGE_METADATA = {
  title: "Code Your Resume — Open-source job application studio",
  description:
    "I built an open-source job-search CRM with TSX resume graphics you edit and export to PNG — tailored per role, not copy-pasted everywhere.",
  openGraphDescription:
    "Stop sending the same resume into every portal. CRM, per-job studios, and TSX graphics — self-hosted.",
} as const;

export const LANDING_HERO = {
  kicker: "I got tired of the same PDF everywhere",
  headline: "Every role deserves its own resume —",
  headlineAccent: "and cover letter — that actually fits.",
  lead: `I'm a Next.js builder, not a Canva person. I wanted one place to track the search, draft per job, and ship graphics I can edit as code and export to PNG. That's what this is — open source, so you can run it yourself.`,
  primaryCta: "Get started",
  secondaryCta: "Read how it works",
} as const;

export const LANDING_CRM = {
  label: "Job-search CRM",
  headline: "Your job search shouldn't live in a spreadsheet.",
  body: `I used to juggle notes, tabs, and half-updated trackers. Here, companies, employees, jobs, and applications sit in one CRM. Paste a posting URL when you're ready to import. Pull website research before you write the next letter.`,
  bullets: [
    "Companies, employees, jobs, applications",
    "Add a job from the posting URL",
    "Employment history that feeds every draft",
    "Status and timeline per application — not vibes in a doc",
  ] as const,
} as const;

export const LANDING_JOB_STUDIO = {
  label: "Job Studio",
  headline: "One workspace per role.",
  body: `When I'm serious about a job, I want the listing, the breakdown, the drafts, and the coach in one place — not scattered across five tools. Import the posting, split responsibilities from requirements, log what I sent, and generate graphics scoped to that job.`,
  bullets: [
    "Listing import and structured parse",
    "Responsibilities, requirements, nice-to-haves",
    "Applications log per job",
    "Job-scoped graphics and a coach when I'm stuck",
  ] as const,
} as const;

export const LANDING_GENERATE = {
  label: "Generate per job",
  headline: "Three documents. Tailored each time. Edited as TSX.",
  aside: `The server pulls job bullets, your professional background, and active technical skills into editable TSX. I tweak in Graphics Studio, then export PNG when it reads right — not when a template says I'm done.`,
  cards: [
    {
      title: "Resume",
      size: "816 × 1150",
      description:
        "Bullets from the posting, your background, and the skills you marked active for this job.",
    },
    {
      title: "Cover letter",
      size: "816 × 1056",
      description: "Voice tuned to the role — not the same paragraph with the company name swapped.",
    },
    {
      title: "Company interest",
      size: "816 × 480",
      description: "Short, specific note on why this company — standalone or attached.",
    },
  ] as const,
  cardLink: "Open in Graphics Studio",
} as const;

export const LANDING_STUDIOS = {
  label: "Studios",
  headline: "Four studios. One pipeline from background to PNG.",
  items: [
    {
      title: "Technical Skills Studio",
      description:
        "Coach chat plus a skills table. I mark what's active per job — drafts only pull from that set.",
    },
    {
      title: "Professional Background",
      description:
        "Education, bio, voice, portfolio. One canonical source so I'm not retyping the same story.",
    },
    {
      title: "Graphics Studio",
      description: "TSX on the left, live preview on the right. Download PNG when it's right.",
    },
    {
      title: "Application Questions",
      description:
        "A bank for the questions every portal re-asks. Reuse and refine — don't start from zero.",
    },
  ] as const,
} as const;

export const LANDING_OPEN_SOURCE = {
  label: "Open source",
  headline: "Clone it. Run it. Own the stack.",
  body: `Next.js plus Express, Supabase for CRM and graphics. Two terminals on your machine, or deploy where you want. No service keys in the browser bundle — operators are trusted, and I wrote it that way on purpose.`,
  primaryCta: "View on GitHub",
  secondaryCta: "Read docs",
  terminalLabel: "two terminals",
} as const;

export const LANDING_FINAL_CTA = {
  kicker: "Get started",
  headline: "Clone it. Run it.",
  headlineAccent: "Apply on purpose.",
  body: `Same resume in every portal is repetitive work I don't want to do anymore. Tailor per job, edit in TSX, export to PNG, and keep the receipts in your own database.`,
  githubCta: "View on GitHub",
  docsCta: "Getting started",
  appCta: "Open app",
  footerBrand: "Code Your Resume — open source, self-hosted.",
  footerMeta: "PNG export · TSX editable",
} as const;
