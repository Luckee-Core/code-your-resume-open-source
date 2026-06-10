import type { ApiResult } from "@/api/_shared/types";
import type { LinkedInProfile } from "@/model/linkedin-profile";
import { requestApi } from "@/api/_shared/request-api";

/**
 * POST /api/data/linkedin-profile/create-tenant
 */
export const createTenantLinkedInProfileApi = async (input: {
  linkedinUrl: string;
}): Promise<ApiResult<LinkedInProfile>> => {
  return requestApi<LinkedInProfile>("/api/data/linkedin-profile/create-tenant", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input),
  });
};
