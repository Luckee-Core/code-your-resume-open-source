"use client";

import React from "react";

export default function GeneratedSkillsPreview() {
  return (
    <main className={styles.page}>
      <article className={styles.paper}>
        <header className={styles.header}>
          <h1 className={styles.name}>Matt Ruiz</h1>
          <p className={styles.subline}>
            Senior Full Stack Engineer (React Native) · Philadelphia, Pennsylvania, United States
          </p>
        </header>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Executive Summary</h2>
          <p className={styles.summary}>
            I&apos;ve shipped twelve-plus production React Native and Expo apps in TypeScript with
            Node.js backends since 2022. My recent contract at Luckee had me wiring Anthropic Claude
            through Express APIs and Next.js studios into customer, project, and coaching workflows
            with ledgers for every exchange. I like owning the whole feature — mobile UI, backend
            services, and checking AI output before users see it.
          </p>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Experience</h2>
          <div className={styles.experienceList}>
            <article className={styles.experienceEntry}>
              <div className={styles.entryHeader}>
                <h3 className={styles.entryTitle}>
                  Senior Full Stack Engineer | Luckee
                </h3>
                <p className={styles.entryPeriod}>Jan 2026 – May 2026</p>
              </div>
              <ul className={styles.bulletList}>
                <li className={styles.bulletItem}>
                  <span className={styles.bulletDot} />
                  <span>
                    Designed standardized AI integration patterns across ten-plus studios using
                    Anthropic Claude, Express domain routers, and Supabase — chat UI, Redux thunks,
                    and ledger persistence for auditable exchanges.
                  </span>
                </li>
                <li className={styles.bulletItem}>
                  <span className={styles.bulletDot} />
                  <span>
                    Extracted monolith domains into standalone Express services with BFF-style
                    routers for job search, lead research, and personal finance studios while
                    preserving ADR-aligned CRUD patterns.
                  </span>
                </li>
                <li className={styles.bulletItem}>
                  <span className={styles.bulletDot} />
                  <span>
                    Built Business Coach and ICP Studio conversational workflows with structured
                    JSON parsing, fact extraction, and context assembly syncing customer and
                    strategy data to Supabase.
                  </span>
                </li>
                <li className={styles.bulletItem}>
                  <span className={styles.bulletDot} />
                  <span>
                    Connected marketing, fundraising, and operations surfaces into a unified
                    AI-native dashboard with request/response ledgers for pitch deck, customers,
                    projects, and tickets.
                  </span>
                </li>
              </ul>
            </article>

            <article className={styles.experienceEntry}>
              <div className={styles.entryHeader}>
                <h3 className={styles.entryTitle}>
                  Software Engineer | WomenHeart - SisterMatch
                </h3>
                <p className={styles.entryPeriod}>2021 – Present</p>
              </div>
              <ul className={styles.bulletList}>
                <li className={styles.bulletItem}>
                  <span className={styles.bulletDot} />
                  <span>
                    Built cross-platform peer support network using React Native, Expo, and
                    TypeScript; scaled closed network to 1,000 in-house users on Firebase/GCP and
                    AWS with Vercel frontend hosting.
                  </span>
                </li>
                <li className={styles.bulletItem}>
                  <span className={styles.bulletDot} />
                  <span>
                    Integrated Claude Sonnet AI modules for enhanced peer matching and support
                    features in a two-sided marketplace connecting peer support users.
                  </span>
                </li>
              </ul>
            </article>

            <article className={styles.experienceEntry}>
              <div className={styles.entryHeader}>
                <h3 className={styles.entryTitle}>
                  React Native Engineer | Pencil Bible
                </h3>
                <p className={styles.entryPeriod}>2021 – 2025</p>
              </div>
              <ul className={styles.bulletList}>
                <li className={styles.bulletItem}>
                  <span className={styles.bulletDot} />
                  <span>
                    Built MVP from scratch with React Native, Expo, TypeScript, and Firebase;
                    scaled to 300,000 users and achieved top 5 iPad ranking for the keyword
                    &apos;bible&apos;.
                  </span>
                </li>
                <li className={styles.bulletItem}>
                  <span className={styles.bulletDot} />
                  <span>
                    Migrated drawing implementation to React Native Skia for improved performance
                    and smoothness on iOS and Android.
                  </span>
                </li>
              </ul>
            </article>

            <article className={styles.experienceEntry}>
              <div className={styles.entryHeader}>
                <h3 className={styles.entryTitle}>
                  Lead React Native Developer | Amplinks
                </h3>
                <p className={styles.entryPeriod}>2021 – 2025</p>
              </div>
              <ul className={styles.bulletList}>
                <li className={styles.bulletItem}>
                  <span className={styles.bulletDot} />
                  <span>
                    Led React and React Native development for three years; shipped sales, service,
                    and project management modules to production on cross-platform mobile with
                    Stripe and QuickBooks integrations.
                  </span>
                </li>
                <li className={styles.bulletItem}>
                  <span className={styles.bulletDot} />
                  <span>
                    Onboarded and mentored the company&apos;s first full-time developer while
                    integrating Firebase, AWS, and GCP for backend infrastructure.
                  </span>
                </li>
              </ul>
            </article>
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
    text-2xl font-semibold tracking-tight text-slate-950
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
    break-inside-avoid
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
    mt-1.5 space-y-1
  `,
  bulletItem: `
    flex gap-2 text-sm leading-relaxed text-slate-700
  `,
  bulletDot: `
    mt-2 h-1 w-1 shrink-0 rounded-full bg-slate-400
  `,
  educationLine: `
    mt-2 text-sm leading-relaxed text-slate-700
  `,
} as const;
