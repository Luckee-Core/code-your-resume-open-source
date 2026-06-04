import type { ApiResult } from "@/api/types";
import type { JobQuestion } from "@/model/job-question";
import { requestApi } from "@/api/_shared/request-api";

export type CreateJobQuestionBody = Pick<JobQuestion, "prompt">;

/**
 * POST /api/data/job-questions/create
 */
export const createJobQuestionApi = async (
  body: CreateJobQuestionBody,
): Promise<ApiResult<JobQuestion>> => {
  return requestApi<JobQuestion>("/api/data/job-questions/create", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
};
