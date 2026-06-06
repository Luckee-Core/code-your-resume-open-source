import { GraduationCap, ImageIcon, ListChecks, Wrench } from "lucide-react";
import { LandingSectionLabel } from "@/packages/landing/components";
import { LANDING_STUDIOS } from "@/packages/landing/constants";

const STUDIO_ICONS = [Wrench, GraduationCap, ImageIcon, ListChecks] as const;

/**
 * Section 04 — studios grid.
 */
export const MarketingStudios = () => {
  return (
    <section id="studios" className={styles.section}>
      <div className={styles.inner}>
        <LandingSectionLabel num="04" topic={LANDING_STUDIOS.label} />
        <h2 className={styles.h2}>{LANDING_STUDIOS.headline}</h2>
        <div className={styles.grid}>
          {LANDING_STUDIOS.items.map(({ title, description }, index) => {
            const Icon = STUDIO_ICONS[index] ?? Wrench;
            return (
              <div key={title} className={styles.card}>
                <div className={styles.cardRow}>
                  <span className={styles.cardIconWrap}>
                    <Icon className={styles.cardIcon} />
                  </span>
                  <div>
                    <h3 className={styles.cardTitle}>{title}</h3>
                    <p className={styles.cardDesc}>{description}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

const styles = {
  section: `border-b border-border`,
  inner: `mx-auto max-w-6xl px-6 py-24 lg:py-28`,
  h2: `mt-4 max-w-2xl text-3xl font-semibold tracking-tight lg:text-4xl`,
  grid: `mt-12 grid gap-4 md:grid-cols-2`,
  card: `rounded-lg border border-border bg-card p-6`,
  cardRow: `flex items-start gap-4`,
  cardIconWrap: `
    grid h-10 w-10 shrink-0 place-items-center rounded-md bg-orange-50 text-primary
  `,
  cardIcon: `h-5 w-5`,
  cardTitle: `text-lg font-semibold tracking-tight`,
  cardDesc: `mt-2 text-sm leading-relaxed text-muted-foreground`,
} as const;
