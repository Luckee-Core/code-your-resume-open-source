"use client";

import React from "react";

export default function GeneratedIdealCandidatePreview() {
  const question =
    "In your own words, briefly describe what makes you the ideal candidate for this position.";

  const answer =
    "I've built similar AI chat tools in production before, most recently at Luckee connecting studio UIs to Express APIs end to end. I like owning the whole feature — UI, API, and making sure model output is sane before users see it. This role also calls for testing and debugging model output, which is mostly my default when I'm planning features with analysts.";

  return (
    <main className={styles.page}>
      <section className={styles.panel}>
        <p className={styles.question}>{question}</p>
        <p className={styles.answer}>{answer}</p>
      </section>
    </main>
  );
}

const styles = {
  page: `
    flex h-[480px] w-[816px] items-start justify-center bg-slate-100 px-8 py-10 font-sans
  `,
  panel: `
    w-full max-w-2xl rounded-sm border border-slate-200 bg-white px-8 py-7 shadow-sm
  `,
  question: `
    text-xs leading-snug text-slate-500
  `,
  answer: `
    mt-4 text-sm leading-relaxed text-slate-700
  `,
} as const;
