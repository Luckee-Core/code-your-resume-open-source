"use client";

import React from "react";

export default function GeneratedSkillsPreview() {
  return (
    <React.Fragment>
      <main className={styles.canvas}>
        <section className={styles.paper}>
          <header className={styles.header}>
            <h1 className={styles.name}>Matt Ruiz</h1>
            <div className={styles.subline}>Senior Software Engineer | Philadelphia</div>
          </header>

          <section className={styles.section}>
            <h2 className={styles.sectionLabel}>Executive Summary</h2>
            <p className={styles.summary}>
              I design and ship production software systems with a practical eye for
              architecture, maintainability, and real-world operations. My work spans
              TypeScript, React Native, Next.js, Node.js, Firebase, Salesforce, and AI
              automation, with a track record of collaborating across teams and
              supporting engineers through reviews, planning, and implementation.
            </p>
          </section>

          <section className={styles.section}>
            <h2 className={styles.sectionLabel}>Experience</h2>
            <div className={styles.experienceList}>
              <article className={styles.experienceEntry}>
                <div className={styles.entryHeader}>
                  <h3 className={styles.entryTitle}>
                    Senior Software Engineer | Acme Labs
                  </h3>
                  <div className={styles.entryDate}>Recent</div>
                </div>
                <ul className={styles.bulletList}>
                  <li className={styles.bulletItem}>
                    <span className={styles.bulletDot} />
                    <span>
                      Designed, developed, and maintained production mobile and web
                      software across marketplaces, social apps, field-service workflows,
                      and training tools using TypeScript, React Native, Next.js, Node.js,
                      Firebase, Supabase, and Cloud Functions.
                    </span>
                  </li>
                  <li className={styles.bulletItem}>
                    <span className={styles.bulletDot} />
                    <span>
                      Contributed architecture and technical strategy for real-time and
                      payment-enabled product builds, including Stripe, MapBox, Twilio
                      Video, push notifications, authentication, backend automation, and
                      CI/testing patterns.
                    </span>
                  </li>
                  <li className={styles.bulletItem}>
                    <span className={styles.bulletDot} />
                    <span>
                      Collaborated with product and client stakeholders to scope features,
                      troubleshoot issues, and estimate work across TeenPros, BoxBets,
                      Swizzy Golf, Women Heart Sister Match, and field-service workflow
                      builds.
                    </span>
                  </li>
                  <li className={styles.bulletItem}>
                    <span className={styles.bulletDot} />
                    <span>
                      Supported engineering quality through review-ready implementation,
                      reusable npm modules, shared tooling, and plain-language
                      documentation; applied OpenAI and Anthropic APIs where automation
                      reduced repetitive operational work.
                    </span>
                  </li>
                </ul>
              </article>

              <article className={styles.experienceEntry}>
                <div className={styles.entryHeader}>
                  <h3 className={styles.entryTitle}>
                    Salesforce Business Analyst / Trainer / Developer | Revature
                  </h3>
                  <div className={styles.entryDate}>Earlier</div>
                </div>
                <ul className={styles.bulletList}>
                  <li className={styles.bulletItem}>
                    <span className={styles.bulletDot} />
                    <span>
                      Coordinated with large development groups, translating Salesforce
                      platform work across Admin, Apex, custom objects, flows, automation,
                      requirements, and delivery training.
                    </span>
                  </li>
                  <li className={styles.bulletItem}>
                    <span className={styles.bulletDot} />
                    <span>
                      Produced training curriculum and process improvements that helped
                      teams work more consistently through planning, implementation, and
                      handoff.
                    </span>
                  </li>
                </ul>
              </article>
            </div>
          </section>

          <section className={styles.section}>
            <h2 className={styles.sectionLabel}>Education</h2>
            <div className={styles.educationBlock}>
              <div className={styles.educationTitle}>
                B.S. Computer Science | West Chester University of Pennsylvania
              </div>
              <div className={styles.educationMeta}>2018</div>
              <div className={styles.educationNote}>
                Early electrical and field operations apprenticeship in a family
                contracting business shaped an operations-aware approach to building
                software that works in real conditions.
              </div>
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
    mx-auto w-[816px] max-w-full rounded-sm border border-slate-200 bg-white
    px-10 py-8 shadow-sm ring-1 ring-slate-100
  `,
  header: `
    border-b border-slate-200 pb-4
  `,
  name: `
    text-3xl font-semibold tracking-tight text-slate-950
  `,
  subline: `
    mt-2 text-sm font-medium text-slate-600
  `,
  section: `
    mt-5
  `,
  sectionLabel: `
    border-b border-slate-200 pb-1 text-[11px] font-bold uppercase
    tracking-[0.2em] text-slate-500
  `,
  summary: `
    mt-2 text-sm leading-relaxed text-slate-700
  `,
  experienceList: `
    mt-3 space-y-5
  `,
  experienceEntry: `
    text-sm leading-relaxed
  `,
  entryHeader: `
    flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1
  `,
  entryTitle: `
    text-sm font-semibold text-slate-950
  `,
  entryDate: `
    text-xs font-semibold uppercase tracking-[0.14em] text-slate-500
  `,
  bulletList: `
    mt-2 space-y-1.5 text-sm leading-relaxed text-slate-700
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
  educationTitle: `
    font-semibold text-slate-950
  `,
  educationMeta: `
    text-sm text-slate-600
  `,
  educationNote: `
    mt-1 text-sm leading-relaxed text-slate-700
  `,
} as const;