"use client";

import React from "react";

export default function GeneratedSkillsPreview() {
  const experience = [
    {
      role: "Product Engineer",
      organization: "TroutHouseTech",
      period: "Recent",
      bullets: [
        "Built and shipped 12+ React Native and Expo apps with TypeScript, Redux, React Navigation, Expo Router, Firebase, Supabase, and Node.js backends, focusing on fast cross-platform delivery across iOS, Android, and web surfaces.",
        "Delivered social and marketplace product flows including BoxBets content feeds and engagement, Women Heart Sister Match chat/groups/notifications, TeenPros requester/worker apps, and payment-enabled listings, rentals, scheduling, and service workflows.",
        "Integrated mobile product capabilities such as Stripe payments, MapBox mapping/navigation, Twilio video, push notifications, real-time Firebase/Firestore sync, Supabase subscriptions, and CI/testing pipelines to keep shipped apps reliable and responsive.",
        "Worked closely with clients and product stakeholders to turn ambiguous operational needs into polished flows, using hands-on debugging, instrumentation-minded problem solving, and reusable npm/shared tooling where it created practical value.",
      ],
    },
    {
      role: "Salesforce BA / Trainer / Developer",
      organization: "Revature",
      period: "Earlier",
      bullets: [
        "Coordinated with large development groups, delivered Salesforce training workshops and curriculum, and contributed measurable process improvements.",
        "Applied Salesforce Admin and Apex Developer knowledge across custom objects, flows, automation, business analysis, and stakeholder handoff for enterprise teams.",
      ],
    },
  ];

  return (
    <React.Fragment>
      <main className={styles.canvas}>
        <section className={styles.paper}>
          <header className={styles.header}>
            <h1 className={styles.name}>Matt Ruiz</h1>
            <p className={styles.headerSubline}>Product Engineer | Philadelphia</p>
          </header>

          <section className={styles.summarySection}>
            <h2 className={styles.sectionLabel}>Executive Summary</h2>
            <p className={styles.summaryText}>
              I build mobile-first product experiences with React Native, TypeScript, and
              full-stack backends, with a strong bias toward polished social and marketplace
              flows. My work spans shipped iOS/Android apps, real-time chat and feeds,
              payments, maps, video, notifications, and client-facing product iteration.
              I care about making complex workflows feel simple, responsive, and useful.
            </p>
          </section>

          <section className={styles.section}>
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

          <section className={styles.section}>
            <h2 className={styles.sectionLabel}>Education</h2>
            <div className={styles.educationBlock}>
              <p className={styles.school}>West Chester University of Pennsylvania</p>
              <p>B.S. Computer Science, 2018</p>
            </div>
          </section>
        </section>
      </main>
    </React.Fragment>
  );
}

const styles = {
  canvas: `
    w-full bg-slate-100 px-3 py-4 font-sans text-slate-800
  `,
  paper: `
    mx-auto w-full max-w-[816px] rounded-sm bg-white px-8 py-6 shadow-sm ring-1 ring-slate-200
  `,
  header: `
    space-y-1 border-b border-slate-200 pb-4
  `,
  name: `
    text-3xl font-semibold tracking-tight text-slate-950
  `,
  headerSubline: `
    text-xs font-medium uppercase tracking-[0.18em] text-slate-500
  `,
  summarySection: `
    pt-4
  `,
  section: `
    pt-5
  `,
  sectionLabel: `
    text-[11px] font-bold uppercase tracking-[0.2em] text-slate-500
  `,
  summaryText: `
    mt-2 text-sm leading-relaxed text-slate-700
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
    text-xs font-medium uppercase tracking-[0.14em] text-slate-500
  `,
  bulletList: `
    mt-1.5 space-y-1 text-sm leading-relaxed text-slate-700
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
  school: `
    font-semibold text-slate-950
  `,
} as const;