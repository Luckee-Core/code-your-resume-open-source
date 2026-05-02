/**
 * Trims user input and prepends `https://` when no `http://` or `https://` scheme is present.
 * Does not validate the URL shape; the CRM Express import step applies strict checks.
 */
export const normalizeJobListingUrlInput = (raw: string): string => {
  const t = raw.trim();
  if (!t) return "";
  return /^https?:\/\//i.test(t) ? t : `https://${t}`;
};
