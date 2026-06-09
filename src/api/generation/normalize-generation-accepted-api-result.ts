import type { ApiResult } from "@/api/_shared/types";
import type { GenerateAcceptedResponse } from "@/api/generation/types";

type RawAcceptedResult = ApiResult<GenerateAcceptedResponse> & {
  accepted?: boolean;
  jobId?: string;
};

/**
 * Maps Express `{ success, accepted, jobId }` (202) into `ApiResult<GenerateAcceptedResponse>`.
 */
export const normalizeGenerationAcceptedApiResult = (
  result: RawAcceptedResult,
): ApiResult<GenerateAcceptedResponse> => {
  if (!result.success) {
    return result;
  }

  const jobId = result.data?.jobId ?? result.jobId;
  const accepted = result.data?.accepted ?? result.accepted;

  if (result.httpStatus === 202 && accepted && typeof jobId === "string" && jobId.trim()) {
    return {
      success: true,
      data: { accepted: true, jobId: jobId.trim() },
      httpStatus: 202,
    };
  }

  return {
    success: false,
    error: result.error ?? "Unexpected generation response",
    httpStatus: result.httpStatus,
  };
};
