import { updateJobQuestionAnswerApi } from "@/api/job-question-answers";
import type { AppThunk } from "@/store";
import { JobQuestionAnswersActions } from "@/store/dumps/jobQuestionAnswers";

type Status = Promise<200 | 400 | 500>;

/**
 * Updates a job-specific answer row.
 */
export const updateJobQuestionAnswerThunk = (input: {
  id: string;
  answer?: string;
  sortOrder?: number;
}): AppThunk<Status> => {
  return async (dispatch): Status => {
    const result = await updateJobQuestionAnswerApi(input);
    if (!result.success || !result.data) {
      return result.httpStatus === 400 ? 400 : 500;
    }
    dispatch(JobQuestionAnswersActions.upsertJobQuestionAnswer(result.data));
    return 200;
  };
};
