"use client";

import React from "react";

export default function GeneratedSkillsPreview() {
  return (
    <main className={styles.page}>
      <article className={styles.paper}>
        <header className={styles.header}>
          <h1 className={styles.name}>Matt Ruiz</h1>
          <p className={styles.subline}>Staff Full Stack Engineer · Philadelphia, PA</p>
        </header>

        <section className={styles.section}>
          <h2 className={styles.sectionLabel}>Executive Summary</h2>
          <p className={styles.summary}>
            I build and ship cross-platform mobile products with React Native and Expo,
            architecting full-stack TypeScript and Node.js systems on AWS, GCP, and Vercel
            through App Store and Play delivery. I lead technical design across web and
            mobile, mentor engineers, and partner with product and design to ship consistent
            user experiences. I&apos;ve delivered 12+ production mobile apps scaled to hundreds
            of thousands of users across marketplace, social, and field-service platforms.
          </p>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionLabel}>Experience</h2>
          <div className={styles.experienceList}>
            <article className={styles.experienceEntry}>
              <div className={styles.entryHeader}>
                <h3 className={styles.entryTitle}>
                  Senior Full Stack Engineer | Acme Labs
                </h3>
                <p className={styles.entryPeriod}>Recent</p>
              </div>
              <ul className={styles.bulletList}>
                <li className={styles.bulletItem}>
                  <span className={styles.bulletDot} />
                  <span>
                    Shipped 12+ production React Native and Expo apps for iOS and Android,
                    including Pencil Bible (300,000 users, top 5 iPad ranking for
                    &quot;bible&quot;) and cross-platform peer-support, marketplace, and
                    field-service products with TypeScript, Redux, and real-time backends.
                  </span>
                </li>
                <li className={styles.bulletItem}>
                  <span className={styles.bulletDot} />
                  <span>
                    Architected deployment and hosting across AWS, GCP, Vercel, and Firebase
                    for mobile and web delivery, including CI/testing pipelines and
                    cross-platform publishing workflows for App Store and Google Play
                    releases.
                  </span>
                </li>
                <li className={styles.bulletItem}>
                  <span className={styles.bulletDot} />
                  <span>
                    Led React and React Native development for Amplinks for three years,
                    mentored the company&apos;s first full-time developer, and coordinated
                    cross-functional delivery across sales, service, and project management
                    modules with Stripe and QuickBooks integrations.
                  </span>
                </li>
                <li className={styles.bulletItem}>
                  <span className={styles.bulletDot} />
                  <span>
                    Integrated OpenAI and Anthropic Claude APIs into production Node.js and
                    Next.js systems, including WomenHeart SisterMatch AI peer-matching
                    features serving 1,000+ users on multi-cloud infrastructure.
                  </span>
                </li>
              </ul>
            </article>

            <article className={styles.experienceEntry}>
              <div className={styles.entryHeader}>
                <h3 className={styles.entryTitle}>
                  Salesforce BA / Trainer / Developer | Revature
                </h3>
                <p className={styles.entryPeriod}>Earlier</p>
              </div>
              <ul className={styles.bulletList}>
                <li className={styles.bulletItem}>
                  <span className={styles.bulletDot} />
                  <span>
                    Coordinated with large development groups, delivered Salesforce training
                    workshops and curriculum, and contributed measurable process improvements.
                  </span>
                </li>
                <li className={styles.bulletItem}>
                  <span className={styles.bulletDot} />
                  <span>
                    Applied Salesforce Admin and Apex Developer expertise across custom
                    objects, flows, automation, and platform customization.
                  </span>
                </li>
              </ul>
            </article>
          </div>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionLabel}>Education</h2>
          <p className={styles.educationLine}>
            B.S. Computer Science, West Chester University of Pennsylvania (2018)
          </p>
        </section>
      </article>
    </main>
  );
}

const styles = {
  page: `
    w-full bg-slate-100 px-4 py-4 font-sans text-slate-800
  `,
  paper: `
    mx-auto w-full max-w-[816px] rounded-sm border border-slate-200 bg-white px-9 py-7
    shadow-sm
  `,
  header: `
    border-b border-slate-200 pb-4
  `,
  name: `
    text-xl font-semibold tracking-tight text-slate-950
  `,
  subline: `
    mt-1 text-sm text-slate-600
  `,
  section: `
    mt-5
  `,
  sectionLabel: `
    border-b border-slate-200 pb-1 text-[11px] font-bold uppercase tracking-[0.2em]
    text-slate-500
  `,
  summary: `
    mt-2 text-sm leading-relaxed text-slate-700
  `,
  experienceList: `
    mt-2 space-y-4
  `,
  experienceEntry: `
    space-y-1
  `,
  entryHeader: `
    flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1
  `,
  entryTitle: `
    text-sm font-semibold text-slate-950
  `,
  entryPeriod: `
    text-xs font-medium uppercase tracking-[0.14em] text-slate-500
  `,
  bulletList: `
    space-y-1 text-sm leading-relaxed text-slate-700
  `,
  bulletItem: `
    flex gap-2
  `,
  bulletDot: `
    mt-2 h-1 w-1 shrink-0 rounded-full bg-slate-400
  `,
  educationLine: `
    mt-2 text-sm leading-relaxed text-slate-700
  `,
} as const;
