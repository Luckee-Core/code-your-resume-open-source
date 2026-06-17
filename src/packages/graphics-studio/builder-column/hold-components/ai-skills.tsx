"use client";

import React from "react";

export default function GeneratedSkillsPreview() {
  return (
    <main className={styles.page}>
      <article className={styles.paper}>
        <header className={styles.header}>
          <h1 className={styles.name}>Matt Ruiz</h1>
          <p className={styles.subline}>
            Senior Full Stack Engineer · React Native · Philadelphia
          </p>
        </header>

        <section className={styles.section}>
          <h2 className={styles.sectionLabel}>Executive Summary</h2>
          <p className={styles.summary}>
            I ship production React Native and Expo apps with TypeScript, backed by
            Node.js BFF services and real-time APIs on AWS and GCP. I&apos;ve built
            agentic AI features with OpenAI and Anthropic—chat, RAG, embeddings, and
            function calling—across mobile, Node.js, and Next.js. My recent work spans
            marketplaces, social apps, and field-service products with Redux, Firebase,
            Supabase, and CI-driven releases.
          </p>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionLabel}>Experience</h2>
          <div className={styles.experienceList}>
            <article className={styles.experienceEntry}>
              <div className={styles.experienceHeader}>
                <h3 className={styles.experienceTitle}>
                  Senior Full Stack Engineer | Acme Labs
                </h3>
                <p className={styles.experiencePeriod}>Recent</p>
              </div>
              <ul className={styles.bulletList}>
                <li className={styles.bulletItem}>
                  <span className={styles.bulletDot} />
                  <span>
                    Shipped 12+ production React Native and Expo apps with TypeScript,
                    Redux, React Navigation, and Expo Router—including TeenPros, BoxBets,
                    Swizzy Golf, and Women Heart Sister Match—with MapBox, Stripe, Twilio
                    video, push notifications, and mobile-first iOS/Android delivery.
                  </span>
                </li>
                <li className={styles.bulletItem}>
                  <span className={styles.bulletDot} />
                  <span>
                    Built Node.js BFF services and Cloud Functions in TypeScript with
                    Firebase, Supabase, and real-time backends; deployed full-stack
                    clients on AWS, GCP, and Vercel with CI/testing pipelines and
                    disciplined sprint delivery.
                  </span>
                </li>
                <li className={styles.bulletItem}>
                  <span className={styles.bulletDot} />
                  <span>
                    Integrated OpenAI and Anthropic Claude into agentic production
                    systems—chatbots, embeddings, function calling, and RAG workflows
                    with real-time inference across React Native, Node.js, and Next.js
                    dashboards.
                  </span>
                </li>
                <li className={styles.bulletItem}>
                  <span className={styles.bulletDot} />
                  <span>
                    Delivered marketplace, social, and Amplinks-style field-service
                    products end to end; collaborate cross-functionally and mentor
                    through clean, documented, operations-aware engineering practices.
                  </span>
                </li>
              </ul>
            </article>

            <article className={styles.experienceEntry}>
              <div className={styles.experienceHeader}>
                <h3 className={styles.experienceTitle}>
                  Salesforce BA / Trainer / Developer | Revature
                </h3>
                <p className={styles.experiencePeriod}>Earlier</p>
              </div>
              <ul className={styles.bulletList}>
                <li className={styles.bulletItem}>
                  <span className={styles.bulletDot} />
                  <span>
                    Coordinated with large development groups, delivered Salesforce
                    training workshops and curriculum, and drove measurable process
                    improvements across platform delivery.
                  </span>
                </li>
                <li className={styles.bulletItem}>
                  <span className={styles.bulletDot} />
                  <span>
                    Applied certified Salesforce Admin and Apex Developer skills across
                    custom objects, flows, automation, and business analysis work.
                  </span>
                </li>
              </ul>
            </article>
          </div>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionLabel}>Education</h2>
          <p className={styles.educationLine}>
            B.S. Computer Science, West Chester University of Pennsylvania — 2018
          </p>
        </section>
      </article>
    </main>
  );
}

const styles = {
  page: `
    w-full bg-slate-100 px-4 py-4 font-sans text-slate-800
  `,
  paper: `
    mx-auto w-full max-w-[816px] rounded-sm border border-slate-200 bg-white
    px-8 py-6 shadow-sm
  `,
  header: `
    border-b border-slate-200 pb-3
  `,
  name: `
    text-xl font-semibold tracking-tight text-slate-950
  `,
  subline: `
    mt-1 text-sm text-slate-600
  `,
  section: `
    mt-4
  `,
  sectionLabel: `
    border-b border-slate-200 pb-1 text-[11px] font-bold uppercase tracking-[0.2em]
    text-slate-500
  `,
  summary: `
    mt-2 text-sm leading-relaxed text-slate-700
  `,
  experienceList: `
    mt-2 space-y-4
  `,
  experienceEntry: `
    space-y-1
  `,
  experienceHeader: `
    flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1
  `,
  experienceTitle: `
    text-sm font-semibold text-slate-950
  `,
  experiencePeriod: `
    text-xs font-medium uppercase tracking-[0.14em] text-slate-500
  `,
  bulletList: `
    space-y-1.5
  `,
  bulletItem: `
    flex gap-2 text-sm leading-relaxed text-slate-700
  `,
  bulletDot: `
    mt-2 h-1 w-1 shrink-0 rounded-full bg-slate-400
  `,
  educationLine: `
    mt-2 text-sm leading-relaxed text-slate-700
  `,
} as const;
