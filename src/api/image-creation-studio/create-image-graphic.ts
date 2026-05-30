import type { ApiResult } from "@/api/types";
import { requestApi } from "@/api/_shared/request-api";

export type CreateImageGraphicBody = {
  title: string;
  canvasWidthPx: number;
  canvasHeightPx: number;
  jobId?: string;
  metadata?: Record<string, unknown>;
};

/**
 * POST /api/data/image-graphic/create — creates a graphic in Supabase via Express.
 */
export const createImageGraphicApi = async (
  body: CreateImageGraphicBody,
): Promise<ApiResult<{ id: string }>> => {
  return requestApi<{ id: string }>("/api/data/image-graphic/create", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      title: body.title,
      canvasWidthPx: body.canvasWidthPx,
      canvasHeightPx: body.canvasHeightPx,
      jobId: body.jobId?.trim() ?? "",
      metadata: body.metadata ?? {},
    }),
  });
};
