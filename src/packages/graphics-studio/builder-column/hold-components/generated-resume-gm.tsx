"use client";

import React from "react";

export default function GeneratedSkillsPreview() {
  return (
    <main className={styles.page}>
      <article className={styles.paper}>
        <header className={styles.header}>
          <h1 className={styles.name}>Matt Ruiz</h1>
          <p className={styles.subline}>
            Senior AI/ML Engineer · Philadelphia, Pennsylvania, United States
          </p>
        </header>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Executive Summary</h2>
          <p className={styles.summary}>
            I build TypeScript and React tooling that turns messy labeling workflows into
            scalable, AI-assisted experiences with auditable ledgers and structured review
            surfaces. At Luckee I standardized Anthropic Claude integration across 10+
            studios—coaching UIs, JSON parsing pipelines, and Express-backed dashboards that
            reduce spin-up time for new annotation domains. I ship end-to-end on AWS, GCP,
            and Vercel, using modern AI development workflows to accelerate delivery across
            consultancy and product work.
          </p>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Experience</h2>
          <div className={styles.experienceList}>
            <article className={styles.experienceEntry}>
              <div className={styles.entryHeader}>
                <h3 className={styles.entryTitle}>
                  Software Engineer | Luckee
                </h3>
                <p className={styles.entryPeriod}>Jan 2026 – May 2026</p>
              </div>
              <ul className={styles.bulletList}>
                <li className={styles.bulletItem}>
                  Designed standardized AI studio architecture—chat UI → Redux thunk → Express
                  domain → Anthropic → Supabase ledger tables—across 10+ surfaces including
                  Business Coach, ICP Studio, and customer-scoped chat with audit trails for
                  review and quality insight.
                </li>
                <li className={styles.bulletItem}>
                  Built conversational AI workflows with structured JSON parsing, fact
                  extraction pipelines, and context assembly syncing strategy and customer data
                  to PostgreSQL-backed ledgers for traceable request/response exchanges.
                </li>
                <li className={styles.bulletItem}>
                  Extracted monolith domains into standalone Express services with
                  ADR-aligned router patterns; documented Dev Hub launcher enabling developers
                  to run any studio from zero with local Postgres provisioning and embedded
                  terminals.
                </li>
                <li className={styles.bulletItem}>
                  Shipped email persona and Reddit search domains with structured response
                  parsing, interest profile compilation, and relevant-thread ranking to
                  accelerate GTM research and outbound workflows.
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
                  Integrated Claude Sonnet AI modules for enhanced peer matching and support
                  features in a closed network scaled to 1,000 in-house users on
                  Firebase/GCP and AWS.
                </li>
                <li className={styles.bulletItem}>
                  Built and maintained a two-sided peer support marketplace using React,
                  React Native, Expo, and TypeScript with real-time backends deployed on
                  Vercel.
                </li>
              </ul>
            </article>

            <article className={styles.experienceEntry}>
              <div className={styles.entryHeader}>
                <h3 className={styles.entryTitle}>
                  Lead React Developer | Amplinks
                </h3>
                <p className={styles.entryPeriod}>2021 – 2025</p>
              </div>
              <ul className={styles.bulletList}>
                <li className={styles.bulletItem}>
                  Led React and React Native development for three years, shipping sales,
                  service, and project management modules to production with Stripe and
                  QuickBooks integrations across Firebase, AWS, and GCP.
                </li>
                <li className={styles.bulletItem}>
                  Onboarded and mentored the company&apos;s first full-time developer while
                  owning end-to-end delivery from module design through rollout and
                  operations.
                </li>
              </ul>
            </article>

            <article className={styles.experienceEntry}>
              <div className={styles.entryHeader}>
                <h3 className={styles.entryTitle}>
                  Software Engineer | Pencil Bible
                </h3>
                <p className={styles.entryPeriod}>2021 – 2025</p>
              </div>
              <ul className={styles.bulletList}>
                <li className={styles.bulletItem}>
                  Scaled React Native app to 300,000 users and achieved top 5 iPad ranking;
                  migrated drawing implementation to React Native Skia for improved rendering
                  performance in a data-intensive visualization surface.
                </li>
                <li className={styles.bulletItem}>
                  Built MVP from scratch using React Native, Expo, TypeScript, and
                  Firebase/GCP with CI-driven iteration and production deployment workflows.
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
    mx-auto w-full max-w-[816px] rounded-sm border border-slate-200 bg-white px-8 py-7
    shadow-sm ring-1 ring-slate-100
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
    text-[11px] font-bold uppercase tracking-[0.18em] text-slate-500
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
  entryHeader: `
    flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1
  `,
  entryTitle: `
    font-semibold text-slate-950
  `,
  entryPeriod: `
    text-xs font-medium uppercase tracking-[0.12em] text-slate-500
  `,
  bulletList: `
    mt-1.5 list-disc space-y-1 pl-4
  `,
  bulletItem: `
    text-sm leading-relaxed text-slate-700
  `,
  educationLine: `
    mt-2 text-sm leading-relaxed text-slate-700
  `,
} as const;
