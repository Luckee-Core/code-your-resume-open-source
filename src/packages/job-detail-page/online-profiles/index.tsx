"use client";

import { Link2 } from "lucide-react";
import { useAppSelector } from "@/store";
import { crmDetailPageTokens as t } from "@/packages/crm-detail-ui";

export const OnlineProfilesSection = () => {
  const job = useAppSelector((s) => s.currentJob);
  const href = job.url ? (job.url.startsWith("http") ? job.url : `https://${job.url}`) : "";

  return (
    <section className={styles.card} aria-labelledby="crm-job-links-heading">
      <div className={styles.cardHeader}>
        <Link2 className={styles.icon} aria-hidden />
        <h2 id="crm-job-links-heading" className={styles.cardTitle}>
          Links
        </h2>
      </div>
      <div className={styles.grid}>
        {href ? (
          <a className={styles.chip} href={href} target="_blank" rel="noreferrer">
            Job posting
          </a>
        ) : (
          <span className={styles.muted}>No posting URL on this job yet.</span>
        )}
      </div>
    </section>
  );
};

const styles = {
  card: t.researchCard,
  cardHeader: t.onlineProfilesCardHeader,
  icon: t.onlineProfilesIcon,
  cardTitle: t.researchCardTitle,
  grid: t.profileChipGrid,
  chip: t.chipLink,
  muted: `text-sm text-gray-500`,
};
