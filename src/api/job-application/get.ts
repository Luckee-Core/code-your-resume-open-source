import type { ApiResult } from "@/api/types";
import type { JobApplication } from "@/model/job-application";
import { requestApi } from "@/api/_shared/request-api";

/**
 * GET /api/data/job-application/get?id=
 */
export const getJobApplicationApi = async (id: string): Promise<ApiResult<JobApplication>> => {
  return requestApi<JobApplication>(
    `/api/data/job-application/get?id=${encodeURIComponent(id)}`,
  );
};
