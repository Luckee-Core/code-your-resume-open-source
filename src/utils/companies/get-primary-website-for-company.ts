import type { Company } from "@/model/company";

/**
 * Primary site URL: `website`, else first `websiteUrls` entry.
 */
export const getPrimaryWebsiteForCompany = (company: Company): string | null => {
  const w = company.website?.trim();
  if (w) return w;
  const first = company.websiteUrls?.find((u) => u?.trim());
  return first?.trim() ?? null;
};
