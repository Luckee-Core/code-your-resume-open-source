import type { ApiResult } from "@/api/types";
import { requestApi } from "@/api/_shared/request-api";

/**
 * DELETE /api/data/job-questions/delete?id=
 */
export const deleteJobQuestionApi = async (id: string): Promise<ApiResult<{ id: string }>> => {
  return requestApi<{ id: string }>(`/api/data/job-questions/delete?id=${encodeURIComponent(id)}`, {
    method: "DELETE",
  });
};
