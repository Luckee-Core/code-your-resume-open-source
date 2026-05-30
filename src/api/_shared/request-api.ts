import { parseApiJson } from "@/api/_shared/parse-api-json";
import type { ApiResult } from "@/api/_shared/types";

/**
 * Same-origin fetch + JSON parse. Never throws.
 * Network failures return `{ success: false, error, httpStatus: 0 }`.
 * HTTP/parse failures are delegated to `parseApiJson` with `httpStatus` attached.
 *
 * @param url - Relative API path (e.g. `/api/data/company/list`)
 * @param init - Optional `fetch` init (method, headers, body)
 * @returns Parsed API result with HTTP status from the response (0 on network error)
 */
export const requestApi = async <T>(
  url: string,
  init?: RequestInit,
): Promise<ApiResult<T>> => {
  try {
    const res = await fetch(url, init);
    const parsed = await parseApiJson<T>(res, url);
    return { ...parsed, httpStatus: res.status };
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    return {
      success: false,
      error: `Network error: ${message}`,
      httpStatus: 0,
    };
  }
};
