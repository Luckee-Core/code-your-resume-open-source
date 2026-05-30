import type { ApiResult } from "@/api/types";
import type { Company } from "@/model/company";
import { requestApi } from "@/api/_shared/request-api";

export type CreateCompanyBody = Pick<Company, "name" | "website" | "notes">;

/**
 * POST /api/data/company/create — creates a company row.
 */
export const createCompanyApi = async (body: CreateCompanyBody): Promise<ApiResult<Company>> => {
  return requestApi<Company>("/api/data/company/create", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
};
