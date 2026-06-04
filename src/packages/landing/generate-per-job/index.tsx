import { ArrowRight, FileText, Mail, Sparkles } from "lucide-react";
import { LandingSectionLabel } from "@/packages/landing/components";

const GENERATE_CARDS = [
  {
    icon: FileText,
    t: "Resume",
    size: "816 × 1150",
    d: "Bullets pulled from job + your background + active technical skills.",
  },
  {
    icon: Mail,
    t: "Cover letter",
    size: "816 × 1056",
    d: "Voice and style tuned to the role, not a copy-paste template.",
  },
  {
    icon: Sparkles,
    t: "Company interest",
    size: "816 × 480",
    d: "Short, specific note about why this company — sent on its own or attached.",
  },
] as const;

/**
 * Section 03 — generate resume, cover letter, company interest per job.
 */
export const MarketingGeneratePerJob = () => {
  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <LandingSectionLabel num="03" topic="Generate per job" />
        <div className={styles.headerRow}>
          <h2 className={styles.h2}>Three documents. Tailored every time. Edited as TSX.</h2>
          <p className={styles.aside}>
            Each opens in Graphics Studio. The server stitches job bullets, your professional
            background, and active technical skills into editable TSX you can ship as PNG.
          </p>
        </div>
        <div className={styles.cards}>
          {GENERATE_CARDS.map(({ icon: Icon, t, size, d }) => (
            <div key={t} className={styles.card}>
              <div className={styles.cardTop}>
                <span className={styles.cardIconWrap}>
                  <Icon className={styles.cardIcon} />
                </span>
                <span className={styles.cardSize}>{size}</span>
              </div>
              <h3 className={styles.cardTitle}>{t}</h3>
              <p className={styles.cardDesc}>{d}</p>
              <div className={styles.cardLink}>
                Open in Graphics Studio
                <ArrowRight className={styles.cardLinkIcon} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const styles = {
  section: `border-b border-border`,
  inner: `mx-auto max-w-6xl px-6 py-24 lg:py-28`,
  headerRow: `
    mt-4 flex flex-col gap-6
    lg:flex-row lg:items-end lg:justify-between
  `,
  h2: `max-w-2xl text-3xl font-semibold tracking-tight lg:text-4xl`,
  aside: `max-w-md text-sm text-muted-foreground`,
  cards: `mt-12 grid gap-4 md:grid-cols-3`,
  card: `
    group rounded-lg border border-border bg-card p-6 transition-shadow hover:shadow-sm
  `,
  cardTop: `flex items-center justify-between`,
  cardIconWrap: `
    grid h-10 w-10 place-items-center rounded-md bg-orange-50 text-primary
  `,
  cardIcon: `h-5 w-5`,
  cardSize: `font-mono text-xs text-muted-foreground`,
  cardTitle: `mt-5 text-lg font-semibold tracking-tight`,
  cardDesc: `mt-2 text-sm leading-relaxed text-muted-foreground`,
  cardLink: `
    mt-6 inline-flex items-center gap-2 text-sm font-medium text-primary
  `,
  cardLinkIcon: `h-4 w-4 transition-transform group-hover:translate-x-0.5`,
} as const;
