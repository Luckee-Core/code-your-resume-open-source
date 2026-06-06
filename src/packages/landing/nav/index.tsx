import Link from "next/link";
import { Code2, ExternalLink } from "lucide-react";
import { DOCS_PATH, LANDING_PATH } from "@/config/routes";
import { getLandingGithubUrl, LANDING_CTA_PATHS } from "@/packages/landing/constants";

/**
 * Marketing landing sticky nav with anchor links and primary CTAs.
 */
export const MarketingNav = () => {
  const githubUrl = getLandingGithubUrl();

  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <Link href={LANDING_PATH} className={styles.brand}>
          <span className={styles.brandMark}>
            <Code2 className={styles.brandIcon} />
          </span>
          <span className={styles.brandText}>Code Your Resume</span>
        </Link>
        <nav className={styles.nav} aria-label="Marketing">
          <a href="#features" className={styles.navLink}>
            Features
          </a>
          <a href="#studios" className={styles.navLink}>
            Studios
          </a>
          <a href="#open-source" className={styles.navLink}>
            Open Source
          </a>
          <Link href={DOCS_PATH} className={styles.navLink}>
            Docs
          </Link>
        </nav>
        <div className={styles.ctaRow}>
          <a href={githubUrl} className={styles.githubBtn} target="_blank" rel="noopener noreferrer">
            <ExternalLink className={styles.githubIcon} />
            View on GitHub
          </a>
          <Link href={LANDING_CTA_PATHS.dashboard} className={styles.primaryBtn}>
            Get started
          </Link>
        </div>
      </div>
    </header>
  );
};

const styles = {
  header: `
    sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur
  `,
  inner: `
    mx-auto flex h-16 max-w-6xl items-center justify-between px-6
  `,
  brand: `flex items-center gap-2`,
  brandMark: `
    grid h-7 w-7 place-items-center rounded-md bg-primary text-primary-foreground
  `,
  brandIcon: `h-4 w-4`,
  brandText: `text-sm font-semibold tracking-tight`,
  nav: `hidden items-center gap-8 text-sm text-muted-foreground md:flex`,
  navLink: `hover:text-foreground`,
  ctaRow: `flex items-center gap-2`,
  githubBtn: `
    hidden h-10 items-center gap-2 rounded-md border border-input bg-background px-4
    text-sm font-medium hover:bg-muted sm:inline-flex
  `,
  githubIcon: `h-4 w-4`,
  primaryBtn: `
    inline-flex h-10 items-center gap-2 rounded-md bg-primary px-4 text-sm font-medium
    text-primary-foreground transition-colors hover:bg-[var(--primary-hover)]
  `,
} as const;
