import type { ApiResult } from "@/api/types";
import type { Employment } from "@/model/employment";
import { requestApi } from "@/api/_shared/request-api";

export type CreateEmploymentBody = Pick<Employment, "companyId" | "jobId" | "startDate" | "endDate">;

/**
 * POST /api/data/employment/create
 */
export const createEmploymentApi = async (
  body: CreateEmploymentBody,
): Promise<ApiResult<Employment>> => {
  return requestApi<Employment>("/api/data/employment/create", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
};
