import type { JobBulletRow } from "@/model/job";

/**
 * Collect bullet body text for one job from a normalized job-bullet dump, sorted by sortOrder.
 *
 * @param dump - Redux map of job bullet rows (responsibilities, requirements, or nice-to-haves)
 * @param jobId - Current job id
 * @returns Non-empty body strings in display order
 */
export const collectSortedJobBulletBodies = (
  dump: Record<string, JobBulletRow>,
  jobId: string,
): string[] => {
  if (!jobId.trim()) {
    return [];
  }
  return Object.values(dump)
    .filter((row) => row.jobId === jobId && row.body.trim())
    .sort((a, b) => a.sortOrder - b.sortOrder)
    .map((row) => row.body.trim());
};
