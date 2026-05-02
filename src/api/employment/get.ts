import type { ApiResponse } from "@/api/types";
import type { Employment } from "@/model/employment";
import { parseApiJson } from "@/api/parse-api-json";

/**
 * GET /api/data/employment/get?id=
 */
export const getEmploymentApi = async (id: string): Promise<ApiResponse<Employment>> => {
  const qs = new URLSearchParams({ id }).toString();
  const res = await fetch(`/api/data/employment/get?${qs}`);
  return parseApiJson<Employment>(res);
};
