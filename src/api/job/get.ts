import type { ApiResponse } from "@/api/types";
import type { Job } from "@/model/job";
import { parseApiJson } from "@/api/parse-api-json";

/**
 * GET /api/data/job/get?id=
 */
export const getJobApi = async (id: string): Promise<ApiResponse<Job>> => {
  const res = await fetch(`/api/data/job/get?id=${encodeURIComponent(id)}`);
  return parseApiJson<Job>(res);
};
