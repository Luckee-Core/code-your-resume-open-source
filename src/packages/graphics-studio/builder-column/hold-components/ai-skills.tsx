"use client";

import React from "react";

export default function GeneratedSkillsPreview() {
  const experience = [
    {
      role: "Lead Software Engineer",
      organization: "Amplinks",
      period: "2021–2025",
      bullets: [
        "Led React and React Native development for three years, shipping sales, service, and project management modules to production with Stripe payments, QuickBooks integrations, and REST APIs across Firebase, AWS, and GCP.",
        "Built and launched a cross-platform Expo mobile app while mentoring the company's first full-time developer, owning full-stack features from interface design through backend deployment and production troubleshooting.",
        "Delivered customer-facing product customizations and project management tooling that supported immediate business impact for field-service workflows.",
      ],
    },
    {
      role: "Software Engineer",
      organization: "Pencil Bible",
      period: "2021–2025",
      bullets: [
        "Built the MVP from scratch with React Native, Expo, and TypeScript; migrated the drawing engine to React Native Skia for smoother iOS and Android performance at scale.",
        "Scaled the app to 300,000 users and achieved a top-5 iPad App Store ranking for \"bible\" through maintainable architecture, disciplined debugging, and Firebase/GCP deployment.",
      ],
    },
    {
      role: "Software Engineer",
      organization: "WomenHeart - SisterMatch",
      period: "2021–Present",
      bullets: [
        "Built a cross-platform peer support network with React, React Native, and Expo/TypeScript, scaling a closed marketplace to 1,000 in-house users connecting peer support participants.",
        "Deployed full-stack on Firebase/GCP and AWS with Vercel frontend hosting, integrating Claude Sonnet modules for enhanced peer matching and end-to-end user experiences.",
      ],
    },
  ];

  return (
    <main className={styles.page}>
      <section className={styles.paper}>
        <header className={styles.header}>
          <h1 className={styles.name}>Matt Ruiz</h1>
          <p className={styles.subline}>
            Forward Deployed Engineer specializing in NextJS, React Native, Express and Postgres ·
            Philadelphia, Pennsylvania, United States
          </p>
        </header>

        <section className={styles.section}>
          <h2 className={styles.sectionHeading}>Executive Summary</h2>
          <p className={styles.summary}>
            I build and ship customer-facing React and React Native apps with TypeScript,
            collaborating with product and design to deliver full-stack features from UI through
            REST APIs on GCP, AWS, and Vercel. I have owned cross-platform products
            end-to-end—debugging production issues, mentoring engineers, and maintaining scalable
            code for hundreds of thousands of users. I bring hands-on Expo, Redux, and Firebase
            experience while balancing speed with technical quality.
          </p>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionHeading}>Experience</h2>
          <div className={styles.experienceList}>
            {experience.map((entry) => (
              <article key={entry.organization} className={styles.experienceEntry}>
                <div className={styles.experienceHeader}>
                  <h3 className={styles.experienceTitle}>
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
          <h2 className={styles.sectionHeading}>Education</h2>
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
    mt-1.5 text-sm leading-relaxed text-slate-600
  `,
  section: `
    mt-5
  `,
  sectionHeading: `
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
  experienceTitle: `
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
