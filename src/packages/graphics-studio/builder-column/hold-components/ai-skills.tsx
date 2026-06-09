"use client";

import React from "react";

export default function GeneratedSkillsPreview() {
  const acmeBullets = [
    "Built LLM-powered chatbots and workflow assistants with OpenAI and Anthropic Claude APIs, using prompt engineering, embeddings, function calling, fine-tuning, and RAG patterns to reduce repetitive operational work.",
    "Shipped real-time inference paths across Node.js services, Next.js dashboards, and React Native apps, pairing TypeScript delivery with AWS, GCP, Vercel, and CI/testing patterns for production use.",
    "Delivered product and client builds across TeenPros, BoxBets, Swizzy Golf, Women Heart Sister Match, marketplace, and field-service workflows where scheduling, notifications, payments, admin tooling, and handoffs had to work end-to-end.",
    "Applied usage-aware product thinking with Firebase, Supabase PostgreSQL, Redux, Stripe, MapBox, and Twilio real-time communication to capture feedback, improve flows, and reduce manual coordination.",
  ];

  const revatureBullets = [
    "Coordinated with large development groups as a Salesforce BA, trainer, and developer, turning business process needs into workshops, curriculum, and measurable process improvements.",
    "Worked across Salesforce Admin and Apex development patterns including custom objects, flows, automation, and platform training for delivery teams.",
  ];

  return (
    <React.Fragment>
      <main className={styles.canvas}>
        <article className={styles.paper}>
          <header className={styles.header}>
            <h1 className={styles.name}>Matt Ruiz</h1>
            <p className={styles.subline}>AI workflow systems engineer | Philadelphia</p>
          </header>

          <section className={styles.section}>
            <h2 className={styles.sectionLabel}>Executive Summary</h2>
            <p className={styles.summary}>
              I build LLM-backed workflow systems that turn repetitive operational work into assisted, measurable product
              experiences. My recent work combines OpenAI and Anthropic APIs, function calling, RAG patterns,
              TypeScript/Node.js backends, and real-time React Native/Next.js interfaces. I bring a field-operations
              mindset to agent design: diagnose the workflow, ship production paths, capture feedback, and keep
              improving.
            </p>
          </section>

          <section className={styles.section}>
            <h2 className={styles.sectionLabel}>Experience</h2>
            <div className={styles.experienceList}>
              <article>
                <div className={styles.roleRow}>
                  <h3 className={styles.role}>AI Product Engineer | Acme Labs</h3>
                  <p className={styles.period}>Recent</p>
                </div>
                <ul className={styles.bulletList}>
                  {acmeBullets.map((bullet) => (
                    <li key={bullet} className={styles.bulletItem}>
                      <span className={styles.bulletDot} />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </article>

              <article>
                <div className={styles.roleRow}>
                  <h3 className={styles.role}>Salesforce BA / Trainer / Developer | Revature</h3>
                  <p className={styles.period}>Earlier</p>
                </div>
                <ul className={styles.bulletList}>
                  {revatureBullets.map((bullet) => (
                    <li key={bullet} className={styles.bulletItem}>
                      <span className={styles.bulletDot} />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </article>
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
    </React.Fragment>
  );
}

const styles = {
  canvas: `
    w-full bg-slate-100 px-3 py-4 font-sans text-slate-800
  `,
  paper: `
    mx-auto w-full max-w-[816px] rounded-sm border border-slate-200 bg-white px-10 py-8 shadow-sm ring-1 ring-slate-100
  `,
  header: `
    border-b border-slate-200 pb-4
  `,
  name: `
    text-3xl font-semibold tracking-tight text-slate-950
  `,
  subline: `
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
  roleRow: `
    flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1
  `,
  role: `
    text-sm font-semibold text-slate-950
  `,
  period: `
    text-xs font-semibold uppercase tracking-[0.14em] text-slate-500
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
  educationBlock: `
    mt-2 text-sm leading-relaxed text-slate-700
  `,
  school: `
    font-semibold text-slate-950
  `,
} as const;