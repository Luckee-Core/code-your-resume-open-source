"use client";

import React from "react";

export default function GeneratedSkillsPreview() {
  return (
    <div className={styles.page}>
      <article className={styles.paper}>
        <header className={styles.header}>
          <h1 className={styles.name}>Matt Ruiz</h1>
          <p className={styles.subline}>
            Staff Full Stack Engineer · Philadelphia, PA
          </p>
        </header>

        <section className={styles.section}>
          <h2 className={styles.sectionLabel}>Executive Summary</h2>
          <p className={styles.summary}>
            I build and ship cross-platform mobile products with React Native,
            Expo, and TypeScript—from MVP through App Store and Google Play
            releases on AWS, GCP, and Vercel. I architect full-stack delivery
            with Node.js and Next.js, mentor engineers through production
            launches, and collaborate with product and design for consistent web
            and mobile experiences. I&apos;ve scaled apps including Pencil Bible
            to 300K users and led multi-module field-service platforms with
            payments, real-time data, and CI/CD.
          </p>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionLabel}>Experience</h2>
          <div className={styles.experienceList}>
            <article className={styles.experienceEntry}>
              <div className={styles.entryHeader}>
                <h3 className={styles.entryTitle}>
                  Lead Software Engineer | Acme Labs
                </h3>
                <p className={styles.entryPeriod}>Recent</p>
              </div>
              <ul className={styles.bulletList}>
                <li className={styles.bulletItem}>
                  <span className={styles.bulletDot} />
                  <span>
                    Shipped 12+ production React Native and Expo apps since 2022,
                    including Pencil Bible (300K users, top-5 iPad ranking) and
                    WomenHeart SisterMatch (1,000+ users), with TypeScript,
                    Redux, Expo Router, and App Store / Google Play release
                    workflows.
                  </span>
                </li>
                <li className={styles.bulletItem}>
                  <span className={styles.bulletDot} />
                  <span>
                    Architected deployment pipelines across AWS, GCP, Firebase,
                    and Vercel for mobile and full-stack products—CI/testing,
                    real-time backends, Stripe payments, and production monitoring
                    for field-service and marketplace apps.
                  </span>
                </li>
                <li className={styles.bulletItem}>
                  <span className={styles.bulletDot} />
                  <span>
                    Led React and React Native development at Amplinks for three
                    years—built sales, service, and project management modules,
                    integrated Stripe and QuickBooks, and mentored the
                    company&apos;s first full-time developer through launch.
                  </span>
                </li>
                <li className={styles.bulletItem}>
                  <span className={styles.bulletDot} />
                  <span>
                    Partnered with product and design on end-to-end delivery
                    across TeenPros, BoxBets, Swizzy Golf, and Amplinks—Node.js
                    APIs, Next.js dashboards, Twilio video, MapBox, and
                    Claude-powered matching features where AI improved user
                    outcomes.
                  </span>
                </li>
              </ul>
            </article>

            <article className={styles.experienceEntry}>
              <div className={styles.entryHeader}>
                <h3 className={styles.entryTitle}>
                  Salesforce BA / Trainer / Developer | Revature
                </h3>
                <p className={styles.entryPeriod}>Earlier</p>
              </div>
              <ul className={styles.bulletList}>
                <li className={styles.bulletItem}>
                  <span className={styles.bulletDot} />
                  <span>
                    Coordinated with large development groups, delivered
                    Salesforce training workshops and curriculum, and drove
                    measurable process improvements across admin, Apex, flows,
                    and automation.
                  </span>
                </li>
              </ul>
            </article>
          </div>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionLabel}>Education</h2>
          <p className={styles.educationText}>
            B.S. Computer Science, West Chester University of Pennsylvania
            (2018)
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
    mt-0.5 text-sm text-slate-600
  `,
  section: `
    mt-4
  `,
  sectionLabel: `
    border-b border-slate-200 pb-1 text-[11px] font-bold uppercase
    tracking-[0.2em] text-slate-500
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
    flex flex-wrap items-baseline justify-between gap-x-4 gap-y-0.5
  `,
  entryTitle: `
    text-sm font-semibold text-slate-950
  `,
  entryPeriod: `
    text-xs font-medium uppercase tracking-[0.14em] text-slate-500
  `,
  bulletList: `
    space-y-1 text-sm leading-relaxed text-slate-700
  `,
  bulletItem: `
    flex gap-2
  `,
  bulletDot: `
    mt-2 h-1 w-1 shrink-0 rounded-full bg-slate-400
  `,
  educationText: `
    mt-2 text-sm leading-relaxed text-slate-700
  `,
} as const;
