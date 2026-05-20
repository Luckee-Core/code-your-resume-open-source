import type { ApiResponse } from "@/api/types";
import type { Job } from "@/model/job";

type ImportDescriptionJson = ApiResponse<Job> & {
  scrapeRunId?: string;
  exchangeId?: string | null;
};

export type ImportJobDescriptionApiResponse = ImportDescriptionJson & { httpStatus: number };

export type ImportJobDescriptionBody = {
  id: string;
  description: string;
};

/**
 * POST /api/data/job/import-description — extract listing sections from pasted text.
 */
export const importJobDescriptionApi = async (
  body: ImportJobDescriptionBody,
): Promise<ImportJobDescriptionApiResponse> => {
  const res = await fetch("/api/data/job/import-description", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  try {
    const json = (await res.json()) as ImportDescriptionJson;
    if (typeof json === "object" && json !== null && "success" in json) {
      return { ...json, httpStatus: res.status };
    }
    return { success: false, error: "Invalid response shape", httpStatus: res.status };
  } catch {
    return { success: false, error: "Failed to parse JSON", httpStatus: res.status };
  }
};
