import type { ProfessionalBackgroundSegments } from "@/model/professional-background";

export type GenerateCompanyInterestInput = {
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

export type GenerateCompanyInterestResponse = {
  tsx: string;
};

/**
 * POST /api/data/company-interest/generate
 *
 * Launches a Cursor agent to generate a short company-interest TSX component.
 *
 * @param input - Job context, background segments, and optional canvas dimensions
 * @returns The generated TSX source string
 */
export const generateCompanyInterest = async (
  input: GenerateCompanyInterestInput,
): Promise<GenerateCompanyInterestResponse> => {
  const response = await fetch("/api/data/company-interest/generate", {
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
        ? "Request timed out — generation can take several minutes. Retry from the job page."
        : `Company interest generation failed (${response.status}): response was not JSON`,
    );
  }

  if (!response.ok) {
    throw new Error(
      parsed.error ?? `Company interest generation failed (${response.status})`,
    );
  }

  if (typeof parsed.tsx !== "string") {
    throw new Error("Invalid response: missing tsx");
  }

  return { tsx: parsed.tsx };
};
