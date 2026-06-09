"use client";

import React from "react";

export default function GeneratedCoverLetterPreview() {
  return (
    <React.Fragment>
      <main className={styles.page}>
        <article className={styles.paper} aria-label="Cover letter for Tech Lead Manager role">
          <div className={styles.letter}>
            <p>Hola hola,</p>

            <p>
              My name is Matt Ruiz, and I am applying for the Tech Lead Manager role at
              Check Technologies. I want to join the team building the payroll infrastructure
              that partners rely on for calculations, tax payments, filings, money movement,
              and clear reconciliation.
            </p>

            <p>
              I have built and shipped production software end to end across TypeScript,
              React Native, Next.js, Node.js, Firebase, Supabase/Postgres, Stripe, AWS, GCP,
              Vercel, and CI/testing workflows. My early field operations background also
              shaped how I write software: understand the workflow, keep the system traceable,
              and make the result usable for the people depending on it.
            </p>

            <p>
              The mix of hands-on engineering and team leadership is the part of this role
              that stands out to me. At Revature, I worked as a Salesforce BA, trainer, and
              developer, coordinating with large dev groups, teaching technical material, and
              improving process quality. In product work since then, I have stayed close to the
              code while mentoring, unblocking, and pushing toward shipped outcomes.
            </p>

            <p>
              I would also bring practical AI experience to the workflow side of the role. I
              have integrated OpenAI and Anthropic Claude APIs for chatbots, function calling,
              embeddings, RAG-style systems, and real-time inference, and I would be excited to
              apply that experience to operational workflows like tax notice triage, employer
              setup, engineering tooling, and partner-facing support systems.
            </p>

            <p>
              If my background fits what you need, I would like to talk about the Tech Lead
              Manager role, the team, and next steps in the hiring process.
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
    sm:px-6 sm:py-8
  `,
  paper: `
    mx-auto min-h-[984px] w-full max-w-[720px] bg-white px-8 py-10 shadow-sm
    ring-1 ring-slate-200
    sm:px-12 sm:py-14
  `,
  letter: `
    space-y-5 text-sm leading-relaxed text-slate-700
  `,
  signatureBlock: `
    space-y-1 pt-2 text-slate-800
  `,
} as const;
