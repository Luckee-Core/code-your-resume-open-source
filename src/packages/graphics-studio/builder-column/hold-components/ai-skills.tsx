"use client";

import React from "react";

export default function GeneratedSkillsPreview() {
  const luckeeBullets = [
    "Designed and shipped standardized generative AI integration across 10+ product surfaces using Anthropic Claude, Express domain routers, and Supabase ledger tables so every request and response stays observable before users see output.",
    "Built conversational AI workflows with structured JSON parsing, fact extraction pipelines, and context assembly syncing customer and strategy data to Postgres for coach-driven studios including ICP, Business Coach, and email persona.",
    "Extracted monolith domains into standalone Express services with maintainable schemas, local Postgres provisioning, and CRUD patterns while preserving ADR-aligned structure for job search, lead research, and personal finance studios.",
    "Authored OSS governance packs covering API wire contracts, security audit guides, and Express backend benchmarks; enforced domain router factory patterns and standardized response envelopes to raise team velocity on new studio spin-ups.",
  ];

  const womenHeartBullets = [
    "Integrated Claude Sonnet AI modules into production peer-matching and support features for a closed network scaled to 1,000 in-house users on Firebase/GCP, AWS, and Vercel-hosted TypeScript frontends.",
    "Built and maintained a two-sided peer support marketplace across React, React Native, and Expo with real-time backends, iterating on feature quality as usage grew from 2021 to present.",
  ];

  const pencilBibleBullets = [
    "Shipped a React Native and Expo iPad app from MVP to 300,000 users, reaching top-5 App Store ranking for the keyword bible while migrating drawing performance to React Native Skia on Firebase/GCP.",
  ];

  const amplinksBullets = [
    "Led React and React Native development for three years, launching sales, service, and project management modules to production with Stripe, QuickBooks, Firebase, AWS, and GCP integrations.",
    "Onboarded and mentored the company's first full-time developer while owning cross-platform delivery patterns for field-service workflows used in daily operations.",
  ];

  return (
    <React.Fragment>
      <main className={styles.canvas}>
        <article className={styles.paper}>
          <header className={styles.header}>
            <h1 className={styles.name}>Matt Ruiz</h1>
            <p className={styles.subline}>
              Senior AI Engineer (P4) · Philadelphia, Pennsylvania, United States
            </p>
          </header>

          <section className={styles.section}>
            <h2 className={styles.sectionLabel}>Executive Summary</h2>
            <p className={styles.summary}>
              I build production generative AI services with Claude and OpenAI, owning prompts, APIs,
              ledgers, and Supabase persistence so output stays traceable before it reaches users. At
              Luckee I standardized the same chat-to-domain-router pattern across 10+ product surfaces
              and paired structured JSON parsing with observability hooks on Express backends. I also
              ship TypeScript and Python-friendly data paths across Next.js, Node.js, Postgres, and
              AWS/GCP with evaluation-minded iteration.
            </p>
          </section>

          <section className={styles.section}>
            <h2 className={styles.sectionLabel}>Experience</h2>
            <div className={styles.experienceList}>
              <article>
                <div className={styles.roleRow}>
                  <h3 className={styles.role}>Software Engineer | Luckee</h3>
                  <p className={styles.period}>Jan 2026 – May 2026</p>
                </div>
                <ul className={styles.bulletList}>
                  {luckeeBullets.map((bullet) => (
                    <li key={bullet} className={styles.bulletItem}>
                      <span className={styles.bulletDot} />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </article>

              <article>
                <div className={styles.roleRow}>
                  <h3 className={styles.role}>Software Engineer | WomenHeart - SisterMatch</h3>
                  <p className={styles.period}>2021 – Present</p>
                </div>
                <ul className={styles.bulletList}>
                  {womenHeartBullets.map((bullet) => (
                    <li key={bullet} className={styles.bulletItem}>
                      <span className={styles.bulletDot} />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </article>

              <article>
                <div className={styles.roleRow}>
                  <h3 className={styles.role}>Software Engineer | Pencil Bible</h3>
                  <p className={styles.period}>2021 – 2025</p>
                </div>
                <ul className={styles.bulletList}>
                  {pencilBibleBullets.map((bullet) => (
                    <li key={bullet} className={styles.bulletItem}>
                      <span className={styles.bulletDot} />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </article>

              <article>
                <div className={styles.roleRow}>
                  <h3 className={styles.role}>Lead Engineer | Amplinks</h3>
                  <p className={styles.period}>2021 – 2025</p>
                </div>
                <ul className={styles.bulletList}>
                  {amplinksBullets.map((bullet) => (
                    <li key={bullet} className={styles.bulletItem}>
                      <span className={styles.bulletDot} />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </article>
            </div>
          </section>

          <section className={styles.section}>
            <h2 className={styles.sectionLabel}>Education</h2>
            <div className={styles.educationBlock}>
              <p className={styles.school}>West Chester University of Pennsylvania</p>
              <p>Bachelor&apos;s degree, Computer Science (major) and Web Technology (minor), 2018</p>
            </div>
          </section>
        </article>
      </main>
    </React.Fragment>
  );
}

const styles = {
  canvas: `
    w-full bg-slate-100 px-3 py-4 font-sans text-slate-800
  `,
  paper: `
    mx-auto w-full max-w-[816px] rounded-sm border border-slate-200 bg-white px-10 py-8 shadow-sm ring-1 ring-slate-100
  `,
  header: `
    border-b border-slate-200 pb-4
  `,
  name: `
    text-3xl font-semibold tracking-tight text-slate-950
  `,
  subline: `
    mt-1 text-sm font-medium text-slate-600
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
    mt-3 space-y-4
  `,
  roleRow: `
    flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1
  `,
  role: `
    text-sm font-semibold text-slate-950
  `,
  period: `
    text-xs font-semibold uppercase tracking-[0.14em] text-slate-500
  `,
  bulletList: `
    mt-1.5 space-y-1.5 text-sm leading-relaxed text-slate-700
  `,
  bulletItem: `
    flex gap-2
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
