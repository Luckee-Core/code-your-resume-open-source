/**
 * Whether the current host looks like a local dev server (not production deploy).
 */
export const isLocalDevHostname = (hostname: string): boolean => {
  const h = hostname.trim().toLowerCase();
  if (h === "localhost" || h === "127.0.0.1" || h === "::1" || h === "[::1]") {
    return true;
  }
  if (h.endsWith(".localhost")) {
    return true;
  }
  return false;
};
