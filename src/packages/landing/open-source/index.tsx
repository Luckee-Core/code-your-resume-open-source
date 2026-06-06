import Link from "next/link";
import { ExternalLink, Terminal } from "lucide-react";
import { LandingSectionLabel } from "@/packages/landing/components";
import {
  getLandingGithubUrl,
  LANDING_CLI_SNIPPET,
  LANDING_CTA_PATHS,
  LANDING_OPEN_SOURCE,
} from "@/packages/landing/constants";

/**
 * Section 05 — open source self-host block.
 */
export const MarketingOpenSource = () => {
  const githubUrl = getLandingGithubUrl();

  return (
    <section id="open-source" className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.panel}>
          <div className={styles.grid}>
            <div className={styles.copy}>
              <LandingSectionLabel num="05" topic={LANDING_OPEN_SOURCE.label} />
              <h2 className={styles.h2}>{LANDING_OPEN_SOURCE.headline}</h2>
              <p className={styles.p}>{LANDING_OPEN_SOURCE.body}</p>
              <div className={styles.ctaRow}>
                <a
                  href={githubUrl}
                  className={styles.primaryBtn}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <ExternalLink className={styles.btnIcon} />
                  {LANDING_OPEN_SOURCE.primaryCta}
                </a>
                <Link href={LANDING_CTA_PATHS.docsGettingStarted} className={styles.secondaryBtn}>
                  {LANDING_OPEN_SOURCE.secondaryCta}
                </Link>
              </div>
            </div>
            <div className={styles.terminalCol}>
              <div className={styles.terminal}>
                <div className={styles.terminalHead}>
                  <Terminal className={styles.terminalIcon} />
                  {LANDING_OPEN_SOURCE.terminalLabel}
                </div>
                <pre className={styles.pre}>
                  <code>{LANDING_CLI_SNIPPET}</code>
                </pre>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const styles = {
  section: `border-b border-border`,
  inner: `mx-auto max-w-6xl px-6 py-24 lg:py-28`,
  panel: `overflow-hidden rounded-lg border border-[#262626] bg-[#171717] text-white`,
  grid: `grid gap-10 p-8 lg:grid-cols-12 lg:p-12`,
  copy: `lg:col-span-5`,
  h2: `mt-4 text-3xl font-semibold tracking-tight lg:text-4xl`,
  p: `mt-5 text-sm leading-relaxed text-white/70`,
  ctaRow: `mt-8 flex flex-wrap gap-3`,
  primaryBtn: `
    inline-flex h-11 items-center gap-2 rounded-md bg-primary px-5 text-sm font-medium
    text-primary-foreground hover:bg-[var(--primary-hover)]
  `,
  secondaryBtn: `
    inline-flex h-11 items-center gap-2 rounded-md border border-white/15 bg-transparent px-5
    text-sm font-medium text-white hover:bg-white/5
  `,
  btnIcon: `h-4 w-4`,
  terminalCol: `lg:col-span-7`,
  terminal: `rounded-md border border-white/10 bg-black/40 font-mono text-xs`,
  terminalHead: `
    flex items-center gap-2 border-b border-white/10 px-4 py-2 text-white/50
  `,
  terminalIcon: `h-3.5 w-3.5`,
  pre: `overflow-x-auto p-5 leading-relaxed text-white/85`,
} as const;
