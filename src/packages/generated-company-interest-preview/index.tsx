"use client";

import React from "react";

export default function GeneratedCompanyInterestPreview() {
  return (
    <main className={styles.page}>
      <section className={styles.paper} aria-labelledby="company-interest-question">
        <p id="company-interest-question" className={styles.question}>
          What interests you about working for this company?
        </p>
        <p className={styles.answer}>
          I’m interested in Respan because this role lines up with the kind of work I enjoy
          most: shipping useful product across the full stack, staying close to users, and
          improving the system as it grows. The mix of React, Next.js, Python, PostgreSQL,
          APIs, data pipelines, and real-time systems is a strong fit for my background
          building production apps with TypeScript, Node.js, real-time backends, and cloud
          deployments. I also like that engineers collaborate directly with founders and
          customers, own features end to end, and iterate quickly based on what actually
          helps the product.
        </p>
      </section>
    </main>
  );
}

const styles = {
  page: `
    flex min-h-[480px] w-full items-start justify-center bg-slate-100 px-6 py-8
    font-sans text-slate-900
  `,
  paper: `
    w-full max-w-2xl rounded-xl border border-slate-200 bg-white px-6 py-5
    shadow-sm
  `,
  question: `
    text-xs font-semibold uppercase tracking-[0.16em] text-slate-500
  `,
  answer: `
    mt-4 text-sm leading-relaxed text-slate-700
  `,
} as const;
