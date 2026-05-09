import type { ProfessionalBackgroundSegments } from "@/model/professional-background";

export type GenerateSkillsComponentInput = {
  skills: string[];
  canvasWidthPx?: number;
  canvasHeightPx?: number;
  professionalBackgroundSegments?: ProfessionalBackgroundSegments;
};

export type GenerateSkillsComponentResponse = {
  tsx: string;
};

/**
 * POST /api/data/skills-component/generate
 *
 * Launches a Cursor agent to generate a skills showcase TSX component.
 * The request is proxied by Next.js rewrites to the Express server.
 *
 * @param input - Skills list and optional canvas dimensions
 * @returns The generated TSX source string
 */
export const generateSkillsComponent = async (
  input: GenerateSkillsComponentInput,
): Promise<GenerateSkillsComponentResponse> => {
  const response = await fetch("/api/data/skills-component/generate", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input),
  });

  const raw = await response.text();
  let parsed: { tsx?: string; error?: string; success?: boolean };
  try {
    parsed = JSON.parse(raw) as { tsx?: string; error?: string; success?: boolean };
  } catch {
    throw new Error(
      response.status === 504 || response.status === 408
        ? "Request timed out — skills generation can take several minutes. Retry from the job page."
        : `Skills component generation failed (${response.status}): response was not JSON`,
    );
  }

  if (!response.ok) {
    throw new Error(
      parsed.error ?? `Skills component generation failed (${response.status})`,
    );
  }

  if (typeof parsed.tsx !== "string") {
    throw new Error("Invalid response: missing tsx");
  }

  return { tsx: parsed.tsx };
};
