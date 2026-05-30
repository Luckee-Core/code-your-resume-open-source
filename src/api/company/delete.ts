import type { ApiResult } from "@/api/types";
import { requestApi } from "@/api/_shared/request-api";

/**
 * DELETE /api/data/company/delete?id=
 */
export const deleteCompanyApi = async (id: string): Promise<ApiResult<{ id: string }>> => {
  return requestApi<{ id: string }>(`/api/data/company/delete?id=${encodeURIComponent(id)}`, {
    method: "DELETE",
  });
};
