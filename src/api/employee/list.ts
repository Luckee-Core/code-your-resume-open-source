import type { ApiResponse } from "@/api/types";
import type { Employee } from "@/model/employee";
import { parseApiJson } from "@/api/parse-api-json";

/**
 * GET /api/data/employee/list
 */
export const listEmployeesApi = async (): Promise<ApiResponse<Employee[]>> => {
  const res = await fetch("/api/data/employee/list");
  return parseApiJson<Employee[]>(res);
};
