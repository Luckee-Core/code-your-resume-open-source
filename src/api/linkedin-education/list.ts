import type { ApiResult } from "@/api/_shared/types";
import type { LinkedInEducation } from "@/model/linkedin-education";
import { requestApi } from "@/api/_shared/request-api";

/**
 * GET /api/data/linkedin-education/list?profileId=
 */
export const listLinkedInEducationsApi = async (
  profileId: string,
): Promise<ApiResult<LinkedInEducation[]>> => {
  const qs = new URLSearchParams({ profileId });
  return requestApi<LinkedInEducation[]>(`/api/data/linkedin-education/list?${qs.toString()}`);
};
