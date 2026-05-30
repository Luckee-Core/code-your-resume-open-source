import type { ApiResult } from "@/api/types";
import type { Job } from "@/model/job";
import { requestApi } from "@/api/_shared/request-api";

export type ImportJobDescriptionBody = {
  id: string;
  description: string;
};

export type ImportJobDescriptionApiResponse = ApiResult<Job> & {
  scrapeRunId?: string;
  exchangeId?: string | null;
};

/**
 * POST /api/data/job/import-description — extract listing sections from pasted text.
 */
export const importJobDescriptionApi = async (
  body: ImportJobDescriptionBody,
): Promise<ImportJobDescriptionApiResponse> => {
  return requestApi<Job>("/api/data/job/import-description", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
};
