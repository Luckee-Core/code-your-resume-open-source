"use client";

import React from "react";

export default function GeneratedSkillsPreview() {
  const experience = [
    {
      role: "Lead Software Engineer",
      organization: "Amplinks",
      period: "2021–2025",
      bullets: [
        "Led React and React Native development for three years, shipping sales, service, and project management modules to production with Stripe, QuickBooks, and cross-platform Expo delivery.",
        "Onboarded and mentored the company's first full-time developer while integrating Firebase, AWS, and GCP backend infrastructure across the mobile and web stack.",
        "Built three main product modules and completed project management development for field-service workflows used in daily operations.",
      ],
    },
    {
      role: "Software Engineer",
      organization: "Pencil Bible",
      period: "2021–2025",
      bullets: [
        "Built MVP from scratch with React Native, Expo, and TypeScript; scaled to 300,000 users and achieved top 5 iPad App Store ranking for \"bible.\"",
        "Migrated drawing implementation to React Native Skia for improved performance and smoothness on iOS.",
      ],
    },
    {
      role: "Software Engineer",
      organization: "WomenHeart - SisterMatch",
      period: "2021–Present",
      bullets: [
        "Built cross-platform peer support network using React, React Native, Expo, and TypeScript, scaling a closed network to 1,000 in-house users with a two-sided marketplace model.",
        "Deployed on Firebase/GCP and AWS with Vercel frontend hosting; integrated Claude Sonnet AI modules for enhanced peer matching and support features.",
      ],
    },
  ];

  return (
    <main className={styles.page}>
      <article className={styles.paper}>
        <header className={styles.header}>
          <h1 className={styles.name}>Matt Ruiz</h1>
          <p className={styles.subline}>Staff Full Stack Engineer · React Native</p>
        </header>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Executive Summary</h2>
          <p className={styles.summary}>
            I build cross-platform mobile products with React Native, Expo, and TypeScript,
            shipping apps to the App Store and Google Play and scaling users into the hundreds
            of thousands. I lead full-stack delivery across Node.js, AWS, GCP, and Vercel, and I
            mentor engineers while partnering with product and design on production launches. My
            work spans marketplace, CRM, and peer-support platforms where reliable iOS and
            Android UX matters.
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
                      <span className={styles.bulletMarker} aria-hidden="true" />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
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
    mx-auto w-full max-w-[816px] rounded-sm border border-slate-200 bg-white px-9 py-7
    shadow-sm
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
  experienceItem: `
    text-sm leading-relaxed text-slate-700
  `,
  experienceHeader: `
    flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1
  `,
  experienceTitle: `
    text-sm font-semibold text-slate-950
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
} as const;
