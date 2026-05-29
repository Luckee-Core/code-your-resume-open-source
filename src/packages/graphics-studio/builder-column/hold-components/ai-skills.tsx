"use client";

import React from "react";

export default function GeneratedSkillsPreview() {
  const experience = [
    {
      role: "Product Engineer",
      organization: "TroutHouseTech and client product work",
      period: "Recent",
      bullets: [
        "Built AI automation and workflow tooling for teams reducing repetitive work, with production integrations across Node.js backends, React Native mobile apps, and Next.js dashboards.",
        "Integrated OpenAI and Anthropic Claude APIs for chatbots, prompt engineering, fine-tuning, embeddings, function calling, RAG systems, and real-time inference.",
        "Shipped marketplace, social, field-service, video, and payments products including TeenPros, BoxBets, Swizzy Golf, Women Heart Sister Match, painter/DIY workflows, and Amplinks-style operations flows.",
        "Delivered React Native, Expo, Next.js, TypeScript, Redux, Firebase, Supabase, Twilio video, MapBox, Stripe, CI/testing, Vercel, AWS, and GCP work across product prototypes and production services.",
      ],
    },
    {
      role: "Salesforce BA / Trainer / Developer",
      organization: "Revature",
      period: "Earlier",
      bullets: [
        "Coordinated with large development groups while applying Salesforce Admin and Apex Developer knowledge across core platform features, custom objects, flows, automation, and business analysis work.",
        "Designed and delivered Salesforce training workshops and curriculum as a corporate trainer, pairing technical instruction with practical process improvement work.",
      ],
    },
  ];

  const technicalFocus = [
    {
      label: "AI and automation",
      value:
        "OpenAI, Anthropic Claude, chatbots, prompt engineering, fine-tuning, embeddings, function calling, RAG systems, real-time inference.",
    },
    {
      label: "Mobile and web",
      value:
        "React Native, Expo, Expo Router, React Navigation, Redux, Next.js, React, TypeScript, JavaScript, Node.js, dashboards, full-stack services.",
    },
    {
      label: "Backends and data",
      value:
        "Node.js, Firebase Realtime Database, Firestore, Firebase Auth, Cloud Functions, Supabase PostgreSQL, real-time subscriptions, authentication.",
    },
    {
      label: "Integrations and platforms",
      value:
        "Twilio video, MapBox, Stripe, Salesforce Admin/Apex/flows, Vercel, AWS, GCP, managed hosting, edge functions, CI/CD deployment.",
    },
  ];

  return (
    <main className={styles.page}>
      <article className={styles.paper}>
        <header className={styles.header}>
          <h1 className={styles.name}>Matt Ruiz</h1>
          <p className={styles.subline}>Software engineer, Philadelphia</p>
        </header>

        <section className={styles.section}>
          <h2 className={styles.sectionLabel}>Experience</h2>
          <div className={styles.experienceList}>
            {experience.map((entry) => (
              <article key={`${entry.role}-${entry.organization}`} className={styles.experienceEntry}>
                <div className={styles.entryHeader}>
                  <h3 className={styles.entryTitle}>
                    {entry.role} | {entry.organization}
                  </h3>
                  <p className={styles.entryPeriod}>{entry.period}</p>
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
          <h2 className={styles.sectionLabel}>Education</h2>
          <div className={styles.educationBody}>
            <p className={styles.school}>West Chester University of Pennsylvania</p>
            <p>B.S. Computer Science, 2018</p>
          </div>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionLabel}>Technical Focus</h2>
          <div className={styles.focusGrid}>
            {technicalFocus.map((group) => (
              <p key={group.label} className={styles.focusItem}>
                <span className={styles.focusLabel}>{group.label}:</span> {group.value}
              </p>
            ))}
          </div>
        </section>
      </article>
    </main>
  );
}

const styles = {
  page: `
    min-h-screen w-full bg-slate-100 px-4 py-5 font-sans text-slate-800
  `,
  paper: `
    mx-auto flex w-full max-w-[760px] flex-col rounded-sm border border-slate-200 bg-white px-9 py-8 shadow-sm
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
    mt-6
  `,
  sectionLabel: `
    text-[11px] font-bold uppercase tracking-[0.22em] text-slate-500
  `,
  experienceList: `
    mt-3 space-y-5
  `,
  experienceEntry: `
    text-sm leading-relaxed text-slate-700
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
    mt-2 space-y-1.5
  `,
  bulletItem: `
    flex gap-2
  `,
  bulletDot: `
    mt-2 h-1 w-1 shrink-0 rounded-full bg-slate-400
  `,
  educationBody: `
    mt-3 text-sm leading-relaxed text-slate-700
  `,
  school: `
    font-semibold text-slate-950
  `,
  focusGrid: `
    mt-3 grid gap-2 text-sm leading-relaxed text-slate-700
    sm:grid-cols-2
  `,
  focusItem: `
    min-w-0
  `,
  focusLabel: `
    font-semibold text-slate-950
  `,
} as const;