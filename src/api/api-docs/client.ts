import { cache } from "react";
import { requestApi } from "@/api/_shared/request-api";
import type { ApiResult } from "@/api/_shared/types";
import { resolveCrmExpressBaseUrl } from "@/config/resolve-crm-express-base-url";
import type { ApiDocsCatalog } from "./types";

/**
 * Loads the API documentation catalog from Express GET /api-docs.json.
 */
export const getApiDocsCatalog = async (): Promise<ApiResult<ApiDocsCatalog>> => {
  const base = resolveCrmExpressBaseUrl();
  if (!base) {
    return {
      success: false,
      error: "Express API URL is not configured",
      httpStatus: 0,
    };
  }
  return requestApi<ApiDocsCatalog>(`${base}/api-docs.json`);
};

/**
 * Request-deduped catalog fetch for docs layout + API page in the same render.
 */
export const getApiDocsCatalogCached = cache(getApiDocsCatalog);
