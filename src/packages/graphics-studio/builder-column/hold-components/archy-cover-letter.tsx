"use client";

import React from "react";

export default function GeneratedCoverLetterPreview() {
  return (
    <main className={styles.canvas}>
      <article className={styles.paper} aria-label="Cover letter for Archy">
        <p className={styles.date}>June 9, 2026</p>

        <div className={styles.letter}>
          <p>Hola hola,</p>

          <p>
            My name is Matt Ruiz, and I&apos;m applying for the Staff Frontend
            Software Engineer role at Archy. I&apos;m interested in joining the
            team to own frontend architecture, release important customer-facing
            features, and raise the quality bar across React and TypeScript work.
          </p>

          <p>
            I bring a practical frontend and product background across Next.js,
            React Native, TypeScript, Redux, Firebase, Node.js, Stripe, Twilio
            video, MapBox, and CI/testing. I&apos;ve shipped marketplace, social,
            field-service, and payment-enabled products where state management,
            component structure, build tooling, release discipline, and
            production stability all mattered.
          </p>

          <p>
            Your posting calls out AI-assisted development and AI-powered
            interfaces. I&apos;ve integrated OpenAI and Anthropic Claude APIs for
            chatbots, prompt engineering, embeddings, function calling, RAG
            systems, and real-time inference, while keeping architectural
            ownership with the engineering team instead of treating AI as a
            shortcut around maintainability.
          </p>

          <p>
            I&apos;d be useful in code reviews, planning, frontend health
            monitoring, and the seam between a Java Spring Boot backend and a
            React/TypeScript frontend. My early field operations work shaped how
            I build software: diagnose first, keep the workflow usable, and
            connect technical decisions to the real people using the product,
            including dental practices relying on Archy every day.
          </p>

          <p>
            If the team is open to it, I&apos;d like to talk about the role, the
            frontend roadmap, and the next steps in the hiring process.
          </p>

          <div className={styles.signatureBlock}>
            <p>Thanks,</p>
            <p>Matt Ruiz</p>
          </div>
        </div>
      </article>
    </main>
  );
}

const styles = {
  canvas: `
    min-h-[1056px] w-full bg-slate-100 px-6 py-6 font-sans text-slate-800
  `,
  paper: `
    mx-auto min-h-[1008px] w-full max-w-[720px] bg-white px-12 py-12 shadow-sm
    ring-1 ring-slate-200
  `,
  date: `
    text-sm leading-relaxed text-slate-500
  `,
  letter: `
    mt-10 space-y-5 text-sm leading-relaxed text-slate-700
  `,
  signatureBlock: `
    space-y-1 pt-2 text-sm leading-relaxed text-slate-800
  `,
} as const;
