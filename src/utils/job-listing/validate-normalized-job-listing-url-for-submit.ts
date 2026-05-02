const IPV4_RE = /^\d{1,3}(\.\d{1,3}){3}$/;

/**
 * True when `url` is an absolute http(s) URL whose hostname plausibly targets a real site.
 * Rejects pasted sentences (e.g. toast copy) that normalize to hosts like `job,saved,but`.
 */
export const validateNormalizedJobListingUrlForSubmit = (url: string): boolean => {
  let parsed: URL;
  try {
    parsed = new URL(url);
  } catch {
    return false;
  }
  const protocol = parsed.protocol.toLowerCase();
  if (protocol !== "http:" && protocol !== "https:") {
    return false;
  }
  const host = parsed.hostname.toLowerCase();
  if (!host) {
    return false;
  }
  if (/[,;'"`\s]/.test(host)) {
    return false;
  }
  if (host === "localhost" || IPV4_RE.test(host)) {
    return true;
  }
  return host.includes(".");
};
