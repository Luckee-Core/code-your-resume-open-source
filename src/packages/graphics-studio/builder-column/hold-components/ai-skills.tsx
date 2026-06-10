"use client";

import React from "react";

export default function GeneratedSkillsPreview() {
  const experience = [
    {
      role: "Senior Software Engineer",
      organization: "Acme Labs",
      period: "Recent",
      bullets: [
        "Designed and shipped product systems across local services marketplaces, social betting, virtual golf training, social communities, field-service workflows, and payment-enabled marketplace patterns, translating ambiguous requirements into TypeScript, React Native, Next.js, Node.js, Firebase, and Stripe implementations.",
        "Contributed technical strategy for AI automation and workflow tooling that reduces repetitive work, integrating OpenAI and Anthropic APIs, embeddings, function calling, and RAG patterns into Node.js services, Next.js dashboards, and React Native applications.",
        "Built real-time and integration-heavy features with Twilio video, MapBox, Firebase, Supabase, push notifications, authentication, and payments while collaborating across product, operations, and stakeholder needs.",
        "Kept delivery disciplined through sprint cycles, reusable npm modules, Redux and React Navigation patterns, Jest, ESLint, CI pipelines, and cloud deployments on Vercel, AWS, and GCP.",
      ],
    },
    {
      role: "Salesforce BA / Trainer / Developer",
      organization: "Revature",
      period: "Earlier",
      bullets: [
        "Coordinated with large development groups as a Salesforce BA, trainer, and developer, helping align requirements, delivery process, and measurable process improvements.",
        "Created and delivered Salesforce workshops and curriculum covering admin concepts, Apex, custom objects, flows, and automation, supporting engineers and business stakeholders.",
      ],
    },
  ];

  return (
    <main className={styles.canvas}>
      <article className={styles.paper}>
        <header className={styles.header}>
          <h1 className={styles.name}>Matt Ruiz</h1>
          <p className={styles.roleLine}>Senior Software Engineer</p>
        </header>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Executive Summary</h2>
          <p className={styles.summary}>
            I design and ship software systems with a practical, operations-aware approach, moving between architecture, implementation, reviews, and production troubleshooting. My recent work spans TypeScript, React Native, Next.js, Node.js, Firebase, Stripe, MapBox, Twilio video, and AI automation, with mentorship and training experience from large Salesforce delivery groups.
          </p>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Experience</h2>
          <div className={styles.experienceList}>
            {experience.map((entry) => (
              <article key={`${entry.role}-${entry.organization}`} className={styles.entry}>
                <div className={styles.entryHeader}>
                  <h3 className={styles.entryTitle}>
                    {entry.role} | {entry.organization}
                  </h3>
                  <p className={styles.period}>{entry.period}</p>
                </div>
                <ul className={styles.bullets}>
                  {entry.bullets.map((bullet) => (
                    <li key={bullet} className={styles.bullet}>
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
          <h2 className={styles.sectionTitle}>Education</h2>
          <div className={styles.education}>
            <p className={styles.school}>West Chester University of Pennsylvania</p>
            <p>B.S. Computer Science, 2018</p>
            <p>
              Before college, weekend and summer electrical and field operations work
              in a family contracting business shaped a practical, outcome-focused
              approach to software.
            </p>
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
    mx-auto w-full max-w-[816px] rounded-sm border border-slate-200 bg-white px-9 py-7 shadow-sm
  `,
  header: `
    border-b border-slate-200 pb-4
  `,
  name: `
    text-3xl font-semibold tracking-tight text-slate-950
  `,
  roleLine: `
    mt-1 text-sm font-medium text-slate-600
  `,
  section: `
    pt-4
  `,
  sectionTitle: `
    border-b border-slate-200 pb-1 text-[11px] font-bold uppercase tracking-[0.18em] text-slate-500
  `,
  summary: `
    mt-2 text-sm leading-relaxed text-slate-700
  `,
  experienceList: `
    mt-3 space-y-4
  `,
  entry: `
    text-sm leading-relaxed text-slate-700
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
  bullets: `
    mt-1.5 space-y-1.5
  `,
  bullet: `
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