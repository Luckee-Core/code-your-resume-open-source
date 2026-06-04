import { updateJobQuestionApi } from "@/api/job-questions";
import type { AppThunk } from "@/store";
import { JobQuestionsActions } from "@/store/dumps/jobQuestions";

type Status = Promise<200 | 400 | 500>;

/**
 * Updates a job question prompt.
 */
export const updateJobQuestionThunk = (input: {
  id: string;
  prompt: string;
}): AppThunk<Status> => {
  return async (dispatch): Status => {
    const result = await updateJobQuestionApi(input);
    if (!result.success || !result.data) {
      return result.httpStatus === 400 ? 400 : 500;
    }
    dispatch(JobQuestionsActions.upsertJobQuestion(result.data));
    return 200;
  };
};
