"use client";

import React from "react";

export default function GeneratedSkillsPreview() {
  const summary = [
    "Built and shipped mobile and web products across React Native, Expo, Next.js, TypeScript, Node.js, Firebase, Supabase, Twilio video, MapBox, Stripe, and real-time backends.",
    "Delivered OpenAI and Anthropic Claude integrations for chatbots, prompt engineering, embeddings, function calling, fine-tuning, RAG systems, and real-time inference.",
    "Led practical product delivery for marketplaces, social apps, video training, field-service workflows, payments, dashboards, and workflow automation.",
    "Optimized delivery with CI/testing patterns, Redux state management, Vercel, AWS, GCP, and an operations-aware approach shaped by early electrical field work.",
  ];

  const experience = [
    {
      role: "Founder and Hands-on Engineer",
      organization: "TroutHouseTech",
      period: "Recent",
      bullets: [
        "Help teams reduce repetitive work with AI automation and workflow tooling, diagnosing operational pain before building Node.js, React Native, and Next.js solutions.",
        "Integrated OpenAI and Anthropic Claude APIs into prototypes and production systems for chatbots, embeddings, function calling, RAG workflows, and real-time inference.",
      ],
    },
    {
      role: "Product Engineer",
      organization: "Independent product and client work",
      period: "Recent",
      bullets: [
        "Built and shipped 12+ React Native and Expo apps since 2022 with TypeScript, Redux, React Navigation, Expo Router, Firebase, Supabase, Stripe, MapBox, notifications, and real-time data sync.",
        "Delivered TeenPros, BoxBets, Swizzy Golf, Women Heart Sister Match, painter/DIY marketplace patterns, and Amplinks-style field-service workflows for leads, quotes, scheduling, rentals, and payments.",
      ],
    },
    {
      role: "Salesforce BA, Trainer, and Developer",
      organization: "Revature",
      period: "Earlier",
      bullets: [
        "Coordinated with large development groups, delivered Salesforce training workshops and curriculum, and contributed measurable process improvements.",
        "Applied certified Salesforce Admin and Apex Developer knowledge across core platform features, custom objects, flows, automation, and business analysis work.",
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
        "React Native, Expo, Expo Router, React Navigation, Redux, Next.js, React, TypeScript, JavaScript, Node.js.",
    },
    {
      label: "Backends and data",
      value:
        "Firebase Realtime Database, Firestore, Firebase Auth, Cloud Functions, Supabase PostgreSQL, real-time subscriptions, authentication.",
    },
    {
      label: "Integrations and platforms",
      value:
        "Twilio video, MapBox, Stripe, Salesforce Admin/Apex/flows, Vercel, AWS, GCP, CI/CD, automated testing.",
    },
  ];

  return (
    <main className={styles.page}>
      <article className={styles.paper} aria-label="Resume for Matt Ruiz">
        <header className={styles.header}>
          <div>
            <p className={styles.eyebrow}>Full-stack product engineer</p>
            <h1 className={styles.name}>Matt Ruiz</h1>
          </div>
          <p className={styles.location}>Founder, TroutHouseTech | Philadelphia</p>
        </header>

        <div className={styles.contentGrid}>
          <div className={styles.mainColumn}>
            <section>
              <h2 className={styles.sectionLabel}>Summary</h2>
              <ul className={styles.bulletList}>
                {summary.map((item) => (
                  <li key={item} className={styles.bulletItem}>
                    <span className={styles.bulletDot} />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </section>

            <section>
              <h2 className={styles.sectionLabel}>Experience</h2>
              <div className={styles.experienceList}>
                {experience.map((entry) => (
                  <article key={`${entry.role}-${entry.organization}`}>
                    <div className={styles.experienceHeader}>
                      <h3 className={styles.experienceTitle}>
                        {entry.role} | {entry.organization}
                      </h3>
                      <p className={styles.period}>{entry.period}</p>
                    </div>
                    <ul className={styles.compactBulletList}>
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
          </div>

          <aside className={styles.sideColumn}>
            <section>
              <h2 className={styles.sectionLabel}>Technical Focus</h2>
              <div className={styles.focusList}>
                {technicalFocus.map((group) => (
                  <p key={group.label}>
                    <span className={styles.focusLabel}>{group.label}:</span> {group.value}
                  </p>
                ))}
              </div>
            </section>

            <section>
              <h2 className={styles.sectionLabel}>Education</h2>
              <div className={styles.bodyCopy}>
                <p className={styles.school}>West Chester University of Pennsylvania</p>
                <p>B.S. Computer Science, 2018</p>
              </div>
            </section>

            <section>
              <h2 className={styles.sectionLabel}>Delivery Notes</h2>
              <ul className={styles.compactBulletList}>
                <li className={styles.bulletItem}>
                  <span className={styles.bulletDot} />
                  <span>
                    Practical, operations-aware engineering style shaped by weekends and summers in
                    a family contracting business.
                  </span>
                </li>
                <li className={styles.bulletItem}>
                  <span className={styles.bulletDot} />
                  <span>
                    Salesforce foundation remains strong across admin, Apex, custom objects, flows,
                    automation, and corporate training.
                  </span>
                </li>
              </ul>
            </section>
          </aside>
        </div>
      </article>
    </main>
  );
}

const styles = {
  page: `
    flex min-h-screen w-full items-center justify-center overflow-hidden bg-slate-100 px-4 py-4
    font-sans text-slate-800
  `,
  paper: `
    mx-auto w-full max-w-4xl rounded-sm border border-slate-200 bg-white px-7 py-5 shadow-sm
  `,
  header: `
    flex items-start justify-between gap-6 border-b border-slate-200 pb-3
  `,
  eyebrow: `
    text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-500
  `,
  name: `
    mt-1 text-2xl font-semibold tracking-tight text-slate-950
  `,
  location: `
    max-w-xs text-right text-xs font-medium leading-relaxed text-slate-500
  `,
  contentGrid: `
    grid grid-cols-[1.35fr_0.85fr] gap-6 pt-4
  `,
  mainColumn: `
    space-y-4
  `,
  sideColumn: `
    space-y-4
  `,
  sectionLabel: `
    text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500
  `,
  bulletList: `
    mt-2 space-y-1 text-[13px] leading-snug text-slate-700
  `,
  compactBulletList: `
    mt-1.5 space-y-1 text-[13px] leading-snug text-slate-700
  `,
  bulletItem: `
    flex gap-2
  `,
  bulletDot: `
    mt-1.5 h-1 w-1 shrink-0 rounded-full bg-slate-400
  `,
  experienceList: `
    mt-2 space-y-3
  `,
  experienceHeader: `
    flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1
  `,
  experienceTitle: `
    text-[13px] font-semibold text-slate-950
  `,
  period: `
    text-[10px] font-medium uppercase tracking-[0.14em] text-slate-500
  `,
  focusList: `
    mt-2 space-y-2 text-[13px] leading-snug text-slate-700
  `,
  focusLabel: `
    font-semibold text-slate-950
  `,
  bodyCopy: `
    mt-2 text-[13px] leading-snug text-slate-700
  `,
  school: `
    font-semibold text-slate-950
  `,
} as const;
