import type { ApiResponse } from "@/api/types";
import type { Employee } from "@/model/employee";
import { parseApiJson } from "@/api/parse-api-json";

/**
 * GET /api/data/employee/get?id=
 */
export const getEmployeeApi = async (id: string): Promise<ApiResponse<Employee>> => {
  const res = await fetch(`/api/data/employee/get?id=${encodeURIComponent(id)}`);
  return parseApiJson<Employee>(res);
};
