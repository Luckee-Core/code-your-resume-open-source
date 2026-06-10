import type { GenerateAcceptedResponse } from "@/api/generation/types";
import type { ApiResult } from "@/api/types";
import { normalizeGenerationAcceptedApiResult } from "@/api/generation/normalize-generation-accepted-api-result";
import { requestApi } from "@/api/_shared/request-api";
import type { GenerateCoverLetterInput } from "./types";

/**
 * POST /api/data/cover-letter/generate
 *
 * Queues cover letter generation on Express; graphic is persisted server-side.
 *
 * @param input - Job id and optional point of emphasis
 * @returns Accepted payload or structured error (never throws)
 */
export const generateCoverLetter = async (
  input: GenerateCoverLetterInput,
): Promise<ApiResult<GenerateAcceptedResponse>> => {
  const body: GenerateCoverLetterInput = {
    jobId: input.jobId.trim(),
  };
  const emphasis = input.pointOfEmphasis?.trim();
  if (emphasis) {
    body.pointOfEmphasis = emphasis;
  }

  const result = await requestApi<GenerateAcceptedResponse>("/api/data/cover-letter/generate", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  return normalizeGenerationAcceptedApiResult(result);
};
