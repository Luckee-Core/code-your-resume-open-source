import type { ApiResponse } from "@/api/types";
import type { Employment } from "@/model/employment";
import { parseApiJson } from "@/api/parse-api-json";

/**
 * GET /api/data/employment/list
 */
export const listEmploymentsApi = async (): Promise<ApiResponse<Employment[]>> => {
  const res = await fetch("/api/data/employment/list");
  return parseApiJson<Employment[]>(res);
};
