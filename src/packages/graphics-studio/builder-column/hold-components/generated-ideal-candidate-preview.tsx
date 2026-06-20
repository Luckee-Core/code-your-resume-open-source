"use client";

import React from "react";

const QUESTION =
  "In your own words, briefly describe what makes you the ideal candidate for this position.";

const ANSWER =
  "I've built similar AI chat tools in production before, so this role looked like a natural fit. On Luckee I owned the whole loop — UI, API, and making sure model output is sane before users see it. I like working with analysts to scope what the first version needs. Heavy TypeScript across the apps I maintain.";

export default function GeneratedIdealCandidatePreview() {
  return (
    <main className={styles.outer}>
      <section className={styles.card}>
        <p className={styles.question}>{QUESTION}</p>
        <p className={styles.answer}>{ANSWER}</p>
      </section>
    </main>
  );
}

const styles = {
  outer: `
    flex h-[480px] w-[816px] items-start justify-center bg-slate-100 px-10 py-10 font-sans
  `,
  card: `
    w-full max-w-xl rounded-sm border border-slate-200 bg-white px-7 py-6 shadow-sm
  `,
  question: `
    text-xs leading-snug text-slate-500
  `,
  answer: `
    mt-4 text-sm leading-relaxed text-slate-700
  `,
} as const;
