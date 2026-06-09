"use client";

import React from "react";

export default function GeneratedCoverLetterPreview() {
  return (
    <React.Fragment>
      <main className={styles.page}>
        <article className={styles.paper} aria-label="Software Engineer cover letter for Elementl Power">
          <div className={styles.letter}>
            <p className={styles.salutation}>Hola hola,</p>

            <p className={styles.paragraph}>
              My name is Matt Ruiz, and I am applying for the Software Engineer role at Elementl Power. I want to join
              the team building production AI agents, operational data systems, dashboards, and cloud infrastructure
              with clear ownership.
            </p>

            <p className={styles.paragraph}>
              My strongest fit is the builder side of the job. I have shipped TypeScript, Node.js, Next.js, and React
              Native products with real-time backends, authentication, payments, mapping, video, CI/testing, and
              production deployments on GCP, AWS, and Vercel. I have also integrated Anthropic Claude and OpenAI APIs
              for chatbots, embeddings, function calling, RAG-style retrieval, and real-time inference, which maps
              directly to building agents with tool use, retrieval, failure handling, observability, and cost awareness.
            </p>

            <p className={styles.paragraph}>
              The responsibilities in this role are specific: Google ADK agents on GCP, Claude workflows and plugins,
              MCP servers, APIs, event triggers, scheduled jobs, ETL pipelines, token and adoption monitoring, data lake
              source-system landing with dictionaries and freshness SLAs, Power BI reporting, Terraform, GitHub Actions,
              and logging, tracing, alerting, rollback, and cost monitoring. I have shipped the product, backend,
              integration, and dashboard pieces around those patterns, and I bring a practical style shaped by early
              electrical and field operations work before college.
            </p>

            <p className={styles.paragraph}>
              I also understand this is a regulated engineering seat. I would treat access reviews, configuration
              baselines, security monitoring, identity automation, incident postmortems, and controlled data handling
              under 10 CFR Part 810 as part of the system, not paperwork after the fact. My time at Revature also gave
              me experience coordinating with larger dev groups, training teams, and improving process without losing
              sight of delivery.
            </p>

            <p className={styles.paragraph}>
              If the background is useful, I would like to talk about the role, the first systems this hire will own,
              and the next step in the hiring process.
            </p>

            <p className={styles.closing}>Thanks,</p>
            <p className={styles.signature}>Matt Ruiz</p>
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
    mx-auto flex min-h-[calc(100vh-3rem)] w-full max-w-[816px] flex-col bg-white px-8 py-8 shadow-sm ring-1 ring-slate-200
    sm:min-h-[calc(100vh-4rem)] sm:px-12 sm:py-10
    md:px-16 md:py-14
  `,
  letter: `
    mx-auto w-full max-w-[650px] text-sm leading-relaxed text-slate-700
  `,
  salutation: `
    text-sm leading-relaxed text-slate-950
  `,
  paragraph: `
    mt-4 text-sm leading-relaxed text-slate-700
  `,
  closing: `
    mt-6 text-sm leading-relaxed text-slate-800
  `,
  signature: `
    mt-1 text-sm font-medium text-slate-950
  `,
} as const;
