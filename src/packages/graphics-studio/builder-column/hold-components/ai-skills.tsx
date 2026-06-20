"use client";

import React from "react";

export default function GeneratedSkillsPreview() {
  const experience = [
    {
      role: "Software Engineer",
      organization: "Luckee",
      period: "Jan–May 2026",
      bullets: [
        "Designed conversational AI workflows across 10+ product surfaces using Anthropic Claude, Express domain routers, Redux thunks, and Supabase ledger tables—coach-driven ICP studio, email persona mapping, and customer-scoped chat with structured JSON parsing.",
        "Owned platform patterns and velocity: extracted monolith domains into standalone Express services, standardized router factories and response envelopes, and documented Dev Hub setup so any studio runs locally from a central launcher with Postgres provisioning.",
        "Shipped unified AI-native dashboard wiring marketing, fundraising, and operations with auditable request/response ledgers; maintained getting-started catalog across 15+ studios and authored OSS governance pack covering CI benchmarks, security audits, and release checklists.",
      ],
    },
    {
      role: "Software Engineer",
      organization: "WomenHeart - SisterMatch",
      period: "2021–Present",
      bullets: [
        "Integrated Claude Sonnet AI modules for peer matching and support on a nonprofit two-sided marketplace, scaling a closed network to 1,000 in-house users on Firebase/GCP, AWS, and Vercel-hosted web surfaces.",
        "Built and maintained cross-platform peer support with React Native, Expo, and TypeScript—production stability across iOS, Android, and React web since 2021.",
      ],
    },
    {
      role: "Lead Software Engineer",
      organization: "Amplinks",
      period: "2021–2025",
      bullets: [
        "Led React and React Native development for three years, shipping sales, service, and project management modules to production with Stripe, QuickBooks, Firebase, AWS, and GCP integrations.",
        "Onboarded and mentored the company's first full-time developer while owning cross-platform mobile delivery with Expo and TypeScript from architecture through release.",
      ],
    },
    {
      role: "Software Engineer",
      organization: "Pencil Bible",
      period: "2021–2025",
      bullets: [
        "Built React Native MVP from scratch with Expo and TypeScript, migrated drawing engine to React Native Skia for smoother performance, and scaled to 300,000 users with a top-5 iPad App Store ranking for \"bible.\"",
        "Maintained production releases on Firebase/GCP with cross-platform iOS and Android delivery workflows.",
      ],
    },
  ];

  return (
    <main className={styles.root}>
      <article className={styles.paper} aria-label="Resume for Matt Ruiz">
        <header className={styles.header}>
          <h1 className={styles.name}>Matt Ruiz</h1>
          <p className={styles.subline}>
            Founding Engineer, Guide to Good · Philadelphia, Pennsylvania, United States
          </p>
        </header>

        <section className={styles.section} aria-labelledby="executive-summary">
          <h2 id="executive-summary" className={styles.sectionLabel}>
            Executive Summary
          </h2>
          <p className={styles.summary}>
            I build production AI chat workflows with Anthropic Claude and OpenAI across
            Next.js and Express, with Supabase ledgers for auditability and repeatable
            studio patterns. At Luckee I owned integration depth across 15+ studios—extracting
            Express services, enforcing CI and documentation standards, and wiring
            customer-scoped chat with structured JSON parsing. I keep nonprofit platforms
            like WomenHeart SisterMatch stable at scale on Vercel, AWS, and GCP.
          </p>
        </section>

        <section className={styles.section} aria-labelledby="experience">
          <h2 id="experience" className={styles.sectionLabel}>
            Experience
          </h2>
          <div className={styles.experienceList}>
            {experience.map((entry) => (
              <article
                key={`${entry.role}-${entry.organization}`}
                className={styles.entry}
              >
                <div className={styles.entryHeader}>
                  <h3 className={styles.entryTitle}>
                    {entry.role} | {entry.organization}
                  </h3>
                  <p className={styles.period}>{entry.period}</p>
                </div>
                <ul className={styles.bulletList}>
                  {entry.bullets.map((bullet) => (
                    <li key={bullet} className={styles.bulletItem}>
                      <span className={styles.bulletDot} aria-hidden="true" />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>

        <section className={styles.section} aria-labelledby="education">
          <h2 id="education" className={styles.sectionLabel}>
            Education
          </h2>
          <div className={styles.educationBlock}>
            <p className={styles.school}>West Chester University of Pennsylvania</p>
            <p>
              Bachelor&apos;s degree, Computer Science (major) and Web Technology (minor), 2018
            </p>
          </div>
        </section>
      </article>
    </main>
  );
}

const styles = {
  root: `
    w-full bg-slate-100 px-3 py-4 font-sans text-slate-800
  `,
  paper: `
    mx-auto w-[816px] max-w-full rounded-sm border border-slate-200 bg-white px-10 py-8 shadow-sm ring-1 ring-slate-100
  `,
  header: `
    border-b border-slate-200 pb-3
  `,
  name: `
    text-2xl font-semibold tracking-tight text-slate-950
  `,
  subline: `
    mt-1 text-sm text-slate-600
  `,
  section: `
    mt-5
  `,
  sectionLabel: `
    border-b border-slate-200 pb-1 text-[11px] font-bold uppercase tracking-[0.2em] text-slate-500
  `,
  summary: `
    mt-2 text-sm leading-relaxed text-slate-700
  `,
  experienceList: `
    mt-2 space-y-4
  `,
  entry: `
    break-inside-avoid
  `,
  entryHeader: `
    flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1
  `,
  entryTitle: `
    text-sm font-semibold text-slate-950
  `,
  period: `
    text-xs font-medium uppercase tracking-[0.14em] text-slate-500
  `,
  bulletList: `
    mt-1.5 space-y-1
  `,
  bulletItem: `
    flex gap-2 text-sm leading-relaxed text-slate-700
  `,
  bulletDot: `
    mt-2 h-1 w-1 shrink-0 rounded-full bg-slate-400
  `,
  educationBlock: `
    mt-2 text-sm leading-relaxed text-slate-700
  `,
  school: `
    font-semibold text-slate-950
  `,
} as const;
