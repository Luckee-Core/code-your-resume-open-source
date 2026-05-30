import type { ApiResult } from "@/api/types";
import type { Employment } from "@/model/employment";
import { requestApi } from "@/api/_shared/request-api";

export type UpdateEmploymentBody = Pick<Employment, "id"> &
  Partial<Pick<Employment, "companyId" | "jobId" | "startDate" | "endDate">>;

/**
 * PATCH /api/data/employment/update
 */
export const updateEmploymentApi = async (
  body: UpdateEmploymentBody,
): Promise<ApiResult<Employment>> => {
  return requestApi<Employment>("/api/data/employment/update", {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
};
