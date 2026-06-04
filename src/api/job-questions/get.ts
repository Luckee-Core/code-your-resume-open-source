import type { ApiResult } from "@/api/types";
import type { JobQuestion } from "@/model/job-question";
import { requestApi } from "@/api/_shared/request-api";

/**
 * GET /api/data/job-questions/get?id=
 */
export const getJobQuestionApi = async (id: string): Promise<ApiResult<JobQuestion>> => {
  return requestApi<JobQuestion>(`/api/data/job-questions/get?id=${encodeURIComponent(id)}`);
};
