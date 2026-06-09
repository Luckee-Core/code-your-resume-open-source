"use client";

import React from "react";

export default function GeneratedSkillsPreview() {
  const experience = [
    {
      role: "Frontend Product Engineer",
      organization: "Acme Labs",
      period: "Recent",
      bullets: [
        "Set frontend delivery direction across product and client builds by choosing React/TypeScript patterns, Redux state boundaries, CI/testing, and release workflows while embedding Claude/OpenAI automation where it reduced repetitive work.",
        "Built AI-powered dashboards and workflow tooling with Next.js, Node.js, Firebase/Supabase, embeddings, function calling, and RAG-style interfaces, translating operational pain into usable customer experiences.",
        "Shipped marketplace, social, field-service, and training products including TeenPros, BoxBets, Swizzy Golf, Women Heart Sister Match, and Amplinks-style workflows with payments, maps, push/chat, Twilio video, and production deployment on Vercel, AWS, and GCP.",
        "Maintained release quality through TypeScript, Jest, ESLint, CI pipelines, pragmatic code review habits, and production-minded follow-up when stability, performance, or customer usability needed attention.",
      ],
    },
    {
      role: "Salesforce BA / Trainer / Developer",
      organization: "Revature",
      period: "Earlier",
      bullets: [
        "Coordinated with large development groups, delivered Salesforce training workshops and curriculum, and contributed measurable process improvements across platform delivery work.",
        "Applied Certified Salesforce Admin and Apex Developer knowledge across custom objects, flows, automation, business analysis, and constructive cross-team feedback.",
      ],
    },
  ];

  return (
    <main className={styles.root}>
      <article className={styles.paper} aria-label="Resume for Matt Ruiz">
        <header className={styles.header}>
          <h1 className={styles.name}>Matt Ruiz</h1>
          <p className={styles.roleLabel}>Staff Frontend Software Engineer</p>
        </header>

        <section className={styles.section} aria-labelledby="executive-summary">
          <h2 id="executive-summary" className={styles.sectionLabel}>
            Executive Summary
          </h2>
          <p className={styles.summary}>
            I build AI-assisted React and TypeScript products with practical architectural ownership: choosing state patterns,
            integrating Claude/OpenAI workflows, and keeping interfaces usable in production. My work spans Next.js
            dashboards, React Native apps, Node/Firebase backends, CI/testing, and release-minded delivery. I bring an
            operations-aware style shaped by field work and product/client builds.
          </p>
        </section>

        <section className={styles.section} aria-labelledby="experience">
          <h2 id="experience" className={styles.sectionLabel}>
            Experience
          </h2>
          <div className={styles.experienceList}>
            {experience.map((entry) => (
              <article key={`${entry.role}-${entry.organization}`} className={styles.entry}>
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
          <div className={styles.educationBody}>
            <p className={styles.school}>West Chester University of Pennsylvania</p>
            <p>B.S. Computer Science, 2018</p>
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
    pb-3
  `,
  name: `
    text-3xl font-semibold tracking-tight text-slate-950
  `,
  roleLabel: `
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
  entry: `
    space-y-1.5
  `,
  entryHeader: `
    flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1
  `,
  entryTitle: `
    text-sm font-semibold text-slate-950
  `,
  period: `
    text-xs font-semibold uppercase tracking-[0.14em] text-slate-500
  `,
  bulletList: `
    space-y-1 text-sm leading-relaxed text-slate-700
  `,
  bulletItem: `
    flex gap-2
  `,
  bulletDot: `
    mt-2 h-1 w-1 shrink-0 rounded-full bg-slate-400
  `,
  educationBody: `
    mt-2 text-sm leading-relaxed text-slate-700
  `,
  school: `
    font-semibold text-slate-950
  `,
} as const;