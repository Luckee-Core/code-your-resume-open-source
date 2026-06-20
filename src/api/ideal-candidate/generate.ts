import type { GenerateByJobIdInput, GenerateAcceptedResponse } from "@/api/generation/types";
import type { ApiResult } from "@/api/types";
import { normalizeGenerationAcceptedApiResult } from "@/api/generation/normalize-generation-accepted-api-result";
import { requestApi } from "@/api/_shared/request-api";

/**
 * POST /api/data/ideal-candidate/generate
 *
 * Queues ideal-candidate generation on Express; graphic is persisted server-side.
 *
 * @param input - Job id
 * @returns Accepted payload or structured error (never throws)
 */
export const generateIdealCandidate = async (
  input: GenerateByJobIdInput,
): Promise<ApiResult<GenerateAcceptedResponse>> => {
  const result = await requestApi<GenerateAcceptedResponse>("/api/data/ideal-candidate/generate", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input),
  });

  return normalizeGenerationAcceptedApiResult(result);
};

export type { GenerateByJobIdInput };
