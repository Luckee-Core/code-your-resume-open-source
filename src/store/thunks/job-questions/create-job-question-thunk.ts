import { createJobQuestionApi } from "@/api/job-questions";
import type { AppThunk } from "@/store";
import { JobQuestionsActions } from "@/store/dumps/jobQuestions";

type Status = Promise<200 | 400 | 500>;

/**
 * Creates a standalone job question row.
 */
export const createJobQuestionThunk = (input: { prompt: string }): AppThunk<Status> => {
  return async (dispatch): Status => {
    const result = await createJobQuestionApi(input);
    if (!result.success || !result.data) {
      return result.httpStatus === 400 ? 400 : 500;
    }
    dispatch(JobQuestionsActions.upsertJobQuestion(result.data));
    return 200;
  };
};
