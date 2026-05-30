import type { ApiResult } from "@/api/types";
import { requestApi } from "@/api/_shared/request-api";

/**
 * DELETE /api/data/image-graphic/delete — removes one graphic from Express CRM JSON vault.
 */
export const deleteImageGraphicApi = async (graphicId: string): Promise<ApiResult<{ deleted: true }>> => {
  const params = new URLSearchParams({ id: graphicId });
  return requestApi<{ deleted: true }>(`/api/data/image-graphic/delete?${params.toString()}`, {
    method: "DELETE",
  });
};
