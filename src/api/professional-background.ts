import type { ProfessionalBackgroundPayload, ProfessionalBackgroundSegments } from "@/model/professional-background";

type ApiOk = { success: true } & ProfessionalBackgroundPayload;
type ApiErr = { success: false; error: string };

const emptySegments = (): ProfessionalBackgroundSegments => ({
  education: "",
  credibility_bio: "",
  voice_style: "",
  portfolio_github: "",
});

/** GET /api/professional-background */
export async function getProfessionalBackgroundPayload(): Promise<ProfessionalBackgroundPayload> {
  const res = await fetch("/api/professional-background");
  const json = (await res.json()) as ApiOk | ApiErr;
  if (!json.success) {
    throw new Error(json.error ?? "Failed to load professional background");
  }
  return {
    segments: { ...emptySegments(), ...json.segments },
    updatedAt: json.updatedAt ?? null,
  };
}

/** PATCH /api/professional-background — full segments replace */
export async function patchProfessionalBackground(payload: {
  segments: ProfessionalBackgroundSegments;
}): Promise<ProfessionalBackgroundPayload> {
  const res = await fetch("/api/professional-background", {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ segments: payload.segments }),
  });
  const json = (await res.json()) as ApiOk | ApiErr;
  if (!json.success) {
    throw new Error(json.error ?? "Failed to save professional background");
  }
  return {
    segments: { ...emptySegments(), ...json.segments },
    updatedAt: json.updatedAt ?? null,
  };
}
