import Link from "next/link";
import { ArrowRight, Code2, Download, ExternalLink } from "lucide-react";
import { LandingKicker } from "@/packages/landing/components";
import { getLandingGithubUrl, LANDING_CTA_PATHS, LANDING_FINAL_CTA } from "@/packages/landing/constants";

/**
 * Final CTA band and footer strip.
 */
export const MarketingFinalCta = () => {
  const githubUrl = getLandingGithubUrl();

  return (
    <section id="cta" className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.row}>
          <div>
            <LandingKicker>{LANDING_FINAL_CTA.kicker}</LandingKicker>
            <h2 className={styles.h2}>
              {LANDING_FINAL_CTA.headline}{" "}
              <span className={styles.accent}>{LANDING_FINAL_CTA.headlineAccent}</span>
            </h2>
            <p className={styles.p}>{LANDING_FINAL_CTA.body}</p>
          </div>
          <div className={styles.ctaRow}>
            <a
              href={githubUrl}
              className={styles.primaryCta}
              target="_blank"
              rel="noopener noreferrer"
            >
              <ExternalLink className={styles.ctaIcon} />
              {LANDING_FINAL_CTA.githubCta}
              <ArrowRight className={styles.ctaArrow} />
            </a>
            <Link id="docs" href={LANDING_CTA_PATHS.docsGettingStarted} className={styles.secondaryCta}>
              {LANDING_FINAL_CTA.docsCta}
            </Link>
            <Link href={LANDING_CTA_PATHS.dashboard} className={styles.tertiaryCta}>
              {LANDING_FINAL_CTA.appCta}
            </Link>
          </div>
        </div>
      </div>
      <div className={styles.footer}>
        <div className={styles.footerInner}>
          <div className={styles.footerBrand}>
            <span className={styles.footerMark}>
              <Code2 className={styles.footerMarkIcon} />
            </span>
            {LANDING_FINAL_CTA.footerBrand}
          </div>
          <div className={styles.footerMeta}>
            <Download className={styles.footerMetaIcon} />
            {LANDING_FINAL_CTA.footerMeta}
          </div>
        </div>
      </div>
    </section>
  );
};

const styles = {
  section: `bg-[#171717] text-white`,
  inner: `mx-auto max-w-6xl px-6 py-28 lg:py-32`,
  row: `
    flex flex-col items-start gap-10
    lg:flex-row lg:items-end lg:justify-between
  `,
  h2: `
    mt-4 max-w-2xl text-4xl font-semibold leading-[1.05] tracking-tight
    lg:text-5xl
  `,
  accent: `text-primary`,
  p: `mt-5 max-w-xl text-base leading-relaxed text-white/70`,
  ctaRow: `flex flex-wrap gap-3`,
  primaryCta: `
    group inline-flex h-12 items-center gap-2 rounded-md bg-primary px-6 text-sm font-medium
    text-primary-foreground transition-colors hover:bg-[var(--primary-hover)]
  `,
  ctaIcon: `h-4 w-4`,
  ctaArrow: `h-4 w-4 transition-transform group-hover:translate-x-0.5`,
  secondaryCta: `
    inline-flex h-12 items-center gap-2 rounded-md border border-white/15 bg-transparent px-6
    text-sm font-medium hover:bg-white/5
  `,
  tertiaryCta: `
    inline-flex h-12 items-center gap-2 rounded-md border border-white/15 bg-transparent px-6
    text-sm font-medium hover:bg-white/10
  `,
  footer: `border-t border-white/10`,
  footerInner: `
    mx-auto flex max-w-6xl flex-col items-start justify-between gap-3 px-6 py-8
    text-xs text-white/50
    sm:flex-row sm:items-center
  `,
  footerBrand: `flex items-center gap-2`,
  footerMark: `
    grid h-5 w-5 place-items-center rounded-sm bg-primary text-primary-foreground
  `,
  footerMarkIcon: `h-3 w-3`,
  footerMeta: `flex items-center gap-2`,
  footerMetaIcon: `h-3.5 w-3.5`,
} as const;
