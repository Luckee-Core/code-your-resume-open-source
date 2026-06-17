import type { ApiResult } from "@/api/types";
import { requestApi } from "@/api/_shared/request-api";

/**
 * DELETE /api/data/project/delete?id=
 */
export const deleteProjectApi = async (id: string): Promise<ApiResult<void>> => {
  return requestApi<void>(`/api/data/project/delete?id=${encodeURIComponent(id)}`, {
    method: "DELETE",
  });
};
