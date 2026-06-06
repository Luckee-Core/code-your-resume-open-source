import { Briefcase, Building2, FileText } from "lucide-react";
import { LandingSectionLabel } from "@/packages/landing/components";
import { LANDING_CRM } from "@/packages/landing/constants";

const CRM_CARDS = [
  { icon: Building2, t: "Stripe", s: "12 jobs · 4 contacts" },
  { icon: Building2, t: "Linear", s: "3 jobs · 2 contacts" },
  { icon: Briefcase, t: "Sr. Frontend", s: "Applied · Stripe" },
  { icon: Briefcase, t: "Infra Eng", s: "Drafting · Linear" },
  { icon: FileText, t: "Application", s: "Resume + cover sent" },
  { icon: FileText, t: "Application", s: "Follow-up scheduled" },
] as const;

/**
 * Section 01 — job-search CRM.
 */
export const MarketingFeatureCrm = () => {
  return (
    <section id="features" className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.grid}>
          <div className={styles.copy}>
            <LandingSectionLabel num="01" topic={LANDING_CRM.label} />
            <h2 className={styles.h2}>{LANDING_CRM.headline}</h2>
            <p className={styles.p}>{LANDING_CRM.body}</p>
            <ul className={styles.list}>
              {LANDING_CRM.bullets.map((t) => (
                <li key={t} className={styles.listItem}>
                  <span className={styles.bullet} />
                  {t}
                </li>
              ))}
            </ul>
          </div>
          <div className={styles.cardCol}>
            <div className={styles.card}>
              <div className={styles.cardGrid}>
                {CRM_CARDS.map(({ icon: Icon, t, s }, i) => (
                  <div key={i} className={styles.cardRow}>
                    <span className={styles.cardIconWrap}>
                      <Icon className={styles.cardIcon} />
                    </span>
                    <div className={styles.cardText}>
                      <div className={styles.cardTitle}>{t}</div>
                      <div className={styles.cardSub}>{s}</div>
                    </div>
                  </div>
                ))}
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
  grid: `grid gap-12 lg:grid-cols-12`,
  copy: `lg:col-span-5`,
  h2: `mt-4 text-3xl font-semibold tracking-tight lg:text-4xl`,
  p: `mt-5 text-base leading-relaxed text-muted-foreground`,
  list: `mt-6 space-y-3 text-sm`,
  listItem: `flex items-start gap-3`,
  bullet: `mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary`,
  cardCol: `lg:col-span-7`,
  card: `rounded-lg border border-border bg-card p-6`,
  cardGrid: `grid gap-3 sm:grid-cols-2`,
  cardRow: `
    flex items-center gap-3 rounded-md border border-border bg-background p-3
  `,
  cardIconWrap: `
    grid h-9 w-9 place-items-center rounded-md bg-orange-50 text-primary
  `,
  cardIcon: `h-4 w-4`,
  cardText: `min-w-0`,
  cardTitle: `truncate text-sm font-medium`,
  cardSub: `truncate text-xs text-muted-foreground`,
} as const;
