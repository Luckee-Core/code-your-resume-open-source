import type { ApiResponse } from "@/api/types";
import type { JobBulletRow } from "@/model/job";
import { parseApiJson } from "@/api/parse-api-json";

/**
 * GET /api/data/job-responsibilities/list?jobId=<id>
 */
export const listJobResponsibilitiesApi = async (jobId: string): Promise<ApiResponse<JobBulletRow[]>> => {
  const res = await fetch(`/api/data/job-responsibilities/list?jobId=${encodeURIComponent(jobId)}`);
  return parseApiJson<JobBulletRow[]>(res);
};
