import type { ApiResult } from "@/api/types";
import type { ProjectNote } from "@/model/project";
import { requestApi } from "@/api/_shared/request-api";

export type SynthesizeProjectNotesBody = {
  id: string;
  synthesisText: string;
};

export type SynthesizeProjectNotesData = {
  notes: ProjectNote[];
  exchangeId: string;
};

export type SynthesizeProjectNotesApiResponse = ApiResult<SynthesizeProjectNotesData>;

/**
 * POST /api/data/project/synthesize-notes — AI-extract project notes from pasted text.
 */
export const synthesizeProjectNotesApi = async (
  body: SynthesizeProjectNotesBody,
): Promise<SynthesizeProjectNotesApiResponse> => {
  return requestApi<SynthesizeProjectNotesData>("/api/data/project/synthesize-notes", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
};
