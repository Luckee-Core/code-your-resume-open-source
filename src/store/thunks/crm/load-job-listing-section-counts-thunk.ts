import { listJobListingSectionCountsApi } from "@/api/job/list-section-counts";
import type { JobListingSectionCounts } from "@/model/job-listing-section-counts";
import type { AppThunk } from "@/store";
import { JobListingSectionCountsActions } from "@/store/dumps/jobListingSectionCounts";

type Status = Promise<200 | 400 | 500>;

/**
 * Loads per-job responsibility / requirement / nice-to-have counts for the jobs list.
 */
export const loadJobListingSectionCountsThunk = (): AppThunk<Status> => {
  return async (dispatch): Status => {
    const result = await listJobListingSectionCountsApi();
    if (!result.success || !result.data) {
      return result.httpStatus >= 500 ? 500 : 400;
    }

    const byJobId: Record<string, JobListingSectionCounts> = {};
    for (const row of result.data) {
      byJobId[row.jobId] = {
        responsibilitiesCount: row.responsibilitiesCount,
        requirementsCount: row.requirementsCount,
        niceToHavesCount: row.niceToHavesCount,
      };
    }

    dispatch(JobListingSectionCountsActions.setJobListingSectionCounts(byJobId));
    return 200;
  };
};
