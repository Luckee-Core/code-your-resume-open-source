import type { ApiResponse } from "@/api/types";
import type { Company } from "@/model/company";
import { parseApiJson } from "@/api/parse-api-json";

export type UpdateCompanyBody = { id: string } & Partial<Pick<Company, "name" | "website" | "notes">>;

/**
 * PATCH /api/data/company/update
 */
export const updateCompanyApi = async (body: UpdateCompanyBody): Promise<ApiResponse<Company>> => {
  const res = await fetch("/api/data/company/update", {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  return parseApiJson<Company>(res);
};
