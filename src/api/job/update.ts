import type { ApiResult } from "@/api/types";
import type { Job } from "@/model/job";
import { requestApi } from "@/api/_shared/request-api";

export type UpdateJobBody = { id: string } & Partial<
  Pick<
    Job,
    | "companyId"
    | "type"
    | "title"
    | "url"
    | "status"
    | "description"
    | "listingImportedAt"
    | "latestScrapeRunId"
    | "latestAiExchangeId"
  >
>;

/**
 * PATCH /api/data/job/update
 */
export const updateJobApi = async (body: UpdateJobBody): Promise<ApiResult<Job>> => {
  return requestApi<Job>("/api/data/job/update", {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
};
