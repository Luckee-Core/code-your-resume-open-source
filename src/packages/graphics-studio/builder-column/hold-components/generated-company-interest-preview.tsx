"use client";

import React from "react";

export default function GeneratedCompanyInterestPreview() {
  return (
    <React.Fragment>
      <main className={styles.page}>
        <section className={styles.paper} aria-label="Company interest answer">
          <p className={styles.question}>What interests you about working for this company?</p>
          <p className={styles.answer}>
            What interests me about Curri is the mix of practical logistics problems and real
            product-engineering ownership. The Senior Software Engineer role sounds built around the
            kind of work I like: getting context from PMs, ops, drivers, and customers, asking scope
            questions early, then shipping full-stack changes and measuring whether they actually
            helped. I also like that the stack crosses TypeScript, Node, Postgres, Redis, NATS,
            React, and React Native, with AI tools used as part of daily delivery instead of as a
            side experiment. My background building mobile, web, and workflow-heavy products fits
            that pace, especially in a team that expects engineers to leave systems clearer and
            stronger than they found them.
          </p>
        </section>
      </main>
    </React.Fragment>
  );
}

const styles = {
  page: `
    flex min-h-screen w-full items-center justify-center bg-slate-100 px-6 py-8 font-sans text-slate-900
  `,
  paper: `
    w-full max-w-[720px] rounded-sm border border-slate-200 bg-white px-8 py-7 shadow-sm
  `,
  question: `
    text-xs font-semibold uppercase tracking-[0.18em] text-slate-500
  `,
  answer: `
    mt-4 text-sm leading-relaxed text-slate-700
  `,
} as const;
