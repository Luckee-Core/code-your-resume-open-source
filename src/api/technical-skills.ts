import type { ApiResult } from "@/api/types";
import { requestApi } from "@/api/_shared/request-api";
import type {
  TechnicalSkillItem,
  TechnicalSkillsStudioPayload,
} from "@/model/technical-skills";

type RawTechnicalSkillsResponse = ApiResult<TechnicalSkillsStudioPayload> & {
  skills?: TechnicalSkillItem[];
  messages?: TechnicalSkillsStudioPayload["messages"];
};

const normalizeTechnicalSkillsResult = (
  result: RawTechnicalSkillsResponse,
): ApiResult<TechnicalSkillsStudioPayload> => {
  if (!result.success) {
    return result;
  }

  return {
    success: true,
    data: {
      skills: result.skills ?? result.data?.skills ?? [],
      messages: result.messages ?? result.data?.messages ?? [],
    },
    httpStatus: result.httpStatus,
  };
};

/**
 * GET /api/technical-skills
 */
export const getTechnicalSkillsStudioPayload = async (): Promise<
  ApiResult<TechnicalSkillsStudioPayload>
> => {
  const result = await requestApi<TechnicalSkillsStudioPayload>("/api/technical-skills");
  return normalizeTechnicalSkillsResult(result as RawTechnicalSkillsResponse);
};

/**
 * PATCH /api/technical-skills/skills
 */
export const patchTechnicalSkills = async (payload: {
  technicalSkills: TechnicalSkillItem[];
}): Promise<ApiResult<TechnicalSkillsStudioPayload>> => {
  const result = await requestApi<TechnicalSkillsStudioPayload>("/api/technical-skills/skills", {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ technicalSkills: payload.technicalSkills }),
  });
  return normalizeTechnicalSkillsResult(result as RawTechnicalSkillsResponse);
};

/**
 * POST /api/technical-skills/messages
 */
export const postTechnicalSkillsMessage = async (
  content: string,
): Promise<ApiResult<TechnicalSkillsStudioPayload>> => {
  const result = await requestApi<TechnicalSkillsStudioPayload>("/api/technical-skills/messages", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ content }),
  });
  return normalizeTechnicalSkillsResult(result as RawTechnicalSkillsResponse);
};

/**
 * POST /api/technical-skills/suggestions/:id/accept
 */
export const postAcceptTechnicalSkillSuggestion = async (
  suggestionId: string,
): Promise<ApiResult<TechnicalSkillsStudioPayload>> => {
  const result = await requestApi<TechnicalSkillsStudioPayload>(
    `/api/technical-skills/suggestions/${encodeURIComponent(suggestionId)}/accept`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({}),
    },
  );
  return normalizeTechnicalSkillsResult(result as RawTechnicalSkillsResponse);
};
