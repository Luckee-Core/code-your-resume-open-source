import type { GenerateByJobIdInput } from "@/api/generation/types";
import type { ApiResult } from "@/api/types";
import { generationTimeoutError, normalizeTsxApiResult } from "@/api/_shared/normalize-tsx-api-result";
import { requestApi } from "@/api/_shared/request-api";

/**
 * POST /api/data/company-interest/generate
 *
 * Launches a Cursor agent to generate a short company-interest TSX component.
 * Server loads job context from Supabase using jobId.
 *
 * @param input - Job id
 * @returns Generated TSX or structured error (never throws)
 */
export const generateCompanyInterest = async (
  input: GenerateByJobIdInput,
): Promise<ApiResult<{ tsx: string }>> => {
  const result = await requestApi<{ tsx: string }>("/api/data/company-interest/generate", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input),
  });

  const timeoutMessage = generationTimeoutError(result.httpStatus, "generation");
  if (!result.success && timeoutMessage) {
    return { success: false, error: timeoutMessage, httpStatus: result.httpStatus };
  }

  return normalizeTsxApiResult(result);
};

export type { GenerateByJobIdInput };
