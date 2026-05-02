import type { ApiResponse } from "@/api/types";
import type { Company } from "@/model/company";
import { parseApiJson } from "@/api/parse-api-json";

/**
 * GET /api/data/company/get?id=
 */
export const getCompanyApi = async (id: string): Promise<ApiResponse<Company>> => {
  const res = await fetch(`/api/data/company/get?id=${encodeURIComponent(id)}`);
  return parseApiJson<Company>(res);
};
