import type { ApiResult } from "@/api/types";
import { requestApi } from "@/api/_shared/request-api";
import type { ProfessionalBackgroundPayload, ProfessionalBackgroundSegments } from "@/model/professional-background";

const emptySegments = (): ProfessionalBackgroundSegments => ({
  education: "",
  credibility_bio: "",
  voice_style: "",
  portfolio_github: "",
});

type RawProfessionalBackgroundResult = ApiResult<ProfessionalBackgroundPayload> &
  Partial<ProfessionalBackgroundPayload>;

const normalizeProfessionalBackgroundResult = (
  result: RawProfessionalBackgroundResult,
): ApiResult<ProfessionalBackgroundPayload> => {
  if (!result.success) {
    return result;
  }

  if (!result.segments) {
    return {
      success: false,
      error: result.error ?? "Failed to load professional background",
      httpStatus: result.httpStatus,
    };
  }

  return {
    success: true,
    data: {
      segments: { ...emptySegments(), ...result.segments },
      updatedAt: result.updatedAt ?? null,
    },
    httpStatus: result.httpStatus,
  };
};

/**
 * GET /api/professional-background
 */
export const getProfessionalBackgroundPayload = async (): Promise<
  ApiResult<ProfessionalBackgroundPayload>
> => {
  const result = await requestApi<ProfessionalBackgroundPayload>("/api/professional-background");
  return normalizeProfessionalBackgroundResult(result as RawProfessionalBackgroundResult);
};

/**
 * PATCH /api/professional-background — full segments replace
 */
export const patchProfessionalBackground = async (payload: {
  segments: ProfessionalBackgroundSegments;
}): Promise<ApiResult<ProfessionalBackgroundPayload>> => {
  const result = await requestApi<ProfessionalBackgroundPayload>("/api/professional-background", {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ segments: payload.segments }),
  });
  return normalizeProfessionalBackgroundResult(result as RawProfessionalBackgroundResult);
};
