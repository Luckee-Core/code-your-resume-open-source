import type { ApiResult } from "@/api/types";
import type { JobApplication } from "@/model/job-application";
import { requestApi } from "@/api/_shared/request-api";

/**
 * GET /api/data/job-application/list
 */
export const listJobApplicationsApi = async (): Promise<ApiResult<JobApplication[]>> => {
  return requestApi<JobApplication[]>("/api/data/job-application/list");
};
