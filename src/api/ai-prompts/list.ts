import type { ApiResult } from "@/api/types";
import type { AiPrompt } from "@/model/ai-prompt";
import { requestApi } from "@/api/_shared/request-api";
import { mapAiPrompt } from "./map-ai-prompt";

type ApiRow = Parameters<typeof mapAiPrompt>[0];

/**
 * GET /api/data/ai-prompts/list
 */
export const listAiPromptsApi = async (): Promise<ApiResult<AiPrompt[]>> => {
  const result = await requestApi<ApiRow[]>("/api/data/ai-prompts/list");
  if (!result.success || !result.data) {
    return { ...result, data: undefined };
  }
  return {
    ...result,
    data: result.data.map(mapAiPrompt),
    warnings: result.warnings,
  };
};
