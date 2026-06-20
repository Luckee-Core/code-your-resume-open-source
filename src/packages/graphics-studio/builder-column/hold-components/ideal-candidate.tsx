"use client";

import React from "react";

const QUESTION =
  "In your own words, briefly describe what makes you the ideal candidate for this position.";

const ANSWER =
  "I've spent the last few years building AI features that actually ship — chat flows, retrieval setups, and audit trails teams can rely on in production. At Luckee I wired the same pattern across a bunch of product surfaces: chat UI, Express APIs, model calls, and logged responses. That lines up with the RAG and agent orchestration work in this posting. I also added Claude into WomenHeart's SisterMatch app for peer matching at scale. I'm used to scoping messy AI projects with analysts and engineers, writing clear docs, and catching bad model output before it reaches users.";

export default function GeneratedIdealCandidatePreview() {
  return (
    <main className={styles.page}>
      <section className={styles.paper}>
        <p className={styles.question}>{QUESTION}</p>
        <p className={styles.answer}>{ANSWER}</p>
      </section>
    </main>
  );
}

const styles = {
  page: `
    flex h-[480px] w-[816px] items-start justify-center bg-slate-100 p-6 font-sans
  `,
  paper: `
    w-full max-w-2xl rounded-sm border border-slate-200 bg-white px-8 py-6 shadow-sm
  `,
  question: `
    text-xs leading-snug text-slate-500
  `,
  answer: `
    mt-4 text-sm leading-relaxed text-slate-700
  `,
} as const;
