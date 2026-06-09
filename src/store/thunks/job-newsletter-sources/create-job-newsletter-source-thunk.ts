import { createJobNewsletterSourceApi } from "@/api/job-newsletter-sources";
import type { CreateJobNewsletterSourceBody } from "@/api/job-newsletter-sources";
import type { AppThunk } from "@/store";
import { JobNewsletterSourcesActions } from "@/store/dumps/jobNewsletterSources";

type Status = Promise<200 | 400 | 500>;

/**
 * Creates a job newsletter source row.
 */
export const createJobNewsletterSourceThunk = (
  input: CreateJobNewsletterSourceBody,
): AppThunk<Status> => {
  return async (dispatch): Status => {
    const result = await createJobNewsletterSourceApi(input);
    if (!result.success || !result.data) {
      return result.httpStatus === 400 ? 400 : 500;
    }
    dispatch(JobNewsletterSourcesActions.upsertJobNewsletterSource(result.data));
    return 200;
  };
};
