"use client";

import React from "react";

export default function GeneratedSkillsPreview() {
  const experience = [
    {
      role: "Software Engineer",
      organization: "Pencil Bible",
      period: "2021–2025",
      bullets: [
        "Scaled a React Native and Expo consumer app to 300,000 users and achieved a top-5 iPad App Store ranking for the keyword \"bible,\" owning architecture, release quality, and production reliability on Firebase and GCP.",
        "Migrated the drawing engine to React Native Skia to resolve platform-specific performance bottlenecks and deliver smoother, growth-ready interactions across iOS and iPad.",
        "Built the MVP from scratch in TypeScript with Expo and Firebase, shipping iterative releases through CI workflows while partnering on product direction and user-facing polish.",
      ],
    },
    {
      role: "Lead Software Engineer",
      organization: "Amplinks",
      period: "2021–2025",
      bullets: [
        "Led React and React Native development for three years, defining technical plans for sales, service, and project-management modules and launching them to production with Stripe and QuickBooks integrations.",
        "Onboarded and mentored the company's first full-time developer, setting code review standards and guiding delivery through ambiguous, cross-functional requirements.",
        "Integrated Firebase, AWS, and GCP backends for a cross-platform mobile app, improving deployment and release processes for field-service and payment workflows.",
      ],
    },
    {
      role: "Software Engineer",
      organization: "WomenHeart - SisterMatch",
      period: "2021–Present",
      bullets: [
        "Built a two-sided peer support marketplace with React, React Native, Expo, and TypeScript, scaling a closed network to 1,000 in-house users on Firebase, GCP, AWS, and Vercel.",
        "Integrated Claude Sonnet modules to improve peer matching and support flows, collaborating with stakeholders on feature trade-offs and measurable engagement outcomes.",
      ],
    },
  ];

  return (
    <main className={styles.page}>
      <article className={styles.paper}>
        <header className={styles.header}>
          <h1 className={styles.name}>Matt Ruiz</h1>
          <p className={styles.subline}>
            Senior Software Engineer, Consumer Growth Experience Engineering ·
            Philadelphia, Pennsylvania, United States
          </p>
        </header>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Executive Summary</h2>
          <p className={styles.summary}>
            I build and ship cross-platform React Native and React consumer
            products with TypeScript, scaling to hundreds of thousands of users
            while owning architecture, launches, and production reliability on
            AWS, GCP, and Firebase. I lead engineers through ambiguous growth
            work—from marketplace flows to performance migrations—and partner
            with product and design to deliver measurable outcomes. My work
            spans mobile-first delivery, CI/CD and release tooling, and
            full-stack backends that support analytics instrumentation.
          </p>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Experience</h2>
          <div className={styles.experienceList}>
            {experience.map((entry) => (
              <article
                key={entry.organization}
                className={styles.experienceEntry}
              >
                <div className={styles.experienceHeader}>
                  <h3 className={styles.experienceRole}>
                    {entry.role} | {entry.organization}
                  </h3>
                  <p className={styles.experiencePeriod}>{entry.period}</p>
                </div>
                <ul className={styles.bulletList}>
                  {entry.bullets.map((bullet) => (
                    <li key={bullet} className={styles.bulletItem}>
                      <span className={styles.bulletDot} />
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
            Bachelor&apos;s degree, Computer Science (major) and Web Technology
            (minor), West Chester University of Pennsylvania (2018)
          </p>
        </section>
      </article>
    </main>
  );
}

const styles = {
  page: `
    w-full bg-slate-100 px-4 py-6 font-sans text-slate-800
  `,
  paper: `
    mx-auto w-full max-w-[816px] rounded-sm border border-slate-200 bg-white
    px-8 py-7 shadow-sm ring-1 ring-slate-100
  `,
  header: `
    border-b border-slate-200 pb-4
  `,
  name: `
    text-xl font-semibold tracking-tight text-slate-950
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
  experienceEntry: `
    text-sm leading-relaxed text-slate-700
  `,
  experienceHeader: `
    flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1
  `,
  experienceRole: `
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
  bulletDot: `
    mt-2 h-1 w-1 shrink-0 rounded-full bg-slate-400
  `,
  educationLine: `
    mt-2 text-sm leading-relaxed text-slate-700
  `,
} as const;
