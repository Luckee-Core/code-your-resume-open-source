import type { ApiResult } from "@/api/types";
import type { Employee } from "@/model/employee";
import { requestApi } from "@/api/_shared/request-api";

/**
 * GET /api/data/employee/get?id=
 */
export const getEmployeeApi = async (id: string): Promise<ApiResult<Employee>> => {
  return requestApi<Employee>(`/api/data/employee/get?id=${encodeURIComponent(id)}`);
};
