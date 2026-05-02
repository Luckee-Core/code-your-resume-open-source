import type { ApiResponse } from "@/api/types";
import type { Employee } from "@/model/employee";
import { parseApiJson } from "@/api/parse-api-json";

export type UpdateEmployeeBody = { id: string } & Partial<
  Pick<Employee, "companyId" | "name" | "role" | "email" | "linkedinUrl">
>;

/**
 * PATCH /api/data/employee/update
 */
export const updateEmployeeApi = async (body: UpdateEmployeeBody): Promise<ApiResponse<Employee>> => {
  const res = await fetch("/api/data/employee/update", {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  return parseApiJson<Employee>(res);
};
