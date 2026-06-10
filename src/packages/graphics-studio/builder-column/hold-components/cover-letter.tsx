"use client";

import React from "react";

export default function GeneratedCoverLetterPreview() {
  return (
    <React.Fragment>
      <main className={styles.page}>
        <article className={styles.paper} aria-label="Cover letter">
          <p className={styles.date}>June 10, 2026</p>

          <div className={styles.letterBody}>
            <p>Hola hola,</p>

            <p>My name is Matt Ruiz, and I am applying for the Senior Frontend Software Engineer role at Archy. I want to join the team and contribute as an engineer who can design strong frontend features, collaborate clearly with product and design, and keep the codebase maintainable as the product grows.</p>

            <p>
              My background is in building practical web and mobile products
              with TypeScript, JavaScript, React, React Native, Next.js, Node.js,
              Firebase, Supabase, Stripe, MapBox, and Twilio video. Across
              marketplace, social, field-service, training, and payment-enabled
              apps, I have owned user-facing components, state management with
              Redux, real-time data flows, API integrations, and production
              delivery details.
            </p>

            <p>
              The responsibilities in this role line up with work I have done
              hands-on: developing frontend components, implementing interfaces
              with product and design partners, improving existing code, using
              Git in team workflows, and participating in code reviews and
              technical discussions. I care about web standards, performance,
              testing, CI patterns, and architecture choices that make everyday
              development cleaner instead of more complicated.
            </p>

            <p>
              I would like to talk about the role, the frontend problems Archy
              is solving now, and what you need from the next engineer who joins
              the team.
            </p>

            <div className={styles.signatureBlock}>
              <p>Thanks,</p>
              <p>Matt Ruiz</p>
            </div>
          </div>
        </article>
      </main>
    </React.Fragment>
  );
}

const styles = {
  page: `
    min-h-screen w-full bg-slate-100 px-4 py-6 font-sans text-slate-800
    sm:px-6
  `,
  paper: `
    mx-auto w-full max-w-[720px] bg-white px-8 py-9 shadow-sm
    sm:px-12 sm:py-12
  `,
  date: `
    text-sm leading-relaxed text-slate-500
  `,
  letterBody: `
    mt-8 space-y-5 text-sm leading-relaxed text-slate-700
  `,
  signatureBlock: `
    pt-2 text-sm leading-relaxed text-slate-700
  `,
} as const;
