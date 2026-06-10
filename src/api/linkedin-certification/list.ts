import type { ApiResult } from "@/api/_shared/types";
import type { LinkedInCertification } from "@/model/linkedin-certification";
import { requestApi } from "@/api/_shared/request-api";

/**
 * GET /api/data/linkedin-certification/list?profileId=
 */
export const listLinkedInCertificationsApi = async (
  profileId: string,
): Promise<ApiResult<LinkedInCertification[]>> => {
  const qs = new URLSearchParams({ profileId });
  return requestApi<LinkedInCertification[]>(`/api/data/linkedin-certification/list?${qs.toString()}`);
};
