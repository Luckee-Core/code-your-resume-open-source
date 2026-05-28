import type { ApiResponse } from "@/api/types";
import { parseApiJson } from "@/api/parse-api-json";

/**
 * POST /api/data/image-graphic/create — creates a graphic in Express CRM JSON vault.
 *
 * @param metadata - Optional metadata merged onto the new row (e.g. `jobId`).
 */
export const createImageGraphicApi = async (
  title: string,
  canvasWidthPx: number,
  canvasHeightPx: number,
  metadata: Record<string, unknown> = {},
): Promise<ApiResponse<{ id: string }>> => {
  const res = await fetch("/api/data/image-graphic/create", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title, canvasWidthPx, canvasHeightPx, metadata }),
  });
  return parseApiJson<{ id: string }>(res);
};
