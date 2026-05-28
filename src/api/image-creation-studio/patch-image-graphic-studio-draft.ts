import type { ApiResponse } from "@/api/types";
import { parseApiJson } from "@/api/parse-api-json";

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
): Promise<ApiResponse<PatchImageGraphicStudioDraftData>> => {
  const res = await fetch("/api/data/image-graphic/patch-studio-draft", {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ graphicId, tsx }),
  });
  return parseApiJson<PatchImageGraphicStudioDraftData>(res);
};
