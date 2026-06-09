"use client";

import React from "react";

export default function GeneratedSkillsPreview() {
  const experience = [
    {
      role: "Frontend Software Engineer",
      organization: "Acme Labs",
      period: "Recent",
      bullets: [
        "Designed and developed React, Next.js, and TypeScript interfaces for dashboards, marketplaces, social apps, and field-service workflows, translating product needs into usable components and release-ready screens.",
        "Maintained and improved shared frontend patterns across React Native and Expo apps with Redux, React Navigation, Firebase/Supabase real-time data, authentication, notifications, and CI/testing workflows.",
        "Integrated product-critical services including Stripe payments, MapBox location flows, Twilio Video, Firebase Cloud Functions, and Node.js APIs while keeping UI behavior grounded in web and mobile standards.",
        "Extended product capabilities with OpenAI and Anthropic Claude chatbots, embeddings, function calling, and RAG-style workflows, and published reusable npm modules when patterns were useful beyond one build.",
      ],
    },
    {
      role: "Salesforce BA / Trainer / Developer",
      organization: "Revature",
      period: "Earlier",
      bullets: [
        "Coordinated with large development groups on Salesforce delivery, connecting business requirements with platform configuration, Apex-oriented development support, and process improvements.",
        "Delivered Salesforce training workshops and curriculum across admin, custom objects, flows, automation, and core platform practices.",
      ],
    },
  ];

  return (
    <React.Fragment>
      <main className={styles.canvas}>
        <article className={styles.paper}>
          <header className={styles.header}>
            <h1 className={styles.name}>Matt Ruiz</h1>
            <p className={styles.headerSubline}>Senior Frontend Software Engineer</p>
          </header>

          <section className={styles.section}>
            <h2 className={styles.sectionLabel}>Executive Summary</h2>
            <p className={styles.summary}>
              I design and ship production frontend features with React, Next.js,
              React Native, TypeScript, and Redux, with a focus on usable interfaces
              and maintainable codebases. My work spans dashboards, marketplaces,
              social apps, field-service workflows, video, maps, payments, and AI
              automation, usually partnering closely with product needs and
              operational constraints.
            </p>
          </section>

          <section className={styles.section}>
            <h2 className={styles.sectionLabel}>Experience</h2>
            <div className={styles.experienceList}>
              {experience.map((entry) => (
                <section
                  key={`${entry.role}-${entry.organization}`}
                  className={styles.experienceEntry}
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
                        <span className={styles.bulletMarker} />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </section>
              ))}
            </div>
          </section>

          <section className={styles.section}>
            <h2 className={styles.sectionLabel}>Education</h2>
            <div className={styles.education}>
              <p className={styles.school}>West Chester University of Pennsylvania</p>
              <p>B.S. Computer Science, 2018</p>
              <p>
                Earlier electrical and field operations work in a family contracting
                business shaped a practical, outcomes-aware approach to software.
              </p>
            </div>
          </section>
        </article>
      </main>
    </React.Fragment>
  );
}

const styles = {
  canvas: `
    w-full bg-slate-100 px-3 py-4 font-sans text-slate-800
  `,
  paper: `
    mx-auto w-full max-w-[816px] rounded-sm border border-slate-200 bg-white px-9 py-8 shadow-sm
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
    border-b border-slate-200 pb-1 text-[11px] font-bold uppercase tracking-[0.18em] text-slate-500
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
  bulletMarker: `
    mt-2 h-1 w-1 shrink-0 rounded-full bg-slate-400
  `,
  education: `
    mt-2 space-y-1 text-sm leading-relaxed text-slate-700
  `,
  school: `
    font-semibold text-slate-950
  `,
} as const;