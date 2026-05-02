import type { ApiResponse } from "@/api/types";
import type { Employment } from "@/model/employment";
import { parseApiJson } from "@/api/parse-api-json";

export type CreateEmploymentBody = Pick<Employment, "companyId" | "jobId" | "startDate" | "endDate">;

/**
 * POST /api/data/employment/create
 */
export const createEmploymentApi = async (
  body: CreateEmploymentBody,
): Promise<ApiResponse<Employment>> => {
  const res = await fetch("/api/data/employment/create", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  return parseApiJson<Employment>(res);
};
