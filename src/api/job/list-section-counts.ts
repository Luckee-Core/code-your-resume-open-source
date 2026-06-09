import type { ApiResult } from "@/api/types";
import { requestApi } from "@/api/_shared/request-api";
import type { JobListingSectionCounts } from "@/model/job-listing-section-counts";

export type JobListingSectionCountsRow = JobListingSectionCounts & {
  jobId: string;
};

/**
 * GET /api/data/job/list-section-counts — per-job listing section row counts.
 */
export const listJobListingSectionCountsApi = async (): Promise<
  ApiResult<JobListingSectionCountsRow[]>
> => {
  return requestApi<JobListingSectionCountsRow[]>("/api/data/job/list-section-counts");
};
