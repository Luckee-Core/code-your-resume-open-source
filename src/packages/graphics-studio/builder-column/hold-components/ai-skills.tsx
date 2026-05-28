"use client";

import React from "react";

export default function GeneratedSkillsPreview() {
  const experience = [
    {
      role: "AI Automation & Product Engineer",
      organization: "TroutHouseTech",
      period: "Recent",
      bullets: [
        "Built and shipped 12+ production React Native, Expo, and Next.js products since 2022 across marketplace, social, virtual training, payment-enabled, and field-service workflows, including TeenPros, BoxBets, Swizzy Golf, Women Heart Sister Match, painter/DIY marketplace patterns, and Amplinks-style operations tools.",
        "Integrated OpenAI and Anthropic Claude APIs for chatbots, prompt engineering, embeddings, function calling, fine-tuning, and RAG systems, including real-time inference across Node.js backends, React Native apps, and Next.js dashboards.",
      ],
    },
    {
      role: "Salesforce BA / Trainer / Developer",
      organization: "Revature",
      period: "Earlier",
      bullets: [
        "Coordinated with large development groups while delivering Salesforce training workshops and curriculum for admin, Apex, custom objects, flows, automation, and business analysis practices.",
        "Produced measurable process improvements by pairing platform knowledge with practical team enablement; currently a few years removed from active Salesforce development while retaining strong foundational knowledge.",
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
        "Twilio Video, MapBox, Stripe, Salesforce Admin/Apex/flows, Vercel, AWS, GCP, CI/CD, Jest, ESLint.",
    },
  ];

  return (
    <React.Fragment>
      <main className={styles.page}>
        <article className={styles.paper}>
          <header className={styles.header}>
            <h1 className={styles.name}>Matt Ruiz</h1>
            <p className={styles.subline}>Software engineer | Philadelphia</p>
          </header>

          <div className={styles.contentGrid}>
            <section className={styles.experienceSection}>
              <h2 className={styles.sectionLabel}>Experience</h2>
              <div className={styles.experienceList}>
                {experience.map((entry) => (
                  <article
                    key={`${entry.role}-${entry.organization}`}
                    className={styles.experienceItem}
                  >
                    <div className={styles.entryHeader}>
                      <div>
                        <h3 className={styles.entryTitle}>{entry.role}</h3>
                        <p className={styles.entryOrganization}>
                          {entry.organization}
                        </p>
                      </div>
                      <p className={styles.entryPeriod}>{entry.period}</p>
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

            <aside className={styles.sideColumn}>
              <section>
                <h2 className={styles.sectionLabel}>Education</h2>
                <div className={styles.educationBody}>
                  <p className={styles.educationSchool}>
                    West Chester University of Pennsylvania
                  </p>
                  <p>B.S. Computer Science, 2018</p>
                </div>
              </section>

              <section>
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
    </React.Fragment>
  );
}

const styles = {
  page: `
    min-h-screen w-full bg-slate-100 px-3 py-4 font-sans text-slate-800
    sm:px-5 sm:py-6
  `,
  paper: `
    mx-auto w-full max-w-[816px] rounded-sm border border-slate-200 bg-white px-7 py-7 shadow-sm ring-1 ring-slate-100
    sm:px-10 sm:py-9
  `,
  header: `
    pb-5
  `,
  name: `
    text-3xl font-semibold tracking-tight text-slate-950
    sm:text-4xl
  `,
  subline: `
    mt-1 text-sm font-medium text-slate-600
  `,
  contentGrid: `
    grid gap-6
    md:grid-cols-[1.55fr_0.8fr] md:gap-7
  `,
  experienceSection: `
    min-w-0
  `,
  sectionLabel: `
    border-b border-slate-200 pb-1.5 text-[11px] font-bold uppercase tracking-[0.2em] text-slate-500
  `,
  experienceList: `
    mt-3 space-y-5
  `,
  experienceItem: `
    break-inside-avoid
  `,
  entryHeader: `
    flex flex-wrap items-start justify-between gap-x-4 gap-y-1
  `,
  entryTitle: `
    text-sm font-semibold leading-snug text-slate-950
  `,
  entryOrganization: `
    mt-0.5 text-xs font-medium text-slate-600
  `,
  entryPeriod: `
    text-xs font-semibold uppercase tracking-[0.14em] text-slate-500
  `,
  bulletList: `
    mt-2 space-y-1.5 text-sm leading-relaxed text-slate-700
  `,
  bulletItem: `
    flex gap-2
  `,
  bulletMarker: `
    mt-2 h-1 w-1 shrink-0 rounded-full bg-slate-400
  `,
  sideColumn: `
    space-y-6
  `,
  educationBody: `
    mt-3 text-sm leading-relaxed text-slate-700
  `,
  educationSchool: `
    font-semibold text-slate-950
  `,
  focusList: `
    mt-3 space-y-3 text-sm leading-relaxed text-slate-700
  `,
  focusLabel: `
    font-semibold text-slate-950
  `,
} as const;
