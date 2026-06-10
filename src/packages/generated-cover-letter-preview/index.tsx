"use client";

import React from "react";

export default function GeneratedCoverLetterPreview() {
  return (
    <main className={styles.canvas}>
      <article className={styles.paper} aria-label="Cover letter">
        <p className={styles.date}>June 10, 2026</p>

        <div className={styles.letter}>
          <p>Hola hola,</p>

          <p>
            My name is Matt Ruiz, and I am applying for the Senior Full Stack
            Engineer role at Bloom Growth™. I want to join your engineering
            team and help build reliable TypeScript and React products with the
            practical delivery habits this role calls for.
          </p>

          <p>
            I have spent the last several years building and shipping full-stack
            mobile and web products with TypeScript, React, React Native,
            Node.js, Firebase, Supabase, Stripe, Twilio, MapBox, and cloud
            deployments on AWS, GCP, and Vercel. That background lines up with
            designing scalable applications, maintaining high code quality, and
            working with product, design, and business stakeholders to turn
            requirements into shipped software.
          </p>

          <p>
            I am also comfortable on the DevOps side of the stack: CI and
            testing patterns, automated deployment, containerization, cloud
            platforms, and infrastructure-aware engineering. I have used AI
            coding tools in day-to-day development and integrated OpenAI and
            Claude APIs into production systems, so I treat AI as a practical
            way to improve velocity while still reviewing security, reliability,
            and maintainability closely.
          </p>

          <p>
            Before software, I spent weekends and summers in a family
            contracting business doing electrical and field operations work.
            That still shapes my engineering habits: clear communication,
            iterative delivery, careful reviews, and a bias toward outcomes. I
            am based in Philly, within the role&rsquo;s U.S. location constraints,
            and I would like to talk about the role and next steps in the hiring
            process.
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
