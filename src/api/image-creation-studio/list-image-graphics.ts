import type { ImageGraphic } from "@/model";
import type { ApiResult } from "@/api/types";
import { requestApi } from "@/api/_shared/request-api";

/**
 * GET /api/data/image-graphic/list — loads graphics via Express → Supabase (browser does not call Supabase).
 */
export const listImageGraphicsApi = async (): Promise<ApiResult<{ graphics: ImageGraphic[] }>> => {
  return requestApi<{ graphics: ImageGraphic[] }>("/api/data/image-graphic/list");
};
