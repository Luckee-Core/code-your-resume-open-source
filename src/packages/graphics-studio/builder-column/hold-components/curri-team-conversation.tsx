"use client";

import React from "react";

export default function GeneratedTeamConversationPreview() {
  const prompt =
    "Start a conversation with the team at Curri. Share something about you, what you're looking for, or why Curri interests you. Human-written messages are more likely to get a response.";

  return (
    <React.Fragment>
      <main className={styles.page}>
        <section className={styles.paper} aria-label="Curri team conversation response">
          <p className={styles.prompt}>{prompt}</p>

          <p className={styles.message}>
            Hola hola! Before software, I spent a lot of weekends and summers around electrical and field operations
            work in my family&apos;s contracting business, so I have a soft spot for tools that make real-world teams move
            with less friction. I&apos;m looking for a senior engineering role where I can stay close to the problem, talk
            directly with stakeholders, and own full-stack work from rough scope through production and iteration.
            Curri caught my eye because the role seems to value exactly that: weekly shipping loops, practical evidence
            of impact, and engineers who are comfortable moving between TypeScript/Node backends, React or React Native
            UI, and AI-paired delivery without treating any of those as someone else&apos;s lane.
          </p>
        </section>
      </main>
    </React.Fragment>
  );
}

const styles = {
  page: `
    min-h-screen w-full bg-slate-100 px-5 py-8 font-sans text-slate-900
  `,
  paper: `
    mx-auto w-full max-w-2xl rounded-sm border border-slate-200 bg-white px-6 py-5 shadow-sm
  `,
  prompt: `
    text-xs leading-relaxed text-slate-500
  `,
  message: `
    mt-5 text-sm leading-relaxed text-slate-800
  `,
} as const;
