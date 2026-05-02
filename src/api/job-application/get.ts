import type { ApiResponse } from "@/api/types";
import type { JobApplication } from "@/model/job-application";
import { parseApiJson } from "@/api/parse-api-json";

/**
 * GET /api/data/job-application/get?id=
 */
export const getJobApplicationApi = async (id: string): Promise<ApiResponse<JobApplication>> => {
  const res = await fetch(
    `/api/data/job-application/get?id=${encodeURIComponent(id)}`,
  );
  return parseApiJson<JobApplication>(res);
};
