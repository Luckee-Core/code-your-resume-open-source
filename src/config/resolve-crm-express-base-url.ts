/**
 * Express CRM base URL for server-side proxies and rewrites (no trailing slash).
 * In production, set `CRM_EXPRESS_INTERNAL_URL`. In `next dev`, defaults to port 3053.
 */
export const resolveCrmExpressBaseUrl = (): string => {
  const fromEnv = process.env.CRM_EXPRESS_INTERNAL_URL?.trim();
  if (fromEnv) {
    return fromEnv.replace(/\/$/, "");
  }
  if (process.env.NODE_ENV !== "production") {
    return "http://127.0.0.1:3053";
  }
  return "";
};
