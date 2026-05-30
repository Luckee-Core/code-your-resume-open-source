import type { ApiResult } from "@/api/types";
import { requestApi } from "@/api/_shared/request-api";

/**
 * DELETE /api/data/employment/delete?id=
 */
export const deleteEmploymentApi = async (id: string): Promise<ApiResult<{ id: string }>> => {
  const qs = new URLSearchParams({ id }).toString();
  return requestApi<{ id: string }>(`/api/data/employment/delete?${qs}`, { method: "DELETE" });
};
