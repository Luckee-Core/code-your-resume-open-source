import type { ApiResponse } from "@/api/types";
import type { Job } from "@/model/job";

type ImportListingJson = ApiResponse<Job> & {
  scrapeRunId?: string;
  exchangeId?: string | null;
};

export type ImportJobListingApiResponse = ImportListingJson & { httpStatus: number };

/**
 * POST /api/data/job/import-listing — fetch posting URL, persist ledger server-side, return updated Job.
 */
export const importJobListingApi = async (id: string): Promise<ImportJobListingApiResponse> => {
  const res = await fetch("/api/data/job/import-listing", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id }),
  });
  try {
    const json = (await res.json()) as ImportListingJson;
    if (typeof json === "object" && json !== null && "success" in json) {
      return { ...json, httpStatus: res.status };
    }
    return { success: false, error: "Invalid response shape", httpStatus: res.status };
  } catch {
    return { success: false, error: "Failed to parse JSON", httpStatus: res.status };
  }
};
