import type { ApiResult } from "@/api/types";
import type { JobBulletRow } from "@/model/job";
import { requestApi } from "@/api/_shared/request-api";

/**
 * GET /api/data/job-requirements/list?jobId=<id>
 */
export const listJobRequirementsApi = async (jobId: string): Promise<ApiResult<JobBulletRow[]>> => {
  return requestApi<JobBulletRow[]>(`/api/data/job-requirements/list?jobId=${encodeURIComponent(jobId)}`);
};
