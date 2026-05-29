"use client";

import React from "react";

export default function GeneratedSkillsPreview() {
  const experience = [
    {
      role: "Software Engineer",
      organization: "TroutHouseTech",
      period: "Recent",
      bullets: [
        "Built and shipped 12+ React Native, Expo, and Next.js products since 2022, including TeenPros, BoxBets, Swizzy Golf, Women Heart Sister Match, marketplace patterns, and field-service workflows spanning payments, chat, groups, notifications, maps, video, leads, quotes, and scheduling.",
        "Integrated OpenAI and Anthropic Claude APIs for chatbots, prompt engineering, fine-tuning, embeddings, function calling, and RAG systems across Node.js backends, React Native apps, and Next.js dashboards deployed on Vercel, GCP, and AWS.",
      ],
    },
    {
      role: "Salesforce BA / Trainer / Developer",
      organization: "Revature",
      period: "Earlier",
      bullets: [
        "Coordinated with large development groups, delivered Salesforce training workshops and curriculum, and contributed process improvements from a business-analysis and engineering seat.",
        "Applied certified Salesforce Admin and Apex Developer knowledge across core platform features, custom objects, flows, automation, and Apex; currently a few years removed from active Salesforce development while retaining strong fundamentals.",
      ],
    },
    {
      role: "Field Operations Apprentice",
      organization: "Family contracting business",
      period: "Earlier",
      bullets: [
        "Worked weekends and summers in electrical and field operations before college, building a practical bias for diagnosing constraints, respecting job-site realities, and shipping software that improves daily work.",
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
        "React Native, Expo, Expo Router, React Navigation, Redux, Next.js, React, TypeScript, JavaScript, Node.js, dashboards, full-stack services.",
    },
    {
      label: "Backends and data",
      value:
        "Firebase Realtime Database, Firestore, Firebase Auth, Cloud Functions, Supabase PostgreSQL, real-time subscriptions, authentication, automated testing.",
    },
    {
      label: "Integrations and platforms",
      value:
        "Twilio video, MapBox, Stripe, Salesforce Admin/Apex/flows, Vercel, AWS, GCP, managed hosting, edge functions, CI/CD deployment.",
    },
  ];

  return (
    <main className={styles.canvas}>
      <article className={styles.paper}>
        <header className={styles.header}>
          <h1 className={styles.name}>Matt Ruiz</h1>
          <p className={styles.subline}>Software engineer, Philadelphia</p>
        </header>

        <div className={styles.bodyGrid}>
          <section className={styles.experienceSection}>
            <h2 className={styles.sectionLabel}>Experience</h2>
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
                        <span className={styles.bulletDot} />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </section>

          <aside className={styles.sideColumn}>
            <section className={styles.section}>
              <h2 className={styles.sectionLabel}>Education</h2>
              <div className={styles.educationBody}>
                <p className={styles.school}>West Chester University of Pennsylvania</p>
                <p>B.S. Computer Science, 2018</p>
              </div>
            </section>

            <section className={styles.section}>
              <h2 className={styles.sectionLabel}>Technical Focus</h2>
              <div className={styles.focusList}>
                {technicalFocus.map((group) => (
                  <p key={group.label}>
                    <span className={styles.focusLabel}>{group.label}:</span>{" "}
                    {group.value}
                  </p>
                ))}
              </div>
            </section>
          </aside>
        </div>
      </article>
    </main>
  );
}

const styles = {
  canvas: `
    min-h-screen w-full bg-slate-100 px-4 py-6 font-sans text-sm leading-relaxed text-slate-700
  `,
  paper: `
    mx-auto w-full max-w-[816px] rounded-sm border border-slate-200 bg-white px-8 py-7 shadow-sm ring-1 ring-slate-200/70
    sm:px-10
    md:px-12
  `,
  header: `
    pb-4
  `,
  name: `
    text-3xl font-semibold tracking-tight text-slate-950
  `,
  subline: `
    mt-1 text-sm font-medium text-slate-600
  `,
  bodyGrid: `
    grid gap-6
    md:grid-cols-[1.55fr_0.9fr]
  `,
  experienceSection: `
    min-w-0
  `,
  section: `
    min-w-0
  `,
  sectionLabel: `
    border-b border-slate-200 pb-1 text-[11px] font-bold uppercase tracking-[0.2em] text-slate-500
  `,
  experienceList: `
    mt-3 space-y-4
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
    text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-500
  `,
  bulletList: `
    mt-1.5 space-y-1.5 text-sm leading-relaxed text-slate-700
  `,
  bulletItem: `
    flex gap-2
  `,
  bulletDot: `
    mt-2 h-1 w-1 shrink-0 rounded-full bg-slate-400
  `,
  sideColumn: `
    space-y-5
  `,
  educationBody: `
    mt-3 text-sm leading-relaxed text-slate-700
  `,
  school: `
    font-semibold text-slate-950
  `,
  focusList: `
    mt-3 space-y-3 text-sm leading-relaxed text-slate-700
  `,
  focusLabel: `
    font-semibold text-slate-950
  `,
} as const;
