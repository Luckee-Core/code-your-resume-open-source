"use client";

import type { Job } from "@/model/job";
import type { JobListingSectionCounts } from "@/model/job-listing-section-counts";

type JobListingImportStatusCellProps = {
  job: Job;
  counts: JobListingSectionCounts | undefined;
};

const emptyCounts: JobListingSectionCounts = {
  responsibilitiesCount: 0,
  requirementsCount: 0,
  niceToHavesCount: 0,
};

/**
 * Listing import status: section row counts (R · Req · NTH) or not-run / empty states.
 */
export const JobListingImportStatusCell = ({
  job,
  counts,
}: JobListingImportStatusCellProps) => {
  const c = counts ?? emptyCounts;
  const total = c.responsibilitiesCount + c.requirementsCount + c.niceToHavesCount;
  const imported = Boolean(job.listingImportedAt?.trim());

  if (!imported && total === 0) {
    return <span className={styles.muted}>—</span>;
  }

  if (imported && total === 0) {
    return (
      <span className={styles.empty} title="Listing import ran but no sections were extracted">
        Empty
      </span>
    );
  }

  const label = `${c.responsibilitiesCount} · ${c.requirementsCount} · ${c.niceToHavesCount}`;
  const title = `Responsibilities · Requirements · Nice-to-haves (${job.listingImportedAt || "imported"})`;

  return (
    <span className={styles.ok} title={title}>
      {label}
    </span>
  );
};

const styles = {
  muted: `text-gray-400 tabular-nums`,
  empty: `text-amber-700 font-medium`,
  ok: `text-gray-800 tabular-nums font-medium`,
};
