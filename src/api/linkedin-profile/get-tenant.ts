import type { ApiResult } from "@/api/_shared/types";
import type { LinkedInProfile } from "@/model/linkedin-profile";
import { requestApi } from "@/api/_shared/request-api";

/**
 * GET /api/data/linkedin-profile/get-tenant
 */
export const getTenantLinkedInProfileApi = async (): Promise<ApiResult<LinkedInProfile | null>> => {
  return requestApi<LinkedInProfile | null>("/api/data/linkedin-profile/get-tenant");
};
