import type { ApiResult } from "@/api/types";
import type { JobQuestionAnswer } from "@/model/job-question-answer";
import { requestApi } from "@/api/_shared/request-api";

export type CreateJobQuestionAnswerBody = Pick<
  JobQuestionAnswer,
  "jobId" | "jobQuestionId" | "answer"
> &
  Partial<Pick<JobQuestionAnswer, "sortOrder">>;

/**
 * POST /api/data/job-question-answers/create
 */
export const createJobQuestionAnswerApi = async (
  body: CreateJobQuestionAnswerBody,
): Promise<ApiResult<JobQuestionAnswer>> => {
  return requestApi<JobQuestionAnswer>("/api/data/job-question-answers/create", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
};
