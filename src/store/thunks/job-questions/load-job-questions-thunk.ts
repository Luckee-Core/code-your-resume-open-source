import { listJobQuestionsApi } from "@/api/job-questions";
import type { AppThunk } from "@/store";
import { JobQuestionsActions } from "@/store/dumps/jobQuestions";

type Status = Promise<200 | 400 | 500>;

/**
 * Loads all job questions into the Redux dump.
 */
export const loadJobQuestionsThunk = (): AppThunk<Status> => {
  return async (dispatch): Status => {
    const result = await listJobQuestionsApi();
    if (!result.success || !result.data) {
      return result.httpStatus === 400 ? 400 : 500;
    }
    dispatch(JobQuestionsActions.upsertJobQuestions(result.data));
    return 200;
  };
};
