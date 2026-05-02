import type { ApiResponse } from "@/api/types";
import { parseApiJson } from "@/api/parse-api-json";

/**
 * DELETE /api/data/employment/delete?id=
 */
export const deleteEmploymentApi = async (id: string): Promise<ApiResponse<{ id: string }>> => {
  const qs = new URLSearchParams({ id }).toString();
  const res = await fetch(`/api/data/employment/delete?${qs}`, { method: "DELETE" });
  return parseApiJson<{ id: string }>(res);
};
