export const PROFESSIONAL_BACKGROUND_SEGMENT_KEYS = [
  "education",
  "credibility_bio",
  "voice_style",
  "portfolio_github",
] as const;

export type ProfessionalBackgroundSegmentKey =
  (typeof PROFESSIONAL_BACKGROUND_SEGMENT_KEYS)[number];
export type ProfessionalBackgroundSegments = Record<ProfessionalBackgroundSegmentKey, string>;

export type ProfessionalBackgroundPayload = {
  segments: ProfessionalBackgroundSegments;
  updatedAt: string | null;
};
