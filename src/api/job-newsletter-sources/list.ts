import type { ApiResult } from "@/api/types";
import type { JobNewsletterSource } from "@/model/job-newsletter-source";
import { requestApi } from "@/api/_shared/request-api";
import { mapJobNewsletterSource } from "./map-job-newsletter-source";

type ApiRow = Parameters<typeof mapJobNewsletterSource>[0];

/**
 * GET /api/data/job-newsletter-sources/list
 */
export const listJobNewsletterSourcesApi = async (): Promise<ApiResult<JobNewsletterSource[]>> => {
  const result = await requestApi<ApiRow[]>("/api/data/job-newsletter-sources/list");
  if (!result.success || !result.data) {
    return { ...result, data: undefined };
  }
  return { ...result, data: result.data.map(mapJobNewsletterSource) };
};
