"use client";

import React from "react";

export default function GeneratedSkillsPreview() {
  const experience = [
    {
      role: "Software Engineer",
      organization: "Luckee",
      period: "Jan 2026 – May 2026",
      bullets: [
        "Designed standardized AI integration patterns across 10+ product surfaces using Anthropic Claude, Express domain routers, and Supabase ledger tables for auditable RAG-style workflows, structured JSON parsing, and context assembly.",
        "Built conversational AI features—including Business Coach, email persona studio, and customer-scoped chat with suggested actions—syncing domain data to Supabase with versioned request/response ledgers for quality iteration.",
        "Shipped retrieval workflows such as Reddit search with interest-profile compilation and thread ranking, plus extracted monolith domains into standalone Express services with documented API and governance patterns.",
        "Authored OSS Dev Hub and release-readiness documentation so engineers can run AI studios locally with reproducible Postgres provisioning, wire contracts, and observable integration standards.",
      ],
    },
    {
      role: "Software Engineer",
      organization: "WomenHeart - SisterMatch",
      period: "2021 – Present",
      bullets: [
        "Integrated Claude Sonnet AI modules into peer matching and support features for a closed network scaled to 1,000 in-house users across React, React Native, and Expo.",
        "Operated production deployments on Firebase/GCP, AWS, and Vercel with TypeScript, owning full-stack delivery of a two-sided peer support marketplace.",
      ],
    },
    {
      role: "Software Engineer",
      organization: "Pencil Bible",
      period: "2021 – 2025",
      bullets: [
        "Scaled a consumer iPad app to 300,000 users with a top-5 App Store ranking for its category, migrating drawing performance to React Native Skia in production.",
        "Built the MVP end-to-end with React Native, Expo, TypeScript, and Firebase/GCP—from initial spec through deployment and ongoing operations on a high-traffic surface.",
      ],
    },
    {
      role: "Lead Software Engineer",
      organization: "Amplinks",
      period: "2021 – 2025",
      bullets: [
        "Led React and React Native development across sales, service, and project management modules, integrating Stripe, QuickBooks, Firebase, AWS, and GCP into production workflows.",
        "Onboarded and mentored the company's first full-time developer while shipping cross-platform features with CI-backed delivery and multi-cloud backend ownership.",
      ],
    },
  ];

  return (
    <main className={styles.page}>
      <section className={styles.paper}>
        <header className={styles.header}>
          <h1 className={styles.name}>Matt Ruiz</h1>
          <p className={styles.subline}>
            Sr. Software Engineer II - AI · Philadelphia, Pennsylvania, United States
          </p>
        </header>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Executive Summary</h2>
          <p className={styles.summary}>
            I design and ship production LLM features—RAG pipelines, conversational agents, and
            auditable AI workflows—using Anthropic Claude, Express, and Supabase across full-stack
            Next.js and React Native products. I standardize retrieval, prompt engineering,
            structured parsing, and request/response ledgers so teams can iterate on model quality
            with observable, testable patterns. I own features end-to-end from integration through
            deployment, documentation, and mentoring engineers on AI-native delivery.
          </p>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Experience</h2>
          <div className={styles.experienceList}>
            {experience.map((entry) => (
              <article key={entry.organization} className={styles.experienceItem}>
                <div className={styles.experienceHeader}>
                  <h3 className={styles.experienceRole}>
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
            Bachelor&apos;s degree, Computer Science (major) and Web Technology (Minor), West
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
    mx-auto w-full max-w-[816px] rounded-sm border border-slate-200 bg-white px-10 py-8 shadow-sm
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
    mt-3 space-y-4
  `,
  experienceItem: `
    break-inside-avoid
  `,
  experienceHeader: `
    flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1
  `,
  experienceRole: `
    text-sm font-semibold text-slate-950
  `,
  experiencePeriod: `
    text-xs font-medium uppercase tracking-[0.14em] text-slate-500
  `,
  bulletList: `
    mt-1.5 space-y-1 text-sm leading-relaxed text-slate-700
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
