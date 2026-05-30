import type { ApiResult } from "@/api/types";
import type { Employee } from "@/model/employee";
import { requestApi } from "@/api/_shared/request-api";

export type UpdateEmployeeBody = { id: string } & Partial<
  Pick<Employee, "companyId" | "name" | "role" | "email" | "linkedinUrl">
>;

/**
 * PATCH /api/data/employee/update
 */
export const updateEmployeeApi = async (body: UpdateEmployeeBody): Promise<ApiResult<Employee>> => {
  return requestApi<Employee>("/api/data/employee/update", {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
};
