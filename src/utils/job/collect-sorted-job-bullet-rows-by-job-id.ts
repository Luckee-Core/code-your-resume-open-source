import type { JobBulletRow } from "@/model/job";

/**
 * Collect job bullet rows for one job from a normalized dump, sorted by sortOrder.
 *
 * @param dump - Redux map of job bullet rows (responsibilities, requirements, or nice-to-haves)
 * @param jobId - Current job id
 * @returns Rows in display order
 */
export const collectSortedJobBulletRowsByJobId = (
  dump: Record<string, JobBulletRow>,
  jobId: string,
): JobBulletRow[] => {
  if (!jobId.trim()) {
    return [];
  }
  return Object.values(dump)
    .filter((row) => row.jobId === jobId)
    .sort((a, b) => a.sortOrder - b.sortOrder);
};
