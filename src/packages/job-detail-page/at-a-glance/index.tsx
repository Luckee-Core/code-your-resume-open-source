"use client";

import { useAppSelector } from "@/store";
import { crmDetailPageTokens as t } from "@/packages/crm-detail-ui";

export const AtAGlanceSection = () => {
  const job = useAppSelector((s) => s.currentJob);
  const hasDescription = job.description.trim() !== "";

  return (
    <section className={styles.card} aria-labelledby="crm-job-at-a-glance-heading">
      <h2 id="crm-job-at-a-glance-heading" className={styles.cardTitle}>
        At a glance
      </h2>
      {hasDescription ? (
        <p className={styles.body}>{job.description}</p>
      ) : (
        <p className={styles.empty}>
          Import the job listing to generate an AI summary.
        </p>
      )}
    </section>
  );
};

const styles = {
  card: t.researchCard,
  cardTitle: t.researchCardTitle,
  body: `text-sm leading-relaxed text-gray-800 whitespace-pre-wrap`,
  empty: `text-sm text-gray-400 italic`,
};
