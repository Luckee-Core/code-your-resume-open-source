import type { ApiResponse } from "@/api/types";
import type { Company } from "@/model/company";
import { parseApiJson } from "@/api/parse-api-json";

export type CreateCompanyBody = Pick<Company, "name" | "website" | "notes">;

/**
 * POST /api/data/company/create — creates a company row.
 */
export const createCompanyApi = async (body: CreateCompanyBody): Promise<ApiResponse<Company>> => {
  const res = await fetch("/api/data/company/create", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  return parseApiJson<Company>(res);
};
