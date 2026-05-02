import type {
  TechnicalSkillItem,
  TechnicalSkillsStudioPayload,
} from "@/model/technical-skills";

type TechnicalSkillsApiResponse = {
  success: boolean;
  skills?: TechnicalSkillItem[];
  messages?: TechnicalSkillsStudioPayload["messages"];
  error?: string;
};

const normalizePayload = (raw: TechnicalSkillsApiResponse): TechnicalSkillsStudioPayload => ({
  skills: raw.skills ?? [],
  messages: raw.messages ?? [],
});

export async function getTechnicalSkillsStudioPayload(): Promise<TechnicalSkillsStudioPayload> {
  const res = await fetch("/api/technical-skills");
  const json = (await res.json()) as TechnicalSkillsApiResponse;
  if (!json.success) {
    throw new Error(json.error ?? "Failed to load technical skills");
  }
  return normalizePayload(json);
}

export async function patchTechnicalSkills(payload: {
  technicalSkills: TechnicalSkillItem[];
}): Promise<TechnicalSkillsStudioPayload> {
  const res = await fetch("/api/technical-skills/skills", {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ technicalSkills: payload.technicalSkills }),
  });
  const json = (await res.json()) as TechnicalSkillsApiResponse;
  if (!json.success) {
    throw new Error(json.error ?? "Failed to save technical skills");
  }
  return normalizePayload(json);
}

export async function postTechnicalSkillsMessage(
  content: string,
): Promise<TechnicalSkillsStudioPayload> {
  const res = await fetch("/api/technical-skills/messages", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ content }),
  });
  const json = (await res.json()) as TechnicalSkillsApiResponse;
  if (!json.success) {
    throw new Error(json.error ?? "Failed to send message");
  }
  return normalizePayload(json);
}

export async function postAcceptTechnicalSkillSuggestion(
  suggestionId: string,
): Promise<TechnicalSkillsStudioPayload> {
  const res = await fetch(
    `/api/technical-skills/suggestions/${encodeURIComponent(suggestionId)}/accept`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({}),
    },
  );
  const json = (await res.json()) as TechnicalSkillsApiResponse;
  if (!json.success) {
    throw new Error(json.error ?? "Failed to accept suggestion");
  }
  return normalizePayload(json);
}
