import type { ApiResult } from "@/api/types";
import type { Company } from "@/model/company";
import { requestApi } from "@/api/_shared/request-api";

/**
 * GET /api/data/company/list — loads all companies from the CRM JSON vault (Express).
 */
export const listCompaniesApi = async (): Promise<ApiResult<Company[]>> => {
  return requestApi<Company[]>("/api/data/company/list");
};
