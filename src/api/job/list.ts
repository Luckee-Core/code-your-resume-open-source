import type { ApiResponse } from "@/api/types";
import type { Job } from "@/model/job";
import { parseApiJson } from "@/api/parse-api-json";

/**
 * GET /api/data/job/list
 */
export const listJobsApi = async (): Promise<ApiResponse<Job[]>> => {
  const res = await fetch("/api/data/job/list");
  return parseApiJson<Job[]>(res);
};
