import type { Company } from "@/model/company";

type DiscoverJson = {
  success?: boolean;
  companyUpdated?: boolean;
  linkCount?: number;
  data?: Company;
  error?: string;
  message?: string;
};

/**
 * POST /api/data/company/discover-site-page-urls — same-origin homepage link harvest (one run per company).
 */
export const postCompanyDiscoverSitePageUrls = async (companyId: string): Promise<Response> => {
  return fetch("/api/data/company/discover-site-page-urls", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id: companyId }),
  });
};

export type PostCompanyDiscoverSitePageUrlsBody = DiscoverJson;
