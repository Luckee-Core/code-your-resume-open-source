import type { ApiResult } from "@/api/types";
import { requestApi } from "@/api/_shared/request-api";
import {
  mapJobNewsletterIngestAiCostsPayload,
  type JobNewsletterIngestAiCostsPayload,
} from "./map-job-newsletter-ingest-ai-costs";

export type ListJobNewsletterIngestAiCostsInput = {
  sourceId: string;
  limit?: number;
};

/**
 * GET /api/data/job-newsletter-ingest-ai-costs/list?sourceId=
 */
export const listJobNewsletterIngestAiCostsApi = async (
  input: ListJobNewsletterIngestAiCostsInput,
): Promise<ApiResult<JobNewsletterIngestAiCostsPayload>> => {
  const params = new URLSearchParams({ sourceId: input.sourceId });
  if (input.limit != null) {
    params.set("limit", String(input.limit));
  }

  const result = await requestApi<Parameters<typeof mapJobNewsletterIngestAiCostsPayload>[0]>(
    `/api/data/job-newsletter-ingest-ai-costs/list?${params.toString()}`,
  );
  if (!result.success || !result.data) {
    return { ...result, data: undefined };
  }
  return { ...result, data: mapJobNewsletterIngestAiCostsPayload(result.data) };
};
