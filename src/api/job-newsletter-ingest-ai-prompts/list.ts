import type { ApiResult } from "@/api/types";
import type { JobNewsletterIngestAiPrompt } from "@/model/job-newsletter-ingest-ai-prompt";
import { requestApi } from "@/api/_shared/request-api";
import { mapJobNewsletterIngestAiPrompt } from "./map-job-newsletter-ingest-ai-prompt";

type ApiRow = Parameters<typeof mapJobNewsletterIngestAiPrompt>[0];

/**
 * GET /api/data/job-newsletter-ingest-ai-prompts/list
 */
export const listJobNewsletterIngestAiPromptsApi = async (): Promise<
  ApiResult<JobNewsletterIngestAiPrompt[]>
> => {
  const result = await requestApi<ApiRow[]>("/api/data/job-newsletter-ingest-ai-prompts/list");
  if (!result.success || !result.data) {
    return { ...result, data: undefined };
  }
  return { ...result, data: result.data.map(mapJobNewsletterIngestAiPrompt) };
};
