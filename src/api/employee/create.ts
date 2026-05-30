import type { ApiResult } from "@/api/types";
import type { Employee } from "@/model/employee";
import { requestApi } from "@/api/_shared/request-api";

export type CreateEmployeeBody = Pick<
  Employee,
  "companyId" | "name" | "role" | "email" | "linkedinUrl"
>;

/**
 * POST /api/data/employee/create
 */
export const createEmployeeApi = async (body: CreateEmployeeBody): Promise<ApiResult<Employee>> => {
  return requestApi<Employee>("/api/data/employee/create", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
};
