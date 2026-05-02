import { listJobResponsibilitiesApi } from "@/api/job-responsibilities";
import { listJobRequirementsApi } from "@/api/job-requirements";
import { listJobNiceToHavesApi } from "@/api/job-nice-to-haves";
import type { AppThunk } from "@/store";
import { JobResponsibilitiesActions } from "@/store/dumps/jobResponsibilities";
import { JobRequirementsActions } from "@/store/dumps/jobRequirements";
import { JobNiceToHavesActions } from "@/store/dumps/jobNiceToHaves";

type Status = Promise<200 | 400 | 500>;

/**
 * Loads responsibility, requirement, and nice-to-have bullet rows for a single job
 * from Supabase (via Express) and upserts them into their respective Redux dumps.
 *
 * Call this whenever the current job changes on the job detail page.
 */
export const loadJobBulletsThunk = (jobId: string): AppThunk<Status> => {
  return async (dispatch): Status => {
    if (!jobId) return 400;

    const [resp, req, nth] = await Promise.all([
      listJobResponsibilitiesApi(jobId),
      listJobRequirementsApi(jobId),
      listJobNiceToHavesApi(jobId),
    ]);

    console.log("[loadJobBulletsThunk]", {
      jobId,
      responsibilitiesOk: resp.success,
      responsibilitiesCount: resp.data?.length ?? 0,
      requirementsOk: req.success,
      requirementsCount: req.data?.length ?? 0,
      niceToHavesOk: nth.success,
      niceToHavesCount: nth.data?.length ?? 0,
    });

    if (resp.success && resp.data) {
      dispatch(JobResponsibilitiesActions.upsertJobResponsibilities(resp.data));
    }
    if (req.success && req.data) {
      dispatch(JobRequirementsActions.upsertJobRequirements(req.data));
    }
    if (nth.success && nth.data) {
      dispatch(JobNiceToHavesActions.upsertJobNiceToHaves(nth.data));
    }

    return 200;
  };
};
