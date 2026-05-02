import type { ApiResponse } from "@/api/types";
import type { JobBulletRow } from "@/model/job";
import { parseApiJson } from "@/api/parse-api-json";

/**
 * GET /api/data/job-requirements/list?jobId=<id>
 */
export const listJobRequirementsApi = async (jobId: string): Promise<ApiResponse<JobBulletRow[]>> => {
  const res = await fetch(`/api/data/job-requirements/list?jobId=${encodeURIComponent(jobId)}`);
  return parseApiJson<JobBulletRow[]>(res);
};
