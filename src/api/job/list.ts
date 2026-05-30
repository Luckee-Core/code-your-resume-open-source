import type { ApiResult } from "@/api/types";
import type { Job } from "@/model/job";
import { requestApi } from "@/api/_shared/request-api";

/**
 * GET /api/data/job/list
 */
export const listJobsApi = async (): Promise<ApiResult<Job[]>> => {
  return requestApi<Job[]>("/api/data/job/list");
};
