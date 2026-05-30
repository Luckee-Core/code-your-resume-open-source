import type { ApiResult } from "@/api/_shared/types";

type RawTsxResult = ApiResult<{ tsx: string }> & { tsx?: string };

/**
 * Maps Express `{ success, tsx }` (tsx at top level) into `ApiResult<{ tsx: string }>`.
 */
export const normalizeTsxApiResult = (result: RawTsxResult): ApiResult<{ tsx: string }> => {
  if (!result.success) {
    return result;
  }

  const tsx = result.data?.tsx ?? result.tsx;
  if (typeof tsx !== "string") {
    return {
      success: false,
      error: result.error ?? "Invalid response: missing tsx",
      httpStatus: result.httpStatus,
    };
  }

  return { success: true, data: { tsx }, httpStatus: result.httpStatus };
};

/**
 * User-facing message when a long-running generation request times out at the edge.
 */
export const generationTimeoutError = (httpStatus: number, label: string): string | null => {
  if (httpStatus === 504 || httpStatus === 408) {
    return `Request timed out — ${label} can take several minutes. Retry from the job page.`;
  }
  return null;
};
