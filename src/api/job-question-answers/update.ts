import type { ApiResult } from "@/api/types";
import type { JobQuestionAnswer } from "@/model/job-question-answer";
import { requestApi } from "@/api/_shared/request-api";

export type UpdateJobQuestionAnswerBody = Pick<JobQuestionAnswer, "id"> &
  Partial<Pick<JobQuestionAnswer, "answer" | "sortOrder">>;

/**
 * PATCH /api/data/job-question-answers/update
 */
export const updateJobQuestionAnswerApi = async (
  body: UpdateJobQuestionAnswerBody,
): Promise<ApiResult<JobQuestionAnswer>> => {
  return requestApi<JobQuestionAnswer>("/api/data/job-question-answers/update", {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
};
