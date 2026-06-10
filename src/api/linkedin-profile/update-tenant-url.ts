import type { ApiResult } from "@/api/_shared/types";
import type { LinkedInProfile } from "@/model/linkedin-profile";
import { requestApi } from "@/api/_shared/request-api";

/**
 * PATCH /api/data/linkedin-profile/update-tenant-url
 */
export const updateTenantLinkedInProfileUrlApi = async (input: {
  linkedinUrl: string;
}): Promise<ApiResult<LinkedInProfile>> => {
  return requestApi<LinkedInProfile>("/api/data/linkedin-profile/update-tenant-url", {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input),
  });
};
