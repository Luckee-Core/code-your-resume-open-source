import { GraduationCap, ImageIcon, ListChecks, Wrench } from "lucide-react";
import { LandingSectionLabel } from "@/packages/landing/components";

const STUDIOS = [
  {
    icon: Wrench,
    t: "Technical Skills Studio",
    d: "A coach chat plus a structured skills table. Mark what's active per job — drafts pull from that set only.",
  },
  {
    icon: GraduationCap,
    t: "Professional Background",
    d: "Education, credibility bio, voice/style, portfolio, GitHub. One canonical source feeds every document.",
  },
  {
    icon: ImageIcon,
    t: "Graphics Studio",
    d: "TSX source on the left, live iframe preview on the right. Download as PNG when it's right.",
  },
  {
    icon: ListChecks,
    t: "Application Questions",
    d: "A bank of answers for the questions every portal re-asks. Reuse, refine, never start from zero.",
  },
] as const;

/**
 * Section 04 — studios grid.
 */
export const MarketingStudios = () => {
  return (
    <section id="studios" className={styles.section}>
      <div className={styles.inner}>
        <LandingSectionLabel num="04" topic="Studios" />
        <h2 className={styles.h2}>Four studios. One pipeline from background to PNG.</h2>
        <div className={styles.grid}>
          {STUDIOS.map(({ icon: Icon, t, d }) => (
            <div key={t} className={styles.card}>
              <div className={styles.cardRow}>
                <span className={styles.cardIconWrap}>
                  <Icon className={styles.cardIcon} />
                </span>
                <div>
                  <h3 className={styles.cardTitle}>{t}</h3>
                  <p className={styles.cardDesc}>{d}</p>
                </div>
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
