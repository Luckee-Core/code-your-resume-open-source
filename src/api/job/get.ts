import type { ApiResult } from "@/api/types";
import type { Job } from "@/model/job";
import { requestApi } from "@/api/_shared/request-api";

/**
 * GET /api/data/job/get?id=
 */
export const getJobApi = async (id: string): Promise<ApiResult<Job>> => {
  return requestApi<Job>(`/api/data/job/get?id=${encodeURIComponent(id)}`);
};
