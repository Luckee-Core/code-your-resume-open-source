import type { ImageGraphic } from "@/model";
import type { ApiResponse } from "@/api/types";
import { parseApiJson } from "@/api/parse-api-json";

/**
 * GET /api/data/image-graphic/list — loads graphics via Express → Supabase (browser does not call Supabase).
 */
export const listImageGraphicsApi = async (): Promise<ApiResponse<{ graphics: ImageGraphic[] }>> => {
  const res = await fetch("/api/data/image-graphic/list");
  return parseApiJson<{ graphics: ImageGraphic[] }>(res);
};
