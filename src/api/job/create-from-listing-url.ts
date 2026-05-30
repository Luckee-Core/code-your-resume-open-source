import type { ApiResult } from "@/api/types";
import type { Job } from "@/model/job";
import { requestApi } from "@/api/_shared/request-api";

export type CreateJobFromListingUrlBody = {
  companyId: string;
  url: string;
};

export type CreateJobFromListingUrlApiResult = ApiResult<Job> & {
  scrapeRunId?: string;
  exchangeId?: string | null;
};

/**
 * POST /api/data/job/create-from-listing-url — server creates the job then runs scrape + Anthropic in one flow.
 */
export const createJobFromListingUrlApi = async (
  body: CreateJobFromListingUrlBody,
): Promise<CreateJobFromListingUrlApiResult> => {
  return requestApi<Job>("/api/data/job/create-from-listing-url", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
};
