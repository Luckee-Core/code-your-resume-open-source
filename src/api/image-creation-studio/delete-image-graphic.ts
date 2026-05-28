import type { ApiResponse } from "@/api/types";
import { parseApiJson } from "@/api/parse-api-json";

/**
 * DELETE /api/data/image-graphic/delete — removes one graphic from Express CRM JSON vault.
 */
export const deleteImageGraphicApi = async (graphicId: string): Promise<ApiResponse<{ deleted: true }>> => {
  const params = new URLSearchParams({ id: graphicId });
  const res = await fetch(`/api/data/image-graphic/delete?${params.toString()}`, {
    method: "DELETE",
  });
  return parseApiJson<{ deleted: true }>(res);
};
