import { createJobQuestionApi } from "@/api/job-questions";
import { createJobQuestionAnswerApi } from "@/api/job-question-answers";
import type { AppThunk } from "@/store";
import { JobQuestionsActions } from "@/store/dumps/jobQuestions";
import { JobQuestionAnswersActions } from "@/store/dumps/jobQuestionAnswers";

type Status = Promise<200 | 400 | 500>;

/**
 * Creates a standalone question and links it to a job with an answer.
 */
export const createJobQuestionWithAnswerForJobThunk = (input: {
  jobId: string;
  prompt: string;
  answer: string;
}): AppThunk<Status> => {
  return async (dispatch): Status => {
    const qResult = await createJobQuestionApi({ prompt: input.prompt });
    if (!qResult.success || !qResult.data) {
      return qResult.httpStatus === 400 ? 400 : 500;
    }
    dispatch(JobQuestionsActions.upsertJobQuestion(qResult.data));

    const aResult = await createJobQuestionAnswerApi({
      jobId: input.jobId,
      jobQuestionId: qResult.data.id,
      answer: input.answer,
    });
    if (!aResult.success || !aResult.data) {
      return aResult.httpStatus === 400 ? 400 : 500;
    }
    dispatch(JobQuestionAnswersActions.upsertJobQuestionAnswer(aResult.data));
    return 200;
  };
};
