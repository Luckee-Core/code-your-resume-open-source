"use client";

import React from "react";

export default function GeneratedCoverLetterPreview() {
  return (
    <React.Fragment>
      <main className={styles.page}>
        <article className={styles.paper} aria-label="Cover letter for Mira Mace">
          <div className={styles.letterBody}>
            <p className={styles.paragraph}>Hola hola,</p>

            <p className={styles.paragraph}>
              My name is Matt Ruiz, and I am applying for the Senior AI Engineer — Voice & Agentic Systems role at Mira
              Mace. I want to join the team building production AI systems that can support patient activation, care
              coordination, prior authorizations, DME delivery, and the real conversations around healthcare work.
            </p>

            <p className={styles.paragraph}>
              I have built and shipped TypeScript, Next.js, React Native, Node.js, AWS, Firebase, Supabase/PostgreSQL,
              and real-time product systems since 2022. My AI work includes OpenAI and Claude integrations for chatbots,
              function calling, RAG-style flows, prompt engineering, and production inference across web, mobile, and
              backend services. I have also worked with Twilio real-time communication, CI/testing, Redux-heavy app
              state, and Salesforce workflow automation, which maps well to voice agents, advocate copilots, and
              workflow orchestration that needs to hold up outside demos.
            </p>

            <p className={styles.paragraph}>
              What stands out to me is the engineering loop in the posting: launch agents, measure quality across every
              interaction, capture product usage data, build feedback loops, and improve performance from real
              conversations. My field-operations background before college still affects how I build software: diagnose
              the workflow, instrument the system, ship something usable, then tighten it with evidence. That is how I
              would approach evaluation infrastructure, feedback-driven improvement, monitoring, and composing voice,
              workflow, and copilot agents into a unified AI Nurse experience.
            </p>

            <p className={styles.paragraph}>
              I am comfortable owning outcomes end to end and working directly with founders on technical direction. I
              would like to talk about how my production AI, TypeScript, AWS/PostgreSQL, and product-systems experience
              could help Mira Mace scale from early workflows to systems serving many more patients. What is the best
              next step in the hiring process?
            </p>

            <div className={styles.signoffBlock}>
              <p className={styles.paragraph}>Thanks,</p>
              <p className={styles.signature}>Matt Ruiz</p>
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
    mx-auto w-full max-w-[816px] bg-white px-8 py-10 shadow-sm ring-1 ring-slate-200
    sm:px-12 sm:py-12
    md:px-16 md:py-14
  `,
  letterBody: `
    mx-auto max-w-[640px] text-sm leading-relaxed text-slate-700
  `,
  paragraph: `
    mb-5 text-sm leading-relaxed text-slate-700
  `,
  signoffBlock: `
    pt-2
  `,
  signature: `
    text-sm font-semibold leading-relaxed text-slate-900
  `,
} as const;
