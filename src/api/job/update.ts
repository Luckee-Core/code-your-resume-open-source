import type { ApiResponse } from "@/api/types";
import type { Job } from "@/model/job";
import { parseApiJson } from "@/api/parse-api-json";

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
export const updateJobApi = async (body: UpdateJobBody): Promise<ApiResponse<Job>> => {
  const res = await fetch("/api/data/job/update", {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  return parseApiJson<Job>(res);
};
