import type { ApiResult } from "@/api/types";
import { requestApi } from "@/api/_shared/request-api";

/**
 * DELETE /api/data/employee/delete?id=
 */
export const deleteEmployeeApi = async (id: string): Promise<ApiResult<{ id: string }>> => {
  return requestApi<{ id: string }>(`/api/data/employee/delete?id=${encodeURIComponent(id)}`, {
    method: "DELETE",
  });
};
