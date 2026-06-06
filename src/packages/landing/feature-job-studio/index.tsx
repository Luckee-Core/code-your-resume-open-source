import { ArrowRight, MessageCircle } from "lucide-react";
import { LandingSectionLabel } from "@/packages/landing/components";
import { LANDING_JOB_STUDIO } from "@/packages/landing/constants";

/**
 * Section 02 — Job Studio.
 */
export const MarketingFeatureJobStudio = () => {
  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.grid}>
          <div className={styles.copy}>
            <LandingSectionLabel num="02" topic={LANDING_JOB_STUDIO.label} />
            <h2 className={styles.h2}>{LANDING_JOB_STUDIO.headline}</h2>
            <p className={styles.p}>{LANDING_JOB_STUDIO.body}</p>
            <ul className={styles.list}>
              {LANDING_JOB_STUDIO.bullets.map((item) => (
                <li key={item}>· {item}</li>
              ))}
            </ul>
          </div>
          <div className={styles.mockCol}>
            <div className={styles.mock}>
              <div className={styles.mockGrid}>
                <div className={styles.mockPane}>
                  <div className={styles.mockKicker}>Listing</div>
                  <div className={styles.mockTitle}>Senior Frontend · Stripe</div>
                  <div className={styles.mockBlocks}>
                    <div>
                      <div className={styles.mockBlockLabel}>Responsibilities</div>
                      <div className={styles.mockBars}>
                        <div className={styles.mockBar} />
                        <div className={styles.mockBarMed} />
                        <div className={styles.mockBarShort} />
                      </div>
                    </div>
                    <div>
                      <div className={styles.mockBlockLabel}>Requirements</div>
                      <div className={styles.mockBars}>
                        <div className={styles.mockBarMed} />
                        <div className={styles.mockBarShort} />
                      </div>
                    </div>
                  </div>
                </div>
                <div className={styles.mockPaneRight}>
                  <div className={styles.mockKicker}>Applications</div>
                  <div className={styles.mockTitle}>3 drafts · 1 sent</div>
                  <div className={styles.mockApps}>
                    {["Resume v3 · tailored", "Cover letter v2", "Company interest"].map((t) => (
                      <div key={t} className={styles.mockAppRow}>
                        <span>{t}</span>
                        <ArrowRight className={styles.mockAppIcon} />
                      </div>
                    ))}
                  </div>
                  <div className={styles.coachFab}>
                    <MessageCircle className={styles.coachIcon} />
                    Ask the coach
                  </div>
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
  section: `border-b border-border`,
  inner: `mx-auto max-w-6xl px-6 py-24 lg:py-28`,
  grid: `grid gap-12 lg:grid-cols-12`,
  copy: `lg:col-span-5`,
  h2: `mt-4 text-3xl font-semibold tracking-tight lg:text-4xl`,
  p: `mt-5 text-base leading-relaxed text-muted-foreground`,
  list: `mt-6 space-y-3 text-sm text-muted-foreground`,
  mockCol: `lg:col-span-7`,
  mock: `overflow-hidden rounded-lg border border-border bg-[#171717] text-white shadow-sm`,
  mockGrid: `grid grid-cols-2 divide-x divide-white/10`,
  mockPane: `p-6`,
  mockPaneRight: `relative p-6`,
  mockKicker: `kicker`,
  mockTitle: `mt-2 text-sm font-semibold`,
  mockBlocks: `mt-4 space-y-3 text-xs text-white/70`,
  mockBlockLabel: `font-medium text-white`,
  mockBars: `mt-1.5 space-y-1.5`,
  mockBar: `h-1.5 w-full rounded bg-white/10`,
  mockBarMed: `h-1.5 w-5/6 rounded bg-white/10`,
  mockBarShort: `h-1.5 w-4/6 rounded bg-white/10`,
  mockApps: `mt-4 space-y-2`,
  mockAppRow: `
    flex items-center justify-between rounded-md border border-white/10 bg-white/5
    px-3 py-2 text-xs
  `,
  mockAppIcon: `h-3.5 w-3.5 text-primary`,
  coachFab: `
    absolute right-4 bottom-4 flex items-center gap-2 rounded-full bg-primary px-3 py-2
    text-xs font-medium text-primary-foreground shadow-lg
  `,
  coachIcon: `h-3.5 w-3.5`,
} as const;
