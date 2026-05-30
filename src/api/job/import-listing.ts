import type { ApiResult } from "@/api/types";
import type { Job } from "@/model/job";
import { requestApi } from "@/api/_shared/request-api";

export type ImportJobListingApiResponse = ApiResult<Job> & {
  scrapeRunId?: string;
  exchangeId?: string | null;
};

/**
 * POST /api/data/job/import-listing — fetch posting URL, persist ledger server-side, return updated Job.
 */
export const importJobListingApi = async (id: string): Promise<ImportJobListingApiResponse> => {
  return requestApi<Job>("/api/data/job/import-listing", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id }),
  });
};
