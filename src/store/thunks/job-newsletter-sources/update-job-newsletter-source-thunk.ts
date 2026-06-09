import { updateJobNewsletterSourceApi } from "@/api/job-newsletter-sources";
import type { UpdateJobNewsletterSourceBody } from "@/api/job-newsletter-sources";
import type { AppThunk } from "@/store";
import { JobNewsletterSourcesActions } from "@/store/dumps/jobNewsletterSources";
import { CurrentJobNewsletterSourceActions } from "@/store/current/currentJobNewsletterSource";

type Status = Promise<200 | 400 | 500>;

/**
 * Updates a job newsletter source row.
 */
export const updateJobNewsletterSourceThunk = (
  input: UpdateJobNewsletterSourceBody,
): AppThunk<Status> => {
  return async (dispatch, getState): Status => {
    const result = await updateJobNewsletterSourceApi(input);
    if (!result.success || !result.data) {
      return result.httpStatus === 400 ? 400 : 500;
    }
    dispatch(JobNewsletterSourcesActions.upsertJobNewsletterSource(result.data));
    const current = getState().currentJobNewsletterSource;
    if (current.id === result.data.id) {
      dispatch(CurrentJobNewsletterSourceActions.setCurrentJobNewsletterSource(result.data));
    }
    return 200;
  };
};
