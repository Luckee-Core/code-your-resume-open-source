import type { ApiResponse } from "@/api/types";
import { parseApiJson } from "@/api/parse-api-json";

/**
 * DELETE /api/data/job-application/delete?id=
 */
export const deleteJobApplicationApi = async (id: string): Promise<ApiResponse<{ id: string }>> => {
  const res = await fetch(
    `/api/data/job-application/delete?id=${encodeURIComponent(id)}`,
    {
    method: "DELETE",
  });
  return parseApiJson<{ id: string }>(res);
};
