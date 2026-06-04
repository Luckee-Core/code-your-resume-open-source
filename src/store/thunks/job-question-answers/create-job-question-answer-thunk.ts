import { createJobQuestionAnswerApi } from "@/api/job-question-answers";
import type { AppThunk } from "@/store";
import { JobQuestionAnswersActions } from "@/store/dumps/jobQuestionAnswers";

type Status = Promise<200 | 400 | 500>;

/**
 * Links a job to a question with an answer.
 */
export const createJobQuestionAnswerThunk = (input: {
  jobId: string;
  jobQuestionId: string;
  answer: string;
  sortOrder?: number;
}): AppThunk<Status> => {
  return async (dispatch): Status => {
    const result = await createJobQuestionAnswerApi(input);
    if (!result.success || !result.data) {
      return result.httpStatus === 400 ? 400 : 500;
    }
    dispatch(JobQuestionAnswersActions.upsertJobQuestionAnswer(result.data));
    return 200;
  };
};
