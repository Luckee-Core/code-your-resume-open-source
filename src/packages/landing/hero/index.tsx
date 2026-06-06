import Link from "next/link";
import {
  ArrowRight,
  Briefcase,
  Building2,
  Code2,
  FileText,
  ImageIcon,
  Wrench,
} from "lucide-react";
import { LandingKicker } from "@/packages/landing/components";
import { LANDING_CTA_PATHS, LANDING_HERO, LANDING_HERO_STAT_CHIPS } from "@/packages/landing/constants";

/**
 * Marketing hero with product mock and primary CTAs.
 */
export const MarketingHero = () => {
  return (
    <section className={styles.section}>
      <div className={`${styles.gridBg} hero-grid-bg`} aria-hidden />
      <div className={`${styles.orbLeft} hero-orb-left`} aria-hidden />
      <div className={`${styles.orbRight} hero-orb-right`} aria-hidden />
      <div className={styles.inner}>
        <div className={styles.copyCol}>
          <LandingKicker>{LANDING_HERO.kicker}</LandingKicker>
          <h1 className={styles.h1}>
            {LANDING_HERO.headline}{" "}
            <span className={styles.accent}>{LANDING_HERO.headlineAccent}</span>
          </h1>
          <p className={styles.lead}>{LANDING_HERO.lead}</p>
          <div className={styles.ctaRow}>
            <Link href={LANDING_CTA_PATHS.dashboard} className={styles.primaryCta}>
              {LANDING_HERO.primaryCta}
              <ArrowRight className={styles.ctaIcon} />
            </Link>
            <Link href={LANDING_CTA_PATHS.docsGettingStarted} className={styles.secondaryCta}>
              {LANDING_HERO.secondaryCta}
            </Link>
          </div>
          <div className={styles.chips}>
            {LANDING_HERO_STAT_CHIPS.map((label) => (
              <span key={label} className={styles.chip}>
                <span className={styles.chipDot} />
                {label}
              </span>
            ))}
          </div>
        </div>
        <div className={styles.mockCol}>
          <div className={styles.mock}>
            <div className={styles.mockChrome}>
              <div className={styles.dots}>
                <span className={styles.dot} />
                <span className={styles.dot} />
                <span className={styles.dot} />
              </div>
              <div className={styles.mockUrl}>
                <span className={styles.mockUrlMark}>
                  <Code2 className={styles.mockUrlIcon} />
                </span>
                code-your-resume.local
              </div>
            </div>
            <div className={styles.mockBody}>
              <aside className={styles.mockSidebar}>
                {[
                  { icon: Briefcase, label: "Jobs", active: true },
                  { icon: Building2, label: "Companies" },
                  { icon: FileText, label: "Applications" },
                  { icon: ImageIcon, label: "Graphics" },
                  { icon: Wrench, label: "Skills" },
                ].map(({ icon: Icon, label, active }) => (
                  <div key={label} className={active ? styles.mockNavActive : styles.mockNavItem}>
                    <Icon className={styles.mockNavIcon} />
                    {label}
                  </div>
                ))}
              </aside>
              <div className={styles.mockMain}>
                <div className={styles.mockKicker}>Job · Stripe</div>
                <div className={styles.mockTitle}>Senior Frontend Engineer</div>
                <div className={styles.mockBars}>
                  <div className={styles.mockBarFull} />
                  <div className={styles.mockBarMed} />
                  <div className={styles.mockBarShort} />
                </div>
                <div className={styles.mockThumbs}>
                  {["Resume", "Cover", "Interest"].map((t) => (
                    <div key={t} className={styles.mockThumb}>
                      <div className={styles.mockThumbLabel}>{t}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const styles = {
  section: `relative overflow-hidden border-b border-border`,
  gridBg: `pointer-events-none absolute inset-0 -z-10`,
  orbLeft: `
    pointer-events-none absolute -top-32 -left-24 -z-10 h-[420px] w-[420px]
    rounded-full opacity-40 blur-3xl
  `,
  orbRight: `
    pointer-events-none absolute top-40 -right-[120px] -z-10 h-[360px] w-[360px]
    rounded-full opacity-30 blur-3xl
  `,
  inner: `
    relative mx-auto grid max-w-6xl gap-16 px-6 py-28 lg:grid-cols-12 lg:py-32
  `,
  copyCol: `lg:col-span-7`,
  h1: `
    mt-5 text-4xl font-semibold leading-[1.05] tracking-tight
    sm:text-5xl lg:text-6xl
  `,
  accent: `text-primary`,
  lead: `mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground`,
  ctaRow: `mt-8 flex flex-wrap items-center gap-3`,
  primaryCta: `
    group inline-flex h-12 items-center gap-2 rounded-md bg-primary px-6 text-sm font-medium
    text-primary-foreground transition-colors hover:bg-[var(--primary-hover)]
  `,
  ctaIcon: `h-4 w-4 transition-transform group-hover:translate-x-0.5`,
  secondaryCta: `
    inline-flex h-12 items-center gap-2 rounded-md border border-input bg-background px-6
    text-sm font-medium hover:bg-muted
  `,
  chips: `mt-10 flex flex-wrap gap-2 text-xs text-muted-foreground`,
  chip: `
    inline-flex items-center gap-2 rounded-md border border-border bg-background px-3 py-1.5
  `,
  chipDot: `h-1.5 w-1.5 rounded-full bg-primary`,
  mockCol: `hidden lg:col-span-5 lg:block`,
  mock: `relative rounded-lg border border-border bg-card shadow-sm`,
  mockChrome: `flex items-center gap-2 border-b border-border px-4 py-3`,
  dots: `flex gap-1.5`,
  dot: `h-2.5 w-2.5 rounded-full bg-border`,
  mockUrl: `ml-3 flex items-center gap-2 text-xs text-muted-foreground`,
  mockUrlMark: `
    grid h-4 w-4 place-items-center rounded-sm bg-primary text-primary-foreground
  `,
  mockUrlIcon: `h-2.5 w-2.5`,
  mockBody: `grid grid-cols-[140px_1fr]`,
  mockSidebar: `space-y-1 border-r border-border p-3 text-xs`,
  mockNavItem: `flex items-center gap-2 rounded-md px-2 py-1.5 text-muted-foreground`,
  mockNavActive: `
    flex items-center gap-2 rounded-md bg-orange-50 px-2 py-1.5 text-primary
  `,
  mockNavIcon: `h-3.5 w-3.5`,
  mockMain: `p-4`,
  mockKicker: `kicker`,
  mockTitle: `mt-1 text-sm font-semibold`,
  mockBars: `mt-3 space-y-2`,
  mockBarFull: `h-2 w-full rounded bg-muted`,
  mockBarMed: `h-2 w-5/6 rounded bg-muted`,
  mockBarShort: `h-2 w-4/6 rounded bg-muted`,
  mockThumbs: `mt-4 grid grid-cols-3 gap-2`,
  mockThumb: `aspect-[4/5] rounded border border-border bg-orange-50`,
  mockThumbLabel: `px-2 pt-2 text-[10px] font-medium text-primary`,
} as const;
