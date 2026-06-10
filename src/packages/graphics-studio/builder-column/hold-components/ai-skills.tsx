"use client";

import React from "react";

export default function GeneratedSkillsPreview() {
  const experience = [
    {
      role: "Frontend Product Engineer",
      organization: "Acme Labs",
      period: "Recent",
      bullets: [
        "Integrated Claude and OpenAI APIs into customer-facing interfaces and workflow tools, using prompt engineering, embeddings, function calling, RAG patterns, and real-time inference while keeping React/TypeScript architecture maintainable.",
        "Owned React/TypeScript and React Native feature delivery across Next.js dashboards and 12+ production apps, choosing Redux/state patterns, navigation, Firebase/Supabase real-time data, Node.js services, and CI/testing workflows for stable releases.",
        "Shipped marketplace, social, field-service, and training products including TeenPros, BoxBets, Swizzy Golf, Women Heart Sister Match, and payment-enabled listing/rental workflows with Stripe, MapBox, Twilio video, push notifications, auth, and backend automation.",
        "Brought an operations-aware delivery style to product planning: diagnose repetitive work, define practical release slices, keep customer workflows usable, and follow production bugs and performance issues back into the frontend roadmap.",
      ],
    },
    {
      role: "Salesforce BA / Trainer / Developer",
      organization: "Revature",
      period: "Earlier",
      bullets: [
        "Coordinated with large development groups while delivering Salesforce training workshops and curriculum across admin, Apex, custom objects, flows, automation, and business analysis concepts.",
        "Translated team feedback into measurable process improvements and clear delivery artifacts, strengthening collaboration habits that carry into code reviews, planning, and release communication.",
      ],
    },
  ];

  return (
    <React.Fragment>
      <main className={styles.canvas}>
        <article className={styles.paper}>
          <header className={styles.header}>
            <h1 className={styles.name}>Matt Ruiz</h1>
            <p className={styles.headerSubline}>Staff Frontend Software Engineer</p>
          </header>

          <section className={styles.section}>
            <h2 className={styles.sectionLabel}>Executive Summary</h2>
            <p className={styles.summaryText}>
              I build AI-assisted React and TypeScript frontends with clear
              ownership of state, component patterns, release quality, and
              production health. I embed Claude and OpenAI into customer
              workflows and engineering loops without handing off architectural
              judgment. My work spans Next.js dashboards, React Native apps,
              CI/testing, Firebase/Node backends, and operations-aware delivery.
            </p>
          </section>

          <section className={styles.section}>
            <h2 className={styles.sectionLabel}>Experience</h2>
            <div className={styles.experienceList}>
              {experience.map((entry) => (
                <article
                  className={styles.experienceEntry}
                  key={`${entry.role}-${entry.organization}`}
                >
                  <div className={styles.entryHeader}>
                    <h3 className={styles.entryTitle}>
                      {entry.role} | {entry.organization}
                    </h3>
                    <p className={styles.entryPeriod}>{entry.period}</p>
                  </div>
                  <ul className={styles.bulletList}>
                    {entry.bullets.map((bullet) => (
                      <li className={styles.bulletItem} key={bullet}>
                        <span className={styles.bulletMarker} />
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
              <p className={styles.educationSchool}>
                West Chester University of Pennsylvania
              </p>
              <p>B.S. Computer Science, 2018</p>
              <p>
                Early electrical and field operations work in a family
                contracting business shaped a practical, operations-aware
                approach to software delivery.
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
    mx-auto w-full max-w-[816px] rounded-sm border border-slate-200 bg-white px-10 py-8 shadow-sm
  `,
  header: `
    border-b border-slate-200 pb-4
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
    text-[11px] font-bold uppercase tracking-[0.2em] text-slate-500
  `,
  summaryText: `
    mt-2 text-sm leading-relaxed text-slate-700
  `,
  experienceList: `
    mt-3 space-y-4
  `,
  experienceEntry: `
    text-sm leading-relaxed text-slate-700
  `,
  entryHeader: `
    flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1
  `,
  entryTitle: `
    font-semibold text-slate-950
  `,
  entryPeriod: `
    text-xs font-medium uppercase tracking-[0.14em] text-slate-500
  `,
  bulletList: `
    mt-1.5 space-y-1
  `,
  bulletItem: `
    flex gap-2
  `,
  bulletMarker: `
    mt-2 h-1 w-1 shrink-0 rounded-full bg-slate-400
  `,
  educationBody: `
    mt-2 space-y-1 text-sm leading-relaxed text-slate-700
  `,
  educationSchool: `
    font-semibold text-slate-950
  `,
} as const;