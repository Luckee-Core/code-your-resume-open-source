import type { ApiResponse } from "@/api/types";
import type { Company } from "@/model/company";
import { parseApiJson } from "@/api/parse-api-json";

/**
 * GET /api/data/company/list — loads all companies from the CRM JSON vault (Express).
 */
export const listCompaniesApi = async (): Promise<ApiResponse<Company[]>> => {
  const res = await fetch("/api/data/company/list");
  return parseApiJson<Company[]>(res);
};
