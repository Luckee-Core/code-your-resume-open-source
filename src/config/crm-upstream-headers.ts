/**
 * Headers for server-side `fetch` to the CRM Express instance (e.g. route handlers).
 * Must stay in sync with {@link CRM_API_SECRET} on both processes.
 */
export const getCrmUpstreamHeaders = (extra?: Record<string, string>): Record<string, string> => {
  const out: Record<string, string> = { ...extra };
  const secret = process.env.CRM_API_SECRET?.trim();
  if (secret) {
    out["X-CRM-API-Key"] = secret;
  }
  return out;
};
