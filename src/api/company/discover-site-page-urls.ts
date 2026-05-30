import type { ApiResult } from "@/api/types";
import { requestApi } from "@/api/_shared/request-api";
import type { Company } from "@/model/company";

export type DiscoverSitePageUrlsResult = ApiResult<Company> & {
  companyUpdated?: boolean;
  linkCount?: number;
  message?: string;
};

/**
 * POST /api/data/company/discover-site-page-urls — same-origin homepage link harvest (one run per company).
 */
export const postCompanyDiscoverSitePageUrls = async (
  companyId: string,
): Promise<DiscoverSitePageUrlsResult> => {
  return requestApi<Company>("/api/data/company/discover-site-page-urls", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id: companyId }),
  });
};

/** @deprecated Use DiscoverSitePageUrlsResult */
export type PostCompanyDiscoverSitePageUrlsBody = DiscoverSitePageUrlsResult;
