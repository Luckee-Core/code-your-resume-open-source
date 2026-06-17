import type { GenerateAcceptedResponse } from "@/api/generation/types";
import type { ApiResult } from "@/api/types";
import { normalizeGenerationAcceptedApiResult } from "@/api/generation/normalize-generation-accepted-api-result";
import { requestApi } from "@/api/_shared/request-api";
import type { GenerateSkillsComponentInput } from "./types";

/**
 * POST /api/data/skills-component/generate
 *
 * Queues a Cursor agent on Express to generate and persist a resume graphic for `jobId`.
 * Returns 202 when accepted; the graphic appears in Supabase when the agent finishes.
 *
 * @param input - Job id and optional focus points
 * @returns Accepted payload or structured error (never throws)
 */
export const generateSkillsComponent = async (
  input: GenerateSkillsComponentInput,
): Promise<ApiResult<GenerateAcceptedResponse>> => {
  const body: GenerateSkillsComponentInput = {
    jobId: input.jobId.trim(),
  };
  const emphasis = input.pointOfEmphasis?.trim();
  if (emphasis) {
    body.pointOfEmphasis = emphasis;
  }

  const result = await requestApi<GenerateAcceptedResponse>("/api/data/skills-component/generate", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  return normalizeGenerationAcceptedApiResult(result);
};
