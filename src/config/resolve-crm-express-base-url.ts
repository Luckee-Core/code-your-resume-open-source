/**
 * Express API base URL for server-side BFF proxies (no trailing slash).
 *
 * Set on Vercel to your deployed Express host (e.g. Railway public URL).
 * Local `next dev` defaults to http://127.0.0.1:3053 when unset.
 */
export const resolveCrmExpressBaseUrl = (): string => {
  const candidates = [
    process.env.EXPRESS_API_URL,
    process.env.CRM_EXPRESS_INTERNAL_URL,
  ];

  for (const raw of candidates) {
    const trimmed = raw?.trim();
    if (trimmed) {
      return trimmed.replace(/\/$/, "");
    }
  }

  if (process.env.NODE_ENV !== "production") {
    return "http://127.0.0.1:3053";
  }

  return "";
};

/** User-facing hint when production proxy has no Express URL. */
export const CRM_EXPRESS_NOT_CONFIGURED_MESSAGE =
  "Express API URL is not set on Vercel. Add EXPRESS_API_URL (recommended) or CRM_EXPRESS_INTERNAL_URL to your Vercel project — value is your Railway public URL, e.g. https://your-app.up.railway.app (no trailing slash). Supabase keys stay on Express only.";
