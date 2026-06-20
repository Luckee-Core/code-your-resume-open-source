"use client";

import React from "react";

export default function GeneratedCoverLetterPreview() {
  return (
    <main className={styles.canvas}>
      <article className={styles.paper} aria-label="Cover letter for iHerb">
        <p className={styles.date}>June 20, 2026</p>

        <div className={styles.letter}>
          <p>Hola hola,</p>

          <p>
            My name is Matt Ruiz, and I am applying for the Sr. Software Engineer II
            - AI role at iHerb. I want to join your team and help design, build, and
            operate production AI features that reach real customers.
          </p>

          <p>
            My recent work standardized production LLM patterns across many product
            surfaces: chat UI to Express domain routers to Anthropic Claude, with
            Supabase ledger tables for auditable request/response trails. That
            covered RAG-style retrieval flows, conversational agents, structured JSON
            parsing, prompt iteration, and evaluation data I could trace when quality
            drifted. I use Claude Code, Cursor, and Copilot daily for both AI and
            non-AI code, and I document system design decisions in shared ADRs and
            runbooks so the next engineer is not guessing.
          </p>

          <p>
            I have shipped full-stack TypeScript and Node.js systems end to end —
            spec, deployment, observability, and production fixes — on AWS, GCP, and
            Vercel. At WomenHeart I integrated Claude Sonnet into a peer-matching
            product serving about 1,000 users. At Pencil Bible I helped scale a
            consumer app to 300,000 users. I am comfortable owning latency, cost,
            and error signals in live systems, mentoring engineers (I onboarded
            Amplinks&apos; first full-time developer), and doing the code review and
            CI/testing work that keeps releases safe.
          </p>

          <p>
            The posting&apos;s mix of platform infrastructure, customer-facing GenAI,
            eval frameworks, and coordination with personalization signals is the
            kind of work I want next. I am authorized to work in the U.S. and would
            like to talk about the role and next steps in your hiring process.
          </p>

          <div className={styles.closing}>
            <p>Talk soon,</p>
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
