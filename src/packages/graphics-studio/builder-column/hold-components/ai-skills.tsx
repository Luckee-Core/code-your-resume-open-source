"use client";

import React from "react";

export default function GeneratedSkillsPreview() {
  const experience = [
    {
      role: "Frontend Engineer",
      organization: "WomenHeart - SisterMatch",
      period: "2021 – Present",
      bullets: [
        "Built and maintained a two-sided peer support community with React, React Native, and TypeScript, scaling the closed network to 1,000 in-house users.",
        "Owned cross-platform frontend delivery deployed on Vercel with Firebase/GCP and AWS infrastructure.",
        "Shipped matching and support features integrating Claude Sonnet modules for peer connection workflows.",
      ],
    },
    {
      role: "Frontend Engineer",
      organization: "Luckee",
      period: "Jan 2026 – May 2026",
      bullets: [
        "Maintained user-facing Next.js studio surfaces across 15+ product areas and standardized frontend-to-API patterns that reduced new feature setup time.",
        "Built Reddit search tooling for listing scrape, interest profiling, and thread ranking—working directly with Reddit's community structure.",
        "Authored OSS governance docs and platform standards (router factories, response envelopes, wire contracts) to improve developer workflows.",
        "Delivered end-to-end dashboard features connecting Redux UI, Express APIs, and Supabase persistence with auditable request/response ledgers.",
      ],
    },
    {
      role: "Lead Frontend Engineer",
      organization: "Amplinks",
      period: "2021 – 2025",
      bullets: [
        "Led React and React Native development for three years, launching sales, service, and project management modules to production.",
        "Onboarded and mentored the company's first full-time developer while building cross-platform mobile with React Native and Expo.",
        "Integrated Stripe payments, QuickBooks accounting, and Firebase/AWS/GCP backends into the product stack.",
      ],
    },
    {
      role: "React Native Engineer",
      organization: "Pencil Bible",
      period: "2021 – 2025",
      bullets: [
        'Built the React Native MVP from scratch and grew the app to 300,000 users, reaching top 5 iPad ranking for "bible."',
        "Migrated the drawing layer to React Native Skia to improve rendering performance and interaction smoothness.",
      ],
    },
  ];

  return (
    <main className={styles.page}>
      <article className={styles.paper}>
        <header className={styles.header}>
          <h1 className={styles.name}>Matt Ruiz</h1>
          <p className={styles.subline}>
            Senior Frontend Engineer, Community Builders · Philadelphia, Pennsylvania, United States
          </p>
        </header>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Executive Summary</h2>
          <p className={styles.summary}>
            I build user-facing React and TypeScript products end to end—from UI through APIs to
            production—on web and mobile. I've shipped community and marketplace experiences at
            scale, including a peer support network for 1,000 users and apps reaching 300,000
            users. I like owning features with designers and PMs, setting patterns teams can reuse,
            and mentoring developers through delivery.
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
            Bachelor&apos;s degree, Computer Science (major) and Web Technology (minor), West Chester
            University of Pennsylvania (2018)
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
    mx-auto w-full max-w-[816px] rounded-sm border border-slate-200 bg-white px-9 py-7 shadow-sm
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
