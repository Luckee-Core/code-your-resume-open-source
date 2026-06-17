import type { ApiResult } from "@/api/types";
import { requestApi } from "@/api/_shared/request-api";
import type { VoiceStylePayload } from "@/model/voice-style";

type RawVoiceStyleResult = ApiResult<VoiceStylePayload> & Partial<VoiceStylePayload>;

const normalizeVoiceStyleResult = (
  result: RawVoiceStyleResult,
): ApiResult<VoiceStylePayload> => {
  if (!result.success) {
    return result;
  }

  if (typeof result.body !== "string") {
    return {
      success: false,
      error: result.error ?? "Failed to load voice style",
      httpStatus: result.httpStatus,
    };
  }

  return {
    success: true,
    data: {
      body: result.body,
      updatedAt: result.updatedAt ?? null,
    },
    httpStatus: result.httpStatus,
  };
};

/**
 * GET /api/voice-style
 */
export const getVoiceStylePayload = async (): Promise<ApiResult<VoiceStylePayload>> => {
  const result = await requestApi<VoiceStylePayload>("/api/voice-style");
  return normalizeVoiceStyleResult(result as RawVoiceStyleResult);
};

/**
 * PATCH /api/voice-style — full body replace
 */
export const patchVoiceStyle = async (payload: {
  body: string;
}): Promise<ApiResult<VoiceStylePayload>> => {
  const result = await requestApi<VoiceStylePayload>("/api/voice-style", {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ body: payload.body }),
  });
  return normalizeVoiceStyleResult(result as RawVoiceStyleResult);
};
