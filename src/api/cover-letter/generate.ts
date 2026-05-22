import type { ProfessionalBackgroundSegments } from "@/model/professional-background";

export type GenerateCoverLetterInput = {
  jobId: string;
  jobTitle: string;
  companyName?: string;
  responsibilities: string[];
  requirements: string[];
  niceToHaves?: string[];
  skills?: string[];
  canvasWidthPx?: number;
  canvasHeightPx?: number;
  professionalBackgroundSegments: ProfessionalBackgroundSegments;
};

export type GenerateCoverLetterResponse = {
  tsx: string;
};

/**
 * POST /api/data/cover-letter/generate
 *
 * Launches a Cursor agent to generate a cover letter TSX component.
 * The request is proxied by a Next.js route handler to the Express server.
 *
 * @param input - Job context, background segments, and optional canvas dimensions
 * @returns The generated TSX source string
 */
export const generateCoverLetter = async (
  input: GenerateCoverLetterInput,
): Promise<GenerateCoverLetterResponse> => {
  const response = await fetch("/api/data/cover-letter/generate", {
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
        ? "Request timed out — cover letter generation can take several minutes. Retry from the job page."
        : `Cover letter generation failed (${response.status}): response was not JSON`,
    );
  }

  if (!response.ok) {
    throw new Error(
      parsed.error ?? `Cover letter generation failed (${response.status})`,
    );
  }

  if (typeof parsed.tsx !== "string") {
    throw new Error("Invalid response: missing tsx");
  }

  return { tsx: parsed.tsx };
};
