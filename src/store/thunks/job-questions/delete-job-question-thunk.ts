import { deleteJobQuestionApi } from "@/api/job-questions";
import type { AppThunk } from "@/store";
import { JobQuestionsActions } from "@/store/dumps/jobQuestions";

type Status = Promise<200 | 400 | 500>;

/**
 * Deletes a job question from the catalog.
 */
export const deleteJobQuestionThunk = (id: string): AppThunk<Status> => {
  return async (dispatch): Status => {
    const result = await deleteJobQuestionApi(id);
    if (!result.success) {
      return result.httpStatus === 400 ? 400 : 500;
    }
    dispatch(JobQuestionsActions.removeJobQuestion(id));
    return 200;
  };
};
