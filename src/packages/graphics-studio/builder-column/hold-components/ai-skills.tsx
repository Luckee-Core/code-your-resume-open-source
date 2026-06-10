"use client";

import React from "react";

export default function GeneratedSkillsPreview() {
  return (
    <React.Fragment>
      <main className={styles.canvas}>
        <article className={styles.paper}>
          <header className={styles.header}>
            <h1 className={styles.name}>Matt Ruiz</h1>
            <p className={styles.subline}>Senior Software Engineer | Philadelphia</p>
          </header>

          <section className={styles.section}>
            <h2 className={styles.sectionLabel}>Executive Summary</h2>
            <p className={styles.summary}>
              I build scalable TypeScript product systems and help teams turn
              ambiguous operational problems into shipped software. My work spans
              React Native, Next.js, Node.js, Firebase/Supabase, CI/testing,
              AWS/GCP/Vercel, and AI automation where it reduces repetitive work.
              I'm comfortable contributing to architecture, reviewing code,
              mentoring teammates, and troubleshooting production issues with
              cross-functional partners.
            </p>
          </section>

          <section className={styles.section}>
            <h2 className={styles.sectionLabel}>Experience</h2>
            <div className={styles.experienceList}>
              <section className={styles.roleBlock}>
                <div className={styles.roleHeader}>
                  <h3 className={styles.roleTitle}>
                    Senior Product Engineer | Acme Labs
                  </h3>
                  <p className={styles.period}>Recent</p>
                </div>
                <ul className={styles.bulletList}>
                  <li className={styles.bulletItem}>
                    <span className={styles.bulletMarker} />
                    <span>
                      Designed and shipped scalable TypeScript systems across
                      React Native, Next.js, Node.js, Firebase, Supabase, and
                      cloud deployments on AWS, GCP, and Vercel for marketplace,
                      social, field-service, and training products.
                    </span>
                  </li>
                  <li className={styles.bulletItem}>
                    <span className={styles.bulletMarker} />
                    <span>
                      Contributed architecture and technical strategy for
                      real-time features including Twilio video, chat, groups,
                      notifications, MapBox location flows, Stripe payments,
                      Redux state management, and backend automation.
                    </span>
                  </li>
                  <li className={styles.bulletItem}>
                    <span className={styles.bulletMarker} />
                    <span>
                      Improved code quality through practical CI/testing
                      patterns, Jest coverage, ESLint guardrails, disciplined
                      sprint delivery, and code-review habits suited to small
                      teams shipping production mobile and web software.
                    </span>
                  </li>
                  <li className={styles.bulletItem}>
                    <span className={styles.bulletMarker} />
                    <span>
                      Built AI automation and workflow tooling with OpenAI and
                      Anthropic Claude APIs, including chatbots, prompt
                      engineering, embeddings, function calling, RAG workflows,
                      and production integrations across Node.js, React Native,
                      and Next.js applications.
                    </span>
                  </li>
                </ul>
              </section>

              <section className={styles.roleBlock}>
                <div className={styles.roleHeader}>
                  <h3 className={styles.roleTitle}>
                    Salesforce BA / Trainer / Developer | Revature
                  </h3>
                  <p className={styles.period}>Earlier</p>
                </div>
                <ul className={styles.bulletList}>
                  <li className={styles.bulletItem}>
                    <span className={styles.bulletMarker} />
                    <span>
                      Coordinated with large development groups, delivered
                      Salesforce training workshops and curriculum, and supported
                      measurable process improvements through business analysis,
                      Apex, flows, custom objects, and automation.
                    </span>
                  </li>
                  <li className={styles.bulletItem}>
                    <span className={styles.bulletMarker} />
                    <span>
                      Mentored learners and cross-functional stakeholders by
                      translating platform concepts into usable implementation
                      paths, reinforcing clear communication and reviewable
                      delivery standards.
                    </span>
                  </li>
                </ul>
              </section>
            </div>
          </section>

          <section className={styles.section}>
            <h2 className={styles.sectionLabel}>Education</h2>
            <div className={styles.education}>
              <p className={styles.school}>
                West Chester University of Pennsylvania
              </p>
              <p>B.S. Computer Science, 2018</p>
              <p className={styles.educationNote}>
                Early electrical and field-operations work in a family
                contracting business shaped a practical, operations-aware
                engineering approach.
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
    mx-auto w-[816px] max-w-full rounded-sm border border-slate-200 bg-white
    px-10 py-8 shadow-sm ring-1 ring-slate-200/60
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
    border-b border-slate-200 pb-1 text-[11px] font-bold uppercase
    tracking-[0.2em] text-slate-500
  `,
  summary: `
    mt-2 text-sm leading-relaxed text-slate-700
  `,
  experienceList: `
    mt-3 space-y-5
  `,
  roleBlock: `
    space-y-2
  `,
  roleHeader: `
    flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1
  `,
  roleTitle: `
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
  bulletMarker: `
    mt-2 h-1 w-1 shrink-0 rounded-full bg-slate-400
  `,
  education: `
    mt-2 text-sm leading-relaxed text-slate-700
  `,
  school: `
    font-semibold text-slate-950
  `,
  educationNote: `
    mt-1 text-slate-600
  `,
} as const;