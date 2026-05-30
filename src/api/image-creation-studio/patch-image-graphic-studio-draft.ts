import type { ApiResult } from "@/api/types";
import { requestApi } from "@/api/_shared/request-api";

export type PatchImageGraphicStudioDraftData = {
  id: string;
  metadata: Record<string, unknown>;
  updatedAt: string;
};

/**
 * PATCH /api/data/image-graphic/patch-studio-draft — merges TSX into metadata.studioDraft.
 */
export const patchImageGraphicStudioDraft = async (
  graphicId: string,
  tsx: string,
): Promise<ApiResult<PatchImageGraphicStudioDraftData>> => {
  return requestApi<PatchImageGraphicStudioDraftData>("/api/data/image-graphic/patch-studio-draft", {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ graphicId, tsx }),
  });
};
