import type { ImageGraphic } from "@/model";
import type { ApiResult } from "@/api/types";
import { requestApi } from "@/api/_shared/request-api";

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
): Promise<ApiResult<ImageGraphic>> => {
  return requestApi<ImageGraphic>("/api/data/image-graphic/update-details", {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ graphicId, ...body }),
  });
};
