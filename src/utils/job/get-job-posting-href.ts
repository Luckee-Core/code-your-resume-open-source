/**
 * Normalizes a job posting URL for use in an anchor `href`, or returns empty when missing.
 */
export const getJobPostingHref = (url: string): string => {
  const trimmed = url.trim();
  if (!trimmed) return "";
  return trimmed.startsWith("http") ? trimmed : `https://${trimmed}`;
};
