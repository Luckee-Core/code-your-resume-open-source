import type { ApiResult } from "@/api/types";
import type { JobNewsletterIngestRun } from "@/model/job-newsletter-ingest-run";
import { requestApi } from "@/api/_shared/request-api";
import { mapJobNewsletterIngestRun } from "./map-job-newsletter-ingest-run";

type ApiRow = Parameters<typeof mapJobNewsletterIngestRun>[0];

export type ListJobNewsletterIngestRunsInput = {
  sourceId: string;
  limit?: number;
};

/**
 * GET /api/data/job-newsletter-ingest-runs/list?sourceId=
 */
export const listJobNewsletterIngestRunsApi = async (
  input: ListJobNewsletterIngestRunsInput,
): Promise<ApiResult<JobNewsletterIngestRun[]>> => {
  const params = new URLSearchParams({ sourceId: input.sourceId });
  if (input.limit != null) {
    params.set("limit", String(input.limit));
  }

  const result = await requestApi<ApiRow[]>(
    `/api/data/job-newsletter-ingest-runs/list?${params.toString()}`,
  );
  if (!result.success || !result.data) {
    return { ...result, data: undefined };
  }
  return { ...result, data: result.data.map(mapJobNewsletterIngestRun) };
};
