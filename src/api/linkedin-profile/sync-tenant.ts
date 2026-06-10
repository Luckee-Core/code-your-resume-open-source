import type { ApiResult } from "@/api/_shared/types";
import type { LinkedInProfileBundle } from "@/model/linkedin-profile-bundle";
import { requestApi } from "@/api/_shared/request-api";

/**
 * POST /api/data/linkedin-profile/sync-tenant
 */
export const syncTenantLinkedInProfileApi = async (): Promise<ApiResult<LinkedInProfileBundle>> => {
  return requestApi<LinkedInProfileBundle>("/api/data/linkedin-profile/sync-tenant", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({}),
  });
};
