import type { ApiResponse } from "@/api/types";
import type { Job } from "@/model/job";
import { parseApiJson } from "@/api/parse-api-json";

export type CreateJobBody = Pick<Job, "companyId" | "type" | "title" | "url" | "status">;

/**
 * POST /api/data/job/create
 */
export const createJobApi = async (body: CreateJobBody): Promise<ApiResponse<Job>> => {
  const res = await fetch("/api/data/job/create", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  return parseApiJson<Job>(res);
};
