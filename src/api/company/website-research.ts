import type { Company } from "@/model/company";

type WebsiteResearchJson = {
  success?: boolean;
  data?: Company;
  error?: string;
};

/**
 * POST /api/data/company/website-research — crawl company URLs and store `websiteResearchSummary`.
 */
export const postCompanyWebsiteResearch = async (companyId: string): Promise<Response> => {
  return fetch("/api/data/company/website-research", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id: companyId }),
  });
};

export type PostCompanyWebsiteResearchBody = WebsiteResearchJson;
