import type { ApiResult } from "@/api/types";
import { requestApi } from "@/api/_shared/request-api";

/**
 * DELETE /api/data/job/delete?id=
 */
export const deleteJobApi = async (id: string): Promise<ApiResult<{ id: string }>> => {
  return requestApi<{ id: string }>(`/api/data/job/delete?id=${encodeURIComponent(id)}`, {
    method: "DELETE",
  });
};
