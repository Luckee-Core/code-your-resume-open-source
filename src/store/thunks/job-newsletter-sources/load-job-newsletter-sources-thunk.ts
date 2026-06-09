import { listJobNewsletterSourcesApi } from "@/api/job-newsletter-sources";
import type { AppThunk } from "@/store";
import { JobNewsletterSourcesActions } from "@/store/dumps/jobNewsletterSources";

type Status = Promise<200 | 400 | 500>;

/**
 * Loads all job newsletter sources into the Redux dump.
 */
export const loadJobNewsletterSourcesThunk = (): AppThunk<Status> => {
  return async (dispatch): Status => {
    const result = await listJobNewsletterSourcesApi();
    if (!result.success || !result.data) {
      return result.httpStatus === 400 ? 400 : 500;
    }
    dispatch(JobNewsletterSourcesActions.upsertJobNewsletterSources(result.data));
    return 200;
  };
};
