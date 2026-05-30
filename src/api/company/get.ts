import type { ApiResult } from "@/api/types";
import type { Company } from "@/model/company";
import { requestApi } from "@/api/_shared/request-api";

/**
 * GET /api/data/company/get?id=
 */
export const getCompanyApi = async (id: string): Promise<ApiResult<Company>> => {
  return requestApi<Company>(`/api/data/company/get?id=${encodeURIComponent(id)}`);
};
