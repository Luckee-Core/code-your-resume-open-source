"use client";

import React from "react";

export default function GeneratedSkillsPreview() {
  const experience = [
    {
      role: "Mobile Developer",
      organization: "WomenHeart - SisterMatch",
      period: "2021 – Present",
      bullets: [
        "Built and maintain a cross-platform peer support network with React Native, Expo, and TypeScript for iOS and Android, scaling a closed network to 1,000 in-house users in a healthcare context.",
        "Lead mobile development and deployment across Firebase/GCP and AWS infrastructure, collaborating on product features including a two-sided marketplace connecting peer support users.",
        "Integrated Claude Sonnet AI modules for enhanced peer matching and support workflows while keeping mobile UX responsive and reliable.",
      ],
    },
    {
      role: "Mobile Developer",
      organization: "Pencil Bible",
      period: "2021 – 2025",
      bullets: [
        "Built the MVP from scratch and shipped a React Native and Expo app to 300,000 users, achieving a top-5 iPad App Store ranking for the keyword \"bible\".",
        "Migrated the drawing layer to React Native Skia to optimize rendering performance and deliver smoother user interactions on iOS.",
        "Owned the full mobile app lifecycle with TypeScript and Firebase/GCP—from architecture through production deployment and ongoing iteration.",
      ],
    },
    {
      role: "Lead Mobile Developer",
      organization: "Amplinks",
      period: "2021 – 2025",
      bullets: [
        "Led React and React Native development for three years, shipping sales, service, and project management modules to production on iOS and Android.",
        "Onboarded and mentored the company's first full-time developer while establishing cross-platform patterns, code review habits, and Expo-based delivery workflows.",
        "Integrated Stripe, QuickBooks, Firebase, AWS, and GCP across a cross-platform mobile product used for field sales and service operations.",
      ],
    },
  ];

  return (
    <main className={styles.page}>
      <section className={styles.paper}>
        <header className={styles.header}>
          <h1 className={styles.name}>Matt Ruiz</h1>
          <p className={styles.subline}>
            Forward Deployed Engineer specializing in NextJS, React Native, Express and Postgres ·
            Philadelphia, Pennsylvania, United States
          </p>
        </header>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Executive Summary</h2>
          <p className={styles.summary}>
            I build and ship production React Native and Expo apps for iOS and Android, leading
            cross-platform development from MVP through deployment with TypeScript, CI, and
            performance optimization. I mentor developers, run code reviews, and have delivered
            healthcare and consumer apps at scale—including peer support for 1,000 users and a
            Bible app with 300,000 users. I integrate Firebase, AWS, and GCP backends while
            prioritizing UX and maintainable mobile architecture.
          </p>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Experience</h2>
          <div className={styles.experienceList}>
            {experience.map((entry) => (
              <article key={entry.organization} className={styles.experienceItem}>
                <div className={styles.experienceHeader}>
                  <h3 className={styles.experienceTitle}>
                    {entry.role} | {entry.organization}
                  </h3>
                  <p className={styles.experiencePeriod}>{entry.period}</p>
                </div>
                <ul className={styles.bulletList}>
                  {entry.bullets.map((bullet) => (
                    <li key={bullet} className={styles.bulletItem}>
                      <span className={styles.bulletMarker} />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Education</h2>
          <p className={styles.educationLine}>
            Bachelor&apos;s degree, Computer Science (major) and Web Technology (minor), West
            Chester University of Pennsylvania (2018)
          </p>
        </section>
      </section>
    </main>
  );
}

const styles = {
  page: `
    w-full bg-slate-100 px-4 py-6 font-sans text-slate-800
  `,
  paper: `
    mx-auto w-[816px] max-w-full rounded-sm border border-slate-200 bg-white px-9 py-7
    shadow-sm
  `,
  header: `
    border-b border-slate-200 pb-4
  `,
  name: `
    text-2xl font-semibold tracking-tight text-slate-950
  `,
  subline: `
    mt-1 text-sm leading-relaxed text-slate-600
  `,
  section: `
    mt-5
  `,
  sectionTitle: `
    text-[11px] font-bold uppercase tracking-[0.2em] text-slate-500
  `,
  summary: `
    mt-2 text-sm leading-relaxed text-slate-700
  `,
  experienceList: `
    mt-2 space-y-4
  `,
  experienceItem: `
    text-sm leading-relaxed text-slate-700
  `,
  experienceHeader: `
    flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1
  `,
  experienceTitle: `
    font-semibold text-slate-950
  `,
  experiencePeriod: `
    text-xs font-medium uppercase tracking-[0.14em] text-slate-500
  `,
  bulletList: `
    mt-1.5 space-y-1
  `,
  bulletItem: `
    flex gap-2
  `,
  bulletMarker: `
    mt-2 h-1 w-1 shrink-0 rounded-full bg-slate-400
  `,
  educationLine: `
    mt-2 text-sm leading-relaxed text-slate-700
  `,
} as const;
