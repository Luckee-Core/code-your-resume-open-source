/**
 * True when the company has a primary website or at least one discovered URL to crawl.
 */
export const companyHasWebsiteForCrawl = (params: {
  website: string | null | undefined;
  websiteUrls: string[] | undefined;
}): boolean => {
  if (params.website?.trim()) return true;
  return (params.websiteUrls ?? []).some((u) => typeof u === "string" && u.trim().length > 0);
};
