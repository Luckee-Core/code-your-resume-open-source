import { requestApi } from "@/api/_shared/request-api";
import type { ApiResult } from "@/api/_shared/types";
import type { QuickApplyResult, RunQuickApplyInput } from "./types";

/**
 * POST /api/data/quick-apply/run — orchestrate company + job scrape and resume queue.
 *
 * @param input - Company website and job listing URLs
 */
export const runQuickApplyPipelineApi = async (
  input: RunQuickApplyInput,
): Promise<ApiResult<QuickApplyResult>> => {
  return requestApi<QuickApplyResult>("/api/data/quick-apply/run", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      companyWebsiteUrl: input.companyWebsiteUrl.trim(),
      jobListingUrl: input.jobListingUrl.trim(),
    }),
  });
};
