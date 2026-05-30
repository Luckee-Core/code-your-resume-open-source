import type { ApiResult } from "@/api/types";
import type { Job } from "@/model/job";
import { requestApi } from "@/api/_shared/request-api";

export type CreateJobBody = Pick<Job, "companyId" | "type" | "title" | "url" | "status">;

/**
 * POST /api/data/job/create
 */
export const createJobApi = async (body: CreateJobBody): Promise<ApiResult<Job>> => {
  return requestApi<Job>("/api/data/job/create", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
};
