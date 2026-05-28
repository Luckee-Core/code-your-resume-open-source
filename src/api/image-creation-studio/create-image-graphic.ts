import type { ApiResponse } from "@/api/types";
import { parseApiJson } from "@/api/parse-api-json";

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
): Promise<ApiResponse<{ id: string }>> => {
  const res = await fetch("/api/data/image-graphic/create", {
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
  return parseApiJson<{ id: string }>(res);
};
