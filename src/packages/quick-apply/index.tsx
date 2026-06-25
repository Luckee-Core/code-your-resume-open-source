"use client";

import { QuickApplyForm } from "./form";

/**
 * Dashboard quick-apply section: company + job URLs → scrape → resume.
 */
export const QuickApplySection = () => {
  return (
    <section className={styles.section} aria-labelledby="quick-apply-heading">
      <div className={styles.header}>
        <h2 id="quick-apply-heading" className={styles.title}>
          Quick apply
        </h2>
        <p className={styles.subtitle}>
          Paste the company site and job posting URL. We scrape both, create CRM rows, and queue a tailored resume.
        </p>
      </div>
      <QuickApplyForm />
    </section>
  );
};

const styles = {
  section: `
    mx-4 mb-4 mt-2 rounded-xl border border-gray-200 bg-white px-5 py-5 shadow-sm
  `,
  header: `mb-4 flex flex-col gap-1`,
  title: `text-base font-semibold text-gray-900`,
  subtitle: `text-sm text-gray-600`,
};
