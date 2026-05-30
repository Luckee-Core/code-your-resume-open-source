import type { ApiResult } from "@/api/types";
import type { Employment } from "@/model/employment";
import { requestApi } from "@/api/_shared/request-api";

/**
 * GET /api/data/employment/get?id=
 */
export const getEmploymentApi = async (id: string): Promise<ApiResult<Employment>> => {
  const qs = new URLSearchParams({ id }).toString();
  return requestApi<Employment>(`/api/data/employment/get?${qs}`);
};
