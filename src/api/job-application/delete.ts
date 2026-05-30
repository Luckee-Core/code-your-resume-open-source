import type { ApiResult } from "@/api/types";
import { requestApi } from "@/api/_shared/request-api";

/**
 * DELETE /api/data/job-application/delete?id=
 */
export const deleteJobApplicationApi = async (id: string): Promise<ApiResult<{ id: string }>> => {
  return requestApi<{ id: string }>(
    `/api/data/job-application/delete?id=${encodeURIComponent(id)}`,
    {
    method: "DELETE",
  });
};
