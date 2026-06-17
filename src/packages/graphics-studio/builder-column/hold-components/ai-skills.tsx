"use client";

import React from "react";

export default function GeneratedSkillsPreview() {
  const experience = [
    {
      role: "Lead Software Engineer",
      organization: "Amplinks",
      period: "2021–2025",
      bullets: [
        "Led React Native and React development for three years, shipping a cross-platform mobile app with Expo and TypeScript while launching sales, service, and project management modules to production on Firebase, AWS, and GCP.",
        "Onboarded and mentored the company's first full-time developer, integrated Stripe and QuickBooks, and owned full-stack delivery patterns from architecture through App Store and Google Play release.",
      ],
    },
    {
      role: "Software Engineer",
      organization: "Pencil Bible",
      period: "2021–2025",
      bullets: [
        "Built the React Native MVP from scratch with Expo and TypeScript, migrated the drawing engine to React Native Skia for smoother performance, and scaled the app to 300,000 users with a top-5 iPad App Store ranking for \"bible.\"",
        "Deployed production mobile releases on Firebase/GCP infrastructure with cross-platform iOS and Android delivery workflows.",
      ],
    },
    {
      role: "Software Engineer",
      organization: "WomenHeart - SisterMatch",
      period: "2021–Present",
      bullets: [
        "Built a cross-platform peer support network with React Native, Expo, and TypeScript, implementing a two-sided marketplace that scaled to 1,000 in-house users across Firebase/GCP, AWS, and Vercel-hosted web surfaces.",
        "Integrated Claude Sonnet AI modules for peer matching and support features, connecting mobile and web experiences with real-time backend services.",
      ],
    },
  ];

  return (
    <main className={styles.root}>
      <article className={styles.paper} aria-label="Resume for Matt Ruiz">
        <header className={styles.header}>
          <h1 className={styles.name}>Matt Ruiz</h1>
          <p className={styles.subline}>Staff Full Stack Engineer</p>
        </header>

        <section className={styles.section} aria-labelledby="executive-summary">
          <h2 id="executive-summary" className={styles.sectionLabel}>
            Executive Summary
          </h2>
          <p className={styles.summary}>
            I build and ship cross-platform mobile products with React Native and Expo,
            integrating TypeScript backends on AWS and GCP for App Store and Google Play
            delivery. I lead full-stack product work—from marketplace apps to 300k-user
            consumer releases—and embed Claude/OpenAI features where they improve user
            outcomes. I mentor engineers, collaborate cross-functionally, and take ownership
            from architecture through production deployment.
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
      </article>
    </main>
  );
}

const styles = {
  root: `
    w-full bg-slate-100 px-3 py-4 font-sans text-slate-800
  `,
  paper: `
    mx-auto w-[816px] max-w-full rounded-sm bg-white px-10 py-8 shadow-sm ring-1 ring-slate-200
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
    text-[11px] font-bold uppercase tracking-[0.2em] text-slate-500
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
} as const;
