import type { ApiResult } from "@/api/_shared/types";
import type { LinkedInEmployment } from "@/model/linkedin-employment";
import { requestApi } from "@/api/_shared/request-api";

/**
 * GET /api/data/linkedin-employment/list?profileId=
 */
export const listLinkedInEmploymentsApi = async (
  profileId: string,
): Promise<ApiResult<LinkedInEmployment[]>> => {
  const qs = new URLSearchParams({ profileId });
  return requestApi<LinkedInEmployment[]>(`/api/data/linkedin-employment/list?${qs.toString()}`);
};
