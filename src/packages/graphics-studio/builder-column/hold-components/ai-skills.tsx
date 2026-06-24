"use client";

import React from "react";

export default function GeneratedSkillsPreview() {
  const experience = [
    {
      role: "Software Engineer",
      organization: "Luckee",
      period: "Jan 2026 – May 2026",
      bullets: [
        "Built Reddit search with listing scrape, interest profile compilation, and relevant-thread ranking—candidate generation and scoring for outbound personalization workflows.",
        "Designed standardized AI integration patterns across 10+ surfaces using Anthropic Claude, Express domain routers, and Supabase persistence with request/response ledgers for measurable iteration.",
        "Extracted monolith domains into standalone Express services for job search, lead research, and finance studios while preserving ADR-aligned backend structure.",
        "Shipped ICP Studio and Business Coach workflows with structured JSON parsing and context assembly syncing customer and strategy data into personalization pipelines.",
      ],
    },
    {
      role: "Software Engineer",
      organization: "WomenHeart - SisterMatch",
      period: "2021 – Present",
      bullets: [
        "Integrated Claude Sonnet modules for peer matching and support features in a two-sided marketplace, scaling a closed network to 1,000 in-house users.",
        "Built cross-platform peer support using React, React Native, and Expo with TypeScript on Firebase/GCP and AWS with Vercel frontend hosting.",
      ],
    },
    {
      role: "Software Engineer",
      organization: "Pencil Bible",
      period: "2021 – 2025",
      bullets: [
        "Scaled the app to 300,000 users during tenure—consumer onboarding and retention on iOS at high volume.",
        "Achieved top 5 iPad ranking for the keyword bible through iterative product and performance work, including a React Native Skia migration for smoother rendering at scale.",
        "Built MVP from scratch using React Native, Expo, TypeScript, and Firebase/GCP.",
      ],
    },
    {
      role: "Lead Software Engineer",
      organization: "Amplinks",
      period: "2021 – 2025",
      bullets: [
        "Led React and React Native development for three years; launched sales, service, and project management modules to production with Stripe, Firebase, AWS, and GCP backends.",
        "Onboarded and mentored the company's first full-time developer while shipping cross-platform mobile and web product modules.",
      ],
    },
  ];

  return (
    <main className={styles.page}>
      <article className={styles.paper}>
        <header className={styles.header}>
          <h1 className={styles.name}>Matt Ruiz</h1>
          <p className={styles.subline}>
            Staff Software Engineer, Onboarding · Philadelphia, Pennsylvania, United States
          </p>
        </header>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Executive Summary</h2>
          <p className={styles.summary}>
            I build backend systems for personalization, ranking, and onboarding at
            scale—from interest-profile compilation and relevant-thread ranking on Reddit
            search to Claude-driven peer matching for 1,000 users. I own Express service
            extraction, inference pipelines, and standardized AI integration patterns with
            ledger-backed instrumentation so teams can test growth bets and learn quickly. I
            partner across product and engineering, mentor developers, and use metrics to cut
            work that does not move activation.
          </p>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Experience</h2>
          <div className={styles.experienceList}>
            {experience.map((entry) => (
              <article key={entry.organization} className={styles.experienceEntry}>
                <div className={styles.experienceHeader}>
                  <h3 className={styles.experienceRole}>
                    {entry.role} | {entry.organization}
                  </h3>
                  <p className={styles.experiencePeriod}>{entry.period}</p>
                </div>
                <ul className={styles.bulletList}>
                  {entry.bullets.map((bullet) => (
                    <li key={bullet} className={styles.bulletItem}>
                      <span className={styles.bulletMarker} aria-hidden="true" />
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
      </article>
    </main>
  );
}

const styles = {
  page: `
    w-full bg-slate-100 px-4 py-6 font-sans text-slate-800
  `,
  paper: `
    mx-auto w-full max-w-[816px] rounded-sm border border-slate-200 bg-white px-8 py-7 shadow-sm
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
    text-xs font-medium uppercase tracking-[0.12em] text-slate-500
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
