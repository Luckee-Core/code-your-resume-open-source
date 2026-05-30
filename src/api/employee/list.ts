import type { ApiResult } from "@/api/types";
import type { Employee } from "@/model/employee";
import { requestApi } from "@/api/_shared/request-api";

/**
 * GET /api/data/employee/list
 */
export const listEmployeesApi = async (): Promise<ApiResult<Employee[]>> => {
  return requestApi<Employee[]>("/api/data/employee/list");
};
