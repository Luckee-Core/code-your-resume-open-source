import type { ApiResponse } from "@/api/types";
import type { JobApplication } from "@/model/job-application";
import { parseApiJson } from "@/api/parse-api-json";

/**
 * GET /api/data/job-application/list
 */
export const listJobApplicationsApi = async (): Promise<ApiResponse<JobApplication[]>> => {
  const res = await fetch("/api/data/job-application/list");
  return parseApiJson<JobApplication[]>(res);
};
