import type { ApiResponse } from "@/api/types";
import type { Employee } from "@/model/employee";
import { parseApiJson } from "@/api/parse-api-json";

export type CreateEmployeeBody = Pick<
  Employee,
  "companyId" | "name" | "role" | "email" | "linkedinUrl"
>;

/**
 * POST /api/data/employee/create
 */
export const createEmployeeApi = async (body: CreateEmployeeBody): Promise<ApiResponse<Employee>> => {
  const res = await fetch("/api/data/employee/create", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  return parseApiJson<Employee>(res);
};
