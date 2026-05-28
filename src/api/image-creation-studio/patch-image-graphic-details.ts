import type { ImageGraphic } from "@/model";
import type { ApiResponse } from "@/api/types";
import { parseApiJson } from "@/api/parse-api-json";

export type PatchImageGraphicDetailsBody = {
  title: string;
  canvasWidthPx: number;
  canvasHeightPx: number;
};

/**
 * PATCH /api/data/image-graphic/update-details — updates title and canvas dimensions.
 */
export const patchImageGraphicDetailsApi = async (
  graphicId: string,
  body: PatchImageGraphicDetailsBody,
): Promise<ApiResponse<ImageGraphic>> => {
  const res = await fetch("/api/data/image-graphic/update-details", {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ graphicId, ...body }),
  });
  return parseApiJson<ImageGraphic>(res);
};
