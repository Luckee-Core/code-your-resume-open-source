import { deleteJobQuestionAnswerApi } from "@/api/job-question-answers";
import type { AppThunk } from "@/store";
import { JobQuestionAnswersActions } from "@/store/dumps/jobQuestionAnswers";

type Status = Promise<200 | 400 | 500>;

/**
 * Removes a job question answer (unlink from job).
 */
export const deleteJobQuestionAnswerThunk = (id: string): AppThunk<Status> => {
  return async (dispatch): Status => {
    const result = await deleteJobQuestionAnswerApi(id);
    if (!result.success) {
      return result.httpStatus === 400 ? 400 : 500;
    }
    dispatch(JobQuestionAnswersActions.removeJobQuestionAnswer(id));
    return 200;
  };
};
