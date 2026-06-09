import type { GenerateByJobIdInput, GenerateAcceptedResponse } from "@/api/generation/types";
import type { ApiResult } from "@/api/types";
import { normalizeGenerationAcceptedApiResult } from "@/api/generation/normalize-generation-accepted-api-result";
import { requestApi } from "@/api/_shared/request-api";

/**
 * POST /api/data/skills-component/generate
 *
 * Queues a Cursor agent on Express to generate and persist a resume graphic for `jobId`.
 * Returns 202 when accepted; the graphic appears in Supabase when the agent finishes.
 *
 * @param input - Job id
 * @returns Accepted payload or structured error (never throws)
 */
export const generateSkillsComponent = async (
  input: GenerateByJobIdInput,
): Promise<ApiResult<GenerateAcceptedResponse>> => {
  const result = await requestApi<GenerateAcceptedResponse>("/api/data/skills-component/generate", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input),
  });

  return normalizeGenerationAcceptedApiResult(result);
};

export type { GenerateByJobIdInput };
