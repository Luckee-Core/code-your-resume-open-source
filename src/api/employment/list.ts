import type { ApiResult } from "@/api/types";
import type { Employment } from "@/model/employment";
import { requestApi } from "@/api/_shared/request-api";

/**
 * GET /api/data/employment/list
 */
export const listEmploymentsApi = async (): Promise<ApiResult<Employment[]>> => {
  return requestApi<Employment[]>("/api/data/employment/list");
};
