"use client";

import React from "react";

export default function GeneratedSkillsPreview() {
  const experience = [
    {
      role: "Software Engineer",
      organization: "Acme Labs",
      period: "Recent",
      bullets: [
        "Built AI automation and workflow tooling with Anthropic Claude and OpenAI APIs, including chatbots, prompt engineering, embeddings, function calling, RAG-style retrieval, and real-time inference across Node.js, Next.js, and React Native systems.",
        "Shipped production applications and dashboards on GCP, AWS, and Vercel with TypeScript, Node.js services, Firebase/Supabase data backends, CI/testing patterns, and practical deployment discipline.",
        "Integrated operational surfaces for marketplace, field-service, social, golf-training, and payment-enabled products, including Stripe, MapBox, Twilio video, push notifications, authentication, and backend automation.",
        "Approached product delivery with field-operations judgment from early electrical contracting work: diagnose repetitive work, document decisions, keep systems usable, and build for measurable operational outcomes.",
      ],
    },
    {
      role: "Salesforce BA / Trainer / Developer",
      organization: "Revature",
      period: "Earlier",
      bullets: [
        "Coordinated with large development groups while delivering Salesforce training, curriculum, business analysis, and platform work across admin features, Apex, custom objects, flows, and automation.",
        "Produced measurable process improvements by translating operational needs into repeatable training material, implementation guidance, and clearer handoffs for engineering teams.",
      ],
    },
  ];

  return (
    <main className={styles.canvas}>
      <article className={styles.paper}>
        <header className={styles.header}>
          <h1 className={styles.name}>Matt Ruiz</h1>
          <p className={styles.roleLine}>Software Engineer | Philadelphia</p>
        </header>

        <section className={styles.section}>
          <h2 className={styles.sectionLabel}>Executive Summary</h2>
          <p className={styles.summary}>
            I build AI automation and workflow systems with Claude, OpenAI, TypeScript, Node.js, and production deployment discipline. My work connects LLM features to real operational products, data-backed dashboards, CI/testing patterns, and GCP/AWS/Vercel environments. I bring field-operations judgment to software: document decisions, monitor what matters, and ship usable systems.
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
                  <p className={styles.period}>{entry.period}</p>
                </div>
                <ul className={styles.bulletList}>
                  {entry.bullets.map((bullet) => (
                    <li className={styles.bulletItem} key={bullet}>
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
      </article>
    </main>
  );
}

const styles = {
  canvas: `
    w-full bg-slate-100 px-3 py-4 font-sans text-slate-800
  `,
  paper: `
    mx-auto w-full max-w-[816px] rounded-sm border border-slate-200 bg-white px-8 py-7 shadow-sm
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
    space-y-2
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
    space-y-1.5 text-sm leading-relaxed text-slate-700
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