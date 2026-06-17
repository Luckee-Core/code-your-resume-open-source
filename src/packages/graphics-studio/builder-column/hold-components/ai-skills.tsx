"use client";

import React from "react";

export default function GeneratedSkillsPreview() {
  return (
    <main className={styles.page}>
      <section className={styles.paper}>
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
            I ship production iOS and Android apps with React Native, Expo, and
            TypeScript, leading projects from MVP through deployment and mentoring
            junior developers along the way. I&apos;ve scaled mobile products to
            hundreds of thousands of users, optimized performance with libraries
            like React Native Skia, and integrated real-time backends on Firebase,
            AWS, and GCP. I collaborate with product and design teams, conduct code
            reviews, and use CI/CD to deliver reliable cross-platform experiences.
          </p>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Experience</h2>
          <div className={styles.experienceList}>
            <article className={styles.experienceEntry}>
              <div className={styles.entryHeader}>
                <h3 className={styles.entryTitle}>
                  Lead Mobile Developer | Amplinks
                </h3>
                <p className={styles.entryPeriod}>2021–2025</p>
              </div>
              <ul className={styles.bulletList}>
                <li className={styles.bulletItem}>
                  <span className={styles.bulletDot} />
                  <span>
                    Led React Native development for three years, shipping sales,
                    service, and project management modules to production on iOS and
                    Android.
                  </span>
                </li>
                <li className={styles.bulletItem}>
                  <span className={styles.bulletDot} />
                  <span>
                    Onboarded and mentored the company&apos;s first full-time
                    developer, establishing code review practices and mobile
                    development workflows.
                  </span>
                </li>
                <li className={styles.bulletItem}>
                  <span className={styles.bulletDot} />
                  <span>
                    Built cross-platform mobile app with React Native and Expo,
                    integrating Stripe, Firebase, AWS, and GCP backends.
                  </span>
                </li>
                <li className={styles.bulletItem}>
                  <span className={styles.bulletDot} />
                  <span>
                    Completed project management module development and launched
                    core product modules end-to-end.
                  </span>
                </li>
              </ul>
            </article>

            <article className={styles.experienceEntry}>
              <div className={styles.entryHeader}>
                <h3 className={styles.entryTitle}>
                  Mobile Developer | Pencil Bible
                </h3>
                <p className={styles.entryPeriod}>2021–2025</p>
              </div>
              <ul className={styles.bulletList}>
                <li className={styles.bulletItem}>
                  <span className={styles.bulletDot} />
                  <span>
                    Scaled React Native app to 300,000 users and achieved top 5
                    iPad ranking for &quot;bible,&quot; demonstrating strong UX
                    and performance at scale.
                  </span>
                </li>
                <li className={styles.bulletItem}>
                  <span className={styles.bulletDot} />
                  <span>
                    Migrated drawing implementation to React Native Skia,
                    optimizing rendering performance and smoothness for iPad users.
                  </span>
                </li>
                <li className={styles.bulletItem}>
                  <span className={styles.bulletDot} />
                  <span>
                    Built MVP from scratch using React Native, Expo, TypeScript,
                    and Firebase/GCP, owning architecture through App Store
                    deployment.
                  </span>
                </li>
              </ul>
            </article>

            <article className={styles.experienceEntry}>
              <div className={styles.entryHeader}>
                <h3 className={styles.entryTitle}>
                  Mobile Developer | WomenHeart - SisterMatch
                </h3>
                <p className={styles.entryPeriod}>2021–Present</p>
              </div>
              <ul className={styles.bulletList}>
                <li className={styles.bulletItem}>
                  <span className={styles.bulletDot} />
                  <span>
                    Built cross-platform peer support network with React Native,
                    Expo, and TypeScript, scaling a closed network to 1,000
                    in-house users.
                  </span>
                </li>
                <li className={styles.bulletItem}>
                  <span className={styles.bulletDot} />
                  <span>
                    Deployed on Firebase/GCP and AWS with Vercel frontend,
                    integrating real-time features and Claude Sonnet AI for
                    enhanced peer matching.
                  </span>
                </li>
                <li className={styles.bulletItem}>
                  <span className={styles.bulletDot} />
                  <span>
                    Implemented two-sided marketplace connecting peer support
                    users in a healthcare context.
                  </span>
                </li>
              </ul>
            </article>
          </div>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Education</h2>
          <p className={styles.educationText}>
            Bachelor&apos;s degree, Computer Science (major) and Web Technology
            (minor), West Chester University of Pennsylvania (2018)
          </p>
        </section>
      </section>
    </main>
  );
}

const styles = {
  page: `
    w-full bg-slate-100 px-4 py-6 font-sans text-slate-800
  `,
  paper: `
    mx-auto w-full max-w-[816px] rounded-sm border border-slate-200 bg-white
    px-8 py-7 shadow-sm
  `,
  header: `
    border-b border-slate-200 pb-4
  `,
  name: `
    text-xl font-semibold tracking-tight text-slate-950
  `,
  subline: `
    mt-1 text-sm leading-relaxed text-slate-600
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
    mt-1.5 space-y-1
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
