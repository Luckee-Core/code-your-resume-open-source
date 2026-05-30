/**
 * Returns discovered website URLs excluding the primary website when present.
 *
 * @param websiteUrls - All discovered URLs on the company
 * @param primaryWebsite - Primary website to exclude from results
 * @returns Filtered non-empty URLs
 */
export const filterDiscoveredWebsiteUrls = (
  websiteUrls: string[] | undefined,
  primaryWebsite: string | null | undefined,
): string[] => {
  return (websiteUrls ?? []).filter((url) => {
    if (!url?.trim()) return false;
    if (!primaryWebsite) return true;
    return url.trim() !== primaryWebsite.trim();
  });
};
