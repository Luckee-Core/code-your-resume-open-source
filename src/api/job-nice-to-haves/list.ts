import type { ApiResult } from "@/api/types";
import type { JobBulletRow } from "@/model/job";
import { requestApi } from "@/api/_shared/request-api";

/**
 * GET /api/data/job-nice-to-haves/list?jobId=<id>
 */
export const listJobNiceToHavesApi = async (jobId: string): Promise<ApiResult<JobBulletRow[]>> => {
  return requestApi<JobBulletRow[]>(`/api/data/job-nice-to-haves/list?jobId=${encodeURIComponent(jobId)}`);
};
