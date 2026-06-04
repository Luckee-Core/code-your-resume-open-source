import type { ApiResult } from "@/api/types";
import type { JobQuestion } from "@/model/job-question";
import { requestApi } from "@/api/_shared/request-api";

export type UpdateJobQuestionBody = Pick<JobQuestion, "id"> & Partial<Pick<JobQuestion, "prompt">>;

/**
 * PATCH /api/data/job-questions/update
 */
export const updateJobQuestionApi = async (
  body: UpdateJobQuestionBody,
): Promise<ApiResult<JobQuestion>> => {
  return requestApi<JobQuestion>("/api/data/job-questions/update", {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
};
