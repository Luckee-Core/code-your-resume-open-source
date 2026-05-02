import type { ApiResponse } from "@/api/types";
import { parseApiJson } from "@/api/parse-api-json";

/**
 * DELETE /api/data/employee/delete?id=
 */
export const deleteEmployeeApi = async (id: string): Promise<ApiResponse<{ id: string }>> => {
  const res = await fetch(`/api/data/employee/delete?id=${encodeURIComponent(id)}`, {
    method: "DELETE",
  });
  return parseApiJson<{ id: string }>(res);
};
