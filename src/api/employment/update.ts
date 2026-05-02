import type { ApiResponse } from "@/api/types";
import type { Employment } from "@/model/employment";
import { parseApiJson } from "@/api/parse-api-json";

export type UpdateEmploymentBody = Pick<Employment, "id"> &
  Partial<Pick<Employment, "companyId" | "jobId" | "startDate" | "endDate">>;

/**
 * PATCH /api/data/employment/update
 */
export const updateEmploymentApi = async (
  body: UpdateEmploymentBody,
): Promise<ApiResponse<Employment>> => {
  const res = await fetch("/api/data/employment/update", {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  return parseApiJson<Employment>(res);
};
