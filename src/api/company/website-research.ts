import type { ApiResult } from "@/api/types";
import { requestApi } from "@/api/_shared/request-api";
import type { Company } from "@/model/company";

/**
 * POST /api/data/company/website-research — crawl company URLs and store `websiteResearchSummary`.
 */
export const postCompanyWebsiteResearch = async (
  companyId: string,
): Promise<ApiResult<Company>> => {
  return requestApi<Company>("/api/data/company/website-research", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id: companyId }),
  });
};

/** @deprecated Use ApiResult<Company> */
export type PostCompanyWebsiteResearchBody = ApiResult<Company>;
