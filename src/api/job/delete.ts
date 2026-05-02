import type { ApiResponse } from "@/api/types";
import { parseApiJson } from "@/api/parse-api-json";

/**
 * DELETE /api/data/job/delete?id=
 */
export const deleteJobApi = async (id: string): Promise<ApiResponse<{ id: string }>> => {
  const res = await fetch(`/api/data/job/delete?id=${encodeURIComponent(id)}`, {
    method: "DELETE",
  });
  return parseApiJson<{ id: string }>(res);
};
