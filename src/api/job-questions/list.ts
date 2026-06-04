import type { ApiResult } from "@/api/types";
import type { JobQuestion } from "@/model/job-question";
import { requestApi } from "@/api/_shared/request-api";

/**
 * GET /api/data/job-questions/list
 */
export const listJobQuestionsApi = async (): Promise<ApiResult<JobQuestion[]>> => {
  return requestApi<JobQuestion[]>("/api/data/job-questions/list");
};
