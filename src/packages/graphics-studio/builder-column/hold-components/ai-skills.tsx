"use client";

import React from "react";

export default function GeneratedSkillsPreview() {
  const experience = [
    {
      role: "Software Engineer",
      organization: "TroutHouseTech",
      period: "Recent",
      bullets: [
        "Help teams reduce repetitive work with AI automation and workflow tooling, using a hands-on engineering approach across Node.js backends, React Native mobile apps, and Next.js dashboards.",
        "Integrated OpenAI and Anthropic Claude APIs for chatbots, prompt engineering, fine-tuning, embeddings, function calling, RAG systems, and real-time inference in prototypes and production applications.",
      ],
    },
    {
      role: "Mobile and Full-Stack Product Engineer",
      organization: "Product and client delivery",
      period: "Since 2022",
      bullets: [
        "Built and shipped 12+ production React Native and Expo apps with TypeScript, Redux, React Navigation, Expo Router, Firebase, Supabase, real-time subscriptions, authentication, and Node.js services.",
        "Delivered products including TeenPros, BoxBets, Swizzy Golf, Women Heart Sister Match, marketplace workflows, and field-service tools with Stripe payments, MapBox navigation, Twilio video, chat, groups, notifications, leads, quotes, and scheduling.",
      ],
    },
    {
      role: "Salesforce BA / Trainer / Developer",
      organization: "Revature",
      period: "Earlier",
      bullets: [
        "Coordinated with large development groups, delivered Salesforce training workshops and curriculum, and produced measurable process improvements.",
        "Applied certified Salesforce Admin and Apex Developer experience across core platform features, custom objects, Apex, flows, automation, and business analysis work.",
      ],
    },
    {
      role: "Field Operations Apprentice",
      organization: "Family contracting business",
      period: "Earlier",
      bullets: [
        "Supported electrical and field operations work before college, building the practical, operations-aware approach that now shapes software delivery and workflow automation decisions.",
      ],
    },
  ];

  const technicalFocus = [
    {
      label: "AI and automation",
      value:
        "OpenAI, Anthropic Claude, chatbots, prompt engineering, fine-tuning, embeddings, function calling, RAG systems, real-time inference, workflow automation.",
    },
    {
      label: "Mobile and web",
      value:
        "React Native, Expo, Expo Router, React Navigation, Redux, Next.js, React, TypeScript, JavaScript, dashboards, mobile-first feature delivery.",
    },
    {
      label: "Backends and data",
      value:
        "Node.js, Firebase Realtime Database, Firestore, Firebase Auth, Cloud Functions, Supabase PostgreSQL, real-time subscriptions, authentication.",
    },
    {
      label: "Integrations and delivery",
      value:
        "Twilio video, MapBox, Stripe, Salesforce Admin/Apex/flows, CI/testing patterns, Jest, ESLint, Vercel, AWS, GCP, managed hosting, CI/CD.",
    },
  ];

  return (
    <main className={styles.canvas}>
      <article className={styles.paper} aria-label="Resume for Matt Ruiz">
        <header className={styles.header}>
          <h1 className={styles.name}>Matt Ruiz</h1>
          <p className={styles.subline}>Software engineer | Philadelphia</p>
        </header>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Experience</h2>
          <div className={styles.experienceList}>
            {experience.map((entry) => (
              <article key={`${entry.role}-${entry.organization}`} className={styles.experienceEntry}>
                <div className={styles.entryHeader}>
                  <div>
                    <h3 className={styles.entryTitle}>{entry.role}</h3>
                    <p className={styles.entryOrganization}>{entry.organization}</p>
                  </div>
                  <p className={styles.entryPeriod}>{entry.period}</p>
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

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Education</h2>
          <div className={styles.educationBlock}>
            <p className={styles.educationSchool}>West Chester University of Pennsylvania</p>
            <p className={styles.educationDetail}>B.S. Computer Science, 2018</p>
          </div>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Technical Focus</h2>
          <div className={styles.focusList}>
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
  canvas: `
    min-h-screen w-full bg-slate-100 px-4 py-5 font-sans text-slate-800
    sm:px-6
  `,
  paper: `
    mx-auto w-full max-w-[816px] rounded-sm border border-slate-200 bg-white px-8 py-8 shadow-sm ring-1 ring-slate-200/60
    sm:px-10 sm:py-9
  `,
  header: `
    mb-6
  `,
  name: `
    text-3xl font-semibold tracking-tight text-slate-950
    sm:text-4xl
  `,
  subline: `
    mt-1 text-sm font-medium text-slate-600
  `,
  section: `
    mt-6 first:mt-0
  `,
  sectionTitle: `
    border-b border-slate-200 pb-1.5 text-[11px] font-bold uppercase tracking-[0.22em] text-slate-500
  `,
  experienceList: `
    mt-4 space-y-4
  `,
  experienceEntry: `
    break-inside-avoid
  `,
  entryHeader: `
    flex flex-col gap-1
    sm:flex-row sm:items-baseline sm:justify-between sm:gap-4
  `,
  entryTitle: `
    text-sm font-semibold leading-snug text-slate-950
  `,
  entryOrganization: `
    text-sm leading-snug text-slate-600
  `,
  entryPeriod: `
    shrink-0 text-xs font-semibold uppercase tracking-[0.16em] text-slate-500
  `,
  bulletList: `
    mt-2 space-y-1.5 text-sm leading-relaxed text-slate-700
  `,
  bulletItem: `
    flex gap-2.5
  `,
  bulletMarker: `
    mt-2 h-1 w-1 shrink-0 rounded-full bg-slate-400
  `,
  educationBlock: `
    mt-3 text-sm leading-relaxed text-slate-700
  `,
  educationSchool: `
    font-semibold text-slate-950
  `,
  educationDetail: `
    text-slate-700
  `,
  focusList: `
    mt-3 grid gap-2 text-sm leading-relaxed text-slate-700
    sm:grid-cols-2 sm:gap-x-7 sm:gap-y-2.5
  `,
  focusItem: `
    min-w-0
  `,
  focusLabel: `
    font-semibold text-slate-950
  `,
} as const;