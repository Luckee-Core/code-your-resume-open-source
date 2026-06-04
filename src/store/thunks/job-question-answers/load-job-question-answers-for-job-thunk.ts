import { listJobQuestionAnswersApi } from "@/api/job-question-answers";
import type { AppThunk } from "@/store";
import { JobQuestionAnswersActions } from "@/store/dumps/jobQuestionAnswers";

type Status = Promise<200 | 400 | 500>;

/**
 * Loads job question answers for one job and syncs the dump for that job.
 */
export const loadJobQuestionAnswersForJobThunk = (jobId: string): AppThunk<Status> => {
  return async (dispatch): Status => {
    if (!jobId) return 400;

    const result = await listJobQuestionAnswersApi(jobId);
    if (!result.success || !result.data) {
      return result.httpStatus === 400 ? 400 : 500;
    }

    dispatch(JobQuestionAnswersActions.removeJobQuestionAnswersForJob(jobId));
    dispatch(JobQuestionAnswersActions.upsertJobQuestionAnswers(result.data));
    return 200;
  };
};
