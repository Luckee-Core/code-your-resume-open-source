"use client";

import React from "react";

export default function GeneratedCoverLetterPreview() {
  return (
    <main className={styles.canvas}>
      <article className={styles.paper} aria-label="Cover letter">
        <p className={styles.date}>June 20, 2026</p>

        <div className={styles.letter}>
          <p>Hola hola,</p>

          <p>
            My name is Matt Ruiz, and I am applying for the Senior Software
            Engineer role at Acuity. I want to join your team and help build
            reliable generative AI systems in production.
          </p>

          <p>
            I have not worked in insurance before, but several family members
            work across the industry, and I would like to learn the domain well
            enough to have real conversations with them—not as trivia, but
            because this role asks engineers to partner with analysts and
            stakeholders to understand business challenges before designing
            LLM-based and agentic solutions.
          </p>

          <p>
            Over the last several years I have integrated OpenAI and Anthropic
            Claude APIs into production apps, built RAG pipelines with structured
            parsing and output validation, and maintained auditable ledgers and
            runbooks around those flows in JavaScript, TypeScript, Node.js,
            Next.js, React, and PostgreSQL on AWS, GCP, and Vercel. On recent
            work at Luckee I standardized AI studio patterns across many
            surfaces—domain routers, prompt workflows, testing, debugging, and
            code reviews focused on accuracy and safe behavior. Before that I
            shipped cross-platform products like SisterMatch and Pencil Bible,
            mentored engineers at Amplinks, and kept CI-driven delivery tight
            across long-running codebases.
          </p>

          <p>
            I hold a B.S. in Computer Science from West Chester University of
            Pennsylvania (2018), am authorized to work in the U.S., and would
            like to talk about the role and next steps in the hiring process.
          </p>

          <div className={styles.closing}>
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
    flex h-[1056px] w-[816px] items-center justify-center overflow-hidden
    bg-slate-100 px-10 py-12 font-sans text-slate-800
  `,
  paper: `
    h-full w-full max-w-[680px] bg-white px-14 py-14 shadow-sm
  `,
  date: `
    mb-10 text-sm leading-relaxed text-slate-500
  `,
  letter: `
    space-y-5 text-sm leading-relaxed text-slate-700
  `,
  closing: `
    space-y-1 pt-4 text-slate-800
  `,
} as const;
