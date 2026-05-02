import type { ApiResponse } from "@/api/types";
import { parseApiJson } from "@/api/parse-api-json";

/**
 * DELETE /api/data/company/delete?id=
 */
export const deleteCompanyApi = async (id: string): Promise<ApiResponse<{ id: string }>> => {
  const res = await fetch(`/api/data/company/delete?id=${encodeURIComponent(id)}`, {
    method: "DELETE",
  });
  return parseApiJson<{ id: string }>(res);
};
