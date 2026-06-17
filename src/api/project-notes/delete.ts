import type { ApiResult } from "@/api/types";
import { requestApi } from "@/api/_shared/request-api";

/**
 * DELETE /api/data/project-notes/delete?id=
 */
export const deleteProjectNoteApi = async (id: string): Promise<ApiResult<void>> => {
  return requestApi<void>(`/api/data/project-notes/delete?id=${encodeURIComponent(id)}`, {
    method: "DELETE",
  });
};
