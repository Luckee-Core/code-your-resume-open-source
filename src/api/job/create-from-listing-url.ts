import type { ApiResponse } from "@/api/types";
import type { Job } from "@/model/job";

export type CreateJobFromListingUrlBody = {
  companyId: string;
  url: string;
};

export type CreateJobFromListingUrlApiResult = ApiResponse<Job> & {
  httpStatus: number;
  scrapeRunId?: string;
  exchangeId?: string | null;
};

/**
 * POST /api/data/job/create-from-listing-url — server creates the job then runs scrape + Anthropic in one flow.
 */
export const createJobFromListingUrlApi = async (
  body: CreateJobFromListingUrlBody,
): Promise<CreateJobFromListingUrlApiResult> => {
  const res = await fetch("/api/data/job/create-from-listing-url", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  try {
    const json = (await res.json()) as ApiResponse<Job> & {
      scrapeRunId?: string;
      exchangeId?: string | null;
    };
    if (typeof json === "object" && json !== null && "success" in json) {
      return { ...json, httpStatus: res.status };
    }
    return { success: false, error: "Invalid response shape", httpStatus: res.status };
  } catch {
    return { success: false, error: "Failed to parse JSON", httpStatus: res.status };
  }
};
