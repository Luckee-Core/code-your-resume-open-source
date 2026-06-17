"use client";

import React from "react";

export default function GeneratedSkillsPreview() {
  return (
    <div className={styles.page}>
      <article className={styles.paper}>
        <header className={styles.header}>
          <h1 className={styles.name}>Matt Ruiz</h1>
          <p className={styles.subline}>Staff Full Stack Engineer · Philadelphia, PA</p>
        </header>

        <section className={styles.section}>
          <h2 className={styles.sectionLabel}>Executive Summary</h2>
          <p className={styles.summary}>
            I build and ship cross-platform mobile products with React Native, Expo, and
            TypeScript, including deployment workflows and real-time full-stack backends on AWS
            and Node.js. I lead technical design across product surfaces—from App Store–ready
            mobile apps to Next.js dashboards—and mentor engineers through code reviews, CI
            practices, and practical delivery. My work pairs hands-on engineering with
            cross-functional collaboration, shaped by shipping 12+ production apps and workflow
            automation for high-growth product teams.
          </p>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionLabel}>Experience</h2>
          <div className={styles.experienceList}>
            <article className={styles.experienceEntry}>
              <div className={styles.entryHeader}>
                <h3 className={styles.entryTitle}>
                  Full Stack Engineer | Acme Labs
                </h3>
                <span className={styles.entryPeriod}>Recent</span>
              </div>
              <ul className={styles.bulletList}>
                <li className={styles.bulletItem}>
                  Built and shipped 12+ production React Native and Expo apps with TypeScript,
                  Redux, React Navigation, and Expo Router—delivering cross-platform iOS/Android
                  products with Stripe payments, MapBox, Twilio video, and real-time Firebase and
                  Supabase backends.
                </li>
                <li className={styles.bulletItem}>
                  Architected deployment and CI/testing pipelines across Vercel, AWS, and GCP for
                  Next.js dashboards and mobile release workflows, supporting rapid iteration and
                  production reliability from build through publish.
                </li>
                <li className={styles.bulletItem}>
                  Led full-stack delivery on marketplaces and social apps—including TeenPros,
                  BoxBets, Swizzy Golf, and Women Heart Sister Match—with Node.js backends,
                  payments, push notifications, and field-service scheduling workflows.
                </li>
                <li className={styles.bulletItem}>
                  Integrated OpenAI and Anthropic Claude APIs into production mobile and web
                  surfaces for chat, embeddings, function calling, and RAG workflows; mentored
                  engineers on TypeScript patterns, testing discipline, and cross-functional
                  product delivery.
                </li>
              </ul>
            </article>

            <article className={styles.experienceEntry}>
              <div className={styles.entryHeader}>
                <h3 className={styles.entryTitle}>
                  Salesforce BA / Trainer / Developer | Revature
                </h3>
                <span className={styles.entryPeriod}>Earlier</span>
              </div>
              <ul className={styles.bulletList}>
                <li className={styles.bulletItem}>
                  Coordinated with large development groups, delivered Salesforce training
                  workshops and curriculum, and drove measurable process improvements across
                  admin, Apex, flows, and automation work.
                </li>
              </ul>
            </article>
          </div>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionLabel}>Education</h2>
          <p className={styles.educationLine}>
            B.S. Computer Science, West Chester University of Pennsylvania (2018)
          </p>
        </section>
      </article>
    </div>
  );
}

const styles = {
  page: `
    w-full bg-slate-100 px-4 py-4 font-sans text-slate-800
  `,
  paper: `
    mx-auto w-full max-w-[816px] rounded-sm border border-slate-200 bg-white px-8 py-6
    shadow-sm ring-1 ring-slate-100
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
    border-b border-slate-200 pb-1 text-[11px] font-semibold uppercase tracking-[0.18em]
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
  entryHeader: `
    flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1
  `,
  entryTitle: `
    text-sm font-semibold text-slate-950
  `,
  entryPeriod: `
    text-xs font-medium uppercase tracking-[0.12em] text-slate-500
  `,
  bulletList: `
    space-y-1.5 pl-0
  `,
  bulletItem: `
    text-sm leading-relaxed text-slate-700 before:mr-2 before:text-slate-400 before:content-['•']
  `,
  educationLine: `
    mt-2 text-sm leading-relaxed text-slate-700
  `,
} as const;
