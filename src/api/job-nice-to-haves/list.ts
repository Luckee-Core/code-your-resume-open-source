import type { ApiResponse } from "@/api/types";
import type { JobBulletRow } from "@/model/job";
import { parseApiJson } from "@/api/parse-api-json";

/**
 * GET /api/data/job-nice-to-haves/list?jobId=<id>
 */
export const listJobNiceToHavesApi = async (jobId: string): Promise<ApiResponse<JobBulletRow[]>> => {
  const res = await fetch(`/api/data/job-nice-to-haves/list?jobId=${encodeURIComponent(jobId)}`);
  return parseApiJson<JobBulletRow[]>(res);
};
