"use client";

import React from "react";

export default function GeneratedSkillsPreview() {
  return (
    <main className={styles.page}>
      <article className={styles.paper}>
        <header className={styles.header}>
          <h1 className={styles.name}>Matt Ruiz</h1>
          <p className={styles.subline}>
            Forward Deployed Engineer specializing in NextJS, React Native, Express
            and Postgres · Philadelphia, Pennsylvania, United States
          </p>
        </header>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Executive Summary</h2>
          <p className={styles.summary}>
            I build production React Native and Expo applications for iOS and
            Android, with deep TypeScript experience shipping marketplace and
            real-time operational mobile experiences. I have delivered 12+
            cross-platform apps since 2022—from two-sided peer matching to
            field-service and retail workflows—using Redux, Firebase, and Expo
            Router while optimizing performance, stability, and release quality. I
            partner with product and design teams, mentor engineers, and drive
            architectural decisions across navigation, state, and CI/CD.
          </p>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Experience</h2>
          <div className={styles.experienceList}>
            <article className={styles.experienceEntry}>
              <div className={styles.entryHeader}>
                <h3 className={styles.entryTitle}>
                  React Native Engineer | WomenHeart - SisterMatch
                </h3>
                <p className={styles.entryPeriod}>2021 – Present</p>
              </div>
              <ul className={styles.bulletList}>
                <li className={styles.bulletItem}>
                  Built and maintained a cross-platform React Native and Expo
                  peer-support app with TypeScript, implementing a two-sided
                  marketplace connecting users in a closed network scaled to
                  1,000 members.
                </li>
                <li className={styles.bulletItem}>
                  Delivered real-time operational experiences using Firebase,
                  GCP, and AWS with responsive mobile workflows and production
                  deployment across iOS and Android.
                </li>
                <li className={styles.bulletItem}>
                  Partnered on architectural decisions across navigation, state
                  management, and API integrations; integrated Claude Sonnet AI
                  modules for enhanced peer matching features.
                </li>
              </ul>
            </article>

            <article className={styles.experienceEntry}>
              <div className={styles.entryHeader}>
                <h3 className={styles.entryTitle}>
                  React Native Engineer | Pencil Bible
                </h3>
                <p className={styles.entryPeriod}>2021 – 2025</p>
              </div>
              <ul className={styles.bulletList}>
                <li className={styles.bulletItem}>
                  Scaled a React Native and Expo iPad application from MVP to
                  300,000 users while maintaining TypeScript code quality and
                  production stability across iOS platforms.
                </li>
                <li className={styles.bulletItem}>
                  Migrated drawing rendering to React Native Skia, improving
                  frame performance, rendering efficiency, and overall
                  application smoothness under heavy user load.
                </li>
                <li className={styles.bulletItem}>
                  Built the initial product from scratch with Expo, Firebase/GCP,
                  and TypeScript; achieved top 5 App Store ranking for the
                  keyword &quot;bible.&quot;
                </li>
              </ul>
            </article>

            <article className={styles.experienceEntry}>
              <div className={styles.entryHeader}>
                <h3 className={styles.entryTitle}>
                  Lead React Native Engineer | Amplinks
                </h3>
                <p className={styles.entryPeriod}>2021 – 2025</p>
              </div>
              <ul className={styles.bulletList}>
                <li className={styles.bulletItem}>
                  Led React Native and Expo development for three years, shipping
                  sales, service, and project management modules to production
                  with Stripe payment integration and cross-platform iOS/Android
                  delivery.
                </li>
                <li className={styles.bulletItem}>
                  Onboarded and mentored the company&apos;s first full-time
                  developer through code reviews, design discussions, and scalable
                  component patterns across React and React Native codebases.
                </li>
                <li className={styles.bulletItem}>
                  Integrated Firebase, AWS, and GCP backend infrastructure
                  supporting dynamic customer workflows, real-time data sync,
                  and field-service operational tooling.
                </li>
              </ul>
            </article>
          </div>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Education</h2>
          <p className={styles.education}>
            Bachelor&apos;s degree, Computer Science (major) and Web Technology
            (Minor), West Chester University of Pennsylvania (2018)
          </p>
        </section>
      </article>
    </main>
  );
}

const styles = {
  page: `
    w-full bg-slate-100 px-4 py-6 font-sans text-slate-800
  `,
  paper: `
    mx-auto w-[816px] max-w-full rounded-sm border border-slate-200 bg-white
    px-10 py-8 shadow-sm
  `,
  header: `
    border-b border-slate-200 pb-4
  `,
  name: `
    text-2xl font-semibold tracking-tight text-slate-950
  `,
  subline: `
    mt-1 text-sm text-slate-600
  `,
  section: `
    mt-5
  `,
  sectionTitle: `
    text-[11px] font-bold uppercase tracking-[0.2em] text-slate-500
  `,
  summary: `
    mt-2 text-sm leading-relaxed text-slate-700
  `,
  experienceList: `
    mt-2 space-y-4
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
    mt-1.5 list-disc space-y-1 pl-4
  `,
  bulletItem: `
    text-slate-700
  `,
  education: `
    mt-2 text-sm leading-relaxed text-slate-700
  `,
} as const;
