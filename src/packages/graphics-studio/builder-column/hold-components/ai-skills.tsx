"use client";

import React from "react";

export default function GeneratedSkillsPreview() {
  const experience = [
    {
      role: "Staff Full Stack / Mobile Engineer",
      organization: "Acme Labs",
      period: "Recent",
      bullets: [
        "Built and shipped 12+ React Native and Expo production apps across marketplaces, social apps, training tools, and field-service workflows, using TypeScript, Redux, React Navigation, Expo Router, Firebase/Supabase real-time data, push, Stripe, MapBox, and Twilio video.",
        "Applied CI/testing patterns and managed deployment habits across Expo, Next.js on Vercel, AWS, GCP, Firebase Cloud Functions, and Node.js services, creating a practical foundation for repeatable iOS, Android, and web releases.",
        "Partnered directly with product and client stakeholders to turn ambiguous marketplace, scheduling, payments, chat, groups, notifications, and admin needs into usable mobile-first experiences for real operators and end users.",
        "Integrated OpenAI and Anthropic Claude APIs into Node.js, React Native, and Next.js systems for chatbots, prompt engineering, embeddings, function calling, RAG workflows, and real-time inference where automation reduced repetitive work.",
      ],
    },
    {
      role: "Salesforce BA / Trainer / Developer",
      organization: "Revature",
      period: "Earlier",
      bullets: [
        "Coordinated with large development groups while translating business needs into Salesforce delivery across core platform features, custom objects, Apex, flows, automation, and process improvements.",
        "Delivered Salesforce training workshops and curriculum, building communication and coaching habits that carry into technical mentorship and cross-functional engineering leadership.",
      ],
    },
  ];

  return (
    <main className={styles.canvas}>
      <article className={styles.paper}>
        <header className={styles.header}>
          <h1 className={styles.name}>Matt Ruiz</h1>
          <p className={styles.headerSubline}>Staff Full Stack Engineer</p>
        </header>

        <section className={styles.section}>
          <h2 className={styles.sectionLabel}>Executive Summary</h2>
          <p className={styles.summary}>
            I build React Native and Expo products that connect mobile UX, TypeScript/Node.js backends, real-time data, payments, maps, video, and pragmatic release workflows. My work spans 12+ production apps and full-stack Next.js dashboards, with CI/testing patterns across AWS, GCP, Vercel, Firebase, and Supabase. I mentor through hands-on delivery, clear communication, and operations-aware decisions shaped by field work.
          </p>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionLabel}>Experience</h2>
          <div className={styles.experienceList}>
            {experience.map((entry) => (
              <article key={`${entry.role}-${entry.organization}`} className={styles.experienceEntry}>
                <div className={styles.entryHeader}>
                  <h3 className={styles.entryTitle}>
                    {entry.role} | {entry.organization}
                  </h3>
                  <p className={styles.period}>{entry.period}</p>
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
          <div className={styles.educationBlock}>
            <p className={styles.educationSchool}>West Chester University of Pennsylvania</p>
            <p>B.S. Computer Science, 2018</p>
          </div>
        </section>
      </article>
    </main>
  );
}

const styles = {
  canvas: `
    w-full bg-slate-100 px-3 py-4 font-sans text-slate-800
  `,
  paper: `
    mx-auto w-[816px] max-w-full rounded-sm border border-slate-200 bg-white px-9 py-8 shadow-sm
  `,
  header: `
    pb-4
  `,
  name: `
    text-3xl font-semibold tracking-tight text-slate-950
  `,
  headerSubline: `
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
  experienceEntry: `
    space-y-1.5
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
    space-y-1 text-sm leading-relaxed text-slate-700
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
  educationSchool: `
    font-semibold text-slate-950
  `,
} as const;