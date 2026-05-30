import type { ApiResult } from "@/api/types";
import type { Company } from "@/model/company";
import { requestApi } from "@/api/_shared/request-api";

export type UpdateCompanyBody = { id: string } & Partial<Pick<Company, "name" | "website" | "notes">>;

/**
 * PATCH /api/data/company/update
 */
export const updateCompanyApi = async (body: UpdateCompanyBody): Promise<ApiResult<Company>> => {
  return requestApi<Company>("/api/data/company/update", {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
};
